import { MotionLink as Link } from "../components/Motion";
import { PageHero } from "../components/UI";
import { privacySections } from "../data/privacy";
export default function Privacy() {
  return (
    <>
      <PageHero title="A little clarity about your data.">
        <p>
          How the butter agency website handles enquiries and anonymous website
          measurement.
        </p>
      </PageHero>
      <div className="privacy-copy container">
        {privacySections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <Link className="text-link" to="/contact">
          Contact the studio
        </Link>
      </div>
    </>
  );
}
