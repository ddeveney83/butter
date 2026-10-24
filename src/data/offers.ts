export type Offer = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  lead: string;
  icon: "idea" | "heart" | "play" | "spark";
  need: string;
  approach: string;
  deliverables: { title: string; copy: string }[];
  project: string;
  articles: string[];
  questions: { title: string; answer: string }[];
};
export const offers: Offer[] = [
  {
    slug: "bespoke-elearning",
    title: "Bespoke eLearning",
    description:
      "Bespoke eLearning design and development for businesses: clear content, realistic practice, accessible interactions and delivery testing with butter.",
    headline: "Bespoke eLearning. Made for real work.",
    lead: "Turn your expertise into digital learning your team can put to use. Written, designed and built around the decisions they need to make.",
    icon: "play",
    need: "Your subject experts know the material. Your learners need a clear route through it. We help turn complex information into a focused experience with useful explanation, realistic practice and feedback.",
    approach:
      "We start with the audience and the task, agree the content and learning approach, then prototype the important interaction. Writing, visual design and development follow a shared direction, with agreed review stages throughout.",
    deliverables: [
      {
        title: "A focused learning plan.",
        copy: "An agreed audience, learning outcomes and content map, with the sources and decisions that need your experts’ input.",
      },
      {
        title: "A course with a purpose.",
        copy: "A storyboard, a visual direction and interactions that support the task. Media and assessment are chosen to fit the brief.",
      },
      {
        title: "A considered handover.",
        copy: "An agreed delivery format, accessibility review and platform testing, plus the files and guidance specified in your proposal.",
      },
    ],
    project: "allergen-awareness",
    articles: ["write-learning-objectives", "elearning-storyboarding"],
    questions: [
      {
        title: "Do we need a finished script?",
        answer:
          "No. Bring the source material you have, your subject experts and the problem you want to solve. We can scope research, content shaping and writing as part of the project.",
      },
      {
        title: "Can the course run on our current learning platform?",
        answer:
          "We can agree HTML or SCORM delivery and test a representative package with your platform. Launch, completion and resume requirements are confirmed during scoping.",
      },
      {
        title: "Can you match our brand?",
        answer:
          "Yes. We can work within an existing identity or develop a learning-specific visual direction. Custom illustration, film and animation are scoped separately where needed.",
      },
    ],
  },
  {
    slug: "staff-onboarding",
    title: "Staff onboarding",
    description:
      "Design practical staff onboarding with butter: role-based digital learning, useful job aids and a connected journey from first day to confident practice.",
    headline: "A better start for your people.",
    lead: "Give new starters a clear path into the work. Practical onboarding that connects the essentials, useful practice and support from their team.",
    icon: "heart",
    need: "A welcome presentation can introduce the organisation. New starters also need to know what to do, where to find help and how to handle the situations their role will bring. We shape the journey around those moments.",
    approach:
      "Together, we separate first-day essentials from what people will need later. Role-based pathways, short activities and job aids give each part a purpose. Manager prompts can connect the digital experience to supported practice at work.",
    deliverables: [
      {
        title: "A clear first route.",
        copy: "An onboarding map that identifies the audience, essential tasks, existing resources and the people who can help.",
      },
      {
        title: "Useful digital moments.",
        copy: "Focused modules, realistic examples and accessible reference material for the moments that new starters need support.",
      },
      {
        title: "A connected handover.",
        copy: "A proposed sequence, manager conversation prompts and agreed completion or feedback checks to support the wider induction.",
      },
    ],
    project: "matrix-reloaded",
    articles: ["blended-learning-design", "spaced-practice"],
    questions: [
      {
        title: "Can different roles follow different routes?",
        answer:
          "Yes. We can map shared essentials and role-specific activities. The number of pathways, content differences and delivery platform affect the scope.",
      },
      {
        title: "Can we keep our existing induction materials?",
        answer:
          "Yes. We review what already works and identify what needs rewriting, connecting or replacing. A focused refresh can be a useful starting point.",
      },
      {
        title: "How will we know whether it helps?",
        answer:
          "We agree useful checks during design. These might include a practice task, manager feedback and completion information, with a clear distinction between attendance and the ability to do the work.",
      },
    ],
  },
  {
    slug: "compliance-training",
    title: "Compliance training",
    description:
      "Create practical compliance training with butter: clear guidance, realistic workplace scenarios, useful assessment and agreed learning-platform reporting.",
    headline: "Important learning. Clear decisions.",
    lead: "Help people use the guidance when it matters. Compliance learning built around realistic situations, clear reasoning and the right route to support.",
    icon: "idea",
    need: "A policy contains the rules. Your team needs to recognise when those rules apply and what to do next. We turn approved guidance into relevant examples and practice, keeping the important distinctions intact.",
    approach:
      "Your policy owners and subject specialists approve the substance. We shape the learning, explore plausible decisions and write feedback that explains the consequences. Completion, assessment and reporting rules are agreed before production.",
    deliverables: [
      {
        title: "Approved content, made usable.",
        copy: "A content map and storyboard based on your current guidance, with a clear review route for subject and policy owners.",
      },
      {
        title: "Practice with context.",
        copy: "Realistic scenarios, knowledge checks and feedback that help learners recognise a situation and choose a responsible action.",
      },
      {
        title: "A planned review cycle.",
        copy: "Agreed delivery and reporting checks, plus a handover identifying the content that will need review when guidance changes.",
      },
    ],
    project: "record-keeping",
    articles: ["write-better-learning-scenarios", "authentic-assessment"],
    questions: [
      {
        title: "Do you provide legal or regulatory advice?",
        answer:
          "We provide learning design and production. Your appointed specialists supply and approve the legal, regulatory and policy guidance. Their review is part of the agreed project plan.",
      },
      {
        title: "Can you work with a sensitive subject?",
        answer:
          "We can plan a calm, respectful approach with your specialists. Scenarios, media, privacy and support routes need careful review, especially where learners might draw on personal experience.",
      },
      {
        title: "Can completion and quiz scores be reported?",
        answer:
          "SCORM delivery can support the agreed completion and score fields on a compatible platform. We confirm the rules and test the reporting with the intended system before launch.",
      },
    ],
  },
  {
    slug: "course-refresh",
    title: "Course refresh",
    description:
      "Refresh existing eLearning with butter: review outdated content, improve accessibility and interactions, and agree a focused update or rebuild plan.",
    headline: "Good content. A fresh start.",
    lead: "Keep what works. Improve what gets in the way. Give an existing course clearer content, a more useful learning journey and a considered visual refresh.",
    icon: "spark",
    need: "Perhaps the content has grown, the guidance has changed or the interface no longer fits your learners’ devices. A refresh starts by identifying the actual problem, so the work focuses on changes that matter.",
    approach:
      "We review a representative section, the source files and the delivery requirements. Together, we decide whether targeted edits, a redesigned activity or a fuller rebuild is the sensible route. That decision comes before a promise to reuse every existing asset.",
    deliverables: [
      {
        title: "A focused review.",
        copy: "A review of the learning goal, current content, interaction and delivery, with a prioritised set of recommendations.",
      },
      {
        title: "A representative update.",
        copy: "An agreed sample or prototype to check the proposed writing, visual direction and interaction before wider changes.",
      },
      {
        title: "An update you can maintain.",
        copy: "The agreed revised content, regression checks and handover, with ownership of future content reviews made clear.",
      },
    ],
    project: "alcohol-and-drug-awareness",
    articles: ["learning-needs-analysis", "elearning-quality-assurance"],
    questions: [
      {
        title: "What if we only have a published package?",
        answer:
          "Share what you have and any information about the original authoring tool and asset rights. We will review what can be reused. A published package does not always contain editable source files.",
      },
      {
        title: "Can we start with one module?",
        answer:
          "Yes. One representative section can help establish the approach, effort and technical fit before a larger refresh is commissioned.",
      },
      {
        title: "Will existing learner records be preserved?",
        answer:
          "That depends on the platform, package identifiers and update process. We agree the required behaviour with your platform owner and test an update before replacing live content.",
      },
    ],
  },
];
export const offerPath = (offer: Offer) => `/services/${offer.slug}`;
export function articleEnquiryPath(slug: string, service?: string) {
  if (service) return `/contact?service=${encodeURIComponent(service)}`;
  const offer = offers.find((item) => item.articles.includes(slug));
  return offer
    ? `/contact?service=${encodeURIComponent(offer.title)}`
    : "/contact";
}
export const nextSteps = [
  {
    title: "Tell us what needs to change.",
    copy: "A few lines about your team, your challenge and what you have already are enough to start.",
  },
  {
    title: "Find the right starting point.",
    copy: "We’ll reply by email to clarify the brief and suggest a useful next step. An initial conversation carries no obligation.",
  },
  {
    title: "Agree the shape of the work.",
    copy: "Before production, we agree the deliverables, review stages, timing and responsibilities in a written proposal.",
  },
];
