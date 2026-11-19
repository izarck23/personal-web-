import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";

export const Route = createFileRoute("/license")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Digital Product License Agreement — CoderTech" },
      {
        name: "description",
        content: "License terms for templates and source code downloaded from CoderTech.",
      },
      { property: "og:title", content: "Product License Agreement — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/license` }],
  }),
  component: LicensePage,
});

function LicensePage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Template Licensing</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Digital Product License
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
            Every template (both Free and Premium) obtained from the CoderTech marketplace is
            subject to this license agreement between you (the Licensee) and CoderTech / Isaac
            Simiyu (the Licensor).
          </p>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            What You Can Do (Permitted Uses):
          </h2>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>Use the template for unlimited personal projects.</li>
            <li>
              Use the template to build unlimited commercial websites or applications for your
              clients.
            </li>
            <li>
              Modify, adapt, combine, and alter the HTML, CSS, and JavaScript source code to suit
              your specific requirements.
            </li>
            <li>Host the compiled/built website on any public or private server.</li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            What You Cannot Do (Prohibitions):
          </h2>
          <ul style={{ paddingLeft: "20px", listStyle: "disc" }}>
            <li>
              Resell, redistribute, license, or sub-license the raw template files or ZIP archives
              as a standalone digital asset.
            </li>
            <li>
              Include the template source in another marketplace, theme store, or website generator
              without explicit written permission.
            </li>
            <li>
              Claim original copyright or ownership of the base template designs without substantial
              transformation.
            </li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: "700", marginTop: "16px" }}>
            Open Source vs. Commercial:
          </h2>
          <p>
            Templates designated as "Free" are shared for the community under permissive terms for
            individual and educational use. Premium templates provide enhanced UI components,
            multi-screen layouts, and email support.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
