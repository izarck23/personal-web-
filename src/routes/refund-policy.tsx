import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";

export const Route = createFileRoute("/refund-policy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Refund Policy — CoderTech" },
      {
        name: "description",
        content: "Refund policy for digital template purchases on CoderTech.",
      },
      { property: "og:title", content: "Refund Policy — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/refund-policy` }],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Customer Protection</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Refund Policy
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
            Because digital templates and code downloads cannot be returned once access is granted,
            purchases are generally non-refundable. However, we stand behind our code quality and
            offer fair resolutions under specific conditions.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Eligibility for Refund or Correction
          </h2>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>
              <strong>Corrupted or Inaccessible Files:</strong> If the ZIP archive is corrupt and
              our support cannot provide a working copy within 48 hours.
            </li>
            <li>
              <strong>Substantial Discrepancy:</strong> If the delivered code materially lacks
              features explicitly shown in the live preview.
            </li>
            <li>
              <strong>Duplicate Charges:</strong> In the event of an accidental double charge via
              M-Pesa or card.
            </li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Non-Eligible Situations
          </h2>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>Change of mind after downloading the complete uncompiled source files.</li>
            <li>
              Incompatibility with third-party software not listed in the product specifications.
            </li>
            <li>
              Lack of fundamental HTML/CSS technical skills required to customize standalone static
              files.
            </li>
          </ul>

          <p>
            If you encounter any difficulty with a purchased template, email Isaac at{" "}
            <strong>codingspace254@gmail.com</strong> with your order details, and we will assist
            promptly.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
