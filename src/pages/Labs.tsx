import { useState } from "react";
import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import {
  Arrow,
  ButterCharacter,
  Doodle,
  ControlIcon,
} from "../components/Artwork";
import { PageHero, Reveal, ContactCTA, Accordion } from "../components/UI";
import { experiments } from "../data/editorial";
import NotFound from "./NotFound";

export default function Labs() {
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
          Welcome to butter Labs. Small experiments, learning snippets and ideas
          in motion. Try something. See what sticks.
        </p>
      </PageHero>
      <section className="labs-list container">
        <div className="editorial-grid">
          {experiments.map((experiment, i) => (
            <Reveal key={experiment.slug} delay={i * 60}>
              <Link
                className="editorial-card lab-card"
                to={"/labs/" + experiment.slug}
              >
                <div className={"editorial-card-art " + experiment.icon}>
                  <Doodle kind={experiment.icon} />
                  <span aria-hidden="true">0{i + 1}</span>
                </div>
                <div className="editorial-card-copy">
                  <h2>{experiment.title}</h2>
                  <p>{experiment.description}</p>
                  <span className="editorial-card-action">
                    Try the experiment <Arrow diagonal />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="labs-note">
          Working experiments from the butter studio. Your choices stay in this
          browser session; they don’t create learning records.
        </p>
      </section>
      <section className="journal-labs-link container">
        <div>
          <h2>Curious about the why?</h2>
          <p>The journal explores the thinking behind the experience.</p>
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
  const experiment = experiments.find((item) => item.slug === slug);
  if (!experiment) return <NotFound />;
  return (
    <>
      <section className="lab-experiment container">
        <Link className="studio-back-link" to="/labs">
          ← All experiments
        </Link>
        <header>
          <div>
            <h1>{experiment.title}</h1>
            <p>{experiment.description}</p>
          </div>
          <Doodle kind={experiment.icon} />
        </header>
        <div className="lab-playground">
          {experiment.kind === "branching" ? (
            <Conversation />
          ) : experiment.kind === "disclosure" ? (
            <Disclosure />
          ) : (
            <PracticePlan />
          )}
        </div>
        <p className="labs-note">
          An illustrative learning experiment. No assessment result or personal
          data is saved.
        </p>
      </section>
      <ContactCTA
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
function Conversation() {
  const [path, setPath] = useState<number[]>([]);
  const step = path.length;
  const openings = [
    {
      label: "‘You never include enough detail.’",
      feedback:
        "The conversation becomes about a judgement. Your colleague asks what you mean.",
    },
    {
      label:
        "‘Yesterday’s handover missed the deadline. Can we talk about it?’",
      feedback:
        "A specific observation gives the conversation a clear starting point. Your colleague explains they were working from an earlier update.",
    },
    {
      label: "Wait until it happens again.",
      feedback:
        "The missing detail stays unresolved. The team has to make an assumption about the deadline.",
    },
  ];
  const followups = [
    {
      label: "Explain the impact and agree how to check the next handover.",
      feedback:
        "A shared next step makes the conversation useful: confirm the latest deadline, add it to the handover and check the next update together.",
    },
    {
      label: "Repeat what went wrong and end the conversation.",
      feedback:
        "The issue is clearer, but the next step is still missing. Try asking what would help avoid the same confusion next time.",
    },
  ];
  return (
    <div className="lab-conversation">
      <span className="lab-step">
        {step < 2 ? `Decision ${step + 1} of 2` : "A moment to reflect"}
      </span>
      <h2>
        {step === 0
          ? "A detail is missing. How do you open the conversation?"
          : step === 1
            ? "What would you do next?"
            : "What changed with your choices?"}
      </h2>
      {step === 0 ? (
        <p>
          A teammate’s handover left out a new deadline. The team has already
          started the work, and you need to raise the issue.
        </p>
      ) : (
        <p role="status">
          {step === 1
            ? openings[path[0]].feedback
            : followups[path[1]].feedback}
        </p>
      )}
      {step < 2 ? (
        <div className="lab-choices">
          {(step === 0 ? openings : followups).map((choice, i) => (
            <button key={choice.label} onClick={() => setPath([...path, i])}>
              {choice.label}
              <Arrow />
            </button>
          ))}
        </div>
      ) : (
        <div className="lab-reflection">
          <h3>Take one question with you.</h3>
          <p>
            Did your opening describe something specific? Did your next step
            invite a useful conversation? Notice the difference between naming a
            problem and agreeing what happens next.
          </p>
          <Link
            className="text-link"
            to="/journal/write-better-learning-scenarios"
          >
            Explore the scenario-writing guide <Arrow diagonal />
          </Link>
        </div>
      )}
      {path.length > 0 && (
        <button className="reset-link" onClick={() => setPath([])}>
          Try another route <ControlIcon kind="reset" />
        </button>
      )}
    </div>
  );
}
const handoverItems = [
  {
    id: "what",
    label: "What changed?",
    content: (
      <p>
        The delivery deadline moved to Friday. Confirm the updated date in the
        shared project record before planning the next task.
      </p>
    ),
  },
  {
    id: "who",
    label: "Who needs to know?",
    content: (
      <p>
        Tell the people who depend on the handover. Include the change, its
        impact and who is responsible for the next step.
      </p>
    ),
  },
  {
    id: "next",
    label: "What happens next?",
    content: (
      <p>
        Add the confirmed deadline to the handover, agree the next action and
        schedule a short check-in to catch any uncertainty early.
      </p>
    ),
  },
];
function Disclosure() {
  const [focused, setFocused] = useState(true);
  return (
    <div className="lab-disclosure">
      <div className="filter-list" role="group" aria-label="Content layout">
        <button aria-pressed={focused} onClick={() => setFocused(true)}>
          One idea at a time
        </button>
        <button aria-pressed={!focused} onClick={() => setFocused(false)}>
          Everything together
        </button>
      </div>
      <h2>A clearer handover.</h2>
      <p className="lab-layout-note" role="status">
        {focused
          ? "Choose the detail you need. The rest waits quietly."
          : "All the same information, visible at once."}
      </p>
      {focused ? (
        <div>
          {handoverItems.map((item) => (
            <Accordion key={item.id} title={item.label}>
              {item.content}
            </Accordion>
          ))}
        </div>
      ) : (
        <div className="lab-open-copy">
          {handoverItems.map((item) => (
            <section key={item.id}>
              <h3>{item.label}</h3>
              {item.content}
            </section>
          ))}
        </div>
      )}
      <aside className="lab-reflection">
        <h3>What feels useful here?</h3>
        <p>
          Progressive disclosure can make a choice easier to find. It can also
          hide information someone needs to compare. Try both layouts and think
          about the learner’s task before choosing a pattern.
        </p>
      </aside>
    </div>
  );
}
function PracticePlan() {
  const [gap, setGap] = useState(3),
    [sessions, setSessions] = useState(3),
    [selected, setSelected] = useState(0);
  const prompts = [
    "Recall one idea without looking at your notes. What can you explain in your own words?",
    "Try the idea in a small, realistic situation. What happened?",
    "Compare your first attempt with a better example. What would you change?",
    "Share the idea with someone and invite a question. What did you have to think through?",
    "Revisit the situation. What can you now do with more confidence?",
  ];
  return (
    <div className="lab-practice">
      <h2>Small steps. A useful rhythm.</h2>
      <p>
        Make an illustrative practice plan. Choose a gap between sessions, then
        explore the prompt for each visit.
      </p>
      <div className="lab-plan-controls">
        <label htmlFor="practice-gap">
          Days between practice
          <strong>
            {gap} {gap === 1 ? "day" : "days"}
          </strong>
          <input
            id="practice-gap"
            type="range"
            min={1}
            max={7}
            value={gap}
            onChange={(event) => setGap(Number(event.target.value))}
          />
        </label>
        <label htmlFor="practice-sessions">
          Number of sessions<strong>{sessions}</strong>
          <input
            id="practice-sessions"
            type="range"
            min={2}
            max={5}
            value={sessions}
            onChange={(event) => {
              setSessions(Number(event.target.value));
              setSelected(0);
            }}
          />
        </label>
      </div>
      <div
        className="lab-plan-timeline"
        role="group"
        aria-label="Practice sessions"
      >
        {Array.from({ length: sessions }, (_, i) => (
          <button
            key={i}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>0{i + 1}</span>Day {1 + i * gap}
            <Arrow />
          </button>
        ))}
      </div>
      <div className="lab-session-prompt" role="status">
        <h3>
          Session {selected + 1} · Day {1 + selected * gap}
        </h3>
        <p>{prompts[selected]}</p>
      </div>
      <p className="lab-layout-note">
        This is a planning idea, not a prediction of retention. Adjust the
        rhythm to the task, audience and opportunity to practise.
      </p>
    </div>
  );
}
