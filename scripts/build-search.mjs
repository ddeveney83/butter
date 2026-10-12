import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { articles, experiments, readMinutes } from "../src/data/editorial.ts";
import { pageMeta, getPageMeta, structuredData } from "../src/data/seo.ts";
import { projects } from "../src/data/projects.ts";
const siteURL = (
  process.env.VITE_SITE_URL || "https://buttertest.netlify.app"
).replace(/\/$/, "");
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const routes = [
  ...Object.keys(pageMeta).filter((path) => path !== "/brand"),
  ...projects.map((item) => "/work/" + item.id),
  ...articles.map((item) => "/journal/" + item.slug),
  ...experiments.map((item) => "/labs/" + item.slug),
];
const navigation = `<header class="header container"><a class="wordmark" href="/" aria-label="Butter home">butter</a><nav aria-label="Main navigation" class="nav"><a href="/about">About</a><a href="/services">Services</a><a href="/work">Work</a><a href="/butterlearn">butterlearn</a><a href="/journal">Journal</a><a href="/labs">Labs</a><a href="/pricing">Pricing</a><a href="/contact">Contact</a></nav></header>`;
function content(path) {
  if (path === "/")
    return `<section class="hero container"><div class="hero-copy"><h1>Learning<br>with <span class="feeling">feeling</span>.</h1><p>We make learning that moves people.<br>A little curiosity. A lot of creativity.<br>And just the right amount of Butter.</p><a class="pill-button" href="/work">Explore our work ↗</a></div><div class="hero-art"><div class="butter-circle"></div><img class="butter-mascot hero-character" src="/brand/butter-mascot.webp" alt="Butter’s smiling mascot carrying a pencil and tablet" width="1217" height="1292" fetchpriority="high"><span class="handwritten">good things<br>are spreading.</span></div></section><section class="home-studio-links container"><a href="/journal"><div><h2>Fresh thinking.</h2><p>Practical ideas from the Butter journal.</p></div></a><a href="/labs"><div><h2>A little what if.</h2><p>Experiments and learning snippets from Labs.</p></div></a></section>`;
  const article = articles.find((item) => path === "/journal/" + item.slug);
  if (article)
    return `<article class="journal-article container"><header><a class="studio-back-link" href="/journal">← All articles</a><h1>${escape(article.title)}</h1><p class="journal-standfirst">${escape(article.description)}</p><div class="journal-byline"><span>Butter studio</span><time datetime="${article.date}">12 October 2026</time><span>${readMinutes(article)} min read</span></div></header><div class="journal-reading-layout"><nav aria-label="In this article"><span>In this article</span>${article.sections.map((section, i) => `<a href="#section-${i + 1}">${escape(section.heading)}</a>`).join("")}</nav><div class="journal-prose">${article.sections.map((section, i) => `<section id="section-${i + 1}"><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}${section.points ? `<ul>${section.points.map((point) => `<li>${escape(point)}</li>`).join("")}</ul>` : ""}</section>`).join("")}<a href="${article.action.to}">${escape(article.action.label)} ↗</a></div></div></article>`;
  const [title, description] = getPageMeta(path);
  let extra = "";
  if (path === "/journal")
    extra = articles
      .map(
        (item) =>
          `<article><h2><a href="/journal/${item.slug}">${escape(item.title)}</a></h2><p>${escape(item.description)}</p></article>`,
      )
      .join("");
  if (path === "/labs")
    extra = experiments
      .map(
        (item) =>
          `<article><h2><a href="/labs/${item.slug}">${escape(item.title)}</a></h2><p>${escape(item.description)}</p></article>`,
      )
      .join("");
  if (path === "/work")
    extra = projects
      .map(
        (item) =>
          `<article><h2><a href="/work/${item.id}">${escape(item.title)}</a></h2><p>${escape(item.description)}</p></article>`,
      )
      .join("");
  const project = projects.find((item) => path === "/work/" + item.id);
  if (project)
    extra = `<img src="${project.hero.path}" alt="${escape(project.hero.alt)}"><h2>The thinking.</h2><p>${escape(project.approach)}</p><h2>Reported outcome.</h2><p>${escape(project.outcome)}</p>`;
  return `<section class="page-hero container"><h1>${escape(title)}</h1><p>${escape(description)}</p>${extra}<p><a href="/journal">Read the Butter journal</a> · <a href="/labs">Explore Butter Labs</a> · <a href="/contact">Talk to Butter</a></p></section>`;
}
for (const path of routes) {
  const [title, description] = getPageMeta(path),
    url = siteURL + path;
  const seo = `<link rel="canonical" href="${escape(url)}"><meta property="og:type" content="${path.startsWith("/journal/") ? "article" : "website"}"><meta property="og:title" content="${escape("Butter — " + title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(url)}"><meta property="og:image" content="${siteURL}/brand/butter-mascot.png"><meta property="og:site_name" content="Butter"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json" id="page-structured-data">${JSON.stringify(structuredData(path, siteURL)).replace(/</g, "\\u003c")}</script>`;
  let html = template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escape("Butter — " + title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(description)}">`,
    )
    .replace("</head>", seo + "</head>")
    .replace(
      '<div id="root"></div>',
      `<div id="root">${navigation}<main id="main">${content(path)}</main><footer class="footer"><div class="container"><p>Butter. A creative learning agency.</p><a href="/contact">Start a conversation</a></div></footer></div>`,
    );
  const directory = path === "/" ? "dist" : join("dist", path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), html);
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>${escape(siteURL + path)}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /butterlearn/app\nDisallow: /butterlearn/login\nDisallow: /api/\nDisallow: /learn-content/\nDisallow: /brand\nSitemap: ${siteURL}/sitemap.xml\n`,
);
console.log(
  `Generated crawlable HTML and search metadata for ${routes.length} public pages.`,
);
