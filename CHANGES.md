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

## Revision 3 — Section 6 Height Reduction & Space Elimination
**Files modified:** `style.css`
**Selector:** `.reviews-scroll`, `.reviews-sticky`, `.reviews-display-card`, `.review-slide .review-quote`, `.contact`
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
.reviews-scroll {
  position: relative;
  height: 180vh; /* Reduced scroll track to eliminate empty bottom void */
  background: var(--ink);
}

.reviews-sticky {
  position: sticky;
  top: var(--headerH, 78px); /* Sits snugly below header, eliminating top empty space */
  height: calc(100vh - var(--headerH, 78px));
  height: calc(100dvh - var(--headerH, 78px));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
}

.reviews-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.reviews-display-card {
  position: relative;
  padding: 38px 42px; /* Balanced padding */
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
  border-radius: 24px;
  min-height: 250px; /* Compact height */
  ...
}

.review-slide .review-quote {
  font-family: var(--serif);
  font-size: clamp(22px, 3.1vw, 38px); /* Sized to prevent text clipping */
  line-height: 1.32;
  color: var(--pure-white);
  margin-bottom: 18px;
  ...
}

.contact {
  padding: 80px 0 60px; /* Connects smoothly to fill bottom space */
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

## Summary
| # | Revision | Status |
|---|----------|--------|
| 1 | Images to portrait (S3 + S5) | ✅ Done |
| 2 | Loading screen text | ✅ Done |
| 3 | Section 6 height −30% | ✅ Done |
| 4 | Section 5 lighter gradient | ✅ Done |
| 5 | Cursor: line shape, trail kept | ✅ Done |
| 6 | Heading: 2 lines | ✅ Done |
| 7 | Hero tagline → white | ✅ Done |
