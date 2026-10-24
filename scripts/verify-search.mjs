import assert from "node:assert/strict";
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
for (const article of articles) {
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
