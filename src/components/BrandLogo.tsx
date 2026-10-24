/** One shared lockup for the agency, learning platform and brand guide. */
export default function BrandLogo({
  learning = false,
}: {
  learning?: boolean;
}) {
  return (
    <span className="brand-logo" aria-hidden="true">
      <img
        className="brand-logo-mark"
        src="/brand/butter-mark.webp"
        alt=""
        width="96"
        height="112"
      />
      <span className="brand-logo-name">
        butter{learning && <span>learn</span>}
      </span>
    </span>
  );
}
