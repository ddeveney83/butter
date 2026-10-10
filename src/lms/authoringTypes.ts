export type Item = { title: string; html: string };
export type ContentBlock =
  | { id: string; type: "text"; html: string }
  | { id: string; type: "columns"; columns: string[]; videos?: string[] }
  | { id: string; type: "image"; url: string; alt: string; caption: string }
  | {
      id: string;
      type: "video";
      url: string;
      title: string;
      transcript: string;
    }
  | { id: string; type: "flipcards" | "accordion" | "tabs"; items: Item[] }
  | {
      id: string;
      type: "hotspots";
      url: string;
      alt: string;
      points: (Item & { x: number; y: number })[];
    }
  | {
      id: string;
      type: "quiz";
      question: string;
      options: string[];
      answer: number;
      feedback: string;
    };
export type CourseDocument = {
  title: string;
  description: string;
  minutes: number;
  icon: "heart" | "idea" | "spark";
  format: "html" | "scorm2004";
  blocks: ContentBlock[];
};
export type Draft = {
  document: CourseDocument;
  revision: number;
  updatedAt: string;
};
export const blockNames: Record<ContentBlock["type"], string> = {
  text: "Rich text",
  columns: "Columns",
  image: "Image",
  video: "Video",
  flipcards: "Flip cards",
  accordion: "Accordion",
  tabs: "Tabs",
  hotspots: "Hotspots",
  quiz: "Knowledge check",
};
export function newBlock(type: ContentBlock["type"]): ContentBlock {
  const id = crypto.randomUUID();
  const items = [
    {
      title: "A useful idea",
      html: "<p>Share the detail behind this idea.</p>",
    },
    {
      title: "A small next step",
      html: "<p>Give the learner something to try.</p>",
    },
  ];
  switch (type) {
    case "text":
      return {
        id,
        type,
        html: "<h2>A fresh idea.</h2><p>Start with something useful.</p>",
      };
    case "columns":
      return {
        id,
        type,
        columns: [
          "<h3>One perspective.</h3><p>Add your content.</p>",
          "<h3>Another perspective.</h3><p>Add your content.</p>",
        ],
      };
    case "image":
      return {
        id,
        type,
        url: "/learning-assets/workspace.svg",
        alt: "An illustrated workspace with a notebook, coffee and laptop",
        caption: "A little space to think.",
      };
    case "video":
      return {
        id,
        type,
        url: "",
        title: "A useful demonstration",
        transcript: "",
      };
    case "flipcards":
    case "accordion":
    case "tabs":
      return { id, type, items };
    case "hotspots":
      return {
        id,
        type,
        url: "/learning-assets/workspace.svg",
        alt: "An illustrated workspace",
        points: [
          { ...items[0], x: 28, y: 45 },
          { ...items[1], x: 72, y: 58 },
        ],
      };
    case "quiz":
      return {
        id,
        type,
        question: "What is a useful next step?",
        options: [
          "Try one small thing",
          "Do everything at once",
          "Wait for the perfect moment",
        ],
        answer: 0,
        feedback: "Small steps make a good start.",
      };
  }
}
