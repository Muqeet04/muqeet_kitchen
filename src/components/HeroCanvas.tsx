"use client";

import React, { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 296;
const HERO_LERP = 0.18;

interface HeroCanvasProps {
  onLoadProgress: (pct: number) => void;
  onAllLoaded: () => void;
  onHeaderSolidChange: (solid: boolean) => void;
}

function clamp(x: number, a: number, b: number): number {
  return x < a ? a : x > b ? b : x;
}

function win(p: number, a: number, b: number, f = 0.035): number {
  if (p < a - f || p > b + f) return 0;
  if (p < a) return (p - (a - f)) / f;
  if (p > b) return 1 - (p - b) / f;
  return 1;
}

export default function HeroCanvas({
  onLoadProgress,
  onAllLoaded,
  onHeaderSolidChange,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollcueRef = useRef<HTMLDivElement | null>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef<number>(0);
  const heroCurrentFrameRef = useRef<number>(0);
  const heroTargetFrameRef = useRef<number>(0);
  const primedRef = useRef<boolean>(false);
  const lastDrawnIdxRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const onLoadProgressRef = useRef(onLoadProgress);
  const onAllLoadedRef = useRef(onAllLoaded);
  const onHeaderSolidChangeRef = useRef(onHeaderSolidChange);

  onLoadProgressRef.current = onLoadProgress;
  onAllLoadedRef.current = onAllLoaded;
  onHeaderSolidChangeRef.current = onHeaderSolidChange;

  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  const drawFrame = useCallback((idx: number) => {
    if (!isVisibleRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (idx === lastDrawnIdxRef.current) return;
    const img = framesRef.current[idx];
    if (!img || !img.complete || !img.naturalWidth) return;

    lastDrawnIdxRef.current = idx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let sw: number, sh: number, sx: number, sy: number;

    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const idx = Math.round(heroCurrentFrameRef.current);
    if (framesRef.current[idx] && framesRef.current[idx].complete) {
      lastDrawnIdxRef.current = -1;
      drawFrame(idx);
    }
  }, [drawFrame]);

  const updateCaptions = useCallback((p: number) => {
    const ranges = [
      { a: 0.0, b: 0.1 },
      { a: 0.15, b: 0.33 },
      { a: 0.38, b: 0.57 },
      { a: 0.62, b: 0.8 },
      { a: 0.86, b: 1.0 },
    ];

    capRefs.current.forEach((cap, i) => {
      if (!cap || !ranges[i]) return;
      const o = win(p, ranges[i].a, ranges[i].b);
      cap.style.opacity = `${o}`;
      cap.style.transform = `translate3d(0, ${(1 - o) * 16}px, 0)`;
    });
  }, []);

  const computeHeroTarget = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const p = clamp(-rect.top / total, 0, 1);
    heroTargetFrameRef.current = p * (TOTAL_FRAMES - 1);
    updateCaptions(p);

    onHeaderSolidChangeRef.current(p > 0.99 || -rect.top >= total);

    if (scrollcueRef.current) {
      scrollcueRef.current.style.opacity = p < 0.04 ? "1" : "0";
    }
  }, [updateCaptions]);

  useEffect(() => {
    let active = true;

    const onFrameLoad = () => {
      if (!active) return;
      loadedCountRef.current++;
      const pct = (loadedCountRef.current / TOTAL_FRAMES) * 100;
      onLoadProgressRef.current(pct);

      if (loadedCountRef.current >= TOTAL_FRAMES && !primedRef.current) {
        primedRef.current = true;
        resizeCanvas();
        if (framesRef.current[0] && framesRef.current[0].complete) {
          drawFrame(0);
        }
        computeHeroTarget();
        onAllLoadedRef.current();
      }
    };

    const loadedFrames: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(4, "0");
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = onFrameLoad;
      img.onerror = onFrameLoad;
      loadedFrames.push(img);
    }
    framesRef.current = loadedFrames;

    if (loadedFrames[0] && loadedFrames[0].complete) {
      drawFrame(0);
    }

    const tick = () => {
      if (isVisibleRef.current) {
        const diff = heroTargetFrameRef.current - heroCurrentFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          heroCurrentFrameRef.current += diff * HERO_LERP;
          const idx = clamp(
            Math.round(heroCurrentFrameRef.current),
            0,
            TOTAL_FRAMES - 1
          );
          drawFrame(idx);
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    // Pause canvas rendering when hero is scrolled out of view to save 100% GPU cycles
    const heroEl = heroRef.current;
    let observer: IntersectionObserver | null = null;
    if (heroEl) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          isVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.01 }
      );
      observer.observe(heroEl);
    }

    let isTicking = false;
    const handleScroll = () => {
      if (!isVisibleRef.current) return;
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(() => {
          computeHeroTarget();
          isTicking = false;
        });
      }
    };

    const handleResize = () => {
      resizeCanvas();
      computeHeroTarget();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", () => {
      setTimeout(handleResize, 200);
    });

    resizeCanvas();
    computeHeroTarget();

    return () => {
      active = false;
      if (observer) observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [computeHeroTarget, drawFrame, resizeCanvas]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="stage">
        <div className="canvas-wrap">
          <canvas id="heroCanvas" ref={canvasRef} />
        </div>
        <div className="scrim" />

        <div className="caps">
          {/* Intro Caption */}
          <div
            className="cap intro"
            ref={(el) => {
              capRefs.current[0] = el;
            }}
          >
            <div className="inner">
              <div className="eyebrow est hero-tag">
                Kitchen fitting &amp; renovations
              </div>
              <div className="mark hero-title">
                Scroll to build
                <br />
                your kitchen
              </div>
              <div className="sub hero-sub">
                Hand-built cabinetry, polished stone worktops and brass fixtures
                — fitted by our own crew.
              </div>
            </div>
          </div>

          {/* Stage 1 */}
          <div
            className="cap stage-cap"
            ref={(el) => {
              capRefs.current[1] = el;
            }}
          >
            <div className="inner">
              <div className="cap-num">01 — Cabinetry</div>
              <h2>Built to the wall</h2>
              <p>
                Hand-crafted timber cabinetry, precision-joined in our workshop
                and tailored to scribed perfection along every wall.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div
            className="cap stage-cap"
            ref={(el) => {
              capRefs.current[2] = el;
            }}
          >
            <div className="inner">
              <div className="cap-num">02 — Worktops</div>
              <h2>Cut once, polished twice</h2>
              <p>
                Bespoke quartz and natural marble slabs — water-milled,
                hand-honed to dual perfection, and set with seamless masonry
                precision.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div
            className="cap stage-cap"
            ref={(el) => {
              capRefs.current[3] = el;
            }}
          >
            <div className="inner">
              <div className="cap-num">03 — Brass &amp; light</div>
              <h2>Warmed by degrees</h2>
              <p>
                Unlacquered brass and hand-blown pendants — left to age
                naturally and wired to warm dimming perfection.
              </p>
            </div>
          </div>

          {/* Stage 4 / CTA */}
          <div
            className="cap stage-cap right"
            ref={(el) => {
              capRefs.current[4] = el;
            }}
          >
            <div className="inner">
              <div className="cap-num">The finished room</div>
              <h2>Ready to cook</h2>
              <a className="cta" href="#contact">
                Start your kitchen &rarr;
              </a>
            </div>
          </div>
        </div>

        <div className="scrollcue" id="scrollcue" ref={scrollcueRef}>
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
