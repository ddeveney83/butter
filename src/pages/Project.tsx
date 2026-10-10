import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, ControlIcon, Doodle, ProjectArt } from "../components/Artwork";
import { ContactCTA, Reveal, TextLink } from "../components/UI";
import { projects } from "../data/projects";
import NotFound from "./NotFound";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.id === slug);
  const [choice, setChoice] = useState<number | null>(null);
  const firstChoice = useRef<HTMLButtonElement>(null);
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
                  ref={index === 0 ? firstChoice : undefined}
                  aria-pressed={choice === index}
                  onClick={() => setChoice(index)}
                >
                  <span>{String.fromCharCode(65 + index)}</span>
                  {item.label}
                  <Arrow />
                </button>
              ))}
            </div>
            <div className="scenario-feedback">
              <div className="feedback-messages">
                <p role="status" aria-atomic="true" aria-hidden="false">
                  {choice === null
                    ? "There’s space to explore. Try any response."
                    : project.choices[choice].feedback}
                </p>
                {project.choices.map((item) => (
                  <p key={item.feedback} aria-hidden="true">
                    {item.feedback}
                  </p>
                ))}
              </div>
              <div
                className="feedback-reset"
                aria-hidden={choice === null}
                inert={choice === null}
              >
                <button
                  type="button"
                  className="reset-link"
                  onClick={() => {
                    setChoice(null);
                    firstChoice.current?.focus();
                  }}
                >
                  Try a different response <ControlIcon kind="reset" />
                </button>
              </div>
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
