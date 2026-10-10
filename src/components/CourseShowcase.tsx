import { useEffect, useId, useRef, useState } from "react";
import { Arrow, ButterCharacter, Doodle, Spark } from "./Artwork";
import {
  coursePreviews,
  courseScreens,
  type CoursePreview,
} from "../data/coursePreviews";
import type { Project } from "../data/projects";
import { Reveal } from "./UI";
import "./CourseShowcase.css";

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

function CourseIllustration({ kind }: { kind: CoursePreview["illustration"] }) {
  if (kind === "butter") return <ButterCharacter />;
  if (kind === "heart" || kind === "idea") return <Doodle kind={kind} />;
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "cloud" && (
          <>
            <path
              d="M54 156c-43 0-46-61-5-70 0-46 67-65 91-20 37-15 69 13 64 46 31 24 10 55-19 55H64Z"
              fill="#fff9d8"
            />
            <path d="m89 118 8 5 8-5m32 0 8 5 8-5m-39 16q12 10 24 0M54 190h33m18 0h65" />
          </>
        )}
        {kind === "shield" && (
          <>
            <path
              d="m120 32 72 29v57c0 43-36 72-72 91-36-19-72-48-72-91V61Z"
              fill="#f8e477"
            />
            <path d="m83 115 25 25 50-55" strokeWidth="9" />
            <path d="M25 82 13 76m202 6 12-6M120 10V2" />
          </>
        )}
        {kind === "plant" && (
          <>
            <path
              d="M120 143V77m0 32c-51 1-68-27-66-52 37-3 66 17 66 52Zm0-17c46 0 67-28 65-54-39-3-65 22-65 54Z"
              fill="#d4e3ce"
            />
            <path d="m71 143 13 69h73l13-69Z" fill="#f8e477" />
            <path d="M70 143h101m-67 24v6m33-6v6m-33 12q16 13 33 0M38 199l-13 8m168-10 15 7" />
          </>
        )}
      </g>
    </svg>
  );
}

export function CourseShowcase({ project }: { project: Project }) {
  const preview = coursePreviews[project.id];
  const instance = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [screen, setScreen] = useState(0);
  const [device, setDevice] = useState("desktop");
  const [hotspot, setHotspot] = useState(0);
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
                      <CourseIllustration kind={preview.illustration} />
                      <Spark className="course-spark" />
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div className="course-explore">
                    <div className="course-hotspot-scene">
                      <div className="course-illustration">
                        <CourseIllustration kind={preview.illustration} />
                      </div>
                      <div role="group" aria-label="Explore course hotspots">
                        {preview.hotspots.map((item, spot) => (
                          <button
                            type="button"
                            key={item.label}
                            className={`course-hotspot course-hotspot-${spot}`}
                            aria-label={`Explore ${item.label}`}
                            aria-pressed={hotspot === spot}
                            onClick={() => setHotspot(spot)}
                            data-cursor-label="Explore"
                          >
                            <span>{spot + 1}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="course-explore-copy">
                      <h2>{preview.exploration}</h2>
                      <p className="course-instruction">
                        Select a marker. Follow your curiosity.
                      </p>
                      <div className="course-hotspot-details">
                        <div aria-live="polite" aria-atomic="true">
                          <h3>{preview.hotspots[hotspot].heading}</h3>
                          <p>{preview.hotspots[hotspot].detail}</p>
                        </div>
                        {preview.hotspots.map((item) => (
                          <div
                            key={item.label}
                            aria-hidden="true"
                            className="course-measure"
                          >
                            <h3>{item.heading}</h3>
                            <p>{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
  const preview = coursePreviews[project.id];
  const source = preview.images?.[index];
  const description = `${project.title} ${courseScreens[index]} course image`;
  if (source)
    return (
      <img
        className="course-image"
        src={source}
        alt={description}
        loading="lazy"
      />
    );
  return (
    <div
      className={`course-image-placeholder course-placeholder-${index}`}
      data-theme={project.theme}
      role="img"
      aria-label={`${description} placeholder`}
    >
      <div className="course-placeholder-bar" aria-hidden="true">
        <span className="course-mini-brand">
          butter
          <Spark />
        </span>
        <span>0{index + 1} / 03</span>
      </div>
      <div className="course-placeholder-content" aria-hidden="true">
        <div className="course-placeholder-copy">
          <strong>
            <CourseTitle
              text={
                index === 0
                  ? preview.welcome
                  : index === 1
                    ? preview.exploration
                    : "A small step. A little difference."
              }
            />
          </strong>
          {index === 1 ? (
            <div className="course-placeholder-markers">
              {preview.hotspots.map((item, i) => (
                <span key={item.label}>
                  <i>{i + 1}</i>
                  {item.label}
                </span>
              ))}
            </div>
          ) : (
            <>
              <div className="course-placeholder-line" />
              <div className="course-placeholder-line short" />
            </>
          )}
        </div>
        <div className="course-placeholder-art">
          <CourseIllustration kind={preview.illustration} />
          <Spark className="course-spark" />
        </div>
      </div>
    </div>
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
        {courseScreens.map((name, index) => (
          <Reveal
            key={name}
            className={`course-gallery-item course-gallery-item-${index}`}
            delay={index * 60}
          >
            <figure>
              <button
                type="button"
                className="course-image-open"
                aria-label={`Expand ${name} course image`}
                onClick={() => setSelected(index)}
                data-cursor-label="View larger"
              >
                <CourseImage project={project} index={index} />
                <span className="course-image-expand" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              </button>
              <figcaption>
                <span>{name}</span>
                <span>0{index + 1} / 03</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      {!coursePreviews[project.id].images && (
        <p className="course-gallery-note">
          Course image placeholders for this concept. Select an image to
          explore.
        </p>
      )}
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
                {courseScreens[selected]} — {selected + 1} of 3
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
