import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";
import { Button } from "@/components/ui/button";
import isaacPortrait from "@/assets/isaac-professional.webp";
import { ArrowUpRight, CheckCircle2, Code2, Cpu, Smartphone, Terminal } from "lucide-react";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About Isaac Simiyu — Software & App Developer | CoderTech" },
      {
        name: "description",
        content:
          "Professional biography of Isaac Simiyu, software and mobile app developer based in Kenya. Specializing in Android Kotlin, Jetpack Compose, TypeScript, React and cloud systems.",
      },
      { property: "og:title", content: "About Isaac Simiyu — CoderTech" },
      {
        property: "og:description",
        content: "Software engineering background, architecture values, and technical stack.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="portfolio-site">
      <SiteHeader activeSection="about" />
      <main className="section container">
        <div className="eyebrow">Professional Biography</div>
        <h1 className="section-heading">
          Engineering with <span className="orange">Purpose & Precision</span>
        </h1>

        <div className="about-layout" style={{ marginBlock: "36px 56px" }}>
          <div className="about-portrait">
            <div className="portrait-disc">
              <img
                src={isaacPortrait}
                alt="Isaac Simiyu, founder of CoderTech and software developer"
                className="portrait-photo"
                width={360}
                height={360}
                loading="eager"
              />
            </div>
          </div>

          <div className="about-copy">
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}>
              Hi, I'm Isaac Simiyu — Software & App Developer from Kenya.
            </h2>
            <p>
              I build performant web applications, native Android experiences, and robust backend
              integrations. My philosophy centers on writing clean, maintainable code that delivers
              measurable value to users and businesses without relying on bloated dependencies or
              superficial frameworks.
            </p>
            <p>
              Through CoderTech, I develop production-grade digital tools — including the Genzii
              Originality Checker (an Android application for academic and content verification),
              high-performance digital template boilerplates, and bespoke web platforms for
              businesses in Kenya and worldwide.
            </p>

            <div
              style={{
                marginBlock: "24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              <div
                style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}
              >
                <Smartphone className="w-5 h-5 text-purple-600 mb-2" />
                <h3 style={{ fontSize: "14px", fontWeight: "700" }}>Native Android</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  Kotlin, Jetpack Compose, MVVM, Room DB, Firebase Auth
                </p>
              </div>

              <div
                style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}
              >
                <Code2 className="w-5 h-5 text-blue-600 mb-2" />
                <h3 style={{ fontSize: "14px", fontWeight: "700" }}>Modern Web</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  TypeScript, React 19, Tailwind CSS, TanStack Start
                </p>
              </div>

              <div
                style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px" }}
              >
                <Terminal className="w-5 h-5 text-emerald-600 mb-2" />
                <h3 style={{ fontSize: "14px", fontWeight: "700" }}>Cloud & APIs</h3>
                <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  PostgreSQL, Google Cloud, M-Pesa Daraja, Gemini AI
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}>
              <Button variant="portfolio" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button variant="portfolioOutline" asChild>
                <Link to="/shop">Browse Template Shop</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "48px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Software Engineering Standards
          </h2>
          <div className="template-grid">
            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Zero Fabrications
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>
                Every score, verification result, testimonial, or metric displayed in my
                applications is grounded in real data and verified tests. No mock shortcuts in
                production.
              </p>
            </div>

            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <Cpu className="w-5 h-5 text-purple-600" />
                Performance First
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>
                Clean semantic markup, minimal asset payloads, sub-second initial loads, and
                accessible navigation across low-bandwidth and high-end connections alike.
              </p>
            </div>

            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "24px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  marginBottom: "10px",
                }}
              >
                <Terminal className="w-5 h-5 text-blue-600" />
                Security & Isolation
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>
                Server-side token verification, private network protection, isolated environment
                secrets, and strict HTTPS communication across all endpoints.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
