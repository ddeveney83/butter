export const workFilters = [
  "All work",
  "Digital learning",
  "Storytelling",
  "Microlearning",
] as const;
export type WorkFilter = (typeof workFilters)[number];

export type Project = {
  id: string;
  title: string;
  category: string;
  filter: WorkFilter;
  theme: string;
  intro: string;
  description: string;
  deliverables: string[];
  approach: string;
  outcome: string;
  scenario: string;
  choices: { label: string; feedback: string }[];
};

export const projects: Project[] = [
  {
    id: "onboarding",
    title: "A fresh start.",
    category: "Onboarding · Digital learning",
    filter: "Digital learning",
    theme: "yellow",
    intro: "First days should feel like possibility.",
    description:
      "An onboarding concept that replaces the information avalanche with a welcoming, bite-sized journey. A clear path, useful conversations, and little wins make room for confidence.",
    deliverables: [
      "Learning strategy",
      "Experience design",
      "Interactive eLearning",
    ],
    approach:
      "A choose-your-own first week, with practical moments to explore, a friendly guide, and one useful action at the end of every chapter. The learner sets the pace.",
    outcome:
      "Help new starters feel at home before they need to know everything.",
    scenario:
      "It’s your first morning. Your calendar is full and you’re not sure what comes first. What would help most?",
    choices: [
      {
        label: "Read every policy straight away",
        feedback:
          "There’s a time for the detail. On day one, start with what you need to feel safe, supported, and ready to take a small step.",
      },
      {
        label: "Meet my buddy and find one useful next step",
        feedback:
          "A human connection and a clear next step can turn an overwhelming first morning into a good beginning.",
      },
      {
        label: "Keep quiet until I figure everything out",
        feedback:
          "You don’t have to know it all. Asking a question is part of learning, and your buddy is there to help.",
      },
    ],
  },
  {
    id: "leadership",
    title: "People, not processes.",
    category: "Leadership · Interactive storytelling",
    filter: "Storytelling",
    theme: "lilac",
    intro: "Good leadership starts with being human.",
    description:
      "A scenario-led leadership concept about the moments that matter. Learners explore everyday conversations, try a response, and see the story unfold, with room to reflect and try again.",
    deliverables: [
      "Creative direction",
      "Branching scenarios",
      "Motion & illustration",
    ],
    approach:
      "Short, believable conversations put the learner in the room. Choices lead to thoughtful feedback, not a red cross. Reflection connects each story to tomorrow’s real conversation.",
    outcome: "Turn abstract leadership principles into everyday actions.",
    scenario:
      "A teammate has missed a deadline and seems unusually quiet. How do you start the conversation?",
    choices: [
      {
        label: "“Tell me what’s been happening.”",
        feedback:
          "An open question creates space to understand the situation. Listen first, then agree a practical next step together.",
      },
      {
        label: "“We can’t have this happen again.”",
        feedback:
          "Expectations matter, but leading with a warning can close the conversation before you understand what’s getting in the way.",
      },
      {
        label: "Say nothing and move the work to someone else",
        feedback:
          "That might solve today’s deadline, but it leaves your teammate without support or a chance to learn. Start with a conversation.",
      },
    ],
  },
  {
    id: "wellbeing",
    title: "Room to breathe.",
    category: "Wellbeing · Microlearning",
    filter: "Microlearning",
    theme: "mint",
    intro: "Small pauses. A little more perspective.",
    description:
      "A workplace wellbeing concept that makes space for everyday reflection. Short prompts help people notice their habits and choose a manageable action, without adding another task to a busy day.",
    deliverables: ["Microlearning", "Mobile-first design", "Illustration"],
    approach:
      "A calm, phone-friendly experience with a daily check-in, a moment to pause, and a small action to take away. Simple language keeps the experience approachable.",
    outcome: "Make a little room for healthier working habits.",
    scenario:
      "You’ve been moving between meetings all morning and have ten minutes before the next one. What could you try?",
    choices: [
      {
        label: "Squeeze in another ten minutes of emails",
        feedback:
          "It’s tempting to fill every gap. Notice how you feel first; a short break might help you return with a little more clarity.",
      },
      {
        label: "Step away, stretch, and check in with myself",
        feedback:
          "A brief change of pace can help you notice what you need. Choose a pause that works for you and your situation.",
      },
      {
        label: "Wait until the weekend to take a break",
        feedback:
          "Rest doesn’t have to be all or nothing. A small pause today is a useful place to start.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Do the right thing.",
    category: "Ethics · Interactive storytelling",
    filter: "Storytelling",
    theme: "ink",
    intro: "Less box-ticking. More good judgement.",
    description:
      "An ethics learning concept that trades dense policy slides for relatable dilemmas. Learners practise noticing a concern, weighing up their options, and knowing where to ask for help.",
    deliverables: [
      "Scenario writing",
      "Interactive eLearning",
      "Learning design",
    ],
    approach:
      "The story starts with a believable grey area. Learners make a choice, explore the consequences, and find the relevant guidance at the moment it becomes useful.",
    outcome: "Give people a safe place to practise difficult decisions.",
    scenario:
      "A supplier offers you an expensive gift just before a contract decision. What’s your next move?",
    choices: [
      {
        label: "Accept it; it’s just a friendly gesture",
        feedback:
          "Timing and value can create a conflict of interest, even when the gesture seems friendly. Check your organisation’s gifts policy before accepting.",
      },
      {
        label: "Check the policy and speak to the right person",
        feedback:
          "Good judgement includes asking for guidance. Be transparent and follow your organisation’s process for gifts and conflicts of interest.",
      },
      {
        label: "Accept it, but don’t tell anyone",
        feedback:
          "Keeping it quiet increases the concern. Transparency protects you and the decision-making process.",
      },
    ],
  },
  {
    id: "sustainability",
    title: "Little by little.",
    category: "Sustainability · Digital learning",
    filter: "Digital learning",
    theme: "garden",
    intro: "Big ideas grow from everyday actions.",
    description:
      "A sustainability learning concept that connects a big topic to the everyday workplace. Learners explore where they can make a practical difference, then choose an action to try with their team.",
    deliverables: [
      "Learning strategy",
      "Digital experience",
      "Visual storytelling",
    ],
    approach:
      "An illustrated world makes the topic tangible. Short explorations connect personal choices, team habits, and organisational decisions without claiming that one small action solves everything.",
    outcome: "Help teams turn awareness into a useful next step.",
    scenario:
      "Your team wants to make its events less wasteful. Where could you begin?",
    choices: [
      {
        label: "Replace every item immediately",
        feedback:
          "Start by understanding what is used and wasted. Keeping useful items in service can be better than buying a whole new set.",
      },
      {
        label: "Review what we use and agree one change to test",
        feedback:
          "A simple review helps you choose an action that fits. Try it, observe what changes, and build from what you learn.",
      },
      {
        label: "Leave it to someone else",
        feedback:
          "You don’t need all the answers to start a conversation. Bring a practical question to the team and find the right people to help.",
      },
    ],
  },
  {
    id: "product-skills",
    title: "Know it. Show it.",
    category: "Product confidence · Microlearning",
    filter: "Microlearning",
    theme: "peach",
    intro: "Knowledge feels better when you can use it.",
    description:
      "A product learning concept designed around customer needs. Quick, focused practice helps a team translate product details into useful conversations, without memorising a catalogue.",
    deliverables: ["Content strategy", "Practice activities", "Microlearning"],
    approach:
      "A set of short challenges connects one product feature to one real customer need. Learners try a conversation, get specific feedback, and take a prompt into their next interaction.",
    outcome:
      "Build the confidence to explain, listen, and recommend thoughtfully.",
    scenario:
      "A customer asks which option is right for them. How do you begin?",
    choices: [
      {
        label: "List all the technical specifications",
        feedback:
          "Details become useful when they connect to a need. Start by learning what the customer wants to do.",
      },
      {
        label: "Ask what they’re trying to achieve",
        feedback:
          "A good question turns product knowledge into helpful advice. Connect your recommendation to the goal they share.",
      },
      {
        label: "Recommend the most expensive option",
        feedback:
          "Price alone doesn’t tell you what fits. Understand the need first, then explain a relevant option clearly.",
      },
    ],
  },
];
