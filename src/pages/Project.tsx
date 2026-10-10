import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Arrow, Doodle, ProjectArt } from "../components/Artwork";
import { ContactCTA, Reveal, TextLink } from "../components/UI";
import { projects } from "../data/projects";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.id === slug);
  const [choice, setChoice] = useState<number | null>(null);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <section className="project-hero container">
        <TextLink to="/work">Back to all work</TextLink>
        <div className="project-title-row">
          <h1>{project.title}</h1>
          <p>
            {project.category}
            <br />
            <span>Concept project</span>
          </p>
        </div>
        <p className="project-intro">{project.intro}</p>
        <ProjectArt kind={project.theme} />
      </section>
      <section className="project-story section container">
        <Reveal>
          <h2>
            A little
            <br />
            <span className="underlined">perspective.</span>
          </h2>
          <div className="deliverables">
            {project.deliverables.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>
        <Reveal className="story-copy">
          <p className="large-copy">{project.description}</p>
          <p>{project.approach}</p>
          <p className="project-intention">
            <span>The intention</span>
            {project.outcome}
          </p>
        </Reveal>
      </section>
      <section className={`project-demo demo-${project.theme}`}>
        <div className="container demo-grid">
          <Reveal>
            <Doodle kind="play" />
            <h2>
              Try a little
              <br />
              of <span className="underlined">it.</span>
            </h2>
            <p>
              A short sample of the thinking.
              <br />
              Pick a response. See what happens.
            </p>
          </Reveal>
          <div className="scenario-card">
            <span className="scenario-label">A moment to think</span>
            <h3>{project.scenario}</h3>
            <div
              className="scenario-choices"
              role="group"
              aria-label="Choose a response"
            >
              {project.choices.map((item, index) => (
                <button
                  key={item.label}
                  aria-pressed={choice === index}
                  onClick={() => setChoice(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {item.label}
                  <Arrow />
                </button>
              ))}
            </div>
            <div className="scenario-feedback" role="status">
              {choice === null ? (
                <p>There’s space to explore. Try any response.</p>
              ) : (
                <>
                  <p>{project.choices[choice].feedback}</p>
                  <button
                    className="reset-link"
                    onClick={() => setChoice(null)}
                  >
                    Try a different response <span aria-hidden="true">↺</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="next-project container">
        <span>Up next</span>
        <Link to={`/work/${next.id}`}>
          <h2>{next.title}</h2>
          <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA
        title={
          <>
            Something like this.
            <br />
            Made for <span className="underlined">you.</span>
          </>
        }
      />
    </>
  );
}
