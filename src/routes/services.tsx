import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";
import { Button } from "@/components/ui/button";
import { sendInquiry } from "@/lib/contact.functions";
import {
  Globe,
  Smartphone,
  Layout,
  Database,
  Sliders,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Custom Development Services — Isaac | CoderTech Kenya" },
      {
        name: "description",
        content:
          "Professional custom software engineering services by Isaac: Android Kotlin apps, responsive websites, high-converting landing pages, backend API integrations, and template customization.",
      },
      { property: "og:title", content: "Custom Development Services — CoderTech" },
      {
        property: "og:description",
        content:
          "Hire Isaac for Android applications, full-stack websites, landing pages, and backend cloud systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/services` }],
  }),
  component: ServicesPage,
});

type ServiceTrack =
  | "Website Development"
  | "Android Application"
  | "Landing Page Development"
  | "Backend Integration"
  | "Template Customisation";

const SERVICE_TRACKS: {
  title: ServiceTrack;
  icon: typeof Globe;
  tagline: string;
  description: string;
  deliverables: string[];
  startingPrice: string;
}[] = [
  {
    title: "Website Development",
    icon: Globe,
    tagline: "Corporate, SME & Brand Portals",
    description:
      "Modern, ultra-fast web platforms built with React, TypeScript, and clean responsive CSS. Optimized for Core Web Vitals, local search SEO, and conversion.",
    deliverables: [
      "Custom responsive design (Desktop, Tablet, Mobile)",
      "SEO metadata & schema structured data",
      "Interactive contact forms & booking flows",
      "Zero-dependency or modern headless CMS",
    ],
    startingPrice: "From KSh 45,000 / $350 USD",
  },
  {
    title: "Android Application",
    icon: Smartphone,
    tagline: "Native Android & Jetpack Compose",
    description:
      "Robust Kotlin mobile applications engineered with Material 3, clean architecture, MVVM, and offline-first persistence. Built for real production scale.",
    deliverables: [
      "Modern declarative Jetpack Compose UI",
      "Room database & Firestore offline sync",
      "RESTful API & Firebase Authentication",
      "Google Play Store release preparation",
    ],
    startingPrice: "From KSh 80,000 / $600 USD",
  },
  {
    title: "Landing Page Development",
    icon: Layout,
    tagline: "High-Converting Product Pages",
    description:
      "Laser-focused sales pages, product showcase funnels, and early-access waitlists engineered for speed, crisp visual hierarchy, and maximum engagement.",
    deliverables: [
      "Sub-second load times with lightweight code",
      "Engaging value proposition & feature grids",
      "Integrated email capture / M-Pesa hooks",
      "A/B testing-friendly semantic structure",
    ],
    startingPrice: "From KSh 20,000 / $150 USD",
  },
  {
    title: "Backend Integration",
    icon: Database,
    tagline: "APIs, Firestore, Cloud Functions & Payments",
    description:
      "Secure backend systems connecting your frontend to Cloud Firestore, PostgreSQL, M-Pesa Daraja STK push, Stripe, or Google Gemini AI APIs.",
    deliverables: [
      "M-Pesa STK push & C2B payment webhooks",
      "Firebase Auth & role-based security rules",
      "Serverless Cloud Functions & Express APIs",
      "Secure server-side API credential isolation",
    ],
    startingPrice: "From KSh 35,000 / $270 USD",
  },
  {
    title: "Template Customisation",
    icon: Sliders,
    tagline: "Tailor Any CoderTech Template",
    description:
      "Fast turnaround adaptation of any CoderTech template to match your brand palette, typography, custom pages, and integrated backend services.",
    deliverables: [
      "Brand styling & logo integration",
      "Custom section additions & copywriting setup",
      "Form endpoint setup & email notifications",
      "Free 30-day post-launch technical support",
    ],
    startingPrice: "From KSh 12,000 / $95 USD",
  },
];

const BUDGET_OPTIONS = [
  "Under KSh 25,000 (< $200 USD)",
  "KSh 25,000 – 50,000 ($200 – $400 USD)",
  "KSh 50,000 – 100,000 ($400 – $800 USD)",
  "KSh 100,000 – 250,000 ($800 – $2,000 USD)",
  "Over KSh 250,000 (> $2,000 USD)",
];

const TIMELINE_OPTIONS = [
  "Urgent (Within 1 week)",
  "Standard (1 – 2 weeks)",
  "Comfortable (2 – 4 weeks)",
  "Flexible / Discovery phase",
];

function ServicesPage() {
  const [selectedTrack, setSelectedTrack] = useState<ServiceTrack>("Website Development");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState(BUDGET_OPTIONS[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1]);
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    const fullMessage = `
[SERVICE ENQUIRY]
Service Type: ${selectedTrack}
Estimated Budget: ${budget}
Timeline: ${timeline}

Project Description:
${requirements}
    `.trim();

    try {
      const res = await sendInquiry({
        data: {
          name,
          email,
          message: fullMessage,
        },
      });

      if (res.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you! Your project inquiry has been received. Isaac will review your specifications and reply via email within 24 hours.",
        );
        setName("");
        setEmail("");
        setRequirements("");
      } else {
        setStatus("error");
        setStatusMessage(
          "We couldn't deliver your message right now. Please email directly at codingspace254@gmail.com.",
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error occurred. Please try again or reach out directly via email.");
    }
  }

  return (
    <div className="portfolio-site">
      <SiteHeader activeSection="services" />
      <main className="section container">
        <div className="eyebrow">Engineering & Consulting</div>
        <h1 className="section-heading">
          Custom Development <span className="orange">Services</span>
        </h1>
        <p
          style={{
            maxWidth: "720px",
            color: "var(--muted-foreground)",
            marginBlock: "12px 36px",
            fontSize: "15px",
          }}
        >
          Whether launching a new Android application from scratch, modernizing an existing business
          website, or integrating M-Pesa payments into your stack, I provide hands-on technical
          execution with clear timelines and verified code.
        </p>

        {/* Services Tracks Grid */}
        <div className="template-grid" style={{ marginBottom: "56px" }}>
          {SERVICE_TRACKS.map((track) => {
            const Icon = track.icon;
            const isSelected = selectedTrack === track.title;
            return (
              <div
                key={track.title}
                className="template-item"
                style={{
                  border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isSelected ? "var(--accent-soft)" : "var(--background)",
                }}
                onClick={() => setSelectedTrack(track.title)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: isSelected ? "var(--primary)" : "var(--muted)",
                      color: isSelected ? "var(--primary-foreground)" : "var(--foreground)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-accent)" }}
                  >
                    {track.startingPrice}
                  </span>
                </div>

                <div className="eyebrow" style={{ margin: "4px 0 6px" }}>
                  {track.tagline}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>
                  {track.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    marginBottom: "16px",
                    flex: 1,
                  }}
                >
                  {track.description}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {track.deliverables.map((del) => (
                    <li
                      key={del}
                      style={{
                        fontSize: "12px",
                        color: "var(--muted-foreground)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={isSelected ? "portfolio" : "portfolioOutline"}
                  style={{ width: "100%", marginTop: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTrack(track.title);
                    const formElement = document.getElementById("enquiry-form");
                    formElement?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {isSelected ? "Track Selected" : "Select Service"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Interactive Project Enquiry Form */}
        <section
          id="enquiry-form"
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "36px",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            background: "var(--background)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span className="eyebrow">Direct Project Quote</span>
            <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "8px" }}>
              Request a Project Proposal
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
              Selected track:{" "}
              <strong style={{ color: "var(--text-accent)" }}>{selectedTrack}</strong>. Fill out the
              details below for a tailored technical estimate.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Isaac Simiyu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "14px",
                    background: "var(--background)",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "14px",
                    background: "var(--background)",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Estimated Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                    background: "var(--background)",
                  }}
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Desired Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                    background: "var(--background)",
                  }}
                >
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "6px",
                }}
              >
                Project Overview & Requirements *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you want to build, existing systems or designs you have, key user features, and target launch timeframe..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  background: "var(--background)",
                  lineHeight: "1.6",
                }}
              />
            </div>

            <Button
              type="submit"
              variant="portfolio"
              disabled={status === "submitting"}
              style={{
                width: "100%",
                paddingBlock: "14px",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Send className="w-4 h-4" />
              {status === "submitting" ? "Submitting Inquiry..." : "Submit Project Inquiry"}
            </Button>

            {statusMessage && (
              <div
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  background: status === "success" ? "#dcfce7" : "#fee2e2",
                  color: status === "success" ? "#166534" : "#991b1b",
                  fontSize: "13px",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                {statusMessage}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                color: "var(--muted-foreground)",
                fontSize: "12px",
                marginTop: "8px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Response within 24 hours
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Direct founder engineer review
              </span>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
