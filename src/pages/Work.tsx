import { useSearchParams } from "react-router-dom";
import { ContactCTA, PageHero, ProjectCard, Reveal } from "../components/UI";
import { projects, workFilters, type WorkFilter } from "../data/projects";
import { Spark } from "../components/Artwork";

export default function Work() {
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
          Six little worlds. Six different ways to make learning stick. Explore
          our concepts, and try a little of the thinking inside.
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
          {visible.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <p className="work-footnote">
          Concept projects, made to show what’s possible. No fictional clients.
          Just real ideas.
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
