import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Spark } from "../components/Artwork";
import { ContactCTA, ProjectCard, Reveal, TextLink } from "../components/UI";
import { projects } from "../data/projects";

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
            We make learning that moves people.
            <br className="desktop-break" /> A little curiosity. A lot of
            creativity.
            <br className="desktop-break" /> And just the right amount of
            Butter.
          </p>
          <Link className="pill-button" to="/work">
            Explore our work <Arrow diagonal />
          </Link>
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
          <TextLink to="/work">Explore all six projects</TextLink>
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
              We’re Butter, a creative studio bringing a little more humanity to
              digital learning. We turn your knowledge into experiences that
              feel good and do good.
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
            <TextLink to="/about">A little about Butter</TextLink>
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
