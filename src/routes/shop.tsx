import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { TemplateCatalog } from "@/components/templates/catalog";
import { SITE_URL } from "@/components/portfolio/social";
export const Route = createFileRoute("/shop")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Editable HTML & CSS Templates — Isaac | CoderTech Shop" },
      {
        name: "description",
        content:
          "Preview landing pages, startup websites and authentication screens by Isaac. Download standalone editable HTML and CSS or request a custom project.",
      },
      { property: "og:title", content: "CoderTech Template Shop — Isaac" },
      {
        property: "og:description",
        content:
          "Standalone editable landing-page, startup and authentication UI templates with live previews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/shop` }],
  }),
  component: Shop,
});
function Shop() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="container section">
        <TemplateCatalog />
      </main>
      <SiteFooter />
    </div>
  );
}
