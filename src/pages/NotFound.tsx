import { Link } from "react-router-dom";
import { ButterCharacter, Arrow } from "../components/Artwork";
import { PageHero } from "../components/UI";

export default function NotFound() {
  return (
    <PageHero
      title={
        <>
          A little
          <br />
          <span className="underlined">lost?</span>
        </>
      }
      aside={<ButterCharacter />}
    >
      <p>
        This page seems to have wandered off. Let’s get you back to the good
        stuff.
      </p>
      <Link className="pill-button" to="/">
        Back to Butter <Arrow diagonal />
      </Link>
    </PageHero>
  );
}
