import type { Project } from "../data/projects";
import { Reveal } from "./UI";
import ProjectCardArtwork from "./ProjectCardArtwork";
import "./ProjectCaseStudy.css";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  if (!project.caseStudy) return null;
  return (
    <div className="case-study-sections container">
      {project.caseStudy.sections.map((section, index) => (
        <section
          className="case-study-section"
          key={section.heading}
          aria-labelledby={`${project.id}-section-${index}`}
        >
          <Reveal className="case-study-copy">
            <h2 id={`${project.id}-section-${index}`}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal>
            <figure className="case-study-visual">
              <ProjectCardArtwork
                project={project}
                image={project.gallery[index]}
              />
              <figcaption>Image placeholder · {section.visualTitle}</figcaption>
              <p className="case-study-image-brief">{section.visualBrief}</p>
            </figure>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
