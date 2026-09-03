"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { REVIEWS, REVIEW_ATMOSPHERES } from "@/data/reviews";

function clamp(x: number, a: number, b: number): number {
  return x < a ? a : x > b ? b : x;
}

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const computeScrollProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const p = clamp(-rect.top / total, 0, 1);
    setScrollProgress(Math.round(p * 100));

    // Map 0..1 to review index (0 to REVIEWS.length - 1)
    const rawIndex = Math.min(
      Math.floor(p * REVIEWS.length),
      REVIEWS.length - 1
    );
    setActiveIndex(rawIndex);

    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${Math.max(10, p * 100)}%`;
    }
  }, []);

  useEffect(() => {
    computeScrollProgress();

    let isTicking = false;
    const handleScroll = () => {
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(() => {
          computeScrollProgress();
          isTicking = false;
        });
      }
    };

    const handleResize = () => {
      computeScrollProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 150);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [computeScrollProgress]);

  const scrollToReview = (targetIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const total = section.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const targetProgress = (targetIndex + 0.5) / REVIEWS.length;
    const rect = section.getBoundingClientRect();
    const currentScrollY = window.scrollY || window.pageYOffset;
    const sectionTop = currentScrollY + rect.top;
    const targetScrollY = sectionTop + targetProgress * total;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const currentAtmosphere =
    REVIEW_ATMOSPHERES[activeIndex] || REVIEW_ATMOSPHERES[0];

  return (
    <section className="reviews-sticky-section" id="reviews" ref={sectionRef}>
      <div className="reviews-sticky-stage">
        {/* Background & Atmospheric Dynamic Ambient Glow */}
        <div className="reviews-bg" id="reviewsBg" />
        <div
          className="reviews-glow"
          style={{ background: currentAtmosphere.glow }}
        />

        <div className="wrap reviews-header-wrap">
          <div className="reviews-top-bar">
            <div>
              <div className="eyebrow">Client stories</div>
              <h2>Verified reviews</h2>
            </div>

            {/* Top Navigation Controls */}
            <div className="reviews-nav-controls">
              <span className="reviews-counter">
                0{activeIndex + 1}{" "}
                <span className="reviews-counter-sep">/</span> 0{REVIEWS.length}
              </span>
              <div className="reviews-nav-buttons">
                <button
                  className="gallery-nav-btn"
                  aria-label="Previous review"
                  onClick={() =>
                    scrollToReview(Math.max(0, activeIndex - 1))
                  }
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
                  aria-label="Next review"
                  onClick={() =>
                    scrollToReview(
                      Math.min(REVIEWS.length - 1, activeIndex + 1)
                    )
                  }
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
        </div>

        {/* Single Focused Card Stage (Turn by turn scroll reveal) */}
        <div className="reviews-single-stage">
          {REVIEWS.map((rev, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={rev.id}
                className={`glass review-card review-card--single ${
                  isActive ? "is-active" : "is-hidden"
                }`}
                style={{
                  background: currentAtmosphere.cardBg,
                  borderColor: currentAtmosphere.border,
                }}
                aria-hidden={!isActive}
              >
                <div className="reviews-card-inner">
                  <div className="reviews-card-top-row">
                    <div className="reviews-stars">{rev.stars}</div>
                    <span className="reviews-card-tag">VERIFIED CLIENT</span>
                  </div>

                  <blockquote className="review-quote">{rev.quote}</blockquote>

                  <div className="reviews-card-footer">
                    <div className="review-who">
                      <b>{rev.author}</b> &nbsp;·&nbsp; {rev.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Interactive Progress & Dots */}
        <div className="reviews-bottom-row">
          <div className="reviews-dots">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                className={`reviews-dot ${
                  idx === activeIndex ? "is-active" : ""
                }`}
                onClick={() => scrollToReview(idx)}
                aria-label={`Scroll to review ${idx + 1}`}
              />
            ))}
          </div>
          <div className="reviews-scroll-hint">
            SCROLL TO READ STORIES ({scrollProgress}%)
          </div>
        </div>
      </div>
    </section>
  );
}
