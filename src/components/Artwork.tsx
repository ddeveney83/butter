import type { CoursePreview } from "../data/coursePreviews";

export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ControlIcon({ kind }: { kind: "reset" | "copy" | "check" }) {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "reset" ? (
        <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
      ) : kind === "check" ? (
        <path d="m5 12 4 4L19 6" />
      ) : (
        <>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </>
      )}
    </svg>
  );
}

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ButterCharacter({ className = "" }: { className?: string }) {
  return (
    <img
      className={`butter-mascot ${className}`}
      src="/brand/butter-mascot.webp"
      alt="Butter’s smiling mascot carrying a pencil and tablet"
      width={1217}
      height={1292}
      loading={className.includes("hero") ? "eager" : "lazy"}
      fetchPriority={className.includes("hero") ? "high" : "auto"}
    />
  );
}

export function ProjectArt({ kind }: { kind: string }) {
  if (!["yellow", "lilac"].includes(kind))
    return <ExtraProjectArt kind={kind} />;
  if (kind === "yellow")
    return (
      <div className="project-art art-onboarding" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="learning-window">
          <div className="window-top">
            <span className="mini-brand">hello.</span>
            <span className="window-dots">•••</span>
          </div>
          <div className="window-content">
            <span className="lesson-pill">Your first day, your way.</span>
            <strong>
              Big things.
              <br />
              Small beginnings.
            </strong>
            <div className="window-bottom">
              <span className="lesson-progress">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="mini-next">
                <Arrow />
              </span>
            </div>
          </div>
        </div>
        <div className="sticker star-sticker">
          <Spark />
          <span>let’s go!</span>
        </div>
      </div>
    );
  return (
    <div className="project-art art-leadership" aria-hidden="true">
      <div className="leadership-window">
        <div className="leadership-top">
          <span>the human side</span>
          <span>01 / 05</span>
        </div>
        <div className="smile-flower">
          <svg viewBox="0 0 200 200">
            <path
              d="M100 25C119-7 143 3 142 36c35-15 53 8 29 33 37 11 36 39 0 50 25 28 7 49-28 35 2 39-25 48-43 16-20 32-44 23-42-15-35 14-53-10-29-36-36-11-38-40 0-50C5 43 23 21 58 36 57 1 82-6 100 25Z"
              fill="#f8e477"
              stroke="#f8e477"
              strokeWidth="7"
            />
            <ellipse cx="79" cy="83" rx="8" ry="15" fill="#20201d" />
            <ellipse cx="122" cy="83" rx="8" ry="15" fill="#20201d" />
            <path
              d="M69 115q32 36 64 0"
              fill="none"
              stroke="#20201d"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <strong>
          A little empathy.
          <br />A big difference.
        </strong>
        <div className="choice-row">
          <span>Let’s talk about it</span>
          <Arrow />
        </div>
      </div>
      <Spark className="art-spark" />
    </div>
  );
}

function ExtraProjectArt({ kind }: { kind: string }) {
  if (kind === "mint")
    return (
      <div className="project-art art-wellbeing" aria-hidden="true">
        <div className="wellbeing-orbit" />
        <div className="phone-card">
          <div className="phone-notch" />
          <span className="art-small">a moment for you</span>
          <div className="breathing-circle">
            <span>in.</span>
            <Spark />
          </div>
          <strong>
            Find your
            <br />
            breathing room.
          </strong>
          <div className="phone-progress">
            <i />
            <i />
            <i />
          </div>
        </div>
        <span className="art-side-note">
          a little pause.
          <br />a fresh perspective.
        </span>
      </div>
    );
  if (kind === "ink")
    return (
      <div className="project-art art-ethics" aria-hidden="true">
        <div className="ethics-card">
          <span className="art-small">the everyday grey areas</span>
          <svg className="shield-art" viewBox="0 0 130 145">
            <path
              d="M65 8 118 28v42c0 31-25 52-53 66C37 122 12 101 12 70V28Z"
              fill="#f8e477"
              stroke="#f8e477"
              strokeWidth="5"
            />
            <path
              d="m41 69 17 17 33-35"
              fill="none"
              stroke="#20201d"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <strong>
            Good judgement.
            <br />
            Real moments.
          </strong>
          <div className="ethics-choices">
            <span>What would you do?</span>
            <Arrow />
          </div>
        </div>
        <Spark className="ethics-spark" />
      </div>
    );
  if (kind === "garden")
    return (
      <div className="project-art art-garden" aria-hidden="true">
        <div className="garden-card">
          <div className="garden-top">
            <span>little by little</span>
            <Spark />
          </div>
          <strong>
            A small change.
            <br />A growing idea.
          </strong>
          <svg className="sprout-art" viewBox="0 0 220 150">
            <path
              d="M110 135V75"
              stroke="#20201d"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M110 93C61 94 40 68 41 28c43-3 71 20 69 65Z"
              fill="#abc09a"
              stroke="#20201d"
              strokeWidth="5"
            />
            <path
              d="M110 71c-2-39 26-62 70-56 0 37-23 61-70 56Z"
              fill="#f8e477"
              stroke="#20201d"
              strokeWidth="5"
            />
            <path
              d="m65 52 44 41m46-53-45 32"
              stroke="#20201d"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="110" cy="138" rx="65" ry="5" fill="#20201d" />
          </svg>
          <div className="garden-step">
            <span>One good thing at a time.</span>
            <Arrow />
          </div>
        </div>
        <span className="garden-dot dot-one" />
        <span className="garden-dot dot-two" />
      </div>
    );
  return (
    <div className="project-art art-skills" aria-hidden="true">
      <div className="skills-card">
        <div className="skills-top">
          <span>make it click.</span>
          <span>02 / 06</span>
        </div>
        <div className="skills-check">
          <svg viewBox="0 0 100 100">
            <path
              d="m23 50 19 19 37-40"
              fill="none"
              stroke="#20201d"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <strong>
          A little knowledge.
          <br />A lot of confidence.
        </strong>
        <div className="skills-options">
          <span>Learn it</span>
          <span>
            Try it <Arrow />
          </span>
        </div>
      </div>
      <Spark className="skills-spark" />
    </div>
  );
}

function CartoonFace({ transform = "" }: { transform?: string }) {
  return (
    <g
      transform={transform}
      stroke="#080906"
      strokeWidth="3"
      strokeLinejoin="round"
    >
      <ellipse cx="39" cy="45" rx="9" ry="14" fill="#fff" />
      <ellipse cx="61" cy="45" rx="9" ry="14" fill="#fff" />
      <ellipse cx="42" cy="46" rx="5.5" ry="11" fill="#080906" stroke="none" />
      <ellipse cx="64" cy="46" rx="5.5" ry="11" fill="#080906" stroke="none" />
      <path d="m36 40 8 6-8 4m22-10 8 6-8 4" fill="#fff" stroke="none" />
      <path d="M34 63q16 22 32 0-16 5-32 0Z" fill="#080906" />
      <path d="M45 72q8-8 14-2-7 9-14 2Z" fill="#c35841" stroke="none" />
      <path
        d="M31 28q8-7 15-2m9 0q8-5 15 3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}
export function Doodle({
  kind,
  className = "",
}: {
  kind: "heart" | "idea" | "play" | "spark";
  className?: string;
}) {
  return (
    <svg
      className={`doodle toon-icon ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="94" rx="28" ry="3" fill="#080906" opacity=".12" />
      <g
        stroke="#080906"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "heart" && (
          <>
            <path
              d="M50 85S12 64 12 38C12 12 43 7 50 28C57 7 88 12 88 38C88 64 50 85 50 85Z"
              fill="#f1d16b"
            />
            <path
              d="M77 19q17 17 2 39L51 82q8-21 22-37 8-12 4-26Z"
              fill="#d29e46"
              stroke="none"
            />
            <CartoonFace transform="translate(8 4) scale(.84)" />
          </>
        )}
        {kind === "idea" && (
          <>
            <path
              d="M33 69c0-12-13-15-13-33a30 30 0 0 1 60 0c0 18-13 21-13 33Z"
              fill="#f1d16b"
            />
            <path
              d="M66 12q18 11 12 30-3 11-12 24H54q3-11 12-22 11-17 0-32Z"
              fill="#d29e46"
              stroke="none"
            />
            <path d="M33 71h34v10H33Zm9 11h16v8H42Z" fill="#fff" />
            <path d="M7 24 3 21m90 3 4-3M50 3V0" />
            <CartoonFace transform="translate(11 0) scale(.78)" />
          </>
        )}
        {kind === "play" && (
          <>
            <rect x="10" y="16" width="80" height="64" rx="17" fill="#f1d16b" />
            <path
              d="M77 19q11 2 10 16v29q0 13-12 13H58q28-10 19-58Z"
              fill="#d29e46"
              stroke="none"
            />
            <path d="m42 33 24 16-24 16Z" fill="#fff" />
            <path d="M29 87h42" />
            <path d="M18 34q0-10 10-10" stroke="#fff" strokeWidth="4" />
          </>
        )}
        {kind === "spark" && (
          <>
            <path
              d="m50 8 12 23 25-8-9 27 15 19-28 1-15 22-15-22-28-1 15-19-9-27 25 8Z"
              fill="#f1d16b"
            />
            <path
              d="m74 28-6 21 19 17-26 1-12 20 4-25 12-20Z"
              fill="#d29e46"
              stroke="none"
            />
            <CartoonFace transform="translate(17 13) scale(.66)" />
          </>
        )}
      </g>
    </svg>
  );
}

export function LearningIllustration({
  kind,
}: {
  kind: CoursePreview["illustration"];
}) {
  if (kind === "butter") return <ButterCharacter />;
  if (kind === "heart" || kind === "idea") return <Doodle kind={kind} />;
  return (
    <svg viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <g
        stroke="#080906"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "cloud" && (
          <>
            <path
              d="M54 156c-43 0-46-61-5-70 0-46 67-65 91-20 37-15 69 13 64 46 31 24 10 55-19 55H64Z"
              fill="#fff3cb"
            />
            <CartoonFace transform="translate(70 75)" />
            <path d="M54 190h33m18 0h65" />
          </>
        )}
        {kind === "shield" && (
          <>
            <path
              d="m120 32 72 29v57c0 43-36 72-72 91-36-19-72-48-72-91V61Z"
              fill="#f1d16b"
            />
            <path
              d="M178 61v59q-3 46-58 80l12-44q39-22 46-95Z"
              fill="#d29e46"
              stroke="none"
            />
            <path d="m83 115 25 25 50-55" strokeWidth="17" />
            <path d="m83 115 25 25 50-55" stroke="#fff" strokeWidth="7" />
            <path d="M25 82 13 76m202 6 12-6M120 10V2" />
          </>
        )}
        {kind === "plant" && (
          <>
            <path
              d="M120 143V77m0 32c-51 1-68-27-66-52 37-3 66 17 66 52Zm0-17c46 0 67-28 65-54-39-3-65 22-65 54Z"
              fill="#a1b7ae"
            />
            <path d="m71 143 13 69h73l13-69Z" fill="#f1d16b" />
            <path d="m153 149-4 56h-19l10-56Z" fill="#d29e46" stroke="none" />
            <CartoonFace transform="translate(83 148) scale(.74)" />
            <path d="M70 143h101M38 199l-13 8m168-10 15 7" />
          </>
        )}
      </g>
    </svg>
  );
}
