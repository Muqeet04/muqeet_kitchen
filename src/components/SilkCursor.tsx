"use client";

import React, { useEffect, useRef } from "react";

class WaveOscillator {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  currentValue: number;

  constructor(options: {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
  } = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.0015;
    this.amplitude = options.amplitude || 85;
    this.currentValue = 0;
  }

  update(): number {
    this.phase += this.frequency;
    this.currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.currentValue;
  }
}

class PhysicsNode {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

interface SilkConfig {
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

class SilkTrail {
  config: SilkConfig;
  mousePos: { x: number; y: number };
  spring: number;
  friction: number;
  nodes: PhysicsNode[];

  constructor(
    options: { spring: number },
    config: SilkConfig,
    mousePos: { x: number; y: number }
  ) {
    this.config = config;
    this.mousePos = mousePos;
    this.spring = options.spring + (0.1 * Math.random() - 0.02);
    this.friction = this.config.friction + (0.01 * Math.random() - 0.002);
    this.nodes = [];

    for (let i = 0; i < this.config.size; i++) {
      const node = new PhysicsNode();
      node.x = this.mousePos.x;
      node.y = this.mousePos.y;
      this.nodes.push(node);
    }
  }

  update() {
    let springFactor = this.spring;
    const leadNode = this.nodes[0];

    leadNode.vx += (this.mousePos.x - leadNode.x) * springFactor;
    leadNode.vy += (this.mousePos.y - leadNode.y) * springFactor;

    for (let i = 0, len = this.nodes.length; i < len; i++) {
      const node = this.nodes[i];
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * springFactor;
        node.vy += (prevNode.y - node.y) * springFactor;
        node.vx += prevNode.vx * this.config.dampening;
        node.vy += prevNode.vy * this.config.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      springFactor *= this.config.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.nodes.length < 2) return;

    let currX = this.nodes[0].x;
    let currY = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(currX, currY);

    let i = 1;
    const end = this.nodes.length - 2;
    for (; i < end; i++) {
      const nodeA = this.nodes[i];
      const nodeB = this.nodes[i + 1];
      currX = 0.5 * (nodeA.x + nodeB.x);
      currY = 0.5 * (nodeA.y + nodeB.y);
      ctx.quadraticCurveTo(nodeA.x, nodeA.y, currX, currY);
    }

    const nodeLastA = this.nodes[i];
    const nodeLastB = this.nodes[i + 1];
    ctx.quadraticCurveTo(nodeLastA.x, nodeLastA.y, nodeLastB.x, nodeLastB.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export default function SilkCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mousePos = {
      x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
      y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    };

    const config: SilkConfig = {
      friction: 0.5,
      trails: 10,
      size: 10,
      dampening: 0.1,
      tension: 0.98,
    };

    const strokeHue = "hsla(34.2, 42%, 58%, 0.28)";
    const accentStrokeHue = "hsla(20, 68%, 65%, 0.38)";
    let currentStroke = strokeHue;

    const oscillator = new WaveOscillator({
      phase: 2 * Math.random() * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const trails: SilkTrail[] = [];
    for (let i = 0; i < config.trails; i++) {
      trails.push(
        new SilkTrail(
          { spring: 0.4 + (i / config.trails) * 0.025 },
          config,
          mousePos
        )
      );
    }

    const handleResize = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      const target = e.target as HTMLElement | null;
      const card = target?.closest(
        ".glass, .about-media, .stat-card, .step, .copy-card"
      ) as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length === 1) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, .cta, .lnk, .nav-cta, .hgallery-card, .stat-card, [role="button"]'
        )
      ) {
        currentStroke = accentStrokeHue;
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'a, button, .cta, .lnk, .nav-cta, .hgallery-card, .stat-card, [role="button"]'
        )
      ) {
        currentStroke = strokeHue;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    let running = true;
    let rafId: number | null = null;

    const render = () => {
      if (!running || !ctx || !canvas) return;

      oscillator.update();

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = currentStroke;
      ctx.lineWidth = 1;

      for (let i = 0; i < config.trails; i++) {
        const trail = trails[i];
        if (trail) {
          trail.update();
          trail.draw(ctx);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    const onFocus = () => {
      if (!running) {
        running = true;
        render();
      }
    };

    const onBlur = () => {
      running = false;
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="belgrade-cursor-canvas"
      className="belgrade-cursor-canvas"
      aria-hidden="true"
    />
  );
}
