import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/portfolio/article-card";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { articles } from "@/content/articles";
import { SITE_URL } from "@/components/portfolio/social";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useReadingList } from "@/components/portfolio/reading-list";
import { Search } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "App & Landing Page Development Blog — Isaac, Kenya" },
      {
        name: "description",
        content:
          "Guides by Isaac, a Kenyan software developer, and tutorials on app development, AI-assisted coding, responsive websites and website SEO.",
      },
      { property: "og:title", content: "App & Landing Page Development Blog — Isaac, Kenya" },
      {
        property: "og:description",
        content: "Practical guides and tutorials on app development, coding and website SEO.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
  }),
  component: Blog,
});

const BLOG_CATEGORIES = [
  "All",
  "App Development",
  "Website Development",
  "Landing Pages",
  "AI-Assisted Coding",
  "SEO",
  "Developer Tools",
];

function Blog() {
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { saved, ready, error } = useReadingList();

  const filtered = articles.filter((article) => {
    const matchesSaved = !savedOnly || saved.includes(article.slug);
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSaved && matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-site">
      <SiteHeader activeSection="blog" />
      <main className="section container">
        <div className="eyebrow">Development Journal & Engineering Insights</div>
        <h1 className="section-heading">
          CoderTech <span className="orange">Blog</span>
        </h1>
        <p
          style={{ maxWidth: "680px", color: "var(--muted-foreground)", marginBlock: "10px 24px" }}
        >
          Practical tutorials, architecture guides, and technical insights on Android Kotlin
          development, high-performance web frontends, and AI developer workflows by Isaac Simiyu.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            className="reading-list-controls"
            role="group"
            aria-label="Article view"
            style={{ margin: 0 }}
          >
            <Button
              variant={savedOnly ? "portfolioOutline" : "portfolio"}
              aria-pressed={!savedOnly}
              onClick={() => setSavedOnly(false)}
            >
              All Articles ({articles.length})
            </Button>
            <Button
              variant={savedOnly ? "portfolio" : "portfolioOutline"}
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly(true)}
            >
              Reading List{ready ? ` (${saved.length})` : ""}
            </Button>
          </div>

          <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
            <Search
              className="w-4 h-4"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted-foreground)",
              }}
            />
            <input
              type="text"
              className="marketplace-search-input"
              style={{ paddingLeft: "38px", width: "100%" }}
              placeholder="Search articles by topic, keyword, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
        </div>

        <div
          className="marketplace-categories"
          style={{ marginBottom: "28px" }}
          role="group"
          aria-label="Filter articles by category"
        >
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && <p role="status">{error}</p>}

        {savedOnly && !ready ? (
          <p role="status">Loading reading list…</p>
        ) : filtered.length ? (
          <div className="article-grid">
            {filtered.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div
            style={{ textAlign: "center", padding: "48px 16px", color: "var(--muted-foreground)" }}
          >
            <p role="status" className="reading-list-empty">
              {savedOnly
                ? "No saved articles in your reading list yet. Click the bookmark icon on any article card to save it."
                : "No articles found matching your criteria."}
            </p>
            {(!savedOnly || searchQuery) && (
              <Button
                variant="portfolioOutline"
                style={{ marginTop: "12px" }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSavedOnly(false);
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
