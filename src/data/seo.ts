import {
  articles,
  experiments,
  articleText,
  articleWordCount,
} from "./editorial.ts";
import { projects } from "./projects.ts";
import { offers, offerPath } from "./offers.ts";
export const pageMeta: Record<string, [string, string]> = {
  "/": [
    "Learning with feeling.",
    "Bespoke eLearning, staff onboarding and training content for businesses. Explore butter’s work, project examples and a clear route to your next project.",
  ],
  "/about": [
    "A little more human.",
    "Meet butter: a creative learning agency bringing strategy, storytelling and design together for better digital learning.",
  ],
  "/services": [
    "Big ideas. A little butter.",
    "Learning strategy, digital experiences, story and design, and ongoing creative support from butter.",
  ],
  "/work": [
    "A taste of our work.",
    "Explore butter’s eLearning, learning platforms, skills strategy, team development and animation projects, with case studies and interactive samples.",
  ],
  "/contact": [
    "Good things start with hello.",
    "Tell butter about your learning challenge and start a creative conversation with our studio.",
  ],
  "/butterlearn": [
    "Meet butterlearn.",
    "Explore butterlearn: HTML and SCORM courses, learner dashboards, a visual course creator and team progress.",
  ],
  "/journal": [
    "Good ideas. Shared.",
    "Practical guides to instructional design, teaching, assessment, accessibility, AI and learning technology from the butter studio.",
  ],
  "/labs": [
    "A little space for what if.",
    "Explore five butter Labs projects: digital accessibility, resilience, branching storytelling, community mapping and live-event management.",
  ],
  "/brand": [
    "The butter way.",
    "butter’s brand guide: warm yellows, coral sparks, rounded type and bold melting-play iconography.",
  ],
  "/elearning-devon": [
    "eLearning for Devon businesses.",
    "Bespoke eLearning, staff onboarding, compliance training and course refreshes for Devon and South West businesses. Discuss your project with butter.",
  ],
  "/privacy": [
    "A little clarity about your data.",
    "How butter handles project enquiries, anonymous website counts, media and browser preferences on the agency website.",
  ],
  ...Object.fromEntries(
    offers.map((offer) => [
      offerPath(offer),
      [offer.title, offer.description] as [string, string],
    ]),
  ),
};
export function getPageMeta(path: string): [string, string] {
  path = path.replace(/\/+$/, "") || "/";
  const article = articles.find((item) => path === "/journal/" + item.slug);
  if (article) return [article.title, article.description];
  const lab = experiments.find((item) => path === "/labs/" + item.slug);
  if (lab) return [lab.title, lab.description];
  const project = projects.find((item) => path === "/work/" + item.id);
  if (project) return [project.title, project.description];
  return pageMeta[path] || ["A little lost?", "Let’s get you back to butter."];
}
export function structuredData(path: string, siteURL: string) {
  path = path.replace(/\/+$/, "") || "/";
  const organization = {
    "@type": "Organization",
    name: "butter",
    url: siteURL,
  };
  const offer = offers.find((item) => path === offerPath(item));
  if (offer || path === "/elearning-devon")
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: offer?.title || "eLearning for Devon businesses",
      description: offer?.description || pageMeta["/elearning-devon"][1],
      url: siteURL + path,
      provider: organization,
      ...(path === "/elearning-devon"
        ? {
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Devon, England",
            },
          }
        : {}),
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
      author: { ...organization, name: "butter studio" },
      publisher: organization,
      image: siteURL + "/brand/butter-social.png",
      inLanguage: "en-GB",
      url: siteURL + path,
      ...(article.resources?.length
        ? { citation: article.resources.map((resource) => resource.url) }
        : {}),
      articleSection: article.topic,
      articleBody: articleText(article),
      wordCount: articleWordCount(article),
    };
  const lab = experiments.find((item) => path === "/labs/" + item.slug);
  if (lab)
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: lab.title,
      description: lab.description,
      url: siteURL + path,
      creativeWorkStatus: lab.status,
      image: siteURL + lab.hero.path,
      genre: lab.category,
      creator: organization,
    };
  const project = projects.find((item) => path === "/work/" + item.id);
  if (project)
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: siteURL + path,
      genre: project.category,
      about: { "@type": "Organization", name: project.client },
      publisher: organization,
      image:
        siteURL +
        (project.caseStudy ? "/brand/butter-social.png" : project.hero.path),
      inLanguage: "en-GB",
    };
  return { "@context": "https://schema.org", ...organization };
}
