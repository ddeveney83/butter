import { useNavigate } from "react-router-dom";
import { useMemo, useState, type FormEvent } from "react";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, Doodle } from "../components/Artwork";
import { Loading, Notice, useAuth } from "./Auth";
import { api, post, useData } from "./api";
import {
  formatName,
  statusName,
  type Course,
  type User,
  type Report,
} from "./types";

function PageTitle({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="lms-page-title">
      <div>
        <h1 tabIndex={-1}>{title}</h1>
        <p>{copy}</p>
      </div>
      {children}
    </header>
  );
}
function LoadState({ error, reload }: { error: string; reload: () => void }) {
  return error ? (
    <Notice error>
      {error} <button onClick={reload}>Try again</button>
    </Notice>
  ) : (
    <Loading />
  );
}
function DateText({ value }: { value?: string }) {
  return (
    <>
      {value
        ? new Date(value + "T12:00:00").toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "No due date"}
    </>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <article className="lms-course-card">
      <div className={`lms-course-art ${course.icon || "idea"}`}>
        <Doodle kind={course.icon || "idea"} />
        <span>{formatName(course.format)}</span>
      </div>
      <div className="lms-course-copy">
        <span className="lms-course-length">
          {course.minutes} min · {course.lessons.length}{" "}
          {course.lessons.length === 1 ? "part" : "parts"}
        </span>
        <h3>
          <Link to={"/butterlearn/app/courses/" + course.id}>
            {course.title}
          </Link>
        </h3>
        <p>{course.description}</p>
        {course.enrolment && (
          <div className="lms-card-progress">
            <span>{statusName(course.enrolment.status)}</span>
            <span>{course.enrolment.percent}%</span>
            <progress
              max={100}
              value={course.enrolment.percent}
              aria-label={course.title + " progress"}
            />
            {course.enrolment.dueDate && (
              <span>
                Due <DateText value={course.enrolment.dueDate} />
              </span>
            )}
          </div>
        )}
        {error && <Notice error>{error}</Notice>}
        <Link
          className="lms-course-open"
          to={"/butterlearn/app/courses/" + course.id}
          onClick={async (event) => {
            if (course.enrolment) return;
            event.preventDefault();
            setBusy(true);
            setError("");
            try {
              await post("courses/" + course.id + "/enrol", {});
              navigate("/butterlearn/app/courses/" + course.id);
            } catch (error) {
              setError((error as Error).message);
              setBusy(false);
            }
          }}
        >
          {busy
            ? "Joining…"
            : course.enrolment?.status === "completed"
              ? "Revisit course"
              : course.enrolment?.status === "in-progress"
                ? "Continue learning"
                : course.enrolment
                  ? "Start learning"
                  : "Join course"}
          <Arrow />
        </Link>
      </div>
    </article>
  );
}

export function Dashboard() {
  const { user } = useAuth();
  const { data, error, loading, reload } = useData<{ courses: Course[] }>(
    "dashboard",
  );
  const [filter, setFilter] = useState("All learning");
  if (loading || !data) return <LoadState error={error} reload={reload} />;
  const enrolled = data.courses.filter((course) => course.enrolment);
  const completed = enrolled.filter(
    (course) => course.enrolment?.status === "completed",
  );
  const progressing = enrolled.filter(
    (course) => course.enrolment?.status === "in-progress",
  );
  const filtered = enrolled.filter(
    (course) =>
      filter === "All learning" ||
      statusName(course.enrolment?.status) === filter,
  );
  return (
    <>
      <PageTitle
        title={`Hello, ${user!.name.split(" ")[0]}.`}
        copy="A little learning. A good next step."
      >
        <Doodle kind="heart" />
      </PageTitle>
      <div className="lms-metrics">
        <div>
          <strong>{enrolled.length}</strong>
          <span>Courses in your learning</span>
        </div>
        <div>
          <strong>{progressing.length}</strong>
          <span>In progress</span>
        </div>
        <div>
          <strong>{completed.length}</strong>
          <span>Completed</span>
        </div>
      </div>
      <div className="lms-section-heading">
        <h2>Your learning.</h2>
        <Link to="/butterlearn/app/library">
          Explore the library <Arrow />
        </Link>
      </div>
      <div
        className="lms-filters"
        role="group"
        aria-label="Filter your learning"
      >
        {["All learning", "Not started", "In progress", "Completed"].map(
          (value) => (
            <button
              key={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {value}
            </button>
          ),
        )}
      </div>
      {filtered.length ? (
        <div className="lms-course-grid">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="lms-empty">
          <Doodle kind="idea" />
          <h3>
            {enrolled.length
              ? "A little space for something new."
              : "Your next step starts here."}
          </h3>
          <p>
            {enrolled.length
              ? "There are no courses in this view. Choose another filter or explore the library."
              : "Your assigned courses will appear here. You can also choose something from the library."}
          </p>
          <Link className="lms-button" to="/butterlearn/app/library">
            Find some learning <Arrow />
          </Link>
        </div>
      )}
    </>
  );
}

export function Library() {
  const { data, error, loading, reload } = useData<{ courses: Course[] }>(
    "courses",
  );
  const [search, setSearch] = useState(""),
    [format, setFormat] = useState("all");
  if (loading || !data) return <LoadState error={error} reload={reload} />;
  const courses = data.courses.filter(
    (course) =>
      course.published &&
      (format === "all" || course.format === format) &&
      `${course.title} ${course.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageTitle
        title="Room to grow."
        copy="Find something useful. Make it your next step."
      />
      <div className="lms-library-controls">
        <label className="lms-search">
          Search courses
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="What would you like to learn?"
          />
        </label>
        <label>
          Course format
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="all">All formats</option>
            <option value="html">HTML</option>
            <option value="scorm12">SCORM 1.2</option>
            <option value="scorm2004">SCORM 2004</option>
          </select>
        </label>
      </div>
      <p className="lms-results" role="status">
        {courses.length} {courses.length === 1 ? "course" : "courses"} to
        explore.
      </p>
      {courses.length ? (
        <div className="lms-course-grid">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="lms-empty">
          <Doodle kind="play" />
          <h3>
            {data.courses.some((course) => course.published)
              ? "A little less filtering?"
              : "Good things are being prepared."}
          </h3>
          <p>
            {data.courses.some((course) => course.published)
              ? "Try another search or course format."
              : "Published courses will appear here when your learning team adds them."}
          </p>
        </div>
      )}
    </>
  );
}

type Upload = {
  id: string;
  status: "uploading" | "processing" | "ready" | "failed";
  progress?: number;
  error?: string;
  courseId?: string;
};
function UploadCourse({ onComplete }: { onComplete: () => void }) {
  const [file, setFile] = useState<File | null>(null),
    [busy, setBusy] = useState(false),
    [progress, setProgress] = useState(0),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;
    setBusy(true);
    setError("");
    setMessage("");
    setProgress(0);
    const form = event.currentTarget,
      values = new FormData(form);
    try {
      const created = await post<{ upload: Upload; chunkSize: number }>(
        "uploads",
        {
          filename: file.name,
          size: file.size,
          title: values.get("title"),
          description: values.get("description"),
          minutes: Number(values.get("minutes")),
        },
      );
      const count = Math.ceil(file.size / created.chunkSize);
      for (let part = 0; part < count; part++) {
        await api("uploads/" + created.upload.id + "/chunks/" + part, {
          method: "POST",
          headers: { "Content-Type": "application/octet-stream" },
          body: file.slice(
            part * created.chunkSize,
            (part + 1) * created.chunkSize,
          ),
        });
        setProgress(Math.round(((part + 1) / count) * 75));
      }
      setMessage("Checking the package and preparing your course…");
      await post("uploads/" + created.upload.id + "/complete", {});
      let ready = false;
      for (let attempt = 0; attempt < 600; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { upload } = await api<{ upload: Upload }>(
          "uploads/" + created.upload.id,
        );
        if (upload.status === "failed")
          throw new Error(
            upload.error || "The package could not be processed.",
          );
        if (upload.status === "ready") {
          ready = true;
          break;
        }
        setProgress(
          75 + Math.min(24, Math.round((upload.progress || 0) * 0.24)),
        );
      }
      if (!ready)
        throw new Error(
          "The import is taking longer than expected. Refresh Manage courses shortly to check whether it finished.",
        );
      setProgress(100);
      setMessage(
        "Your course is ready as a draft. Review it, then publish when you’re happy.",
      );
      form.reset();
      setFile(null);
      onComplete();
    } catch (error) {
      setError((error as Error).message);
      setMessage("");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="lms-upload" aria-labelledby="lms-upload-title">
      <div>
        <Doodle kind="play" />
        <h2 id="lms-upload-title">Bring your learning along.</h2>
        <p>
          Upload an HTML file or a zipped HTML / SCORM course. SCORM packages
          use their manifest to find the learning objects.
        </p>
        <p className="lms-small">
          Up to 50 MB zipped, 150 MB expanded and 18 MB per file. Keep linked
          assets inside the ZIP.
        </p>
      </div>
      <form onSubmit={submit}>
        <label>
          Course title
          <input name="title" required maxLength={180} disabled={busy} />
        </label>
        <label>
          A little about the course
          <textarea
            name="description"
            maxLength={2000}
            rows={3}
            disabled={busy}
          />
        </label>
        <div className="lms-form-row">
          <label>
            Estimated minutes
            <input
              name="minutes"
              type="number"
              min={1}
              max={600}
              defaultValue={10}
              required
              disabled={busy}
            />
          </label>
          <label>
            Course package
            <input
              name="file"
              type="file"
              accept=".zip,.html,.htm"
              required
              disabled={busy}
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </label>
        </div>
        <button type="submit" className="lms-button" disabled={busy || !file}>
          {busy ? "Uploading…" : "Upload course"}
          <Arrow />
        </button>
        {busy && (
          <progress
            aria-label="Course upload progress"
            max={100}
            value={progress}
          />
        )}
        <span className="lms-small" role="status">
          {busy ? `${progress}% · ` : ""}
          {message}
        </span>
        {error && <Notice error>{error}</Notice>}
      </form>
    </section>
  );
}

export function ManageCourses() {
  const { viewRole } = useAuth();
  const { data, error, loading, reload } = useData<{ courses: Course[] }>(
    "courses",
  );
  const [actionError, setActionError] = useState(""),
    [working, setWorking] = useState(""),
    [feedback, setFeedback] = useState("");
  if (viewRole !== "admin")
    return <Notice error>Course management is available to admins.</Notice>;
  async function starters() {
    setWorking("starters");
    setActionError("");
    try {
      await post("admin/starters", {});
      reload();
      setFeedback("Six Butter starter courses are ready in the library.");
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setWorking("");
    }
  }
  return (
    <>
      <PageTitle
        title="Make room for learning."
        copy="Bring courses together. Publish them when they’re ready."
      />
      <UploadCourse onComplete={reload} />
      <p className="lms-small">
        Prefer to build here?{" "}
        <Link to="/butterlearn/app/create">
          Create a course shell <Arrow />
        </Link>
      </p>
      <div className="lms-section-heading">
        <h2>Your courses.</h2>
        <button
          className="lms-secondary"
          disabled={!!working}
          onClick={starters}
        >
          {working === "starters" ? "Adding…" : "Add Butter starter courses"}
        </button>
      </div>
      {actionError && <Notice error>{actionError}</Notice>}
      {feedback && <Notice>{feedback}</Notice>}
      {loading || !data ? (
        <LoadState error={error} reload={reload} />
      ) : data.courses.length ? (
        <div
          className="lms-table-wrap"
          role="region"
          aria-label="Managed courses"
          tabIndex={0}
        >
          <table className="lms-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Format</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((course) => (
                <tr key={course.id}>
                  <th scope="row">
                    {course.title}
                    <span>
                      {course.lessons.length}{" "}
                      {course.lessons.length === 1 ? "part" : "parts"} ·{" "}
                      {course.minutes} min
                    </span>
                  </th>
                  <td>{formatName(course.format)}</td>
                  <td>
                    <span
                      className={`lms-status ${course.published ? "complete" : ""}`}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="lms-table-actions">
                      <Link to={"/butterlearn/app/courses/" + course.id}>
                        Preview
                      </Link>
                      {course.authored && (
                        <Link to={"/butterlearn/app/create/" + course.id}>
                          Edit content
                        </Link>
                      )}
                      <button
                        disabled={!!working}
                        onClick={async () => {
                          setWorking(course.id);
                          setActionError("");
                          try {
                            await api("courses/" + course.id, {
                              method: "PATCH",
                              body: JSON.stringify({
                                published: !course.published,
                              }),
                            });
                            reload();
                            setFeedback(
                              `${course.title} is now ${course.published ? "a draft" : "published"}.`,
                            );
                          } catch (error) {
                            setActionError((error as Error).message);
                          } finally {
                            setWorking("");
                          }
                        }}
                      >
                        {working === course.id
                          ? "Saving…"
                          : course.published
                            ? "Unpublish"
                            : "Publish"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="lms-empty">
          <h3>Your first course starts here.</h3>
          <p>
            Upload your own learning, or add the Butter starter courses to
            explore HTML and both SCORM formats.
          </p>
        </div>
      )}
    </>
  );
}

export function People() {
  const { viewRole } = useAuth();
  const { data, error, loading, reload } = useData<Report>("admin/report");
  const [selected, setSelected] = useState<string[]>([]),
    [working, setWorking] = useState(false),
    [feedback, setFeedback] = useState(""),
    [actionError, setActionError] = useState("");
  if (viewRole !== "admin")
    return <Notice error>People management is available to admins.</Notice>;
  if (loading || !data) return <LoadState error={error} reload={reload} />;
  async function assign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWorking(true);
    setActionError("");
    const values = new FormData(event.currentTarget);
    try {
      const result = await post<{ count: number }>("admin/assign", {
        courseId: values.get("course"),
        dueDate: values.get("dueDate") || null,
        userIds: selected,
      });
      setFeedback(
        `Course assigned to ${result.count} ${result.count === 1 ? "person" : "people"}.`,
      );
      setSelected([]);
      reload();
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setWorking(false);
    }
  }
  return (
    <>
      <PageTitle
        title="Your people, together."
        copy="Assign useful learning and give everyone a clear next step."
      />
      <p className="lms-small">
        People appear after their first sign-in. Share{" "}
        <Link to="/butterlearn/login">the login page</Link> to welcome them.
      </p>
      {feedback && <Notice>{feedback}</Notice>}
      {actionError && <Notice error>{actionError}</Notice>}
      <form className="lms-assignment" onSubmit={assign}>
        <h2>A good next step.</h2>
        <div className="lms-form-row">
          <label>
            Course to assign
            <select name="course" required>
              <option value="">Choose a published course</option>
              {data.courses
                .filter((course) => course.published)
                .map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
            </select>
          </label>
          <label>
            Due date (optional)
            <input name="dueDate" type="date" />
          </label>
          <button className="lms-button" disabled={!selected.length || working}>
            {working
              ? "Assigning…"
              : `Assign to ${selected.length} ${selected.length === 1 ? "person" : "people"}`}
          </button>
        </div>
      </form>
      <div
        className="lms-table-wrap"
        role="region"
        aria-label="Workspace people"
        tabIndex={0}
      >
        <table className="lms-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Person</th>
              <th>Group</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.people.map((person) => (
              <PersonRow
                key={person.id}
                person={person}
                selected={selected.includes(person.id)}
                onSelect={() =>
                  setSelected((current) =>
                    current.includes(person.id)
                      ? current.filter((id) => id !== person.id)
                      : [...current, person.id],
                  )
                }
                onSaved={() => {
                  reload();
                  setFeedback("Account permissions updated.");
                }}
                onError={setActionError}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function PersonRow({
  person,
  selected,
  onSelect,
  onSaved,
  onError,
}: {
  person: User;
  selected: boolean;
  onSelect: () => void;
  onSaved: () => void;
  onError: (message: string) => void;
}) {
  const [role, setRole] = useState(person.role),
    [group, setGroup] = useState(person.group),
    [busy, setBusy] = useState(false);
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          aria-label={"Select " + person.name}
        />
      </td>
      <th scope="row">
        {person.name}
        <span>{person.email}</span>
      </th>
      <td>
        <input
          aria-label={"Group for " + person.name}
          value={group}
          maxLength={80}
          onChange={(event) => setGroup(event.target.value)}
        />
      </td>
      <td>
        <div className="lms-table-actions">
          <select
            aria-label={"Role for " + person.name}
            value={role}
            onChange={(event) => setRole(event.target.value as User["role"])}
          >
            <option value="learner">Learner</option>
            <option value="manager">Manager</option>
            <option value="creator">Content creator</option>
            <option value="admin">Admin</option>
          </select>
          <button
            disabled={busy || (role === person.role && group === person.group)}
            onClick={async () => {
              setBusy(true);
              onError("");
              try {
                await api("admin/people/" + person.id, {
                  method: "PATCH",
                  body: JSON.stringify({ role, group }),
                });
                onSaved();
              } catch (error) {
                onError((error as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </td>
    </tr>
  );
}

export function Reports() {
  const { viewRole } = useAuth();
  const { data, error, loading, reload } = useData<Report>("admin/report");
  const [courseId, setCourseId] = useState("all"),
    [status, setStatus] = useState("all"),
    [search, setSearch] = useState("");
  const rows = useMemo(
    () =>
      data?.enrolments
        .map((record) => ({
          record,
          course: data.courses.find((course) => course.id === record.courseId),
          person: data.people.find((person) => person.id === record.userId),
        }))
        .filter(
          (row) =>
            row.course &&
            row.person &&
            (courseId === "all" || row.record.courseId === courseId) &&
            (status === "all" || row.record.status === status) &&
            `${row.person.name} ${row.person.email} ${row.person.group}`
              .toLowerCase()
              .includes(search.toLowerCase()),
        ) || [],
    [data, courseId, status, search],
  );
  if (!viewRole || !["admin", "manager"].includes(viewRole))
    return (
      <Notice error>Team reporting is available to managers and admins.</Notice>
    );
  if (loading || !data) return <LoadState error={error} reload={reload} />;
  function download() {
    const cell = (value: unknown) =>
      '"' +
      String(value ?? "")
        .replace(/^[=+@-]/, "'")
        .replaceAll('"', '""') +
      '"';
    const csv = [
      [
        "Learner",
        "Email",
        "Group",
        "Course",
        "Status",
        "Progress (%)",
        "Score",
        "Learning minutes",
        "Due date",
        "Completed",
      ],
      ...rows.map(({ person, course, record }) => [
        person!.name,
        person!.email,
        person!.group,
        course!.title,
        statusName(record.status),
        record.percent,
        record.score,
        Math.round(record.seconds / 60),
        record.dueDate,
        record.completedAt,
      ]),
    ]
      .map((row) => row.map(cell).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download =
      "butterlearn-progress-" + new Date().toISOString().slice(0, 10) + ".csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <PageTitle
        title="Progress with perspective."
        copy="See who’s moving forward and who could use a little support."
      />
      <div className="lms-metrics">
        <div>
          <strong>{data.people.length}</strong>
          <span>People in this workspace</span>
        </div>
        <div>
          <strong>{data.enrolments.length}</strong>
          <span>Course enrolments</span>
        </div>
        <div>
          <strong>
            {
              data.enrolments.filter((record) => record.status === "completed")
                .length
            }
          </strong>
          <span>Courses completed</span>
        </div>
      </div>
      <div className="lms-report-controls">
        <label>
          Find a person
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Name, email or group"
          />
        </label>
        <label>
          Course
          <select
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
          >
            <option value="all">All courses</option>
            {data.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Progress
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">All progress</option>
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button
          className="lms-secondary"
          disabled={!rows.length}
          onClick={download}
        >
          Download CSV
        </button>
      </div>
      <p className="lms-results" role="status">
        {rows.length} {rows.length === 1 ? "record" : "records"} shown.
      </p>
      <div
        className="lms-table-wrap"
        role="region"
        aria-label="Team learning report"
        tabIndex={0}
      >
        <table className="lms-table">
          <thead>
            <tr>
              <th>Person</th>
              <th>Course</th>
              <th>Progress</th>
              <th>Score</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ person, course, record }) => (
              <tr key={record.id}>
                <th scope="row">
                  {person!.name}
                  <span>{person!.group}</span>
                </th>
                <td>{course!.title}</td>
                <td>
                  <span
                    className={`lms-status ${record.status === "completed" ? "complete" : ""}`}
                  >
                    {statusName(record.status)}
                  </span>
                  <span className="lms-small">{record.percent}% complete</span>
                </td>
                <td>{record.score === null ? "—" : record.score + "%"}</td>
                <td>
                  <DateText value={record.dueDate} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && (
        <p className="lms-small">No learning records match this view.</p>
      )}
    </>
  );
}
