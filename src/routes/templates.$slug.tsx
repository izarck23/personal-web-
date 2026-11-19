import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { TemplateCatalog } from "@/components/templates/catalog";
import { getTemplate } from "@/content/templates";
import { SITE_URL } from "@/components/portfolio/social";
export const Route = createFileRoute("/templates/$slug")({
  staticData: { sitemap: false },
  beforeLoad: ({ params }) => {
    if (!getTemplate(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const item = getTemplate(params.slug);
    const title = `${item?.title ?? "Template unavailable"} — Editable HTML & CSS | CoderTech`;
    const description = item?.description ?? "Browse editable website templates by Isaac.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/templates/${params.slug}` }],
    };
  },
  component: TemplatePage,
});
function TemplatePage() {
  const { slug } = Route.useParams();
  const item = getTemplate(slug);
  if (!item) return null;
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="container section">
        <TemplateCatalog key={slug} selected={item} />
      </main>
      <SiteFooter />
    </div>
  );
}
