import { useEffect, useRef, useState } from "react";
import { MotionLink as Link } from "./Motion";
import { Arrow } from "./Artwork";
import { TextLink } from "./UI";
import { homeHero } from "../data/homeHero";

const feedback = [
  "A lot to take in. Give people a clear first step, then the detail they need to try it.",
  "That’s the idea. A useful example gives people a starting point. Add practice and feedback to help it stick.",
];

export default function HomeHero() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const question = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (open) question.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <section className="hero home-hero container" aria-labelledby="home-heading">
      <div className="hero-copy">
        <h1 id="home-heading">
          <span>{homeHero.headline[0]}</span>
          <span className="hero-highlight">{homeHero.headline[1]}</span>
        </h1>
        <p>{homeHero.description}</p>
        <div className="lead-actions">
          <Link className="pill-button" to="/contact" data-conversion="enquiry_click">
            Talk about your project <Arrow diagonal />
          </Link>
          <TextLink to="/work">Explore our work</TextLink>
        </div>
      </div>
      <div className="hero-stage">
        <div className="hero-brief-sheet" aria-hidden="true">
          <span>Your know-how.</span>
          <i /><i /><i /><i /><i />
          <svg viewBox="0 0 120 50" fill="none">
            <path d="M5 36q30-50 99-18m-18-9 20 9-17 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="hero-idea-sheet" data-demo-open={open}>
          <div className="hero-big-idea" hidden={open} aria-hidden="true">
            <img className="hero-character" src="/brand/hero-lightbulb.svg" alt="" width="360" height="320" fetchPriority="high" />
            <span className="hero-aha">Aha!</span>
          </div>
          <div id="hero-learning-taster" className="hero-learning-taster" hidden={!open}>
            <h2 ref={question} tabIndex={-1}>A new task.<br />Where do you start?</h2>
            <div className="hero-taster-choices" role="group" aria-label="Choose a starting point">
              {["Share the whole handbook", "Show one useful example"].map((label, index) => (
                <button key={label} type="button" aria-pressed={choice === index} onClick={() => setChoice(index)}>
                  <span>{index === 0 ? "A" : "B"}</span>{label}
                </button>
              ))}
            </div>
            <div className="hero-taster-feedback" role="status" aria-live="polite" aria-atomic="true">
              {choice === null ? <p>Pick a starting point. See what happens.</p> : <p key={choice}>{feedback[choice]}</p>}
            </div>
          </div>
          <button
            className="hero-taster-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="hero-learning-taster"
            data-cursor-label={open ? "Back to the idea" : "Try it"}
            onClick={() => { setOpen(!open); setChoice(null); }}
          >
            {open ? "Back to the big idea" : "Try a little learning"}
            <Arrow diagonal={!open} />
          </button>
        </div>
        <div className="hero-butter-seal" aria-hidden="true">
          <img src="/brand/butter-mark.webp" alt="" width="96" height="101" />
        </div>
        <span className="hero-stage-note">A tiny taste of how we think.</span>
      </div>
    </section>
  );
}
