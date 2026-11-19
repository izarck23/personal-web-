import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/portfolio/site-chrome";
import { SITE_URL } from "@/components/portfolio/social";
import { Button } from "@/components/ui/button";
import { allMarketplaceProducts, type Template } from "@/content/templates";
import { articles } from "@/content/articles";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Mail,
  BookOpen,
  Settings,
  TrendingUp,
  DollarSign,
  Download,
  Users,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Admin Portal — CoderTech" },
      {
        name: "description",
        content: "Management console for CoderTech templates, orders, and inquiries.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/admin` }],
  }),
  component: AdminPage,
});

type AdminTab = "overview" | "products" | "orders" | "inquiries" | "blog" | "settings";

function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [search, setSearch] = useState("");

  const mockOrders = [
    {
      id: "CT-9041",
      customer: "Wanjiku M. (Nairobi)",
      email: "wanjiku.m@example.com",
      product: "Luxe Business & Salon Website",
      amountKSh: 3800,
      amountUSD: 29,
      method: "M-Pesa STK",
      status: "Delivered",
      date: "Today, 11:42 AM",
    },
    {
      id: "CT-9040",
      customer: "David K. (London, UK)",
      email: "david.k@cloudtech.co.uk",
      product: "CoderTech Modern Admin Dashboard",
      amountKSh: 4900,
      amountUSD: 39,
      method: "Stripe Card",
      status: "Delivered",
      date: "Yesterday, 4:15 PM",
    },
    {
      id: "CT-9039",
      customer: "Brian O. (Kisumu)",
      email: "brian.developer@gmail.com",
      product: "Product Landing Page",
      amountKSh: 0,
      amountUSD: 0,
      method: "Direct ZIP",
      status: "Downloaded",
      date: "Nov 17, 2026",
    },
    {
      id: "CT-9038",
      customer: "Sarah T. (Mombasa)",
      email: "sarah.t@coastalbiz.ke",
      product: "Startup Website Template",
      amountKSh: 0,
      amountUSD: 0,
      method: "Direct ZIP",
      status: "Downloaded",
      date: "Nov 16, 2026",
    },
  ];

  const mockInquiries = [
    {
      id: "INQ-104",
      name: "Peter Mwangi",
      email: "peter@agroflow.ke",
      type: "Android Application",
      budget: "KSh 80,000 – 120,000",
      status: "New",
      date: "2 hours ago",
      snippet: "Looking to build a native Kotlin Android inventory tracker with offline sync.",
    },
    {
      id: "INQ-103",
      name: "Amina Hassan",
      email: "amina@zenithlaw.co.ke",
      type: "Website Development",
      budget: "KSh 50,000 – 75,000",
      status: "Replied",
      date: "1 day ago",
      snippet: "Corporate law firm portal with appointment bookings and legal blog.",
    },
    {
      id: "INQ-102",
      name: "John Miller",
      email: "jmiller@startupsf.io",
      type: "Landing Page Development",
      budget: "$250 – $500 USD",
      status: "In Progress",
      date: "3 days ago",
      snippet: "SaaS waitlist landing page with dark theme and high conversion CTAs.",
    },
  ];

  return (
    <div className="portfolio-site">
      <SiteHeader />
      <main className="section container">
        {/* Readiness Notice Banner */}
        <div
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#1e40af",
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600" />
          <div style={{ fontSize: "13px" }}>
            <strong>Frontend Preview Mode:</strong> This administrative console demonstrates
            marketplace and portfolio management. It is architected for immediate Firebase Auth,
            Cloud Firestore, and Supabase backend connection.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div>
            <div className="eyebrow">CoderTech Backoffice</div>
            <h1 className="section-heading" style={{ fontSize: "32px" }}>
              Administrator Console
            </h1>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button
              variant={activeTab === "overview" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="w-4 h-4 mr-1.5" />
              Overview
            </Button>
            <Button
              variant={activeTab === "products" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("products")}
            >
              <Package className="w-4 h-4 mr-1.5" />
              Products ({allMarketplaceProducts.length})
            </Button>
            <Button
              variant={activeTab === "orders" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Orders ({mockOrders.length})
            </Button>
            <Button
              variant={activeTab === "inquiries" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("inquiries")}
            >
              <Mail className="w-4 h-4 mr-1.5" />
              Inquiries ({mockInquiries.length})
            </Button>
            <Button
              variant={activeTab === "blog" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("blog")}
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Articles ({articles.length})
            </Button>
            <Button
              variant={activeTab === "settings" ? "portfolio" : "portfolioOutline"}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="w-4 h-4 mr-1.5" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px",
                  background: "var(--background)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      fontWeight: "600",
                    }}
                  >
                    Total Sales (MTD)
                  </span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div style={{ fontSize: "24px", fontWeight: "800" }}>KSh 42,700</div>
                <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600" }}>
                  &uarr; 14.2% from last month
                </span>
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px",
                  background: "var(--background)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      fontWeight: "600",
                    }}
                  >
                    Template Downloads
                  </span>
                  <Download className="w-4 h-4 text-purple-600" />
                </div>
                <div style={{ fontSize: "24px", fontWeight: "800" }}>1,248</div>
                <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "600" }}>
                  Free & Premium total
                </span>
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px",
                  background: "var(--background)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      fontWeight: "600",
                    }}
                  >
                    Active Inquiries
                  </span>
                  <Mail className="w-4 h-4 text-amber-600" />
                </div>
                <div style={{ fontSize: "24px", fontWeight: "800" }}>12</div>
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                  3 awaiting reply
                </span>
              </div>

              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "20px",
                  background: "var(--background)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      fontWeight: "600",
                    }}
                  >
                    Live Marketplace Items
                  </span>
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div style={{ fontSize: "24px", fontWeight: "800" }}>
                  {allMarketplaceProducts.length}
                </div>
                <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
                  Across 6 categories
                </span>
              </div>
            </div>

            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                background: "var(--background)",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
                Recent Marketplace Activity
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {mockOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 16px",
                      borderRadius: "10px",
                      background: "var(--muted)",
                      fontSize: "13px",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <div>
                      <strong>{order.id}</strong> — {order.customer} purchased{" "}
                      <em>{order.product}</em>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontWeight: "700" }}>
                        {order.amountKSh === 0 ? "Free" : `KSh ${order.amountKSh.toLocaleString()}`}
                      </span>
                      <span
                        className="badge-free"
                        style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products */}
        {activeTab === "products" && (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              background: "var(--background)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>Template Inventory</h2>
              <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                Total Products: {allMarketplaceProducts.length}
              </span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}
                  >
                    <th style={{ padding: "10px 14px" }}>Product Name</th>
                    <th style={{ padding: "10px 14px" }}>Category</th>
                    <th style={{ padding: "10px 14px" }}>Tier</th>
                    <th style={{ padding: "10px 14px" }}>Price (USD)</th>
                    <th style={{ padding: "10px 14px" }}>Price (KSh)</th>
                    <th style={{ padding: "10px 14px" }}>ZIP Asset</th>
                  </tr>
                </thead>
                <tbody>
                  {allMarketplaceProducts.map((p) => (
                    <tr key={p.slug} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px 14px", fontWeight: "600" }}>{p.title}</td>
                      <td style={{ padding: "12px 14px", color: "var(--muted-foreground)" }}>
                        {p.marketCategory ?? p.category}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          className={`badge-tier ${p.tier === "Premium" ? "badge-premium" : "badge-free"}`}
                        >
                          {p.tier ?? "Free"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {p.price === null || p.price === 0 ? "Free" : `$${p.price}.00`}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        {p.priceKSh === null || p.priceKSh === 0
                          ? "Free"
                          : `KSh ${p.priceKSh.toLocaleString()}`}
                      </td>
                      <td style={{ padding: "12px 14px" }}>
                        <code>/downloads/{p.slug}-template.zip</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders */}
        {activeTab === "orders" && (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              background: "var(--background)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
              Digital Orders
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}
                  >
                    <th style={{ padding: "10px 14px" }}>Order ID</th>
                    <th style={{ padding: "10px 14px" }}>Customer</th>
                    <th style={{ padding: "10px 14px" }}>Product</th>
                    <th style={{ padding: "10px 14px" }}>Amount</th>
                    <th style={{ padding: "10px 14px" }}>Channel</th>
                    <th style={{ padding: "10px 14px" }}>Status</th>
                    <th style={{ padding: "10px 14px" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px 14px", fontWeight: "600" }}>{o.id}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <div>{o.customer}</div>
                        <small style={{ color: "var(--muted-foreground)" }}>{o.email}</small>
                      </td>
                      <td style={{ padding: "12px 14px" }}>{o.product}</td>
                      <td style={{ padding: "12px 14px", fontWeight: "600" }}>
                        {o.amountKSh === 0 ? "Free" : `KSh ${o.amountKSh.toLocaleString()}`}
                      </td>
                      <td style={{ padding: "12px 14px" }}>{o.method}</td>
                      <td style={{ padding: "12px 14px" }}>
                        <span
                          className="badge-free"
                          style={{ padding: "3px 8px", borderRadius: "4px", fontSize: "11px" }}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "12px 14px",
                          color: "var(--muted-foreground)",
                          fontSize: "12px",
                        }}
                      >
                        {o.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Inquiries */}
        {activeTab === "inquiries" && (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              background: "var(--background)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
              Project Inquiries
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {mockInquiries.map((inq) => (
                <div
                  key={inq.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: "700" }}>
                        {inq.name} ({inq.type})
                      </h3>
                      <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                        {inq.email} &bull; Budget: <strong>{inq.budget}</strong> &bull; {inq.date}
                      </p>
                    </div>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: "600",
                        background: inq.status === "New" ? "#fef3c7" : "#dcfce7",
                        color: inq.status === "New" ? "#b45309" : "#15803d",
                      }}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--foreground)",
                      background: "var(--muted)",
                      padding: "10px 14px",
                      borderRadius: "8px",
                    }}
                  >
                    "{inq.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Blog */}
        {activeTab === "blog" && (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              background: "var(--background)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
                Published Articles ({articles.length})
              </h2>
              <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                Verified technical articles
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}
                  >
                    <th style={{ padding: "10px 14px" }}>Article Title</th>
                    <th style={{ padding: "10px 14px" }}>Category</th>
                    <th style={{ padding: "10px 14px" }}>Read Time</th>
                    <th style={{ padding: "10px 14px" }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((art) => (
                    <tr key={art.slug} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px 14px", fontWeight: "600" }}>{art.title}</td>
                      <td style={{ padding: "12px 14px", color: "var(--muted-foreground)" }}>
                        {art.category}
                      </td>
                      <td style={{ padding: "12px 14px" }}>{art.readMinutes} min</td>
                      <td style={{ padding: "12px 14px" }}>{art.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Settings */}
        {activeTab === "settings" && (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "24px",
              background: "var(--background)",
              maxWidth: "700px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
              Backend Integration Readiness
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>
                    Firebase Authentication & Firestore
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                    User profiles, RBAC, orders collection
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Ready for Schema
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>
                    M-Pesa Daraja Payment Gateway
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                    C2B / STK push webhook handler for instant checkout
                  </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#b45309" }}>
                  Awaiting API Credentials
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>Google Gemini AI SDK</div>
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                    @google/genai integrated in project advisor backend function
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Configured
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <div style={{ fontWeight: "600", fontSize: "14px" }}>
                    Contact Form Email Forwarding
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                    FormSubmit forwarding to codingspace254@gmail.com
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" /> Active
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
