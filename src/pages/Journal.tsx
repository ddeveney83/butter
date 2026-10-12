import { useState } from "react";
import { useParams } from "react-router-dom";
import { MotionLink as Link } from "../components/Motion";
import { Arrow, ButterCharacter, Doodle } from "../components/Artwork";
import { PageHero, Reveal, ContactCTA } from "../components/UI";
import { articles, readMinutes, type Article } from "../data/editorial";
import NotFound from "./NotFound";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="editorial-card" to={"/journal/" + article.slug}>
      <div className={"editorial-card-art " + article.icon}>
        <Doodle kind={article.icon} />
        <span aria-hidden="true">Aa.</span>
      </div>
      <div className="editorial-card-copy">
        <span className="editorial-meta">
          {article.topic} · {readMinutes(article)} min read
        </span>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
        <span className="editorial-card-action">
          Read the story <Arrow diagonal />
        </span>
      </div>
    </Link>
  );
}
export default function Journal() {
  const [topic, setTopic] = useState("All articles");
  const topics = [
    "All articles",
    ...new Set(articles.map((article) => article.topic)),
  ];
  const visible = articles.filter(
    (article) => topic === "All articles" || article.topic === topic,
  );
  return (
    <>
      <PageHero
        title={
          <>
            Good ideas.
            <br />
            <span className="underlined">Shared.</span>
          </>
        }
        aside={<ButterCharacter className="journal-mascot" />}
      >
        <p>
          The Butter journal. Practical thoughts on learning design, creative
          production and the technology behind a better experience.
        </p>
      </PageHero>
      <section className="editorial-list container">
        <div className="studio-list-toolbar">
          <div
            className="filter-list"
            role="group"
            aria-label="Filter articles"
          >
            {topics.map((item) => (
              <button
                key={item}
                aria-pressed={item === topic}
                onClick={() => setTopic(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <span role="status">
            {visible.length} {visible.length === 1 ? "article" : "articles"}
          </span>
        </div>
        <div className="editorial-grid">
          {visible.map((article) => (
            <Reveal key={article.slug}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="journal-labs-link container">
        <div>
          <h2>Try the thinking.</h2>
          <p>Our Labs turns small ideas into things you can play with.</p>
        </div>
        <Link className="pill-button" to="/labs">
          Step into Labs <Arrow diagonal />
        </Link>
      </section>
      <ContactCTA />
    </>
  );
}
export function JournalArticle() {
  const { slug } = useParams();
  const article = articles.find((article) => article.slug === slug);
  if (!article) return <NotFound />;
  return (
    <>
      <article className="journal-article container">
        <header>
          <Link className="studio-back-link" to="/journal">
            ← All articles
          </Link>
          <h1>{article.title}</h1>
          <p className="journal-standfirst">{article.description}</p>
          <div className="journal-byline">
            <span>Butter studio</span>
            <time dateTime={article.date}>12 October 2026</time>
            <span>{readMinutes(article)} min read</span>
          </div>
        </header>
        <div className="journal-reading-layout">
          <nav aria-label="In this article">
            <span>In this article</span>
            {article.sections.map((section, i) => (
              <a key={section.heading} href={"#section-" + (i + 1)}>
                {section.heading}
              </a>
            ))}
          </nav>
          <div className="journal-prose">
            {article.sections.map((section, i) => (
              <section id={"section-" + (i + 1)} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <aside className="journal-next-step">
              <Doodle kind={article.icon} />
              <Link className="text-link" to={article.action.to}>
                {article.action.label}
                <Arrow diagonal />
              </Link>
            </aside>
          </div>
        </div>
      </article>
      <section className="editorial-related container">
        <h2>A little more reading.</h2>
        <div className="editorial-grid two-columns">
          {articles
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
