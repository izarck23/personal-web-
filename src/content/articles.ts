// Original articles by CoderTech. No publication dates are shown until Isaac confirms them.
// Images are AI-generated illustrations; replace by changing the imports below.
import appImg from "@/assets/generated/blog-app-development.jpg";
import aiImg from "@/assets/generated/blog-ai-coding.jpg";
import webImg from "@/assets/generated/blog-web-seo.jpg";
import landingImg from "@/assets/generated/blog-landing-pages.jpg";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  code?: string;
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  type: "Guide" | "Tutorial" | "Proposed workflow" | "Experiment";
  image: string;
  imageAlt: string;
  readMinutes: number;
  intro: string;
  sections: ArticleSection[];
  summary: string;
  cta: string;
};

const images = {
  app: {
    image: appImg,
    imageAlt: "Illustration of a smartphone app interface with orange accents",
  },
  ai: { image: aiImg, imageAlt: "Illustration of a laptop with code and an AI spark" },
  web: {
    image: webImg,
    imageAlt: "Illustration of a responsive website on desktop, tablet and phone",
  },
  landing: { image: landingImg, imageAlt: "Illustration of a startup landing page with a rocket" },
};

export const articles: Article[] = [
  {
    slug: "plan-a-mobile-app-before-writing-code",
    title: "How to Plan a Mobile App Before Writing Any Code",
    category: "App Development",
    tags: ["app development", "planning", "mvp"],
    type: "Guide",
    ...images.app,
    readMinutes: 6,
    description:
      "A practical app development planning guide: define the problem, scope an MVP, map screens and choose a stack before you write code.",
    intro:
      "Most app projects that stall do so before the first line of code is written well — the problem was vague, the scope kept growing, or nobody agreed on what “done” meant. A short planning phase saves weeks of rework.",
    sections: [
      {
        heading: "Start with one clear problem",
        paragraphs: [
          "Write a single sentence that describes who the app is for and what it helps them do. If you cannot write that sentence, the app is not ready to be built.",
          "Example: “Students in Nairobi can find and join study groups for their course in under a minute.” This sentence immediately tells you the users, the core action and a measurable goal.",
        ],
      },
      {
        heading: "Scope a minimum viable product",
        paragraphs: [
          "List every feature you imagine, then mark each one as must-have, nice-to-have or later. The MVP is only the must-haves needed to deliver the one-sentence promise.",
        ],
        list: [
          "Must-have: sign up, browse groups, join a group",
          "Nice-to-have: chat inside groups",
          "Later: payments, badges, recommendations",
        ],
      },
      {
        heading: "Map the screens and flows",
        paragraphs: [
          "Sketch every screen on paper or in a wireframing tool and draw arrows for how users move between them. Flows reveal missing screens — like empty states, error messages and loading screens — long before development.",
        ],
      },
      {
        heading: "Choose a stack that fits the team",
        paragraphs: [
          "Pick tools you or your team can maintain. A cross-platform framework can ship to Android and iOS from one codebase; a managed backend removes server maintenance. The best stack is the one that lets you ship and iterate.",
        ],
      },
    ],
    summary:
      "Define the problem in one sentence, cut the scope to an MVP, map every screen and pick a maintainable stack. Planning is the cheapest phase in which to fix mistakes.",
    cta: "Planning an app? Reach out to discuss your idea and scope an MVP together.",
  },
  {
    slug: "ai-assisted-coding-workflow",
    title: "A Practical Workflow for AI-Assisted Coding",
    category: "AI-Assisted Coding",
    tags: ["ai-assisted development", "productivity", "code review"],
    type: "Proposed workflow",
    ...images.ai,
    readMinutes: 7,
    description:
      "A proposed AI-assisted development workflow: write clear prompts, work in small steps, review every change and keep tests as the source of truth.",
    intro:
      "AI coding assistants can speed up development, but only when they are used with discipline. This is a proposed workflow for getting reliable results — treat it as a starting point and adapt it to your projects.",
    sections: [
      {
        heading: "Describe the outcome, not just the code",
        paragraphs: [
          "A good prompt explains the goal, the constraints and what should not change. “Add a search box to the blog list that filters by title; keep the existing styles; no new dependencies” produces far better results than “add search”.",
        ],
      },
      {
        heading: "Work in small, reviewable steps",
        paragraphs: [
          "Ask for one change at a time. Small changes are easier to read, test and undo. If a change touches many files, ask the assistant to explain its plan first.",
        ],
      },
      {
        heading: "Review everything like a teammate’s pull request",
        paragraphs: [
          "Read each diff. Check naming, edge cases, error handling and security. AI-generated code can look confident while being subtly wrong — for example, skipping input validation.",
        ],
        list: [
          "Does it handle empty and error states?",
          "Is user input validated?",
          "Did it change anything unrelated?",
        ],
      },
      {
        heading: "Let tests decide",
        paragraphs: [
          "Write or generate tests for behaviour you care about, then run them after each change. Tests turn “it looks right” into “it works”.",
        ],
        code: "test('filters posts by title', () => {\n  expect(filter(posts, 'seo')).toHaveLength(1);\n});",
      },
    ],
    summary:
      "Clear prompts, small steps, careful review and automated tests make AI-assisted development faster without sacrificing quality.",
    cta: "Want a developer who uses modern AI tooling responsibly? Let’s talk about your project.",
  },
  {
    slug: "website-development-checklist-small-business",
    title: "Website Development Checklist for Small Businesses",
    category: "Website Development",
    tags: ["website development", "small business", "checklist"],
    type: "Guide",
    ...images.web,
    readMinutes: 6,
    description:
      "A website development checklist for small businesses in Kenya and beyond: goals, content, mobile design, speed, contact options and SEO basics.",
    intro:
      "A business website has one job: turn visitors into customers. This checklist covers what a small business website needs before launch.",
    sections: [
      {
        heading: "Clear goals and content",
        paragraphs: [
          "Decide the main action you want visitors to take — call, book, buy or send a message — and design every page around it. Gather real photos, prices, opening hours and service descriptions before design starts.",
        ],
      },
      {
        heading: "Mobile first",
        paragraphs: [
          "Many visitors arrive on phones, often on mobile data. Buttons should be easy to tap, text readable without zooming and important information visible without scrolling far.",
        ],
      },
      {
        heading: "Speed and reliability",
        paragraphs: [
          "Compress images, avoid heavy scripts and use reliable hosting with HTTPS. A slow site loses visitors before they see your offer.",
        ],
      },
      {
        heading: "Launch checklist",
        paragraphs: ["Before going live, run through these items:"],
        list: [
          "Every page has a unique title and description",
          "Contact links and forms work on mobile",
          "Images have descriptive alt text",
          "The site is submitted to Google Search Console",
          "Analytics is set up with your own account",
        ],
      },
    ],
    summary:
      "Know your main goal, prepare real content, design for phones, keep the site fast and check the basics before launch.",
    cta: "Need a website for your business? Get in touch to discuss what it should achieve.",
  },
  {
    slug: "startup-landing-page-structure",
    title: "Startup Landing Page Structure That Converts",
    category: "Landing Pages",
    tags: ["landing page development", "startup websites", "conversion"],
    type: "Guide",
    ...images.landing,
    readMinutes: 6,
    description:
      "Startup landing page development guide: the sections every page needs, from headline and proof to a single clear call to action.",
    intro:
      "A startup landing page should make one promise and ask for one action. Here is a section-by-section structure you can adapt.",
    sections: [
      {
        heading: "Headline and subheadline",
        paragraphs: [
          "State what the product does and who it is for in plain language. The subheadline explains how, or removes the main doubt.",
        ],
      },
      {
        heading: "Problem and solution",
        paragraphs: [
          "Describe the visitor’s problem in their words, then show how the product solves it. Use a screenshot or short demo only if it is real — illustrations should be labeled as such.",
        ],
      },
      {
        heading: "Proof",
        paragraphs: [
          "Add genuine evidence: user quotes with permission, usage numbers you can verify, or press mentions. If you have none yet, a transparent “early access” message is better than invented testimonials.",
        ],
      },
      {
        heading: "One call to action",
        paragraphs: [
          "Repeat the same action — join the waitlist, book a demo, download — at the top and bottom of the page. Multiple competing buttons reduce conversions.",
        ],
        list: [
          "Keep forms short: name and email is often enough",
          "Show a clear success message after submission",
          "Explain what happens next",
        ],
      },
    ],
    summary:
      "Headline, problem, solution, honest proof and one repeated call to action form a reliable landing page structure for startups.",
    cta: "Launching a startup? Let’s plan a landing page built around your one key action.",
  },
  {
    slug: "seo-basics-for-new-websites",
    title: "SEO Basics for New Websites: Titles, Descriptions and Structure",
    category: "SEO",
    tags: ["website seo", "search console", "metadata"],
    type: "Tutorial",
    ...images.web,
    readMinutes: 7,
    description:
      "A website SEO tutorial for beginners: unique titles, meta descriptions, headings, sitemaps, internal links and Google Search Console setup.",
    intro:
      "Search engine optimisation starts with fundamentals, not tricks. This tutorial covers the technical basics every new site should have. Rankings are never guaranteed, but these steps make your pages understandable to search engines.",
    sections: [
      {
        heading: "Unique titles and descriptions",
        paragraphs: [
          "Every page needs its own title (around 50–60 characters) and meta description (around 150–160 characters) describing that page specifically. Duplicate titles confuse search engines and users.",
        ],
        code: '<title>Salon Website Development — Your Name</title>\n<meta name="description" content="..." />',
      },
      {
        heading: "One H1 and logical headings",
        paragraphs: [
          "Use a single H1 that matches the page topic, then H2 and H3 headings in order. Headings help both screen-reader users and search engines understand structure.",
        ],
      },
      {
        heading: "Sitemap, robots.txt and clean URLs",
        paragraphs: [
          "A sitemap.xml lists your public pages; robots.txt tells crawlers what they may visit. Use readable URLs like /blog/seo-basics rather than /page?id=42.",
        ],
      },
      {
        heading: "Search Console and internal links",
        paragraphs: [
          "Verify your site in Google Search Console, submit the sitemap and check for indexing issues. Link related pages to each other so visitors and crawlers can discover them.",
        ],
      },
    ],
    summary:
      "Unique metadata, clear headings, a sitemap, clean URLs, internal links and Search Console form the foundation of website SEO.",
    cta: "Want your website built with SEO foundations from day one? Get in touch.",
  },
  {
    slug: "responsive-design-practical-tips",
    title: "Responsive Design: Practical Tips for Every Screen Size",
    category: "Responsive Design",
    tags: ["responsive design", "css", "mobile"],
    type: "Tutorial",
    ...images.web,
    readMinutes: 6,
    description:
      "Responsive web design tutorial with practical CSS tips: fluid layouts, flexible images, touch targets and testing on real devices.",
    intro:
      "A responsive site adapts to phones, tablets and desktops without breaking. These practical techniques prevent the most common layout problems.",
    sections: [
      {
        heading: "Use fluid widths",
        paragraphs: [
          "Prefer percentages, min() and max() over fixed pixel widths. A container like the one below stays readable on large screens and never overflows small ones.",
        ],
        code: ".container {\n  width: min(1140px, calc(100% - 40px));\n  margin-inline: auto;\n}",
      },
      {
        heading: "Make images flexible",
        paragraphs: [
          "Set max-width: 100% on images and always include width and height attributes so the browser reserves space and avoids layout shifts.",
        ],
      },
      {
        heading: "Design for touch",
        paragraphs: [
          "Buttons and links should be at least about 44 pixels tall on phones, with enough space between them to avoid mis-taps.",
        ],
      },
      {
        heading: "Test on real widths",
        paragraphs: [
          "Check common widths such as 320, 375, 414, 768 and 1280 pixels. Look for horizontal scrolling, clipped text and overlapping elements.",
        ],
        list: [
          "Long words or URLs can overflow — use overflow-wrap: anywhere",
          "Grids should collapse to one column on small screens",
          "Fixed headers should not cover anchored content",
        ],
      },
    ],
    summary:
      "Fluid widths, flexible images, generous touch targets and testing at real widths keep layouts working on every device.",
    cta: "Is your current site broken on phones? Let’s discuss fixing it.",
  },
  {
    slug: "developer-tools-for-web-and-app-projects",
    title: "Developer Tools Worth Learning for Web and App Projects",
    category: "Developer Tools",
    tags: ["developer tools", "git", "productivity"],
    type: "Guide",
    ...images.ai,
    readMinutes: 5,
    description:
      "An overview of developer tools for web and app development: version control, browser devtools, linters, testing and deployment.",
    intro:
      "Good tools make good habits easier. These categories of tools are worth learning early in any web or app development career.",
    sections: [
      {
        heading: "Version control with Git",
        paragraphs: [
          "Git records every change and lets you experiment safely on branches. Commit small, descriptive changes so you can find and undo mistakes.",
        ],
        code: 'git checkout -b feature/blog-search\ngit commit -m "Add blog search by title"',
      },
      {
        heading: "Browser developer tools",
        paragraphs: [
          "The browser’s devtools show the DOM, network requests, console errors and performance. Device mode lets you preview layouts at phone widths.",
        ],
      },
      {
        heading: "Linters, formatters and type checking",
        paragraphs: [
          "Tools like ESLint, Prettier and TypeScript catch errors before they reach users and keep code consistent across a team.",
        ],
      },
      {
        heading: "Testing and deployment",
        paragraphs: [
          "Automated tests protect working features, and hosted deployment platforms publish a site in minutes. Together they make shipping updates routine instead of risky.",
        ],
      },
    ],
    summary:
      "Git, browser devtools, linters, type checking, tests and simple deployment form a dependable toolkit for any project.",
    cta: "Looking for a developer with a modern workflow? Let’s connect.",
  },
  {
    slug: "documenting-the-genzii-development-journey",
    title: "Documenting the Genzii Development Journey",
    category: "Genzii Journey",
    tags: ["genzii", "app development", "build in public"],
    type: "Proposed workflow",
    ...images.app,
    readMinutes: 4,
    description:
      "How Isaac plans to document the Genzii app development journey. Project details and results will be added as they are confirmed.",
    intro:
      "Genzii is one of my app projects. This article explains how I plan to document its development. It is a proposed workflow — specific features, status and results will only be published once confirmed.",
    sections: [
      {
        heading: "Why document the journey",
        paragraphs: [
          "Writing about a project as it develops creates a record of decisions, helps others learn from the process and shows employers and clients how I approach problems.",
        ],
      },
      {
        heading: "What future posts will cover",
        paragraphs: ["Planned topics, to be written as the work happens:"],
        list: [
          "The problem Genzii aims to solve: [to add]",
          "Technical stack and why it was chosen: [to add]",
          "Challenges and how they were handled: [to add]",
          "Current status and next steps: [to confirm]",
        ],
      },
      {
        heading: "Honesty over hype",
        paragraphs: [
          "Every update will describe what actually happened. Concept images on this site are labeled as illustrations and are not screenshots of Genzii.",
        ],
      },
    ],
    summary:
      "This series will document Genzii honestly as it develops; details will be added only when they are real and confirmed.",
    cta: "Interested in Genzii or a similar app? Get in touch to start a conversation.",
  },
  {
    slug: "salon-website-features",
    title: "What a Salon Website Needs: Features and Content",
    category: "Website Development",
    tags: ["salon website development", "small business", "booking"],
    type: "Guide",
    ...images.web,
    readMinutes: 5,
    description:
      "A salon website development guide: services and prices, booking or contact options, gallery, location and mobile-friendly design.",
    intro:
      "Salon customers usually want three answers fast: what services you offer, what they cost and how to book. A salon website should make those answers obvious.",
    sections: [
      {
        heading: "Services and prices",
        paragraphs: [
          "List services in clear groups with honest prices or price ranges. Visitors are more likely to contact you when they know what to expect.",
        ],
      },
      {
        heading: "Easy booking or contact",
        paragraphs: [
          "Offer the booking method you actually use — a phone call, WhatsApp, or an online booking tool — and make it reachable in one tap on mobile.",
        ],
      },
      {
        heading: "Gallery and trust",
        paragraphs: [
          "Real photos of your work and space build trust. Only publish customer photos and reviews with permission.",
        ],
      },
      {
        heading: "Location and hours",
        paragraphs: [
          "Show your address, a map link and opening hours on every page footer, and keep them up to date.",
        ],
      },
    ],
    summary:
      "Clear services and prices, one-tap booking, real photos and accurate location details are the core of a salon website.",
    cta: "Running a salon or beauty business? Let’s discuss a website that brings in bookings.",
  },
  {
    slug: "core-web-vitals-for-beginners",
    title: "Core Web Vitals Explained for Beginners",
    category: "SEO",
    tags: ["website seo", "performance", "core web vitals"],
    type: "Tutorial",
    ...images.landing,
    readMinutes: 6,
    description:
      "Core Web Vitals tutorial: what LCP, INP and CLS measure and simple ways to improve page speed, responsiveness and visual stability.",
    intro:
      "Core Web Vitals are Google’s measurements of real user experience. They cover loading, responsiveness and visual stability.",
    sections: [
      {
        heading: "Largest Contentful Paint (LCP)",
        paragraphs: [
          "LCP measures how quickly the main content appears. Improve it by compressing the hero image, avoiding lazy-loading it, and reducing render-blocking resources.",
        ],
      },
      {
        heading: "Interaction to Next Paint (INP)",
        paragraphs: [
          "INP measures how quickly the page responds to taps and clicks. Keep JavaScript lean and avoid long tasks on the main thread.",
        ],
      },
      {
        heading: "Cumulative Layout Shift (CLS)",
        paragraphs: [
          "CLS measures unexpected movement. Always set image dimensions and reserve space for content that loads later.",
        ],
        code: '<img src="thumb.jpg" width="1200" height="800" loading="lazy" alt="..." />',
      },
      {
        heading: "Measuring",
        paragraphs: [
          "Use PageSpeed Insights or the Core Web Vitals report in Google Search Console to see field data from real visitors, then fix the worst pages first.",
        ],
      },
    ],
    summary:
      "Optimise the main image for LCP, keep scripts light for INP and reserve space for content to prevent CLS.",
    cta: "Want a faster website? Get in touch to discuss a performance review.",
  },
];

export const categories = Array.from(new Set(articles.map((article) => article.category)));
export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
export function relatedArticles(article: Article, limit = 3) {
  return articles
    .filter((other) => other.slug !== article.slug)
    .map((other) => ({
      other,
      score:
        (other.category === article.category ? 2 : 0) +
        other.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other);
}
