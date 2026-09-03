"use client";

import React, { useEffect, useRef } from "react";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reveals = entry.target.querySelectorAll(".rv");
            reveals.forEach((r) => r.classList.add("in"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="block contact" id="contact" ref={sectionRef}>
      <div className="wrap">
        <div className="contact-grid">
          <div className="rv">
            <div className="eyebrow">Get in touch</div>
            <h2>Let&apos;s make your kitchen</h2>
            <p className="sub">
              Tell us how you cook and how many you feed — we&apos;ll come and
              measure, free of obligation, and price the whole commission as one
              transparent number.
            </p>
            <div className="detail-list">
              <div className="row">
                <span className="k">Telephone</span>
                <span className="v">
                  <a href="tel:+441234567890">01234 567 890</a>
                </span>
              </div>
              <div className="row">
                <span className="k">Email</span>
                <span className="v">
                  <a href="mailto:hello@nativecoast.co.uk">
                    hello@nativecoast.co.uk
                  </a>
                </span>
              </div>
              <div className="row">
                <span className="k">Serving</span>
                <span className="v">London &amp; the Home Counties</span>
              </div>
              <div className="row">
                <span className="k">Hours</span>
                <span className="v">Mon–Fri, 8:00–5:30</span>
              </div>
            </div>
          </div>

          <div
            className="glass contact-card rv"
            style={{ "--rd": ".1s" } as React.CSSProperties}
          >
            <div className="eyebrow">Free measure</div>
            <h3>Request a quote</h3>
            <p>
              Send a photo of your kitchen as it is now and a rough idea of what
              you&apos;re after — colour, stone, island or not. We&apos;ll reply with
              honest advice and a fixed price: cabinetry, stone, fit, the lot.
            </p>
            <a className="cta" href="mailto:hello@nativecoast.co.uk">
              Email the workshop &rarr;
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <footer>
          <div className="foot">
            <div className="brand-f">Native Coast</div>
            <small>Kitchen appliances, fitted &amp; renovated</small>
            <small className="made">Design · Make · Fit</small>
          </div>
        </footer>
      </div>
    </section>
  );
}
