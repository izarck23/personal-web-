import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  ShoppingCart,
  Trash2,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  CreditCard,
  Phone,
  Search,
  Sparkles,
  ShieldCheck,
  Code2,
  FileCode2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/portfolio/modal";
import {
  templates,
  allMarketplaceProducts,
  MARKETPLACE_CATEGORIES,
  templateURL,
  templateZip,
  addCartItem,
  cartTotal,
  type Template,
  type ProductCategory,
} from "@/content/templates";
import { useTemplateCart } from "./cart";

type DeviceMode = "desktop" | "tablet" | "mobile";
type Currency = "USD" | "KSH";
type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function TemplatePreview({ template }: { template: Template }) {
  const [file, setFile] = useState(template.pages[0]?.file ?? "index.html");
  const [device, setDevice] = useState<DeviceMode>("desktop");

  const deviceClass =
    device === "mobile" ? "preview-mobile" : device === "tablet" ? "preview-tablet" : "";

  return (
    <div className="template-preview">
      <div className="preview-toolbar">
        {template.pages.length > 1 && (
          <div role="group" aria-label="Screen preview">
            {template.pages.map((page) => (
              <Button
                key={page.file}
                variant={file === page.file ? "portfolio" : "portfolioOutline"}
                aria-pressed={file === page.file}
                onClick={() => setFile(page.file)}
              >
                {page.label}
              </Button>
            ))}
          </div>
        )}
        <div role="group" aria-label="Preview size" style={{ display: "flex", gap: "8px" }}>
          <Button
            variant={device === "desktop" ? "portfolio" : "portfolioOutline"}
            aria-pressed={device === "desktop"}
            onClick={() => setDevice("desktop")}
          >
            <Monitor className="w-4 h-4 mr-1.5" />
            Desktop
          </Button>
          <Button
            variant={device === "tablet" ? "portfolio" : "portfolioOutline"}
            aria-pressed={device === "tablet"}
            onClick={() => setDevice("tablet")}
          >
            <Tablet className="w-4 h-4 mr-1.5" />
            Tablet
          </Button>
          <Button
            variant={device === "mobile" ? "portfolio" : "portfolioOutline"}
            aria-pressed={device === "mobile"}
            onClick={() => setDevice("mobile")}
          >
            <Smartphone className="w-4 h-4 mr-1.5" />
            Mobile
          </Button>
        </div>
      </div>
      <div className={`preview-stage ${deviceClass}`}>
        <iframe
          key={`${template.slug}-${file}`}
          title={`${template.title} — ${file} preview`}
          src={templateURL(template.slug, file)}
          sandbox="allow-scripts allow-forms"
          loading="lazy"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
        }}
      >
        <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
          Interactive iframe sandbox &bull; Responsive layout testing
        </span>
        <Button variant="portfolioOutline" asChild>
          <a href={templateURL(template.slug, file)} target="_blank" rel="noopener noreferrer">
            Open full preview in new tab
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </a>
        </Button>
      </div>
    </div>
  );
}

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: Template[];
  currency: Currency;
  onClearCart?: () => void;
}

function CheckoutModal({ open, onClose, items, currency }: CheckoutModalProps) {
  const [method, setMethod] = useState<"mpesa" | "card">("mpesa");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (!open) return null;

  const totalUSD = items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const totalKSh = items.reduce((sum, item) => sum + (item.priceKSh ?? (item.price ?? 0) * 130), 0);
  const displayTotal =
    currency === "USD" ? `$${totalUSD.toFixed(2)} USD` : `KSh ${totalKSh.toLocaleString()}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (method === "mpesa") {
      setStatus(
        `M-Pesa payment prompt prepared for ${phone || "your number"}. In this frontend demonstration, instant automatic STK push is awaiting production gateway credentials. To receive the package directly, contact Isaac via WhatsApp or inquiry form.`,
      );
    } else {
      setStatus(
        `Card verification simulated for ${name || "Customer"}. In production, Stripe / card billing will issue instantaneous download tokens. For direct delivery or custom deployment, Isaac is available.`,
      );
    }
  }

  return (
    <div className="checkout-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700" }}>Checkout & Download Access</h2>
            <p style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
              Direct digital delivery to your inbox & direct download links.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted-foreground)",
            }}
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          style={{
            background: "var(--muted)",
            padding: "14px",
            borderRadius: "12px",
            marginBottom: "18px",
          }}
        >
          <div style={{ fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>
            Selected Products ({items.length})
          </div>
          {items.map((it) => (
            <div
              key={it.slug}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                marginBlock: "4px",
              }}
            >
              <span>{it.title}</span>
              <span style={{ fontWeight: "600" }}>
                {it.price === 0 || it.price === null
                  ? "Free"
                  : currency === "USD"
                    ? `$${it.price}`
                    : `KSh ${it.priceKSh ?? (it.price ?? 0) * 130}`}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              marginTop: "8px",
              paddingTop: "8px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            <span>Total Payable:</span>
            <span>{displayTotal}</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <div>
            <label
              style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}
            >
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Isaac Simiyu"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label
              style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}
            >
              Email Address (for ZIP delivery)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label
              style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}
            >
              Payment Method
            </label>
            <div className="payment-method-selector">
              <button
                type="button"
                className={`payment-method-btn ${method === "mpesa" ? "active" : ""}`}
                onClick={() => setMethod("mpesa")}
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                M-Pesa (Kenya)
              </button>
              <button
                type="button"
                className={`payment-method-btn ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                <CreditCard className="w-4 h-4 text-blue-600" />
                Credit / Debit Card
              </button>
            </div>
          </div>

          {method === "mpesa" ? (
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "4px",
                }}
              >
                M-Pesa Phone Number (Safaricom)
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX or 2547..."
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  fontSize: "13px",
                }}
              />
              <p style={{ fontSize: "11px", color: "var(--muted-foreground)", marginTop: "4px" }}>
                Instant STK push notification will be sent to authorize payment in KSh.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "4px",
                  }}
                >
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4000 1234 5678 9010"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                  }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <input
                  type="text"
                  placeholder="MM / YY"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                  }}
                />
                <input
                  type="text"
                  placeholder="CVC"
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>
          )}

          <Button type="submit" variant="portfolio" style={{ marginTop: "12px", width: "100%" }}>
            Complete Order ({displayTotal})
          </Button>

          {status && (
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                borderRadius: "8px",
                background: "var(--accent-soft)",
                fontSize: "12px",
                lineHeight: "1.6",
                color: "var(--text-accent)",
              }}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export function TemplateCatalog({ selected }: { selected?: Template }) {
  const { cart, setCart } = useTemplateCart();
  const [notice, setNotice] = useState("");
  const [request, setRequest] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Filters & State for Catalog Mode
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const catalogSource = allMarketplaceProducts;

  function add(template: Template) {
    setCart((current) => addCartItem(current, template.slug));
    setNotice(`${template.title} added to cart.`);
  }

  // Filter & Sort
  const filteredTemplates = catalogSource.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.marketCategory === selectedCategory ||
      item.category === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.techStack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === "price-asc") {
      const priceA = a.price ?? 0;
      const priceB = b.price ?? 0;
      return priceA - priceB;
    }
    if (sortBy === "price-desc") {
      const priceA = a.price ?? 0;
      const priceB = b.price ?? 0;
      return priceB - priceA;
    }
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    // "featured" default
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const cartItems = allMarketplaceProducts.filter((item) => cart.includes(item.slug));
  const legacyTotal = cartTotal(cart);

  const cartTotalUSD = cartItems.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const cartTotalKSh = cartItems.reduce(
    (sum, item) => sum + (item.priceKSh ?? (item.price ?? 0) * 130),
    0,
  );

  function formatPrice(item: Template) {
    if (item.tier === "Free" || item.price === 0 || item.price === null) {
      return "Free";
    }
    if (currency === "USD") {
      return `$${item.price}.00 USD`;
    }
    const ksh = item.priceKSh ?? item.price * 130;
    return `KSh ${ksh.toLocaleString()}`;
  }

  // Selected Detail View
  if (selected) {
    const related = allMarketplaceProducts.filter((p) => p.slug !== selected.slug).slice(0, 3);

    return (
      <>
        <div style={{ marginBottom: "20px" }}>
          <Button variant="portfolioOutline" asChild>
            <Link to="/shop">&larr; Back to Template Marketplace</Link>
          </Button>
        </div>

        <article className="template-item" key={selected.slug}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <span className="eyebrow" style={{ margin: 0 }}>
              {selected.marketCategory ?? selected.category}
            </span>
            <span
              className={`badge-tier ${
                selected.tier === "Premium" ? "badge-premium" : "badge-free"
              }`}
            >
              {selected.tier ?? "Free"}
            </span>
          </div>

          <h1 className="section-heading" style={{ fontSize: "32px", marginBottom: "12px" }}>
            {selected.title}
          </h1>

          <p style={{ fontSize: "16px", color: "var(--muted-foreground)", maxWidth: "800px" }}>
            {selected.longDescription ?? selected.description}
          </p>

          <div
            style={{
              marginBlock: "20px",
              padding: "16px 20px",
              borderRadius: "12px",
              background: "var(--muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--muted-foreground)",
                }}
              >
                Pricing
              </div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>{formatPrice(selected)}</div>
              {selected.price !== null && selected.price > 0 && (
                <div style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                  {currency === "USD"
                    ? `Equivalent to KSh ${(selected.priceKSh ?? selected.price * 130).toLocaleString()}`
                    : `Equivalent to $${selected.price}.00 USD`}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Button variant="portfolioOutline" onClick={() => add(selected)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>

              {selected.tier === "Free" || selected.price === 0 || selected.price === null ? (
                <Button variant="portfolio" asChild>
                  <a href={templateZip(selected.slug)} download>
                    <Download className="w-4 h-4 mr-2" />
                    Download Free ZIP
                  </a>
                </Button>
              ) : (
                <Button variant="portfolio" onClick={() => setCheckoutOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Buy & Download Now
                </Button>
              )}

              <Button variant="portfolioOutline" onClick={() => setRequest(selected.title)}>
                Request Customisation
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>

          <TemplatePreview template={selected} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginBlock: "36px",
            }}
          >
            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontWeight: "700",
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Key Features Included
              </div>
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {selected.includes.map((feat) => (
                  <li key={feat} style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontWeight: "700",
                }}
              >
                <Code2 className="w-5 h-5 text-blue-600" />
                Technology Stack
              </div>
              <div style={{ marginBottom: "16px" }}>
                {(selected.techStack ?? ["HTML5", "CSS3", "Responsive Design"]).map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  fontWeight: "700",
                }}
              >
                <FileCode2 className="w-5 h-5 text-purple-600" />
                Included Files
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {(
                  selected.filesIncluded ?? [
                    "index.html",
                    "styles.css",
                    "README.txt",
                    "LICENSE.txt",
                  ]
                ).map((f) => (
                  <li key={f} style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>
                    📁 <code>{f}</code>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{ border: "1px solid var(--border)", borderRadius: "14px", padding: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontWeight: "700",
                }}
              >
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                Licence & Terms
              </div>
              <p style={{ fontSize: "12px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                This template includes a commercial single/multi-project license. You are permitted
                to use, modify, and integrate it into client and personal projects. Direct resale or
                redistribution of the uncompiled source code is prohibited.
              </p>
            </div>
          </div>

          <div className="template-guide">
            <h2>How to Install and Customise</h2>
            <ol>
              <li>Download and extract the ZIP archive into your workspace or project folder.</li>
              <li>
                Open <code>index.html</code> in any modern code editor (VS Code, Cursor, Acode).
              </li>
              <li>
                Customise the primary accent colours and typography variables defined in{" "}
                <code>styles.css</code>.
              </li>
              <li>
                Connect form submissions to your preferred backend, FormSubmit, Formspree, or custom
                API route before publishing.
              </li>
              <li>
                Deploy to Cloudflare Pages, Vercel, Netlify, or Apache/Nginx with zero build
                commands needed.
              </li>
            </ol>
          </div>

          <div
            style={{ marginTop: "48px", borderTop: "1px solid var(--border)", paddingTop: "32px" }}
          >
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
              Related Templates
            </h3>
            <div className="template-grid" style={{ marginBlock: "16px" }}>
              {related.map((rel) => (
                <div
                  key={rel.slug}
                  className="template-item"
                  style={{
                    border: "1px solid var(--border)",
                    padding: "16px",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span className="eyebrow">{rel.marketCategory ?? rel.category}</span>
                    <span
                      className={`badge-tier ${rel.tier === "Premium" ? "badge-premium" : "badge-free"}`}
                    >
                      {rel.tier ?? "Free"}
                    </span>
                  </div>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
                    {rel.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--muted-foreground)",
                      marginBottom: "12px",
                    }}
                  >
                    {rel.description}
                  </p>
                  <Button variant="portfolioOutline" asChild style={{ width: "100%" }}>
                    <Link to="/templates/$slug" params={{ slug: rel.slug }}>
                      Preview Template
                      <ArrowUpRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </article>

        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={[selected]}
          currency={currency}
        />

        <InquiryModal
          open={request !== null}
          projectName={request ?? undefined}
          onClose={() => setRequest(null)}
        />
      </>
    );
  }

  // Main Marketplace Catalog View
  return (
    <>
      <div className="catalog-top">
        <div>
          <div className="eyebrow">Production-Ready Digital Store</div>
          <h1 className="section-heading">Digital Template Marketplace</h1>
          <p>
            Curated standalone HTML5, CSS3, and JavaScript templates designed for instant client
            deployment, startup launches, and high conversion.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className="currency-toggle" role="group" aria-label="Currency selection">
            <button
              type="button"
              className={currency === "USD" ? "active" : ""}
              onClick={() => setCurrency("USD")}
            >
              USD ($)
            </button>
            <button
              type="button"
              className={currency === "KSH" ? "active" : ""}
              onClick={() => setCurrency("KSH")}
            >
              KSh (KES)
            </button>
          </div>

          <Button
            variant="portfolioOutline"
            onClick={() => setShowCart(!showCart)}
            aria-expanded={showCart}
            aria-controls="template-cart"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Cart ({cart.length})
          </Button>
        </div>
      </div>

      {notice && (
        <div role="status" className="form-status" style={{ marginBlock: "12px" }}>
          {notice}
        </div>
      )}

      {/* Cart Drawer / Panel */}
      {showCart && (
        <section id="template-cart" className="template-cart" aria-label="Template cart">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Your Selection ({cart.length})</h2>
            <Button variant="portfolioOutline" size="sm" onClick={() => setShowCart(false)}>
              Close Cart
            </Button>
          </div>

          {cartItems.length ? (
            <>
              {cartItems.map((item) => (
                <div className="cart-row" key={item.slug}>
                  <div>
                    <div style={{ fontWeight: "600" }}>{item.title}</div>
                    <small>
                      {item.tier === "Premium"
                        ? currency === "USD"
                          ? `$${item.price}.00 USD`
                          : `KSh ${(item.priceKSh ?? (item.price ?? 0) * 130).toLocaleString()}`
                        : "Free Digital Download"}
                    </small>
                  </div>
                  <Button
                    variant="portfolioIcon"
                    size="icon"
                    aria-label={`Remove ${item.title} from cart`}
                    onClick={() => {
                      setCart(cart.filter((slug) => slug !== item.slug));
                      setNotice(`${item.title} removed from cart.`);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}

              <div style={{ marginBlock: "16px", fontWeight: "700", fontSize: "15px" }}>
                Total:{" "}
                {cartTotalUSD === 0
                  ? legacyTotal === null
                    ? "Free / Custom Estimate"
                    : "Free"
                  : currency === "USD"
                    ? `$${cartTotalUSD.toFixed(2)} USD`
                    : `KSh ${cartTotalKSh.toLocaleString()}`}
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Button variant="portfolio" onClick={() => setCheckoutOpen(true)}>
                  Proceed to Checkout
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  variant="portfolioOutline"
                  onClick={() => setRequest(cartItems.map((item) => item.title).join(", "))}
                >
                  Request Customisation
                </Button>
              </div>
            </>
          ) : (
            <p style={{ color: "var(--muted-foreground)", marginTop: "12px" }}>
              Your cart is empty. Explore our templates below and add items to your selection.
            </p>
          )}
        </section>
      )}

      {/* Filter and Search Bar */}
      <div className="marketplace-controls">
        <div className="marketplace-search-row">
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search
              className="w-4 h-4"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted-foreground)",
              }}
            />
            <input
              type="text"
              className="marketplace-search-input"
              style={{ paddingLeft: "38px" }}
              placeholder="Search templates by keyword, technology, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search templates"
            />
          </div>

          <select
            className="marketplace-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort templates"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div className="marketplace-categories" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`category-pill ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All Categories ({allMarketplaceProducts.length})
          </button>
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const count = allMarketplaceProducts.filter((p) => p.marketCategory === cat).length;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="template-grid">
        {sortedTemplates.map((item) => (
          <article className="template-item" key={item.slug}>
            <div className="catalog-thumb">
              <iframe
                title={`${item.title} preview thumbnail`}
                src={templateURL(item.slug)}
                sandbox=""
                loading="lazy"
                tabIndex={-1}
              />
              <Link
                className="catalog-thumb-link"
                to="/templates/$slug"
                params={{ slug: item.slug }}
                aria-label={`Preview ${item.title}`}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div className="eyebrow" style={{ margin: 0 }}>
                {item.marketCategory ?? item.category}
              </div>
              <span
                className={`badge-tier ${item.tier === "Premium" ? "badge-premium" : "badge-free"}`}
              >
                {item.tier ?? "Free"}
              </span>
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              {item.title}
            </h2>

            <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "14px" }}>
              {item.description}
            </p>

            <ul style={{ marginBottom: "14px" }}>
              {item.includes.slice(0, 3).map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div style={{ marginBottom: "16px" }}>
              {(item.techStack ?? ["HTML5", "CSS3"]).slice(0, 3).map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>

            <p className="template-price" style={{ fontSize: "16px", marginBottom: "16px" }}>
              {formatPrice(item)}
            </p>

            <div className="template-actions">
              <Button variant="portfolio" asChild>
                <Link to="/templates/$slug" params={{ slug: item.slug }}>
                  Preview & details
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>

              <Button variant="portfolioOutline" onClick={() => add(item)}>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add to cart
              </Button>

              {item.tier === "Free" || item.price === 0 || item.price === null ? (
                <Button variant="portfolioOutline" asChild>
                  <a href={templateZip(item.slug)} download>
                    <Download className="w-4 h-4 mr-1.5" />
                    ZIP
                  </a>
                </Button>
              ) : (
                <Button
                  variant="portfolioOutline"
                  onClick={() => {
                    add(item);
                    setCheckoutOpen(true);
                  }}
                >
                  Buy
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      {sortedTemplates.length === 0 && (
        <div
          style={{ textAlign: "center", padding: "48px 16px", color: "var(--muted-foreground)" }}
        >
          <p>No templates found matching your search criteria.</p>
          <Button
            variant="portfolioOutline"
            style={{ marginTop: "12px" }}
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems.length > 0 ? cartItems : sortedTemplates.slice(0, 1)}
        currency={currency}
      />

      <InquiryModal
        open={request !== null}
        projectName={request ?? undefined}
        onClose={() => setRequest(null)}
      />
    </>
  );
}
