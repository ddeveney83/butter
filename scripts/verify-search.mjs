import assert from "node:assert/strict";
import { projects } from "../src/data/projects.ts";
import { offers, offerPath, relatedOffers } from "../src/data/offers.ts";
import { publicPaths } from "../src/data/publicPaths.ts";
import { getPageMeta } from "../src/data/seo.ts";
import { readFile, readdir, access } from "node:fs/promises";
import {
  articles,
  experiments,
  formatArticleDate,
  relatedArticles,
} from "../src/data/editorial.ts";
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
for (const field of ["slug", "title", "description"]) {
  assert.equal(
    new Set(articles.map((article) => article[field])).size,
    articles.length,
    `Article ${field}s must be unique.`,
  );
}
const journalIndex = await readFile("dist/journal/index.html", "utf8");
const workIndex = await readFile("dist/work/index.html", "utf8");
const servicesIndex = await readFile("dist/services/index.html", "utf8");
assert.equal(offers.length, 8);
assert.equal(new Set(offers.map((offer) => offer.slug)).size, offers.length);
for (const offer of offers) {
  const path = offerPath(offer);
  const html = await readFile(`dist${path}/index.html`, "utf8");
  assert.ok(servicesIndex.includes(`href="${path}"`));
  assert.ok(html.includes(`<h1>${escape(offer.headline)}</h1>`));
  assert.ok(
    html.includes(`name="description" content="${escape(offer.description)}"`),
  );
  assert.ok(html.includes('"@type":"Service"'));
  assert.ok(
    html.includes(escape(offer.need)) && html.includes(escape(offer.approach)),
  );
  for (const id of offer.projects) {
    assert.ok(
      projects.some((project) => project.id === id),
      `Missing project ${id}`,
    );
    assert.ok(html.includes(`href="/work/${id}"`));
  }
  for (const slug of offer.articles) {
    assert.ok(
      articles.some((article) => article.slug === slug),
      `Missing article ${slug}`,
    );
    assert.ok(html.includes(`href="/journal/${slug}"`));
  }
  for (const question of offer.questions)
    assert.ok(html.includes(escape(question.answer)));
}
assert.equal(projects.length, 14);
for (const project of projects) {
  assert.ok(workIndex.includes(`href="/work/${project.id}"`));
  const html = await readFile(`dist/work/${project.id}/index.html`, "utf8");
  assert.ok(html.includes(`<h1>${escape(project.title)}</h1>`));
  assert.ok(html.includes(escape(project.outcome)));
  assert.equal(project.caseStudy.sections.length, 3);
  assert.equal(project.gallery.length, project.caseStudy.sections.length);
  if (project.mediaKind === "placeholder") {
    assert.ok(project.caseStudy.heroBrief);
    assert.ok(html.includes(escape(project.caseStudy.heroBrief)));
  }
  assert.ok(
    html.includes(`service=${encodeURIComponent(project.caseStudy.service)}`),
  );
  assert.equal(
    (html.match(/<figcaption>Image placeholder/g) || []).length,
    project.mediaKind === "placeholder" ? 4 : 0,
  );
  for (const section of project.caseStudy.sections) {
    assert.ok(html.includes(`<h2>${escape(section.heading)}</h2>`));
    for (const paragraph of section.paragraphs)
      assert.ok(html.includes(escape(paragraph)));
    if (project.mediaKind === "placeholder") {
      assert.ok(section.visualBrief);
      assert.ok(html.includes(escape(section.visualBrief)));
    }
  }
  for (const image of [project.hero, ...project.gallery]) {
    await access(`public${image.path}`);
    assert.ok(html.includes(image.path));
  }
  const gallery = html.match(
    /<section class="project-gallery container".*?<\/section>/s,
  )?.[0];
  assert.ok(gallery, "All projects need a static image gallery.");
  assert.doesNotMatch(
    gallery,
    /<(?:h[1-6]|p|figcaption)\b/,
    "The gallery must have no visible copy.",
  );
  for (const image of project.gallery) assert.ok(gallery.includes(image.path));
}
for (const article of articles) {
  assert.ok(
    relatedOffers(article.slug, article.enquiryService).length > 0,
    `Article ${article.slug} needs a relevant service and enquiry route.`,
  );
  const html = await readFile(
    `dist/journal/${article.slug}/index.html`,
    "utf8",
  );
  assert.ok(html.includes(`<h1>${escape(article.title)}</h1>`));
  assert.ok(
    html.includes(`<title>${escape("butter — " + article.title)}</title>`),
  );
  assert.ok(
    html.includes(
      `name="description" content="${escape(article.description)}"`,
    ),
  );
  assert.ok(
    html.includes(
      `<time datetime="${article.date}">${formatArticleDate(article.date)}</time>`,
    ),
  );
  assert.ok(
    journalIndex.includes(`href="/journal/${article.slug}"`),
    "Every article needs a crawlable index link.",
  );
  for (const resource of article.resources || [])
    assert.ok(
      html.includes(`href="${escape(resource.url)}"`),
      "Further reading must exist without JavaScript.",
    );
  for (const slug of article.relatedSlugs || [])
    assert.ok(
      articles.some((candidate) => candidate.slug === slug),
      `Related article ${slug} must exist.`,
    );
  const related = relatedArticles(article);
  for (const offer of relatedOffers(article.slug, article.enquiryService))
    assert.ok(
      html.includes(`href="${offerPath(offer)}"`),
      "Service links must be crawlable from relevant articles.",
    );
  assert.equal(related.length, 2);
  assert.equal(new Set(related.map((item) => item.slug)).size, 2);
  for (const item of related)
    assert.ok(
      html.includes(`href="/journal/${item.slug}"`),
      "Related links must be crawlable.",
    );
  for (const section of article.sections)
    for (const paragraph of section.paragraphs)
      assert.ok(
        html.includes(`<p>${escape(paragraph)}</p>`),
        "Article text must exist before JavaScript runs.",
      );
  for (const section of article.sections) {
    if (!section.table) continue;
    assert.ok(
      html.includes(`<caption>${escape(section.table.caption)}</caption>`),
    );
    for (const column of section.table.columns)
      assert.ok(html.includes(`<th scope="col">${escape(column)}</th>`));
    for (const row of section.table.rows) {
      assert.equal(
        row.length,
        section.table.columns.length,
        "Comparison rows must match the table headings.",
      );
      for (const [i, cell] of row.entries())
        assert.ok(
          html.includes(
            i === 0
              ? `<th scope="row">${escape(cell)}</th>`
              : `<td>${escape(cell)}</td>`,
          ),
        );
    }
  }
  const schema = JSON.parse(
    html.match(
      /<script type="application\/ld\+json" id="page-structured-data">(.*?)<\/script>/s,
    )[1],
  );
  assert.equal(schema["@type"], "BlogPosting");
  assert.equal(schema.headline, article.title);
  assert.equal(schema.author.name, "butter studio");
  assert.equal(schema.datePublished, article.date);
  assert.equal(schema.inLanguage, "en-GB");
  assert.ok(Number.isInteger(schema.wordCount) && schema.wordCount > 0);
  for (const section of article.sections)
    for (const cell of section.table?.rows.flat() || [])
      assert.ok(
        schema.articleBody.includes(cell),
        "Structured article text must include comparison content.",
      );
  assert.deepEqual(
    schema.citation || [],
    (article.resources || []).map((resource) => resource.url),
  );
  assert.ok(
    html.includes(
      `href="https://buttertest.netlify.app/journal/${article.slug}"`,
    ),
  );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.ok(!sitemap.includes("/services/staff-onboarding"));
assert.equal(
  new Set(publicPaths).size,
  publicPaths.length,
  "Public routes must be unique.",
);
for (const path of publicPaths) {
  assert.notEqual(
    getPageMeta(path)[0],
    "A little lost?",
    `Missing metadata for ${path}`,
  );
  assert.ok(
    sitemap.includes(`<loc>https://buttertest.netlify.app${path}</loc>`),
    `Missing sitemap entry for ${path}`,
  );
}
for (const item of articles)
  assert.ok(sitemap.includes("/journal/" + item.slug));
for (const item of experiments) {
  assert.ok(sitemap.includes("/labs/" + item.slug));
  const page = await readFile(`dist/labs/${item.slug}/index.html`, "utf8");
  assert.ok(page.includes(`<h1>${escape(item.title)}</h1>`));
  assert.ok(page.includes('"@type":"CreativeWork"'));
  assert.ok(page.includes(`"creativeWorkStatus":"${item.status}"`));
  for (const section of item.sections)
    for (const paragraph of section.paragraphs)
      assert.ok(
        page.includes(`<p>${escape(paragraph)}</p>`),
        "Labs project notes must exist before JavaScript.",
      );
  for (const asset of [item.hero, ...item.gallery]) {
    await access("dist" + asset.path);
    assert.ok(page.includes(`src="${asset.path}"`));
  }
}
assert.ok(!sitemap.includes("/pricing"));
assert.ok(!sitemap.includes("what-does-elearning-cost"));
assert.ok(!sitemap.includes("the-better-question"));
const publicHTML = [];
async function inspectHTML(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) await inspectHTML(directory + "/" + entry.name);
    else if (entry.name.endsWith(".html"))
      publicHTML.push(await readFile(directory + "/" + entry.name, "utf8"));
  }
}
await inspectHTML("dist");
for (const page of publicHTML) {
  assert.doesNotMatch(
    page,
    /href="[^\"]*\/pricing|name="budget"|calculator_used|name="estimate"|£|indicative budgets|Subscription pricing/i,
  );
  assert.doesNotMatch(page, /daniel|deveney/i);
  assert.doesNotMatch(
    page,
    /href="[^\"]*\/services\/staff-onboarding/,
    "Retired services must not remain in public links.",
  );
}
assert.ok(!sitemap.includes("/butterlearn/app"));
for (const file of await readdir("dist/assets")) {
  if (!file.endsWith(".js")) continue;
  const script = await readFile("dist/assets/" + file, "utf8");
  assert.doesNotMatch(
    script,
    /daniel|deveney|ddeveney83@gmail/i,
    "Public JavaScript must not contain personal references or the contact destination.",
  );
}
const html = await readFile("dist/index.html", "utf8");
assert.ok(html.includes('name="butter-contact"'));
assert.doesNotMatch(html, /daniel|deveney/i);
console.log(
  "Static article text, organization attribution, canonical links, sitemap and public bundle privacy verified.",
);
