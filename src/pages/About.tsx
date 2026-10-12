import { ButterCharacter, Doodle, Spark } from "../components/Artwork";
import { ContactCTA, PageHero, Reveal, Tabs, TextLink } from "../components/UI";

const values = [
  {
    id: "curious",
    label: "Stay curious.",
    icon: "idea" as const,
    title: "Good questions come first.",
    copy: "We make room for the “why?”, the unexpected angle, and the idea that hasn’t quite found its shape. Understanding the people doing the learning is where every project begins.",
  },
  {
    id: "clear",
    label: "Keep it clear.",
    icon: "spark" as const,
    title: "Clarity is a creative act.",
    copy: "Simple doesn’t happen by accident. We find the thread, remove the noise, and give every word and interaction a reason to be there. Less to wade through. More to take away.",
  },
  {
    id: "human",
    label: "Make it human.",
    icon: "heart" as const,
    title: "People before platforms.",
    copy: "A person sits on the other side of every screen. We design for their time, their context, and their confidence. A little warmth goes a long way.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        title={
          <>
            A little different.
            <br />A lot more <span className="underlined">human.</span>
          </>
        }
        aside={
          <div className="about-hero-art">
            <div className="butter-circle" />
            <ButterCharacter />
            <Spark className="about-art-spark" />
          </div>
        }
      >
        <p>
          We’re Butter. A creative learning agency with a simple belief: good
          learning should feel good, too.
        </p>
      </PageHero>
      <section className="about-story section container">
        <Reveal>
          <h2>
            Less information.
            <br />
            More <span className="underlined">connection.</span>
          </h2>
        </Reveal>
        <Reveal className="story-copy">
          <p className="large-copy">
            Facts are useful.
            <br />
            What people do with them
            <br />
            is where it gets interesting.
          </p>
          <p>
            We bring learning design, storytelling, and visual craft together to
            make complex things click. Not just a nicer set of slides, but an
            experience with something to say and a useful next step.
          </p>
          <p>
            We like a thoughtful question, a brave idea, and the details that
            make people feel considered. Playful when it helps. Clear, always.
          </p>
          <TextLink to="/services">See how we can help</TextLink>
        </Reveal>
      </section>
      <section className="values-section">
        <div className="container">
          <Reveal className="section-intro">
            <h2>
              A few things
              <br />
              we <span className="underlined">believe.</span>
            </h2>
            <p>
              Small principles.
              <br />A big part of how we work.
            </p>
          </Reveal>
          <Tabs
            label="Our values"
            items={values.map((value) => ({
              id: value.id,
              label: value.label,
              content: (
                <div className="value-content">
                  <Doodle kind={value.icon} />
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.copy}</p>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>
      <Reveal className="about-manifesto container">
        <span className="manifesto-mark" aria-hidden="true">
          “
        </span>
        <p>
          Make it useful.
          <br />
          Make it memorable.
          <br />
          Make it <span className="underlined">feel something.</span>
        </p>
        <Spark />
      </Reveal>
      <ContactCTA
        title={
          <>
            Good things start
            <br />
            with a <span className="underlined">conversation.</span>
          </>
        }
      />
    </>
  );
}
