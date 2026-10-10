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
  // Add real course screenshot paths here when they're available.
  images?: [string, string, string];
};

export const courseScreens = ["Welcome", "Explore", "Take away"] as const;

export const coursePreviews: Record<string, CoursePreview> = {
  onboarding: {
    interaction: "journey",
    illustration: "butter",
    welcome: "Your first day. Your way.",
    introduction:
      "A friendly face, a clear next step, and a little room to find your feet.",
    exploration: "Find your people.",
    hotspots: [
      {
        label: "Your buddy",
        heading: "Someone in your corner.",
        detail:
          "Your buddy can help with the small questions. Say hello and ask what they wish they'd known on day one.",
      },
      {
        label: "Your team",
        heading: "Get to know the humans.",
        detail:
          "Find out what your team is working on, how they stay in touch, and where you can join your first conversation.",
      },
      {
        label: "Your next step",
        heading: "Start small. Feel ready.",
        detail:
          "Choose one useful action for today. A first step is more helpful than trying to learn everything at once.",
      },
    ],
    cards: [
      {
        question: "Who could you ask?",
        answer:
          "Start with your buddy. One conversation can make a new place feel a little more familiar.",
      },
      {
        question: "What matters today?",
        answer:
          "Find the one thing that will help you feel safe, supported, and ready to begin.",
      },
      {
        question: "What's your small step?",
        answer:
          "Put one introduction in your calendar. You don't need to know everything to get started.",
      },
    ],
  },
  leadership: {
    interaction: "conversation",
    illustration: "heart",
    welcome: "Lead with a little heart.",
    introduction:
      "Good conversations begin with curiosity. Let's make some space for it.",
    exploration: "A better conversation.",
    hotspots: [
      {
        label: "Listen",
        heading: "Leave room for the answer.",
        detail:
          "Put the distractions away. Give your teammate space to explain before you decide what the problem is.",
      },
      {
        label: "Ask",
        heading: "Curiosity opens doors.",
        detail:
          "Try an open question: 'What's been getting in the way?' Follow their answer with another thoughtful question.",
      },
      {
        label: "Agree",
        heading: "Find the next step together.",
        detail:
          "Agree one practical action and the support it needs. Make it clear when you'll check in again.",
      },
    ],
    cards: [
      {
        question: "What would listening look like?",
        answer:
          "Put your assumptions on pause. Let the other person finish, then check what you've understood.",
      },
      {
        question: "Which question would you try?",
        answer:
          "'What would help you move forward?' is a useful invitation to think together.",
      },
      {
        question: "How will you follow through?",
        answer:
          "Agree a small action, name the support, and make time to check back in.",
      },
    ],
  },
  wellbeing: {
    interaction: "reflection",
    illustration: "cloud",
    welcome: "A little room to breathe.",
    introduction:
      "You don't need to fill every minute. Take a moment to notice what you need.",
    exploration: "Make space for yourself.",
    hotspots: [
      {
        label: "Notice",
        heading: "How are you arriving?",
        detail:
          "Check in with your energy and attention. There's no right answer; noticing is a useful start.",
      },
      {
        label: "Pause",
        heading: "A small change of pace.",
        detail:
          "If it feels comfortable, step away from your screen or stretch. Pick a pause that suits you.",
      },
      {
        label: "Choose",
        heading: "Something manageable.",
        detail:
          "Choose one helpful adjustment for your next hour, such as a break between meetings or a clear finishing time.",
      },
    ],
    cards: [
      {
        question: "What do you notice?",
        answer:
          "Name what you're feeling without judging it. Awareness gives you a place to begin.",
      },
      {
        question: "What could a pause be?",
        answer:
          "A stretch, a drink of water, or a moment away from the screen. Keep it simple and comfortable.",
      },
      {
        question: "What will you make room for?",
        answer:
          "Choose one small adjustment that fits your day. You can return to it when things get busy.",
      },
    ],
  },
  compliance: {
    interaction: "quiz",
    correctChoice: 1,
    illustration: "shield",
    welcome: "Good judgement. Practised.",
    introduction:
      "Real life has grey areas. Here's a safe place to think through your next move.",
    exploration: "Look a little closer.",
    hotspots: [
      {
        label: "Notice",
        heading: "Spot the concern.",
        detail:
          "An expensive gift just before a decision can create a conflict of interest. Timing matters as much as intention.",
      },
      {
        label: "Check",
        heading: "Find the right guidance.",
        detail:
          "Check your organisation's gifts and hospitality policy. If you're unsure, ask the person responsible for ethics or compliance.",
      },
      {
        label: "Speak up",
        heading: "Make it transparent.",
        detail:
          "Declare the offer through the right process. Asking for help protects you and the fairness of the decision.",
      },
    ],
    cards: [
      {
        question: "What gives you pause?",
        answer:
          "Notice the timing, value, and relationship. A concern can matter even without bad intentions.",
      },
      {
        question: "Where would you look?",
        answer:
          "Use your organisation's policy and guidance. You don't have to make a difficult call alone.",
      },
      {
        question: "Who could help?",
        answer:
          "Talk to your manager or ethics contact and follow the process for declaring the offer.",
      },
    ],
  },
  sustainability: {
    interaction: "sequence",
    illustration: "plant",
    welcome: "Small actions. Room to grow.",
    introduction:
      "Connect a big idea to a practical change you can make with your team.",
    exploration: "Grow a useful habit.",
    hotspots: [
      {
        label: "Understand",
        heading: "Start with what you use.",
        detail:
          "Look at the items your team already has, how often they're used, and what gets thrown away. Notice before you replace.",
      },
      {
        label: "Try",
        heading: "One change worth testing.",
        detail:
          "Choose a practical change together, such as reusing event materials or making the ordering process more deliberate.",
      },
      {
        label: "Learn",
        heading: "See what changes.",
        detail:
          "Review what happened after the next event. Keep what helped and adapt what didn't before making a bigger commitment.",
      },
    ],
    cards: [
      {
        question: "What could you understand?",
        answer:
          "Find out what your team uses and wastes. The best first question is often a practical one.",
      },
      {
        question: "What could you test?",
        answer:
          "Agree a small change with the people who do the work. Make it easy to try and observe.",
      },
      {
        question: "What would you learn?",
        answer:
          "Look at what changed, including the things that surprised you. Build your next step from that.",
      },
    ],
  },
  "product-skills": {
    interaction: "hotspots",
    illustration: "idea",
    welcome: "Know it. Put it to work.",
    introduction:
      "Turn a product detail into a helpful conversation. Start with the person in front of you.",
    exploration: "Connect the dots.",
    hotspots: [
      {
        label: "The need",
        heading: "Ask before you recommend.",
        detail:
          "Find out what the customer is trying to do, what they've already tried, and what a good outcome would look like.",
      },
      {
        label: "The feature",
        heading: "Choose what's relevant.",
        detail:
          "Pick one feature that connects to the customer's goal. Explain it in plain language rather than listing everything.",
      },
      {
        label: "The benefit",
        heading: "Make the connection clear.",
        detail:
          "Explain how that feature helps with their situation, then check whether the recommendation feels useful to them.",
      },
    ],
    cards: [
      {
        question: "What would you ask first?",
        answer:
          "'What are you hoping to achieve?' gives you a need to connect your knowledge to.",
      },
      {
        question: "Which detail would you choose?",
        answer:
          "Pick a feature that matters to that goal. A relevant detail beats a long catalogue.",
      },
      {
        question: "How would you explain it?",
        answer:
          "Connect the feature to a useful outcome in everyday words, then invite a question.",
      },
    ],
  },
};
