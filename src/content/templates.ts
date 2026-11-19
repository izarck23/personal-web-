export type ProductTier = "Free" | "Premium";
export type ProductCategory =
  | "Landing Pages"
  | "Business Websites"
  | "Authentication Screens"
  | "Admin Dashboards"
  | "Portfolio Templates"
  | "Startup Websites";

export type Template = {
  slug: string;
  title: string;
  category: string;
  marketCategory?: ProductCategory;
  tier?: ProductTier;
  description: string;
  longDescription?: string;
  includes: string[];
  techStack?: string[];
  filesIncluded?: string[];
  price: number | null;
  priceKSh?: number | null;
  pages: { label: string; file: string }[];
  featured?: boolean;
};

// Core standalone templates (strictly preserving original catalogue & tests)
export const templates: Template[] = [
  {
    slug: "landing-page",
    title: "Product Landing Page",
    category: "Marketing",
    marketCategory: "Landing Pages",
    tier: "Free",
    description:
      "A focused product page with features, pricing sections and frequently asked questions.",
    longDescription:
      "Clean, standalone product landing page tailored for modern software tools, digital products, and online services. Features device mockups, feature grids, 3-tier pricing tables, and native expandable FAQs with zero dependencies.",
    includes: [
      "Product introduction and calls to action",
      "Responsive feature and pricing layouts",
      "Native expandable FAQs",
      "Zero build step required",
    ],
    techStack: ["HTML5", "CSS3", "Responsive Design", "Accessible Semantics"],
    filesIncluded: ["index.html", "styles.css", "README.txt", "LICENSE.txt"],
    price: null,
    priceKSh: 0,
    featured: true,
    pages: [{ label: "Landing page", file: "index.html" }],
  },
  {
    slug: "startup",
    title: "Startup Website",
    category: "Business",
    marketCategory: "Startup Websites",
    tier: "Free",
    description:
      "A startup website with a product overview, team, milestones and a waitlist layout.",
    longDescription:
      "Modern startup website featuring a dark aesthetic, product dashboard showcase, key performance metrics, step-by-step roadmap, team member showcase, and early access waitlist form.",
    includes: [
      "Product overview and dashboard UI",
      "Team and milestone sections",
      "Waitlist form layout — delivery not connected",
      "Clean dark-mode styling",
    ],
    techStack: ["HTML5", "CSS3", "Vanilla JS", "Dark Theme"],
    filesIncluded: ["index.html", "styles.css", "README.txt", "LICENSE.txt"],
    price: null,
    priceKSh: 0,
    featured: true,
    pages: [{ label: "Startup page", file: "index.html" }],
  },
  {
    slug: "authentication",
    title: "Authentication Screens",
    category: "Account UI",
    marketCategory: "Authentication Screens",
    tier: "Free",
    description:
      "Professional sign-in, sign-up and password-reset screens ready to adapt to your website.",
    longDescription:
      "Production-ready authentication UI suite with split-screen branding visual, email & password validation, password visibility toggle, social login button styles, and accessible form labels.",
    includes: [
      "Sign in, create account and reset password",
      "Accessible labels and native field validation",
      "UI only — no accounts, sessions or email delivery",
      "Responsive mobile and desktop views",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "WCAG Accessible Forms"],
    filesIncluded: [
      "index.html",
      "signup.html",
      "reset.html",
      "assets/css/styles.css",
      "assets/js/app.js",
      "README.txt",
      "LICENSE.txt",
    ],
    price: null,
    priceKSh: 0,
    featured: true,
    pages: [
      { label: "Sign in", file: "index.html" },
      { label: "Create account", file: "signup.html" },
      { label: "Reset password", file: "reset.html" },
    ],
  },
];

// Additional templates completing all 6 requested marketplace categories
export const additionalMarketplaceTemplates: Template[] = [
  {
    slug: "business-website",
    title: "Luxe Business & Salon Website",
    category: "Business",
    marketCategory: "Business Websites",
    tier: "Premium",
    description:
      "Complete appointment booking, service pricing cards, team section, and contact layout.",
    longDescription:
      "Full business website template engineered for local businesses, salons, spas, and professional practices. Includes service catalogues with transparent pricing, online appointment scheduling UI, business hours, and location maps.",
    includes: [
      "Hero with primary call-to-action",
      "Services catalogue with rate cards in KSh / USD",
      "Interactive appointment booking flow UI",
      "Business hours & location details",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    filesIncluded: ["index.html", "styles.css", "app.js", "README.txt", "LICENSE.txt"],
    price: 29,
    priceKSh: 3800,
    featured: true,
    pages: [{ label: "Business Homepage", file: "index.html" }],
  },
  {
    slug: "admin-dashboard",
    title: "CoderTech Modern Admin Dashboard",
    category: "Dashboard",
    marketCategory: "Admin Dashboards",
    tier: "Premium",
    description:
      "Sleek admin portal template with KPI metrics, revenue charts, order management, and data tables.",
    longDescription:
      "Modular dashboard interface built for digital marketplaces, SaaS backoffices, and analytics applications. Includes responsive sidebar navigation, metric cards, order lists, customer tables, and settings tabs.",
    includes: [
      "KPI statistics and revenue metrics cards",
      "Interactive data tables with filter & sort states",
      "Order status badges and customer management",
      "Dark and light theme support",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "SVG Charts"],
    filesIncluded: ["index.html", "styles.css", "dashboard.js", "README.txt", "LICENSE.txt"],
    price: 39,
    priceKSh: 4900,
    featured: true,
    pages: [{ label: "Dashboard Overview", file: "index.html" }],
  },
  {
    slug: "portfolio-template",
    title: "Developer & Creative Portfolio",
    category: "Portfolio",
    marketCategory: "Portfolio Templates",
    tier: "Free",
    description:
      "Minimal, modern personal portfolio template with project showcase, skills, and enquiry form.",
    longDescription:
      "High-aesthetic personal portfolio template designed for software engineers, designers, and freelancers. Features clean typography, interactive project modals, responsive project showcase carousel, and contact section.",
    includes: [
      "Hero section with biography & photo disc",
      "Interactive project showcase gallery",
      "Skills & technology matrix",
      "Direct project enquiry form layout",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Accessible Design"],
    filesIncluded: ["index.html", "styles.css", "README.txt", "LICENSE.txt"],
    price: 0,
    priceKSh: 0,
    featured: false,
    pages: [{ label: "Portfolio Homepage", file: "index.html" }],
  },
];

// All marketplace products combined (6 full categories)
export const allMarketplaceProducts: Template[] = [...templates, ...additionalMarketplaceTemplates];

export const MARKETPLACE_CATEGORIES: ProductCategory[] = [
  "Landing Pages",
  "Business Websites",
  "Authentication Screens",
  "Admin Dashboards",
  "Portfolio Templates",
  "Startup Websites",
];

export const getTemplate = (slug: string) =>
  allMarketplaceProducts.find((item) => item.slug === slug) ??
  templates.find((item) => item.slug === slug);

export const templateURL = (slug: string, file = "index.html") => `/templates/${slug}/${file}`;
export const templateZip = (slug: string) => `/downloads/${slug}-template.zip`;

export function addCartItem(items: string[], slug: string): string[] {
  return getTemplate(slug) ? [...new Set([...items, slug])] : items;
}

export function cartTotal(items: string[]): number | null {
  const selected = templates.filter((item) => items.includes(item.slug));
  return selected.some((item) => item.price === null)
    ? null
    : selected.reduce((sum, item) => sum + (item.price ?? 0), 0);
}

export function calculateMarketplaceTotal(
  items: { slug: string; quantity: number }[],
  currency: "USD" | "KSH",
): number {
  return items.reduce((sum, item) => {
    const prod = getTemplate(item.slug);
    if (!prod) return sum;
    const price =
      currency === "USD" ? (prod.price ?? 0) : (prod.priceKSh ?? (prod.price ?? 0) * 130);
    return sum + price * item.quantity;
  }, 0);
}
