import { designArticles } from "./journal/design.ts";
import { practiceArticles } from "./journal/practice.ts";
import { technologyArticles } from "./journal/technology.ts";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  topic: string;
  date: string;
  icon: "idea" | "heart" | "spark";
  sections: ArticleSection[];
  action: { to: string; label: string };
  relatedSlugs?: string[];
  resources?: { title: string; url: string }[];
};
export const articles: Article[] = [
  ...designArticles,
  ...practiceArticles,
  ...technologyArticles,
  {
    slug: "what-does-elearning-cost",
    title: "What does eLearning actually cost?",
    description:
      "A practical guide to scoping digital learning: what changes the budget, what to prepare and where a smaller start can help.",
    topic: "Practical guides",
    date: "2026-10-12",
    icon: "idea",
    sections: [
      {
        heading: "Start with the change you need.",
        paragraphs: [
          "The most useful starting point for an eLearning budget is the thing you want people to do differently. A ten-minute course that helps someone make one difficult decision can need more design work than a longer resource explaining a familiar process. Duration gives you a clue about the scope; it does not tell the whole story.",
          "Before asking for a quote, describe the audience, the situation and the action you want to support. Tell your learning partner what happens today and what a better experience would look like. That turns a request for ‘a module’ into a brief that can be estimated and tested.",
        ],
      },
      {
        heading: "What changes the investment?",
        paragraphs: [
          "Learning design, writing, visual design, development and review all contribute to the work. The balance changes with the brief. Ready-to-use source material can make a straightforward resource quicker to shape. Research, conflicting guidance or several expert reviewers can require a longer discovery and approval process.",
          "Production choices matter too. Custom illustration, filmed interviews, animation, branching scenarios and complex assessments bring different skills and testing needs. Accessibility, translation and the platforms the course must run on belong in the scope from the beginning.",
        ],
        points: [
          "Content readiness: is the material agreed, accurate and suitable for the audience?",
          "Interaction: are people reading, practising a decision or navigating several possible paths?",
          "Production: do you need supplied media, original illustration, filming or bespoke animation?",
          "Delivery: which devices, languages, accessibility requirements and learning platforms need testing?",
          "Review: who can approve the work, and how many rounds are included?",
        ],
      },
      {
        heading: "Use indicative budgets carefully.",
        paragraphs: [
          "butter’s pricing page gives illustrative GBP starting points: £2,500 for a focused learning moment, £7,500 for an interactive module and £15,000 for a connected learning journey. These help open a conversation about the scale of the work. They are not a fixed quote or a claim that every project fits the same template.",
          "The estimate calculator lets you explore format, number of pieces, branching and motion. Use it to see how a few choices affect the starting point, then discuss your actual brief. A useful proposal should identify the deliverables, assumptions, review rounds, testing and handover, so you can compare like with like.",
        ],
      },
      {
        heading: "A smaller start can answer a bigger question.",
        paragraphs: [
          "If the approach is uncertain, you do not have to commission the whole programme at once. A discovery workshop, one representative scenario or a prototype can help you check the tone, technical fit and learning approach before committing to a larger production.",
          "Choose a pilot that contains the difficult part. A polished introduction tells you less than a realistic decision, an accessible interaction or a course launch on the intended LMS. Agree what you want to learn from the pilot and who will help you evaluate it.",
        ],
      },
      {
        heading: "Give the quote something concrete to work with.",
        paragraphs: [
          "Bring a short outline of the learning need, your audience, existing content, delivery platform, timing and budget range. Include any technical or policy requirements you already know. If some decisions are still open, say so; uncertainty can be scoped rather than hidden.",
          "Then ask how the proposed work supports the outcome. A clear budget is useful. A clear reason for spending it is better. The right starting point is the smallest coherent experience that can help people take the next step.",
        ],
        points: [
          "What should learners be able to do after the experience?",
          "What source content and media are already available?",
          "Where will it launch, and what needs to be tracked?",
          "Who owns content approval and platform testing?",
          "What is included in the handover and ongoing support?",
        ],
      },
    ],
    action: { to: "/pricing", label: "Explore the project calculator" },
  },
  {
    slug: "write-better-learning-scenarios",
    title: "Write a decision, not another slide.",
    description:
      "How to design scenario-based learning with a believable situation, meaningful choices and feedback people can use.",
    topic: "Learning design",
    date: "2026-10-12",
    icon: "heart",
    sections: [
      {
        heading: "Find the moment that matters.",
        paragraphs: [
          "A useful learning scenario starts at a point where someone needs to make a choice. It might be a handover, a difficult conversation or a customer asking a question the learner cannot confidently answer. Begin with that moment rather than a list of information you want to present.",
          "Ask people who do the work where decisions become difficult. What is unclear? What pressure are they under? What do they commonly overlook? Their language and context can help you build a situation that feels recognisable without adding unnecessary detail.",
        ],
      },
      {
        heading: "Give the choice enough context.",
        paragraphs: [
          "Learners need to understand what is happening, what they know and what they are trying to achieve. They do not need every fact about the fictional organisation. A few relevant details can make the decision clear: the task, the people involved, a constraint and the consequence that matters.",
          "For example, a colleague has missed a detail in a handover. The work is already moving, and the learner needs to raise the issue. Asking ‘What should you do?’ is vague. Asking ‘How would you open this conversation?’ gives the learner a specific action to practise.",
        ],
      },
      {
        heading: "Make the alternatives believable.",
        paragraphs: [
          "A choice only becomes useful practice when its alternatives are plausible. An obviously sensible answer beside two absurd responses lets people spot the pattern without thinking about the situation. Draw on real shortcuts, misunderstandings and competing priorities instead.",
          "In the handover example, someone might make an accusation, start with a specific observation or delay the conversation. Each response can have a reason behind it. The learner’s job is to consider the effect, not simply recognise a phrase from the previous slide.",
        ],
        points: [
          "Keep the options about the same action or decision.",
          "Use similar levels of detail and a consistent tone.",
          "Avoid making the expected answer visibly longer or more polished.",
          "Check that the situation contains enough information to choose fairly.",
        ],
      },
      {
        heading: "Feedback should help the next attempt.",
        paragraphs: [
          "‘Correct’ and ‘incorrect’ tell learners the result, but not much about the reasoning. Explain what the response might lead to and connect that consequence to the useful principle. Keep the feedback specific to the choice they made.",
          "For an accusatory opening, you could explain that a broad judgement can make the other person defensive and leave the actual issue unclear. Suggest starting with an observation and asking for their perspective. That gives the learner something they can try in a real conversation.",
          "Let people explore when the topic and context allow it. A safe practice space can make an unhelpful response instructive. Sensitive, safety-critical or assessed subjects need an appropriate review process and a clear distinction between an illustrative scenario and formal guidance.",
        ],
      },
      {
        heading: "Branch when the consequence deserves it.",
        paragraphs: [
          "Not every scenario needs a large branching tree. A single decision with useful feedback may be enough. Add a second step when the first response changes what happens next and the learner has another meaningful choice to make.",
          "Map the paths before production. Look for repeated content, dead ends and branches that add reading without adding practice. A small, well-judged interaction is often easier to understand, review and maintain than an elaborate simulation.",
        ],
      },
      {
        heading: "Test the thinking as well as the interface.",
        paragraphs: [
          "Ask representative learners to explain their choices. If they pick the expected response because it sounds more official, the writing may need another pass. If an experienced person needs a missing piece of context, the scenario may be unfair rather than challenging.",
          "Test keyboard use, feedback announcements and the layout on small screens too. The interaction should give learners room to think without making them work out how to use it. Our Labs includes a short conversation experiment you can explore as a starting point.",
        ],
      },
    ],
    action: {
      to: "/labs/the-better-question",
      label: "Try the conversation experiment",
    },
  },
  {
    slug: "scorm-or-html-course",
    title: "SCORM or HTML? Start with the learner.",
    description:
      "A plain-language guide to choosing course delivery and tracking, with practical questions for your LMS and authoring workflow.",
    topic: "Learning tech",
    date: "2026-10-12",
    icon: "spark",
    sections: [
      {
        heading: "The content and the tracking are different decisions.",
        paragraphs: [
          "HTML is the language used to structure web content. An HTML learning package can contain pages, styles, images and interactive JavaScript. SCORM adds a defined way for packaged learning to communicate with a compatible learning management system. A SCORM course commonly contains HTML too.",
          "The choice is therefore less about appearance and more about delivery and tracking. Start by deciding what the learner needs to do, where they will open the experience and what the organisation needs to know afterwards.",
        ],
      },
      {
        heading: "When a simple HTML experience can work.",
        paragraphs: [
          "A lightweight HTML resource can be a good fit for guidance, a short practice activity or a learning moment where a simple completion action is sufficient. It can keep the content focused and let you shape the interface around the task.",
          "Tracking is not automatic just because a resource is hosted in an LMS. In butterlearn, imported and authored HTML courses use a learner-facing ‘Mark complete’ control. Other platforms can have different rules. Agree the behaviour explicitly rather than assuming every HTML package will report completion or a quiz score.",
        ],
      },
      {
        heading: "When SCORM tracking is useful.",
        paragraphs: [
          "If you need the course to report completion, a score or a checkpoint back to the LMS, SCORM may be the appropriate delivery format. The course and platform both need to support the relevant version and the data you intend to record.",
          "SCORM 1.2 and SCORM 2004 use different runtime APIs and data fields. butterlearn supports practical tracking for both, including completion, normalized scores, session time, lesson location and suspend data. Its SCORM 2004 support is not a certified implementation of the full sequencing engine. Test representative exports against the actual platform requirements.",
        ],
      },
      {
        heading: "Ask what ‘complete’ actually means.",
        paragraphs: [
          "A course can mark completion when a learner reaches the final screen, selects a finish control or meets an assessment condition. Those behaviours tell different stories. Reaching the end does not, on its own, demonstrate that someone can apply the learning at work.",
          "Agree the completion rule, pass condition, retry behaviour and reporting needs during design. Decide whether the course should resume a previous attempt and what happens after an update. These details are easier to plan before production than to discover during launch.",
        ],
        points: [
          "Which SCORM version does the LMS accept?",
          "Which completion and score fields does it use?",
          "How should unfinished attempts resume?",
          "Are quizzes practice activities or controlled assessments?",
          "What should happen when a learner revisits completed content?",
        ],
      },
      {
        heading: "Test the full journey.",
        paragraphs: [
          "Upload a representative package and follow the whole learner journey: enrol, launch, make some progress, close the course, sign back in and resume. Finish the course and check the reporting record. Repeat with the intended devices and browsers.",
          "Include media, keyboard interaction and any external resources in that check. Content that depends on access to its parent page, browser storage or a particular hosting arrangement may behave differently inside a sandboxed course player.",
        ],
      },
      {
        heading: "Choose a format that supports the outcome.",
        paragraphs: [
          "A technically valid package can still be an unhelpful learning experience. Keep the content, interactions and completion rules connected to the action you want to support. Use tracking to answer a real operational question, and avoid adding complexity simply because a format allows it.",
          "butterlearn includes HTML and SCORM example courses, plus a visual creator for HTML and SCORM 2004 drafts. Explore the product and talk through your delivery requirements before moving a live programme. A short platform test is a useful part of the brief, not an afterthought.",
        ],
      },
    ],
    action: { to: "/butterlearn", label: "Explore butterlearn" },
  },
];
export const formatArticleDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));

export function relatedArticles(article: Article) {
  const candidates = [
    ...(article.relatedSlugs || []).map((slug) =>
      articles.find((item) => item.slug === slug),
    ),
    ...articles.filter((item) => item.topic === article.topic),
    ...articles,
  ];
  return candidates
    .filter(
      (item, index): item is Article =>
        !!item &&
        item.slug !== article.slug &&
        candidates.findIndex((candidate) => candidate?.slug === item.slug) ===
          index,
    )
    .slice(0, 2);
}

export const readMinutes = (article: Article) =>
  Math.max(
    1,
    Math.ceil(
      article.sections
        .flatMap((section) => [
          section.heading,
          ...section.paragraphs,
          ...(section.points || []),
        ])
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  );
export const experiments = [
  {
    slug: "the-better-question",
    title: "The better question.",
    description:
      "A two-minute conversation. Explore a choice, follow its consequence and try a different route.",
    kind: "branching",
    icon: "heart" as const,
  },
  {
    slug: "one-idea-at-a-time",
    title: "One idea at a time.",
    description:
      "The same content, two ways. Play with progressive disclosure and decide what helps you focus.",
    kind: "disclosure",
    icon: "idea" as const,
  },
  {
    slug: "a-little-practice",
    title: "A little practice.",
    description:
      "Make a small practice plan. Shape the rhythm, explore its steps and take one useful question away.",
    kind: "practice",
    icon: "spark" as const,
  },
];
