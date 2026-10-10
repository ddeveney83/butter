import { createHash, randomBytes, randomUUID } from "node:crypto";
import { update, entries } from "./store.mjs";

export const OWNER_EMAIL =
  process.env.BUTTERLEARN_OWNER_EMAIL || "ddeveney83@gmail.com";
export const id = () => randomUUID();
export const token = () => randomBytes(32).toString("base64url");
export const hash = (value) => createHash("sha256").update(value).digest("hex");
export const now = () => new Date().toISOString();
export const problem = (status, message) =>
  Object.assign(new Error(message), { status });
export function text(value, maximum = 180) {
  if (typeof value !== "string" || !value.trim() || value.length > maximum)
    throw problem(400, `Enter a value between 1 and ${maximum} characters.`);
  return value.trim();
}
export async function body(request) {
  const raw = await request.text();
  if (raw.length > 256000) throw problem(413, "This request is too large.");
  try {
    return JSON.parse(raw);
  } catch {
    throw problem(400, "The request could not be read.");
  }
}
export function verifyOrigin(request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    throw problem(403, "This request must come from Butterlearn.");
}
export const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  group: user.group || "Butter team",
});

// A view can only reduce an existing admin's privileges. It never changes the
// stored role or learner identity, and is ignored for all other account roles.
export function activeView(user, requested) {
  return user?.role === "admin" &&
    ["admin", "manager", "creator", "learner"].includes(requested)
    ? requested
    : user?.role || null;
}

export async function profile(store, identity) {
  if (!identity?.id || !identity.email) return null;
  const owner =
    identity.email.toLowerCase() === OWNER_EMAIL.toLowerCase() &&
    Boolean(identity.confirmedAt);
  const existing = await store.get(`people/${identity.id}`, { type: "json" });
  if (
    existing &&
    existing.email === identity.email &&
    (!owner || existing.role === "admin")
  )
    return existing;
  return update(store, `people/${identity.id}`, (existing) => ({
    ...existing,
    id: identity.id,
    email: identity.email,
    name: existing?.name || identity.name || identity.email.split("@")[0],
    role: owner
      ? "admin"
      : existing?.role ||
        (identity.roles?.includes("admin")
          ? "admin"
          : identity.roles?.includes("manager")
            ? "manager"
            : identity.roles?.includes("creator")
              ? "creator"
              : "learner"),
    group: existing?.group || "Butter team",
    createdAt: existing?.createdAt || now(),
  }));
}

export async function requireUser(store, identity) {
  const user = await profile(store, identity);
  if (!user) throw problem(401, "Please sign in to continue.");
  return user;
}
export function requireAdmin(user) {
  if (user.role !== "admin")
    throw problem(403, "Only an admin can make this change.");
}
export function requireReporting(user) {
  if (!["admin", "manager"].includes(user.role))
    throw problem(403, "Your account does not have access to team reporting.");
}
export function requireCreator(user, course) {
  if (
    user.role !== "admin" &&
    (user.role !== "creator" || (course && course.createdBy !== user.id))
  )
    throw problem(
      403,
      "Only an admin or the course's content creator can edit this draft.",
    );
}
export const courseKey = (courseId) => `courses/${courseId}`;
export const enrolmentKey = (userId, courseId) =>
  `enrolments/${userId}/${courseId}`;
export async function findCourse(store, courseId, user) {
  const course = await store.get(courseKey(courseId), { type: "json" });
  if (
    !course ||
    (!course.published &&
      user.role !== "admin" &&
      !(user.role === "creator" && course.createdBy === user.id))
  )
    throw problem(404, "This course is not available.");
  return course;
}
export function courseView(course, enrolment) {
  const { assetPrefix, ...view } = course;
  return { ...view, enrolment: enrolment || null };
}
export async function enrol(store, userId, course, assignment = {}) {
  return update(store, enrolmentKey(userId, course.id), (existing) => ({
    id: existing?.id || id(),
    userId,
    courseId: course.id,
    createdAt: existing?.createdAt || now(),
    status: "not-started",
    percent: 0,
    score: null,
    seconds: 0,
    lessons: {},
    ...existing,
    ...assignment,
  }));
}
export async function catalogue(store, user) {
  const courses = await entries(store, "courses/");
  const enrolled = await entries(store, `enrolments/${user.id}/`);
  return courses
    .filter(
      (course) =>
        course.published ||
        user.role === "admin" ||
        (user.role === "creator" && course.createdBy === user.id),
    )
    .map((course) =>
      courseView(
        course,
        enrolled.find((record) => record.courseId === course.id),
      ),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
function duration(seconds, format) {
  if (format === "scorm2004") return `PT${Math.floor(seconds)}S`;
  return `${String(Math.floor(seconds / 3600)).padStart(4, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
export function initialCmi(course, user, record, lessonId) {
  const lesson = record?.lessons?.[lessonId];
  const common = {
    "cmi.suspend_data": "",
    "cmi.launch_data": "",
    ...lesson?.cmi,
  };
  if (course.format === "scorm2004")
    return {
      "cmi.completion_status": "not attempted",
      "cmi.success_status": "unknown",
      "cmi.location": "",
      "cmi.progress_measure": "",
      "cmi.score.raw": "",
      "cmi.score.min": "",
      "cmi.score.max": "",
      "cmi.score.scaled": "",
      ...common,
      "cmi.learner_id": user.id,
      "cmi.learner_name": user.name,
      "cmi.entry": lesson?.cmi ? "resume" : "ab-initio",
      "cmi.mode": "normal",
      "cmi.credit": "credit",
      "cmi.total_time": duration(lesson?.seconds || 0, course.format),
      "cmi.session_time": "PT0S",
      "cmi.exit": "",
    };
  return {
    "cmi.core.lesson_status": "not attempted",
    "cmi.core.lesson_location": "",
    "cmi.core.score.raw": "",
    "cmi.core.score.min": "",
    "cmi.core.score.max": "",
    ...common,
    "cmi.core.student_id": user.id,
    "cmi.core.student_name": user.name,
    "cmi.core.entry": lesson?.cmi ? "resume" : "ab-initio",
    "cmi.core.lesson_mode": "normal",
    "cmi.core.credit": "credit",
    "cmi.core.total_time": duration(lesson?.seconds || 0, course.format),
    "cmi.core.session_time": "0000:00:00",
    "cmi.core.exit": "",
  };
}
export function sessionSeconds(value) {
  if (!value) return 0;
  const clock = /^(\d{2,4}):(\d{2}):(\d{2}(?:\.\d+)?)$/.exec(value);
  if (clock)
    return Math.min(
      86400,
      Number(clock[1]) * 3600 + Number(clock[2]) * 60 + Number(clock[3]),
    );
  const iso =
    /^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(
      value,
    );
  return iso
    ? Math.min(
        86400,
        Number(iso[1] || 0) * 86400 +
          Number(iso[2] || 0) * 3600 +
          Number(iso[3] || 0) * 60 +
          Number(iso[4] || 0),
      )
    : 0;
}
export async function saveProgress(
  store,
  user,
  course,
  grant,
  incoming,
  manual = false,
) {
  if (
    grant.userId !== user.id ||
    grant.courseId !== course.id ||
    grant.expires < Date.now()
  )
    throw problem(
      403,
      "This course session has expired. Reopen the course to continue.",
    );
  if (!course.lessons.some((lesson) => lesson.id === grant.lessonId))
    throw problem(400, "This learning object is not available.");
  if (
    !incoming ||
    typeof incoming !== "object" ||
    Array.isArray(incoming) ||
    Object.keys(incoming).length > 1500
  )
    throw problem(400, "Invalid course tracking data.");
  const cmi = Object.fromEntries(
    Object.entries(incoming).filter(
      ([key, value]) =>
        /^(cmi\.|adl\.nav\.)/.test(key) &&
        key.length < 240 &&
        typeof value === "string" &&
        value.length <= 64000,
    ),
  );
  if (JSON.stringify(cmi).length > 200000)
    throw problem(413, "Course tracking data is too large.");
  if (manual && course.format !== "html")
    throw problem(
      400,
      "SCORM courses record completion from within the course.",
    );
  const completed =
    manual ||
    ["passed", "completed"].includes(cmi["cmi.core.lesson_status"]) ||
    cmi["cmi.completion_status"] === "completed";
  const failed =
    cmi["cmi.core.lesson_status"] === "failed" ||
    cmi["cmi.success_status"] === "failed";
  const raw = cmi["cmi.core.score.raw"] ?? cmi["cmi.score.raw"];
  const scaled = cmi["cmi.score.scaled"];
  const maximum = Number(
    cmi["cmi.core.score.max"] || cmi["cmi.score.max"] || 100,
  );
  const minimum = Number(
    cmi["cmi.core.score.min"] || cmi["cmi.score.min"] || 0,
  );
  const score =
    scaled !== undefined && scaled !== "" && Number.isFinite(Number(scaled))
      ? Math.round(Number(scaled) * 100)
      : raw !== undefined && raw !== "" && Number.isFinite(Number(raw))
        ? Math.round(
            ((Number(raw) - minimum) / Math.max(1, maximum - minimum)) * 100,
          )
        : null;
  return update(store, enrolmentKey(user.id, course.id), (existing) => {
    if (!existing) throw problem(403, "Enrol on this course first.");
    const previous = existing.lessons[grant.lessonId] || {};
    const session = sessionSeconds(
      cmi["cmi.core.session_time"] || cmi["cmi.session_time"],
    );
    const sessions = {
      ...previous.sessions,
      [grant.id]: Math.max(previous.sessions?.[grant.id] || 0, session),
    };
    const lesson = {
      cmi,
      sessions,
      seconds: Object.values(sessions).reduce((sum, value) => sum + value, 0),
      score: score ?? previous.score ?? null,
      status:
        previous.status === "completed" || completed
          ? "completed"
          : failed
            ? "failed"
            : "in-progress",
      updatedAt: now(),
    };
    const lessons = { ...existing.lessons, [grant.lessonId]: lesson };
    const count = course.lessons.filter(
      (item) => lessons[item.id]?.status === "completed",
    ).length;
    const scores = Object.values(lessons)
      .map((item) => item.score)
      .filter((value) => value !== null);
    return {
      ...existing,
      lessons,
      status: count === course.lessons.length ? "completed" : "in-progress",
      percent: Math.round((count / course.lessons.length) * 100),
      score: scores.length
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : null,
      seconds: Object.values(lessons).reduce(
        (sum, value) => sum + value.seconds,
        0,
      ),
      updatedAt: now(),
      completedAt:
        count === course.lessons.length
          ? existing.completedAt || now()
          : undefined,
    };
  });
}
