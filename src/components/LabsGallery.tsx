import { useEffect, useId, useRef, useState } from "react";
import { Arrow } from "./Artwork";
import type { LabProject } from "../data/labs";

export default function LabsGallery({ project }: { project: LabProject }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  useEffect(() => {
    if (selected === null || !dialog.current || dialog.current.open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected === null]);
  useEffect(() => () => dialog.current?.close(), []);
  function close() {
    dialog.current?.close();
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }
  function move(delta: number) {
    setSelected((current) =>
      current === null
        ? null
        : (current + delta + project.gallery.length) % project.gallery.length,
    );
  }
  return (
    <section
      id="screens"
      className="lab-gallery container"
      aria-labelledby="lab-gallery-heading"
    >
      <div className="lab-gallery-intro">
        <h2 id="lab-gallery-heading">Inside the build.</h2>
        <p>Select a screen to take a closer look.</p>
      </div>
      <div className="lab-gallery-grid">
        {project.gallery.map((image, i) => (
          <figure key={image.path}>
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(i);
              }}
              aria-label={`Expand ${image.caption}`}
              data-cursor-label="View screen"
            >
              <img
                src={image.path}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
              <span aria-hidden="true">
                <Arrow diagonal />
              </span>
            </button>
            <figcaption>
              <span>{image.caption}</span>
              <span>
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(project.gallery.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lab-lightbox"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          setSelected(null);
          opener.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
          if (event.key === "Home") {
            event.preventDefault();
            setSelected(0);
          }
          if (event.key === "End") {
            event.preventDefault();
            setSelected(project.gallery.length - 1);
          }
          if (event.key === "Tab") {
            const buttons = Array.from(
              event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
            );
            if (event.shiftKey && document.activeElement === buttons[0]) {
              event.preventDefault();
              buttons.at(-1)?.focus();
            } else if (
              !event.shiftKey &&
              document.activeElement === buttons.at(-1)
            ) {
              event.preventDefault();
              buttons[0]?.focus();
            }
          }
        }}
      >
        <header>
          <h2 id={titleId}>{project.title} screens</h2>
          <button
            type="button"
            aria-label="Close screen preview"
            onClick={close}
          >
            ×
          </button>
        </header>
        {selected !== null && (
          <figure>
            <img
              src={project.gallery[selected].path}
              alt={project.gallery[selected].alt}
              width={project.gallery[selected].width}
              height={project.gallery[selected].height}
            />
            <figcaption>
              <button
                type="button"
                aria-label="Previous screen"
                onClick={() => move(-1)}
              >
                <Arrow />
              </button>
              <span aria-live="polite" aria-atomic="true">
                {project.gallery[selected].caption} — {selected + 1} of{" "}
                {project.gallery.length}
              </span>
              <button
                type="button"
                aria-label="Next screen"
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
