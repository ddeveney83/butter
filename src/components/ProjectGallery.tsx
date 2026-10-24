import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";
import { Arrow } from "./Artwork";
import { Reveal } from "./UI";
import "./ProjectGallery.css";

export default function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const open = selected !== null;
  useEffect(() => {
    if (!open || !dialog.current) return;
    const node = dialog.current;
    node.showModal();
    return () => {
      node.close();
    };
  }, [open]);
  function close() {
    dialog.current?.close();
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
      className="project-gallery container"
      aria-label="Project image gallery"
    >
      <div className="project-gallery-grid">
        {project.gallery.map((image, index) => (
          <Reveal key={image.path} delay={index * 60}>
            <button
              type="button"
              className="project-image-open"
              aria-label={`Expand ${image.alt}`}
              data-cursor-label="View larger"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setSelected(index);
              }}
            >
              <img
                src={image.path}
                alt={image.alt}
                width="1200"
                height="675"
                loading="lazy"
              />
              <span className="project-image-expand" aria-hidden="true">
                <Arrow diagonal />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-lightbox"
        aria-label={`${project.title} image gallery`}
        onClose={() => {
          setSelected(null);
          opener.current?.focus({ preventScroll: true });
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
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
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
          if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            setSelected(event.key === "Home" ? 0 : project.gallery.length - 1);
          }
          if (event.key !== "Tab") return;
          const buttons = [
            ...event.currentTarget.querySelectorAll<HTMLButtonElement>(
              "button",
            ),
          ];
          const first = buttons[0],
            last = buttons.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <button
          type="button"
          className="project-lightbox-close"
          aria-label="Close project image preview"
          data-cursor-label="Close"
          onClick={close}
        >
          <span aria-hidden="true">×</span>
        </button>
        {selected !== null && (
          <>
            <img
              className="project-lightbox-image"
              src={project.gallery[selected].path}
              alt={`${project.title} — ${project.gallery[selected].alt}`}
              width="1200"
              height="675"
            />
            <div className="project-lightbox-controls">
              <button
                type="button"
                aria-label="Previous project image"
                data-cursor-label="Previous image"
                onClick={() => move(-1)}
              >
                <Arrow />
              </button>
              <span
                className="project-gallery-status"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {project.gallery[selected].alt} — {selected + 1} of{" "}
                {project.gallery.length}
              </span>
              <button
                type="button"
                aria-label="Next project image"
                data-cursor-label="Next image"
                onClick={() => move(1)}
              >
                <Arrow />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
