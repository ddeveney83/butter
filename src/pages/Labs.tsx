import { useState } from "react";
import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter } from "../components/Artwork";
import { PageHero, Reveal, ContactCTA } from "../components/UI";
import { labs, type LabProject } from "../data/labs";
import { articles } from "../data/editorial";
import { ArticleCard } from "./Journal";
import LabsGallery from "../components/LabsGallery";
import NotFound from "./NotFound";
import "./Labs.css";

function LabCard({
  project,
  featured = false,
}: {
  project: LabProject;
  featured?: boolean;
}) {
  return (
    <Link
      className={`lab-project-card${featured ? " featured" : ""} lab-theme-${project.theme}`}
      to={`/labs/${project.slug}`}
    >
      <div className="lab-project-preview">
        <img
          src={project.hero.path}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          loading="lazy"
        />
        <span className="lab-status">{project.status}</span>
      </div>
      <div className="lab-project-card-copy">
        <span className="lab-category">{project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <span className="lab-project-action">
          Explore the project <Arrow diagonal />
        </span>
      </div>
    </Link>
  );
}
export default function Labs() {
  const [status, setStatus] = useState("All projects");
  const visible = labs.filter(
    (project) => status === "All projects" || project.status === status,
  );
  return (
    <>
      <PageHero
        title={
          <>
            A little space
            <br />
            for <span className="underlined">what if.</span>
          </>
        }
        aside={<ButterCharacter className="labs-mascot" />}
      >
        <p>
          Tools, prototypes and stories from the butter workbench. Explore the
          ideas, see how they were built and take a closer look at the work.
        </p>
      </PageHero>
      <section className="labs-projects container">
        <div className="studio-list-toolbar">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter Labs projects"
          >
            {["All projects", "Beta", "Alpha"].map((item) => (
              <button
                key={item}
                aria-pressed={status === item}
                onClick={() => setStatus(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span role="status">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
          </span>
        </div>
        <div className="lab-project-grid">
          {visible.map((project, i) => (
            <LabCard
              key={project.slug}
              project={project}
              featured={i === 0 && visible.length % 2 === 1}
            />
          ))}
        </div>
        <p className="labs-project-note">
          Alpha and beta projects explore a working approach while development
          and evaluation continue. Each walkthrough shows the state and screens
          of that build.
        </p>
      </section>
      <section className="journal-labs-link container">
        <div>
          <h2>Curious about the thinking?</h2>
          <p>
            Practical guides to learning design, accessible experiences and
            useful technology.
          </p>
        </div>
        <Link className="pill-button" to="/journal">
          Read the journal <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA />
    </>
  );
}
export function LabExperiment() {
  const { slug } = useParams();
  const project = labs.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const next = labs[(labs.indexOf(project) + 1) % labs.length];
  return (
    <>
      <section className="lab-project-heading container">
        <Link className="studio-back-link" to="/labs">
          ← All projects
        </Link>
        <div className="lab-project-title">
          <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
          <span className="lab-status">{project.status}</span>
        </div>
        <div className="lab-project-meta">
          <span>{project.category}</span>
          <a className="text-link" href="#screens">
            Browse the screens <Arrow diagonal />
          </a>
        </div>
      </section>
      <figure
        className={`lab-project-hero container lab-theme-${project.theme}`}
      >
        <img
          src={project.hero.path}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          fetchPriority="high"
        />
        <figcaption>
          {project.title} — {project.status.toLowerCase()} project
        </figcaption>
      </figure>
      <section className="lab-project-story section container">
        <aside>
          <h2>Inside the idea.</h2>
          <p className="lab-build-status">{project.status} · In development</p>
          <details>
            <summary>Built with</summary>
            <ul>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </aside>
        <div>
          {project.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>
      <LabsGallery key={project.slug} project={project} />
      <section className="editorial-related container">
        <h2>A little more perspective.</h2>
        <div className="editorial-grid two-columns">
          {project.articles
            .map((id) => articles.find((article) => article.slug === id))
            .filter((article) => !!article)
            .map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>
      </section>
      <section className="next-project container">
        <span>Keep exploring</span>
        <Link to={`/labs/${next.slug}`}>
          <h2>{next.title}</h2>
          <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA
        to={`/contact?service=${encodeURIComponent("A project like " + project.title)}`}
        title={
          <>
            A small experiment.
            <br />A bigger <span className="underlined">possibility.</span>
          </>
        }
      />
    </>
  );
}
