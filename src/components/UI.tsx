import {
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MotionLink as Link, useReducedMotion } from "./Motion";
import { Arrow, Spark } from "./Artwork";
import type { Project } from "../data/projects";
import "./Portfolio.css";
import ProjectCardArtwork from "./ProjectCardArtwork";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const node = ref.current!;
    if (
      reduced ||
      !("IntersectionObserver" in window) ||
      node.classList.contains("is-visible")
    ) {
      node.dataset.reveal = "ready";
      return;
    }
    node.dataset.reveal = "pending";
    // Commit the starting opacity before an immediately visible item is revealed.
    void window.getComputedStyle(node).opacity;
    function show() {
      node.dataset.reveal = "ready";
      node.classList.add("is-visible");
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [reduced]);
  return (
    <div
      className={`reveal ${className}`}
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
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
        <ProjectCardArtwork project={project} />
        <span className="project-open">
          <Arrow diagonal />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.title}</h3>
          <p>
            {project.client} · {project.category}
          </p>
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
  const instance = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div className="interactive-tabs">
      <div
        className="tab-list"
        role="tablist"
        aria-label={label}
        style={
          {
            "--tab-count": items.length,
            "--tab-active": active,
          } as CSSProperties
        }
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              buttons.current[index] = node;
            }}
            type="button"
            id={`${instance}-tab-${item.id}`}
            role="tab"
            aria-label={item.label}
            aria-selected={active === index}
            aria-controls={`${instance}-panel-${item.id}`}
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
            {/^\d{2} \/ /.test(item.label) ? (
              <>
                <span className="tab-number" aria-hidden="true">
                  {item.label.slice(0, 2)}
                </span>
                <span>{item.label.slice(5)}</span>
              </>
            ) : (
              item.label
            )}
          </button>
        ))}
      </div>
      <div className="tab-panels">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="tab-panel"
            role="tabpanel"
            id={`${instance}-panel-${item.id}`}
            aria-labelledby={`${instance}-tab-${item.id}`}
            aria-hidden={active !== index}
            inert={active !== index}
            tabIndex={active === index ? 0 : -1}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Accordion({
  title,
  children,
  variant = "faq",
  number,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  variant?: "service" | "faq";
  number?: string;
  defaultOpen?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const id = useId();
  const Heading = variant === "service" ? "h2" : "h3";
  return (
    <div
      className={`accordion ${variant === "service" ? "service-detail" : "faq-detail"}`}
      data-expanded={expanded}
    >
      <Heading className="accordion-heading">
        <button
          className="accordion-trigger"
          type="button"
          id={`${id}-trigger`}
          aria-expanded={expanded}
          aria-controls={`${id}-content`}
          onClick={() => setExpanded((current) => !current)}
        >
          {number && (
            <span className="service-number" aria-hidden="true">
              {number}
            </span>
          )}
          <span className="accordion-title">{title}</span>
          <svg
            className="disclosure-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              className="disclosure-vertical"
              d="M12 5v14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Heading>
      <div
        id={`${id}-content`}
        className="accordion-panel"
        role="region"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </div>
  );
}
