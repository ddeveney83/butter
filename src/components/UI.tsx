import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Arrow, ProjectArt, Spark } from "./Artwork";
import type { Project } from "../data/projects";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current!;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`reveal ${className}`} ref={ref}>
      {children}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      className="project"
      to={`/work/${project.id}`}
      aria-label={`Explore ${project.title}`}
    >
      <div className="project-image">
        <ProjectArt kind={project.theme} />
        <span className="project-open">
          <Arrow diagonal />
        </span>
        <span className="concept-label">Concept project</span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
        <Arrow diagonal />
      </div>
    </Link>
  );
}

export function ContactCTA({ title }: { title?: ReactNode }) {
  return (
    <Reveal className="contact-section container">
      <Spark className="contact-spark" />
      <h2>
        {title || (
          <>
            Got something
            <br />
            worth <span className="underlined">spreading?</span>
          </>
        )}
      </h2>
      <div className="contact-bottom">
        <p>Let’s turn it into something people remember.</p>
        <Link className="pill-button" to="/contact">
          Let’s make it happen <Arrow diagonal />
        </Link>
      </div>
    </Reveal>
  );
}

export function PageHero({
  title,
  children,
  aside,
}: {
  title: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={`page-hero container ${aside ? "with-aside" : ""}`}>
      <div>
        <h1>{title}</h1>
        <div className="page-description">{children}</div>
      </div>
      {aside && <div className="page-hero-aside">{aside}</div>}
    </section>
  );
}

export function TextLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <Arrow diagonal />
    </Link>
  );
}

export function Tabs({
  items,
  label,
}: {
  label: string;
  items: { id: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="interactive-tabs">
      <div className="tab-list" role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={active === index}
            aria-controls={`panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              let next = active;
              if (event.key === "ArrowRight")
                next = (active + 1) % items.length;
              else if (event.key === "ArrowLeft")
                next = (active + items.length - 1) % items.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = items.length - 1;
              else return;
              event.preventDefault();
              setActive(next);
              buttons.current[next]?.focus();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        key={items[active].id}
        className="tab-panel"
        role="tabpanel"
        id={`panel-${items[active].id}`}
        aria-labelledby={`tab-${items[active].id}`}
        tabIndex={0}
      >
        {items[active].content}
      </div>
    </div>
  );
}
