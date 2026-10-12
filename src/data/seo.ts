import { articles, experiments } from "./editorial.ts";
import { projects } from "./projects.ts";
export const pageMeta: Record<string, [string, string]> = {
  "/": [
    "Learning with feeling.",
    "Butter is a creative eLearning agency. We turn complex things into learning experiences people feel, remember and use.",
  ],
  "/about": [
    "A little more human.",
    "Meet Butter: a creative learning agency bringing strategy, storytelling and design together for better digital learning.",
  ],
  "/services": [
    "Big ideas. A little Butter.",
    "Learning strategy, digital experiences, story and design, and ongoing creative support from Butter.",
  ],
  "/work": [
    "A taste of our work.",
    "Explore six digital learning experiences and two learning platforms, with project imagery, film and interactive samples.",
  ],
  "/pricing": [
    "Find your starting point.",
    "Explore indicative eLearning project budgets and build a ballpark learning project estimate with Butter.",
  ],
  "/contact": [
    "Good things start with hello.",
    "Tell Butter about your learning challenge and start a creative conversation with our studio.",
  ],
  "/butterlearn": [
    "Meet Butterlearn.",
    "Explore Butterlearn: HTML and SCORM courses, learner dashboards, a visual course creator and team progress.",
  ],
  "/journal": [
    "Good ideas. Shared.",
    "Practical articles from the Butter studio on eLearning design, project budgets, scenarios, SCORM and learning technology.",
  ],
  "/labs": [
    "A little space for what if.",
    "Explore Butter Labs: interactive learning experiments, branching conversations and creative learning snippets.",
  ],
  "/brand": [
    "The Butter way.",
    "Butter’s brand guide: warm colours, bold type, a cartoon mascot and playful iconography.",
  ],
};
export function getPageMeta(path: string): [string, string] {
  path = path.replace(/\/+$/, "") || "/";
  const article = articles.find((item) => path === "/journal/" + item.slug);
  if (article) return [article.title, article.description];
  const lab = experiments.find((item) => path === "/labs/" + item.slug);
  if (lab) return [lab.title, lab.description];
  const project = projects.find((item) => path === "/work/" + item.id);
  if (project) return [project.title, project.description];
  return pageMeta[path] || ["A little lost?", "Let’s get you back to Butter."];
}
export function structuredData(path: string, siteURL: string) {
  path = path.replace(/\/+$/, "") || "/";
  const organization = {
    "@type": "Organization",
    name: "Butter",
    url: siteURL,
  };
  const article = articles.find((item) => path === "/journal/" + item.slug);
  if (article)
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      mainEntityOfPage: siteURL + path,
      author: { ...organization, name: "Butter studio" },
      publisher: organization,
      image: siteURL + "/brand/butter-mascot.png",
      articleSection: article.topic,
      articleBody: article.sections
        .flatMap((section) => [
          section.heading,
          ...section.paragraphs,
          ...(section.points || []),
        ])
        .join("\n\n"),
    };
  const lab = experiments.find((item) => path === "/labs/" + item.slug);
  if (lab)
    return {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: lab.title,
      description: lab.description,
      url: siteURL + path,
      learningResourceType: "Interactive demonstration",
      creator: organization,
    };
  return { "@context": "https://schema.org", ...organization };
}
