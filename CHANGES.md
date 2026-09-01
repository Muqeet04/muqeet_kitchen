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

## Revision 8 — Reviews Unified Multi-Tone Gradient System
**Files modified:** `style.css`, `script.js`
**Description:** Harmonized the background of the reviews section with the overall website palette (`--shore`, `--shore-2`, warm brass, terracotta, and rich roasted auburn) while providing 5 distinct multi-tone gradients that give each review its own unique atmosphere without disrupting the site's cohesive luxury aesthetic.

**Gradients implemented:**
1. **Review 1 (Surrey Estate):** `radial-gradient(circle at 70% 30%, rgba(176, 67, 36, 0.24) 0%, transparent 60%), linear-gradient(150deg, #1A0A0E 0%, #290F15 45%, #18080C 100%)` (Heritage Licorice & Terracotta)
2. **Review 2 (Chelsea Residence):** `radial-gradient(circle at 30% 65%, rgba(190, 80, 45, 0.26) 0%, transparent 65%), linear-gradient(150deg, #1C0B10 0%, #341219 50%, #1A0A0E 100%)` (Roasted Auburn & Oak Wine)
3. **Review 3 (Full Renovation):** `radial-gradient(circle at 75% 70%, rgba(150, 50, 65, 0.24) 0%, transparent 60%), linear-gradient(150deg, #16080D 0%, #280E18 50%, #13060A 100%)` (Smoked Mulberry & Charcoal)
4. **Review 4 (Wimbledon):** `radial-gradient(circle at 25% 30%, rgba(234, 155, 118, 0.25) 0%, transparent 65%), linear-gradient(150deg, #1E0C10 0%, #361516 48%, #19090D 100%)` (Glowing Amber Brass & Mahogany)
5. **Review 5 (Kensington):** `radial-gradient(circle at 60% 40%, rgba(160, 55, 40, 0.22) 0%, transparent 65%), linear-gradient(150deg, #140508 0%, #260D12 50%, #120406 100%)` (Midnight Espresso & Burnished Copper)

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
| 8 | Reviews cohesive multi-tone gradients | ✅ Done |
