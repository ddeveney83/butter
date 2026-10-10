export type CoursePreview = {
  interaction:
    | "journey"
    | "conversation"
    | "reflection"
    | "quiz"
    | "sequence"
    | "hotspots";
  correctChoice?: number;
  illustration: "butter" | "heart" | "cloud" | "shield" | "plant" | "idea";
  welcome: string;
  introduction: string;
  exploration: string;
  hotspots: { label: string; heading: string; detail: string }[];
  cards: { question: string; answer: string }[];
};

export const courseScreens = ["Welcome", "Explore", "Take away"] as const;

export const coursePreviews: Record<string, CoursePreview> = {
  "record-keeping": {
    interaction: "journey",
    illustration: "idea",
    welcome: "Write it clearly. Find it easily.",
    introduction:
      "A record has a journey, from the first conversation to the next useful action.",
    exploration: "Follow the record.",
    hotspots: [
      {
        label: "Capture",
        heading: "Start with the facts.",
        detail:
          "Record what happened, what was agreed and the next action. Keep your language clear and factual.",
      },
      {
        label: "Protect",
        heading: "Use the right home.",
        detail:
          "Use the approved record system. Follow your organisation’s access, data protection and retention guidance.",
      },
      {
        label: "Retrieve",
        heading: "Make the next step easier.",
        detail:
          "A clear record helps colleagues understand the situation and pick up the agreed action.",
      },
    ],
    cards: [
      {
        question: "Start with the facts.",
        answer:
          "Record what happened, what was agreed and the next action. Keep your language clear and factual.",
      },
      {
        question: "Use the right home.",
        answer:
          "Use the approved record system. Follow your organisation’s access, data protection and retention guidance.",
      },
      {
        question: "Make the next step easier.",
        answer:
          "A clear record helps colleagues understand the situation and pick up the agreed action.",
      },
    ],
  },
  "matrix-reloaded": {
    interaction: "conversation",
    illustration: "heart",
    welcome: "Work across. Think together.",
    introduction:
      "Practise a conversation about shared priorities in a matrix organisation.",
    exploration: "Make room for a shared goal.",
    hotspots: [
      {
        label: "Listen",
        heading: "Understand the competing needs.",
        detail:
          "Ask what each team is trying to achieve before deciding which request comes first.",
      },
      {
        label: "Agree",
        heading: "Name the shared outcome.",
        detail:
          "Discuss priorities and trade-offs openly, then agree responsibilities together.",
      },
      {
        label: "Review",
        heading: "Keep accountability visible.",
        detail:
          "Agree when to check back in and how to respond if priorities change.",
      },
    ],
    cards: [
      {
        question: "Understand the competing needs.",
        answer:
          "Ask what each team is trying to achieve before deciding which request comes first.",
      },
      {
        question: "Name the shared outcome.",
        answer:
          "Discuss priorities and trade-offs openly, then agree responsibilities together.",
      },
      {
        question: "Keep accountability visible.",
        answer:
          "Agree when to check back in and how to respond if priorities change.",
      },
    ],
  },
  "alcohol-and-drug-awareness": {
    interaction: "reflection",
    illustration: "cloud",
    welcome: "A little space. A thoughtful response.",
    introduction:
      "Reflect on safety, assumptions and support at work. This sample keeps your note on this page only.",
    exploration: "Pause before you respond.",
    hotspots: [
      {
        label: "Notice",
        heading: "Separate facts from assumptions.",
        detail:
          "Notice the situation without trying to diagnose someone. Respect their privacy.",
      },
      {
        label: "Consider",
        heading: "Think about safety and support.",
        detail:
          "If there is an immediate safety concern, use the appropriate workplace process.",
      },
      {
        label: "Act",
        heading: "Find the appropriate support.",
        detail:
          "Follow your organisation’s guidance and seek help from the appropriate person.",
      },
    ],
    cards: [
      {
        question: "Separate facts from assumptions.",
        answer:
          "Notice the situation without trying to diagnose someone. Respect their privacy.",
      },
      {
        question: "Think about safety and support.",
        answer:
          "If there is an immediate safety concern, use the appropriate workplace process.",
      },
      {
        question: "Find the appropriate support.",
        answer:
          "Follow your organisation’s guidance and seek help from the appropriate person.",
      },
    ],
  },
  "allergen-awareness": {
    interaction: "quiz",
    illustration: "shield",
    welcome: "Care at the counter.",
    introduction:
      "Practise checking before serving. Follow your outlet’s verified allergen guidance.",
    exploration: "Choose a safer response.",
    hotspots: [
      {
        label: "Notice",
        heading: "A question that matters.",
        detail:
          "Take the customer’s question seriously. Appearance cannot confirm an allergen.",
      },
      {
        label: "Check",
        heading: "Verified information first.",
        detail:
          "Check current allergen information and follow the outlet’s food safety procedure.",
      },
      {
        label: "Explain",
        heading: "Be clear about uncertainty.",
        detail:
          "If you cannot confirm the information, say so and seek appropriate guidance.",
      },
    ],
    cards: [
      {
        question: "A question that matters.",
        answer:
          "Take the customer’s question seriously. Appearance cannot confirm an allergen.",
      },
      {
        question: "Verified information first.",
        answer:
          "Check current allergen information and follow the outlet’s food safety procedure.",
      },
      {
        question: "Be clear about uncertainty.",
        answer:
          "If you cannot confirm the information, say so and seek appropriate guidance.",
      },
    ],
    correctChoice: 1,
  },
  "15-minute-compliance": {
    interaction: "sequence",
    illustration: "plant",
    welcome: "Less time. More useful learning.",
    introduction:
      "A small sustainability exercise inspired by the compliance programme’s environmental learning.",
    exploration: "Put a useful habit in order.",
    hotspots: [
      {
        label: "Understand",
        heading: "Start with what you use.",
        detail:
          "Look at the materials your team already uses and what gets wasted. Understand before replacing.",
      },
      {
        label: "Try",
        heading: "Test one practical change.",
        detail:
          "Agree a manageable change, such as reusing event materials, with the people who do the work.",
      },
      {
        label: "Learn",
        heading: "Build on what happens.",
        detail: "Review the result, keep what helped and adjust what did not.",
      },
    ],
    cards: [
      {
        question: "Start with what you use.",
        answer:
          "Look at the materials your team already uses and what gets wasted. Understand before replacing.",
      },
      {
        question: "Test one practical change.",
        answer:
          "Agree a manageable change, such as reusing event materials, with the people who do the work.",
      },
      {
        question: "Build on what happens.",
        answer: "Review the result, keep what helped and adjust what did not.",
      },
    ],
  },
  "information-security": {
    interaction: "hotspots",
    illustration: "shield",
    welcome: "Pause. Check. Protect.",
    introduction: "Inspect three warning signs in a sample suspicious message.",
    exploration: "An urgent message. A closer look.",
    hotspots: [
      {
        label: "The sender",
        heading: "Check who is really asking.",
        detail:
          "An unexpected sender or unusual address is a reason to pause. Verify through a trusted channel.",
      },
      {
        label: "The urgency",
        heading: "Pressure is a warning sign.",
        detail:
          "An urgent deadline can be used to rush a decision. Take time to check the request.",
      },
      {
        label: "The link",
        heading: "Use a route you trust.",
        detail:
          "An unfamiliar sign-in link needs caution. Use a known website and follow the reporting process.",
      },
    ],
    cards: [
      {
        question: "Check who is really asking.",
        answer:
          "An unexpected sender or unusual address is a reason to pause. Verify through a trusted channel.",
      },
      {
        question: "Pressure is a warning sign.",
        answer:
          "An urgent deadline can be used to rush a decision. Take time to check the request.",
      },
      {
        question: "Use a route you trust.",
        answer:
          "An unfamiliar sign-in link needs caution. Use a known website and follow the reporting process.",
      },
    ],
  },
};
