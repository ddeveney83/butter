import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Spark, Doodle } from "../components/Artwork";
import { ContactCTA, ProjectCard, Reveal, TextLink } from "../components/UI";
import { projects, featuredProjects } from "../data/projects";
import { offers, offerPath } from "../data/offers";
import ServiceCards from "../components/ServiceCards";
import HomeHero from "../components/HomeHero";

export default function Home() {
  return (
    <>
      <HomeHero />
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
            <Link className="home-local-link" to="/elearning-devon">
              eLearning for Devon businesses <Arrow diagonal />
            </Link>
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
          {featuredProjects.map((project) => (
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
                "learning-strategy",
                "bespoke-elearning",
                "lms-development",
              ].map((slug, index) => {
                const offer = offers.find((item) => item.slug === slug)!;
                return (
                  <Link to={offerPath(offer)} key={slug}>
                    <span>0{index + 1}</span>
                    <h3>{offer.title}</h3>
                    <Arrow diagonal />
                  </Link>
                );
              })}
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
