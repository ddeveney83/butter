import { useEffect, useRef, useState } from "react";
import {
  Arrow,
  ButterCharacter,
  ControlIcon,
  Doodle,
  Spark,
} from "../components/Artwork";
import { Accordion, PageHero, Reveal, Tabs, TextLink } from "../components/UI";
import { MotionLink as Link, useReducedMotion } from "../components/Motion";
import "./Brand.css";

const sections = [
  ["brand", "Brand"],
  ["colours", "Colours"],
  ["type", "Type"],
  ["voice", "Voice"],
  ["visuals", "Visuals"],
  ["spacing", "Spacing"],
  ["components", "Components"],
  ["motion", "Motion"],
];
const colours = [
  {
    name: "Butter yellow",
    token: "--butter",
    use: "The warm hello. Use it for highlights, key actions and a little personality.",
  },
  {
    name: "Ink",
    token: "--ink",
    use: "Our near-black. For words, bold outlines and confident contrast.",
  },
  {
    name: "Paper",
    token: "--paper",
    use: "Our warm white. The everyday canvas that gives everything room.",
  },
  {
    name: "Line",
    token: "--line",
    use: "A quiet divider. For borders and structure, rather than body text.",
  },
];
const spaces = [1, 2, 3, 4, 6, 8, 12];
const voice = [
  {
    id: "website",
    label: "Website",
    before:
      "We deliver innovative, end-to-end eLearning solutions to maximise learner engagement.",
    after:
      "Learning people want to spend time with. Made for the things they need to do.",
    note: "Say what we make and why it helps. Let the work support the promise.",
  },
  {
    id: "learning",
    label: "Learning",
    before:
      "Participants must demonstrate comprehension of the appropriate response prior to proceeding.",
    after:
      "What would you do next? Pick a response and see where it takes you.",
    note: "Speak to one person. Give them a clear next step and room to try.",
  },
  {
    id: "email",
    label: "Email",
    before:
      "Please provide the requisite project specifications to facilitate commencement of the discovery phase.",
    after:
      "Tell us what you’re working on, who it’s for, and what needs to change. We’ll take it from there.",
    note: "Ask a useful question. Be welcoming without making promises we can’t keep.",
  },
];

export default function Brand() {
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState("");
  const copyRequest = useRef(0);
  const [words, setWords] = useState("Learning with feeling.");
  const [play, setPlay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const names = [
      ...colours.map(({ token }) => token),
      ...spaces.map((space) => `--space-${space}`),
      "--motion-fast",
      "--motion-base",
      "--motion-slow",
      "--weight-heading",
      "--weight-body",
      "--weight-interface",
    ];
    setTokens(
      Object.fromEntries(
        names.map((name) => [name, style.getPropertyValue(name).trim()]),
      ),
    );
    return () => {
      copyRequest.current++;
    };
  }, []);

  async function copyColour(name: string, token: string) {
    const request = ++copyRequest.current;
    const hex = tokens[token].toUpperCase();
    try {
      await navigator.clipboard.writeText(hex);
      if (request !== copyRequest.current) return;
      setCopied(token);
      setCopyNotice(`${name} ${hex} copied.`);
    } catch {
      if (request !== copyRequest.current) return;
      setCopied(null);
      setCopyNotice(`Copy this value manually: ${hex}`);
    }
  }

  return (
    <div className="brand-guide">
      <PageHero
        title={
          <>
            The Butter
            <br />
            <span className="underlined">way.</span>
          </>
        }
        aside={
          <div className="brand-signature">
            <div className="brand-lockup">
              butter
              <Spark />
            </div>
            <p>Learning with feeling.</p>
          </div>
        }
      >
        <p>
          A shared starting point for how we look, sound and feel. Simple, warm
          and unmistakably Butter.
        </p>
      </PageHero>
      <nav className="brand-jump container" aria-label="Brand guide sections">
        {sections.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
            <Arrow diagonal />
          </a>
        ))}
      </nav>

      <section
        id="brand"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="brand-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="brand-heading">
            Good learning.
            <br />A little more human.
          </h2>
          <p>
            Butter is a creative learning studio. We bring learning design,
            storytelling and visual craft together to make complex things click.
            The brand should feel as considered as the learning we make.
          </p>
        </Reveal>
        <div className="brand-principles">
          {[
            [
              "Clear",
              "Give every word, image and interaction a job. Make the useful thing easy to find.",
            ],
            [
              "Curious",
              "Ask good questions. Explore a fresh angle. Give people something worth discovering.",
            ],
            [
              "Human",
              "Respect people’s time and confidence. Bring warmth, a little wit and plenty of care.",
            ],
          ].map(([title, copy]) => (
            <Reveal key={title}>
              <h3>{title}.</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
        <p className="brand-footnote">
          Keep the wordmark lowercase and give it clear space on every side,
          using the height of the “b” as a guide. Use ink on paper or butter, or
          paper on ink. Keep its proportions intact.
        </p>
      </section>

      <section
        id="colours"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="colours-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="colours-heading">A warm welcome.</h2>
          <p>
            Three everyday colours and one quiet divider. Butter yellow adds
            feeling; ink and paper do the talking. Tap a swatch to copy its
            colour.
          </p>
        </Reveal>
        <div className="brand-palette">
          {colours.map((colour) => (
            <article className="brand-colour" key={colour.token}>
              <button
                type="button"
                className={`brand-swatch ${colour.token === "--ink" ? "brand-swatch-dark" : ""}`}
                style={{ background: `var(${colour.token})` }}
                onClick={() => copyColour(colour.name, colour.token)}
                aria-label={`Copy ${colour.name}`}
                data-cursor-label="Copy colour"
                disabled={!tokens[colour.token]}
              >
                <span>{colour.name}</span>
                <span className="brand-swatch-code">
                  <code>{tokens[colour.token]?.toUpperCase() || "\u00a0"}</code>
                  <ControlIcon
                    kind={copied === colour.token ? "check" : "copy"}
                  />
                </span>
              </button>
              <p>{colour.use}</p>
            </article>
          ))}
        </div>
        <p className="brand-copy-status" role="status">
          {copyNotice ||
            "Ink on butter. Ink on paper. Paper on ink. Keep text easy to read."}
        </p>
      </section>

      <section
        id="type"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="type-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="type-heading">
            One font.
            <br />
            Plenty of feeling.
          </h2>
          <p>
            DM Sans is our voice on the page. Big, bold headings meet light,
            open body text. Keep the hierarchy simple and the reading
            comfortable.
          </p>
        </Reveal>
        <div className="brand-type-playground">
          <label className="brand-type-input">
            Try your words
            <input
              value={words}
              onChange={(event) => setWords(event.target.value)}
              maxLength={72}
              placeholder="Learning with feeling."
            />
          </label>
          <Tabs
            label="Typography styles"
            items={[
              {
                id: "heading",
                label: "Heading",
                content: (
                  <div className="brand-type-sample">
                    <p className="brand-type-heading">
                      {words || "Learning with feeling."}
                    </p>
                    <p className="brand-spec">
                      DM Sans · {tokens["--weight-heading"]} weight · close
                      spacing · 1.05 line height
                    </p>
                  </div>
                ),
              },
              {
                id: "body",
                label: "Body",
                content: (
                  <div className="brand-type-sample">
                    <p className="brand-type-body">
                      {words || "Learning with feeling."}
                    </p>
                    <p className="brand-type-body">
                      A thoughtful question. An unexpected angle. An experience
                      that makes something click. Give words room to breathe,
                      and help people find their next step.
                    </p>
                    <p className="brand-spec">
                      DM Sans · {tokens["--weight-body"]} weight · 18px · 1.65
                      line height · short, readable lines
                    </p>
                  </div>
                ),
              },
              {
                id: "interface",
                label: "Interface",
                content: (
                  <div className="brand-type-sample">
                    <p className="brand-type-interface">
                      {words || "Learning with feeling."}
                    </p>
                    <div className="brand-type-alphabet">
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      <br />
                      abcdefghijklmnopqrstuvwxyz
                      <br />
                      0123456789 &amp; ! ?
                    </div>
                    <p className="brand-spec">
                      DM Sans · {tokens["--weight-interface"]} weight · 14px ·
                      sentence case
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
        <p className="brand-footnote">
          Lead with one strong heading. Use extra headings when they help
          someone find their way. Avoid decorative eyebrows, all-caps paragraphs
          and walls of text.
        </p>
      </section>

      <section
        id="voice"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="voice-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="voice-heading">Sounds like us.</h2>
          <p>
            Warm, clear and quietly confident. Write like a thoughtful person
            having a useful conversation. A little playfulness goes a long way.
          </p>
        </Reveal>
        <Tabs
          label="Tone of voice examples"
          items={voice.map((example) => ({
            id: example.id,
            label: example.label,
            content: (
              <div className="brand-voice-example">
                <div className="brand-voice-pair">
                  <div>
                    <h3>Before</h3>
                    <p>{example.before}</p>
                  </div>
                  <div className="brand-voice-butter">
                    <h3>With Butter</h3>
                    <p>{example.after}</p>
                  </div>
                </div>
                <p className="brand-spec">{example.note}</p>
              </div>
            ),
          }))}
        />
        <div className="brand-voice-rules">
          <p>
            <strong>Everyday words.</strong> Use “you” and “we”, active
            sentences and useful specifics.
          </p>
          <p>
            <strong>Playful with purpose.</strong> Save the butter puns for a
            good moment. Sensitive topics get a calm, direct voice.
          </p>
          <p>
            <strong>Honest, always.</strong> Explain the benefit. Keep concept
            work labelled and support claims with evidence.
          </p>
        </div>
      </section>

      <section
        id="visuals"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="visuals-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="visuals-heading">A little character.</h2>
          <p>
            Bold outlines, soft shapes and a playful nod to 1930s cartoons.
            Light-touch imagery with enough personality to make the moment
            memorable.
          </p>
        </Reveal>
        <div className="brand-visual-grid">
          <div className="brand-character">
            <ButterCharacter />
            <p>
              Our butter character. One expressive focal point, with room around
              it.
            </p>
          </div>
          <div className="brand-visual-details">
            <div className="brand-doodles" aria-label="Illustration examples">
              <Doodle kind="idea" />
              <Doodle kind="heart" />
              <Spark />
            </div>
            <h3>Simple shapes. Strong lines.</h3>
            <p>
              Use rounded strokes, expressive gestures and the core palette.
              Match line weight within each icon family and scale artwork
              without stretching it.
            </p>
            <h3>Let the work shine.</h3>
            <p>
              Course imagery should show the learning experience: a useful
              screen, a meaningful interaction, a clear detail. Use honest
              labels for placeholders and concepts.
            </p>
          </div>
        </div>
      </section>

      <section
        id="spacing"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="spacing-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="spacing-heading">Room to breathe.</h2>
          <p>
            Use an 8px rhythm as the starting point. Keep related things close,
            give sections generous space, and use a quiet line when a boundary
            helps.
          </p>
        </Reveal>
        <div className="brand-spacing-scale" aria-label="Spacing scale">
          {spaces.map((space) => (
            <div key={space} className="brand-spacing-step">
              <div
                className="brand-spacing-bar"
                style={{ height: `var(--space-${space})` }}
              />
              <span>{tokens[`--space-${space}`] || "\u00a0"}</span>
            </div>
          ))}
        </div>
        <div className="brand-layout-rules">
          <p>
            <strong>8–16px</strong>Inside a group: labels, icons and short
            supporting copy.
          </p>
          <p>
            <strong>24–32px</strong>Between related pieces: controls, cards and
            content blocks.
          </p>
          <p>
            <strong>48–96px</strong>Between bigger ideas. Adjust generously for
            the screen.
          </p>
        </div>
      </section>

      <section
        id="components"
        className="brand-section container"
        tabIndex={-1}
        aria-labelledby="components-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="components-heading">Made to work together.</h2>
          <p>
            Confident buttons. Quiet fields. Details that open when you need
            them. Give each screen one clear next step and keep interactions
            familiar.
          </p>
        </Reveal>
        <div className="brand-components">
          <div className="brand-component">
            <h3>Actions</h3>
            <Link className="pill-button" to="/contact">
              Let’s talk <Arrow diagonal />
            </Link>
            <TextLink to="/work">Explore the work</TextLink>
            <p>
              Use a solid pill for the main action, and a simple text link for
              the next option.
            </p>
          </div>
          <div className="brand-component">
            <h3>Fields</h3>
            <label className="brand-field">
              Your email
              <input
                type="email"
                placeholder="you@yourcompany.com"
                autoComplete="off"
              />
            </label>
            <p>
              Keep labels visible, instructions useful and focus easy to see.
              This is a sample field.
            </p>
          </div>
          <div className="brand-component">
            <h3>Details</h3>
            <Accordion title="A little room for detail.">
              <p>
                Use an accordion for supporting information. Keep the essentials
                visible, so people can make a decision without opening
                everything.
              </p>
            </Accordion>
            <p>
              Clear labels, a generous target and a smooth, predictable reveal.
            </p>
          </div>
        </div>
      </section>

      <section
        id="motion"
        className="brand-section brand-motion-section container"
        tabIndex={-1}
        aria-labelledby="motion-heading"
      >
        <Reveal className="brand-intro">
          <h2 id="motion-heading">Easy does it.</h2>
          <p>
            Motion should feel like Butter: smooth, gentle and considered. Use
            it to explain a change, guide attention or bring a small moment to
            life.
          </p>
        </Reveal>
        <div className="brand-motion-grid">
          <div className="brand-motion-demo">
            <div className="brand-motion-track" aria-hidden="true">
              <span
                key={play}
                className={
                  play ? "brand-motion-ball is-playing" : "brand-motion-ball"
                }
              />
            </div>
            <button
              type="button"
              className="pill-button"
              onClick={() => setPlay((value) => value + 1)}
              data-cursor-label="Play motion"
            >
              {play ? "Play again" : "Play motion"}
              <Arrow />
            </button>
            <p role="status">
              {reduced
                ? "Reduced motion is active. The example moves straight to its end state."
                : play
                  ? "A soft start. A gentle arrival. No looping or bouncing."
                  : "Try our easing. A small movement, with a soft landing."}
            </p>
          </div>
          <div className="brand-motion-timings">
            {[
              [
                "--motion-fast",
                "Quick feedback",
                "Buttons, focus and hover states.",
              ],
              [
                "--motion-base",
                "A change of state",
                "Tabs, details and interactive content.",
              ],
              [
                "--motion-slow",
                "A little entrance",
                "Page content and gentle reveals.",
              ],
            ].map(([token, title, copy]) => (
              <div key={token}>
                <strong>{tokens[token]}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="brand-footnote">
          Respect reduced-motion preferences. Keep touch and keyboard
          interactions complete. The butter cursor and tapered trail are small
          extras for mouse users; the experience works on its own.
        </p>
      </section>
      <div className="brand-closing container">
        <Spark />
        <p>
          Clear, always.
          <br />
          <strong>Butter, through and through.</strong>
        </p>
        <TextLink to="/work">See it in the work</TextLink>
      </div>
    </div>
  );
}
