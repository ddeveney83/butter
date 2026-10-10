import { getIdentityConfig } from "@netlify/identity";
import { problem } from "./domain.mjs";

const normalize = (user) => ({
  id: user.id,
  email: user.email,
  name: user.user_metadata?.full_name || user.user_metadata?.name,
  confirmedAt: user.confirmed_at,
  roles: user.app_metadata?.roles || [],
});

// Use the managed Identity service with server-only, HttpOnly session cookies.
// Verification and recovery also establish cookies; the SDK's browser callbacks
// otherwise require exposing the tokens to JavaScript.
export function netlifyIdentity(request, context, options = {}) {
  const endpoint = options.endpoint || getIdentityConfig()?.url;
  const transport = options.fetch || fetch;
  let access = context.cookies.get("nf_jwt"),
    refresh = context.cookies.get("nf_refresh");
  async function call(path, body, token) {
    if (!endpoint) throw problem(503, "Netlify Identity has not been enabled.");
    let response;
    try {
      response = await transport(endpoint + path, {
        method: body ? "POST" : "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: "Bearer " + token } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(15000),
      });
    } catch {
      throw problem(503, "The account service could not be reached.");
    }
    const value = await response.json().catch(() => ({}));
    if (!response.ok)
      throw problem(
        response.status === 404 ? 503 : response.status,
        value.msg ||
          value.error_description ||
          "The account action could not be completed.",
      );
    return value;
  }
  function cookies(session) {
    access = session.access_token;
    refresh = session.refresh_token || refresh;
    context.cookies.set({
      name: "nf_jwt",
      value: access,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: session.expires_in || 3600,
    });
    if (refresh)
      context.cookies.set({
        name: "nf_refresh",
        value: refresh,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 14 * 86400,
      });
  }
  async function establish(session) {
    if (!session.access_token)
      throw problem(502, "The account service did not establish a session.");
    const user = await call("/user", null, session.access_token);
    cookies(session);
    return normalize(user);
  }
  async function verify(type, token, password) {
    const session = await call("/verify", {
      type,
      token,
      ...(password ? { password } : {}),
    });
    if (type === "recovery") {
      const response = await transport(endpoint + "/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.access_token,
        },
        body: JSON.stringify({ password }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw problem(
          400,
          "The password could not be changed. Request a fresh reset link.",
        );
    }
    return establish(session);
  }
  return {
    getViewRole() {
      return context.cookies.get("butterlearn_view");
    },
    setViewRole(role) {
      context.cookies.set({
        name: "butterlearn_view",
        value: role,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        maxAge: 14 * 86400,
      });
    },
    clearViewRole() {
      context.cookies.delete("butterlearn_view");
    },
    async getUser() {
      if (!access && !refresh) return null;
      try {
        if (!access) throw problem(401, "The access session has expired.");
        return normalize(await call("/user", null, access));
      } catch (error) {
        if (![400, 401, 403].includes(error.status)) throw error;
        if (!refresh) return null;
        try {
          return await establish(
            await call("/token", {
              grant_type: "refresh_token",
              refresh_token: refresh,
            }),
          );
        } catch (error) {
          if (![400, 401, 403].includes(error.status)) throw error;
          context.cookies.delete("nf_jwt");
          context.cookies.delete("nf_refresh");
          return null;
        }
      }
    },
    async login(email, password) {
      return establish(
        await call("/token", {
          grant_type: "password",
          username: email,
          password,
        }),
      );
    },
    async signup(email, password, data) {
      const result = await call("/signup", { email, password, data });
      if (result.access_token) return establish(result);
      return normalize(result);
    },
    async logout() {
      try {
        if (access) await call("/logout", {}, access);
      } catch {
        /* Clear the browser session even when the provider is unavailable. */
      } finally {
        context.cookies.delete("nf_jwt");
        context.cookies.delete("nf_refresh");
        context.cookies.delete("butterlearn_view");
      }
    },
    async requestPasswordRecovery(email) {
      try {
        await call("/recover", { email });
      } catch (error) {
        if (error.status >= 500) throw error;
      }
    },
    confirmEmail: (token) => verify("signup", token),
    recoverPassword: (token, password) => verify("recovery", token, password),
    acceptInvite: (token, password) => verify("invite", token, password),
  };
}
