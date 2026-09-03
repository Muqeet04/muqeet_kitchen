"use client";

import React, { useEffect, useState } from "react";

interface HeaderProps {
  isSolid?: boolean;
}

export default function Header({ isSolid = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const headerEl = document.getElementById("header");
      if (headerEl) {
        document.documentElement.style.setProperty(
          "--headerH",
          `${headerEl.offsetHeight}px`
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMenuOpen(false);
    if (href === "#" || href === "#top") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header id="header" className={isSolid ? "solid" : ""}>
      <div className="wrap">
        <a
          className="brand"
          href="#top"
          onClick={(e) => handleLinkClick(e, "#top")}
        >
          <b>Native Coast</b>
          <span>KITCHEN APPLIANCES</span>
        </a>

        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          id="menuBtn"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "open" : ""}>
          <a
            className="lnk"
            href="#about"
            onClick={(e) => handleLinkClick(e, "#about")}
          >
            Craft
          </a>
          <a
            className="lnk"
            href="#process"
            onClick={(e) => handleLinkClick(e, "#process")}
          >
            Process
          </a>
          <a
            className="lnk"
            href="#work"
            onClick={(e) => handleLinkClick(e, "#work")}
          >
            Work
          </a>
          <a
            className="lnk"
            href="#reviews"
            onClick={(e) => handleLinkClick(e, "#reviews")}
          >
            Reviews
          </a>
          <a
            className="nav-cta"
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
          >
            Get a quote
          </a>
        </nav>
      </div>
    </header>
  );
}
