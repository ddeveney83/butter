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
    slug: "how-to-brief-elearning-project",
    title: "How to brief an eLearning project.",
    description:
      "Write a useful eLearning brief: define the audience, the task, source material, review process and delivery requirements before production.",
    topic: "Practical guides",
    date: "2026-10-12",
    icon: "idea",
    sections: [
      {
        heading: "Start with the change you need.",
        paragraphs: [
          "A useful eLearning brief begins with what people should be able to do. Describe the task, the situation and what is difficult today. A ten-minute resource that helps someone make one important decision can need a different approach from a longer introduction to a familiar process. Duration alone does not define the learning need.",
          "For example, a support team might need to choose the correct diagnostic route before closing a customer case. Bring a representative example of a reopened case and the guidance people currently use. That gives the project a concrete problem to investigate, rather than a request to turn every existing document into slides.",
        ],
      },
      {
        heading: "Describe the audience and their context.",
        paragraphs: [
          "Explain who will use the learning, what they already know and where the task happens. Include relevant differences between roles, locations, languages and access to devices. A new starter using a shared workstation may need a different route from an experienced colleague looking up an occasional exception.",
          "Ask people who do the work to check your assumptions. What do they find difficult? When do they look for help? Which existing resources do they trust? Include accessibility needs and any constraints on time or connectivity. These details help the team design a viable experience, rather than an ideal journey that only works in a demonstration.",
        ],
      },
      {
        heading: "Bring the material you already have.",
        paragraphs: [
          "Gather the current policies, process guides, examples and approved media that can inform the work. Identify which sources are reliable and which are awaiting review. If two documents give conflicting guidance, name the person who can resolve the difference before it becomes part of a learning scenario.",
          "You do not need a finished script to begin a conversation. An honest view of the available material is more useful than a polished outline that hides open decisions. Include any original source files and the permissions attached to existing imagery, video or audio. Reuse depends on both technical access and the right to use the material.",
        ],
        points: [
          "What is the current approved source of truth?",
          "Who can answer subject questions and resolve conflicting guidance?",
          "Which examples reflect the situations learners will actually face?",
          "Which media and source files can the project team use?",
        ],
      },
      {
        heading: "Define the experience and its delivery.",
        paragraphs: [
          "Describe where the learning will launch and what the platform needs to record. Completion, a quiz score and evidence of workplace performance answer different questions. Agree which matters for this project, how an unfinished attempt should resume and what should happen when the content is updated.",
          "If the approach is uncertain, a representative prototype can help. Choose a sample that contains a meaningful decision, an accessible interaction or a technical challenge. Ask representative learners to attempt it. Their reasoning and any barriers they encounter can inform the full experience before production continues.",
        ],
      },
      {
        heading: "Give the project a clear review route.",
        paragraphs: [
          "Identify the people who will review subject accuracy, learning design, brand, accessibility and technical delivery. Agree how feedback will be gathered and who makes the final decision when reviewers disagree. A single, coordinated response is easier to act on than several conflicting versions of the same document.",
          "Finish the brief with the proposed deliverables, review stages, launch requirements and ownership after handover. State what is agreed and what still needs discovery. The purpose is a shared starting point that people can question and improve, with a clear connection between the content being made and the action it should support.",
        ],
      },
    ],
    action: {
      to: "/contact",
      label: "Talk through your learning brief",
    },
    relatedSlugs: ["learning-needs-analysis", "write-learning-objectives"],
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
          "Test keyboard use, feedback announcements and the layout on small screens too. The interaction should give learners room to think without making them work out how to use it. Our Labs includes The Journey, a branching storytelling project exploring how choices shape an experience.",
        ],
      },
    ],
    action: {
      to: "/labs/the-journey",
      label: "Explore The Journey",
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
export { labs as experiments } from "./labs.ts";
