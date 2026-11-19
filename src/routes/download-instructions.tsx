import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";

export const Route = createFileRoute("/download-instructions")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Template Download & Setup Instructions — CoderTech" },
      {
        name: "description",
        content: "Step-by-step guide on extracting, editing and publishing CoderTech templates.",
      },
      { property: "og:title", content: "Download & Setup Guide — CoderTech" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/download-instructions` }],
  }),
  component: DownloadInstructionsPage,
});

function DownloadInstructionsPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container" style={{ maxWidth: "800px" }}>
        <div className="eyebrow">Developer Documentation</div>
        <h1 className="section-heading" style={{ marginBottom: "24px" }}>
          Template Setup Guide
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            color: "var(--foreground)",
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          <p>
            All CoderTech templates are engineered with zero complex build tools or heavy
            node_modules dependencies. You can run and customize them directly on any desktop or
            mobile device.
          </p>

          <div style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>
              Step 1: Extract the ZIP Archive
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Extract the downloaded <code>.zip</code> file into a dedicated project directory on
              your computer or mobile workspace (outside the main CoderTech website repository).
            </p>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>
              Step 2: Open in an Editor
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Open the extracted directory in your favorite code editor (e.g. Visual Studio Code,
              Cursor, Sublime Text, or mobile editors like Acode on Android / Termux).
            </p>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>
              Step 3: Customize Styles & Copy
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Edit <code>index.html</code> to replace headline and paragraph text. Open{" "}
              <code>styles.css</code> and update the CSS Custom Properties declared in the{" "}
              <code>:root</code> block (e.g., <code>--primary</code>, <code>--brand</code>,{" "}
              <code>--dark</code>) to instantly align with your brand's palette.
            </p>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>
              Step 4: Local Preview
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Double-click <code>index.html</code> to open it directly in your browser.
              Alternatively, run a lightweight local server:
            </p>
            <pre
              style={{
                background: "var(--muted)",
                padding: "12px",
                borderRadius: "8px",
                overflowX: "auto",
                marginBlock: "8px",
              }}
            >
              <code>python -m http.server 8000 # Visit http://localhost:8000</code>
            </pre>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>
              Step 5: Publish Online
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Deploy in seconds by dragging the folder into Cloudflare Pages, Netlify Drop, Vercel,
              GitHub Pages, or standard cPanel / Apache / Nginx web hosting.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
