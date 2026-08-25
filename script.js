(function() {
  'use strict';

  // ===== CONSTANTS =====
  var TOTAL_FRAMES = 192;
  var HERO_LERP = 0.12;      // hero interpolation (responsive)
  var GALLERY_LERP = 0.06;   // gallery interpolation (slow, cinematic)

  // ===== DOM ELEMENTS =====
  var canvas = document.getElementById('heroCanvas');
  var ctx = canvas.getContext('2d');
  var hero = document.getElementById('hero');
  var header = document.getElementById('header');
  var loader = document.getElementById('loader');
  var loadFill = document.getElementById('loadFill');
  var loadStatus = document.getElementById('loadStatus');
  var scrollcue = document.getElementById('scrollcue');
  var caps = Array.prototype.slice.call(document.querySelectorAll('#hero .cap'));
  var gallerySection = document.querySelector('.hgallery');
  var galleryTrack = document.getElementById('galleryTrack');
  var galleryProgress = document.getElementById('galleryProgress');

  // ===== STATE =====
  var frames = [];
  var loadedCount = 0;
  var heroCurrentFrame = 0;
  var heroTargetFrame = 0;
  var galleryCurrentX = 0;
  var galleryTargetX = 0;
  var primed = false;
  var lastDrawnIdx = -1;
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== UTILITY =====
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }

  // ===== LOADING =====
  function setProgress(pct) {
    pct = Math.max(0, Math.min(100, pct));
    loadFill.style.width = pct + '%';
    var msg = pct < 30 ? 'Preparing the room' : pct < 60 ? 'Installing cabinets' : pct < 90 ? 'Fitting the island' : pct < 100 ? 'Adding the finishing touches' : 'Ready';
    loadStatus.textContent = msg + '… ' + Math.round(pct) + '%';
  }

  // ===== FRAME PRELOADING =====
  function preloadFrames() {
    for (var i = 1; i <= TOTAL_FRAMES; i++) {
      var img = new Image();
      img.src = 'frames/frame_' + String(i).padStart(4, '0') + '.webp';
      img.onload = onFrameLoaded;
      img.onerror = onFrameLoaded; // count errors too so loading completes
      frames.push(img);
    }
  }

  function onFrameLoaded() {
    loadedCount++;
    setProgress((loadedCount / TOTAL_FRAMES) * 100);
    if (loadedCount >= TOTAL_FRAMES) {
      onAllFramesLoaded();
    }
  }

  function onAllFramesLoaded() {
    if (primed) return;
    primed = true;
    resizeCanvas();
    // Draw first frame immediately
    if (frames[0] && frames[0].complete) {
      drawFrame(0);
    }
    // Hide loader
    loader.classList.add('gone');
    setTimeout(function() {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, 800);
    // Start animation loop
    computeHeroTarget();
    requestAnimationFrame(tick);
  }

  // ===== CANVAS RESIZE =====
  function resizeCanvas() {
    // Set canvas to device pixel ratio for sharp rendering
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    // Redraw current frame after resize
    var idx = Math.round(heroCurrentFrame);
    if (frames[idx] && frames[idx].complete) {
      drawFrame(idx);
    }
  }

  // ===== DRAW FRAME =====
  function drawFrame(idx) {
    if (idx === lastDrawnIdx) return;
    if (!frames[idx] || !frames[idx].complete || !frames[idx].naturalWidth) return;
    lastDrawnIdx = idx;
    var img = frames[idx];
    var cw = canvas.width / (window.devicePixelRatio || 1);
    var ch = canvas.height / (window.devicePixelRatio || 1);
    // Cover fit (same as object-fit: cover)
    var imgRatio = img.naturalWidth / img.naturalHeight;
    var canvasRatio = cw / ch;
    var sw, sh, sx, sy;
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
  }

  // ===== HERO SCROLL =====
  function computeHeroTarget() {
    var rect = hero.getBoundingClientRect();
    var total = hero.offsetHeight - window.innerHeight;
    var p = clamp(-rect.top / total, 0, 1);
    heroTargetFrame = p * (TOTAL_FRAMES - 1);
    updateCaptions(p);
    header.classList.toggle('solid', p > 0.992 || -rect.top >= total);
    if (scrollcue) scrollcue.style.opacity = p < 0.04 ? 1 : 0;
  }

  // ===== CAPTION SYSTEM =====
  function win(p, a, b, f) {
    f = f || 0.035;
    if (p < a - f || p > b + f) return 0;
    if (p < a) return (p - (a - f)) / f;
    if (p > b) return 1 - ((p - b) / f);
    return 1;
  }

  function updateCaptions(p) {
    for (var i = 0; i < caps.length; i++) {
      var c = caps[i];
      var o = win(p, +c.dataset.a, +c.dataset.b);
      c.style.opacity = o;
      c.style.transform = 'translateY(' + ((1 - o) * 14) + 'px)';
    }
  }

  // ===== GALLERY HORIZONTAL SCROLL =====
  function computeGalleryTarget() {
    if (!gallerySection || !galleryTrack) return;
    var rect = gallerySection.getBoundingClientRect();
    var total = gallerySection.offsetHeight - window.innerHeight;
    var progress = clamp(-rect.top / total, 0, 1);
    var maxShift = galleryTrack.scrollWidth - window.innerWidth + 120;
    if (maxShift < 0) maxShift = 0;
    galleryTargetX = progress * maxShift;
    if (galleryProgress) {
      galleryProgress.style.width = (progress * 100) + '%';
    }
  }

  // ===== MAIN ANIMATION LOOP =====
  function tick() {
    // Hero frame interpolation
    heroCurrentFrame += (heroTargetFrame - heroCurrentFrame) * HERO_LERP;
    var idx = clamp(Math.round(heroCurrentFrame), 0, TOTAL_FRAMES - 1);
    drawFrame(idx);

    // Gallery horizontal scroll interpolation
    if (gallerySection && galleryTrack) {
      galleryCurrentX += (galleryTargetX - galleryCurrentX) * GALLERY_LERP;
      galleryTrack.style.transform = 'translateX(' + (-galleryCurrentX) + 'px)';
    }

    requestAnimationFrame(tick);
  }

  // ===== REVEAL ON SCROLL (IntersectionObserver) =====
  function setupReveals() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        // Count-up stats
        var counters = en.target.querySelectorAll('[data-count]');
        for (var i = 0; i < counters.length; i++) {
          if (!counters[i].dataset.done) {
            counters[i].dataset.done = '1';
            countUp(counters[i]);
          }
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('.rv').forEach(function(el) { io.observe(el); });
  }

  function countUp(el) {
    var target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    var t0 = null, durMs = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / durMs);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ===== EVENT LISTENERS =====
  function onScroll() {
    computeHeroTarget();
    computeGalleryTarget();
  }

  function onResize() {
    resizeCanvas();
    document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px');
    computeHeroTarget();
    computeGalleryTarget();
  }

  // ===== MOBILE NAV TOGGLE =====
  // (hamburger menu for mobile)
  var menuBtn = document.getElementById('menuBtn');
  var navEl = document.querySelector('header nav');
  if (menuBtn && navEl) {
    menuBtn.addEventListener('click', function() {
      navEl.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
    // Close nav on link click
    navEl.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navEl.classList.remove('open');
        menuBtn.classList.remove('active');
      });
    });
  }

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== SECTION 2: PICTURE BUFFER TRAIL EFFECT =====
  function setupCursorBuffer() {
    var bufferStage = document.getElementById('bufferStage');
    var bufferTrail = document.getElementById('bufferTrail');
    if (!bufferStage || !bufferTrail) return;

    var trailImages = [
      'peakpx (1).jpg',
      'peakpx (2).jpg',
      'peakpx (3).jpg',
      'peakpx (4).jpg',
      'peakpx (5).jpg',
      'peakpx (6).jpg',
      'peakpx (7).jpg',
      'peakpx (8).jpg',
      'peakpx (9).jpg',
      'peakpx (10).jpg',
      'peakpx (11).jpg',
      'peakpx (12).jpg',
      'peakpx (13).jpg',
      'peakpx.jpg',
    ];

    var imageIndex = 0;
    var lastX = 0;
    var lastY = 0;
    var zIndexCounter = 1;
    var threshold = 70;

    function spawnTrailItem(x, y) {
      var item = document.createElement('div');
      item.className = 'cursor-buffer__trail-item';

      var rot = (Math.random() * 14 - 7).toFixed(1);
      item.style.setProperty('--rot', rot + 'deg');
      item.style.left = x + 'px';
      item.style.top = y + 'px';
      item.style.zIndex = ++zIndexCounter;

      var img = document.createElement('img');
      img.src = trailImages[imageIndex % trailImages.length];
      img.alt = 'Bespoke kitchen detail';
      imageIndex++;

      item.appendChild(img);
      bufferTrail.appendChild(item);

      requestAnimationFrame(function() {
        item.classList.add('is-active');
      });

      if (bufferTrail.children.length > 12) {
        var oldest = bufferTrail.firstElementChild;
        if (oldest) {
          oldest.classList.add('is-fading');
          setTimeout(function() {
            if (oldest.parentNode) oldest.parentNode.removeChild(oldest);
          }, 700);
        }
      }

      setTimeout(function() {
        if (item.parentNode) {
          item.classList.add('is-fading');
          setTimeout(function() {
            if (item.parentNode) item.parentNode.removeChild(item);
          }, 700);
        }
      }, 2200);
    }

    function handlePointerMove(e) {
      var rect = bufferStage.getBoundingClientRect();
      var clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      var clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null);

      if (clientX === null || clientY === null) return;

      var x = clientX - rect.left;
      var y = clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      var dist = Math.hypot(x - lastX, y - lastY);
      if (dist > threshold || (lastX === 0 && lastY === 0)) {
        spawnTrailItem(x, y);
        lastX = x;
        lastY = y;
      }
    }

    bufferStage.addEventListener('mousemove', handlePointerMove, { passive: true });
    bufferStage.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Initial gentle preview trail on first viewport entry
    var bufferObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var rect = bufferStage.getBoundingClientRect();
        var startX = rect.width * 0.22;
        var endX = rect.width * 0.78;
        var y = rect.height * 0.5;

        for (var i = 0; i < 4; i++) {
          (function(idx) {
            setTimeout(function() {
              var posX = startX + (endX - startX) * (idx / 3);
              var posY = y + (idx % 2 === 0 ? -30 : 30);
              spawnTrailItem(posX, posY);
            }, idx * 260);
          })(i);
        }
        bufferObserver.unobserve(bufferStage);
      });
    }, { threshold: 0.25 });

    bufferObserver.observe(bufferStage);
  }

  // ===== INIT =====
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', function() {
    setTimeout(onResize, 200);
  });

  document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px');
  setProgress(0);
  preloadFrames();
  setupReveals();
  setupCursorBuffer();
})();
