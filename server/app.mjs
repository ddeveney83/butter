import { entries, update } from "./store.mjs";
import { CHUNK_SIZE, MAX_PACKAGE } from "./packages.mjs";
import {
  body,
  text,
  verifyOrigin,
  requireUser,
  requireAdmin,
  requireReporting,
  publicUser,
  profile,
  catalogue,
  findCourse,
  enrol,
  courseView,
  enrolmentKey,
  courseKey,
  initialCmi,
  saveProgress,
  token,
  hash,
  id,
  now,
  problem,
  OWNER_EMAIL,
  activeView,
  requireCreator,
} from "./domain.mjs";
import { seedStarterCourses } from "./starters.mjs";
import { validateDocument, compileDocument } from "./authoring.mjs";

const json = (value, status = 200) =>
  Response.json(value, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
const identifier = (value) => {
  if (!/^[a-zA-Z0-9_-]{1,100}$/.test(value || ""))
    throw problem(400, "Invalid record identifier.");
  return value;
};
const password = (value, minimum = 12) => {
  if (typeof value !== "string" || value.length < minimum || value.length > 128)
    throw problem(400, `Use a password between ${minimum} and 128 characters.`);
  return value;
};
const email = (value) => {
  const result = text(value, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result))
    throw problem(400, "Enter a valid email address.");
  return result;
};

export function createHandler({
  store,
  files,
  identity,
  mode = "netlify",
  startImport,
}) {
  return async function handler(request) {
    try {
      const path = new URL(request.url).pathname
        .replace(/^\/api\/lms\/?/, "")
        .split("/")
        .filter(Boolean);
      const method = request.method;
      if (!["GET", "HEAD"].includes(method)) verifyOrigin(request);
      if (path[0] === "auth" && method === "POST") {
        const input = await body(request);
        if (path[1] === "logout") {
          await identity.logout(request);
          return json({ ok: true });
        }
        if (path[1] === "recover") {
          await identity.requestPasswordRecovery(email(input.email));
          return json({
            message:
              "If an account exists, you’ll receive a link to reset your password.",
          });
        }
        let account;
        if (path[1] === "login")
          account = await identity.login(
            email(input.email),
            password(input.password, 1),
            request,
          );
        else if (path[1] === "signup") {
          account = await identity.signup(
            email(input.email),
            password(input.password),
            { full_name: text(input.name, 100) },
            request,
          );
          if (!account.confirmedAt)
            return json(
              {
                needsConfirmation: true,
                message:
                  "Check your inbox and confirm your email address before signing in.",
              },
              201,
            );
        } else if (path[1] === "callback") {
          const secret = text(input.token, 2048);
          if (input.type === "confirmation")
            account = await identity.confirmEmail(secret);
          else if (input.type === "recovery")
            account = await identity.recoverPassword(
              secret,
              password(input.password),
            );
          else if (input.type === "invite")
            account = await identity.acceptInvite(
              secret,
              password(input.password),
            );
          else throw problem(400, "This account link is not supported.");
        } else throw problem(404, "This account action is not available.");
        identity.clearViewRole?.(request);
        return json({ user: publicUser(await profile(store, account)) });
      }
      const account = await identity.getUser(request);
      if (path[0] === "session" && method === "GET") {
        const user = account ? await profile(store, account) : null;
        return json({
          user: user ? publicUser(user) : null,
          viewRole: activeView(user, identity.getViewRole?.(request)),
          mode,
        });
      }
      const actualUser = await requireUser(store, account);
      if (path[0] === "session" && path[1] === "view" && method === "POST") {
        requireAdmin(actualUser);
        const input = await body(request);
        if (!["admin", "manager", "creator", "learner"].includes(input.role))
          throw problem(
            400,
            "Choose admin, manager, content creator or learner view.",
          );
        identity.setViewRole(input.role, request);
        return json({
          user: publicUser(actualUser),
          viewRole: input.role,
          mode,
        });
      }
      const user = {
        ...actualUser,
        role: activeView(actualUser, identity.getViewRole?.(request)),
      };
      if (path[0] === "authoring") {
        requireCreator(user);
        if (path.length === 1 && method === "POST") {
          const document = validateDocument(await body(request));
          const courseId = id();
          const assetPrefix = `packages/${courseId}/draft-1`;
          const draft = {
            document,
            revision: 1,
            assetPrefix,
            updatedAt: now(),
          };
          const course = {
            id: courseId,
            title: document.title,
            description: document.description,
            minutes: document.minutes,
            icon: document.icon,
            format: document.format,
            authored: true,
            createdBy: user.id,
            published: false,
            draftRevision: 1,
            publishedRevision: 0,
            assetPrefix,
            lessons: [
              { id: "lesson-1", title: document.title, path: "index.html" },
            ],
            createdAt: now(),
          };
          await files.set(
            `${assetPrefix}/index.html`,
            compileDocument(document),
            { metadata: { type: "text/html; charset=utf-8" } },
          );
          await store.setJSON(`authoring/${courseId}`, draft, {
            onlyIfNew: true,
          });
          await store.setJSON(courseKey(courseId), course, { onlyIfNew: true });
          return json({ course: courseView(course), draft }, 201);
        }
        if (path[1]) {
          const course = await findCourse(store, identifier(path[1]), user);
          requireCreator(user, course);
          if (!course.authored)
            throw problem(
              400,
              "Imported packages are edited in their original authoring tool.",
            );
          const key = `authoring/${course.id}`;
          const draft = await store.get(key, { type: "json" });
          if (!draft) throw problem(404, "This course draft is not available.");
          if (path.length === 2 && method === "GET")
            return json({ course: courseView(course), draft });
          if (path[2] === "preview" && method === "POST") {
            const document = validateDocument((await body(request)).document);
            return json({ html: compileDocument(document) });
          }
          if (path.length === 2 && method === "PUT") {
            const input = await body(request);
            const document = validateDocument(input.document);
            if (course.published && document.format !== course.format)
              throw problem(
                400,
                "Unpublish the course before changing its format.",
              );
            if (input.revision !== draft.revision)
              throw problem(
                409,
                "This draft changed in another tab. Reload it before saving.",
              );
            const assetPrefix = `packages/${course.id}/draft-${draft.revision + 1}-${id()}`;
            await files.set(
              `${assetPrefix}/index.html`,
              compileDocument(document),
              { metadata: { type: "text/html; charset=utf-8" } },
            );
            const next = await update(store, key, (current) => {
              if (current?.revision !== input.revision)
                throw problem(
                  409,
                  "This draft changed in another tab. Reload it before saving.",
                );
              return {
                document,
                revision: current.revision + 1,
                assetPrefix,
                updatedAt: now(),
              };
            });
            const updated = await update(
              store,
              courseKey(course.id),
              (current) => ({
                ...current,
                draftRevision: next.revision,
                ...(!current.published
                  ? {
                      title: document.title,
                      description: document.description,
                      minutes: document.minutes,
                      icon: document.icon,
                      format: document.format,
                      assetPrefix,
                      lessons: [
                        {
                          id: "lesson-1",
                          title: document.title,
                          path: "index.html",
                        },
                      ],
                    }
                  : {}),
                updatedAt: now(),
              }),
            );
            return json({ course: courseView(updated), draft: next });
          }
        }
      }
      if (path[0] === "dashboard" && method === "GET") {
        const courses = await catalogue(store, user);
        return json({ user: publicUser(user), courses, mode });
      }
      if (path[0] === "courses" && path.length === 1 && method === "GET")
        return json({ courses: await catalogue(store, user) });
      if (path[0] === "courses" && path[1]) {
        const course = await findCourse(store, identifier(path[1]), user);
        if (path.length === 2 && method === "GET")
          return json({
            course: courseView(
              course,
              await store.get(enrolmentKey(user.id, course.id), {
                type: "json",
              }),
            ),
          });
        if (path.length === 2 && method === "PATCH") {
          requireAdmin(user);
          const input = await body(request);
          const draft =
            course.authored && typeof input.published === "boolean"
              ? await store.get(`authoring/${course.id}`, { type: "json" })
              : null;
          if (
            input.published &&
            course.authored &&
            !draft?.document.blocks.length
          )
            throw problem(400, "Add content before publishing this course.");
          const next = await update(store, courseKey(course.id), (current) => ({
            ...current,
            ...(draft
              ? {
                  title: draft.document.title,
                  description: draft.document.description,
                  minutes: draft.document.minutes,
                  icon: draft.document.icon,
                  format: draft.document.format,
                  assetPrefix: draft.assetPrefix,
                  publishedRevision: draft.revision,
                  lessons: [
                    {
                      id: "lesson-1",
                      title: draft.document.title,
                      path: "index.html",
                    },
                  ],
                }
              : {}),
            ...(input.title !== undefined ? { title: text(input.title) } : {}),
            ...(input.description !== undefined
              ? { description: String(input.description).slice(0, 2000) }
              : {}),
            ...(typeof input.published === "boolean"
              ? { published: input.published }
              : {}),
            updatedAt: now(),
          }));
          return json({ course: courseView(next) });
        }
        if (path[2] === "enrol" && method === "POST")
          return json({ enrolment: await enrol(store, user.id, course) }, 201);
        if (path[2] === "launch" && method === "POST") {
          const input = await body(request);
          const lesson = course.lessons.find(
            (item) => item.id === input.lessonId,
          );
          if (!lesson)
            throw problem(404, "This learning object is not available.");
          const record = await store.get(enrolmentKey(user.id, course.id), {
            type: "json",
          });
          if (!record)
            throw problem(403, "Enrol on this course before opening it.");
          const key = token();
          const grant = {
            id: id(),
            userId: user.id,
            name: user.name,
            courseId: course.id,
            lessonId: lesson.id,
            launchPath: lesson.path,
            assetPrefix: course.assetPrefix,
            format: course.format,
            cmi: initialCmi(course, user, record, lesson.id),
            parentOrigin: new URL(request.url).origin,
            expires: Date.now() + 4 * 60 * 60 * 1000,
          };
          await store.setJSON(`launches/${hash(key)}`, grant, {
            onlyIfNew: true,
          });
          return json({
            token: key,
            url: `/learn-content/${key}/${lesson.path.split("/").map(encodeURIComponent).join("/")}${lesson.query || ""}`,
            lesson,
            enrolment: record,
          });
        }
      }
      if (path[0] === "launches" && path[1] && method === "POST") {
        const input = await body(request);
        const grant = await store.get(`launches/${hash(path[1])}`, {
          type: "json",
        });
        if (!grant || grant.userId !== user.id)
          throw problem(403, "This course session is not available.");
        if (path[2] === "close") {
          await store.delete(`launches/${hash(path[1])}`);
          return json({ ok: true });
        }
        const course = await findCourse(store, grant.courseId, user);
        const record = await saveProgress(
          store,
          user,
          course,
          grant,
          input.cmi,
          input.manual === true,
        );
        return json({ enrolment: record });
      }
      if (path[0] === "uploads") {
        requireAdmin(user);
        if (path.length === 1 && method === "POST") {
          const input = await body(request);
          const filename = text(input.filename, 180);
          if (!/\.(zip|html?)$/i.test(filename))
            throw problem(400, "Choose an HTML file or an HTML/SCORM ZIP.");
          if (
            !Number.isInteger(input.size) ||
            input.size <= 0 ||
            input.size > MAX_PACKAGE
          )
            throw problem(400, "Choose a file between 1 byte and 50 MB.");
          const job = {
            id: id(),
            userId: user.id,
            filename,
            size: input.size,
            title: text(input.title),
            description: String(input.description || "").slice(0, 2000),
            minutes: Math.max(1, Math.min(600, Number(input.minutes) || 10)),
            status: "uploading",
            createdAt: now(),
          };
          await store.setJSON(`uploads/${job.id}`, job, { onlyIfNew: true });
          return json({ upload: job, chunkSize: CHUNK_SIZE }, 201);
        }
        const uploadId = identifier(path[1]);
        const job = await store.get(`uploads/${uploadId}`, { type: "json" });
        if (!job || job.userId !== user.id)
          throw problem(404, "This upload is not available.");
        if (path.length === 2 && method === "GET") return json({ upload: job });
        if (path[2] === "chunks" && method === "POST") {
          if (job.status !== "uploading")
            throw problem(409, "This upload has already been submitted.");
          const part = Number(path[3]);
          if (
            !Number.isInteger(part) ||
            part < 0 ||
            part >= Math.ceil(job.size / CHUNK_SIZE)
          )
            throw problem(400, "Invalid upload chunk.");
          const chunk = await request.arrayBuffer();
          if (
            chunk.byteLength !==
            Math.min(CHUNK_SIZE, job.size - part * CHUNK_SIZE)
          )
            throw problem(400, "The upload chunk size does not match.");
          await files.set(`uploads/${uploadId}/${part}`, chunk);
          return json({ ok: true });
        }
        if (path[2] === "complete" && method === "POST") {
          if (job.status !== "uploading")
            throw problem(409, "This upload has already been submitted.");
          await startImport(request, user, job);
          return json({ upload: { ...job, status: "processing" } }, 202);
        }
      }
      if (path[0] === "admin") {
        requireReporting(user);
        if (path[1] === "report" && method === "GET") {
          const [people, courses, enrolments] = await Promise.all([
            entries(store, "people/"),
            entries(store, "courses/"),
            entries(store, "enrolments/"),
          ]);
          return json({
            people: people.map(publicUser),
            courses: courses.map((course) => courseView(course)),
            enrolments: enrolments.map(({ lessons, ...record }) => record),
          });
        }
        requireAdmin(user);
        if (path[1] === "assign" && method === "POST") {
          const input = await body(request);
          const course = await findCourse(
            store,
            identifier(input.courseId),
            user,
          );
          if (!course.published)
            throw problem(400, "Publish this course before assigning it.");
          if (
            !Array.isArray(input.userIds) ||
            !input.userIds.length ||
            input.userIds.length > 200
          )
            throw problem(400, "Select between 1 and 200 learners.");
          const dueDate = input.dueDate || null;
          const date = dueDate ? new Date(dueDate + "T00:00:00Z") : null;
          if (
            dueDate &&
            (!/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
              !Number.isFinite(date.getTime()) ||
              date.toISOString().slice(0, 10) !== dueDate)
          )
            throw problem(400, "Choose a valid due date.");
          const targets = await Promise.all(
            input.userIds.map((userId) =>
              store.get(`people/${identifier(userId)}`, { type: "json" }),
            ),
          );
          if (targets.some((target) => !target))
            throw problem(404, "One of these learners is not available.");
          for (const target of targets)
            await enrol(store, target.id, course, {
              assigned: true,
              assignedBy: user.id,
              dueDate,
            });
          return json({ count: targets.length });
        }
        if (path[1] === "people" && path[2] && method === "PATCH") {
          const input = await body(request);
          const userId = identifier(path[2]);
          if (
            input.role &&
            !["learner", "manager", "creator", "admin"].includes(input.role)
          )
            throw problem(400, "Choose a valid role.");
          const next = await update(store, `people/${userId}`, (current) => {
            if (!current) throw problem(404, "This learner is not available.");
            if (
              current.email.toLowerCase() === OWNER_EMAIL.toLowerCase() &&
              input.role &&
              input.role !== "admin"
            )
              throw problem(400, "The workspace owner remains an admin.");
            return {
              ...current,
              ...(input.role ? { role: input.role } : {}),
              ...(input.group ? { group: text(input.group, 80) } : {}),
            };
          });
          return json({ user: publicUser(next) });
        }
        if (path[1] === "starters" && method === "POST") {
          const added = await seedStarterCourses(store, files, user.id);
          return json({ ok: true, added });
        }
      }
      throw problem(404, "This action is not available.");
    } catch (error) {
      const status =
        error.status ||
        error.statusCode ||
        (error.name === "MissingIdentityError" ? 503 : 500);
      if (status >= 500)
        console.error(
          "butterlearn request failed:",
          error.name,
          error.message?.slice(0, 180),
        );
      return json(
        {
          error:
            status === 503
              ? "Account access is being connected. Please try again shortly."
              : status >= 500
                ? "Something went wrong while saving. Please try again."
                : error.message,
        },
        status,
      );
    }
  };
}
