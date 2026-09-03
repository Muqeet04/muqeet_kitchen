"use client";

import React, { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import AboutSection from "@/components/AboutSection";
import StyleSelector from "@/components/StyleSelector";
import ProcessSection from "@/components/ProcessSection";
import WorkGallery from "@/components/WorkGallery";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import SilkCursor from "@/components/SilkCursor";

export default function HomePage() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  const handleLoadProgress = useCallback((pct: number) => {
    setLoadProgress(pct);
  }, []);

  const handleAllLoaded = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleHeaderSolidChange = useCallback((solid: boolean) => {
    setIsHeaderSolid(solid);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <Loader progress={loadProgress} isReady={isReady} />

      {/* Navigation Header */}
      <Header isSolid={isHeaderSolid} />

      {/* Page Anchor */}
      <a id="top" />

      {/* Main Sections */}
      <main>
        {/* Section 1: Hero Scroll Scrub */}
        <HeroCanvas
          onLoadProgress={handleLoadProgress}
          onAllLoaded={handleAllLoaded}
          onHeaderSolidChange={handleHeaderSolidChange}
        />

        {/* Section 2: The Native Coast Way (About / Stats / Video) */}
        <AboutSection />

        {/* Section 3: Style Selector / Picture Buffer */}
        <StyleSelector />

        {/* Section 4: What We Do / Our Process */}
        <ProcessSection />

        {/* Section 5: Our Craft / Recent Kitchens */}
        <WorkGallery />

        {/* Section 6: Client Reviews */}
        <ReviewsSection />

        {/* Section 7: Get In Touch & Footer */}
        <ContactSection />
      </main>

      {/* Silk Ribbon Canvas Cursor */}
      <SilkCursor />
    </>
  );
}
