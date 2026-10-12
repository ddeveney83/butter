import { useEffect, useRef, useState } from "react";
import type { Project } from "../data/projects";
import { Doodle } from "./Artwork";
import "./Portfolio.css";

export default function ProjectVideo({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);
  // The source reuses the Vaccination Programme video on the LMS migration page.
  // Keep that case image-led until a matching platform film is supplied.
  const id =
    project.id === "your-learning-platform" ? undefined : project.videoIds[0];
  return (
    <figure className="project-original-media">
      <div className={`project-video-frame${id ? " has-video" : ""}`}>
        {id && playing ? (
          <iframe
            ref={player}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&rel=0`}
            title={`${project.title} — original project video`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={project.hero.path}
              alt={project.hero.alt}
              fetchPriority="high"
            />
            {id && (
              <button
                type="button"
                className="project-video-play"
                aria-label={`Play ${project.title} project video`}
                onClick={() => setPlaying(true)}
                data-cursor-label="Play video"
              >
                <Doodle kind="play" />
                <span>Watch the work</span>
              </button>
            )}
          </>
        )}
      </div>
      <figcaption>
        <span>{id ? "Project film" : "Project imagery"}</span>
      </figcaption>
    </figure>
  );
}
