"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { TRAIL_IMAGES } from "@/data/gallery";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  image: string;
  rotation: number;
  scale: number;
  zIndex: number;
}

interface StyleSelectorProps {
  images?: string[];
  distanceThreshold?: number;
  maxTrailItems?: number;
}

export default function StyleSelector({
  images = TRAIL_IMAGES,
  distanceThreshold = 45,
  maxTrailItems = 5,
}: StyleSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const imageIndexRef = useRef(0);
  const zIndexRef = useRef(1);
  const nextIdRef = useRef(0);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const spawnImage = useCallback(
    (clientX: number, clientY: number, forceSpawn = false) => {
      const container = containerRef.current;
      if (!container || !images.length) return;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x < -20 || x > rect.width + 20 || y < -20 || y > rect.height + 20)
        return;

      if (!forceSpawn && lastPosRef.current) {
        const dist = Math.hypot(
          x - lastPosRef.current.x,
          y - lastPosRef.current.y
        );
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const effectiveThreshold = isMobile ? 18 : distanceThreshold;
        if (dist < effectiveThreshold) return;
      }

      lastPosRef.current = { x, y };

      const currentImg = images[imageIndexRef.current % images.length];
      imageIndexRef.current += 1;
      zIndexRef.current += 1;

      const newItem: TrailItem = {
        id: nextIdRef.current++,
        x: Math.max(30, Math.min(rect.width - 30, x)),
        y: Math.max(30, Math.min(rect.height - 30, y)),
        image: currentImg,
        rotation: (Math.random() - 0.5) * 14,
        scale: 0.92 + Math.random() * 0.16,
        zIndex: zIndexRef.current,
      };

      setTrail((prev) => {
        const updated = [...prev, newItem];
        if (updated.length > maxTrailItems) {
          return updated.slice(updated.length - maxTrailItems);
        }
        return updated;
      });

      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 2000);
    },
    [images, distanceThreshold, maxTrailItems]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let autoInterval: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasInteractedRef.current) {
          if (window.innerWidth < 768) {
            autoInterval = setInterval(() => {
              if (hasInteractedRef.current) {
                if (autoInterval) clearInterval(autoInterval);
                return;
              }
              const rect = el.getBoundingClientRect();
              const randomX =
                rect.left + rect.width * (0.25 + Math.random() * 0.5);
              const randomY =
                rect.top + rect.height * (0.3 + Math.random() * 0.4);
              spawnImage(randomX, randomY, true);
            }, 2400);
          }
        } else {
          if (autoInterval) clearInterval(autoInterval);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (autoInterval) clearInterval(autoInterval);
    };
  }, [spawnImage]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeTouchStart = (e: TouchEvent) => {
      hasInteractedRef.current = true;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnImage(touch.clientX, touch.clientY, true);
      }
    };

    const handleNativeTouchMove = (e: TouchEvent) => {
      hasInteractedRef.current = true;
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnImage(touch.clientX, touch.clientY, false);
      }
    };

    const handleNativeTouchEnd = () => {
      lastPosRef.current = null;
    };

    el.addEventListener("touchstart", handleNativeTouchStart, {
      passive: true,
    });
    el.addEventListener("touchmove", handleNativeTouchMove, { passive: true });
    el.addEventListener("touchend", handleNativeTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleNativeTouchEnd, {
      passive: true,
    });

    return () => {
      el.removeEventListener("touchstart", handleNativeTouchStart);
      el.removeEventListener("touchmove", handleNativeTouchMove);
      el.removeEventListener("touchend", handleNativeTouchEnd);
      el.removeEventListener("touchcancel", handleNativeTouchEnd);
    };
  }, [spawnImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    hasInteractedRef.current = true;
    spawnImage(e.clientX, e.clientY, false);
  };

  const handleMouseLeave = () => {
    lastPosRef.current = null;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    hasInteractedRef.current = true;
    spawnImage(e.clientX, e.clientY, true);
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="styles"
      className="cursor-buffer"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ touchAction: "pan-y" }}
    >
      {/* Hidden warm-up preloading layer */}
      <div
        className="cursor-buffer__preload"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: -50,
        }}
        aria-hidden="true"
      >
        {images.map((url) => (
          <img key={url} src={url} alt="" loading="eager" decoding="async" />
        ))}
      </div>

      {/* Floating Trail Images Layer */}
      <div
        className="cursor-buffer__trail-layer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {trail.map((item) => (
          <div
            key={item.id}
            className="cursor-buffer__trail-item animate-trail-pop"
            style={
              {
                position: "absolute",
                left: `${item.x}px`,
                top: `${item.y}px`,
                zIndex: item.zIndex,
                pointerEvents: "none",
                "--rot": `${item.rotation}deg`,
                "--target-scale": `${item.scale}`,
              } as React.CSSProperties
            }
          >
            <div className="cursor-buffer__card">
              <img
                src={item.image}
                alt="Kitchen design preview"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Centered Content Layer */}
      <div className="cursor-buffer__stage">
        <div className="cursor-buffer__content">
          <span className="cursor-buffer__hint">Move your cursor</span>
          <h2 className="cursor-buffer__title">
            Which Kitchen Style Are You
            <br />
            In The Mood For?
          </h2>
          <div className="cursor-buffer__buttons">
            <a
              href="#work"
              className="cursor-buffer__btn cursor-buffer__btn--primary"
              onClick={(e) => scrollTo(e, "#work")}
            >
              Kitchen Designs
            </a>
            <a
              href="#process"
              className="cursor-buffer__btn cursor-buffer__btn--secondary"
              onClick={(e) => scrollTo(e, "#process")}
            >
              Our Process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
