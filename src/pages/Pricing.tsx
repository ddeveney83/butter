import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Arrow, Doodle, Spark } from "../components/Artwork";
import { Accordion, ContactCTA, PageHero, Reveal } from "../components/UI";

const money = (amount: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
const packages = [
  {
    name: "A little lift.",
    project: 2500,
    monthly: 1500,
    icon: "idea" as const,
    description: "A focused idea, made beautifully.",
    monthlyDescription: "A little creative help, each month.",
    features: [
      "A short learning moment or content refresh",
      "Learning design & a clear visual direction",
      "Agreed review rounds & handover",
    ],
    monthlyFeatures: [
      "A monthly planning session",
      "Small content or design updates",
      "An agreed monthly capacity",
    ],
  },
  {
    name: "A fresh experience.",
    project: 7500,
    monthly: 3500,
    icon: "play" as const,
    description: "Something to really get stuck into.",
    monthlyDescription: "A steady rhythm for your learning team.",
    features: [
      "A complete interactive learning module",
      "Storyboarding, design & development",
      "Agreed platform testing & launch handover",
    ],
    monthlyFeatures: [
      "Prioritised creative & learning support",
      "Ongoing experience improvements",
      "An agreed monthly capacity",
    ],
  },
  {
    name: "The full spread.",
    project: 15000,
    monthly: 6500,
    icon: "spark" as const,
    description: "A bigger journey, with all the care.",
    monthlyDescription: "A more involved creative partnership.",
    features: [
      "A connected, multi-part learning journey",
      "Discovery, creative direction & prototyping",
      "A delivery and evaluation plan",
    ],
    monthlyFeatures: [
      "A shared roadmap & regular reviews",
      "Learning design, writing & production support",
      "An agreed monthly capacity",
    ],
  },
];

export default function Pricing() {
  const [monthly, setMonthly] = useState(false);
  const [format, setFormat] = useState("2500");
  const [modules, setModules] = useState(1);
  const [branching, setBranching] = useState(false);
  const [motion, setMotion] = useState(false);
  const estimate = Math.round(
    (Number(format) * (branching ? 1.3 : 1) + (motion ? 900 : 0)) * modules,
  );
  const projectName =
    format === "2500"
      ? "Microlearning"
      : format === "7500"
        ? "Interactive eLearning"
        : "Learning journey";
  const brief = `${projectName}; ${modules} ${modules === 1 ? "piece" : "pieces"}${branching ? "; branching scenarios" : ""}${motion ? "; bespoke motion" : ""}. Indicative estimate: ${money(estimate)}. Please help us scope this.`;
  return (
    <>
      <PageHero
        title={
          <>
            Clear starting points.
            <br />
            Room for <span className="underlined">your idea.</span>
          </>
        }
        aside={<Spark className="pricing-hero-spark" />}
      >
        <p>
          A little lift or a whole new learning journey. Here’s a feel for the
          investment, before we shape the details together.
        </p>
      </PageHero>
      <section className="pricing-section container">
        <div className="pricing-toolbar">
          <div
            className="segmented-control"
            role="group"
            aria-label="Pricing model"
            data-active={monthly ? "support" : "project"}
          >
            <button aria-pressed={!monthly} onClick={() => setMonthly(false)}>
              One-off project
            </button>
            <button aria-pressed={monthly} onClick={() => setMonthly(true)}>
              Ongoing support
            </button>
          </div>
          <p>
            Illustrative budgets in GBP.
            <br />
            Final scope and pricing agreed together.
          </p>
        </div>
        <div className="pricing-cards">
          {packages.map((item, index) => (
            <Reveal
              key={item.name}
              className={`pricing-card ${index === 1 ? "featured" : ""}`}
            >
              <Doodle kind={item.icon} />
              <h2>{item.name}</h2>
              <p className="package-description">
                {monthly ? item.monthlyDescription : item.description}
              </p>
              <div className="package-price">
                <span>Indicative from</span>
                <strong>
                  {money(monthly ? item.monthly : item.project)}
                  <small>{monthly ? " / month" : ""}</small>
                </strong>
              </div>
              <ul>
                {(monthly ? item.monthlyFeatures : item.features).map(
                  (feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ),
                )}
              </ul>
              <Link
                className="pill-button"
                to={`/contact?service=${encodeURIComponent(item.name + (monthly ? " — ongoing support" : " — one-off project"))}`}
              >
                Let’s shape it <Arrow diagonal />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="pricing-disclaimer">
          These examples help start a conversation. Delivery format, complexity,
          accessibility requirements, and review stages affect the quote. Any
          applicable tax is confirmed in your proposal.
        </p>
      </section>
      <section className="estimator-section">
        <div className="container estimator-grid">
          <Reveal>
            <h2>
              Ballpark
              <br />
              your <span className="underlined">idea.</span>
            </h2>
            <p>
              A few little choices.
              <br />A useful starting point.
            </p>
            <Doodle kind="idea" />
          </Reveal>
          <div className="estimator">
            <label className="select-label">
              What are we making?
              <select
                value={format}
                onChange={(event) => setFormat(event.target.value)}
              >
                <option value="2500">Microlearning</option>
                <option value="7500">Interactive eLearning</option>
                <option value="15000">Learning journey</option>
              </select>
            </label>
            <label className="range-label">
              How many pieces?<span>{modules.toString().padStart(2, "0")}</span>
              <input
                type="range"
                aria-label="Number of learning pieces"
                aria-valuetext={`${modules} learning ${modules === 1 ? "piece" : "pieces"}`}
                style={
                  {
                    "--range-progress": `${((modules - 1) / 5) * 100}%`,
                  } as CSSProperties
                }
                min="1"
                max="6"
                value={modules}
                onChange={(event) => setModules(Number(event.target.value))}
              />
              <span className="range-endpoints">
                <span>One small thing</span>
                <span>A bigger collection</span>
              </span>
            </label>
            <div className="estimate-options">
              <label>
                <input
                  type="checkbox"
                  checked={branching}
                  onChange={(event) => setBranching(event.target.checked)}
                />
                <span>
                  Branching scenarios<small>More paths to explore</small>
                </span>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={motion}
                  onChange={(event) => setMotion(event.target.checked)}
                />
                <span>
                  Bespoke motion<small>A little extra movement</small>
                </span>
              </label>
            </div>
            <div className="estimate-result">
              <div>
                <span>Illustrative project budget</span>
                <output
                  aria-live="polite"
                  aria-label="Illustrative project budget"
                >
                  {money(estimate)}
                </output>
              </div>
              <Link
                className="round-link"
                to={`/contact?brief=${encodeURIComponent(brief)}`}
                aria-label="Discuss this estimate"
              >
                <Arrow diagonal />
              </Link>
            </div>
            <p className="form-note">
              A guide, not a quote. Let’s talk through what you actually need.
            </p>
          </div>
        </div>
      </section>
      <section className="faq-section container">
        <Reveal>
          <h2>
            A few good
            <br />
            <span className="underlined">questions.</span>
          </h2>
        </Reveal>
        <div className="faq-list">
          {[
            [
              "What’s included in a project?",
              "We agree the objectives, deliverables, delivery format, review stages, and handover before starting. The examples above show a typical shape; your written scope sets out the details.",
            ],
            [
              "Can we start small?",
              "Absolutely. A focused workshop, prototype, or short learning moment can be a useful way to find the right direction before committing to a larger journey.",
            ],
            [
              "How does ongoing support work?",
              "We agree a monthly capacity, priorities, and review rhythm together. It’s a clear allocation of time and support, rather than unlimited production.",
            ],
            [
              "Do you work with our existing learning platform?",
              "We can scope delivery around your platform’s requirements. Tell us what you use, and we’ll confirm the formats, testing, and handover your project needs.",
            ],
          ].map(([question, answer]) => (
            <Accordion key={question} title={question}>
              <p>{answer}</p>
            </Accordion>
          ))}
        </div>
      </section>
      <ContactCTA
        title={
          <>
            Let’s find
            <br />
            your <span className="underlined">right fit.</span>
          </>
        }
      />
    </>
  );
}
