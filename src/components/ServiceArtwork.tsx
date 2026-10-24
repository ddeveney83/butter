/** Small, original illustrations using the melting logo's rounded ink and colour. */
export default function ServiceArtwork({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      className={`service-artwork ${className}`}
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="78" cy="105" rx="55" ry="5" fill="var(--ink)" opacity=".08" />
      <g
        className="service-artwork-object"
        stroke="var(--ink)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {slug === "bespoke-elearning" && (
          <>
            <path d="M25 31q28-12 52 4 24-16 53-4v66q-29-11-53 3-24-14-52-3Z" fill="var(--paper)" />
            <path d="M77 35v65m-41-6q19-4 32 1m18 0q17-5 33-1" />
            <path d="M54 35q0-9 8-4l37 22q9 6 0 12L80 76q-6 4-6 10 0 6-5 3-3-2-3-6-6 1-5 9 0 6-6 3-4-3-1-9 3-7 0-11Z" fill="var(--butter-gold)" />
            <path d="m62 37 31 19q5 3 0 7L62 81Z" fill="var(--butter-soft)" stroke="none" />
            <path d="m63 39 12 7" stroke="var(--paper)" />
          </>
        )}
        {slug === "lms-development" && (
          <>
            <path d="M80 68v20m-36 8v-8h72v8" />
            <rect x="30" y="20" width="100" height="51" rx="10" fill="var(--butter-gold)" />
            <path d="M30 35h100" />
            <path d="M39 28h1m8 0h1m8 0h1" strokeWidth="3" />
            <rect x="42" y="44" width="22" height="16" rx="4" fill="var(--paper)" />
            <path d="M75 46h39M75 57h26" />
            <rect x="30" y="92" width="28" height="15" rx="5" fill="var(--paper)" />
            <rect x="102" y="92" width="28" height="15" rx="5" fill="var(--paper)" />
          </>
        )}
        {slug === "compliance-training" && (
          <>
            <path d="M80 17q19 13 43 15v27q0 28-43 47-43-19-43-47V32q24-2 43-15Z" fill="var(--butter-gold)" />
            <path d="M80 26q-15 10-34 13v20q0 20 34 37Z" fill="var(--paper)" stroke="none" />
            <path d="m59 60 14 14 29-31" strokeWidth="7" />
            <path d="m51 41 9-3" stroke="var(--paper)" />
          </>
        )}
        {slug === "course-refresh" && (
          <>
            <path d="M32 56a49 49 0 0 1 85-27m11 41a49 49 0 0 1-85 27" />
            <path d="m118 15 1 19-20-2m-58 78-1-19 20 2" fill="var(--butter-gold)" />
            <path d="M55 28h37l15 15v50H55Z" fill="var(--paper)" />
            <path d="M92 28v16h15M66 58h28M66 69h20" />
            <path d="m92 72 4 10 11 4-11 4-4 11-4-11-11-4 11-4Z" fill="var(--butter-gold)" />
          </>
        )}
        {slug === "learning-strategy" && (
          <>
            <path d="M31 99h63q19 0 19-16t-19-16H65q-17 0-17-15t17-15h38" strokeWidth="8" stroke="var(--paper)" />
            <path d="M31 99h63q19 0 19-16t-19-16H65q-17 0-17-15t17-15h38" strokeDasharray="4 8" strokeWidth="3" />
            <circle cx="30" cy="99" r="8" fill="var(--butter-gold)" />
            <path d="M103 57V16m1 2q12-9 29 0v23q-17-9-29 0" fill="var(--butter-gold)" />
            <path d="m109 22 10-1" stroke="var(--paper)" />
          </>
        )}
        {slug === "ld-team-development" && (
          <>
            <path d="M22 101v-8q0-21 22-21t22 21v8m28 0v-8q0-21 22-21t22 21v8" fill="var(--paper)" />
            <circle cx="44" cy="56" r="16" fill="var(--paper)" />
            <circle cx="116" cy="56" r="16" fill="var(--paper)" />
            <path d="M53 105V89q0-26 27-26t27 26v16Z" fill="var(--butter-gold)" />
            <circle cx="80" cy="43" r="22" fill="var(--butter-soft)" />
            <path d="M68 34q3-6 9-6" stroke="var(--paper)" />
            <path d="M73 43h0m14 0h0" strokeWidth="5" />
            <path d="M74 51q6 6 12 0m-16 54V91m20 14V91" />
          </>
        )}
        {slug === "learning-animation" && (
          <>
            <rect x="28" y="25" width="104" height="74" rx="10" fill="var(--paper)" />
            <path d="M43 25v74m74-74v74M29 43h14m-14 19h14m-14 19h14m74-38h14m-14 19h14m-14 19h14" />
            <path d="M67 46q0-7 6-3l24 15q6 4 0 8L84 75q-5 3-5 8 0 5-4 2-2-1-2-5-5 1-4 7 0 5-5 2-3-2-1-6 4-6 4-11Z" fill="var(--butter-gold)" />
            <path d="m73 48 11 7" stroke="var(--paper)" />
          </>
        )}
        {slug === "lms-project-management" && (
          <>
            <rect x="40" y="24" width="80" height="81" rx="10" fill="var(--paper)" />
            <rect x="62" y="15" width="36" height="18" rx="7" fill="var(--butter-gold)" />
            <path d="m54 50 4 4 7-8m-11 23 4 4 7-8m10-15h28M75 69h28" />
            <circle cx="111" cy="89" r="21" fill="var(--butter-gold)" />
            <path d="M111 76v14l8 4m-66-6h20" />
            <path d="M99 82q2-5 6-6" stroke="var(--paper)" />
          </>
        )}
      </g>
      <g className="service-artwork-sparks" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round">
        <path d="m135 19 5-7m3 19 9-2" />
      </g>
    </svg>
  );
}
