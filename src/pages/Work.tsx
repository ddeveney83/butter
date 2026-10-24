import { useSearchParams } from "react-router-dom";
import { ContactCTA, PageHero, ProjectCard, Reveal } from "../components/UI";
import { projects, workFilters, type WorkFilter } from "../data/projects";
import { Spark } from "../components/Artwork";
import { useReducedMotion } from "../components/Motion";

export default function Work() {
  const reducedMotion = useReducedMotion();
  const [params, setParams] = useSearchParams();
  const requested = params.get("type");
  const active: WorkFilter = workFilters.includes(requested as WorkFilter)
    ? (requested as WorkFilter)
    : "All work";
  const visible = projects.filter(
    (project) => active === "All work" || project.filter === active,
  );
  return (
    <>
      <PageHero
        title={
          <>
            Proof is in
            <br />
            the <span className="underlined">pudding.</span>
          </>
        }
        aside={<Spark className="work-hero-spark" />}
      >
        <p>
          Learning experiences, platforms, strategy and film. Explore the work
          and the thinking that brings it together.
        </p>
      </PageHero>
      <section className="work-gallery container">
        <div className="work-toolbar">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter projects"
          >
            {workFilters.map((filter) => (
              <button
                key={filter}
                aria-pressed={active === filter}
                onClick={() =>
                  setParams(filter === "All work" ? {} : { type: filter }, {
                    preventScrollReset: true,
                    viewTransition:
                      !reducedMotion &&
                      typeof document.startViewTransition === "function",
                  })
                }
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="project-count" role="status">
            {String(visible.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="projects" key={active}>
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <p className="work-footnote">
          Selected project imagery, films and recreated interactions. New case
          studies use clearly labelled image placeholders while final media is
          prepared.
        </p>
      </section>
      <ContactCTA
        title={
          <>
            Your next chapter
            <br />
            could start <span className="underlined">here.</span>
          </>
        }
      />
    </>
  );
}
