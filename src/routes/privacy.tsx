import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Privacy Policy — CoderTech" },
      { name: "description", content: "Privacy policy for CoderTech and digital product orders." },
      { property: "og:title", content: "Privacy Policy — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Legal & Compliance</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Privacy Policy
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
            CoderTech (“we”, “our”, or “us”), operated by Isaac Simiyu in Nairobi, Kenya, values
            your privacy and is committed to protecting your personal data. This policy explains
            what information we collect, how it is used, and how your rights are respected.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            1. Information We Collect
          </h2>
          <p>
            We collect information you explicitly provide when submitting contact forms, requesting
            project proposals, or purchasing digital templates. This includes your name, email
            address, phone number (for M-Pesa billing verification), and project requirements.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            2. How Information is Used
          </h2>
          <p>Collected details are used solely to:</p>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>Deliver digital product source files and documentation to your email.</li>
            <li>Respond to project quotes, technical consultations, and freelance requests.</li>
            <li>Verify M-Pesa and card payment transactions.</li>
          </ul>
          <p>We do not sell, rent, or lease personal information to any third parties.</p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            3. Data Storage & Security
          </h2>
          <p>
            Customer submissions are stored securely in encrypted databases. Payment credentials
            (card numbers, PINs) are processed directly through certified financial providers (such
            as Safaricom M-Pesa and Stripe) and are never stored on our servers.
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            4. Contact & Inquiries
          </h2>
          <p>
            For any questions regarding your data or to request data removal, contact Isaac Simiyu
            directly at <strong>codingspace254@gmail.com</strong>.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
