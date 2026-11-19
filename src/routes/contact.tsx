import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL, SocialLinks } from "@/components/portfolio/social";
import { Button } from "@/components/ui/button";
import { sendInquiry } from "@/lib/contact.functions";
import { Mail, MapPin, Clock, Send, MessageSquareCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Contact Isaac Simiyu — Software & App Developer | CoderTech" },
      {
        name: "description",
        content:
          "Get in touch with Isaac Simiyu for software engineering contracts, Android development, website projects, or digital template inquiries. Nairobi, Kenya.",
      },
      { property: "og:title", content: "Contact Isaac Simiyu — CoderTech" },
      {
        property: "og:description",
        content: "Send a direct message or project enquiry to Isaac Simiyu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const res = await sendInquiry({
        data: { name, email, message },
      });

      if (res.ok) {
        setStatus("success");
        setFeedback(
          "Thank you! Your message has been safely received and forwarded to Isaac's inbox. Expect a personal reply within 24 hours.",
        );
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(
          "Submission could not be completed right now. Please email directly at codingspace254@gmail.com.",
        );
      }
    } catch {
      setStatus("error");
      setFeedback("Network connection error. Please try again or reach out directly via email.");
    }
  }

  return (
    <div className="portfolio-site">
      <SiteHeader activeSection="contact" />
      <main className="section container">
        <div className="eyebrow">Get In Touch</div>
        <h1 className="section-heading">
          Let’s Discuss Your <span className="orange">Project</span>
        </h1>
        <p
          style={{
            maxWidth: "680px",
            color: "var(--muted-foreground)",
            marginBlock: "12px 40px",
            fontSize: "15px",
          }}
        >
          Have a software project, freelance contract, or technical question? Reach out using the
          form below or connect through verified social channels.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
          }}
        >
          {/* Contact Details Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "28px",
                background: "var(--background)",
              }}
            >
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                Direct Details
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Email Address
                    </span>
                    <p style={{ fontSize: "14px", fontWeight: "600", margin: "2px 0 0" }}>
                      <a
                        href="mailto:codingspace254@gmail.com"
                        style={{ textDecoration: "underline" }}
                      >
                        codingspace254@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Location & Timezone
                    </span>
                    <p style={{ fontSize: "14px", fontWeight: "600", margin: "2px 0 0" }}>
                      Nairobi, Kenya (EAT / UTC+3)
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "var(--accent-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Availability
                    </span>
                    <p style={{ fontSize: "14px", fontWeight: "600", margin: "2px 0 0" }}>
                      Open for full-stack contracts, Android development, and template
                      customization.
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "28px",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--muted-foreground)",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  Verified Social Profiles
                </span>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "32px",
              background: "var(--background)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              Send a Message
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "24px" }}>
              Leave a note with your project idea or query. All submissions are stored securely and
              delivered to my personal inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                  placeholder="Isaac Simiyu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "14px",
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
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "14px",
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
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your goals, questions, or timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                    fontFamily: "inherit",
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
                  paddingBlock: "12px",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Send className="w-4 h-4" />
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>

              {feedback && (
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
                  {feedback}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
