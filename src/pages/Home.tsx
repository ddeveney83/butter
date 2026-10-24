import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Spark, Doodle } from "../components/Artwork";
import { ContactCTA, ProjectCard, Reveal, TextLink } from "../components/UI";
import { projects } from "../data/projects";
import ServiceCards from "../components/ServiceCards";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <h1>
            Learning
            <br />
            with{" "}
            <span className="feeling">
              feeling
              <svg
                viewBox="0 0 380 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12Q165-2 374 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </h1>
          <p>
            Bespoke eLearning, LMS development and training content for
            businesses. We turn complex know-how into clear, practical learning
            for your team.
          </p>
          <div className="lead-actions">
            <Link
              className="pill-button"
              to="/contact"
              data-conversion="enquiry_click"
            >
              Talk about your project <Arrow diagonal />
            </Link>
            <TextLink to="/work">Explore our work</TextLink>
          </div>
        </div>
        <div className="hero-art">
          <div className="butter-circle" />
          <Spark className="hero-spark" />
          <ButterCharacter className="hero-character" />
          <span className="handwritten">
            good things
            <br />
            are spreading.
          </span>
        </div>
        <a className="scroll-note" href="#selected-work">
          Scroll for the good stuff <span>↓</span>
        </a>
        <span className="hero-footer-note">
          Independent minds. Shared curiosity.
        </span>
      </section>
      <section
        className="lead-proof container"
        aria-label="Reported project outcomes"
      >
        <div className="lead-proof-grid">
          {["allergen-awareness", "matrix-reloaded", "record-keeping"]
            .map((id) => projects.find((project) => project.id === id)!)
            .map((project) => (
              <Link key={project.id} to={`/work/${project.id}`}>
                <strong>{project.metric.value}</strong>
                <span>{project.metric.label}</span>
                <span className="lead-proof-project">
                  {project.title} <Arrow diagonal />
                </span>
              </Link>
            ))}
        </div>
        <p className="lead-footnote">
          Figures reported in the project case studies. Results depend on the
          audience, brief and context.
        </p>
      </section>
      <div className="ticker" aria-label="Thoughtfully made. Joyfully learned.">
        <div>
          <span>Thoughtfully made.</span>
          <Spark />
          <span>Joyfully learned.</span>
          <Spark />
          <span>Seriously good learning.</span>
          <Spark />
          <span>Thoughtfully made.</span>
          <Spark />
        </div>
      </div>
      <section className="lead-services section container">
        <Reveal className="section-intro">
          <h2>
            What needs
            <br />
            to <span className="underlined">change?</span>
          </h2>
          <p>
            Find a starting point for your team, your content and the work
            ahead.
          </p>
        </Reveal>
        <ServiceCards />
      </section>
      <section id="selected-work" className="work section container">
        <Reveal className="section-intro">
          <h2>
            Proof is in
            <br />
            the <span className="underlined">pudding.</span>
          </h2>
          <p>
            Fresh perspectives. Memorable experiences.
            <br />
            Here’s a little taste of what’s possible.
          </p>
        </Reveal>
        <div className="projects">
          {projects.slice(0, 2).map((project) => (
            <Reveal key={project.id}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="section-tail">
          <TextLink to="/work">Explore all {projects.length} projects</TextLink>
        </div>
      </section>
      <section className="about section">
        <div className="container about-grid">
          <Reveal>
            <h2>
              Complex things.
              <br />
              Made <span className="underlined">simple.</span>
            </h2>
            <div className="about-doodle">
              <ButterCharacter />
              <span>
                Less blah.
                <br />
                More aha!
              </span>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <p className="large-copy">
              Learning should spark something.
              <br />A new thought. A better way.
              <br />A moment that sticks.
            </p>
            <p>
              We’re butter, a creative learning agency bringing a little more
              humanity to digital learning. We turn your knowledge into
              experiences that feel good and do good.
            </p>
            <div className="services">
              {[
                "Learning strategy",
                "Digital experiences",
                "Story & design",
              ].map((item, index) => (
                <Link to="/services" key={item}>
                  <span>0{index + 1}</span>
                  <h3>{item}</h3>
                  <Arrow diagonal />
                </Link>
              ))}
            </div>
            <TextLink to="/about">A little about butter</TextLink>
          </Reveal>
        </div>
      </section>
      <section
        className="home-studio-links container"
        aria-label="From the butter studio"
      >
        <Link to="/journal">
          <Doodle kind="idea" />
          <div>
            <h2>Fresh thinking.</h2>
            <p>Practical ideas from the butter journal.</p>
          </div>
          <Arrow diagonal />
        </Link>
        <Link to="/labs">
          <Doodle kind="spark" />
          <div>
            <h2>A little what if.</h2>
            <p>Experiments and learning snippets from Labs.</p>
          </div>
          <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA />
    </>
  );
}
