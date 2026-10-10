import { useState } from "react";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Doodle, Spark } from "../components/Artwork";
import { Accordion, PageHero, Reveal, Tabs, TextLink } from "../components/UI";
import "./Butterlearn.css";

export const butterlearnEnquiry =
  "/contact?service=Butterlearn&brief=" +
  encodeURIComponent(
    "I’d like to talk about Butterlearn for our team. We’re looking for a learning platform that helps us…",
  );
const sampleCourses = [
  {
    id: "welcome",
    title: "A good place to begin.",
    detail:
      "Meet your people, find the essentials and take your first small step.",
    duration: "8 min",
    icon: "heart" as const,
  },
  {
    id: "decisions",
    title: "Make a good call.",
    detail:
      "Practise a real-world decision, explore the options and find a useful next move.",
    duration: "12 min",
    icon: "idea" as const,
  },
  {
    id: "safety",
    title: "Safer working, together.",
    detail: "Connect everyday safety choices to the people around you.",
    duration: "15 min",
    icon: "spark" as const,
  },
];
const features = [
  {
    title: "A clear next step.",
    icon: "idea" as const,
    copy: "Personal learning pathways, assigned courses and a simple place to pick up where you left off.",
  },
  {
    title: "Your content, together.",
    icon: "play" as const,
    copy: "A searchable home for SCORM courses, video and useful resources. Bring your existing learning along.",
  },
  {
    title: "Progress with perspective.",
    icon: "spark" as const,
    copy: "Completion, confidence and assessment results. Useful reporting for learners, managers and learning teams.",
  },
  {
    title: "Less chasing. More doing.",
    icon: "heart" as const,
    copy: "Due dates and thoughtful reminders to help people stay on track, with less manual follow-up for your team.",
  },
  {
    title: "Make it feel like you.",
    icon: "idea" as const,
    copy: "Your branding, your teams and your learning journeys. A welcoming space that feels familiar from the first login.",
  },
  {
    title: "Celebrate a little progress.",
    icon: "spark" as const,
    copy: "Certificates and milestones that recognise achievement, with accessible experiences across desktop and mobile.",
  },
];

function ButterlearnPreview() {
  const [selected, setSelected] = useState(sampleCourses[0].id);
  const [completed, setCompleted] = useState<string[]>([]);
  const [report, setReport] = useState("Everyone");
  const [automatic, setAutomatic] = useState(true);
  const [audience, setAudience] = useState("New starters");
  const course = sampleCourses.find((item) => item.id === selected)!;
  const people = [
    {
      name: "Sam",
      progress: completed.length,
      status:
        completed.length === 3
          ? "Complete"
          : completed.length > 0
            ? "In progress"
            : "Not started",
    },
    { name: "Alex", progress: 3, status: "Complete" },
    { name: "Jo", progress: 0, status: "Not started" },
  ];
  const visible = people.filter(
    (person) =>
      report === "Everyone" ||
      (report === "Needs a nudge"
        ? person.status !== "Complete"
        : person.status === "Complete"),
  );
  return (
    <div className="butterlearn-preview">
      <div className="butterlearn-preview-bar">
        <span className="butterlearn-logo">
          butterlearn
          <Spark />
        </span>
        <span>Product preview</span>
      </div>
      <div className="butterlearn-preview-body">
        <Tabs
          label="Explore Butterlearn"
          items={[
            {
              id: "learner",
              label: "Learner",
              content: (
                <div className="butterlearn-learner">
                  <div className="butterlearn-dashboard-heading">
                    <div>
                      <h3>Hello, Sam.</h3>
                      <p>A little learning. A good next step.</p>
                    </div>
                    <Doodle kind="heart" />
                  </div>
                  <div className="butterlearn-course-grid">
                    {sampleCourses.map((item) => (
                      <button
                        type="button"
                        className="butterlearn-course"
                        key={item.id}
                        aria-pressed={selected === item.id}
                        onClick={() => setSelected(item.id)}
                      >
                        <Doodle kind={item.icon} />
                        <span>
                          {item.duration} ·{" "}
                          {completed.includes(item.id)
                            ? "Complete ✓"
                            : "Ready when you are"}
                        </span>
                        <strong>{item.title}</strong>
                        <Arrow />
                      </button>
                    ))}
                  </div>
                  <div className="butterlearn-course-detail">
                    <div>
                      <h4>{course.title}</h4>
                      <p>{course.detail}</p>
                    </div>
                    <button
                      type="button"
                      className="butterlearn-small-button"
                      disabled={completed.includes(selected)}
                      onClick={() =>
                        setCompleted((current) =>
                          current.includes(selected)
                            ? current
                            : [...current, selected],
                        )
                      }
                    >
                      {completed.includes(selected)
                        ? "Sample completed ✓"
                        : "Mark sample complete"}
                    </button>
                  </div>
                  <div className="butterlearn-progress">
                    <label htmlFor="butterlearn-progress">
                      Your welcome pathway
                    </label>
                    <progress
                      id="butterlearn-progress"
                      value={completed.length}
                      max={3}
                    />
                    <span role="status">
                      {completed.length} of 3 steps complete
                    </span>
                    <button
                      type="button"
                      className="reset-link"
                      disabled={!completed.length}
                      onClick={() => setCompleted([])}
                    >
                      Reset sample
                    </button>
                  </div>
                </div>
              ),
            },
            {
              id: "manager",
              label: "Manager",
              content: (
                <div className="butterlearn-manager">
                  <div className="butterlearn-dashboard-heading">
                    <div>
                      <h3>A clearer view of your team.</h3>
                      <p>
                        See who’s moving forward and who could use a little
                        support.
                      </p>
                    </div>
                    <Doodle kind="idea" />
                  </div>
                  <div
                    className="butterlearn-report-controls"
                    role="group"
                    aria-label="Filter sample report"
                  >
                    {["Everyone", "Needs a nudge", "Complete"].map((filter) => (
                      <button
                        type="button"
                        key={filter}
                        aria-pressed={report === filter}
                        onClick={() => setReport(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <div
                    className="butterlearn-report"
                    role="table"
                    aria-label="Sample team progress"
                  >
                    <div role="row" className="butterlearn-report-head">
                      <span role="columnheader">Person</span>
                      <span role="columnheader">Welcome pathway</span>
                      <span role="columnheader">Progress</span>
                    </div>
                    {visible.map((person) => (
                      <div role="row" key={person.name}>
                        <strong role="cell">{person.name}</strong>
                        <span role="cell">{person.progress} of 3 steps</span>
                        <span
                          role="cell"
                          className={`butterlearn-person-status ${person.status === "Complete" ? "is-complete" : ""}`}
                        >
                          {person.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p role="status" className="butterlearn-report-summary">
                    {visible.length}{" "}
                    {visible.length === 1 ? "person" : "people"} shown. Sam’s
                    progress follows your learner sample.
                  </p>
                  <p className="butterlearn-preview-explainer">
                    Planned reporting would help managers spot gaps, support
                    their people and share useful progress reports.
                  </p>
                </div>
              ),
            },
            {
              id: "admin",
              label: "Admin",
              content: (
                <div className="butterlearn-admin">
                  <div className="butterlearn-dashboard-heading">
                    <div>
                      <h3>A little less admin.</h3>
                      <p>Connect the right people to the right learning.</p>
                    </div>
                    <Doodle kind="spark" />
                  </div>
                  <div className="butterlearn-admin-grid">
                    <div className="butterlearn-rule">
                      <h4>A welcoming first week.</h4>
                      <p>Try a sample rule for assigning a welcome pathway.</p>
                      <label>
                        Who is it for?
                        <select
                          value={audience}
                          onChange={(event) => setAudience(event.target.value)}
                        >
                          <option>New starters</option>
                          <option>Managers</option>
                          <option>Everyone</option>
                        </select>
                      </label>
                      <div className="butterlearn-switch-row">
                        <span id="butterlearn-rule-label">
                          Assign automatically
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-labelledby="butterlearn-rule-label"
                          aria-checked={automatic}
                          className="butterlearn-switch"
                          onClick={() => setAutomatic((current) => !current)}
                        >
                          <span />
                        </button>
                      </div>
                      <p role="status">
                        {automatic
                          ? `This sample would assign the welcome pathway to ${audience.toLowerCase()}.`
                          : "Automatic assignment is off in this sample."}
                      </p>
                    </div>
                    <div className="butterlearn-admin-note">
                      <Doodle kind="play" />
                      <h4>A home for the whole journey.</h4>
                      <p>
                        Course publishing, groups, learning assignments and
                        branded portals are part of the planned admin
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default function Butterlearn() {
  return (
    <>
      <PageHero
        title={
          <>
            A little Butter.
            <br />A lot of <span className="underlined">learning.</span>
          </>
        }
        aside={
          <div className="butterlearn-hero-art">
            <div className="butterlearn-hero-circle" />
            <ButterCharacter />
            <span className="butterlearn-logo">
              butterlearn
              <Spark />
            </span>
          </div>
        }
      >
        <p>
          Butterlearn is our upcoming LMS. One welcoming place for your courses,
          your people and their progress.
        </p>
        <div className="butterlearn-hero-actions">
          <Link className="pill-button" to={butterlearnEnquiry}>
            Let’s talk Butterlearn <Arrow diagonal />
          </Link>
          <TextLink to="/butterlearn/login">Log in</TextLink>
        </div>
        <p className="butterlearn-development-note">
          In development. Explore what we’re shaping below.
        </p>
      </PageHero>
      <section
        className="butterlearn-product container"
        aria-label="Butterlearn product preview"
      >
        <Reveal>
          <ButterlearnPreview />
        </Reveal>
        <p className="butterlearn-sample-note">
          An interactive concept preview with sample data. Try each role. Your
          selections stay on this page.
        </p>
      </section>
      <section
        className="butterlearn-features section container"
        aria-labelledby="butterlearn-features-title"
      >
        <Reveal className="section-intro">
          <h2 id="butterlearn-features-title">
            Everything in
            <br />a <span className="underlined">good place.</span>
          </h2>
          <p>
            The features we’re planning.
            <br />
            Shaped around real people and useful learning.
          </p>
        </Reveal>
        <div className="butterlearn-feature-grid">
          {features.map((feature, index) => (
            <Reveal
              className="butterlearn-feature"
              key={feature.title}
              delay={(index % 3) * 60}
            >
              <Doodle kind={feature.icon} />
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="butterlearn-faq faq-section container">
        <Reveal>
          <h2>
            A little
            <br />
            <span className="underlined">clarity.</span>
          </h2>
        </Reveal>
        <div className="faq-list">
          <Accordion title="Can we use Butterlearn yet?">
            <p>
              Butterlearn is in development. This page shows the direction we’re
              exploring, rather than a live learning platform. Login and account
              access will follow when the LMS is ready. There’s no launch date
              or subscription pricing confirmed yet.
            </p>
          </Accordion>
          <Accordion title="Will we be able to bring our own learning?">
            <p>
              That’s the plan. We’re designing around SCORM courses, video and
              downloadable resources, alongside the learning Butter can create
              with you. Tell us about your current content and platform so we
              can shape the right support.
            </p>
          </Accordion>
          <Accordion title="How will people sign in?">
            <p>
              The future LMS will require an account, with separate access for
              learners, managers and admins. Organisation sign-in and single
              sign-on are being considered as the platform takes shape.
            </p>
          </Accordion>
          <Accordion title="Can we help shape it?">
            <p>
              Yes. We’d love to hear about your learners, your current
              frustrations and the features that would make a difference. The
              conversation starts with your team, rather than a
              one-size-fits-all feature list.
            </p>
            <TextLink to={butterlearnEnquiry}>Tell us what you need</TextLink>
          </Accordion>
        </div>
      </section>
      <Reveal className="butterlearn-cta container">
        <Spark />
        <h2>
          Your people.
          <br />A happier place to <span className="underlined">learn.</span>
        </h2>
        <p>Help us shape a little less friction and a lot more possibility.</p>
        <Link className="pill-button" to={butterlearnEnquiry}>
          Let’s talk about your team <Arrow diagonal />
        </Link>
      </Reveal>
    </>
  );
}

export function ButterlearnLogin() {
  return (
    <PageHero
      title={
        <>
          Good things
          <br />
          are <span className="underlined">on the way.</span>
        </>
      }
      aside={
        <div className="butterlearn-hero-art">
          <div className="butterlearn-hero-circle" />
          <ButterCharacter />
          <span className="butterlearn-logo">
            butterlearn
            <Spark />
          </span>
        </div>
      }
    >
      <p>
        Butterlearn login is coming soon. Account access will open when the
        learning platform is ready.
      </p>
      <div className="butterlearn-hero-actions">
        <Link className="pill-button" to={butterlearnEnquiry}>
          Talk to us <Arrow diagonal />
        </Link>
        <TextLink to="/butterlearn">Explore Butterlearn</TextLink>
      </div>
    </PageHero>
  );
}
