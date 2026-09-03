"use client";

import React, { useEffect, useRef, useState } from "react";

interface LoaderProps {
  progress: number;
  isReady: boolean;
}

export default function Loader({ progress, isReady }: LoaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [statusText, setStatusText] = useState("Preparing the room… 0%");
  const [isGone, setIsGone] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const targetProgressRef = useRef(0);
  const isReadyRef = useRef(false);
  const isGoneRef = useRef(false);

  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

  useEffect(() => {
    let currentDisplay = 0;

    // Safety fallback: if anything stalls or takes long, ensure progress reaches 100% within 3s
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const target = Math.max(
        targetProgressRef.current,
        Math.min(100, (elapsed / 2500) * 100)
      );

      if (currentDisplay < target) {
        const diff = target - currentDisplay;
        const step = Math.max(0.35, diff * 0.08);
        currentDisplay = Math.min(100, currentDisplay + step);
        setDisplayProgress(currentDisplay);

        const pct = Math.round(currentDisplay);
        let msg = "Preparing the room";
        if (pct >= 90) msg = pct >= 100 ? "Ready" : "Finishing details";
        else if (pct >= 60) msg = "Fitting stone & brass";
        else if (pct >= 30) msg = "Crafting hardwood cabinetry";
        setStatusText(`${msg}… ${pct}%`);
      }

      if (
        currentDisplay >= 99.5 &&
        (isReadyRef.current || elapsed > 3000) &&
        !isGoneRef.current
      ) {
        isGoneRef.current = true;
        clearInterval(interval);
        setDisplayProgress(100);
        setStatusText("Ready… 100%");

        setTimeout(() => {
          setIsGone(true);
          setTimeout(() => {
            setIsUnmounted(true);
          }, 850);
        }, 350);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (isUnmounted) return null;

  return (
    <div id="loader" className={isGone ? "gone" : ""}>
      <div className="load-mark">
        Native Coast
        <small>KITCHEN APPLIANCES • EST • 1983</small>
      </div>
      <div className="load-bar">
        <i id="loadFill" style={{ width: `${displayProgress}%` }} />
      </div>
      <div className="load-status" id="loadStatus">
        {statusText}
      </div>
    </div>
  );
}
