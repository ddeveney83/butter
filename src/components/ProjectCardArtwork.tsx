import { LearningIllustration, Spark } from "./Artwork";
import { coursePreviews } from "../data/coursePreviews";
import type { Project } from "../data/projects";
import "./ProjectCardArtwork.css";

// Select a clear course/platform screen rather than cropping a laptop mockup.
const screens: Record<string, number> = {
  "allergen-awareness": 2,
  "matrix-reloaded": 0,
  "alcohol-and-drug-awareness": 1,
  "record-keeping": 0,
  "15-minute-compliance": 1,
  "information-security": 1,
  "your-learning-platform": 2,
  "nansen-learning-academy": 1,
};

export default function ProjectCardArtwork({ project }: { project: Project }) {
  const image = project.gallery[screens[project.id] ?? 0];
  const illustration =
    coursePreviews[project.id]?.illustration ??
    (project.id === "your-learning-platform" ? "butter" : "idea");
  return (
    <div
      className="portfolio-card-art"
      data-theme={project.theme}
      data-format={project.filter}
    >
      <div className="portfolio-card-orbits" aria-hidden="true" />
      <div className="portfolio-card-window">
        <div className="portfolio-card-window-top" aria-hidden="true">
          <span className="portfolio-card-wordmark">
            butter
            <Spark />
          </span>
          <span className="portfolio-card-window-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
        <img
          className="portfolio-card-screen"
          src={image.path}
          alt={`${project.title} — ${image.alt}`}
          loading="lazy"
          width="1200"
          height="675"
        />
      </div>
      <div className="portfolio-card-illustration" aria-hidden="true">
        <LearningIllustration kind={illustration} />
      </div>
      <Spark className="portfolio-card-spark" />
    </div>
  );
}
