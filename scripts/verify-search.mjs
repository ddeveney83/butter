import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { articles, experiments } from "../src/data/editorial.ts";
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
for (const article of articles) {
  const html = await readFile(
    `dist/journal/${article.slug}/index.html`,
    "utf8",
  );
  assert.ok(html.includes(`<h1>${escape(article.title)}</h1>`));
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
  assert.equal(schema.author.name, "Butter studio");
  assert.ok(
    html.includes(
      `href="https://buttertest.netlify.app/journal/${article.slug}"`,
    ),
  );
}
const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const item of articles)
  assert.ok(sitemap.includes("/journal/" + item.slug));
for (const item of experiments)
  assert.ok(sitemap.includes("/labs/" + item.slug));
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
