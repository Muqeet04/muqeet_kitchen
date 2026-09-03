"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { GALLERY_ITEMS } from "@/data/gallery";

const GALLERY_LERP = 0.12;

function clamp(x: number, a: number, b: number): number {
  return x < a ? a : x > b ? b : x;
}

export default function WorkGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const [progressPercent, setProgressPercent] = useState(1);

  const galleryCurrentXRef = useRef(0);
  const galleryTargetXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const computeGalleryTarget = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const progress = clamp(-rect.top / total, 0, 1);
    const maxShift = track.scrollWidth - window.innerWidth + 120;
    galleryTargetXRef.current = progress * Math.max(0, maxShift);

    const pct = Math.max(1, Math.round(progress * 100));
    setProgressPercent(pct);

    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pct}%`;
    }
  }, []);

  useEffect(() => {
    computeGalleryTarget();

    const tick = () => {
      const track = trackRef.current;
      if (track) {
        galleryCurrentXRef.current +=
          (galleryTargetXRef.current - galleryCurrentXRef.current) *
          GALLERY_LERP;
        track.style.transform = `translate3d(${-galleryCurrentXRef.current}px, 0, 0)`;
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    const handleScroll = () => {
      computeGalleryTarget();
    };

    const handleResize = () => {
      computeGalleryTarget();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 150);
    });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [computeGalleryTarget]);

  const handleManualScroll = (direction: "prev" | "next") => {
    const section = sectionRef.current;
    if (!section) return;

    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const step = total / (GALLERY_ITEMS.length - 1);
    const rect = section.getBoundingClientRect();
    const currentSectionScroll = -rect.top;

    const targetSectionScroll =
      direction === "next"
        ? Math.min(total, currentSectionScroll + step)
        : Math.max(0, currentSectionScroll - step);

    const targetWindowScroll =
      window.scrollY + (targetSectionScroll - currentSectionScroll);

    window.scrollTo({
      top: targetWindowScroll,
      behavior: "smooth",
    });
  };

  return (
    <section className="hgallery" id="work" ref={sectionRef}>
      <div className="hgallery-sticky">
        {/* Top Header Row with Meta & Arrow Controls */}
        <div className="hgallery-header-row">
          <div className="hgallery-header-left">
            <div className="eyebrow">Our craft</div>
            <h2>Recent Kitchens</h2>
            <p className="hgallery-subhead">
              Made &amp; Fitted <span className="dash">——</span> Bespoke Showcase
            </p>
          </div>

          <div className="hgallery-header-right">
            <div className="hgallery-meta-showcase">
              <div className="showcase-top">
                <span className="showcase-label">SHOWCASE</span>
                <span className="showcase-pct">{progressPercent}%</span>
              </div>
              <div className="showcase-bar">
                <div
                  className="showcase-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="hgallery-nav-buttons">
              <button
                className="gallery-nav-btn"
                aria-label="Previous kitchen"
                onClick={() => handleManualScroll("prev")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="gallery-nav-btn"
                aria-label="Next kitchen"
                onClick={() => handleManualScroll("next")}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Cards Track */}
        <div className="hgallery-track" id="galleryTrack" ref={trackRef}>
          {GALLERY_ITEMS.map((item) => (
            <figure key={item.id} className="hgallery-card">
              {/* Cover Image */}
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />

              {/* Scrim Overlay Gradients */}
              <div className="hgallery-card__scrim" />

              {/* Top Meta Bar */}
              <div className="hgallery-card__top">
                <span className="hgallery-card__tag">{item.tag}</span>
                <span className="hgallery-card__num">{item.num}</span>
              </div>

              {/* Bottom Meta Content */}
              <figcaption className="hgallery-card__bottom">
                <div className="hgallery-card__subtitle">{item.subtitle}</div>
                <div className="hgallery-card__row">
                  <h3 className="hgallery-card__title">{item.title}</h3>
                  <span className="hgallery-card__btn" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bottom Footer Meta Row */}
        <div className="hgallery-footer-row">
          <div className="hgallery-footer-left">
            HAND-SPRAYED SHAKER · BOOK-MATCHED SLABS · UNLACQUERED BRASS
          </div>
          <div className="hgallery-footer-right">
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* Bottom Progress Line */}
        <div className="hgallery-progress">
          <div
            className="hgallery-progress-fill"
            id="galleryProgress"
            ref={progressFillRef}
          />
        </div>
      </div>
    </section>
  );
}
