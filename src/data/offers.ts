type Offer = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  lead: string;
  cardSummary: string;
  icon: "idea" | "heart" | "play" | "spark";
  need: string;
  approach: string;
  deliverables: { title: string; copy: string }[];
  projects: [string, ...string[]];
  articles: string[];
  questions: { title: string; answer: string }[];
};
export const offers: Offer[] = [
  {
    slug: "bespoke-elearning",
    cardSummary: "Turn your expertise into learning that clicks.",
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
    projects: ["allergen-awareness"],
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
    slug: "lms-development",
    cardSummary: "Connect your people, content and systems.",
    title: "LMS architecture & development",
    description:
      "LMS architecture and development from butter: Moodle customisation, learner journeys, platform configuration and integration planning, shaped around your organisation.",
    headline: "LMS architecture & development. Built for learning.",
    lead: "Build a learning platform around the people using it. From system architecture and Moodle development to learner journeys, integrations and a considered technical handover.",
    icon: "play",
    need: "Your learning platform connects people, content and the systems around them. A useful build needs a clear structure for audiences, permissions, learning pathways and reporting, alongside an interface that helps learners and administrators get things done.",
    approach:
      "We map the learner and administrator journeys, content model, access roles and required data flows before defining the build. Work can include Moodle customisation, bespoke academy interfaces or configuration within an existing LMS. Representative prototypes and integration checks help establish the technical approach before wider development.",
    deliverables: [
      {
        title: "An architecture with a purpose.",
        copy: "An agreed system design covering audiences, access roles, content structure, learning pathways and required connections, with responsibilities shared with your IT and platform teams.",
      },
      {
        title: "A platform shaped for the work.",
        copy: "An agreed configuration or development scope, from branded learner interfaces and Moodle experiences to course discovery, enrolment and administration workflows.",
      },
      {
        title: "A build you can take forward.",
        copy: "Role and journey checks, agreed integration tests, release guidance and technical documentation. Hosting, maintenance, source access and operational ownership are settled as part of the handover.",
      },
    ],
    projects: [
      "humankind-educatorhub",
      "nansen-learning-academy",
      "your-learning-platform",
    ],
    articles: ["lms-vs-lxp-vs-lrs", "open-source-vs-managed-lms"],
    questions: [
      {
        title: "Can you develop within our existing LMS?",
        answer:
          "Yes. We first review the platform, hosting arrangement, available permissions and supported extension points. The scope distinguishes configuration from custom development, with the platform owner involved in approving changes and release arrangements.",
      },
      {
        title: "Can identity, courses and reporting connect to other systems?",
        answer:
          "We can scope single sign-on, APIs and reporting connections with your technical teams where the intended platforms support them. HTML or SCORM course delivery is tested against agreed launch, completion and resume rules. We validate the important connections before committing to a wider rollout.",
      },
      {
        title: "Who will own and maintain the build?",
        answer:
          "We agree source access, third-party licences, hosting, maintenance and support responsibilities before delivery. The handover includes the documentation and operational guidance in scope, so your team understands what it can manage and where specialist support is needed.",
      },
    ],
  },
  {
    slug: "compliance-training",
    cardSummary: "Help your team make the right call.",
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
    projects: ["record-keeping"],
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
    cardSummary: "Give good content a fresh lease of life.",
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
    projects: ["alcohol-and-drug-awareness"],
    articles: ["accessible-elearning-wcag", "elearning-quality-assurance"],
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
  {
    slug: "learning-strategy",
    cardSummary: "Find the need. Shape the way forward.",
    title: "Learning strategy",
    description:
      "Learning strategy and training needs analysis for businesses. Map skills, identify performance gaps and agree a practical development plan with butter.",
    headline: "Learning strategy. A clearer way forward.",
    lead: "Get a clearer view of what your people need to do, what stands in their way and where learning can help. A practical direction before production begins.",
    icon: "idea",
    need: "A request for training often starts with a symptom: inconsistent practice, a new responsibility or a skill the business will need next. Understanding the work, the people and the conditions around them helps you decide what support will make a difference.",
    approach:
      "We work with your stakeholders and colleagues to examine the tasks, existing evidence and capability gaps. Interviews, workshops and a review of current resources inform a shared picture. Together, we prioritise the needs and agree a learning roadmap with useful ways to evaluate progress.",
    deliverables: [
      {
        title: "An evidence-led starting point.",
        copy: "A discovery summary drawing together stakeholder perspectives, audience needs and existing performance evidence, with assumptions made explicit.",
      },
      {
        title: "A shared view of capability.",
        copy: "A skills framework, gap analysis or learning journey appropriate to the brief, connecting development priorities to the work people need to do.",
      },
      {
        title: "A direction you can act on.",
        copy: "A prioritised development roadmap with proposed interventions, responsibilities and evaluation questions. Recommendations can include job aids, supported practice and changes beyond a course.",
      },
    ],
    projects: ["strategic-skills-mapping"],
    articles: ["learning-needs-analysis", "learning-analytics"],
    questions: [
      {
        title: "Can you help us decide whether training is needed?",
        answer:
          "Yes. Discovery can separate a knowledge or skill gap from issues involving tools, processes, expectations or support. Where training is unlikely to solve the problem, the recommendations should say so.",
      },
      {
        title: "What do we need before starting?",
        answer:
          "Bring the challenge, the teams involved and any evidence you already have. Access to relevant colleagues, existing resources and a person who can agree priorities helps us make the analysis useful. You do not need a finished learning brief.",
      },
      {
        title: "Can our own team deliver the recommendations?",
        answer:
          "Yes. A strategy engagement can end with a roadmap and handover for your team. If you also need design, production or team development, we can agree those as separate next steps.",
      },
    ],
  },
  {
    slug: "ld-team-development",
    cardSummary: "Build the skills behind better learning.",
    title: "L&D team development",
    description:
      "Build your L&D team’s digital learning capability with butter: practical instructional design workshops, authoring-tool coaching and supported project work.",
    headline: "L&D team development. Build lasting capability.",
    lead: "Help your learning team plan, design and produce useful digital learning with confidence. Practical development built around the work they need to deliver.",
    icon: "heart",
    need: "A new authoring tool is only part of the picture. Your team also needs to shape a brief, choose a suitable learning approach, give useful feedback and check the finished experience. Development works best when those skills connect to a real project.",
    approach:
      "We begin with the team’s experience, tools and delivery priorities. Facilitated workshops, worked examples, guided practice and project feedback form a blended programme. Colleagues apply the learning to their own material, with room to review decisions and practise again.",
    deliverables: [
      {
        title: "A programme for your team.",
        copy: "A capability review and development plan that sets out the starting point, practical objectives and an appropriate blend of workshops, resources and support.",
      },
      {
        title: "Practice with a purpose.",
        copy: "Instructional design exercises, tool demonstrations and guided production tasks using relevant briefs. Rise, Storyline or other agreed tools can be included where they fit the need.",
      },
      {
        title: "Something to build on.",
        copy: "Project feedback, reusable design resources and agreed quality checks, with a practical publishing or delivery milestone to demonstrate what colleagues can do independently.",
      },
    ],
    projects: ["ld-digital-upskilling"],
    articles: ["worked-examples", "feedback-that-improves-learning"],
    questions: [
      {
        title: "Can you work with mixed levels of experience?",
        answer:
          "Yes. We establish the starting points and identify shared foundations alongside individual practice needs. The programme can include different tasks, peer review and focused support rather than expecting everyone to follow an identical route.",
      },
      {
        title: "Can we use a live project during the programme?",
        answer:
          "Yes. A suitable project gives the practice a clear purpose. We agree the size of the task, access to subject experts, review responsibilities and what can reasonably be completed within the programme.",
      },
      {
        title: "How do you check that the skills transfer?",
        answer:
          "We agree practical evidence at the start: a storyboard, a working activity, a reviewed module or an independently published asset. Follow-up review can help assess application after the workshops; attendance and satisfaction alone are not evidence of capability.",
      },
    ],
  },
  {
    slug: "learning-animation",
    cardSummary: "Make complex ideas move people.",
    title: "Learning animation",
    description:
      "Learning animation and training video from butter: clear scripts, storyboards, motion design and captioned films for workplace learning and internal campaigns.",
    headline: "Learning animation. Make the message move.",
    lead: "Bring a learning idea, workplace scenario or internal campaign to life. Animation and video that make the message clear and give people a useful next step.",
    icon: "spark",
    need: "Sometimes people need to see a situation, recognise themselves in a story or understand a new service before they act. A well-chosen film can make that moment tangible, whether it introduces a conversation, explains a process or invites colleagues to try something new.",
    approach:
      "We agree the audience, message, viewing context and intended action before scripting. A storyboard and visual treatment establish the direction, followed by production, review and delivery. Motion graphics, character animation, screen demonstrations or AI-presented scenarios are selected to suit the brief.",
    deliverables: [
      {
        title: "A story with a job to do.",
        copy: "A script and storyboard that connect the message to a learner decision or campaign action, with the required subject and brand review built in.",
      },
      {
        title: "A considered visual treatment.",
        copy: "A representative style frame or motion sample to agree the look, pacing and approach before producing the full sequence.",
      },
      {
        title: "Ready for the right screen.",
        copy: "Finished films in agreed formats, with captions and a transcript scoped for the viewing context. Campaign cut-downs, facilitator prompts or course integration can be included where useful.",
      },
    ],
    projects: [
      "linkedin-learning",
      "ai-enabled-scenario-learning",
      "laaw-2024",
    ],
    articles: ["elearning-storyboarding", "write-better-learning-scenarios"],
    questions: [
      {
        title: "Can the film work without sound?",
        answer:
          "Yes. We can design for sound-off viewing from the storyboard, with readable on-screen information, considered pacing and captions. We agree where a transcript or audio description is also needed for the audience and distribution channel.",
      },
      {
        title: "Do we have to use AI presenters?",
        answer:
          "No. Motion graphics, character animation, screen recordings and other production approaches can be considered. If an AI presenter fits the brief, we agree the tool, content handling and review approach before using it.",
      },
      {
        title: "Can you make a series or adapt an existing film?",
        answer:
          "Yes. We can scope a connected series, shorter campaign versions or updates to existing material. Access to editable files, asset permissions, the required formats and the review process determine what can be reused.",
      },
    ],
  },
  {
    slug: "lms-project-management",
    cardSummary: "Take your platform from plan to launch.",
    title: "LMS project management",
    description:
      "LMS project management from discovery to rollout. Coordinate requirements, suppliers, migration, user acceptance testing and handover with butter.",
    headline: "LMS project management. A clearer route to launch.",
    lead: "Keep your platform project moving with a clear plan and shared decisions. Practical delivery support across discovery, suppliers, migration, testing and rollout.",
    icon: "heart",
    need: "A platform project brings learning, technology, content and organisational change together. Your team needs a clear view of who is doing what, which decisions are needed and how the work will be accepted before learners depend on it.",
    approach:
      "We establish the scope, stakeholders, delivery milestones and decision process with your project sponsor. A shared plan connects requirements, supplier activity, content readiness and technical dependencies. Risk reviews, change control and user acceptance testing support an agreed route into rollout and operational ownership.",
    deliverables: [
      {
        title: "A shared delivery plan.",
        copy: "A project brief, milestones, responsibilities and decision points, with dependencies and risks visible to the people who need to act on them.",
      },
      {
        title: "Coordination that keeps things moving.",
        copy: "Agreed stakeholder reviews, supplier coordination, decision and change records, and a connected view of configuration, content preparation and migration activity.",
      },
      {
        title: "A considered launch and handover.",
        copy: "A user acceptance plan, readiness checks, an agreed rollout approach and operational handover. Support, communications and outstanding actions have named owners before the project closes.",
      },
    ],
    projects: [
      "your-learning-platform",
      "humankind-educatorhub",
      "nansen-learning-academy",
    ],
    articles: ["choosing-lms", "elearning-tool-pilot-checklist"],
    questions: [
      {
        title: "Can you work with our existing platform supplier?",
        answer:
          "Yes. We can coordinate delivery alongside your internal team and chosen supplier. Responsibilities, access, escalation routes and acceptance decisions are agreed at the start so project management supports the people doing the work.",
      },
      {
        title: "How do you manage a platform migration?",
        answer:
          "We agree the content inventory, data mapping, transfer responsibilities and validation process with the platform owners. Learner record transfer depends on system capabilities, export access and retention requirements. Pilot transfers, acceptance checks and an agreed recovery approach inform the rollout plan.",
      },
      {
        title: "How do you keep stakeholders aligned?",
        answer:
          "We use an agreed review rhythm, clear responsibilities and visible decision, risk and change records. Milestones connect to acceptance criteria, so progress is discussed in terms of what is ready and what needs attention, with sign-off responsibilities established before launch.",
      },
    ],
  },
];
export const offerPath = (offer: Offer) => `/services/${offer.slug}`;
export function relatedOffers(slug: string, service?: string) {
  return offers.filter(
    (offer) => offer.articles.includes(slug) || offer.title === service,
  );
}
export function articleEnquiryPath(slug: string, service?: string) {
  if (service) return `/contact?service=${encodeURIComponent(service)}`;
  const offer = relatedOffers(slug)[0];
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
