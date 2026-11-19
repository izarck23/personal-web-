// Real project facts stay as supplied by Isaac; images are AI-generated concepts until real screenshots replace them.
// To replace an image: drop the real file in src/assets/ and change the import below.
import genzii from "@/assets/genzii-screens.webp";
import startup from "@/assets/generated/concept-startup-pages.jpg";
import landing from "@/assets/generated/concept-landing-pages.jpg";
import salonAsset from "@/assets/luxe-salon-desktop.png.asset.json";
const salon = salonAsset.url;

export type ProjectLink = { label: string; href: string };
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  body: string[];
  image: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  relatedCategory: string;
  links?: ProjectLink[];
};
export const luxeSalonLinks: ProjectLink[] = [
  { label: "Preview the live website", href: "https://izarck23.github.io/luxe-salon-website/" },
  { label: "Preview the template", href: "https://izarck23.github.io/luxe-salon-website/" },
  {
    label: "Download the code (ZIP)",
    href: "https://github.com/izarck23/luxe-salon-website/archive/refs/heads/main.zip",
  },
  { label: "View the code on GitHub", href: "https://github.com/izarck23/luxe-salon-website" },
];

const tpl = (slug: string): ProjectLink[] => [
  { label: "Preview the template", href: `/templates/${slug}/index.html` },
  { label: "Download the editable code (ZIP)", href: `/downloads/${slug}-template.zip` },
];
export const startupLinks = tpl("startup");
export const landingLinks = tpl("landing-page");
export const projects: Project[] = [
  {
    slug: "genzii",
    title: "Genzii",
    category: "Mobile App",
    heading: "Genzii Android Application",
    description: "Originality checking and content verification mobile app.",
    body: [
      "Genzii is a native Android application built with Kotlin and Jetpack Compose.",
      "Designed with Material Design 3 guidelines, featuring vaulted document storage, AI content analysis, and clean originality inspection screens.",
      "Engineered with clean MVVM architecture, reactive state flows, and modular component hierarchy.",
    ],
    image: genzii,
    imageAlt: "Genzii app UI screens: onboarding, AI assistant, originality checker and vault",
    seoTitle: "Genzii App Development — Isaac, Software Developer Kenya",
    seoDescription:
      "Genzii is an Android originality verification and content intelligence app engineered with Kotlin and Jetpack Compose by Isaac.",
    relatedCategory: "Genzii Journey",
  },
  {
    slug: "startup-pages",
    title: "Startup Pages",
    category: "Website Template",
    heading: "Startup Website Engineering",
    description:
      "Complete editable HTML & CSS startup website template with dashboard and roadmap.",
    body: [
      "Comprehensive startup website engineered with vanilla HTML5, CSS3, and responsive design tokens.",
      "Includes key performance metrics dashboard, step-by-step feature breakdown, founder team cards, roadmap timeline, and early access waitlist form.",
      "Built for immediate deployment to GitHub Pages, Netlify, or any static hosting platform with zero build dependencies.",
    ],
    image: startup,
    imageAlt: "Concept illustration of a startup website homepage preview",
    seoTitle: "Startup Website Development — Isaac, Kenya",
    seoDescription:
      "Startup website template and custom web engineering by Isaac, a software developer based in Kenya.",
    relatedCategory: "Landing Pages",
    links: startupLinks,
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    category: "Product Landing Page",
    heading: "Conversion Landing Page Development",
    description: "Editable HTML & CSS product landing page template with pricing and FAQs.",
    body: [
      "High-converting landing page engineered for software tools, digital products, and modern services.",
      "Includes responsive device mockup frames, icon feature cards, 3-tier pricing tables, and native expandable FAQ accordions.",
      "Optimized for core web vitals, accessible keyboard navigation, and fast mobile loading times.",
    ],
    image: landing,
    imageAlt: "Concept illustration of a landing page on tablet and phone viewports",
    seoTitle: "Startup Landing Page Development — Isaac, Kenya",
    seoDescription:
      "High-converting product landing page development and standalone templates by Isaac in Kenya.",
    relatedCategory: "Landing Pages",
    links: landingLinks,
  },
  {
    slug: "luxe-salon",
    title: "Luxe Salon",
    category: "Client Website",
    heading: "Luxe Salon & Barber Digital Platform",
    description:
      "Salon, barbershop & spa website with service pricing in KSh and appointment booking.",
    body: [
      "A complete digital platform created for Luxe Salon & Barber in Westlands, Nairobi.",
      "Features real-time online appointment scheduling, booking lookup, service rate cards in KSh, about section, and dark/light mode toggle.",
      "Complete live website and source code repository available on GitHub.",
    ],
    image: salon,
    imageAlt:
      "Luxe Salon & Barber website homepage: dark hero with booking buttons, prices from KSh 300 and opening hours",
    seoTitle: "Luxe Salon — Salon Website Development by Isaac",
    seoDescription:
      "Luxe Salon & Barber website development by Isaac in Kenya, featuring online appointment booking and transparent pricing.",
    relatedCategory: "Website Development",
    links: luxeSalonLinks,
  },
];
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
