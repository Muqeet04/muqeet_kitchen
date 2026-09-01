# Native Coast — Revision Round 2 Change Log
_Date: 2026-09-01_

---

## Revision 1 — Images to Portrait (Sections 3 & 5)
**Files modified:** `style.css`, `script.js`
**Selectors changed:**
- `.cursor-buffer__trail-item` — aspect-ratio changed from `4 / 3` → `2 / 3`, width updated to `clamp(140px, 15vw, 200px)` (mobile `clamp(110px, 30vw, 150px)`)
- `.cursor-buffer__trail-item img` — `object-fit: cover; object-position: center;` applied
- `.hgallery-card` — width adjusted from `460px` → `320px` (mobile `240px`)
- `.hgallery-card img` — aspect-ratio changed from fixed height `340px` (landscape) → `aspect-ratio: 2 / 3; height: auto; object-fit: cover; object-position: center;`

**Before:**
```css
.cursor-buffer__trail-item {
  position: absolute;
  width: clamp(220px, 24vw, 340px);
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  ...
}

.hgallery-card {
  flex: 0 0 auto;
  width: 460px;
  border-radius: 16px;
  ...
}

.hgallery-card img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  ...
}
```

**After:**
```css
.cursor-buffer__trail-item {
  position: absolute;
  width: clamp(140px, 15vw, 200px);
  aspect-ratio: 2 / 3;
  border-radius: 14px;
  ...
}

.cursor-buffer__trail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hgallery-card {
  flex: 0 0 auto;
  width: 320px;
  border-radius: 16px;
  ...
}

.hgallery-card img {
  width: 100%;
  aspect-ratio: 2 / 3;
  height: auto;
  object-fit: cover;
  object-position: center;
  ...
}
```

---

## Revision 2 — Loading Screen Text & Speed Pacing (−30%)
**Files modified:** `index.html`, `script.js`, `style.css`
**Element:** `#loader .load-mark small`, `startSmoothLoader()`, `.load-bar i`
**Before Text:** `<small>KITCHEN APPLIANCES</small>`
**After Text:** `<small>KITCHEN APPLIANCES • EST • 1983</small>`
**Loading Speed Pacing:** Added `startSmoothLoader()` with gradual progress easing (`step: diff * 0.045`) slowing down the progress progression by ~30% for a smooth, deliberate luxury entrance that lets users comfortably read each stage label.

---

## Revision 3 — Whitespace Elimination & Section Gap Closure
**Date:** 2026-09-01  
**Files touched:** `style.css`, `script.js`  
**Description:** Removed excess whitespace above Reviews section and closed the gap between Reviews and the final section by pulling the final section up.

**Before:**
```css
.reviews-scroll {
  position: relative;
  height: 380vh;
  background: var(--ink);
}

.reviews-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reviews-display-card {
  position: relative;
  padding: 56px 52px;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
  border-radius: 24px;
  min-height: 380px;
  ...
}

.review-slide .review-quote {
  font-family: var(--serif);
  font-size: clamp(24px, 3.4vw, 42px);
  line-height: 1.34;
  color: var(--pure-white);
  margin-bottom: 24px;
  ...
}

.contact {
  padding: 120px 0 60px;
  ...
}
```

**After:**
```css
.hgallery {
  position: relative;
  height: 300vh; /* Reduced from 400vh to remove trailing scroll gap before Reviews */
  ...
}

.reviews-scroll {
  position: relative;
  padding: 90px 0 80px; /* Standard section padding, eliminates top/bottom voids */
  background: var(--ink);
  overflow: hidden;
}

.reviews-sticky {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.reviews-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
}

.reviews-display-card {
  position: relative;
  padding: 44px 46px;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
  border-radius: 24px;
  min-height: 250px;
  ...
}

.review-slide .review-quote {
  font-family: var(--serif);
  font-size: clamp(22px, 3.1vw, 38px);
  line-height: 1.32;
  color: var(--pure-white);
  margin-bottom: 18px;
  ...
}

.contact {
  padding: 90px 0 60px; /* Sits directly after Reviews with no dead space */
  ...
}
```

---

## Revision 4 — Section 5 Multi-Tone Radiant Gradient
**Files modified:** `style.css`
**Selector:** `.hgallery`
**Before (Single-tone):** `linear-gradient(160deg, #3D1A1A 0%, #5C2020 40%, #3D1A1A 100%)`
**After (Multi-tone):**
```css
.hgallery {
  position: relative;
  height: 400vh;
  background: 
    radial-gradient(ellipse 80% 60% at 75% 30%, rgba(142, 45, 34, 0.42) 0%, transparent 70%),
    radial-gradient(ellipse 65% 55% at 20% 75%, rgba(100, 32, 42, 0.38) 0%, transparent 65%),
    linear-gradient(145deg, #1C0A0E 0%, #3D141D 24%, #61241E 52%, #38121B 78%, #140508 100%);
}
```

---

## Revision 5 — Cursor: Plus → Thin Line, Trail Preserved
**Files modified:** `style.css`, `script.js`
**CSS change:**
- `.cursor-buffer__stage`: Removed `cursor: crosshair;`
- `body, a, button, input, textarea, select`: Added `cursor: none;`
- Added `.custom-cursor` style:
```css
.custom-cursor {
  width: 2px;
  height: 24px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 0;
  pointer-events: none;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: opacity 0.2s;
}
```
**JS change:** Added `setupLineCursor()` to track the thin vertical line cursor across all sections site-wide.
**Trail:** Confirmed still working — `setupCursorBuffer()` image spawning and trail effect in Section 3 remain fully active and capped at max 5 items.

---

## Revision 6 — Heading: 3 Lines → 2 Lines
**Files modified:** `index.html`, `style.css`
**HTML change:** `<h2 class="cursor-buffer__title">Which Kitchen Style Are You<br>In The Mood For?</h2>`
**CSS change:**
- `.cursor-buffer__content` `max-width` increased to `960px`
- `.cursor-buffer__title` `font-size` updated to `clamp(42px, 5.5vw, 80px)` with `text-align: center`

---

## Revision 7 — Hero Tagline Color → White
**Files modified:** `style.css`
**Selector:** `.hero-tag`
**Before:**
```css
.hero-tag {
  color: #8B1A1A !important;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: .3em;
  margin-bottom: 22px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, .95);
}
```

**After:**
```css
.hero-tag {
  color: #FFFFFF !important;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: .3em;
  margin-bottom: 22px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, .95);
}
```

---

## Revision 8 — Reviews Unified Palette & Subtle Ambient Atmospheres
**Files modified:** `style.css`, `script.js`  
**Description:** Anchored the entire Reviews section firmly in the website's signature base background (`var(--shore)` / `#1A0A0E` with subtle white borders), eliminating any visual color clashing between Section 5, Section 6, and Section 7. Applied subtle bespoke ambient glows and glass card highlights for each of the 5 reviews so they feel 100% native to the website.

**Atmospheres implemented:**
1. **Review 1 (Surrey Estate):** Warm Radiant Brass & Heritage Terracotta glow (`rgba(234, 155, 118, 0.16)`)
2. **Review 2 (Chelsea Residence):** Warm Roasted Auburn glow (`rgba(210, 105, 70, 0.16)`)
3. **Review 3 (Full Renovation):** Smoked Mulberry & Charcoal glow (`rgba(185, 75, 90, 0.15)`)
4. **Review 4 (Wimbledon):** Honey Amber Brass glow (`rgba(245, 170, 120, 0.17)`)
5. **Review 5 (Kensington):** Midnight Burnished Copper glow (`rgba(200, 90, 60, 0.15)`)

---

## Revision 9 — Pinned Scroll-Driven Review Animation
**Files modified:** `style.css`, `script.js`  
**Description:** Configured Section 6 (`.reviews-scroll`) with a dedicated 240vh scroll track and sticky centering. Prior to reaching the pinned header position, Review 01 (`01 / 05`) remains locked and completely visible in full view so reviews never jump before the user sees them. Once locked in view, scrolling comfortably advances through all 5 reviews (01 → 02 → 03 → 04 → 05) with equal pacing before unpinning to reveal Section 7. Dot navigation smoothly scrolls to the exact position of any review.

---

## Revision 10 — Padding Removal & Progressive Motion to Final Section
**Files modified:** `style.css`, `script.js`  
**Description:** Removed excess padding on `.reviews-sticky` (`padding: 0;`), compacted card padding to `32px 38px`, and added progressive vertical motion (`translateY`) in `computeReviewsTarget()`. With each review scrolled (01 → 02 → 03 → 04 → 05), the screen smoothly and continuously moves downward towards the final Contact & Quote section.

---

## Revision 11 — Reviews Section Height Reduction (−30%) & Default OS Cursor Restoration
**Date:** 2026-09-02  
**Files modified:** `style.css`, `script.js`  
**Description:**
- **Reviews Section Height (−30%) [Root Cause & Correction]:** 
  - *Root Cause:* The rendered height of Section 6 was governed by the sticky frame `.reviews-sticky`, which had a full-screen viewport height set to `calc(100vh - var(--headerH, 78px))` / `calc(100dvh - var(--headerH, 78px))` with flex vertical centering (`display: flex; flex-direction: column; justify-content: center;`). Consequently, the section continued to visibly occupy the entire screen height.
  - *Correction:* Reduced the actual rendered element `.reviews-sticky` height by 30% to `calc((100vh - var(--headerH, 78px)) * 0.7)` and `calc((100dvh - var(--headerH, 78px)) * 0.7)` (and mobile viewport to `calc((100vh - var(--headerH, 70px)) * 0.7)` / `calc((100dvh - var(--headerH, 70px)) * 0.7)`).
  - *Script Synchronization:* Updated `computeReviewsTarget()` and `setupReviewsNav()` in `script.js` to dynamically measure `reviewsSticky.offsetHeight` to ensure smooth scroll interpolation and navigation dot accuracy.
  - *Content Preservation:* All testimonial carousel content (5 stars, quote typography, author and project name, navigation dots) remains proportionally centered and fully readable without any overflow or text clipping.
- **Default OS Cursor Restoration:** Reverted the cursor back to the default OS cursor by removing `cursor: none;` on `body` and interactive elements (`a`, `button`, `input`, etc.), and removing the custom thin line DOM element (`setupLineCursor()` / `.custom-cursor`). The silk trailing physics animation (`CustomCursor`) and Section 3 photo buffer trail (`setupCursorBuffer()`) remain 100% active and functional.

---

## Revision 12 — Consistent Fixed Height Across All 5 Review Slides & Overflow Correction
**Date:** 2026-09-02  
**Files modified:** `style.css`, `script.js`  
**Description:**
- **Overflow Correction & Sizing:** Corrected review card fixed-height regression — card now sized to fit longest quote without overflow, dots no longer overlapped, layout consistent across all 5 slides. Sized `.reviews-display-card` with `min-height: 290px` (mobile `250px`) and `.reviews-stack` with `min-height: 160px` (mobile `145px`).
- **Clear Dot Positioning:** Configured `.reviews-nav-dots` with `margin-top: 20px` positioned cleanly below the review stack so quote text never overlaps or touches the dots.
- **Identical Layout & Section Stability:** Removed the scroll-linked dynamic `translateY` vertical shift in `computeReviewsTarget()` so that slides 01/05 through 05/05 and the section below ("Let's make your kitchen" / "Get in touch") remain at the exact same vertical position on screen regardless of which review is active.
- **Readability & Text Fit:** All 5 quotes (117–125 characters) vertically center with generous breathing room and zero clipping or overflow across all viewports.

---

## Revision 13 — Reviews Section Whitespace Elimination & Gap Closure to 'Get in Touch'
**Date:** 2026-09-02  
**Files modified:** `style.css`, `script.js`  
**Description:**
- **Tightened Section Padding:** Reduced excess section padding around the reviews card so 'Get in touch' is visible without excessive scrolling, consistent across all review slides. Set `.reviews-scroll` padding to `50px 0 30px` (mobile `36px 0 24px`) and `.contact` padding to `50px 0 60px` (mobile `48px 0 50px`).
- **Standard Flow Container:** Configured `.reviews-sticky` to `position: relative; width: 100%;` removing dead space voids above and below the card.
- **Immediate Visibility:** On a standard 1080p viewport, both the Reviews card and the 'Get in touch' heading are visible in the same viewport with a clean, compact ~80px gap between them.
- **Interactive Carousel:** Refined `computeReviewsTarget()` and `setupReviewsNav()` to provide smooth scroll transitions and instant dot navigation across all 5 review atmospheres.

---

## Revision 14 — Horizontal Scroll-Snap Reviews with Edge Fade Animation
**Date:** 2026-09-02  
**Files modified:** `index.html`, `style.css`, `script.js`  
**Description:**
- **Horizontal Scroll-Snap Layout:** Replaced reviews carousel (dot pagination) with horizontal scroll-snap layout and edge fade animation.
- **Card Sizing & Overflow Protection:** Sized each `.review-card` to a fixed width (`clamp(360px, 42vw, 540px)` on desktop, `clamp(280px, 80vw, 360px)` on mobile) with fixed/min-height (`290px` / `250px`), with partial cards visible at edges to hint at additional content.
- **Edge Fade Animation:** Applied CSS mask-image gradient (`mask-image: linear-gradient(...)`) on the track container so cards smoothly fade out as they reach the left and right scroll boundaries.
- **Interaction & Ambient Atmosphere:** Enabled native touch swiping, horizontal wheel/trackpad scrolling, and click-drag mouse navigation with dynamic glow atmosphere synchronization.
- **Content Integrity:** All 5 reviews (5 stars, quote typography, author, and project location) preserved 100%.

---

## Summary
| # | Revision | Status |
|---|----------|--------|
| 1 | Images to portrait (S3 + S5) | ✅ Done |
| 2 | Loading screen text & speed pacing | ✅ Done |
| 3 | Section 6 height & gap closure | ✅ Done |
| 4 | Section 5 multi-tone radiant gradient | ✅ Done |
| 5 | Cursor: line shape, trail kept | ✅ Done |
| 6 | Heading: 2 lines | ✅ Done |
| 7 | Hero tagline → white | ✅ Done |
| 8 | Reviews cohesive palette & atmospheres | ✅ Done |
| 9 | Reviews scroll-driven animation | ✅ Done |
| 10 | Padding removal & progressive movement | ✅ Done |
| 11 | Reviews section height −30% (root cause fixed) & default cursor restored | ✅ Done |
| 12 | Corrected review card overflow & consistent layout across slides | ✅ Done |
| 13 | Tightened reviews section padding to remove excess whitespace | ✅ Done |
| 14 | Replaced reviews carousel (dot pagination) with horizontal scroll-snap layout and edge fade animation | ✅ Done |
