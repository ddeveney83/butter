import { useState } from "react";
import type { Project } from "../data/projects";
import { Arrow, Doodle } from "./Artwork";
import { Tabs } from "./UI";
import "./Portfolio.css";

const academyTracks = [
  {
    name: "Foundations",
    detail: "Find your feet with on-chain analytics.",
    modules: [
      "Reading a wallet",
      "Exploring token activity",
      "Your first dashboard",
    ],
  },
  {
    name: "Intermediate",
    detail: "Connect the data to a practical workflow.",
    modules: [
      "Following smart money",
      "Comparing wallet activity",
      "Building a watchlist",
    ],
  },
  {
    name: "Advanced",
    detail: "Ask better questions of complex data.",
    modules: [
      "Due diligence workflows",
      "Interpreting market signals",
      "Testing an analytics approach",
    ],
  },
];
const library = [
  { title: "A good place to begin", type: "Getting started", time: "8 min" },
  {
    title: "Safer working, together",
    type: "Mandatory learning",
    time: "15 min",
  },
  {
    title: "Make room for development",
    type: "Professional development",
    time: "12 min",
  },
  {
    title: "Your next volunteering step",
    type: "Getting started",
    time: "10 min",
  },
];

export default function PlatformShowcase({ project }: { project: Project }) {
  const academy = project.id === "nansen-learning-academy";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All learning");
  const [saved, setSaved] = useState<string[]>([]);
  const [module, setModule] = useState<string | null>(null);
  const [complete, setComplete] = useState<string[]>([]);
  const visible = library.filter(
    (item) =>
      (filter === "All learning" || item.type === filter) &&
      `${item.title} ${item.type}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section
      className={`platform-showcase ${academy ? "platform-academy" : "platform-library"}`}
      aria-label="Interactive platform preview"
    >
      <div className="platform-top">
        <span>
          {academy
            ? "Nansen · Academy sample"
            : "Your learning · Library sample"}
        </span>
        <Doodle kind="idea" />
      </div>
      <div className="platform-body">
        <h3>
          {academy
            ? "Find your next level."
            : "A little learning. All in one place."}
        </h3>
        <p>
          {academy
            ? "Choose a pathway. Try a module. Build your confidence."
            : "Search the sample library and keep something for later."}
        </p>
        {academy ? (
          <Tabs
            label="Academy pathways"
            items={academyTracks.map((track) => ({
              id: track.name.toLowerCase(),
              label: track.name,
              content: (
                <div className="platform-track">
                  <p>{track.detail}</p>
                  <div className="platform-modules">
                    {track.modules.map((name, i) => (
                      <button
                        type="button"
                        key={name}
                        aria-pressed={module === name}
                        onClick={() => setModule(name)}
                      >
                        <span className="platform-module-number">0{i + 1}</span>
                        <strong>{name}</strong>
                        <span>
                          {complete.includes(name) ? "Complete ✓" : "Explore"}
                        </span>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                </div>
              ),
            }))}
          />
        ) : (
          <>
            <label className="platform-search">
              Find something useful
              <input
                type="search"
                placeholder="Search learning…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <div
              className="platform-filters"
              role="group"
              aria-label="Filter library"
            >
              {[
                "All learning",
                "Getting started",
                "Mandatory learning",
                "Professional development",
              ].map((name) => (
                <button
                  type="button"
                  key={name}
                  aria-pressed={filter === name}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="platform-library-count" role="status">
              {visible.length} {visible.length === 1 ? "resource" : "resources"}{" "}
              · {saved.length} saved
            </p>
            <div className="platform-resources">
              {visible.map((item) => (
                <article key={item.title}>
                  <Doodle kind="idea" />
                  <span>
                    {item.type} · {item.time}
                  </span>
                  <h4>{item.title}</h4>
                  <button
                    type="button"
                    aria-pressed={saved.includes(item.title)}
                    aria-label={`${saved.includes(item.title) ? "Unsave" : "Save"} ${item.title}`}
                    onClick={() =>
                      setSaved((current) =>
                        current.includes(item.title)
                          ? current.filter((name) => name !== item.title)
                          : [...current, item.title],
                      )
                    }
                  >
                    {saved.includes(item.title) ? "Saved ✓" : "Save for later"}
                  </button>
                </article>
              ))}
            </div>
            {visible.length === 0 && (
              <p className="platform-empty">
                No matches yet. Try a different search or filter.
              </p>
            )}
          </>
        )}
        {academy && (
          <div className="platform-module-detail" aria-live="polite">
            <div>
              <h4>{module ?? "Choose a module to take a closer look."}</h4>
              <p>
                {module
                  ? "This sample shows how a short tutorial can connect a product feature to a practical task."
                  : "A short step towards a more useful understanding of the data."}
              </p>
            </div>
            <button
              type="button"
              disabled={!module || complete.includes(module)}
              onClick={() => {
                if (module) setComplete((current) => [...current, module]);
              }}
            >
              {module && complete.includes(module)
                ? "Completed ✓"
                : "Mark sample complete"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
