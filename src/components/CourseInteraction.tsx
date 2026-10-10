import { useId, useRef, useState, type ReactNode } from "react";
import { Arrow, ControlIcon } from "./Artwork";
import type { Project } from "../data/projects";
import type { CoursePreview } from "../data/coursePreviews";
import "./CourseInteraction.css";

type Props = { project: Project; preview: CoursePreview; art: ReactNode };

function Details({
  preview,
  active,
}: {
  preview: CoursePreview;
  active: number;
}) {
  return (
    <div className="course-hotspot-details">
      <div aria-live="polite" aria-atomic="true">
        <h3>{preview.hotspots[active].heading}</h3>
        <p>{preview.hotspots[active].detail}</p>
      </div>
      {preview.hotspots.map((item) => (
        <div key={item.label} aria-hidden="true" className="course-measure">
          <h3>{item.heading}</h3>
          <p>{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function Journey({ preview, art }: Props) {
  const [active, setActive] = useState(0);
  return (
    <div className="course-activity course-journey">
      <div>
        <h2>{preview.exploration}</h2>
        <p className="course-instruction">
          Follow the path. Take it one step at a time.
        </p>
        <div
          className="course-journey-steps"
          role="group"
          aria-label="Explore your journey"
        >
          {preview.hotspots.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <Arrow />
            </button>
          ))}
        </div>
      </div>
      <div className="course-journey-detail">
        <div className="course-activity-art">{art}</div>
        <Details preview={preview} active={active} />
      </div>
    </div>
  );
}

function Conversation({ project, preview }: Props) {
  const [choice, setChoice] = useState<number | null>(null);
  const first = useRef<HTMLButtonElement>(null);
  return (
    <div className="course-activity course-conversation">
      <div>
        <h2>{preview.exploration}</h2>
        <div className="course-conversation-bubble">
          <span aria-hidden="true">“</span>
          <p>{project.scenario}</p>
        </div>
        <p className="course-instruction">
          Try a response. Make room for a different perspective.
        </p>
      </div>
      <div>
        <div
          className="course-activity-choices"
          role="group"
          aria-label="Choose a preview response"
        >
          {project.choices.map((item, index) => (
            <button
              key={item.label}
              ref={index === 0 ? first : undefined}
              type="button"
              aria-pressed={choice === index}
              onClick={() => setChoice(index)}
            >
              {item.label}
              <Arrow />
            </button>
          ))}
        </div>
        <div className="course-activity-feedback">
          <p role="status" aria-atomic="true">
            {choice === null
              ? "There’s space to try. Choose any response."
              : project.choices[choice].feedback}
          </p>
          {project.choices.map((item) => (
            <p className="course-measure" aria-hidden="true" key={item.label}>
              {item.feedback}
            </p>
          ))}
        </div>
        <button
          className="reset-link"
          type="button"
          disabled={choice === null}
          onClick={() => {
            setChoice(null);
            first.current?.focus();
          }}
        >
          Try again <ControlIcon kind="reset" />
        </button>
      </div>
    </div>
  );
}

function Reflection({ preview, art }: Props) {
  const [active, setActive] = useState(0);
  const [suggestion, setSuggestion] = useState(false);
  const [note, setNote] = useState("");
  const inputId = useId();
  const rangeId = useId();
  return (
    <div className="course-activity course-reflection">
      <div className="course-reflection-visual">
        <div className="course-activity-art">{art}</div>
        <h2>{preview.exploration}</h2>
        <p>{preview.introduction}</p>
      </div>
      <div>
        <label className="course-activity-label" htmlFor={rangeId}>
          Choose a reflection
        </label>
        <input
          id={rangeId}
          className="course-reflection-range"
          type="range"
          min="0"
          max={preview.hotspots.length - 1}
          step="1"
          value={active}
          aria-valuetext={preview.hotspots[active].label}
          onChange={(event) => {
            setActive(Number(event.target.value));
            setSuggestion(false);
          }}
        />
        <div className="course-reflection-labels" aria-hidden="true">
          {preview.hotspots.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
        <div className="course-reflection-prompt">
          <h3>{preview.cards[active].question}</h3>
          <p role="status">
            {suggestion
              ? preview.cards[active].answer
              : "Take a moment. There’s no right answer here."}
          </p>
          <button
            className="reset-link"
            type="button"
            aria-expanded={suggestion}
            onClick={() => setSuggestion(!suggestion)}
          >
            {suggestion ? "Hide suggestion" : "Show a suggestion"}
            <Arrow />
          </button>
        </div>
        <label className="course-activity-label" htmlFor={inputId}>
          Your small step
        </label>
        <textarea
          id={inputId}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={180}
          rows={3}
          placeholder="Something that would help today…"
        />
        <p className="course-instruction">
          Just for this preview. Your reflection stays on this page.
        </p>
      </div>
    </div>
  );
}

function Quiz({ project, preview }: Props) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const id = useId();
  return (
    <div className="course-activity course-quiz">
      <div className="course-quiz-intro">
        <span className="course-quiz-mark" aria-hidden="true">
          ?
        </span>
        <h2>{preview.exploration}</h2>
        <p>One situation. A moment to practise your judgement.</p>
      </div>
      <div>
        <fieldset className="course-quiz-options">
          <legend>{project.scenario}</legend>
          {project.choices.map((item, index) => (
            <label key={item.label}>
              <input
                type="radio"
                name={id}
                checked={answer === index}
                onChange={() => {
                  setAnswer(index);
                  setChecked(false);
                }}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </fieldset>
        <button
          className="course-start"
          type="button"
          disabled={answer === null}
          onClick={() => setChecked(true)}
        >
          Check my answer <Arrow />
        </button>
        <div className="course-activity-feedback">
          <p role="status" aria-atomic="true">
            {checked && answer !== null
              ? `${answer === preview.correctChoice ? "A useful next step." : "A little more to consider."} ${project.choices[answer].feedback}`
              : "Choose an answer, then check your thinking."}
            {checked && answer !== null && (
              <ControlIcon
                kind={answer === preview.correctChoice ? "check" : "reset"}
              />
            )}
          </p>
          {project.choices.map((item, index) => (
            <p className="course-measure" aria-hidden="true" key={item.label}>
              {index === preview.correctChoice
                ? "A useful next step."
                : "A little more to consider."}{" "}
              {item.feedback}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Sequence({ preview }: Props) {
  const [order, setOrder] = useState([2, 0, 1]);
  const [checked, setChecked] = useState(false);
  function move(index: number, direction: number) {
    const next = [...order];
    [next[index], next[index + direction]] = [
      next[index + direction],
      next[index],
    ];
    setOrder(next);
    setChecked(false);
  }
  const correct = order.every((value, index) => value === index);
  return (
    <div className="course-activity course-sequence">
      <div>
        <h2>{preview.exploration}</h2>
        <p className="course-instruction">
          Put the steps in a useful order. Use the arrows to move each one.
        </p>
        <div className="course-sequence-route" aria-hidden="true">
          <span>Start</span>
          <i />
          <span>A useful next step</span>
        </div>
      </div>
      <div>
        <ol className="course-sort-list">
          {order.map((value, index) => (
            <li key={value}>
              <span className="course-sort-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <strong>{preview.hotspots[value].label}</strong>
                <p>{preview.hotspots[value].heading}</p>
              </div>
              <div className="course-sort-controls">
                <button
                  type="button"
                  aria-label={`Move ${preview.hotspots[value].label} up`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  <span aria-hidden="true">↑</span>
                </button>
                <button
                  type="button"
                  aria-label={`Move ${preview.hotspots[value].label} down`}
                  disabled={index === order.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <span aria-hidden="true">↓</span>
                </button>
              </div>
            </li>
          ))}
        </ol>
        <div className="course-sequence-actions">
          <button
            className="course-start"
            type="button"
            onClick={() => setChecked(true)}
          >
            Check the order <Arrow />
          </button>
          <button
            className="reset-link"
            type="button"
            onClick={() => {
              setOrder([2, 0, 1]);
              setChecked(false);
            }}
          >
            Start again <ControlIcon kind="reset" />
          </button>
        </div>
        <p className="course-sequence-status" role="status">
          {checked
            ? correct
              ? "That’s it. Understand first, try a change, then learn from what happens."
              : "Try another order. Start by understanding what’s happening, then test a change."
            : "Three steps. One practical path."}
        </p>
      </div>
    </div>
  );
}

function Hotspots({ preview, art }: Props) {
  const [active, setActive] = useState(0);
  return (
    <div className="course-explore">
      <div className="course-hotspot-scene">
        {art}
        <div role="group" aria-label="Explore course hotspots">
          {preview.hotspots.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={`course-hotspot course-hotspot-${index}`}
              aria-label={`Explore ${item.label}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              data-cursor-label="Explore"
            >
              <span>{index + 1}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="course-explore-copy">
        <h2>{preview.exploration}</h2>
        <p className="course-instruction">
          Select a marker. Follow your curiosity.
        </p>
        <Details preview={preview} active={active} />
      </div>
    </div>
  );
}

export default function CourseInteraction(props: Props) {
  const Component = {
    journey: Journey,
    conversation: Conversation,
    reflection: Reflection,
    quiz: Quiz,
    sequence: Sequence,
    hotspots: Hotspots,
  }[props.preview.interaction];
  return (
    <div
      className="course-interaction"
      data-interaction={props.preview.interaction}
    >
      <Component {...props} />
    </div>
  );
}
