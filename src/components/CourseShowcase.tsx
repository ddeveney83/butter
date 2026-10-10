import { useEffect, useId, useRef, useState } from "react";
import { Arrow, LearningIllustration, Spark } from "./Artwork";
import { coursePreviews, courseScreens } from "../data/coursePreviews";
import type { Project } from "../data/projects";
import { Reveal } from "./UI";
import "./CourseShowcase.css";
import CourseInteraction from "./CourseInteraction";

function CourseTitle({ text }: { text: string }) {
  const split = text.indexOf(". ");
  return split === -1 ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, split + 1)}
      <br />
      {text.slice(split + 2)}
    </>
  );
}

export function CourseShowcase({ project }: { project: Project }) {
  const preview = coursePreviews[project.id];
  const instance = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [screen, setScreen] = useState(0);
  const [device, setDevice] = useState("desktop");
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  function selectScreen(index: number, focus = false) {
    setScreen(index);
    if (focus) tabs.current[index]?.focus();
  }
  return (
    <div className="course-showcase" data-theme={project.theme}>
      <div className="course-showcase-toolbar">
        <span>Try the course preview</span>
        <div
          className="course-device-switch"
          role="group"
          aria-label="Preview device"
        >
          {["desktop", "mobile"].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={device === value}
              onClick={() => setDevice(value)}
              data-cursor-label={`View ${value}`}
            >
              {value === "desktop" ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M9 21h6m-3-4v4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="6" y="2" width="12" height="20" rx="3" />
                  <path d="M10 18h4" />
                </svg>
              )}
              <span>{value === "desktop" ? "Desktop" : "Mobile"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="course-preview-stage" data-device={device}>
        <div className="course-player">
          <div className="course-player-bar">
            <span className="course-mini-brand">
              butter
              <Spark />
            </span>
            <span aria-live="polite" aria-atomic="true">
              Screen {screen + 1} of 3
            </span>
          </div>
          <div className="course-screen-stack">
            {courseScreens.map((name, index) => (
              <div
                key={name}
                className={`course-screen course-screen-${index}`}
                role="tabpanel"
                id={`${instance}-panel-${index}`}
                aria-labelledby={`${instance}-tab-${index}`}
                aria-hidden={screen !== index}
                inert={screen !== index}
                tabIndex={screen === index ? 0 : -1}
              >
                {index === 0 && (
                  <div className="course-welcome">
                    <div className="course-welcome-copy">
                      <h2>
                        <CourseTitle text={preview.welcome} />
                      </h2>
                      <p>{preview.introduction}</p>
                      <button
                        type="button"
                        className="course-start"
                        onClick={() => selectScreen(1, true)}
                        data-cursor-label="Start exploring"
                      >
                        Start exploring <Arrow />
                      </button>
                    </div>
                    <div className="course-illustration">
                      <LearningIllustration kind={preview.illustration} />
                      <Spark className="course-spark" />
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <CourseInteraction
                    project={project}
                    preview={preview}
                    art={
                      <div className="course-illustration">
                        <LearningIllustration kind={preview.illustration} />
                      </div>
                    }
                  />
                )}
                {index === 2 && (
                  <div className="course-takeaway">
                    <h2>Make it yours.</h2>
                    <p className="course-instruction">
                      Turn a card. Find your next small step.
                    </p>
                    <div className="course-flip-cards">
                      {preview.cards.map((card, cardIndex) => (
                        <button
                          type="button"
                          key={card.question}
                          className="course-flip-card"
                          aria-label={`${revealed[cardIndex] ? "Turn back" : "Reveal"}: ${card.question}`}
                          aria-pressed={revealed[cardIndex]}
                          data-revealed={revealed[cardIndex]}
                          data-cursor-label={
                            revealed[cardIndex] ? "Turn back" : "Reveal"
                          }
                          onClick={() =>
                            setRevealed((current) =>
                              current.map((value, i) =>
                                i === cardIndex ? !value : value,
                              ),
                            )
                          }
                        >
                          <span className="course-flip-inner">
                            <span
                              className="course-card-front"
                              aria-hidden={revealed[cardIndex]}
                            >
                              <span className="course-card-number">
                                0{cardIndex + 1}
                              </span>
                              <strong>{card.question}</strong>
                              <span className="course-card-cue">
                                Turn over <Arrow />
                              </span>
                            </span>
                            <span
                              className="course-card-back"
                              aria-hidden={!revealed[cardIndex]}
                            >
                              <span>{card.answer}</span>
                              <span className="course-card-cue">
                                Turn back <Arrow />
                              </span>
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="course-player-nav">
            <button
              className="course-screen-arrow course-previous"
              type="button"
              aria-label="Previous course screen"
              onClick={() => selectScreen((screen + 2) % 3)}
              data-cursor-label="Previous screen"
            >
              <Arrow />
            </button>
            <div
              className="course-screen-tabs"
              role="tablist"
              aria-label="Course preview screens"
            >
              {courseScreens.map((name, index) => (
                <button
                  type="button"
                  key={name}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  role="tab"
                  id={`${instance}-tab-${index}`}
                  aria-controls={`${instance}-panel-${index}`}
                  aria-selected={screen === index}
                  tabIndex={screen === index ? 0 : -1}
                  onClick={() => selectScreen(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowRight") next = (index + 1) % 3;
                    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = 2;
                    else return;
                    event.preventDefault();
                    selectScreen(next, true);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
            <button
              className="course-screen-arrow"
              type="button"
              aria-label="Next course screen"
              onClick={() => selectScreen((screen + 1) % 3)}
              data-cursor-label="Next screen"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseImage({ project, index }: { project: Project; index: number }) {
  const image = project.gallery[index];
  return (
    <img
      className="course-image"
      src={image.path}
      alt={`${project.title} — ${image.alt}`}
      loading="lazy"
    />
  );
}

export function CourseGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (selected !== null && !dialog.current?.open) dialog.current?.showModal();
  }, [selected]);
  useEffect(() => {
    const node = dialog.current;
    return () => node?.close();
  }, []);
  function move(direction: number) {
    setSelected((current) =>
      current === null ? null : (current + direction + 3) % 3,
    );
  }
  return (
    <section
      className="course-gallery container"
      aria-label="Course image gallery"
    >
      <Reveal>
        <h2>A closer look.</h2>
      </Reveal>
      <div className="course-gallery-grid">
        {project.gallery.map((image, index) => (
          <Reveal
            key={image.path}
            className={`course-gallery-item course-gallery-item-${index}`}
            delay={index * 60}
          >
            <figure>
              <button
                type="button"
                className="course-image-open"
                aria-label={`Expand ${image.alt} project image`}
                onClick={() => setSelected(index)}
                data-cursor-label="View larger"
              >
                <CourseImage project={project} index={index} />
                <span className="course-image-expand" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              </button>
              <figcaption>
                <span>{image.alt}</span>
                <span>0{index + 1} / 03</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="course-gallery-note">
        Original project screens · Daniel Deveney. Select an image to explore.
      </p>
      <dialog
        ref={dialog}
        className="course-lightbox"
        aria-labelledby={titleId}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const controls = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "button:not(:disabled)",
              ),
            );
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
            return;
          }
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }}
      >
        <div className="course-lightbox-top">
          <h2 id={titleId}>Course image preview</h2>
          <button
            type="button"
            aria-label="Close course image preview"
            onClick={() => dialog.current?.close()}
            data-cursor-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {selected !== null && (
          <figure>
            <CourseImage project={project} index={selected} />
            <figcaption>
              <button
                type="button"
                aria-label="Previous course image"
                data-cursor-label="Previous image"
                onClick={() => move(-1)}
              >
                <Arrow />
              </button>
              <span aria-live="polite" aria-atomic="true">
                {project.gallery[selected].alt} — {selected + 1} of 3
              </span>
              <button
                type="button"
                aria-label="Next course image"
                data-cursor-label="Next image"
                onClick={() => move(1)}
              >
                <Arrow />
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
