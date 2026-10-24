export type LabImage = {
  path: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export type LabProject = {
  slug: string;
  title: string;
  status: "Alpha" | "Beta";
  category: string;
  description: string;
  icon: "idea" | "heart" | "play" | "spark";
  theme: string;
  stack: string[];
  sections: { heading: string; paragraphs: string[] }[];
  hero: LabImage;
  gallery: LabImage[];
  articles: string[];
};
export const labs: LabProject[] = [
  {
    slug: "digital-accessibility-now",
    title: "Digital Accessibility Now",
    status: "Beta",
    category: "Accessibility · Audit and learning",
    description:
      "An accessibility audit platform that connects findings to plain-language guidance, helping people understand the standard while they review their content.",
    icon: "idea",
    theme: "cream",
    stack: ["HTML", "CSS", "JavaScript", "Netlify", "Supabase", "Claude Code"],
    sections: [
      {
        heading: "Turn a finding into understanding.",
        paragraphs: [
          "Accessibility guidance can be difficult to interpret in the middle of a design task. This project brings checks, explanations and references together so a finding can become a practical next step.",
          "The platform explores checks mapped to WCAG 2.2, including AAA criteria. Automated findings are a starting point for investigation; they do not establish full accessibility conformance without manual review and appropriate user testing.",
        ],
      },
      {
        heading: "Upload, review, learn.",
        paragraphs: [
          "Content uploads feed into an audit workflow, with a dashboard, content-type filters and an audit history. A glossary explains terms in plain language and connects them to the source guidance.",
          "The build includes user profiles, stored audit records and administrative controls. The visual approach uses restrained colour cues to distinguish status and help reviewers find the areas that need attention.",
        ],
      },
      {
        heading: "What the beta explores.",
        paragraphs: [
          "The working beta brings the audit and learning workflows into one platform. The next design question is how clearly a result explains both its limitations and the action a reviewer should take.",
          "The screens below show the dashboard, audit setup, record management and glossary from the project.",
        ],
      },
    ],
    articles: ["accessible-elearning-wcag", "universal-design-for-learning"],
    hero: {
      path: "/labs/digital-accessibility-now/hero.webp",
      alt: "Digital Accessibility Now — project overview",
      caption: "Project overview",
      width: 1200,
      height: 798,
    },
    gallery: [
      {
        path: "/labs/digital-accessibility-now/screen-1.webp",
        alt: "Digital Accessibility Now — audit dashboard and status breakdown",
        caption: "Audit dashboard and status breakdown",
        width: 1200,
        height: 1213,
      },
      {
        path: "/labs/digital-accessibility-now/screen-2.webp",
        alt: "Digital Accessibility Now — new audit setup and content details",
        caption: "New audit setup and content details",
        width: 1200,
        height: 1226,
      },
      {
        path: "/labs/digital-accessibility-now/screen-3.webp",
        alt: "Digital Accessibility Now — audit records and review status",
        caption: "Audit records and review status",
        width: 1200,
        height: 913,
      },
      {
        path: "/labs/digital-accessibility-now/screen-6.webp",
        alt: "Digital Accessibility Now — plain-language accessibility glossary",
        caption: "Plain-language accessibility glossary",
        width: 1200,
        height: 2739,
      },
    ],
  },
  {
    slug: "resilience-check-in",
    title: "Resilience Check-in",
    status: "Beta",
    category: "Wellbeing · Guided reflection",
    description:
      "A short check-in that connects a snapshot of personal resilience to focused guidance and small next steps.",
    icon: "heart",
    theme: "lilac",
    stack: ["Claude Code", "Netlify", "Knowledge base"],
    sections: [
      {
        heading: "Make the next step easier to find.",
        paragraphs: [
          "There is plenty of advice about resilience. This project explores a smaller question: how can a short reflection help someone find guidance that feels relevant to their situation?",
          "A training-needs-analysis approach shapes the questions and connects responses to a custom knowledge base. The aim is a focused route to useful resources, with a manageable action to take away.",
        ],
      },
      {
        heading: "A snapshot, then a useful action.",
        paragraphs: [
          "The experience uses five short questions before presenting a result, focus areas and suggested actions. A result card can be downloaded, and the underlying answers can be exported as JSON in the original tool.",
          "Sharing options include Teams, LinkedIn and email. The design explores how a personal reflection might support a conversation with someone else, while leaving the decision to share with the person completing it.",
        ],
      },
      {
        heading: "A working beta for reflection.",
        paragraphs: [
          "The beta demonstrates the question flow, tailored guidance and sharing journey. It is a reflective wellbeing tool, not a medical assessment or a substitute for professional advice.",
          "The project screens show the introduction, a question, the results and the optional sharing controls.",
        ],
      },
    ],
    articles: ["formative-assessment", "feedback-that-improves-learning"],
    hero: {
      path: "/labs/resilience-check-in/hero.webp",
      alt: "Resilience Check-in — project overview",
      caption: "Project overview",
      width: 1200,
      height: 834,
    },
    gallery: [
      {
        path: "/labs/resilience-check-in/screen-1.webp",
        alt: "Resilience Check-in — introduction to the five-question check-in",
        caption: "Introduction to the five-question check-in",
        width: 1200,
        height: 762,
      },
      {
        path: "/labs/resilience-check-in/screen-2.webp",
        alt: "Resilience Check-in — a question with a graded response scale",
        caption: "A question with a graded response scale",
        width: 1200,
        height: 948,
      },
      {
        path: "/labs/resilience-check-in/screen-3.webp",
        alt: "Resilience Check-in — results, focus areas and suggested actions",
        caption: "Results, focus areas and suggested actions",
        width: 1200,
        height: 2722,
      },
      {
        path: "/labs/resilience-check-in/screen-4.webp",
        alt: "Resilience Check-in — downloadable result card and answer export",
        caption: "Downloadable result card and answer export",
        width: 1200,
        height: 1035,
      },
      {
        path: "/labs/resilience-check-in/screen-5.webp",
        alt: "Resilience Check-in — optional sharing routes",
        caption: "Optional sharing routes",
        width: 1200,
        height: 560,
      },
    ],
  },
  {
    slug: "the-journey",
    title: "The Journey",
    status: "Alpha",
    category: "Storytelling · Branching experience",
    description:
      "A game-like branching experience exploring migration through narrative choices, generated video and voice.",
    icon: "play",
    theme: "sand",
    stack: ["Articulate Storyline", "Google Veo", "ElevenLabs", "Unsplash"],
    sections: [
      {
        heading: "Let the story carry the learning.",
        paragraphs: [
          "The Journey explores how a difficult theme can be approached through a user-led story. Rather than opening with a conventional lesson structure, it uses a game-like presentation to invite the learner into a situation and its decisions.",
          "The subject is migration. Choices shape the route through the narrative, creating space to consider constraints, consequences and perspectives beyond the first response.",
        ],
      },
      {
        heading: "Build a consistent world around the choice.",
        paragraphs: [
          "Articulate Storyline provides the branching structure. Google Veo video and ElevenLabs voice support a stark, immersive visual direction, with a consistent interface across the story.",
          "The production explores how generated media can support continuity between branches. Voice and visual storytelling are planned together; the choice of generated media alone does not establish that an experience is accessible.",
        ],
      },
      {
        heading: "A working storytelling alpha.",
        paragraphs: [
          "The alpha combines branching logic, generated video and voice in a playable narrative build. It is an exploration of the approach, rather than a claim that a short simulation represents the full complexity of migration.",
          "The gallery follows the opening, guidance, narrative setup, a decision and an outcome, with a view of the branching production workflow.",
        ],
      },
    ],
    articles: ["write-better-learning-scenarios", "elearning-storyboarding"],
    hero: {
      path: "/labs/the-journey/hero.webp",
      alt: "The Journey — project overview",
      caption: "Project overview",
      width: 1200,
      height: 797,
    },
    gallery: [
      {
        path: "/labs/the-journey/screen-1.webp",
        alt: "The Journey — opening screen and entry to the experience",
        caption: "Opening screen and entry to the experience",
        width: 1200,
        height: 673,
      },
      {
        path: "/labs/the-journey/screen-2.webp",
        alt: "The Journey — guidance for navigating the story",
        caption: "Guidance for navigating the story",
        width: 1200,
        height: 666,
      },
      {
        path: "/labs/the-journey/screen-3.webp",
        alt: "The Journey — narrative setup and changing circumstances",
        caption: "Narrative setup and changing circumstances",
        width: 1200,
        height: 673,
      },
      {
        path: "/labs/the-journey/screen-4.webp",
        alt: "The Journey — a decision within the branching narrative",
        caption: "A decision within the branching narrative",
        width: 1200,
        height: 668,
      },
      {
        path: "/labs/the-journey/screen-5.webp",
        alt: "The Journey — an outcome shaped by the route taken",
        caption: "An outcome shaped by the route taken",
        width: 1200,
        height: 673,
      },
      {
        path: "/labs/the-journey/screen-6.webp",
        alt: "The Journey — branching production workflow in storyline",
        caption: "Branching production workflow in Storyline",
        width: 1200,
        height: 2327,
      },
    ],
  },
  {
    slug: "shredmap",
    title: "ShredMap",
    status: "Alpha",
    category: "Community · Mobile mapping",
    description:
      "A community-built map of skateparks and spots, connecting discovery and routing with contribution, verification and recognition.",
    icon: "spark",
    theme: "ink",
    stack: ["TypeScript", "Emergent", "GitHub", "Supabase", "Mapbox"],
    sections: [
      {
        heading: "Let the community build the map.",
        paragraphs: [
          "Skaters already share knowledge about places to ride. ShredMap explores how that contribution can become the foundation of a mobile product, with people adding, verifying and discussing spots.",
          "The idea draws on activity-based communities: the map is something people improve together, rather than a fixed directory they only search.",
        ],
      },
      {
        heading: "Connect discovery to contribution.",
        paragraphs: [
          "The build layers check-ins, comments, verification, badges and a global leaderboard over a spot database. Points recognise contributions, while community validation helps surface useful information.",
          "Mapbox supports location and routing features, including exploration of skate-friendly routes. Spot details bring obstacles, images and location information together so a user can decide where to go next.",
        ],
      },
      {
        heading: "Core features before launch.",
        paragraphs: [
          "The alpha is pre-launch, with contribution, verification, leaderboard and routing features built. The product work explores the relationship between useful community actions and the recognition attached to them.",
          "The gallery shows spot discovery, adding a location, community rankings and the profile and badge system.",
        ],
      },
    ],
    articles: ["microlearning-design", "learning-analytics"],
    hero: {
      path: "/labs/shredmap/hero.webp",
      alt: "ShredMap — project overview",
      caption: "Project overview",
      width: 1400,
      height: 1050,
    },
    gallery: [
      {
        path: "/labs/shredmap/screen-1.webp",
        alt: "ShredMap — location and obstacle details for a contributed spot",
        caption: "Location and obstacle details for a contributed spot",
        width: 1200,
        height: 2295,
      },
      {
        path: "/labs/shredmap/screen-2.webp",
        alt: "ShredMap — spot information and community activity",
        caption: "Spot information and community activity",
        width: 1200,
        height: 2404,
      },
      {
        path: "/labs/shredmap/screen-3.webp",
        alt: "ShredMap — community leaderboard and contribution points",
        caption: "Community leaderboard and contribution points",
        width: 1200,
        height: 2268,
      },
      {
        path: "/labs/shredmap/screen-4.webp",
        alt: "ShredMap — skatepark discovery and location details",
        caption: "Skatepark discovery and location details",
        width: 1200,
        height: 2454,
      },
      {
        path: "/labs/shredmap/screen-5.webp",
        alt: "ShredMap — adding a photo and a new spot",
        caption: "Adding a photo and a new spot",
        width: 1200,
        height: 2283,
      },
      {
        path: "/labs/shredmap/screen-6.webp",
        alt: "ShredMap — profile, account controls and local context",
        caption: "Profile, account controls and local context",
        width: 1200,
        height: 2325,
      },
      {
        path: "/labs/shredmap/screen-7.webp",
        alt: "ShredMap — a spot with check-ins and verification activity",
        caption: "A spot with check-ins and verification activity",
        width: 1200,
        height: 2408,
      },
      {
        path: "/labs/shredmap/screen-8.webp",
        alt: "ShredMap — contribution totals and earned badges",
        caption: "Contribution totals and earned badges",
        width: 1200,
        height: 2291,
      },
    ],
  },
  {
    slug: "eventhub",
    title: "EventHub",
    status: "Alpha",
    category: "Live learning · Event management",
    description:
      "A training-management prototype connecting event discovery, booking, delivery, attendance and follow-up around live learning.",
    icon: "idea",
    theme: "mint",
    stack: [
      "Next.js",
      "React",
      "SQLite",
      "JWT",
      "Nodemailer",
      "Microsoft Teams",
      "Microsoft Forms",
    ],
    sections: [
      {
        heading: "Give an event a complete journey.",
        paragraphs: [
          "A course platform does not always cover the operational work around live training. EventHub explores a dedicated layer for masterclasses: finding an event, reserving a place, preparing delivery and following up afterwards.",
          "The project responds to a gap in a Moodle-based workflow, with the intention of connecting live-event activity and outcomes back to the wider learning system.",
        ],
      },
      {
        heading: "Three roles, one connected workflow.",
        paragraphs: [
          "Learners, instructors and administrators receive views relevant to their tasks. A skills model, availability calendar and rule-based communications connect those views behind the scenes.",
          "The prototype uses Microsoft Teams for session delivery and Microsoft Forms for feedback. Booking messages, attendance records and administrative controls are treated as parts of the same service journey.",
        ],
      },
      {
        heading: "A functional prototype in development.",
        paragraphs: [
          "Core booking, communications and administrative flows are functional while development continues. The alpha explores how consistent rules can reduce manual coordination without hiding the state of a booking from the people involved.",
          "The screens show event discovery, session details, registration and the supporting administration and communication workflows.",
        ],
      },
    ],
    articles: ["blended-learning-design", "choosing-lms"],
    hero: {
      path: "/labs/eventhub/screen-2.webp",
      alt: "EventHub — session details and instructor information",
      caption: "Session details and instructor information",
      width: 1200,
      height: 1070,
    },
    gallery: [
      {
        path: "/labs/eventhub/screen-1.webp",
        alt: "EventHub — browse the live-event catalogue",
        caption: "Browse the live-event catalogue",
        width: 1200,
        height: 907,
      },
      {
        path: "/labs/eventhub/screen-2.webp",
        alt: "EventHub — session details and instructor information",
        caption: "Session details and instructor information",
        width: 1200,
        height: 1070,
      },
      {
        path: "/labs/eventhub/screen-3.webp",
        alt: "EventHub — event editing and classification",
        caption: "Event editing and classification",
        width: 1200,
        height: 648,
      },
      {
        path: "/labs/eventhub/screen-4.webp",
        alt: "EventHub — attendance register and participation status",
        caption: "Attendance register and participation status",
        width: 1200,
        height: 374,
      },
      {
        path: "/labs/eventhub/screen-5.webp",
        alt: "EventHub — booking form and accessibility requirements",
        caption: "Booking form and accessibility requirements",
        width: 1200,
        height: 1071,
      },
      {
        path: "/labs/eventhub/screen-6.webp",
        alt: "EventHub — session timing and instructor assignment",
        caption: "Session timing and instructor assignment",
        width: 1200,
        height: 1887,
      },
      {
        path: "/labs/eventhub/screen-7.webp",
        alt: "EventHub — instructor availability and delivery skills",
        caption: "Instructor availability and delivery skills",
        width: 1200,
        height: 1518,
      },
      {
        path: "/labs/eventhub/screen-8.webp",
        alt: "EventHub — automated message template editing",
        caption: "Automated message template editing",
        width: 1200,
        height: 1418,
      },
      {
        path: "/labs/eventhub/screen-9.webp",
        alt: "EventHub — communication rules and message templates",
        caption: "Communication rules and message templates",
        width: 1200,
        height: 361,
      },
      {
        path: "/labs/eventhub/screen-10.webp",
        alt: "EventHub — delivery history for event communications",
        caption: "Delivery history for event communications",
        width: 1200,
        height: 388,
      },
    ],
  },
];
