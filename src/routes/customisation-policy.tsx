import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/customisation-policy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Template Customisation Policy — CoderTech" },
      {
        name: "description",
        content:
          "Details on customisation services, timelines, and deliverables for CoderTech templates.",
      },
      { property: "og:title", content: "Customisation Policy — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/customisation-policy` }],
  }),
  component: CustomisationPolicyPage,
});

function CustomisationPolicyPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Client Services</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Template Customisation Policy
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
            While all CoderTech templates are built for self-customization, clients can engage Isaac
            for full-service branding, section modifications, API connections, and deployment.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Scope of Customisation Services
          </h2>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>Integration of your logo, custom brand fonts, and defined color system.</li>
            <li>
              Content population with your real business text, high-res assets, and contact details.
            </li>
            <li>
              Connection to transactional email endpoints (FormSubmit, Formspree, Resend, or
              SendGrid).
            </li>
            <li>
              M-Pesa Express STK push and payment gateway configuration for commercial checkout.
            </li>
            <li>Custom page additions (Terms, Privacy, FAQs, product catalogs).</li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Turnaround Time
          </h2>
          <p>
            Standard template customization packages are delivered within{" "}
            <strong>3 to 5 business days</strong> from the receipt of all brand assets and
            requirements.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Revision Policy
          </h2>
          <p>
            Each customization package includes up to{" "}
            <strong>two rounds of design and copy revisions</strong> to ensure complete satisfaction
            prior to final production deployment.
          </p>

          <div style={{ marginTop: "24px" }}>
            <Button variant="portfolio" asChild>
              <Link to="/services">
                Request Customisation
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
