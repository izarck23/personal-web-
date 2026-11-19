import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { ArrowUpRight, Code2, Menu, X, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "./social";

export const navigation = ["Home", "About", "Services", "Portfolio", "Blog", "Contact"];
const sectionHref = (name: string, onHome: boolean) => {
  const id = name.toLowerCase();

  return onHome ? `#${id}` : `/#${id}`;
};

export function SiteHeader({
  activeSection,
  onHome = false,
}: {
  activeSection?: string;
  onHome?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="nav-bar" aria-label="Main navigation">
        <a className="brand" href={onHome ? "#home" : "/"} onClick={() => setMenuOpen(false)}>
          <span className="brand-icon">
            <Code2 size={17} aria-hidden="true" />
          </span>
          CoderTech<span className="orange">.</span>
        </a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`} id="main-navigation">
          {navigation.map((name) => {
            const active = activeSection === name.toLowerCase();
            return (
              <a
                key={name}
                href={sectionHref(name, onHome)}
                onClick={() => setMenuOpen(false)}
                className={`${active ? "active" : ""} ${name === "Contact" ? "nav-contact" : ""}`}
                aria-current={active ? (onHome ? "location" : "page") : undefined}
              >
                {name}
                {name === "Contact" && <ArrowUpRight size={14} aria-hidden="true" />}
              </a>
            );
          })}
          <Link
            to="/shop"
            className={activeSection === "shop" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
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
  );
}

export function SiteFooter({ onHire, onHome = false }: { onHire?: () => void; onHome?: boolean }) {
  const hire = onHire ? (
    <Button variant="portfolio" onClick={onHire}>
      Hire Me
      <ArrowUpRight />
    </Button>
  ) : (
    <Button variant="portfolio" asChild>
      <Link to="/services">
        Hire Me
        <ArrowUpRight />
      </Link>
    </Button>
  );
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <h2>Let’s Connect & Build</h2>
          {hire}
        </div>
        <div
          className="footer-columns"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          <div className="footer-intro">
            <a className="brand" href={onHome ? "#home" : "/"}>
              <span className="brand-icon">
                <Code2 size={16} aria-hidden="true" />
              </span>
              CoderTech<span className="orange">.</span>
            </a>
            <p style={{ marginTop: "12px", lineHeight: "1.7" }}>
              Software, apps, and verified digital templates.
              <br />
              Isaac Simiyu · Software & App Developer · Kenya.
            </p>
            <div style={{ marginTop: "16px" }}>
              <SocialLinks />
            </div>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/">Home & Portfolio</Link>
              <Link to="/about">About Isaac</Link>
              <Link to="/services">Custom Services</Link>
              <Link to="/shop">Template Marketplace</Link>
              <Link to="/blog">Engineering Blog</Link>
              <Link to="/contact">Direct Contact</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Templates & Support</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/download-instructions">Setup & Install Guide</Link>
              <Link to="/customisation-policy">Customisation Policy</Link>
              <Link to="/license">Product License Agreement</Link>
              <Link to="/refund-policy">Refund Policy</Link>
              <Link to="/admin">Admin Portal Preview</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Legal & Privacy</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <a href="mailto:codingspace254@gmail.com">codingspace254@gmail.com</a>
              <span style={{ fontSize: "12px", color: "var(--dark-muted)", marginTop: "8px" }}>
                Nairobi, Kenya (EAT / UTC+3)
              </span>
            </div>
          </div>
        </div>

        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span>© 2026 CoderTech. All rights reserved. Isaac Simiyu · Nairobi, Kenya</span>
          <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link to="/privacy" style={{ fontSize: "12px" }}>
              Privacy
            </Link>
            &bull;
            <Link to="/terms" style={{ fontSize: "12px" }}>
              Terms
            </Link>
            &bull;
            <Link to="/license" style={{ fontSize: "12px" }}>
              License
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
