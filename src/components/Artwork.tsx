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
      src="/brand/butter-mark.webp"
      alt="butter’s melting play symbol with coral sparks"
      width={720}
      height={758}
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
              fill="#ffdf55"
              stroke="#ffdf55"
              strokeWidth="7"
            />
            <ellipse cx="79" cy="83" rx="8" ry="15" fill="#111110" />
            <ellipse cx="122" cy="83" rx="8" ry="15" fill="#111110" />
            <path
              d="M69 115q32 36 64 0"
              fill="none"
              stroke="#111110"
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
              fill="#ffdf55"
              stroke="#ffdf55"
              strokeWidth="5"
            />
            <path
              d="m41 69 17 17 33-35"
              fill="none"
              stroke="#111110"
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
              stroke="#111110"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M110 93C61 94 40 68 41 28c43-3 71 20 69 65Z"
              fill="#abc09a"
              stroke="#111110"
              strokeWidth="5"
            />
            <path
              d="M110 71c-2-39 26-62 70-56 0 37-23 61-70 56Z"
              fill="#ffdf55"
              stroke="#111110"
              strokeWidth="5"
            />
            <path
              d="m65 52 44 41m46-53-45 32"
              stroke="#111110"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <ellipse cx="110" cy="138" rx="65" ry="5" fill="#111110" />
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
              stroke="#111110"
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

function IllustrationHighlight({ transform = "" }: { transform?: string }) {
  return (
    <path
      transform={transform}
      d="M31 36q0-11 12-15"
      stroke="#fffefb"
      strokeWidth="6"
      strokeLinecap="round"
    />
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
      <g
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "heart" && (
          <>
            <path
              d="M49 86S10 64 10 38C10 14 38 9 49 28 61 9 88 14 88 38 88 57 66 68 62 77c-3 6 3 10-3 14-7 4-13-1-10-5Z"
              fill="var(--butter-soft)"
            />
            <path
              d="M79 24q14 23-15 44c-7 6-13 9-14 16l8 6q6-2 3-9c-4-8 29-23 25-44Z"
              fill="var(--butter-gold)"
              stroke="none"
            />
            <path d="M20 36q1-12 12-12" stroke="#fffefb" strokeWidth="5" />
          </>
        )}
        {kind === "idea" && (
          <>
            <path
              d="M34 68c0-10-13-16-13-33a29 29 0 0 1 58 0c0 17-13 23-13 33Z"
              fill="var(--butter-soft)"
            />
            <path
              d="M65 11q22 20 1 48v7H54q2-11 11-23 10-17 0-32Z"
              fill="var(--butter-gold)"
              stroke="none"
            />
            <path d="m39 68-2-25 13 8 13-8-2 25M33 69h34v12H33Zm9 13h16v7H42Z" />
            <path d="M31 31q1-11 13-14" stroke="#fffefb" strokeWidth="5" />
          </>
        )}
        {kind === "play" && (
          <>
            <path
              d="M22 24q0-15 13-8l45 27q13 8 0 16L58 73q-8 5-8 12 0 9-7 5-3-3-3-7-8 1-6 12-1 6-8 2-5-4-1-12 4-9-3-12Z"
              fill="var(--butter-gold)"
            />
            <path
              d="M25 24q0-10 9-5l42 25q12 7 0 15L35 80q-10 5-10-7Z"
              fill="var(--butter-soft)"
              stroke="none"
            />
            <path d="m31 28 18 10" stroke="#f5be54" strokeWidth="4" />
          </>
        )}
        {kind === "spark" && (
          <>
            <path
              d="M48 12q3-8 7 0l9 23 23 9q8 4 0 8l-23 9-9 23q-4 9-8 0l-9-23-23-9q-9-4 0-8l23-9Z"
              fill="var(--butter-soft)"
            />
            <path
              d="m55 18 8 19 22 10-24 5-9 26-5-28Z"
              fill="var(--butter-gold)"
              stroke="none"
            />
          </>
        )}
      </g>
      <g stroke="var(--accent)" strokeWidth="5" strokeLinecap="round">
        <path d="m80 11 3-6m6 16 7-2" />
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
        stroke="#111110"
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
            <IllustrationHighlight transform="translate(70 75)" />
            <path d="M54 190h33m18 0h65" />
          </>
        )}
        {kind === "shield" && (
          <>
            <path
              d="m120 32 72 29v57c0 43-36 72-72 91-36-19-72-48-72-91V61Z"
              fill="#ffedb1"
            />
            <path
              d="M178 61v59q-3 46-58 80l12-44q39-22 46-95Z"
              fill="#ffda43"
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
              fill="var(--butter-soft)"
            />
            <path d="m71 143 13 69h73l13-69Z" fill="#ffedb1" />
            <path d="m153 149-4 56h-19l10-56Z" fill="#ffda43" stroke="none" />
            <IllustrationHighlight transform="translate(83 148) scale(.74)" />
            <path d="M70 143h101M38 199l-13 8m168-10 15 7" />
          </>
        )}
      </g>
    </svg>
  );
}
