import { MotionLink as Link } from "../components/Motion";
import { Arrow, Doodle } from "../components/Artwork";
import {
  Accordion,
  ContactCTA,
  PageHero,
  Reveal,
  TextLink,
} from "../components/UI";
import ServiceCards from "../components/ServiceCards";
export default function Devon() {
  return (
    <>
      <PageHero
        title={<>eLearning for Devon businesses.</>}
        aside={<Doodle kind="idea" className="offer-hero-icon" />}
      >
        <p>
          Bespoke digital learning, staff onboarding and practical training
          content for teams across Devon and the South West.
        </p>
        <div className="lead-actions">
          <Link
            className="pill-button"
            to="/contact?service=Devon%20project"
            data-conversion="enquiry_click"
          >
            Talk about your project <Arrow diagonal />
          </Link>
          <TextLink to="/work">Explore the work</TextLink>
        </div>
      </PageHero>
      <section className="offer-intro section container">
        <Reveal>
          <h2>Built around your working day.</h2>
          <p className="large-copy">
            A seasonal team, several sites or a small group of specialists: your
            learning needs to fit the way your business works.
          </p>
        </Reveal>
        <Reveal>
          <p>
            We can help shape the content, design the experience and build
            learning that people can use on their intended devices. Projects can
            be planned remotely, with clear review stages and input from your
            subject experts.
          </p>
          <p>
            For businesses in Exeter, Plymouth, Torbay, North Devon and the
            surrounding area, the starting point is the same: what should your
            people be able to do, and what support will help?
          </p>
        </Reveal>
      </section>
      <section
        className="local-use-cases container"
        aria-labelledby="devon-use-cases"
      >
        <h2 id="devon-use-cases">Useful places to start.</h2>
        <div className="offer-deliverables">
          <Reveal>
            <Doodle kind="heart" />
            <h3>Welcome a seasonal team.</h3>
            <p>
              A focused induction for hospitality, leisure or visitor-facing
              roles could connect customer care, key procedures and the right
              route to help.
            </p>
          </Reveal>
          <Reveal>
            <Doodle kind="idea" />
            <h3>Make guidance practical.</h3>
            <p>
              A care, housing or service business could use realistic decisions
              to help people apply approved policies consistently, with
              specialist review where needed.
            </p>
          </Reveal>
          <Reveal>
            <Doodle kind="spark" />
            <h3>Share specialist know-how.</h3>
            <p>
              A growing business or technical team could turn expert knowledge
              into worked examples, digital practice and reference material for
              new colleagues.
            </p>
          </Reveal>
        </div>
        <p className="lead-footnote">
          Examples of the learning we can scope together.
        </p>
      </section>
      <section className="lead-services section container">
        <h2>Find your starting point.</h2>
        <ServiceCards />
      </section>
      <section className="offer-questions section container">
        <h2>A few useful answers.</h2>
        <div>
          <Accordion title="Can we work together remotely?">
            <p>
              Yes. We can plan discovery, content reviews and production around
              remote collaboration. Tell us about your locations, working hours
              and the people who need to take part.
            </p>
          </Accordion>
          <Accordion title="Do we need a full course brief?">
            <p>
              No. Start with the problem, the people it affects and any existing
              content. We can discuss whether a small resource, a course or a
              connected programme is the right next step.
            </p>
          </Accordion>
          <Accordion title="Can we use our current training platform?">
            <p>
              We can agree a suitable HTML or SCORM delivery format and include
              testing with your intended platform in the project scope.
            </p>
          </Accordion>
        </div>
      </section>
      <ContactCTA to="/contact?service=Devon%20project" />
    </>
  );
}
