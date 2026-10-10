import media from "./projectMedia.json" with { type: "json" };

export const workFilters = ["All work", "eLearning", "LMS"] as const;
export type WorkFilter = (typeof workFilters)[number];
export type Project = {
  id: string;
  title: string;
  category: string;
  filter: WorkFilter;
  theme: string;
  client: string;
  year: string;
  role: string;
  intro: string;
  description: string;
  deliverables: string[];
  approach: string;
  outcome: string;
  metric: { value: string; label: string };
  source: string;
  hero: { path: string; alt: string; source: string };
  gallery: { path: string; alt: string; source: string }[];
  videoIds: string[];
  scenario: string;
  choices: { label: string; feedback: string }[];
};
type ProjectContent = Omit<Project, "source" | "hero" | "gallery" | "videoIds">;
const content: ProjectContent[] = [
  {
    id: "allergen-awareness",
    title: "Allergen Awareness",
    category: "eLearning · Food safety",
    filter: "eLearning",
    theme: "yellow",
    client: "Places Leisure",
    year: "2025",
    role: "Learning Experience Designer",
    intro: "Small decisions. Serious care.",
    description:
      "A five-part digital learning programme helping leisure teams make safer food-service decisions. Built for franchised outlets, with consistent guidance on allergen handling and Natasha’s Law.",
    deliverables: [
      "Scenario design",
      "AI-presented video",
      "Interactive assessment",
    ],
    approach:
      "Realistic decisions and gamified checks put the learner behind the counter. An AI-presented guide supports the journey, with the final assessment unlocked after the modules. Food safety and legal specialists shaped the content, and early regulator consultation supported Local Authority endorsement.",
    outcome:
      "The source case study reports a 40% improvement in allergen audit results within six months, with 92% of learners passing on their first attempt.",
    metric: { value: "40%", label: "Improvement in allergen audit results" },
    scenario:
      "A customer asks whether a sandwich contains sesame. You’re unsure. What comes next?",
    choices: [
      {
        label: "Guess from the ingredients you can see",
        feedback:
          "Appearance cannot confirm allergens. Use verified ingredient information and the outlet’s food safety process.",
      },
      {
        label: "Check the allergen information before serving",
        feedback:
          "Check the verified information and follow the outlet’s process. If you cannot confirm it, explain that clearly and seek guidance.",
      },
      {
        label: "Remove the seeds and serve it",
        feedback:
          "Removing a visible ingredient does not remove the risk. Follow the food safety process and never guess.",
      },
    ],
  },
  {
    id: "matrix-reloaded",
    title: "Matrix Reloaded",
    category: "Blended learning · Leadership",
    filter: "eLearning",
    theme: "lilac",
    client: "Places for People",
    year: "2024",
    role: "Learning Experience Designer",
    intro: "Less silo thinking. More shared possibility.",
    description:
      "A six-month leadership programme supporting a move to matrix working. Self-paced online modules, virtual sessions and workplace practice helped leaders navigate influence, ambiguity and shared accountability.",
    deliverables: ["Digital modules", "Virtual learning", "Social learning"],
    approach:
      "Bite-sized concepts lead into practical conversations and on-the-job exercises. Microsoft Teams communities made space for peer learning, while surveys and focus groups informed refinements throughout the programme.",
    outcome:
      "The source reports 91% programme completion across leadership tiers, with 74% of leaders feeling more confident about matrix working.",
    metric: { value: "91%", label: "Programme completion rate" },
    scenario:
      "Two teams need the same colleague for urgent work. How would you open the conversation?",
    choices: [
      {
        label: "Insist that your team’s deadline wins",
        feedback:
          "Competing priorities need shared context. Explain the impact and explore the wider goal together.",
      },
      {
        label: "Agree the shared goal and discuss the trade-offs",
        feedback:
          "Shared context helps teams make a clear decision. Agree priorities, responsibilities and a time to review progress.",
      },
      {
        label: "Leave your colleague to decide alone",
        feedback:
          "Support the conversation. Clear shared accountability helps your colleague avoid conflicting expectations.",
      },
    ],
  },
  {
    id: "alcohol-and-drug-awareness",
    title: "Alcohol & Drug Awareness",
    category: "eLearning · Reflective microlearning",
    filter: "eLearning",
    theme: "mint",
    client: "Places for People",
    year: "2025",
    role: "Learning Experience Designer",
    intro: "A sensitive subject. A thoughtful approach.",
    description:
      "An outdated compliance course rebuilt as a focused, under-15-minute experience. Workplace video scenarios, knowledge checks and optional anonymous reflection made the topic more approachable for a busy workforce.",
    deliverables: ["Microlearning", "Scenario video", "Reflection prompts"],
    approach:
      "Relatable situations came before policy and theory. SCORM data tracked completion, while anonymous Microsoft Forms feedback offered a safer space for peer reflection and a qualitative view of awareness change.",
    outcome:
      "The source reports 93% course completion and more than 17,000 employees engaging with the social learning component.",
    metric: { value: "93%", label: "Course completion rate" },
    scenario:
      "You’re concerned that a colleague may not be safe to work. What could help?",
    choices: [
      {
        label: "Discuss your suspicions with the whole team",
        feedback:
          "Respect privacy. Use the appropriate safety and support process rather than spreading assumptions.",
      },
      {
        label: "Follow the workplace safety and support process",
        feedback:
          "Prioritise safety and follow your organisation’s process. Seek support from the appropriate person without diagnosing the situation yourself.",
      },
      {
        label: "Ignore it until next week",
        feedback:
          "A current safety concern needs a timely response through the appropriate workplace process.",
      },
    ],
  },
  {
    id: "record-keeping",
    title: "Record Keeping & Information Management",
    category: "eLearning · Applied practice",
    filter: "eLearning",
    theme: "peach",
    client: "Places for People",
    year: "2023",
    role: "Learning Experience Designer",
    intro: "Good records make room for better decisions.",
    description:
      "A modular learning experience responding to gaps identified by the Housing Ombudsman. Digital record management, retention and data protection became practical skills to apply in everyday housing work.",
    deliverables: [
      "Learning design",
      "Branching simulations",
      "Accessible multimedia",
    ],
    approach:
      "Simulations and knowledge checks connected policy to real documentation tasks. Video, animation and infographics supported the learning, with SME input, WCAG-led design and LMS reporting built into delivery.",
    outcome:
      "Post-launch audits reported 52% fewer record-keeping errors. The source also reports an 88% first-attempt assessment pass rate.",
    metric: { value: "52%", label: "Reduction in record-keeping errors" },
    scenario:
      "You’ve finished a customer call. How should you record what happened?",
    choices: [
      {
        label: "Add your assumptions about the customer",
        feedback:
          "Keep the record factual, relevant and proportionate. Distinguish what was said from your interpretation.",
      },
      {
        label: "Record the facts and agreed next action",
        feedback:
          "A clear, accurate record makes the next step easier. Follow the organisation’s information management and retention guidance.",
      },
      {
        label: "Save the details on a personal device",
        feedback:
          "Use the approved system and protect personal information. A private copy can create access and security problems.",
      },
    ],
  },
  {
    id: "15-minute-compliance",
    title: "15-Minute Compliance",
    category: "eLearning · Microlearning",
    filter: "eLearning",
    theme: "garden",
    client: "Places for People",
    year: "2022–2023",
    role: "Project Lead",
    intro: "The useful bits. In a little less time.",
    description:
      "A redesign of 62 compliance courses into focused 15-minute modules. Each experience centred on one clear learning objective, replacing lengthy training with practical, active learning.",
    deliverables: ["Curriculum redesign", "Articulate 360", "Vyond animation"],
    approach:
      "The business case came first. Essential content was prioritised with subject matter experts, then brought to life through short animations, scenarios and simulations. Completion data, quiz results and feedback shaped improvements after launch.",
    outcome:
      "The source reports 9.91 hours saved per employee and an estimated £5.5 million saving over six years. The financial figure is a projection, rather than a realised saving.",
    metric: { value: "9.91 hrs", label: "Training time saved per employee" },
    scenario:
      "Your team wants to make its events less wasteful. Where would you start?",
    choices: [
      {
        label: "Replace everything immediately",
        feedback:
          "Understand what is used and wasted before buying replacements. Keeping useful materials in service can be a better first step.",
      },
      {
        label: "Review current use and test one change",
        feedback:
          "A practical review helps you choose a useful change. Try it, observe the result and build on what you learn.",
      },
      {
        label: "Wait for somebody else to begin",
        feedback:
          "Start a conversation with the people who do the work. A small, informed change is a useful place to begin.",
      },
    ],
  },
  {
    id: "information-security",
    title: "Information Security",
    category: "eLearning · Threat-led scenarios",
    filter: "eLearning",
    theme: "ink",
    client: "Places for People",
    year: "2025",
    role: "Learning Experience Designer",
    intro: "Real threats. Better instincts.",
    description:
      "A rebuilt security pathway grounded in actual phishing emails, a vishing call scenario and a colleague’s experience. Six short modules made security feel relevant to the next message in a learner’s inbox.",
    deliverables: [
      "Threat-led design",
      "Gamified pathway",
      "Multimodal content",
    ],
    approach:
      "Points, badges and visible progress kept the journey moving. Authentic assets supported decisions and human testimony made the consequences tangible. Transcripts, text equivalents, user testing and SCORM checks supported an accessible deployment.",
    outcome:
      "The source reports a 16% increase in security incident reporting, alongside improved completion and a 4.6-star satisfaction rating.",
    metric: { value: "16%", label: "Increase in security incident reporting" },
    scenario:
      "An urgent email asks you to sign in through an unfamiliar link. What would you do?",
    choices: [
      {
        label: "Click before the deadline expires",
        feedback:
          "Urgency can be used to rush a decision. Pause and verify the request through a trusted channel.",
      },
      {
        label: "Verify the request and follow the reporting process",
        feedback:
          "Use a trusted channel to check the request and your organisation’s process to report suspicious messages.",
      },
      {
        label: "Forward the link to everyone",
        feedback:
          "Avoid spreading a suspicious link. Report it through the appropriate security channel.",
      },
    ],
  },
  {
    id: "your-learning-platform",
    title: "Your Learning Platform",
    category: "LMS · Cornerstone",
    filter: "LMS",
    theme: "yellow",
    client: "British Red Cross",
    year: "2024",
    role: "Senior Digital Learning Advisor",
    intro: "One place. A world of learning.",
    description:
      "An enterprise migration from Fuse to Cornerstone Learning for 25,000 staff and volunteers. Fourteen separate business areas became one secure, responsive learning experience.",
    deliverables: [
      "LMS migration",
      "Platform configuration",
      "User acceptance testing",
    ],
    approach:
      "Stakeholder consultations shaped the requirements. A coordinated content migration, role-based access model and cross-department testing supported rollout. Clear governance and documentation helped teams manage the transition.",
    outcome:
      "The source reports 47% less L&D administration time and a 31% increase in mandatory learning completion in the first year after migration.",
    metric: {
      value: "25,000+",
      label: "Staff and volunteers on a unified platform",
    },
    scenario: "",
    choices: [],
  },
  {
    id: "nansen-learning-academy",
    title: "Nansen Learning Academy",
    category: "LMS / LXP · Webflow",
    filter: "LMS",
    theme: "mint",
    client: "Nansen.ai",
    year: "2022",
    role: "End-to-End Development Lead",
    intro: "Complex data. A clearer way in.",
    description:
      "A custom learning experience platform supporting adoption of Nansen’s blockchain analytics product. Foundational, intermediate and advanced tracks helped users build confidence at their own level.",
    deliverables: ["Webflow LXP", "Learning pathways", "Video tutorials"],
    approach:
      "Microlearning tutorials and guides connected product features to analytics workflows. A Discord community supported peer learning, while Google Analytics and Gainsight data informed improvements with a globally distributed team.",
    outcome:
      "The source reports 29% fewer support tickets among academy learners and 64% of new sign-ups completing at least one module within 30 days.",
    metric: {
      value: "29%",
      label: "Fewer support tickets among academy learners",
    },
    scenario: "",
    choices: [],
  },
];
export const projects: Project[] = content.map((project) => ({
  ...project,
  source: `https://danieldeveney.com/work/${project.id}`,
  ...media[project.id as keyof typeof media],
}));
export const projectAliases: Record<string, string> = {
  onboarding: "record-keeping",
  leadership: "matrix-reloaded",
  wellbeing: "alcohol-and-drug-awareness",
  compliance: "allergen-awareness",
  sustainability: "15-minute-compliance",
  "product-skills": "information-security",
};
