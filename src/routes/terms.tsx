import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Terms of Service — CoderTech" },
      { name: "description", content: "Terms and conditions of service for CoderTech." },
      { property: "og:title", content: "Terms of Service — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Legal & Compliance</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Terms of Service
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            color: "var(--foreground)",
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          <p>
            <strong>Effective Date:</strong> January 2026
          </p>
          <p>
            By accessing CoderTech (codertech.dev) or purchasing digital templates and development
            services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            1. Digital Products
          </h2>
          <p>
            Digital templates sold on CoderTech are provided in clean HTML5, CSS3, and JavaScript
            format. While templates are tested for cross-browser compatibility and responsive
            performance, you are responsible for connecting your own server endpoints, form
            handlers, and hosting infrastructure.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            2. Consulting & Development Contracts
          </h2>
          <p>
            Custom development services (Android applications, web applications, backend
            integrations) are governed by specific project scopes, milestones, and deliverable
            agreements agreed upon prior to commencement.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            3. Intellectual Property
          </h2>
          <p>
            All website designs, branding, logos, and proprietary source code produced by CoderTech
            remain the intellectual property of Isaac Simiyu until transferred under written
            contract. Purchased template licenses confer rights as detailed in our Digital Product
            License.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            4. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of the Republic of Kenya. Any disputes shall be
            resolved through good-faith technical mediation or courts located in Nairobi, Kenya.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
