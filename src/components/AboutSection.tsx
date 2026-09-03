"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animateCount = (
      target: number,
      setter: (val: number) => void,
      duration = 1500
    ) => {
      if (reduceMotion) {
        setter(target);
        return;
      }
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(1, (timestamp - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setter(Math.round(target * eased));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add .in to all .rv child elements
            const reveals = entry.target.querySelectorAll(".rv");
            reveals.forEach((r) => r.classList.add("in"));

            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }

            if (!hasAnimated) {
              setHasAnimated(true);
              animateCount(15, setCount1);
              animateCount(500, setCount2);
              animateCount(5, setCount3);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      className="block about glowfield"
      id="about"
      ref={sectionRef}
    >
      <div className="wrap">
        <div className="glass lead-card rv">
          <div className="eyebrow about-eyebrow">The Native Coast way</div>
          <p className="lead about-lead">
            A kitchen is the room that earns its keep —{" "}
            <span className="hl">built once</span>, built for generations.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-media rv" style={{ "--rd": ".06s" } as React.CSSProperties}>
            <video
              ref={videoRef}
              className="about-video"
              src="/assets/section2_anim.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div className="glass copy-card rv" style={{ "--rd": ".1s" } as React.CSSProperties}>
            <p>
              We craft one bespoke kitchen at a time, entirely by hand in our
              workshop. From bench-joined cabinetry to laser-fitted stone, our
              in-house craftsmen deliver every room without subcontractors.
            </p>
          </div>

          <div
            className="glass stat-card rv lift"
            style={{ "--rd": ".16s" } as React.CSSProperties}
          >
            <b className="stat-num">
              <span>{count1}</span>
              <span className="stat-suffix">+</span>
            </b>
            <span className="stat-label">Years of experience</span>
          </div>

          <div
            className="glass stat-card rv lift"
            style={{ "--rd": ".22s" } as React.CSSProperties}
          >
            <b className="stat-num">
              <span>{count2}</span>
              <span className="stat-suffix">+</span>
            </b>
            <span className="stat-label">Kitchens fitted</span>
          </div>

          <div
            className="glass stat-card rv lift"
            style={{ "--rd": ".28s" } as React.CSSProperties}
          >
            <b className="stat-num">
              <span>{count3}</span>
              <span className="stat-suffix">-days</span>
            </b>
            <span className="stat-label">Fit, start to finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
