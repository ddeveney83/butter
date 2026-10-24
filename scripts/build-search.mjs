import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import {
  articles,
  experiments,
  readMinutes,
  formatArticleDate,
  relatedArticles,
} from "../src/data/editorial.ts";
import { getPageMeta, structuredData } from "../src/data/seo.ts";
import { privacySections } from "../src/data/privacy.ts";
import {
  offers,
  offerPath,
  nextSteps,
  articleEnquiryPath,
  relatedOffers,
} from "../src/data/offers.ts";
import { projects } from "../src/data/projects.ts";
import { publicPaths } from "../src/data/publicPaths.ts";
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
const routes = publicPaths;
const navigation = `<header class="header container"><a class="wordmark" href="/" aria-label="butter home"><span class="brand-logo" aria-hidden="true"><img class="brand-logo-mark" src="/brand/butter-mark.webp" width="96" height="112" alt=""><span class="brand-logo-name">butter</span></span></a><nav aria-label="Main navigation" class="nav"><a href="/about">About</a><a href="/services">Services</a><a href="/work">Work</a><a href="/butterlearn">butterlearn</a><a href="/journal">Journal</a><a href="/labs">Labs</a><a href="/contact">Contact</a></nav></header>`;
function articleTable(table) {
  if (!table) return "";
  return `<div class="journal-table-scroll" role="region" aria-label="${escape(table.caption)}" tabindex="0"><table><caption>${escape(table.caption)}</caption><thead><tr>${table.columns.map((column) => `<th scope="col">${escape(column)}</th>`).join("")}</tr></thead><tbody>${table.rows.map((row) => `<tr>${row.map((cell, i) => (i === 0 ? `<th scope="row">${escape(cell)}</th>` : `<td>${escape(cell)}</td>`)).join("")}</tr>`).join("")}</tbody></table></div><p class="journal-table-guidance">Scroll across to compare.</p>`;
}
function content(path) {
  if (path === "/") {
    const proof = ["allergen-awareness", "matrix-reloaded", "record-keeping"]
      .map((id) => projects.find((item) => item.id === id))
      .map(
        (item) =>
          `<a href="/work/${item.id}"><strong>${escape(item.metric.value)}</strong><span>${escape(item.metric.label)}</span><span class="lead-proof-project">${escape(item.title)} ↗</span></a>`,
      )
      .join("");
    const serviceLinks = offers
      .map(
        (offer) =>
          `<a href="${offerPath(offer)}"><h3>${escape(offer.title)}</h3><p>${escape(offer.lead)}</p><span>Explore the service ↗</span></a>`,
      )
      .join("");
    return `<section class="hero container"><div class="hero-copy"><h1>Learning<br>with <span class="feeling">feeling</span>.</h1><p>Bespoke eLearning, onboarding and training content for businesses. We turn complex know-how into clear, practical learning for your team.</p><div class="lead-actions"><a class="pill-button" href="/contact">Talk about your project ↗</a><a class="text-link" href="/work">Explore our work ↗</a></div></div><div class="hero-art"><div class="butter-circle"></div><img class="butter-mascot hero-character" src="/brand/butter-mark.webp" alt="butter’s melting play symbol with coral sparks" width="720" height="758" fetchpriority="high"><span class="handwritten">good things<br>are spreading.</span></div></section><section class="lead-proof container" aria-label="Reported project outcomes"><div class="lead-proof-grid">${proof}</div><p class="lead-footnote">Figures reported in the project case studies. Results depend on the audience, brief and context.</p></section><section class="lead-services section container"><h2>What needs to change?</h2><div>${serviceLinks}</div></section><section class="home-studio-links container"><a href="/journal"><div><h2>Fresh thinking.</h2><p>Practical ideas from the butter journal.</p></div></a><a href="/labs"><div><h2>A little what if.</h2><p>Experiments and learning snippets from Labs.</p></div></a></section>`;
  }
  const offer = offers.find((item) => path === offerPath(item));
  if (offer) {
    const examples = offer.projects.map((id) =>
      projects.find((item) => item.id === id),
    );
    const work = examples
      .map(
        (project) =>
          `<article><h3><a href="/work/${project.id}">${escape(project.title)}</a></h3><p>${escape(project.description)}</p><p>${escape(project.outcome)}</p></article>`,
      )
      .join("");
    return `<section class="page-hero container"><h1>${escape(offer.headline)}</h1><p>${escape(offer.lead)}</p><a class="pill-button" href="/contact?service=${encodeURIComponent(offer.title)}">Talk about your project ↗</a></section><section class="offer-intro section container"><div><h2>A clear reason to make it.</h2><p>${escape(offer.need)}</p></div><div><h2>A thoughtful way to get there.</h2><p>${escape(offer.approach)}</p></div></section><section class="offer-deliverables container">${offer.deliverables.map((item) => `<div><h2>${escape(item.title)}</h2><p>${escape(item.copy)}</p></div>`).join("")}</section><section id="offer-work" class="section container"><h2>See the thinking in practice.</h2>${work}</section><section class="section container"><h2>A clear next step.</h2>${nextSteps.map((step) => `<h3>${escape(step.title)}</h3><p>${escape(step.copy)}</p>`).join("")}<h2>A few useful answers.</h2>${offer.questions.map((item) => `<h3>${escape(item.title)}</h3><p>${escape(item.answer)}</p>`).join("")}<h2>A little useful reading.</h2>${offer.articles.map((slug) => `<p><a href="/journal/${slug}">${escape(articles.find((item) => item.slug === slug).title)}</a></p>`).join("")}</section>`;
  }
  if (path === "/elearning-devon")
    return `<section class="page-hero container"><h1>eLearning for Devon businesses.</h1><p>Bespoke digital learning, staff onboarding and practical training content for teams across Devon and the South West.</p><a class="pill-button" href="/contact?service=Devon%20project">Talk about your project ↗</a></section><section class="section container"><h2>Built around your working day.</h2><p>A seasonal team, several sites or a small group of specialists: your learning needs to fit the way your business works. Projects can be planned remotely, with clear review stages and input from your subject experts.</p><p>For businesses in Exeter, Plymouth, Torbay, North Devon and the surrounding area, the starting point is what your people need to do and what support will help.</p><h2>Useful places to start.</h2><p>A focused induction for hospitality, leisure or visitor-facing roles could connect customer care, key procedures and the right route to help. A care, housing or service business could use realistic decisions to help people apply approved policies, with specialist review where needed.</p>${offers.map((item) => `<h3><a href="${offerPath(item)}">${escape(item.title)}</a></h3><p>${escape(item.lead)}</p>`).join("")}</section>`;
  if (path === "/contact")
    return `<section class="page-hero container"><h1>Good things start with hello.</h1><p>Tell us what your people need to do and what is getting in the way. A few lines are enough; you do not need a finished brief.</p></section><section class="container privacy-copy">${nextSteps.map((step) => `<h2>${escape(step.title)}</h2><p>${escape(step.copy)}</p>`).join("")}<form name="butter-contact" method="POST" data-netlify="true" data-netlify-honeypot="website" class="contact-form"><input type="hidden" name="form-name" value="butter-contact"><input type="hidden" name="interest" value="Not sure yet"><input type="hidden" name="entry_page" value="/contact"><input type="hidden" name="enquiry_origin" value="/contact"><input type="hidden" name="source_kind" value="direct"><p hidden><label>Leave this empty<input name="website"></label></p><label>Your name<input name="name" autocomplete="name" required maxlength="100"></label><label>Your email<input name="email" type="email" autocomplete="email" required maxlength="200"></label><label>Company (optional)<input name="company" autocomplete="organization" maxlength="200"></label><label>Timing (optional)<select name="timing"><option value="">Flexible</option><option>Within a month</option><option>In 1–3 months</option><option>In 3–6 months</option><option>Just exploring</option></select></label><label>A little about your project<textarea name="brief" rows="5" required maxlength="3000"></textarea></label><button class="pill-button">Send your enquiry ↗</button><p>We’ll use your details to reply about this enquiry. <a href="/privacy">How we handle your information</a>.</p></form></section>`;
  if (path === "/privacy")
    return `<section class="page-hero container"><h1>A little clarity about your data.</h1><p>How the butter agency website handles enquiries and anonymous website measurement.</p></section><div class="privacy-copy container">${privacySections.map((section) => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}</section>`).join("")}<a href="/contact">Contact the studio</a></div>`;
  if (path === "/labs")
    return `<section class="page-hero container"><h1>A little space for what if.</h1><p>Tools, prototypes and stories from the butter workbench. Explore the ideas, see how they were built and take a closer look at the work.</p></section><section class="labs-projects container"><div class="lab-project-grid">${experiments.map((item, i) => `<a class="lab-project-card${i === 0 ? " featured" : ""}" href="/labs/${item.slug}"><div class="lab-project-preview"><img src="${item.hero.path}" alt="${escape(item.hero.alt)}" width="${item.hero.width}" height="${item.hero.height}" loading="lazy"><span class="lab-status">${item.status}</span></div><div class="lab-project-card-copy"><span class="lab-category">${escape(item.category)}</span><h2>${escape(item.title)}</h2><p>${escape(item.description)}</p><span class="lab-project-action">Explore the project ↗</span></div></a>`).join("")}</div></section>`;
  const lab = experiments.find((item) => path === "/labs/" + item.slug);
  if (lab)
    return `<section class="lab-project-heading container"><a class="studio-back-link" href="/labs">← All projects</a><div class="lab-project-title"><div><h1>${escape(lab.title)}</h1><p>${escape(lab.description)}</p></div><span class="lab-status">${lab.status}</span></div><div class="lab-project-meta"><span>${escape(lab.category)}</span><a href="#screens">Browse the screens</a></div></section><figure class="lab-project-hero container"><img src="${lab.hero.path}" alt="${escape(lab.hero.alt)}" width="${lab.hero.width}" height="${lab.hero.height}"><figcaption>${escape(lab.title)} — ${lab.status.toLowerCase()} project</figcaption></figure><section class="lab-project-story section container"><aside><h2>Inside the idea.</h2><p>${lab.status} · In development</p><details><summary>Built with</summary><ul>${lab.stack.map((item) => `<li>${escape(item)}</li>`).join("")}</ul></details></aside><div>${lab.sections.map((section) => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}</section>`).join("")}</div></section><section class="lab-gallery container" id="screens"><h2>Inside the build.</h2><div class="lab-gallery-grid">${lab.gallery.map((image) => `<figure><a href="${image.path}"><img src="${image.path}" alt="${escape(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy"></a><figcaption>${escape(image.caption)}</figcaption></figure>`).join("")}</div></section><section class="contact-section container"><h2>A small experiment. A bigger possibility.</h2><a href="/contact?service=${encodeURIComponent("A project like " + lab.title)}">Talk about your project</a></section>`;
  const article = articles.find((item) => path === "/journal/" + item.slug);
  if (article) {
    const resources = article.resources?.length
      ? `<section class="journal-resources" aria-labelledby="resources-heading"><h2 id="resources-heading">Sources and further reading.</h2><ul>${article.resources.map((resource) => `<li><a href="${escape(resource.url)}">${escape(resource.title)}</a></li>`).join("")}</ul></section>`
      : "";
    const services = relatedOffers(article.slug, article.enquiryService);
    const serviceLinks = services.length
      ? `<nav class="journal-service-links" aria-label="Services related to this article">${services.map((offer) => `<a class="text-link" href="${offerPath(offer)}">Explore ${escape(offer.title)} ↗</a>`).join("")}</nav>`
      : "";
    const related = relatedArticles(article)
      .map(
        (item) =>
          `<article><h2><a href="/journal/${item.slug}">${escape(item.title)}</a></h2><p>${escape(item.description)}</p></article>`,
      )
      .join("");
    return `<article class="journal-article container"><header><a class="studio-back-link" href="/journal">← All articles</a><h1>${escape(article.title)}</h1><p class="journal-standfirst">${escape(article.description)}</p><div class="journal-byline"><span>butter studio</span><time datetime="${article.date}">${formatArticleDate(article.date)}</time><span>${readMinutes(article)} min read</span></div></header><div class="journal-reading-layout"><nav aria-label="In this article"><span>In this article</span>${article.sections.map((section, i) => `<a href="#section-${i + 1}">${escape(section.heading)}</a>`).join("")}</nav><div class="journal-prose">${article.sections.map((section, i) => `<section id="section-${i + 1}"><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}${section.points ? `<ul>${section.points.map((point) => `<li>${escape(point)}</li>`).join("")}</ul>` : ""}${articleTable(section.table)}</section>`).join("")}${resources}<a href="${escape(article.action.to)}">${escape(article.action.label)} ↗</a>${serviceLinks}</div></div></article><section class="editorial-related container"><h2>A little more reading.</h2><div class="editorial-grid two-columns">${related}</div></section><section class="contact-section container"><h2>Put the thinking to work.</h2><p>A few lines about your team and the challenge are enough to start.</p><a class="pill-button" href="${escape(articleEnquiryPath(article.slug, article.enquiryService))}">Talk about your project ↗</a></section>`;
  }
  const [title, description] = getPageMeta(path);
  let extra = "";
  if (path === "/journal")
    extra = articles
      .map(
        (item) =>
          `<article><h2><a href="/journal/${item.slug}">${escape(item.title)}</a></h2><p>${escape(item.description)}</p></article>`,
      )
      .join("");
  if (path === "/services")
    extra = offers
      .map(
        (item) =>
          `<article><h2><a href="${offerPath(item)}">${escape(item.title)}</a></h2><p>${escape(item.lead)}</p></article>`,
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
  if (project) {
    const placeholder = project.mediaKind === "placeholder";
    const hero = `<figure><img src="${project.hero.path}" alt="${escape(project.hero.alt)}" width="1200" height="675">${placeholder ? `<figcaption>Image placeholder · Project overview</figcaption><p>${escape(project.caseStudy.heroBrief)}</p>` : ""}</figure>`;
    const sections = project.caseStudy.sections
      .map(
        (section, index) => `
      <section>
        <h2>${escape(section.heading)}</h2>
        ${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join("")}
        <figure>
          <img src="${project.gallery[index].path}" alt="${escape(project.gallery[index].alt)}" width="1200" height="675" loading="lazy">
          <figcaption>${placeholder ? "Image placeholder · " : ""}${escape(section.visualTitle)}</figcaption>
          ${placeholder ? `<p>${escape(section.visualBrief)}</p>` : ""}
        </figure>
      </section>`,
      )
      .join("");
    const gallery = `<section class="project-gallery container" aria-label="Project image gallery"><div class="project-gallery-grid">${project.gallery.map((image) => `<a class="project-image-open" href="${image.path}" aria-label="Expand ${escape(image.alt)}"><img src="${image.path}" alt="${escape(image.alt)}" width="1200" height="675" loading="lazy"></a>`).join("")}</div></section>`;
    extra = `<dl class="project-facts"><div><dt>Client</dt><dd>${escape(project.client)}</dd></div><div><dt>Year</dt><dd>${escape(project.year)}</dd></div><div><dt>Project focus</dt><dd>${escape(project.role)}</dd></div></dl>${hero}<h2>The thinking.</h2><p>${escape(project.approach)}</p><ul>${project.deliverables.map((item) => `<li>${escape(item)}</li>`).join("")}</ul><h2>Reported outcome.</h2><p>${escape(project.outcome)}</p>${sections}${gallery}<a class="pill-button" href="/contact?service=${encodeURIComponent(project.caseStudy.service)}">Talk about your project ↗</a>`;
  }
  return `<section class="page-hero container"><h1>${escape(title)}</h1><p>${escape(description)}</p>${extra}<p><a href="/journal">Read the butter journal</a> · <a href="/labs">Explore butter Labs</a> · <a href="/contact">Talk to butter</a></p></section>`;
}
for (const path of routes) {
  const [title, description] = getPageMeta(path),
    url = siteURL + path;
  const seo = `<link rel="canonical" href="${escape(url)}"><meta property="og:type" content="${path.startsWith("/journal/") ? "article" : "website"}"><meta property="og:title" content="${escape("butter — " + title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(url)}"><meta property="og:image" content="${siteURL}/brand/butter-social.png"><meta property="og:site_name" content="butter"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json" id="page-structured-data">${JSON.stringify(structuredData(path, siteURL)).replace(/</g, "\\u003c")}</script>`;
  let html = template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escape("butter — " + title)}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(description)}">`,
    )
    .replace("</head>", seo + "</head>")
    .replace(
      '<div id="root"></div>',
      `<div id="root">${navigation}<main id="main">${content(path)}</main><footer class="footer"><div class="container"><p>butter. A creative learning agency.</p><a href="/contact">Start a conversation</a><p><a href="/elearning-devon">For Devon businesses</a> · <a href="/privacy">Privacy</a></p></div></footer></div>`,
    );
  if (path === "/contact")
    html = html.replace(/<form\b[^>]*\bhidden\b[^>]*>[\s\S]*?<\/form>/, "");
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
