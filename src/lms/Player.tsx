import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow } from "../components/Artwork";
import { Loading, Notice } from "./Auth";
import { api, post, useData } from "./api";
import { formatName, type Course, type Launch, type Progress } from "./types";

type Tracking = { cmi: Record<string, string>; kind: string };
export function CoursePlayer() {
  const { courseId } = useParams();
  const { data, error, loading, reload, setData } = useData<{ course: Course }>(
    "courses/" + courseId,
  );
  const [launch, setLaunch] = useState<Launch | null>(null),
    [opening, setOpening] = useState(false),
    [playerError, setPlayerError] = useState(""),
    [saveState, setSaveState] = useState("Your progress saves as you learn."),
    [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null),
    stage = useRef<HTMLDivElement>(null),
    chain = useRef<Promise<unknown>>(Promise.resolve()),
    latest = useRef<Tracking | null>(null);
  useEffect(() => {
    setLaunch(null);
  }, [courseId]);
  const course = data?.course;
  async function open(lessonId: string) {
    setOpening(true);
    setPlayerError("");
    setLoaded(false);
    try {
      // Flush the current object before reading the next object's resume state.
      if (launch && latest.current) {
        await chain.current;
        const saved = await post<{ enrolment: Progress }>(
          "launches/" + launch.token,
          { cmi: latest.current.cmi },
        );
        updateProgress(saved.enrolment);
      }
      if (!course!.enrolment) await post("courses/" + courseId + "/enrol", {});
      const session = await post<Launch>("courses/" + courseId + "/launch", {
        lessonId,
      });
      setLaunch(session);
      setData((current) =>
        current
          ? { course: { ...current.course, enrolment: session.enrolment } }
          : current,
      );
    } catch (error) {
      setPlayerError((error as Error).message);
    } finally {
      setOpening(false);
    }
  }
  function updateProgress(record: Progress) {
    setData((current) =>
      current ? { course: { ...current.course, enrolment: record } } : current,
    );
  }
  useEffect(() => {
    if (!launch) return;
    latest.current = null;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const target = launch;
    function save(snapshot: Tracking, keepalive = false) {
      setSaveState("Saving your progress…");
      chain.current = chain.current
        .catch(() => {})
        .then(() =>
          api<{ enrolment: Progress }>("launches/" + target.token, {
            method: "POST",
            body: JSON.stringify({ cmi: snapshot.cmi }),
            keepalive: keepalive && JSON.stringify(snapshot.cmi).length < 50000,
          }),
        )
        .then((value) => {
          updateProgress((value as { enrolment: Progress }).enrolment);
          setSaveState("Progress saved.");
          setPlayerError("");
        })
        .catch((error) => {
          setSaveState("Progress has not saved.");
          setPlayerError(error.message);
        });
    }
    function receive(event: MessageEvent) {
      if (
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "butterlearn-scorm" ||
        event.data.launch !== target.token
      )
        return;
      if (event.data.kind === "ready") {
        setLoaded(true);
        return;
      }
      const tracking = {
        cmi: event.data.cmi,
        kind: event.data.kind,
      } as Tracking;
      if (!tracking.cmi || typeof tracking.cmi !== "object") return;
      latest.current = tracking;
      clearTimeout(timer);
      if (tracking.kind === "update")
        timer = setTimeout(() => save(tracking), 500);
      else save(tracking);
    }
    function leaving() {
      clearTimeout(timer);
      if (latest.current) save(latest.current, true);
    }
    window.addEventListener("message", receive);
    window.addEventListener("pagehide", leaving);
    return () => {
      window.removeEventListener("message", receive);
      window.removeEventListener("pagehide", leaving);
      clearTimeout(timer);
      if (latest.current) save(latest.current);
      chain.current
        .finally(() => post("launches/" + target.token + "/close", {}))
        .catch(() => {});
    };
  }, [launch?.token]);
  async function completeHTML() {
    if (!launch) return;
    try {
      const value = await post<{ enrolment: Progress }>(
        "launches/" + launch.token,
        { cmi: {}, manual: true },
      );
      updateProgress(value.enrolment);
      setSaveState("Completed. A good little milestone.");
    } catch (error) {
      setPlayerError((error as Error).message);
    }
  }
  if (loading || !course)
    return error ? (
      <Notice error>
        {error} <button onClick={reload}>Try again</button>{" "}
        <Link to="/butterlearn/app/library">Back to the library</Link>
      </Notice>
    ) : (
      <Loading />
    );
  const current = launch?.lesson;
  return (
    <div className="lms-player-page">
      <Link className="lms-back" to="/butterlearn/app/library">
        ← Back to the library
      </Link>
      <header className="lms-page-title">
        <div>
          <h1 tabIndex={-1}>{course.title}</h1>
          <p>{course.description}</p>
          <span className="lms-small">
            {formatName(course.format)} · {course.minutes} min ·{" "}
            {course.lessons.length}{" "}
            {course.lessons.length === 1 ? "part" : "parts"}
            {!course.published ? " · Draft preview" : ""}
          </span>
        </div>
      </header>
      {playerError && (
        <Notice error>
          {playerError}
          {launch && latest.current && (
            <button
              onClick={async () => {
                try {
                  const value = await post<{ enrolment: Progress }>(
                    "launches/" + launch.token,
                    { cmi: latest.current!.cmi },
                  );
                  updateProgress(value.enrolment);
                  setPlayerError("");
                  setSaveState("Progress saved.");
                } catch (error) {
                  setPlayerError((error as Error).message);
                }
              }}
            >
              Retry saving
            </button>
          )}
        </Notice>
      )}
      <div className="lms-lesson-list" role="group" aria-label="Course parts">
        {course.lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            disabled={opening}
            aria-pressed={current?.id === lesson.id}
            onClick={() => open(lesson.id)}
          >
            <span>
              {course.enrolment?.lessons[lesson.id]?.status === "completed"
                ? "✓"
                : String(index + 1).padStart(2, "0")}
            </span>
            {lesson.title}
            <Arrow />
          </button>
        ))}
      </div>
      {!launch ? (
        <div className="lms-player-start">
          <h2>A good next step.</h2>
          <p>Your progress and resume point will stay with your account.</p>
          <button
            className="lms-button"
            disabled={opening}
            onClick={() => {
              const next =
                course.lessons.find(
                  (lesson) =>
                    course.enrolment?.lessons[lesson.id]?.status !==
                    "completed",
                ) || course.lessons[0];
              open(next.id);
            }}
          >
            {opening
              ? "Opening your course…"
              : course.enrolment?.status === "completed"
                ? "Revisit course"
                : course.enrolment?.status === "in-progress"
                  ? "Continue learning"
                  : "Start learning"}
            <Arrow />
          </button>
        </div>
      ) : (
        <>
          <div className="lms-player-toolbar">
            <p role="status">{saveState}</p>
            <div>
              {course.format === "html" && (
                <button
                  className="lms-secondary"
                  onClick={completeHTML}
                  disabled={
                    course.enrolment?.lessons[current!.id]?.status ===
                    "completed"
                  }
                >
                  {course.enrolment?.lessons[current!.id]?.status ===
                  "completed"
                    ? "Completed ✓"
                    : "Mark complete"}
                </button>
              )}
              <button
                className="lms-secondary"
                onClick={() =>
                  stage.current
                    ?.requestFullscreen()
                    .catch(() =>
                      setPlayerError(
                        "Your browser could not expand this course. You can continue in the page.",
                      ),
                    )
                }
              >
                Expand course
              </button>
            </div>
          </div>
          <div className="lms-player-stage" ref={stage}>
            {!loaded && (
              <p role="status" className="lms-frame-loading">
                Opening your course…
              </p>
            )}
            <iframe
              key={launch.token}
              ref={frame}
              src={launch.url}
              title={course.title + " — " + current!.title}
              sandbox="allow-scripts allow-forms allow-popups allow-downloads"
              allow="fullscreen"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
          {course.lessons.length > 1 && (
            <div className="lms-player-footer">
              <span>{course.enrolment?.percent || 0}% complete</span>
              <button
                className="lms-secondary"
                disabled={
                  opening ||
                  course.lessons.findIndex(
                    (lesson) => lesson.id === current!.id,
                  ) ===
                    course.lessons.length - 1
                }
                onClick={() => {
                  const index = course.lessons.findIndex(
                    (lesson) => lesson.id === current!.id,
                  );
                  open(course.lessons[index + 1].id);
                }}
              >
                Next part <Arrow />
              </button>
            </div>
          )}
          <Link className="lms-course-open" to="/butterlearn/app">
            Back to my learning <Arrow />
          </Link>
        </>
      )}
    </div>
  );
}
