import { articles, experiments } from "./editorial.ts";
import { projects } from "./projects.ts";
import { offers, offerPath } from "./offers.ts";
export const publicPaths = [
  "/",
  "/about",
  "/services",
  "/work",
  "/contact",
  "/journal",
  "/labs",
  "/butterlearn",
  "/elearning-devon",
  "/privacy",
  ...offers.map(offerPath),
  ...projects.map((item) => `/work/${item.id}`),
  ...articles.map((item) => `/journal/${item.slug}`),
  ...experiments.map((item) => `/labs/${item.slug}`),
];
