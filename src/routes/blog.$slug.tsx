import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/portfolio/article-card";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";
import { getArticle, relatedArticles } from "@/content/articles";
import { ArticleSharing } from "@/components/portfolio/article-sharing";
import publisherPortrait from "@/assets/generated/publisher-placeholder.jpg";
import { useRef } from "react";
import { ReadingProgress } from "@/components/portfolio/reading-progress";
import { ArticleContents, articleSectionId } from "@/components/portfolio/article-contents";
import { SaveArticle } from "@/components/portfolio/reading-list";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: true },
  beforeLoad: ({ params }) => {
    if (!getArticle(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const article = getArticle(params.slug);
    const title = article ? `${article.title} — CoderTech` : "Article unavailable — CoderTech";
    const description = article?.description ?? "This CoderTech article is unavailable.";
    const url = `${SITE_URL}/blog/${encodeURIComponent(params.slug)}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(!article ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: article ? [{ rel: "canonical", href: url }] : [],
    };
  },
  notFoundComponent: () => (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container">
        <h1 className="section-heading">Article not found</h1>
        <p>This article is unavailable.</p>
        <Button variant="portfolio" asChild>
          <Link to="/blog">
            Back to blog
            <ArrowLeft />
          </Link>
        </Button>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const bodyRef = useRef<HTMLDivElement>(null);
  const article = getArticle(slug);
  if (!article) return null;
  return (
    <div className="portfolio-site">
      <ReadingProgress key={slug} bodyRef={bodyRef} />
      <SiteHeader activeSection="blog" />
      <main>
        <article className="section container article-page">
          <Button variant="portfolioOutline" asChild>
            <Link to="/blog">
              <ArrowLeft aria-hidden="true" />
              All articles
            </Link>
          </Button>
          <header className="article-header">
            <div className="eyebrow">
              {article.category} · {article.type}
            </div>
            <h1>{article.title}</h1>
            <div className="article-publisher">
              <img
                src={publisherPortrait}
                alt="Temporary AI-generated publisher avatar, not Isaac’s real photo"
                width={56}
                height={56}
                loading="lazy"
              />
              <div>
                <p>
                  Published by <strong>Isaac</strong> · Estimated reading time:{" "}
                  {article.readMinutes} min
                </p>
                <span>Temporary illustrated profile picture</span>
              </div>
            </div>
            <ArticleSharing
              key={slug}
              title={article.title}
              url={`${SITE_URL}/blog/${encodeURIComponent(slug)}`}
            />
            <SaveArticle key={`save-${slug}`} slug={slug} title={article.title} />
          </header>
          <figure className="article-cover">
            <img src={article.image} alt={article.imageAlt} width={1200} height={800} />
            <figcaption>AI-generated illustration</figcaption>
          </figure>
          <ArticleContents article={article} />
          <div ref={bodyRef} className="article-body">
            <p>{article.intro}</p>
            {article.sections.map((section, index) => (
              <section key={section.heading}>
                <h2 id={articleSectionId(section.heading, index)} tabIndex={-1}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <pre>
                    <code>{section.code}</code>
                  </pre>
                )}
              </section>
            ))}
            <section>
              <h2 id="key-takeaways" tabIndex={-1}>
                Key takeaways
              </h2>
              <p>{article.summary}</p>
            </section>
            <section>
              <p>{article.cta}</p>
              <Button variant="portfolio" asChild>
                <Link to="/" hash="contact">
                  Let’s Discuss
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
            </section>
          </div>
        </article>
        <section className="section container related-articles">
          <h2 className="section-heading">
            Related <span className="orange">articles</span>
          </h2>
          <div className="article-grid">
            {relatedArticles(article).map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
