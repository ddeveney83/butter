import { Arrow, Doodle } from "../components/Artwork";
import ServiceCards from "../components/ServiceCards";
import ServiceArtwork from "../components/ServiceArtwork";
import { offers, offerPath } from "../data/offers";
import {
  Accordion,
  ContactCTA,
  PageHero,
  Reveal,
  Tabs,
  TextLink,
} from "../components/UI";

const guidance = [
  {
    title: "We’re not sure what we need.",
    artwork: "learning-strategy",
    copy: "Start with what your people need to do and what is getting in the way. Discovery can help establish whether the next step is a course, a platform improvement or support for your team. You do not need to arrive with a finished brief.",
    services: ["learning-strategy", "bespoke-elearning"],
  },
  {
    title: "We already have courses or an LMS.",
    artwork: "course-refresh",
    copy: "We can review what you have before recommending a change. A clearer learning journey, a focused content refresh or an improvement to your existing platform may be the right starting point. We agree what can be reused before planning the work.",
    services: ["course-refresh", "lms-development"],
  },
  {
    title: "Our team needs an extra pair of hands.",
    artwork: "ld-team-development",
    copy: "We can work alongside your learning, technical and supplier teams. That might mean practical coaching for your L&D team or coordination of a platform project. We agree responsibilities, review points and the handover from the start.",
    services: ["ld-team-development", "lms-project-management"],
  },
  {
    title: "Can we combine several services?",
    artwork: "learning-animation",
    copy: "Yes. A learning experience can bring together strategy, courses, animation and a platform. For example, a compliance programme might combine realistic decision practice with short films. We scope the pieces around one goal, with a shared creative direction and delivery plan.",
    services: ["compliance-training", "learning-animation"],
  },
];
const process = [
  {
    id: "listen",
    label: "01 / Listen",
    title: "First, we get curious.",
    copy: "We ask good questions, meet your subject experts, and understand your learners. Together, we define what needs to change and what success should look like.",
    detail: "You bring the challenge. We find the thread.",
  },
  {
    id: "shape",
    label: "02 / Shape",
    title: "Give the idea a shape.",
    copy: "We map the experience and explore a creative direction. A storyboard or prototype makes the thinking tangible, so we can agree the approach before building.",
    detail: "A shared direction, before the detail.",
  },
  {
    id: "make",
    label: "03 / Make",
    title: "Make every detail count.",
    copy: "Writing, design, interactions, and motion come together. We work in clear review stages, with time to test the experience and make thoughtful refinements.",
    detail: "A little craft. A lot of care.",
  },
  {
    id: "spread",
    label: "04 / Spread",
    title: "Ready for the real world.",
    copy: "We test the agreed delivery format, support the handover, and give your team what it needs to launch. Evaluation starts with the objectives we set together.",
    detail: "Good learning deserves a good landing.",
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        title={
          <>
            Big ideas.
            <br />A little <span className="underlined">butter.</span>
          </>
        }
        aside={
          <div className="service-hero-doodles">
            <Doodle kind="idea" />
            <Doodle kind="play" />
            <Doodle kind="heart" />
          </div>
        }
      >
        <p>
          From “where do we start?” to “that’s exactly it.” We bring clear
          thinking and playful craft to every part of your learning.
        </p>
        <TextLink to="/contact">Talk about your project</TextLink>
      </PageHero>
      <ServiceCards className="lead-service-links container" headingLevel={2} />
      <section
        className="service-guidance container"
        aria-labelledby="service-guidance-heading"
      >
        <Reveal className="service-guidance-intro">
          <h2 id="service-guidance-heading">
            Find your <br />starting point.
          </h2>
          <p>
            Choose a service above, or start with the situation you’re in.
            We’ll help connect the right pieces.
          </p>
          <TextLink to="/contact">Let’s work it out together</TextLink>
        </Reveal>
        <div className="service-list">
          {guidance.map((item, index) => (
            <Reveal key={item.title}>
              <Accordion
                variant="service"
                headingLevel={3}
                title={item.title}
                illustration={<ServiceArtwork slug={item.artwork} />}
                defaultOpen={index === 0}
              >
                <div className="service-guidance-content">
                  <p>{item.copy}</p>
                  <div className="service-guidance-links">
                    {item.services.map((slug) => {
                      const offer = offers.find((entry) => entry.slug === slug)!;
                      return (
                        <TextLink key={slug} to={offerPath(offer)}>
                          {offer.title}
                        </TextLink>
                      );
                    })}
                  </div>
                </div>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="container">
          <Reveal className="section-intro">
            <h2>
              A good idea.
              <br />A clear <span className="underlined">path.</span>
            </h2>
            <p>
              No mystery process.
              <br />
              Just a thoughtful way of making things.
            </p>
          </Reveal>
          <Tabs
            label="Our process"
            items={process.map((step) => ({
              id: step.id,
              label: step.label,
              content: (
                <div className="process-content">
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                  <div className="process-note">
                    <Arrow diagonal />
                    <p>{step.detail}</p>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
