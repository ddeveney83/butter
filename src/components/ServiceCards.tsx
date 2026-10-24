import { MotionLink as Link } from "./Motion";
import { Arrow } from "./Artwork";
import ServiceArtwork from "./ServiceArtwork";
import { offers, offerPath } from "../data/offers";

export default function ServiceCards({
  className = "",
  headingLevel = 3,
}: {
  className?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <nav
      className={`service-cards ${className}`}
      aria-label="Services for your next project"
    >
      {offers.map((offer) => (
        <Link
          className="service-card"
          key={offer.slug}
          to={offerPath(offer)}
          data-cursor-label="Explore service"
        >
          <ServiceArtwork slug={offer.slug} />
          <Heading className="service-card-title">
            {offer.title}
          </Heading>
          <p className="service-card-summary">
            {offer.cardSummary}
          </p>
          <span className="service-card-action">
            Explore service
            <span className="service-card-arrow"><Arrow diagonal /></span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
