import { MotionLink as Link } from "../components/Motion";
import { offers, offerPath } from "../data/offers";
import { Arrow, Doodle } from "../components/Artwork";
import {
  Accordion,
  ContactCTA,
  PageHero,
  Reveal,
  Tabs,
  TextLink,
} from "../components/UI";

const services = [
  {
    title: "Learning strategy",
    icon: "idea" as const,
    copy: "Find the real challenge before choosing the solution. We connect what your people need with what your organisation is trying to change.",
    list: [
      "Discovery & audience insight",
      "Learning journeys & content mapping",
      "Learning objectives & evaluation planning",
    ],
  },
  {
    title: "Digital experiences",
    icon: "play" as const,
    copy: "Learning people can do something with. Thoughtful interactions and a clear journey turn information into practice.",
    list: [
      "Interactive eLearning & scenarios",
      "Mobile-first microlearning",
      "Learning platform-ready packages, scoped together",
      "LMS architecture & development",
      "Platform delivery & migration planning",
    ],
  },
  {
    title: "Story & design",
    icon: "spark" as const,
    copy: "Give your knowledge a voice and a visual world. We make the important things clear, inviting, and hard to forget.",
    list: [
      "Creative direction & visual identity",
      "Scriptwriting & storyboards",
      "Illustration, motion & explainers",
    ],
  },
  {
    title: "A little ongoing butter",
    icon: "heart" as const,
    copy: "An extra pair of thoughtful hands for your team. Keep your learning fresh with a clear, agreed rhythm of support.",
    list: [
      "Content refreshes & improvements",
      "Design support & creative reviews",
      "An ongoing partnership with agreed priorities",
    ],
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
      <section
        className="lead-service-links container"
        aria-label="Services for your next project"
      >
        {offers.map((offer) => (
          <Link key={offer.slug} to={offerPath(offer)}>
            <Doodle kind={offer.icon} />
            <span>{offer.title}</span>
            <Arrow diagonal />
          </Link>
        ))}
      </section>
      <section className="service-list container" aria-label="Our services">
        {services.map((service, index) => (
          <Reveal key={service.title}>
            <Accordion
              variant="service"
              title={service.title}
              number={`0${index + 1}`}
              defaultOpen={index === 0}
            >
              <div className="service-content">
                <Doodle kind={service.icon} />
                <div>
                  <p>{service.copy}</p>
                  <ul>
                    {service.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <TextLink
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                  >
                    Let’s talk about it
                  </TextLink>
                </div>
              </div>
            </Accordion>
          </Reveal>
        ))}
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
