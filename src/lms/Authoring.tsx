import { useEffect, useRef, useState, type FormEvent } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, Doodle } from "../components/Artwork";
import { Loading, Notice, useAuth } from "./Auth";
import { api, post, useData } from "./api";
import type { Course } from "./types";
import {
  blockNames,
  newBlock,
  type ContentBlock,
  type CourseDocument,
  type Draft,
  type Item,
} from "./authoringTypes";
import RichText from "./RichText";
import "./Authoring.css";

type CourseDraft = { course: Course; draft: Draft };
export default function CourseStudio() {
  const { courseId } = useParams(),
    { viewRole } = useAuth();
  if (!["admin", "creator"].includes(viewRole || ""))
    return (
      <Notice error>
        Course creation is available to content creators and admins.
      </Notice>
    );
  return courseId ? (
    <CourseEditor key={courseId} courseId={courseId} />
  ) : (
    <CreateCourse />
  );
}
function CreateCourse() {
  const navigate = useNavigate(),
    { user, viewRole } = useAuth();
  const { data, error, reload } = useData<{ courses: Course[] }>("courses");
  const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [format, setFormat] = useState<"html" | "scorm2004">("html"),
    [busy, setBusy] = useState(false),
    [actionError, setActionError] = useState("");
  async function create(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setActionError("");
    try {
      const result = await post<CourseDraft>("authoring", {
        title,
        description,
        format,
        minutes: 10,
        icon: "idea",
        blocks: [],
      });
      navigate("/butterlearn/app/create/" + result.course.id);
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const courses = data?.courses.filter(
    (course) =>
      course.authored &&
      (viewRole === "admin" || course.createdBy === user?.id),
  );
  return (
    <>
      <header className="lms-page-title">
        <div>
          <h1 tabIndex={-1}>Make something useful.</h1>
          <p>Start with a course shell. Shape it one idea at a time.</p>
        </div>
        <Doodle kind="idea" />
      </header>
      <form className="studio-create lms-form" onSubmit={create}>
        <label>
          Course title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={180}
            placeholder="A fresh perspective."
          />
        </label>
        <label>
          Course description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={2000}
            rows={3}
            placeholder="What will learners take away?"
          />
        </label>
        <label>
          Course format
          <select
            aria-label="Course format"
            value={format}
            onChange={(event) => setFormat(event.target.value as typeof format)}
          >
            <option value="html">HTML · learner marks complete</option>
            <option value="scorm2004">
              SCORM 2004 · tracked completion and quiz score
            </option>
          </select>
        </label>
        <div className="studio-action-row">
          <button className="lms-button" disabled={busy}>
            {busy ? "Creating…" : "Create course shell"}
            <Arrow />
          </button>
          <span className="lms-small">
            Saved as a draft. Admins publish when it’s ready.
          </span>
        </div>
        {actionError && <Notice error>{actionError}</Notice>}
      </form>
      <div className="lms-section-heading">
        <h2>Your studio.</h2>
        {viewRole === "admin" && (
          <Link to="/butterlearn/app/manage">
            Manage courses <Arrow />
          </Link>
        )}
      </div>
      {error ? (
        <Notice error>
          {error}
          <button onClick={reload}>Try again</button>
        </Notice>
      ) : !data ? (
        <Loading />
      ) : courses?.length ? (
        <div className="studio-course-grid">
          {courses.map((course) => (
            <Link
              key={course.id}
              className="studio-course"
              to={"/butterlearn/app/create/" + course.id}
            >
              <Doodle kind={course.icon} />
              <span className="lms-status">
                {course.published
                  ? course.draftRevision !== course.publishedRevision
                    ? "Published · draft changes"
                    : "Published"
                  : "Draft"}
              </span>
              <h3>{course.title}</h3>
              <p>{course.description || "A course waiting to take shape."}</p>
              <span>
                Edit course <Arrow />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="lms-empty">
          <h3>A blank canvas. A good start.</h3>
          <p>Your authored courses will appear here.</p>
        </div>
      )}
    </>
  );
}
function CourseEditor({ courseId }: { courseId: string }) {
  const { data, error, reload } = useData<CourseDraft>("authoring/" + courseId);
  if (error)
    return (
      <Notice error>
        {error}
        <button onClick={reload}>Try again</button>
      </Notice>
    );
  if (!data) return <Loading />;
  return (
    <EditorCanvas
      key={data.draft.revision}
      initial={data}
      courseId={courseId}
    />
  );
}
function EditorCanvas({
  initial,
  courseId,
}: {
  initial: CourseDraft;
  courseId: string;
}) {
  const { viewRole } = useAuth();
  const [document, setDocument] = useState(initial.draft.document),
    [revision, setRevision] = useState(initial.draft.revision),
    [course, setCourse] = useState(initial.course),
    [selected, setSelected] = useState(
      initial.draft.document.blocks[0]?.id || "",
    ),
    [dirty, setDirty] = useState(false),
    [working, setWorking] = useState(""),
    [error, setError] = useState(""),
    [feedback, setFeedback] = useState(""),
    [preview, setPreview] = useState<string | null>(null),
    [previewWidth, setPreviewWidth] = useState<"desktop" | "mobile">("desktop");
  const previewDialog = useRef<HTMLDialogElement>(null);
  const blocker = useBlocker(dirty);
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (window.confirm("Leave this draft? Unsaved changes will be lost."))
        blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    function leave(event: BeforeUnloadEvent) {
      if (dirtyRef.current) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", leave);
    return () => window.removeEventListener("beforeunload", leave);
  }, []);
  useEffect(() => {
    if (preview !== null) previewDialog.current?.showModal();
  }, [preview]);
  function change(next: CourseDocument) {
    setDocument(next);
    setDirty(true);
    setFeedback("");
    setPreview(null);
  }
  function updateBlock(next: ContentBlock) {
    change({
      ...document,
      blocks: document.blocks.map((block) =>
        block.id === next.id ? next : block,
      ),
    });
  }
  function add(type: ContentBlock["type"]) {
    const block = newBlock(type);
    change({ ...document, blocks: [...document.blocks, block] });
    setSelected(block.id);
    requestAnimationFrame(() =>
      window.document.getElementById("studio-block-edit")?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      }),
    );
  }
  async function save() {
    const result = await api<CourseDraft>("authoring/" + courseId, {
      method: "PUT",
      body: JSON.stringify({ document, revision }),
    });
    setDocument(result.draft.document);
    setRevision(result.draft.revision);
    setCourse(result.course);
    setDirty(false);
    return result;
  }
  async function action(kind: "save" | "preview" | "publish") {
    setWorking(kind);
    setError("");
    setFeedback("");
    try {
      if (kind === "preview") {
        const result = await post<{ html: string }>(
          "authoring/" + courseId + "/preview",
          { document },
        );
        setPreview(result.html);
      } else {
        if (dirty) await save();
        if (kind === "publish") {
          const result = await api<{ course: Course }>("courses/" + courseId, {
            method: "PATCH",
            body: JSON.stringify({ published: true }),
          });
          setCourse(result.course);
          setFeedback("Your course is published in the learner library.");
        } else
          setFeedback(
            course.published
              ? "Draft saved. The published course stays available until an admin publishes these changes."
              : "Draft saved. Ready to preview or share with an admin.",
          );
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setWorking("");
    }
  }
  const block = document.blocks.find((item) => item.id === selected),
    index = document.blocks.findIndex((item) => item.id === selected);
  function move(offset: number) {
    if (index + offset < 0 || index + offset >= document.blocks.length) return;
    const blocks = [...document.blocks];
    [blocks[index], blocks[index + offset]] = [
      blocks[index + offset],
      blocks[index],
    ];
    change({ ...document, blocks });
  }
  return (
    <>
      <header className="studio-header">
        <div>
          <Link className="studio-back" to="/butterlearn/app/create">
            ← Your studio
          </Link>
          <h1 tabIndex={-1}>{document.title}</h1>
          <p>
            {dirty
              ? "Unsaved changes"
              : course.published
                ? course.draftRevision !== course.publishedRevision
                  ? "Published course · saved draft changes"
                  : "Published course"
                : "Saved draft"}
          </p>
        </div>
        <div className="studio-header-actions">
          <button
            className="lms-secondary"
            disabled={!!working}
            onClick={() => action("preview")}
          >
            {working === "preview" ? "Preparing…" : "Preview"}
          </button>
          <button
            className="lms-button"
            disabled={!!working || !dirty}
            onClick={() => action("save")}
          >
            {working === "save" ? "Saving…" : "Save draft"}
            <Arrow />
          </button>
          {viewRole === "admin" && (
            <button
              className="lms-secondary"
              disabled={!!working || !document.blocks.length}
              onClick={() => action("publish")}
            >
              {working === "publish"
                ? "Publishing…"
                : course.published
                  ? "Publish changes"
                  : "Publish"}
            </button>
          )}
        </div>
      </header>
      {error && <Notice error>{error}</Notice>}
      {feedback && <Notice>{feedback}</Notice>}
      <details className="studio-settings" inert={!!working}>
        <summary>
          Course settings <span aria-hidden="true">+</span>
        </summary>
        <div className="studio-settings-grid lms-form">
          <label>
            Course title
            <input
              value={document.title}
              onChange={(event) =>
                change({ ...document, title: event.target.value })
              }
              maxLength={180}
            />
          </label>
          <label>
            Estimated minutes
            <input
              type="number"
              min={1}
              max={600}
              value={document.minutes}
              onChange={(event) =>
                change({ ...document, minutes: Number(event.target.value) })
              }
            />
          </label>
          <label>
            Course description
            <textarea
              rows={3}
              value={document.description}
              onChange={(event) =>
                change({ ...document, description: event.target.value })
              }
              maxLength={2000}
            />
          </label>
          <label>
            Course format
            <select
              aria-label="Course format"
              value={document.format}
              disabled={course.published}
              onChange={(event) =>
                change({
                  ...document,
                  format: event.target.value as CourseDocument["format"],
                })
              }
            >
              <option value="html">HTML</option>
              <option value="scorm2004">SCORM 2004</option>
            </select>
          </label>
          <label>
            Course illustration
            <select
              aria-label="Course illustration"
              value={document.icon}
              onChange={(event) =>
                change({
                  ...document,
                  icon: event.target.value as CourseDocument["icon"],
                })
              }
            >
              <option value="idea">Bright idea</option>
              <option value="heart">A little care</option>
              <option value="spark">Fresh spark</option>
            </select>
          </label>
        </div>
      </details>
      <div
        className="studio-workspace"
        data-unsaved={dirty ? "true" : undefined}
        inert={!!working}
      >
        <aside className="studio-outline">
          <h2>Your content.</h2>
          <ol>
            {document.blocks.map((item, i) => (
              <li key={item.id}>
                <button
                  aria-current={selected === item.id ? "true" : undefined}
                  onClick={() => setSelected(item.id)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {blockNames[item.type]}
                  <Arrow />
                </button>
              </li>
            ))}
          </ol>
          {!document.blocks.length && <p>Add your first block below.</p>}
          <h3>Add a block.</h3>
          <div className="studio-palette">
            {Object.entries(blockNames).map(([type, name]) => (
              <button
                key={type}
                disabled={document.blocks.length >= 60 || !!working}
                onClick={() => add(type as ContentBlock["type"])}
              >
                + {name}
              </button>
            ))}
          </div>
        </aside>
        <section className="studio-block-editor" id="studio-block-edit">
          {block ? (
            <>
              <div className="studio-block-heading">
                <h2>{blockNames[block.type]}</h2>
                <div className="studio-block-actions">
                  <button
                    aria-label="Move block up"
                    disabled={index === 0 || !!working}
                    onClick={() => move(-1)}
                  >
                    ↑
                  </button>
                  <button
                    aria-label="Move block down"
                    disabled={index === document.blocks.length - 1 || !!working}
                    onClick={() => move(1)}
                  >
                    ↓
                  </button>
                  <button
                    aria-label="Duplicate block"
                    disabled={!!working || document.blocks.length >= 60}
                    onClick={() => {
                      const copy = {
                        ...structuredClone(block),
                        id: crypto.randomUUID(),
                      };
                      const blocks = [...document.blocks];
                      blocks.splice(index + 1, 0, copy);
                      change({ ...document, blocks });
                      setSelected(copy.id);
                    }}
                  >
                    Copy
                  </button>
                  <button
                    aria-label="Remove block"
                    disabled={!!working}
                    onClick={() => {
                      if (window.confirm("Remove this content block?")) {
                        change({
                          ...document,
                          blocks: document.blocks.filter(
                            (item) => item.id !== selected,
                          ),
                        });
                        setSelected(
                          document.blocks[index - 1]?.id ||
                            document.blocks[index + 1]?.id ||
                            "",
                        );
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <fieldset disabled={!!working} className="studio-fields">
                <BlockFields
                  key={block.id}
                  block={block}
                  onChange={updateBlock}
                />
              </fieldset>
            </>
          ) : (
            <div className="studio-blank">
              <Doodle kind="spark" />
              <h2>One good idea.</h2>
              <p>
                Choose a block to start building your course. Mix content,
                layouts and interactions to make it yours.
              </p>
              <button className="lms-button" onClick={() => add("text")}>
                Start with rich text <Arrow />
              </button>
            </div>
          )}
        </section>
      </div>
      <p className="studio-footnote">
        {viewRole === "creator"
          ? "Save your draft, then ask an admin to publish it. "
          : ""}
        Images and videos use hosted HTTPS links. Knowledge checks allow
        learners to retry; they are practice activities.
      </p>
      <dialog
        aria-label="Learner preview"
        className="studio-preview-dialog"
        ref={previewDialog}
        onCancel={() => setPreview(null)}
        onClose={() => setPreview(null)}
      >
        <div className="studio-preview-toolbar">
          <strong>Learner preview</strong>
          <div role="group" aria-label="Preview size">
            <button
              aria-pressed={previewWidth === "desktop"}
              onClick={() => setPreviewWidth("desktop")}
            >
              Desktop
            </button>
            <button
              aria-pressed={previewWidth === "mobile"}
              onClick={() => setPreviewWidth("mobile")}
            >
              Mobile
            </button>
          </div>
          <button
            aria-label="Close preview"
            onClick={() => {
              previewDialog.current?.close();
              setPreview(null);
            }}
          >
            Close ×
          </button>
        </div>
        <p>
          Preview uses your current draft. It does not save learner progress.
        </p>
        {preview !== null && (
          <iframe
            title="Course content preview"
            className={previewWidth === "mobile" ? "mobile" : ""}
            sandbox="allow-scripts allow-forms"
            srcDoc={preview}
          />
        )}
      </dialog>
    </>
  );
}
function Field({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="studio-field">
      {label}
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}
function ItemFields({
  items,
  onChange,
  label,
}: {
  items: Item[];
  onChange: (items: Item[]) => void;
  label: string;
}) {
  return (
    <div className="studio-items">
      {items.map((item, i) => (
        <section key={i} className="studio-item">
          <div className="studio-item-heading">
            <strong>
              {label} {i + 1}
            </strong>
            <button
              type="button"
              disabled={items.length <= 1}
              aria-label={"Remove " + label.toLowerCase() + " " + (i + 1)}
              onClick={() => onChange(items.filter((_, index) => i !== index))}
            >
              Remove
            </button>
          </div>
          <Field
            label={label + " " + (i + 1) + " title"}
            value={item.title}
            onChange={(title) =>
              onChange(
                items.map((value, index) =>
                  index === i ? { ...value, title } : value,
                ),
              )
            }
          />
          <RichText
            label={label + " " + (i + 1) + " content"}
            html={item.html}
            onChange={(html) =>
              onChange(
                items.map((value, index) =>
                  index === i ? { ...value, html } : value,
                ),
              )
            }
          />
        </section>
      ))}
      <button
        className="lms-secondary"
        disabled={items.length >= 12}
        onClick={() =>
          onChange([
            ...items,
            { title: "A fresh idea", html: "<p>Add the detail.</p>" },
          ])
        }
      >
        Add {label.toLowerCase()}
      </button>
    </div>
  );
}
function BlockFields({
  block,
  onChange,
}: {
  block: ContentBlock;
  onChange: (block: ContentBlock) => void;
}) {
  switch (block.type) {
    case "text":
      return (
        <RichText
          label="Block content"
          html={block.html}
          onChange={(html) => onChange({ ...block, html })}
        />
      );
    case "columns":
      return (
        <>
          <label className="studio-field">
            Number of columns
            <select
              aria-label="Number of columns"
              value={block.columns.length}
              onChange={(event) =>
                onChange({
                  ...block,
                  columns:
                    Number(event.target.value) === 3
                      ? [...block.columns, "<p>A third perspective.</p>"].slice(
                          0,
                          3,
                        )
                      : block.columns.slice(0, 2),
                })
              }
            >
              <option value={2}>Two columns</option>
              <option value={3}>Three columns</option>
            </select>
          </label>
          <p className="lms-small">
            Columns stack naturally on small screens. Each supports text, images
            and video.
          </p>
          <div className={"studio-column-edit cols-" + block.columns.length}>
            {block.columns.map((html, i) => (
              <div key={i}>
                <h3>Column {i + 1}</h3>
                <RichText
                  label={"Column " + (i + 1) + " content"}
                  html={html}
                  onChange={(html) =>
                    onChange({
                      ...block,
                      columns: block.columns.map((value, index) =>
                        index === i ? html : value,
                      ),
                    })
                  }
                />
                <Field
                  label={"Column " + (i + 1) + " video URL (optional)"}
                  value={block.videos?.[i] || ""}
                  placeholder="https://…"
                  onChange={(url) =>
                    onChange({
                      ...block,
                      videos: block.columns.map((_, index) =>
                        index === i ? url : block.videos?.[index] || "",
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </>
      );
    case "image":
      return (
        <>
          <Field
            label="Image URL"
            value={block.url}
            onChange={(url) => onChange({ ...block, url })}
            placeholder="https://…"
          />
          <Field
            label="Image description"
            value={block.alt}
            onChange={(alt) => onChange({ ...block, alt })}
          />
          <Field
            label="Image caption"
            value={block.caption}
            onChange={(caption) => onChange({ ...block, caption })}
          />
          <p className="lms-small">
            Describe what the image adds for learners using a screen reader.
            Keep this blank for a decorative image.
          </p>
          {(/^https:\/\//.test(block.url) ||
            block.url.startsWith("/learning-assets/")) && (
            <img
              className="studio-image-preview"
              src={block.url}
              alt={block.alt}
            />
          )}
        </>
      );
    case "video":
      return (
        <>
          <Field
            label="Video URL"
            value={block.url}
            onChange={(url) => onChange({ ...block, url })}
            placeholder="https://…"
          />
          <p className="lms-small">
            Use a YouTube or Vimeo link, or an HTTPS link to an MP4/WebM file.
          </p>
          <Field
            label="Video title"
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <Field
            label="Video transcript"
            rows={7}
            value={block.transcript}
            onChange={(transcript) => onChange({ ...block, transcript })}
          />
        </>
      );
    case "flipcards":
    case "accordion":
    case "tabs":
      return (
        <ItemFields
          label={
            block.type === "flipcards"
              ? "Card"
              : block.type === "tabs"
                ? "Tab"
                : "Panel"
          }
          items={block.items}
          onChange={(items) => onChange({ ...block, items })}
        />
      );
    case "hotspots":
      return (
        <>
          <Field
            label="Hotspot image URL"
            value={block.url}
            onChange={(url) => onChange({ ...block, url })}
          />
          <Field
            label="Hotspot image description"
            value={block.alt}
            onChange={(alt) => onChange({ ...block, alt })}
          />
          <p className="lms-small">
            Click the image to add a point. Fine-tune its position below.
          </p>
          <div
            className="studio-hotspot-canvas"
            role="group"
            aria-label="Hotspot positions"
            onClick={(event) => {
              if (
                block.points.length >= 12 ||
                !(
                  /^https:\/\//.test(block.url) ||
                  block.url.startsWith("/learning-assets/")
                )
              )
                return;
              const rect = event.currentTarget.getBoundingClientRect();
              onChange({
                ...block,
                points: [
                  ...block.points,
                  {
                    title: "A fresh detail",
                    html: "<p>Explore this part.</p>",
                    x: Math.round(
                      ((event.clientX - rect.left) / rect.width) * 100,
                    ),
                    y: Math.round(
                      ((event.clientY - rect.top) / rect.height) * 100,
                    ),
                  },
                ],
              });
            }}
          >
            {(/^https:\/\//.test(block.url) ||
              block.url.startsWith("/learning-assets/")) && (
              <img src={block.url} alt={block.alt} />
            )}{" "}
            {block.points.map((point, i) => (
              <span key={i} style={{ left: point.x + "%", top: point.y + "%" }}>
                {i + 1}
              </span>
            ))}
          </div>
          {block.points.map((point, i) => (
            <section className="studio-item" key={i}>
              <div className="studio-item-heading">
                <strong>Point {i + 1}</strong>
                <button
                  disabled={block.points.length <= 1}
                  onClick={() =>
                    onChange({
                      ...block,
                      points: block.points.filter((_, index) => index !== i),
                    })
                  }
                >
                  Remove
                </button>
              </div>
              <Field
                label={"Point " + (i + 1) + " title"}
                value={point.title}
                onChange={(title) =>
                  onChange({
                    ...block,
                    points: block.points.map((value, index) =>
                      index === i ? { ...value, title } : value,
                    ),
                  })
                }
              />
              <div className="studio-position-fields">
                {(["x", "y"] as const).map((axis) => (
                  <label className="studio-field" key={axis}>
                    {"Point " +
                      (i + 1) +
                      " " +
                      (axis === "x" ? "horizontal" : "vertical") +
                      " position (%)"}
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={point[axis]}
                      onChange={(event) =>
                        onChange({
                          ...block,
                          points: block.points.map((value, index) =>
                            index === i
                              ? { ...value, [axis]: Number(event.target.value) }
                              : value,
                          ),
                        })
                      }
                    />
                  </label>
                ))}
              </div>
              <RichText
                label={"Point " + (i + 1) + " content"}
                html={point.html}
                onChange={(html) =>
                  onChange({
                    ...block,
                    points: block.points.map((value, index) =>
                      index === i ? { ...value, html } : value,
                    ),
                  })
                }
              />
            </section>
          ))}
          <button
            className="lms-secondary"
            disabled={block.points.length >= 12}
            onClick={() =>
              onChange({
                ...block,
                points: [
                  ...block.points,
                  {
                    title: "A fresh detail",
                    html: "<p>Explore this part.</p>",
                    x: 50,
                    y: 50,
                  },
                ],
              })
            }
          >
            Add point
          </button>
        </>
      );
    case "quiz":
      return (
        <>
          <Field
            label="Quiz question"
            value={block.question}
            onChange={(question) => onChange({ ...block, question })}
          />
          <div className="studio-quiz-options">
            {block.options.map((option, i) => (
              <div key={i}>
                <label className="studio-correct-answer">
                  <input
                    type="radio"
                    name={block.id + "-correct"}
                    checked={block.answer === i}
                    onChange={() => onChange({ ...block, answer: i })}
                    aria-label={"Option " + (i + 1) + " is correct"}
                  />
                </label>
                <Field
                  label={"Answer option " + (i + 1)}
                  value={option}
                  onChange={(option) =>
                    onChange({
                      ...block,
                      options: block.options.map((value, index) =>
                        index === i ? option : value,
                      ),
                    })
                  }
                />
                <button
                  disabled={block.options.length <= 2}
                  aria-label={"Remove answer option " + (i + 1)}
                  onClick={() =>
                    onChange({
                      ...block,
                      options: block.options.filter((_, index) => index !== i),
                      answer:
                        block.answer === i
                          ? 0
                          : block.answer > i
                            ? block.answer - 1
                            : block.answer,
                    })
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="lms-small">
            Select the circle beside the correct answer.
          </p>
          <button
            className="lms-secondary"
            disabled={block.options.length >= 6}
            onClick={() =>
              onChange({
                ...block,
                options: [...block.options, "Another possibility"],
              })
            }
          >
            Add answer option
          </button>
          <Field
            label="Correct answer feedback"
            value={block.feedback}
            rows={3}
            onChange={(feedback) => onChange({ ...block, feedback })}
          />
          <p className="lms-small">
            SCORM courses require each knowledge check to be answered correctly
            before completion. Learners can retry.
          </p>
        </>
      );
  }
}
