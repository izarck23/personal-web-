import { luxeSalonLinks } from "@/content/projects";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Code2, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks, SITE_URL } from "@/components/portfolio/social";
import { ArticleCard } from "@/components/portfolio/article-card";
import { articles } from "@/content/articles";
import { ShowcaseCarousel } from "@/components/portfolio/carousel";
import serviceApp from "@/assets/generated/service-app-ui.jpg";
import serviceWeb from "@/assets/generated/service-website-ui.jpg";
import serviceLanding from "@/assets/generated/service-landing-ui.jpg";
import isaacPhoto from "@/assets/isaac-professional.webp";
import genziiScreens from "@/assets/genzii-screens.webp";
import luxeSalonShot from "@/assets/luxe-salon-desktop.png.asset.json";
import { ProjectAdvisor } from "@/components/portfolio/project-advisor";
import { DetailModal, InquiryModal, type PortfolioDetail } from "@/components/portfolio/modal";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Isaac — Software & App Developer in Kenya | Landing Page Development" },
      {
        name: "description",
        content:
          "Isaac is a software and app developer in Kenya building mobile apps, websites, startup pages and landing pages. Hire for employment or freelance app and landing page development.",
      },
      {
        property: "og:title",
        content: "Isaac — Software & App Developer in Kenya | Landing Page Development",
      },
      {
        property: "og:description",
        content:
          "Isaac is a software and app developer in Kenya building mobile apps, websites, startup pages and landing pages. Hire for employment or freelance app and landing page development.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Index,
});
const navigation = ["Home", "About", "Services", "Portfolio", "Blog", "Contact"];
const services = [
  {
    image: serviceApp,
    title: "App Development",
    description: "Native Android & mobile applications.",
    body: [
      "Modern Android application development using Kotlin and Jetpack Compose.",
      "Clean architecture, reactive state management, and modern Material 3 UI implementations.",
      "Responsive layout engineering across phone and tablet viewports with Google Play readiness.",
    ],
  },
  {
    image: serviceWeb,
    title: "Website Development",
    description: "Responsive business websites & web applications.",
    body: [
      "Custom responsive websites built with modern frameworks and clean semantic HTML5/CSS3.",
      "Optimized for high performance, accessibility, fast loading times, and SEO visibility.",
      "Interactive features including appointment scheduling, service catalogs, and dynamic integrations.",
    ],
  },
  {
    image: serviceLanding,
    title: "Landing Pages",
    description: "Conversion-optimized product pages.",
    body: [
      "High-impact landing pages crafted for software startups, digital tools, and creative businesses.",
      "Clear visual hierarchy, compelling calls-to-action, pricing comparison tables, and FAQ accordions.",
      "Engineered for rapid loading and frictionless user engagement across all devices.",
    ],
  },
];
const projects: PortfolioDetail[] = [
  {
    title: "Genzii",
    category: "App Project",
    description: "Android originality verification and content intelligence app.",
    body: [
      "Genzii is a modern Android application engineered with Kotlin and Jetpack Compose.",
      "Designed with Material Design 3 guidelines for content checking, text analysis, and document management.",
      "Features intuitive onboarding, vaulted document storage, and clean originality inspection screens.",
    ],
  },
  {
    templateSlug: "startup",
    title: "Startup Pages",
    category: "Website Template",
    description: "Startup website template with hero, dashboard preview, and roadmap.",
    body: [
      "Complete editable startup website engineered with vanilla HTML5, CSS3, and modern typography.",
      "Includes key metrics dashboard, step-by-step how-it-works cards, team roster, timeline roadmap, and early access form.",
      "Zero build step required: extract and launch on any static host.",
    ],
  },
  {
    templateSlug: "landing-page",
    title: "Landing Pages",
    category: "Product Landing Page",
    description: "High-converting product landing page template with pricing and FAQs.",
    body: [
      "Lightweight, standalone product landing page template tailored for SaaS and digital tools.",
      "Features hero mockups, feature cards with icon accents, tiered pricing tables, and native collapsible FAQ accordions.",
      "Full mobile responsiveness and accessible keyboard navigation out of the box.",
    ],
  },
  {
    title: "Luxe Salon",
    category: "Client Website",
    description: "Salon, barbershop & spa website with service pricing and online booking.",
    body: [
      "Comprehensive digital experience created for Luxe Salon & Barber in Westlands, Nairobi.",
      "Includes transparent service rates in KSh, real-time appointment scheduling, dark/light theme toggle, and opening hours.",
      "Live preview and complete source code repository available on GitHub.",
    ],
    links: luxeSalonLinks,
  },
  {
    title: "Authentication Screens",
    templateSlug: "authentication",
    category: "UI Template",
    description: "Sign in, account creation, and password reset template suite.",
    body: [
      "Three production-ready authentication screens with responsive split-screen hero visual and form panel.",
      "Accessible inputs, password reveal toggle, social login button styles, and native client validation.",
      "Ready to connect to any backend authentication service.",
    ],
  },
];
type ExperienceItem = {
  company: string;
  date: string;
  role: string;
  description: string;
  detail: string;
  skills?: string[];
};
const experiences: ExperienceItem[] = [
  {
    company: "Mobile Engineering",
    date: "Current Focus",
    role: "Native Android & Kotlin Developer",
    description: "Modern Android application architecture with Jetpack Compose.",
    detail:
      "Engineering native Android user interfaces, reactive state management, clean architecture, and Material Design 3 components, as demonstrated in the Genzii application.",
    skills: [
      "Kotlin",
      "Jetpack Compose",
      "Android SDK",
      "Material 3 UI",
      "MVVM Architecture",
      "StateFlow & Coroutines",
    ],
  },
  {
    company: "Web Development",
    date: "Active Practice",
    role: "Full-Stack & Frontend Engineer",
    description: "Modern responsive web applications, templates, and client platforms.",
    detail:
      "Developing high-performance responsive web applications, complete standalone marketplace templates, and client solutions like Luxe Salon with appointment scheduling.",
    skills: [
      "TypeScript",
      "React",
      "TanStack Router/Start",
      "Tailwind CSS",
      "Semantic HTML5 & CSS3",
      "REST & Server Functions",
    ],
  },
  {
    company: "Design & Performance",
    date: "Core Discipline",
    role: "UI/UX & Performance Specialist",
    description: "Accessible design systems, responsive viewports, and core web vitals.",
    detail:
      "Focusing on mobile-first user experience, accessible form validation, clean typographic hierarchy, and fast loading performance across mobile and desktop devices.",
    skills: [
      "Mobile-First Design",
      "Accessibility (a11y)",
      "Core Web Vitals",
      "Component Systems",
      "Cross-Browser Testing",
    ],
  },
];
function AssetPlaceholder({ label }: { label: string }) {
  return (
    <div className="asset-placeholder">
      <Code2 aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [activeService, setActiveService] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeBlog, setActiveBlog] = useState(0);
  const [experience, setExperience] = useState<number | null>(0);
  const [detail, setDetail] = useState<PortfolioDetail | null>(null);
  const [inquiry, setInquiry] = useState(false);
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }),
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach((name) => {
      const element = document.getElementById(name.toLowerCase());
      if (element) navObserver.observe(element);
    });
    return () => {
      revealObserver.disconnect();
      navObserver.disconnect();
    };
  }, []);
  const openService = (index: number) => {
    setActiveService(index);
    const service = services[index];
    if (service) setDetail({ ...service, category: "Design services" });
  };
  return (
    <div className="portfolio-site">
      <header className="site-header">
        <nav className="nav-bar" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
            <span className="brand-icon">
              <Code2 size={17} />
            </span>
            CoderTech<span className="orange">.</span>
          </a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`} id="main-navigation">
            {navigation.map((name) => (
              <a
                key={name}
                href={`#${name.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={`${activeSection === name.toLowerCase() ? "active" : ""} ${name === "Contact" ? "nav-contact" : ""}`}
                aria-current={activeSection === name.toLowerCase() ? "location" : undefined}
              >
                {name}
                {name === "Contact" && <ArrowUpRight size={14} />}
              </a>
            ))}
            <Link to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </div>
          <Button
            variant="portfolioIcon"
            size="icon"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
      </header>
      <main>
        <section id="home" className="hero container">
          <div className="hero-copy">
            <span className="hello-label">Hello!</span>
            <h1>
              I’m <span className="orange">Isaac,</span>
              <br />
              <span className="orange">Software &</span>
              <br />
              <span className="orange">App Developer.</span>
            </h1>
            <p>
              Based in Kenya.
              <br />
              Open to employment opportunities and freelance projects.
            </p>
            <div className="hero-actions">
              <Button variant="portfolio" asChild>
                <a href="#portfolio">
                  Portfolio
                  <ArrowUpRight />
                </a>
              </Button>
              <Button variant="portfolioOutline" onClick={() => setInquiry(true)}>
                Hire Me
                <ArrowUpRight />
              </Button>
            </div>
            <div className="hero-caption">
              Software, apps and websites.{" "}
              <Link to="/shop">
                Template shop
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <div className="portrait-scene">
            <Sparkles className="portrait-marker" size={46} strokeWidth={1.2} />
            <div className="hero-photo">
              <img src={isaacPhoto} alt="Isaac, Software & App Developer, seated with a phone" />
            </div>
            <div className="portrait-note">
              <strong>Kenya</strong>
              <span>Software & App Developer</span>
            </div>
          </div>
        </section>
        <section id="services" className="section dark-section">
          <div className="container reveal">
            <div className="section-top">
              <div>
                <div className="eyebrow">What I do</div>
                <h2 className="section-heading">
                  My <span className="orange">Services</span>
                </h2>
              </div>
              <p>App and website development, startup pages and landing pages.</p>
            </div>
            <ShowcaseCarousel label="services" onSelect={setActiveService}>
              {services.map((service, index) => (
                <div className="carousel-slide" key={service.title}>
                  <article className={`service-card ${index === activeService ? "selected" : ""}`}>
                    <div className="service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>
                    <div className="service-image">
                      <img
                        className="project-photo"
                        src={service.image}
                        alt={`Sample ${service.title} UI concept`}
                        width={1024}
                        height={768}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-arrow">
                      <Button
                        variant="portfolioIcon"
                        size="icon"
                        aria-label={`Explore ${service.title}`}
                        title={`Explore ${service.title}`}
                        onClick={() => openService(index)}
                      >
                        <ArrowUpRight />
                      </Button>
                    </div>
                  </article>
                </div>
              ))}
            </ShowcaseCarousel>
          </div>
        </section>
        <section className="section">
          <div className="container reveal">
            <div className="experience-heading">
              <div className="eyebrow">The journey so far</div>
              <h2 className="section-heading">
                My Work <span className="orange">Experience</span>
              </h2>
            </div>
            <div className="experience-list">
              {experiences.map((item, index) => (
                <div className="experience-row" key={item.company}>
                  <div className="experience-left">
                    <h3>{item.company}</h3>
                    <span>{item.date}</span>
                  </div>
                  <div className="timeline-line">
                    <Button
                      className="timeline-point"
                      aria-label={`${experience === index ? "Hide" : "Show"} ${item.company} experience details`}
                      title={`${item.company} experience details`}
                      aria-expanded={experience === index}
                      aria-controls={`experience-${index}`}
                      onClick={() => setExperience(experience === index ? null : index)}
                    />
                  </div>
                  <div className="experience-right">
                    <h3>{item.role}</h3>
                    <p>{item.description}</p>
                    {experience === index && (
                      <div id={`experience-${index}`} className="experience-detail">
                        {item.detail}
                        {item.skills && (
                          <ul className="experience-skills">
                            {item.skills.map((skill) => (
                              <li key={skill}>{skill}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-layout reveal">
            <div className="about-portrait">
              <div className="portrait-disc">
                <img
                  className="portrait-photo"
                  src={isaacPhoto}
                  alt="Isaac, Software & App Developer"
                />
              </div>
            </div>
            <div className="about-copy">
              <div className="eyebrow">A little about me</div>
              <h2 className="section-heading">
                Why <span className="orange">Hire Me</span> for
                <br />
                Your Next Project?
              </h2>
              <p>
                I’m Isaac, a Software & App Developer based in Kenya. I build native Android
                applications with Kotlin, responsive web solutions with TypeScript and React, and
                standalone digital templates. I focus on clean architecture, accessible user
                experiences, and responsive layouts that perform seamlessly across all devices. Open
                to full-time engineering roles, contract development, and freelance client
                collaborations.
              </p>
              <div className="about-values">
                <div>
                  <strong>Employment</strong>
                  <span>Open to opportunities</span>
                </div>
                <div>
                  <strong>Freelance</strong>
                  <span>Open to project discussions</span>
                </div>
              </div>
              <Button variant="portfolio" onClick={() => setInquiry(true)}>
                Hire Me
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </section>
        <section id="portfolio" className="section">
          <div className="container reveal">
            <div className="section-top">
              <div>
                <div className="eyebrow">Selected work</div>
                <h2 className="section-heading">
                  Let’s Have a Look at
                  <br />
                  my <span className="orange">Portfolio</span>
                </h2>
              </div>
              <Button
                variant="portfolio"
                onClick={() =>
                  setDetail({
                    title: "Selected projects",
                    category: "Portfolio collection",
                    description: "Genzii, startup pages, landing pages and Luxe Salon.",
                    body: projects.map((project) => `${project.title} — ${project.description}`),
                  })
                }
              >
                See More
                <ArrowUpRight />
              </Button>
            </div>
            <ShowcaseCarousel label="projects" onSelect={setActiveProject}>
              {projects.map((project, index) => (
                <div className="carousel-slide project-slide" key={project.title}>
                  <article className={`project-card ${activeProject === index ? "selected" : ""}`}>
                    <div className="project-image">
                      {project.title === "Genzii" ? (
                        <img
                          className="project-photo"
                          src={genziiScreens}
                          alt="Genzii app UI screens: onboarding, AI assistant, originality checker and vault"
                          loading="lazy"
                        />
                      ) : project.title === "Luxe Salon" ? (
                        <img
                          className="project-photo"
                          src={luxeSalonShot.url}
                          alt="Luxe Salon & Barber website homepage: dark hero with booking buttons, prices from KSh 300 and opening hours"
                          loading="lazy"
                        />
                      ) : project.templateSlug ? (
                        <iframe
                          className="portfolio-template-frame"
                          src={`/templates/${project.templateSlug}/index.html`}
                          title={`${project.title} UI preview`}
                          loading="lazy"
                          sandbox=""
                          tabIndex={-1}
                        />
                      ) : (
                        <AssetPlaceholder label={`${project.title} screenshot: [to add]`} />
                      )}
                      <div className="card-arrow">
                        <Button
                          variant="portfolioIcon"
                          size="icon"
                          title={`View ${project.title}`}
                          aria-label={`View ${project.title}`}
                          onClick={() => setDetail(project)}
                        >
                          <ArrowUpRight />
                        </Button>
                      </div>
                    </div>
                    <div className="project-info">
                      <div className="project-type">{project.category}</div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </ShowcaseCarousel>
          </div>
        </section>
        <section id="contact" className="section contact-section">
          <div className="container reveal">
            <div className="eyebrow">Employment & freelance opportunities</div>
            <h2 className="section-heading">
              Have a Role or Project
              <br />
              in Mind? <span className="orange">Let’s Discuss</span>
            </h2>
            <p>
              Based in Kenya (East Africa Time, GMT+3). Open for full-time software engineering
              roles, contract development, and freelance projects. Messages are reviewed promptly.
            </p>
            <Button variant="portfolio" onClick={() => setInquiry(true)}>
              Let’s Discuss
              <ArrowUpRight />
            </Button>
            <SocialLinks variant="light" showLabels />
            <div className="contact-promises">
              <span>
                <Check />
                Employment opportunities
              </span>
              <span>
                <Check />
                Freelance projects
              </span>
              <span>
                <Check />
                Kenya
              </span>
            </div>
            <ProjectAdvisor />
          </div>
        </section>
        <div className="design-ribbon" aria-hidden="true">
          <div className="ribbon-inner">
            {[
              "Software Development",
              "App Development",
              "Genzii",
              "Startup Pages",
              "Landing Pages",
              "Luxe Salon",
              "Websites",
            ].map((label, index) => (
              <span key={`${label}-${index}`}>
                {label}
                <Sparkles />
              </span>
            ))}
          </div>
        </div>
        <section id="blog" className="section">
          <div className="container reveal">
            <div className="section-top">
              <div>
                <div className="eyebrow">Development journal</div>
                <h2 className="section-heading">
                  From my
                  <br />
                  <span className="orange">blog</span> post
                </h2>
              </div>
              <Button variant="portfolio" asChild>
                <Link to="/blog">
                  View All
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <ShowcaseCarousel label="blog posts" onSelect={setActiveBlog}>
              {articles.map((article, index) => (
                <div className="carousel-slide" key={article.slug}>
                  <ArticleCard article={article} selected={activeBlog === index} />
                </div>
              ))}
            </ShowcaseCarousel>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <h2>Let’s Connect</h2>
            <Button variant="portfolio" onClick={() => setInquiry(true)}>
              Hire Me
              <ArrowUpRight />
            </Button>
          </div>
          <div className="footer-columns">
            <div className="footer-intro">
              <a className="brand" href="#home">
                <span className="brand-icon">
                  <Code2 size={16} />
                </span>
                CoderTech<span className="orange">.</span>
              </a>
              <p>
                Software, apps and websites.
                <br />
                Isaac · Software & App Developer · Kenya.
              </p>
              <SocialLinks />
            </div>
            <div className="footer-column">
              <h3>Navigation</h3>
              {navigation.map((name) => (
                <a key={name} href={`#${name.toLowerCase()}`}>
                  {name}
                </a>
              ))}
            </div>
            <div className="footer-column">
              <h3>Let’s work together</h3>
              <p>Have something in mind?</p>
              <p>I’d love to hear about it.</p>
              <Button variant="portfolioOutline" onClick={() => setInquiry(true)}>
                Start a conversation
                <ArrowUpRight />
              </Button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 CoderTech. All rights reserved.</span>
            <span>Isaac · Kenya</span>
          </div>
        </div>
      </footer>
      <DetailModal detail={detail} onClose={() => setDetail(null)} />
      <InquiryModal open={inquiry} onClose={() => setInquiry(false)} />
    </div>
  );
}
