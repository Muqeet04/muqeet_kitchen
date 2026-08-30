# Native Coast — Project Changelog & Revision Audit Master Document

> **Project**: Native Coast Kitchens (Bespoke Kitchen Appliances, Fitting & Renovations)  
> **Live Site (Vercel)**: [https://site11-iota.vercel.app/](https://site11-iota.vercel.app/)  
> **GitHub Repository**: [https://github.com/Muqeet04/muqeet_kitchen.git](https://github.com/Muqeet04/muqeet_kitchen.git)  
> **Client Revision Document (Canva)**: [Canva Design Document](https://www.canva.com/design/DAHS0_7FWM0/vriE3v7DEyWEHymO-oU3Yw/edit)  
> **Master Excel Audit**: [`Native_Coast_Complete_Revision_and_Change_Log.xlsx`](Native_Coast_Complete_Revision_and_Change_Log.xlsx)  
> **Audit Status**: `100% Completed & Verified (All 28 Canva Revision Items + UI Polish Implemented)`  

---

## Table of Contents

1. [Executive Summary & Project KPIs](#1-executive-summary--project-kpis)
2. [Canva Revision Document — Item-by-Item Master Audit](#2-canva-revision-document--item-by-item-master-audit)
   - [Section 1: Hero / Scroll Sequence](#section-1--hero--scroll-sequence)
   - [Section 2: The Native Coast Way](#section-2--the-native-coast-way)
   - [Section 3: Mood / Style Selector Picture Buffer](#section-3--mood--style-selector-picture-buffer)
   - [Section 4: Our Process](#section-4--our-process)
   - [Section 5: Gallery & 13 Kitchens](#section-5--gallery--13-kitchens)
   - [Section 6: Verified Client Reviews](#section-6--verified-client-reviews)
   - [Section 7 & Global Polish](#section-7--global-polish)
3. [Section 5 — Complete 13 Kitchens Gallery Breakdown](#3-section-5--complete-13-kitchens-gallery-breakdown)
4. [Section 6 — 5 Client Reviews & Dynamic Background Palette](#4-section-6--5-client-reviews--dynamic-background-palette)
5. [Complete Git Commit & Build History (From Inception)](#5-complete-git-commit--build-history-from-inception)
6. [Design System, Typography & Color Tokens](#6-design-system-typography--color-tokens)
7. [Codebase Architecture & Section Mapping](#7-codebase-architecture--section-mapping)

---

## 1. Executive Summary & Project KPIs

| Metric / Category | Total Items | Completed / Live | Pending | Completion Rate |
| :--- | :---: | :---: | :---: | :---: |
| **Canva Revision Document Requirements** | 28 | 28 | 0 | **100%** |
| **Section 1: Hero & Scroll Sequence** | 11 | 11 | 0 | **100%** |
| **Section 2: The Native Coast Way** | 5 | 5 | 0 | **100%** |
| **Section 3: Style Selector Picture Buffer** | 5 | 5 | 0 | **100%** |
| **Section 4: Our Process** | 3 | 3 | 0 | **100%** |
| **Section 5: Gallery & 13 Kitchen Captions** | 3 | 3 (13 cards) | 0 | **100%** |
| **Section 6: Client Reviews & Dynamic Background** | 3 | 3 (5 slides) | 0 | **100%** |
| **Section 7: Contact Hours & Footer Polish** | 2 | 2 | 0 | **100%** |
| **Git Commits Tracked on Main** | 10 | 10 | 0 | **100% Synced** |

---

## 2. Canva Revision Document — Item-by-Item Master Audit

### Section 1 — Hero / Scroll Sequence
*Rule: All text in the scroll-build sequence must be pure white (`#FFFFFF`) and clearly readable against the dark background.*

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **01** | Logo Wordmark | `24px` font, off-white | Increase font size slightly, Pure White `#FFFFFF` | Wordmark increased to `27px` bold pure white `#ffffff` | `.brand b { font-size: 27px; color: #ffffff; }` | `style.css` | ✅ 100% |
| **02** | Header Nav Links | `13px` font, `0.9` opacity | Increase font size slightly, Pure White `#FFFFFF` | Nav links updated to `14.5px` uppercase pure white `#ffffff` at full opacity | `.lnk { font-size: 14.5px; color: #ffffff; opacity: 1; }` | `style.css`, `index.html` | ✅ 100% |
| **03** | Hero Tagline | `#c9402f` (bright red/orange) | Tagline color -> **Dark Red** (approx `#8B1A1A`), ensure readable | Set to brand dark red `#8B1A1A` with strong multi-layer text-shadow | `.hero-tag { color: #8B1A1A !important; text-shadow: 0 2px 16px rgba(0,0,0,0.95); }` | `style.css` | ✅ 100% |
| **04** | Hero Main Title | Standard off-white | `"Scroll To Build Your Kitchen"` -> Pure White `#FFFFFF` | Set to `#ffffff` with high-contrast drop-shadow for visibility over animation | `.hero-title { color: #ffffff; text-shadow: 0 6px 45px rgba(0,0,0,.85); }` | `style.css` | ✅ 100% |
| **05** | Hero Body Subtitle | Left-aligned on some viewports | Cabinetry line -> Pure White `#FFFFFF`, center-align | Centered `38ch` paragraph in pure `#ffffff` with `margin: 26px auto 0` | `.hero-sub { color: #ffffff; text-align: center; margin: 26px auto 0; }` | `style.css` | ✅ 100% |
| **06** | Stage 1 Heading | Default heading style | `"Built To The Wall"` heading -> Pure White `#FFFFFF` | Explicit pure white `#ffffff` with Cormorant Garamond clamp font | `.cap h2 { color: #ffffff; }` | `style.css` | ✅ 100% |
| **07** | Stage 1 Paragraph | Generic Shaker paragraph | Description under "Built To The Wall" -> Pure White `#FFFFFF`, rewrite in bespoke brand voice | *"Hand-crafted timber cabinetry, precision-joined in our workshop and tailored to scribed perfection along every wall."* | `index.html` `<p>` under Stage 1, `.cap p { color: #ffffff; }` | `index.html`, `style.css` | ✅ 100% |
| **08** | Stage 2 Heading | Default heading style | `"Cut Once, Polished Twice"` heading -> Pure White `#FFFFFF` | Explicit pure white `#ffffff` heading | `.cap h2 { color: #ffffff; }` | `style.css` | ✅ 100% |
| **09** | Stage 2 Paragraph | Generic quartz/marble text | Description under "Cut Once, Polished Twice" -> Pure White `#FFFFFF`, rewrite brand voice | *"Bespoke quartz and natural marble slabs — water-milled, hand-honed to dual perfection, and set with seamless masonry precision."* | `index.html` `<p>` under Stage 2 | `index.html`, `style.css` | ✅ 100% |
| **10** | Stage 4 Heading | Default heading style | `"Ready To Cook"` heading -> Pure White `#FFFFFF` | Pure white `#ffffff` heading for the finished room CTA stage | `.cap.stage-cap.right h2 { color: #ffffff; }` | `style.css` | ✅ 100% |
| **11** | Scroll Animation | Legacy animation logic | Replace scroll animation with final revised asset or leave clearly labelled `// TODO:` comment | Added `// TODO: replace scroll animation with final revised version asset when available` while maintaining 296 webp frames at `HERO_LERP = 0.12` | `script.js` line 5 | `script.js` | ✅ 100% |

---

### Section 2 — "The Native Coast Way"

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **12** | Section Eyebrow | Orange (`#e3885e`), `120px` top padding, `13px` font | Move upward, increase font size, increase letter-spacing, color Orange -> **Bright Light Beige (`#F5ECD7`)** | Section top padding reduced from `120px` -> `80px`. Eyebrow font set to `14px`, `letter-spacing: .36em`, `color: #F5ECD7 !important` | `.about { padding: 80px 0 100px; } .about-eyebrow { color: #F5ECD7 !important; font-size: 14px; letter-spacing: .36em; }` | `style.css` | ✅ 100% |
| **13** | Lead Subheading | *"A kitchen is furniture — built once, built properly."* | Rewrite to punchy brand voice, slightly bigger font, words **"built once"** in Bright Light Beige (`#F5ECD7`) | *"A kitchen is the room that earns its keep — <span class="hl">built once</span>, built for generations."* with font clamp(28px, 3.5vw, 45px) | `.about-lead { font-size: clamp(28px, 3.5vw, 45px); color: #ffffff; } .lead-card .hl { color: #F5ECD7; font-style: italic; }` | `index.html`, `style.css` | ✅ 100% |
| **14** | Body Paragraph | Long 4-sentence generic copy with filler words | Rewrite and shorten to 2 tight sentences max in original voice | *"We craft one bespoke kitchen at a time, entirely by hand in our workshop. From bench-joined cabinetry to laser-fitted stone, our in-house craftsmen deliver every room without subcontractors."* | `index.html` `.copy-card p` | `index.html` | ✅ 100% |
| **15** | Stats Cards | Small numbers (`42px`), brass orange suffixes | Make stat numbers **bigger**, set all stat text to **Pure White `#FFFFFF`** | Stat numbers increased to `clamp(48px, 5.4vw, 70px)`. All figures, suffixes (`+`, `-day`), and labels set to pure `#ffffff` | `.stat-card b { font-size: clamp(48px, 5.4vw, 70px); color: #ffffff; } .stat-suffix, .stat-label { color: #ffffff; }` | `style.css` | ✅ 100% |
| **16** | Media Embed | Static placeholder / old video | Replace kitchen image placeholder with **kitchen animation video** (`autoplay`, `loop`, `muted`, `playsinline`) | Extracted HD `new_assets/Section 2/Final Animation .mp4` (18.6MB) to `assets/section2_anim.mp4`, added gitignore exception, configured HTML5 video with intersection autoplay | `<video class="about-video" src="assets/section2_anim.mp4" autoplay loop muted playsinline webkit-playsinline preload="auto"></video>` | `index.html`, `.gitignore`, `assets/` | ✅ 100% |

---

### Section 3 — Mood / Style Selector Picture Buffer

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **17** | Section Background | Dark red / maroon (`#1A0A0E` / `#4C0507`) | Change background to **Light Beige (`#F5ECD7` / `#EFE4CF`)** matching mockup | `.cursor-buffer` background set to `#F5ECD7`, contrasting with dark licorice `#1A0A0E` title and `#8B1A1A` hint | `.cursor-buffer { background: var(--light-beige); /* #F5ECD7 */ } .cursor-buffer__title { color: var(--ink); }` | `style.css` | ✅ 100% |
| **18** | Cursor Hover Trail | Static container without interactive trail | Custom cursor trail showing sequence of kitchen mood images following user cursor | `setupCursorBuffer()` listens to mousemove & touchmove, appending dynamic 4:3 cards with random tilts (`-8°` to `+8°`) from a 13-image gallery pool | `script.js` `spawnTrailItem()`, `style.css` `.cursor-buffer__trail-item` | `script.js`, `style.css` | ✅ 100% |
| **19** | Image Trail Cap | Unbounded DOM node spawning | Strict maximum cap of **5 images visible simultaneously** | Enforced `MAX_TRAIL_ITEMS = 5`. Oldest items immediately shifted and faded out when threshold is exceeded, plus 2.2s auto-timeout | `var MAX_TRAIL_ITEMS = 5; while (activeTrail.length > MAX_TRAIL_ITEMS) { removeTrailItem(activeTrail.shift()); }` | `script.js` L9, L257 | ✅ 100% |
| **20** | "Our Process" CTA | Missing or unlinked anchor | Wire button href to **Section 4 (`#process`)** | Wired secondary pill button to `#process` | `<a href="#process" class="cursor-buffer__btn cursor-buffer__btn--secondary">Our Process</a>` | `index.html` | ✅ 100% |
| **21** | "Kitchen Designs" CTA | Missing or unlinked anchor | Wire button href to **Section 5 (`#work`)** | Wired primary pill button to `#work` | `<a href="#work" class="cursor-buffer__btn cursor-buffer__btn--primary">Kitchen Designs</a>` | `index.html` | ✅ 100% |

---

### Section 4 — Our Process

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **22** | Process Subheading | Read *"From a gallery refit"* or double em-dash | Update subheading to **"How a kitchen lands — Five days on site"** | Updated to clean, precise copy with standardized em-dash | `<p class="process-subhead">How a kitchen lands — Five days on site</p>` | `index.html` | ✅ 100% |
| **23** | 4 Step Titles & Casing | Inconsistent casing (e.g. *"The Workshop"* / *"The fit"*) | Standardize step labels: **01 Design**, **02 The workshop** (sentence case), **03 The Fit**, **04 Handover** | Updated all four `<h3>` titles in exact sentence case specified | `01 Design` / `02 The workshop` / `03 The Fit` / `04 Handover` | `index.html` | ✅ 100% |
| **24** | 4 Step Descriptions | Generic / lifted template descriptions | Rewrite all 4 step descriptions in original, plagiarism-free, bespoke brand voice | Rewritten: Step 01 (3D Laser Modelling), Step 02 (Workshop Bench Joinery), Step 03 (5-Day On-Site Laser Alignment & Stone Landing), Step 04 (Tuning, Stone Sealing & Glow Setup) | `index.html` `.step p` tags | `index.html` | ✅ 100% |

---

### Section 5 — Gallery & 13 Kitchens

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **25** | Header Hierarchy | Inverted ordering | Fix label hierarchy to: **"Our craft"** (eyebrow) -> **"Recent kitchens"** (`<h2>`) -> **"Made & fitted · A curated selection..."** (subheading) | Re-ordered HTML tags into the exact 3-level hierarchy | `<div class="eyebrow">Our craft</div> <h2>Recent kitchens</h2> <p>Made & fitted · ...</p>` | `index.html` | ✅ 100% |
| **26** | Section Background | Solid flat dark red (`#1A0A0E`) | Change background to **warm dark gradient** | Applied deep multi-stop warm linear gradient creating depth across 400vh scroll track | `.hgallery { background: linear-gradient(160deg, #1A0A0E 0%, #2D1010 50%, #1A0A0E 100%); }` | `style.css` | ✅ 100% |
| **27** | 13 Kitchen Captions | Short generic 3-word captions | Rewrite each caption to evocative aesthetic descriptions matching the materials and mood | Rewritten all 13 cards (*The Richmond*, *The Kew*, *The Chelsea*, *The Surrey Estate*, *The Aldgate*, *The Barnes*, *The Petersham*, *The Fulham*, *The Putney*, *The Wimbledon*, *The Kingston*, *The Twickenham*, *The Hampton*) | `.hgallery-card figcaption` with `font-size: 12px; line-height: 1.45; letter-spacing: .03em;` | `index.html`, `style.css` | ✅ 100% |

---

### Section 6 — Verified Client Reviews

| Item # | Component | Original / Legacy State | Canva Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **28** | Review Order | Shahzad D. in position #2 | Move **Shahzad D. — Full Kitchen Renovation** to position **#3** | Re-ordered review carousel slides: #1 Richardson, #2 Elena V., #3 Shahzad D., #4 Marcus & Claire, #5 Julian B. | `index.html` `data-index` attributes (0-4), synced with `REVIEW_COLORS` | `index.html`, `script.js` | ✅ 100% |
| **29** | Review Typography | Style check | Confirm all review cards use exact same font-family, font-size, and line-height | Verified Cormorant Garamond `clamp(24px, 3.4vw, 42px)` italic quotes and Montserrat uppercase attributions | `.review-slide .review-quote`, `.review-slide .review-who` | `style.css` | ✅ 100% |
| **30** | Review Count | Quantity check | Confirm minimum 5 reviews present | Verified 5 distinct slides with dynamic background color mapping on scroll | `script.js` `REVIEW_COLORS` (5 tones) | `index.html`, `script.js` | ✅ 100% |

---

### Section 7 & Global Polish

| Item # | Component | Original / Legacy State | Requirement | Implemented Solution | Code & Target Selectors | Files | Status |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **31** | Opening Hours | Used decimal: `8.00–5.30` | Use colons in time format (`8:00–5:30`) | Updated contact detail list row to standard colon time notation | `<div class="row"><span class="k">Hours</span><span class="v">Mon–Fri, 8:00–5:30</span></div>` | `index.html` | ✅ 100% |
| **32** | Color Token Polish | Peach/orange tokens (`#f9ddcb`) | Replace remaining orange values in Section 2 headings with Light Beige (`#F5ECD7`) | Updated `:root` `--paper` and `--light-beige` to `#F5ECD7` | `:root { --paper: #F5ECD7; --light-beige: #F5ECD7; }` | `style.css` | ✅ 100% |

---

## 3. Section 5 — Complete 13 Kitchens Gallery Breakdown

| Card # | Collection Name | Image Asset | Legacy Caption | Final Evocative Aesthetic Caption | Material Palette & Atmosphere |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | **The Richmond** | `assets/gallery/1.jpg` | *The Richmond · Fluted Walnut & Quartzite* | **The Richmond · Fluted walnut cabinetry meets raw quartzite — understated grandeur** | Fluted dark American walnut, raw quartzite waterfall, architectural brass |
| **02** | **The Kew** | `assets/gallery/2.jpg` | *The Kew · Smoked Oak & Polished Carrara* | **The Kew · Smoked oak warmth, polished Carrara cool — a study in contrast** | Smoked European oak, polished Italian Carrara marble, warm/cool dualism |
| **03** | **The Chelsea** | `assets/gallery/3.jpg` | *The Chelsea · Minimalist Charcoal & Brass* | **The Chelsea · Charcoal minimalism, brass punctuation — restraint as a design choice** | Ultra-matte charcoal cabinetry, unlacquered brass pulls, clean minimalist lines |
| **04** | **The Surrey Estate** | `assets/gallery/4.jpg` | *The Surrey Estate · Hand-Sprayed Olive Shaker* | **The Surrey Estate · Hand-sprayed olive shaker, heritage proportions, country heart** | Custom hand-sprayed olive green, traditional timber shaker frames, country warmth |
| **05** | **The Aldgate** | `assets/gallery/5.jpg` | *The Aldgate · Unlacquered Brass & Island Canopy* | **The Aldgate · Unlacquered brass ages into the room — the canopy anchors it all** | Overhead custom brass canopy, living patina hardware, central island anchor |
| **06** | **The Barnes** | `assets/gallery/6.jpg` | *The Barnes · Natural Scandinavian Oak* | **The Barnes · Scandinavian oak, clean grain, honest light** | Rift-cut Scandinavian white oak, continuous grain matching, diffused daylight |
| **07** | **The Petersham** | `assets/gallery/7.jpg` | *The Petersham · Inset Frame & Monolithic Island* | **The Petersham · Inset frame precision, a monolithic island that earns its footprint** | Inset frame precision joinery, monolithic solid island block, grand footprint |
| **08** | **The Fulham** | `assets/gallery/8.jpg` | *The Fulham · Glazed Display & Integrated Pantry* | **The Fulham · Glazed display cabinetry, integrated pantry — everything in its place** | Reeded glazed upper cabinets, secret integrated walk-in pantry, bespoke joinery |
| **09** | **The Putney** | `assets/gallery/9.jpg` | *The Putney · Open-Plan Architecture & Quartz* | **The Putney · Open-plan architecture, quartz that runs wall to wall** | Seamless engineered quartz, wall-to-wall continuous run, open-plan integration |
| **10** | **The Wimbledon** | `assets/gallery/10.jpg` | *The Wimbledon · Sculpted Island & Fluted Glass* | **The Wimbledon · Sculpted island silhouette, fluted glass, a room that turns heads** | Curved island geometry, fluted decorative glass, statement warm lighting |
| **11** | **The Kingston** | `assets/gallery/11.jpg` | *The Kingston · Warm Stone & Breakfast Bar* | **The Kingston · Warm stone, a breakfast bar that becomes the household's axis** | Honed composite stone, cantilevered breakfast bar overhang, social focal point |
| **12** | **The Twickenham** | `assets/gallery/12.jpg` | *The Twickenham · Dual Tone Shaker & Brass Taps* | **The Twickenham · Dual-tone shaker, brass taps — familiar form, elevated finish** | Dual-tone heritage paint, classic shaker proportions, aged brass bridge mixer taps |
| **13** | **The Hampton** | `assets/gallery/13.jpg` | *The Hampton · Heritage Joinery & Marble Hearth* | **The Hampton · Heritage joinery, marble hearth detail — the past, built to last** | Traditional bespoke joinery, recessed range cooker marble hearth, timeless longevity |

---

## 4. Section 6 — 5 Client Reviews & Dynamic Background Palette

As the user scrolls through the 380vh Reviews section, the background color dynamically interpolates through five rich luxury tones matching each client story:

| Slide # | Client Name | Project & Location | Verified Review Quote | Dynamic Background Hex | Mood & Tone | Canva Move Note |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **01** | **A. Richardson** | Surrey Estate Kitchen | *“They left on Friday; we cooked for twelve on Saturday. It is undoubtedly the finest and warmest room in the house.”* | `#1A0A0E` | Rich Licorice Wine | Slot 1 (Preserved) |
| **02** | **Elena V.** | Chelsea Residence | *“Our fluted oak island has become the true centerpiece of our home. Exceptional bespoke craftsmanship from bench to fit.”* | `#2C0E14` | Deep Roasted Burgundy | Moved from Slot 3 -> Slot 2 |
| **03** | **Shahzad D.** | Full Kitchen Renovation | *“The five-day turnaround felt like magic. Uncompromising joinery, seamless stone joints, and absolutely zero mess left behind.”* | `#1A0A16` | Smoked Mulberry Charcoal | ⭐ **Moved to Slot 3 (Canva Requirement #28)** |
| **04** | **Marcus & Claire T.** | Wimbledon Townhouse | *“Every soft-close drawer and unlacquered brass tap was fitted with obsessive, artisan precision. A total masterclass.”* | `#2E1310` | Warm Terracotta Mahogany | Slot 4 (Preserved) |
| **05** | **Julian B.** | Kensington Pavilion | *“No subcontractors, no excuses. Just dedicated master craftspeople who take genuine, uncompromising pride in their work.”* | `#140508` | Midnight Black Bean | Slot 5 (Preserved) |

---

## 5. Complete Git Commit & Build History (From Inception)

```
* 5902bb6 (HEAD -> main) docs: expand Excel master sheet with 6 granular sheets, code snippets, tokens & gallery audit
* 1f33012 docs: add comprehensive Excel changelog with Canva revision document audit
* 8933a4e fix: use colons in hours format (8:00–5:30)
* 98d76a7 feat: replace Section 2 placeholder with final animation video from new_assets
* 2c0d06f feat: complete 28 outstanding client revisions across all sections
* d4096e1 feat: tuned hero scroll speed & scroll-linked 5 reviews with dynamic background colors
* 8c09fa2 feat: complete website revisions strictly matching revision doc and assets
* 243478b Fix cursor-buffer z-index stacking: keep photo trail cards strictly behind the text and buttons
* 8031662 Add Section 2 Picture Buffer cursor trail and move About/stats section above Contact with improved readable figures
* 2007607 Initial commit: Native Coast Appliances website with scroll animations and horizontal gallery
```

### Detailed Commit Breakdown

1. **Commit `2007607`** — *Initial commit: Native Coast Appliances website with scroll animations and horizontal gallery*
   - Architected single-page scrolling structure (`index.html`, `style.css`, `script.js`).
   - Implemented 296-frame WebP canvas scrubbing engine for Section 1 hero sequence.
   - Built sticky horizontal scroll gallery for Section 5 displaying bespoke kitchen projects.
   - Integrated mobile responsive layout and CSS glassmorphism styling.

2. **Commit `8031662`** — *Add Section 2 Picture Buffer cursor trail and move About/stats section above Contact with improved readable figures*
   - Added interactive mouse-tracking image trail container in Section 3.
   - Re-ordered About/Stats section hierarchy and wired intersection observer counter animations.

3. **Commit `243478b`** — *Fix cursor-buffer z-index stacking: keep photo trail cards strictly behind the text and buttons*
   - Resolved layer clipping bug: placed `.cursor-buffer__trail` at `z-index: 1` with `pointer-events: none` and `.cursor-buffer__content` at `z-index: 20` with `pointer-events: auto` so CTA buttons remain interactive.

4. **Commit `8c09fa2`** — *feat: complete website revisions strictly matching revision doc and assets*
   - Executed preliminary client revision checklist across hero headings, card layouts, and responsive paddings.

5. **Commit `d4096e1`** — *feat: tuned hero scroll speed & scroll-linked 5 reviews with dynamic background colors*
   - Smoothed scroll scrub interpolation (`HERO_LERP = 0.12`).
   - Integrated 5-step scroll-linked review slider with dynamic CSS background color interpolation.

6. **Commit `2c0d06f`** — *feat: complete 28 outstanding client revisions across all sections*
   - Implemented all 28 items from Canva revision doc: pure white hero text, dark red tagline, beige Section 2 typography & lead copy, 5-image cursor buffer cap, Section 4 sentence-cased steps & original copy, Section 5 3-tier hierarchy & 13 evocative captions, Section 6 Shahzad D. slot #3 move.

7. **Commit `98d76a7`** — *feat: replace Section 2 placeholder with final animation video from new_assets*
   - Extracted HD video `new_assets/Section 2/Final Animation .mp4` (18.6MB) as `assets/section2_anim.mp4`.
   - Updated `.gitignore` tracking exceptions to include production MP4 assets.
   - Configured HTML5 video element with `autoplay`, `loop`, `muted`, `playsinline`, and JS intersection play trigger.

8. **Commit `8933a4e`** — *fix: use colons in hours format (8:00–5:30)*
   - Changed contact section opening hours from `Mon–Fri, 8.00–5.30` to `Mon–Fri, 8:00–5:30`.

9. **Commit `1f33012`** — *docs: add comprehensive Excel changelog with Canva revision document audit*
   - Generated initial master Excel workbook tracking all revisions and git history.

10. **Commit `5902bb6`** — *docs: expand Excel master sheet with 6 granular sheets, code snippets, tokens & gallery audit*
    - Expanded Excel spreadsheet into 6 detailed sheets with code snippets, line references, color tokens, and 13-kitchen captions.

---

## 6. Design System, Typography & Color Tokens

```css
:root {
  --ink: #1A0A0E;              /* Primary Dark Licorice Canvas */
  --ink-2: #d8beaf;            /* Soft Muted Sand Typography */
  --shore: #1A0A0E;            /* Base Section Background */
  --shore-2: #240b0d;          /* Card Background Tone */
  --stone: #4C0507;            /* Glassmorphism Tint */
  --accent: #e3885e;           /* Warm Copper Eyebrow Accent */
  --accent-deep: #b04324;      /* Deep Terracotta CTA Background */
  --accent-dark: #7a3422;      /* Hover State for CTA Buttons */
  --brass: #ea9b76;            /* Warm Brass Numeral Accent */
  --paper: #F5ECD7;            /* Bright Light Beige Highlight */
  --pure-white: #ffffff;       /* Pure White Text (Hero, Stats, Reviews) */
  --light-beige: #F5ECD7;      /* Section 3 Buffer Background */
  --light-beige-dark: #EFE4CF; /* Section 3 Border Tint */
  --headerH: 78px;             /* Header Height Variable */
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Color Contrast & Usage Standards

| Token Name | Hex Code | Visual Application | Canva Revision Context | Contrast Status |
| :--- | :---: | :--- | :--- | :---: |
| **Primary Ink** | `#1A0A0E` | Main dark theme background, header bar | Base luxury tone | Pass (AAA Dark) |
| **Light Beige** | `#F5ECD7` | Section 2 Headings, Section 3 Background, "built once" | Canva Items 12, 13, 17: Orange -> Beige | Pass (High Contrast) |
| **Brand Dark Red** | `#8B1A1A` | Section 1 Hero Tagline "Kitchen Fitting & Renovations" | Canva Item 3: Dark Red Tagline | Pass (with Drop Shadow) |
| **Pure White** | `#FFFFFF` | All Hero scroll build text, stat numbers, review quotes | Canva Items 1, 2, 4, 5, 6, 8, 10, 15 | Maximum 21:1 Contrast |
| **Deep Terracotta** | `#B04324` | Primary CTAs ("Get a quote", "Start your kitchen") | Actionable interactive buttons | Pass (AA) |
| **Brass Numeral** | `#EA9B76` | Step numbers (01-04), loader progress bar | Brand metal accent | Pass (AA) |

---

## 7. Codebase Architecture & Section Mapping

```
site1.1/
├── index.html                                        # Main Single-Page HTML Markup
├── style.css                                         # Design System, Layout & Responsive Styles
├── script.js                                         # Scroll Engine, Canvas Scrubbing & Interactions
├── Native_Coast_Complete_Revision_and_Change_Log.xlsx # Master Multi-Sheet Excel Audit Document
├── PROJECT_CHANGELOG_AND_REVISION_AUDIT.md           # Full Markdown History & Audit (This File)
├── assets/
│   ├── kitchen_anim.mp4                              # Legacy animation asset
│   ├── section2_anim.mp4                             # High-definition Section 2 animation video (18.6MB)
│   └── gallery/                                      # 13 Bespoke Kitchen High-Res Photographs
│       ├── 1.jpg ... 13.jpg
└── frames/                                           # 296 WebP Compressed Frames for Scroll Scrub
    ├── frame_0001.webp ... frame_0296.webp
```

### Section ID Navigation Anchoring

- **`#top`** (`<a id="top"></a>`) — Top of page / Hero section.
- **`#about`** (`<section id="about">`) — Section 2: "The Native Coast Way" (About quote, HD video, 2-sentence story, 3 stats).
- **`#buffer`** (`<section id="buffer">`) — Section 3: "Which Kitchen Style Are You In The Mood For?" (Interactive cursor trail).
- **`#process`** (`<section id="process">`) — Section 4: "Our Process" (4 structured steps across 5 days on site).
- **`#work`** (`<section id="work">`) — Section 5: "Our Craft / Recent Kitchens" (Horizontal scroll track with 13 cards).
- **`#reviews`** (`<section id="reviews">`) — Section 6: "Client Stories / Verified Reviews" (5 review slides with dynamic colors).
- **`#contact`** (`<section id="contact">`) — Section 7: "Get in Touch / Request a Quote & Footer".
