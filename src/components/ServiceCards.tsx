import { MotionLink as Link } from "./Motion";
import { Arrow, Doodle } from "./Artwork";
import { offers, offerPath } from "../data/offers";

export default function ServiceCards() {
  return (
    <div className="service-cards">
      {offers.map((offer) => (
        <Link key={offer.slug} to={offerPath(offer)}>
          <Doodle kind={offer.icon} />
          <h3>{offer.title}</h3>
          <p>{offer.lead}</p>
          <span>
            Explore the service <Arrow diagonal />
          </span>
        </Link>
      ))}
    </div>
  );
}
