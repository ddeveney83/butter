import { scrypt as rawScrypt, randomBytes, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { resolve } from "node:path";
import { FileStore } from "./store.mjs";
import { createHandler } from "./app.mjs";
import { createContentHandler } from "./content.mjs";
import { importUpload } from "./importer.mjs";
import { hash, token, id, now, problem } from "./domain.mjs";
const scrypt = promisify(rawScrypt);

export function createLocalServices(directory) {
  const store = new FileStore(resolve(directory, "data"));
  const files = new FileStore(resolve(directory, "files"));
  const accounts = new FileStore(resolve(directory, "accounts"));
  const cookieHeaders = new WeakMap();
  const appendCookie = (request, cookie) =>
    cookieHeaders.set(request, [...(cookieHeaders.get(request) || []), cookie]);
  const cookieValue = (request, name) =>
    (request.headers.get("cookie") || "")
      .split(";")
      .map((value) => value.trim())
      .find((value) => value.startsWith(name + "="))
      ?.split("=")[1];
  const sessionKey = (request) => cookieValue(request, "butterlearn_local");
  async function signIn(account, request) {
    const secret = token();
    await accounts.setJSON(`sessions/${hash(secret)}`, {
      userId: account.id,
      expires: Date.now() + 86400000,
    });
    appendCookie(
      request,
      `butterlearn_local=${secret}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
    );
    return account;
  }
  const identity = {
    getViewRole(request) {
      return cookieValue(request, "butterlearn_view");
    },
    setViewRole(role, request) {
      appendCookie(
        request,
        `butterlearn_view=${role}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`,
      );
    },
    clearViewRole(request) {
      appendCookie(
        request,
        "butterlearn_view=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
      );
    },
    async getUser(request) {
      const secret = sessionKey(request);
      if (!secret) return null;
      const session = await accounts.get(`sessions/${hash(secret)}`, {
        type: "json",
      });
      if (!session || session.expires < Date.now()) return null;
      const account = await accounts.get(`users/${session.userId}`, {
        type: "json",
      });
      if (!account) return null;
      const { passwordHash, salt, ...safe } = account;
      return safe;
    },
    async signup(email, password, data, request) {
      const salt = randomBytes(16).toString("hex");
      const account = {
        id: id(),
        email,
        name: data.full_name,
        confirmedAt: now(),
        salt,
        passwordHash: (await scrypt(password, salt, 64)).toString("hex"),
      };
      const saved = await accounts.setJSON(
        `emails/${hash(email)}`,
        account.id,
        { onlyIfNew: true },
      );
      if (!saved.modified)
        throw problem(400, "An account already exists. Please sign in.");
      await accounts.setJSON(`users/${account.id}`, account);
      return signIn(account, request);
    },
    async login(email, password, request) {
      const userId = await accounts.get(`emails/${hash(email)}`, {
        type: "json",
      });
      const account = userId
        ? await accounts.get(`users/${userId}`, { type: "json" })
        : null;
      const candidate = Buffer.from(
        await scrypt(password, account?.salt || "butterlearn-local-dummy", 64),
      );
      if (
        !account ||
        !timingSafeEqual(candidate, Buffer.from(account.passwordHash, "hex"))
      )
        throw problem(401, "The email or password is incorrect.");
      return signIn(account, request);
    },
    async logout(request) {
      const secret = sessionKey(request);
      if (secret) await accounts.delete(`sessions/${hash(secret)}`);
      appendCookie(
        request,
        "butterlearn_local=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
      );
      identity.clearViewRole(request);
    },
    async requestPasswordRecovery() {
      throw problem(
        503,
        "Email recovery is available on the deployed Netlify site. Local development does not send email.",
      );
    },
  };
  const api = createHandler({
    store,
    files,
    identity,
    mode: "local",
    startImport: async (request, user, job) => {
      setTimeout(
        () => importUpload(store, files, user, job.id).catch(() => {}),
        0,
      );
    },
  });
  const content = createContentHandler({ store, files });
  return {
    store,
    files,
    identity,
    async handle(request) {
      const response = await (new URL(request.url).pathname.startsWith(
        "/learn-content/",
      )
        ? content(request)
        : api(request));
      for (const cookie of cookieHeaders.get(request) || [])
        response.headers.append("Set-Cookie", cookie);
      return response;
    },
  };
}

export function butterlearnDevelopment() {
  return {
    name: "butterlearn-development",
    apply: "serve",
    async configureServer(server) {
      const services = createLocalServices(
        process.env.BUTTERLEARN_LOCAL_DATA || resolve(".butterlearn-local"),
      );
      server.middlewares.use(async (req, res, next) => {
        if (
          !req.url?.startsWith("/api/lms/") &&
          !req.url?.startsWith("/learn-content/")
        )
          return next();
        try {
          const origin = `http://${req.headers.host}`;
          const chunks = [];
          for await (const chunk of req) {
            chunks.push(chunk);
            if (
              chunks.reduce((sum, part) => sum + part.length, 0) >
              1.1 * 1024 * 1024
            )
              throw problem(413, "This request is too large.");
          }
          const request = new Request(new URL(req.url, origin), {
            method: req.method,
            headers: req.headers,
            body: ["GET", "HEAD"].includes(req.method)
              ? undefined
              : Buffer.concat(chunks),
          });
          const response = await services.handle(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            if (key !== "set-cookie") res.setHeader(key, value);
          });
          const cookies = response.headers.getSetCookie();
          if (cookies.length) res.setHeader("Set-Cookie", cookies);
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (error) {
          res.statusCode = error.status || 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: error.status
                ? error.message
                : "The local LMS could not handle this request.",
            }),
          );
        }
      });
    },
  };
}
