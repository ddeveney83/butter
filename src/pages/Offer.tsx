import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Doodle } from "../components/Artwork";
import {
  Accordion,
  ContactCTA,
  PageHero,
  ProjectCard,
  Reveal,
  TextLink,
} from "../components/UI";
import { ArticleCard } from "./Journal";
import { articles } from "../data/editorial";
import { offers, offerPath, nextSteps } from "../data/offers";
import { projects } from "../data/projects";
import NotFound from "./NotFound";

export default function OfferPage() {
  const { slug } = useParams();
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) return <NotFound />;
  const project = projects.find((item) => item.id === offer.project)!;
  return (
    <>
      <PageHero
        title={offer.headline}
        aside={
          offer.icon === "play" ? (
            <ButterCharacter className="offer-hero-logo" />
          ) : (
            <Doodle kind={offer.icon} className="offer-hero-icon" />
          )
        }
      >
        <p>{offer.lead}</p>
        <div className="lead-actions">
          <Link
            className="pill-button"
            data-conversion="enquiry_click"
            to={`/contact?service=${encodeURIComponent(offer.title)}`}
          >
            Talk about your project <Arrow diagonal />
          </Link>
          <a className="text-link" href="#offer-work">
            See a related project <Arrow diagonal />
          </a>
        </div>
      </PageHero>
      <section className="offer-intro section container">
        <Reveal>
          <h2>A clear reason to make it.</h2>
          <p className="large-copy">{offer.need}</p>
        </Reveal>
        <Reveal>
          <h2>A thoughtful way to get there.</h2>
          <p>{offer.approach}</p>
        </Reveal>
      </section>
      <section
        className="offer-deliverables container"
        aria-label="What we can scope together"
      >
        {offer.deliverables.map((item, index) => (
          <Reveal key={item.title}>
            <span className="lead-step-number">0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </Reveal>
        ))}
      </section>
      <section id="offer-work" className="offer-work section container">
        <Reveal>
          <h2>See the thinking in practice.</h2>
          <p>{project.description}</p>
          <p className="offer-result">
            <strong>{project.metric.value}</strong>
            {project.metric.label}
          </p>
          <p className="lead-footnote">
            Reported in the project case study. Results depend on the audience,
            brief and context.
          </p>
        </Reveal>
        <Reveal>
          <ProjectCard project={project} />
        </Reveal>
      </section>
      <section
        className="lead-next-steps section container"
        aria-labelledby="offer-next-heading"
      >
        <h2 id="offer-next-heading">A clear next step.</h2>
        <div>
          {nextSteps.map((step, i) => (
            <Reveal key={step.title}>
              <span className="lead-step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="offer-questions container">
        <h2>A few useful answers.</h2>
        <div>
          {offer.questions.map((question) => (
            <Accordion key={question.title} title={question.title}>
              <p>{question.answer}</p>
            </Accordion>
          ))}
        </div>
      </section>
      <section className="editorial-related container">
        <h2>A little useful reading.</h2>
        <div className="editorial-grid two-columns">
          {offer.articles
            .map((slug) => articles.find((item) => item.slug === slug))
            .filter((article) => !!article)
            .map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>
      </section>
      <section
        className="offer-other-links container"
        aria-label="Explore other services"
      >
        {offers
          .filter((item) => item.slug !== offer.slug)
          .map((item) => (
            <TextLink key={item.slug} to={offerPath(item)}>
              {item.title}
            </TextLink>
          ))}
      </section>
      <ContactCTA to={`/contact?service=${encodeURIComponent(offer.title)}`} />
    </>
  );
}
