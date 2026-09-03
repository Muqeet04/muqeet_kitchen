"use client";

import React, { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Design",
    desc: "Laser-measured to the millimeter and modelled in architectural 3D — tailored to your lifestyle and verified before raw timber is milled.",
    delay: "0s",
  },
  {
    num: "02",
    title: "The workshop",
    desc: "Hand-crafted cabinetry built, dry-fitted, and primed at our workshop benches while your daily household routine carries on uninterrupted.",
    delay: ".08s",
  },
  {
    num: "03",
    title: "The Fit",
    desc: "A structured five-day on-site transformation: old units removed, carcasses leveled to laser lines, solid stone templated, and brass fitted.",
    delay: ".16s",
  },
  {
    num: "04",
    title: "Handover",
    desc: "Soft-close mechanisms tuned, natural stone sealed, warm ambient lighting tested, and worktops buffed — handed over ready for dinner.",
    delay: ".24s",
  },
];

export default function ProcessSection() {
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="block process glowfield" id="process" ref={sectionRef}>
      <div className="wrap">
        <div className="sec-head process-head rv">
          <div>
            <div className="eyebrow">What we do</div>
            <h2>Our process</h2>
          </div>
          <p className="process-subhead">How a kitchen lands — Five days on site</p>
        </div>

        <div className="steps">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="glass step rv lift"
              style={{ "--rd": step.delay } as React.CSSProperties}
            >
              <div className="n">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
