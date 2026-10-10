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
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
    <svg
      className={className}
      viewBox="0 0 480 460"
      fill="none"
      role="img"
      aria-label="A smiling butter character with cartoon gloves and dancing feet"
    >
      <g
        stroke="#20201d"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M183 311c-10 35-13 47-35 68m139-69c5 20 17 31 28 44" />
        <path
          d="M143 369c-20-7-34 1-45 19-13 22-3 36 21 33l48-10c12-3 14-14 7-24-6-10-16-16-31-18Z"
          fill="#20201d"
        />
        <path
          d="M306 350c16-7 30 0 34 13l7 13c25 0 35 9 31 20-4 15-55 14-73 4-16-9-13-37 1-50Z"
          fill="#20201d"
        />
        <path d="M110 217c-26 5-39 20-39 41m277-65c26-12 31-26 36-48" />
        <path d="m135 114 71-45 144 54 2 166-69 49-145-53Z" fill="#fff2a5" />
        <path d="m135 114 144 51 71-42-144-54Z" fill="#fff8ce" />
        <path d="m279 165 71-42 2 166-69 49Z" fill="#eac850" />
        <path d="m135 114 144 51 4 173-145-53Z" fill="#f8df65" />
        <path d="m154 106 136 47" strokeWidth="3" />
        <ellipse
          cx="183"
          cy="202"
          rx="13"
          ry="24"
          fill="#20201d"
          transform="rotate(-7 183 202)"
        />
        <ellipse
          cx="231"
          cy="217"
          rx="13"
          ry="24"
          fill="#20201d"
          transform="rotate(-7 231 217)"
        />
        <path
          d="m178 246 60 16c-6 24-24 29-40 20-12-7-18-20-20-36Z"
          fill="#20201d"
        />
        <path d="M196 276c9-11 21-10 31-5" stroke="#fff8ce" strokeWidth="5" />
        <path d="M163 231c-8-1-11 1-14 4m99 23c8 1 11 5 12 9" strokeWidth="3" />
        <path
          d="M62 246c-13-9-22-4-20 8l5 13c-19-15-28-8-20 6l9 12c-19-6-21 5-7 15l12 8c-7 6-4 16 12 18 18 2 36-10 39-24 4-17-13-28-14-40-1-17-15-21-16-16Z"
          fill="#fffcf2"
        />
        <path d="m47 277 15 9m-22 9 16 4m13-35 3 17" strokeWidth="3" />
        <path
          d="M367 137c-7-20-3-33 7-32 6 0 8 9 9 15 4-30 10-40 18-36 7 4 1 24 0 34 13-19 25-25 29-15 3 7-9 22-14 28 22-9 33-5 29 4-4 8-21 13-25 15 9 10 1 23-15 24-17 1-29-18-38-37Z"
          fill="#fffcf2"
        />
        <path d="m393 136 9-7m-3 19 15-7" strokeWidth="3" />
        <path d="m68 373-15 4m318-62 17 6M85 126l-12-12" strokeWidth="4" />
      </g>
      <ellipse cx="180" cy="194" rx="4" ry="7" fill="#fff8ce" />
      <ellipse cx="228" cy="209" rx="4" ry="7" fill="#fff8ce" />
    </svg>
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

export function Doodle({
  kind,
  className = "",
}: {
  kind: "heart" | "idea" | "play" | "spark";
  className?: string;
}) {
  return (
    <svg
      className={`doodle ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "heart" && (
          <>
            <path
              d="M50 78S15 59 15 36c0-21 27-28 35-8 8-20 35-13 35 8 0 23-35 42-35 42Z"
              fill="#f8e477"
            />
            <path d="M38 41v8m24-8v8m-25 9q13 14 26 0" />
          </>
        )}
        {kind === "idea" && (
          <>
            <path
              d="M34 70c0-12-13-15-13-34a29 29 0 0 1 58 0c0 19-13 22-13 34Z"
              fill="#f8e477"
            />
            <path d="M35 80h30m-23 9h16M40 40v7m20-7v7m-20 9q10 8 20 0M9 22l-6-4m88 4 6-4M50 1v-5" />
          </>
        )}
        {kind === "play" && (
          <>
            <rect x="12" y="18" width="76" height="60" rx="12" fill="#f8e477" />
            <path d="m42 34 23 15-23 15ZM27 85h46" />
          </>
        )}
        {kind === "spark" && (
          <>
            <path
              d="m50 10 9 24 24-9-9 25 16 17-26 2-14 22-13-22-27-2 17-17-10-25 25 9Z"
              fill="#f8e477"
            />
            <path d="M39 45v8m22-8v8m-21 8q10 9 20 0" />
          </>
        )}
      </g>
    </svg>
  );
}
