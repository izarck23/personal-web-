import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article } from "@/content/articles";
import { SaveArticle } from "./reading-list";

export function ArticleCard({
  article,
  selected = false,
}: {
  article: Article;
  selected?: boolean;
}) {
  return (
    <article className={`blog-card ${selected ? "selected" : ""}`}>
      <div className="blog-image">
        <Link to="/blog/$slug" params={{ slug: article.slug }} aria-label={`Read ${article.title}`}>
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={900}
            loading="lazy"
          />
        </Link>
        <div className="card-arrow">
          <Button variant="portfolioIcon" size="icon" asChild>
            <Link
              to="/blog/$slug"
              params={{ slug: article.slug }}
              title={`Read ${article.title}`}
              aria-label={`Read ${article.title}`}
            >
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
      <span className="blog-type">{article.category}</span>
      <h3>
        <Link to="/blog/$slug" params={{ slug: article.slug }}>
          {article.title}
        </Link>
      </h3>
      <p>{article.description}</p>
      <div className="blog-meta">
        <span>Isaac</span>
        <span>
          {article.readMinutes} min read · {article.type}
        </span>
      </div>
      <SaveArticle slug={article.slug} title={article.title} />
    </article>
  );
}
