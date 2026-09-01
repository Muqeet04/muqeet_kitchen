(function() {
  'use strict';

  // ===== CONSTANTS =====
  // TODO: replace scroll animation with final revised version asset when available
  var TOTAL_FRAMES = 296;
  var HERO_LERP = 0.12;      // hero interpolation
  var GALLERY_LERP = 0.06;   // gallery interpolation (slow, cinematic)
  var MAX_TRAIL_ITEMS = 5;   // strict limit: max 5 images active in cursor trail

  // Gallery image pool for Section 3 cursor trail
  var TRAIL_IMAGES = [
    'assets/gallery/1.jpg',
    'assets/gallery/2.jpg',
    'assets/gallery/3.jpg',
    'assets/gallery/4.jpg',
    'assets/gallery/5.jpg',
    'assets/gallery/6.jpg',
    'assets/gallery/7.jpg',
    'assets/gallery/8.jpg',
    'assets/gallery/9.jpg',
    'assets/gallery/10.jpg',
    'assets/gallery/11.jpg',
    'assets/gallery/12.jpg',
    'assets/gallery/13.jpg'
  ];

  // ===== DOM ELEMENTS =====
  var canvas = document.getElementById('heroCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
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
  var bufferStage = document.getElementById('bufferStage');
  var bufferTrail = document.getElementById('bufferTrail');

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

  // Cursor trail state
  var lastCursorX = 0;
  var lastCursorY = 0;
  var trailIndex = 0;
  var activeTrail = [];
  var isThrottled = false;

  // ===== UTILITY =====
  function clamp(x, a, b) {
    return x < a ? a : x > b ? b : x;
  }

  // ===== LOADING =====
  function setProgress(pct) {
    pct = Math.max(0, Math.min(100, pct));
    if (loadFill) loadFill.style.width = pct + '%';
    var msg = pct < 30 ? 'Preparing the room'
            : pct < 60 ? 'Crafting hardwood cabinetry'
            : pct < 90 ? 'Fitting stone & brass'
            : pct < 100 ? 'Finishing details'
            : 'Ready';
    if (loadStatus) loadStatus.textContent = msg + '… ' + Math.round(pct) + '%';
  }

  // ===== FRAME PRELOADING =====
  function preloadFrames() {
    for (var i = 1; i <= TOTAL_FRAMES; i++) {
      var img = new Image();
      img.src = 'frames/frame_' + String(i).padStart(4, '0') + '.webp';
      img.onload = onFrameLoaded;
      img.onerror = onFrameLoaded; // count errors to allow page completion
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
    if (frames[0] && frames[0].complete) {
      drawFrame(0);
    }
    if (loader) {
      loader.classList.add('gone');
      setTimeout(function() {
        if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
      }, 750);
    }
    computeHeroTarget();
    requestAnimationFrame(tick);
  }

  // ===== CANVAS RESIZE =====
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    var dpr = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    var idx = Math.round(heroCurrentFrame);
    if (frames[idx] && frames[idx].complete) {
      drawFrame(idx);
    }
  }

  // ===== DRAW FRAME =====
  function drawFrame(idx) {
    if (!canvas || !ctx) return;
    if (idx === lastDrawnIdx) return;
    if (!frames[idx] || !frames[idx].complete || !frames[idx].naturalWidth) return;
    lastDrawnIdx = idx;
    var img = frames[idx];
    var cw = canvas.width / (window.devicePixelRatio || 1);
    var ch = canvas.height / (window.devicePixelRatio || 1);
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

  // ===== HERO SCROLL CALCULATION =====
  function computeHeroTarget() {
    if (!hero) return;
    var rect = hero.getBoundingClientRect();
    var total = hero.offsetHeight - window.innerHeight;
    var p = clamp(-rect.top / total, 0, 1);
    heroTargetFrame = p * (TOTAL_FRAMES - 1);
    updateCaptions(p);
    if (header) {
      header.classList.toggle('solid', p > 0.99 || -rect.top >= total);
    }
    if (scrollcue) {
      scrollcue.style.opacity = p < 0.04 ? '1' : '0';
    }
  }

  // ===== CAPTION WINDOWING =====
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
      c.style.transform = 'translateY(' + ((1 - o) * 16) + 'px)';
    }
  }

  // ===== SECTION 5: GALLERY SCROLL =====
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

  // ===== MAIN TICK =====
  function tick() {
    // Hero frame interpolation
    heroCurrentFrame += (heroTargetFrame - heroCurrentFrame) * HERO_LERP;
    var idx = clamp(Math.round(heroCurrentFrame), 0, TOTAL_FRAMES - 1);
    drawFrame(idx);

    // Gallery horizontal interpolation
    if (gallerySection && galleryTrack) {
      galleryCurrentX += (galleryTargetX - galleryCurrentX) * GALLERY_LERP;
      galleryTrack.style.transform = 'translateX(' + (-galleryCurrentX) + 'px)';
    }

    requestAnimationFrame(tick);
  }

  // ===== SECTION 3: CURSOR TRAIL (STRICTLY MAX 5 IMAGES) =====
  function setupCursorBuffer() {
    if (!bufferStage || !bufferTrail) return;

    // Preload trail images
    TRAIL_IMAGES.forEach(function(src) {
      var im = new Image();
      im.src = src;
    });

    function spawnTrailItem(x, y) {
      var rect = bufferStage.getBoundingClientRect();
      var relX = x - rect.left;
      var relY = y - rect.top;

      // Random slight tilt (-8 to +8 deg)
      var rot = (Math.random() * 16 - 8).toFixed(1);

      var item = document.createElement('div');
      item.className = 'cursor-buffer__trail-item';
      item.style.left = relX + 'px';
      item.style.top = relY + 'px';
      item.style.setProperty('--rot', rot + 'deg');

      var img = document.createElement('img');
      img.src = TRAIL_IMAGES[trailIndex % TRAIL_IMAGES.length];
      img.alt = 'Kitchen style preview';
      item.appendChild(img);

      bufferTrail.appendChild(item);
      activeTrail.push(item);
      trailIndex++;

      // Trigger active animation
      requestAnimationFrame(function() {
        item.classList.add('is-active');
      });

      // STRICT CAP: If more than 5 images are in activeTrail, remove the oldest immediately
      while (activeTrail.length > MAX_TRAIL_ITEMS) {
        var oldest = activeTrail.shift();
        removeTrailItem(oldest);
      }

      // Automatically fade out after 2.2 seconds if not already removed
      setTimeout(function() {
        var idx = activeTrail.indexOf(item);
        if (idx !== -1) {
          activeTrail.splice(idx, 1);
          removeTrailItem(item);
        }
      }, 2200);
    }

    function removeTrailItem(el) {
      if (!el) return;
      el.classList.remove('is-active');
      el.classList.add('is-fading');
      setTimeout(function() {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 700);
    }

    bufferStage.addEventListener('mousemove', function(e) {
      var dist = Math.hypot(e.clientX - lastCursorX, e.clientY - lastCursorY);
      if (dist > 75 && !isThrottled) {
        lastCursorX = e.clientX;
        lastCursorY = e.clientY;
        spawnTrailItem(e.clientX, e.clientY);
        isThrottled = true;
        setTimeout(function() { isThrottled = false; }, 60);
      }
    });

    // Touch support for mobile devices
    bufferStage.addEventListener('touchmove', function(e) {
      if (e.touches.length > 0) {
        var t = e.touches[0];
        var dist = Math.hypot(t.clientX - lastCursorX, t.clientY - lastCursorY);
        if (dist > 65 && !isThrottled) {
          lastCursorX = t.clientX;
          lastCursorY = t.clientY;
          spawnTrailItem(t.clientX, t.clientY);
          isThrottled = true;
          setTimeout(function() { isThrottled = false; }, 80);
        }
      }
    }, { passive: true });
  }

  // ===== REVEAL ON SCROLL & STAT COUNTERS =====
  function setupReveals() {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        var vids = en.target.querySelectorAll('video');
        vids.forEach(function(v) {
          if (v.paused) {
            v.play().catch(function() {});
          }
        });
        var counters = en.target.querySelectorAll('[data-count]');
        for (var i = 0; i < counters.length; i++) {
          if (!counters[i].dataset.done) {
            counters[i].dataset.done = '1';
            countUp(counters[i]);
          }
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.rv').forEach(function(el) {
      io.observe(el);
    });
  }

  function countUp(el) {
    var target = +el.dataset.count;
    if (reduceMotion) {
      el.textContent = target;
      return;
    }
    var t0 = null;
    var durMs = 1500;
    function step(ts) {
      if (!t0) t0 = ts;
      var k = Math.min(1, (ts - t0) / durMs);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ===== SECTION 6: SCROLL-DRIVEN REVIEWS =====
  var reviewsSection = document.getElementById('reviews');
  var reviewsBg = document.getElementById('reviewsBg');
  var reviewCurr = document.getElementById('reviewCurr');
  var reviewSlides = Array.prototype.slice.call(document.querySelectorAll('.review-slide'));
  var reviewDots = Array.prototype.slice.call(document.querySelectorAll('#reviewsDots .dot-btn'));
  var currentActiveReview = 0;

  var REVIEW_COLORS = [
    '#1A0A0E', // Review 1: Rich Licorice Wine
    '#2C0E14', // Review 2: Deep Roasted Burgundy
    '#1A0A16', // Review 3: Smoked Mulberry Charcoal
    '#2E1310', // Review 4: Warm Terracotta Mahogany
    '#140508'  // Review 5: Midnight Black Bean
  ];

  function computeReviewsTarget() {
    if (!reviewsSection || !reviewSlides.length) return;
    var rect = reviewsSection.getBoundingClientRect();
    var total = reviewsSection.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    var progress = clamp(-rect.top / total, 0, 0.999);
    var numReviews = reviewSlides.length;
    var targetIdx = Math.min(numReviews - 1, Math.floor(progress * numReviews));

    if (targetIdx !== currentActiveReview) {
      setActiveReview(targetIdx);
    }
  }

  function setActiveReview(idx) {
    currentActiveReview = idx;

    reviewSlides.forEach(function(slide, i) {
      if (i === idx) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });

    reviewDots.forEach(function(dot, i) {
      if (i === idx) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    });

    if (reviewCurr) {
      reviewCurr.textContent = String(idx + 1).padStart(2, '0');
    }

    if (reviewsBg && REVIEW_COLORS[idx]) {
      reviewsBg.style.backgroundColor = REVIEW_COLORS[idx];
    }
  }

  function setupReviewsNav() {
    reviewDots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        var idx = parseInt(dot.dataset.idx, 10);
        if (!isNaN(idx) && reviewsSection) {
          var rect = reviewsSection.getBoundingClientRect();
          var total = reviewsSection.offsetHeight - window.innerHeight;
          var targetScroll = window.scrollY + rect.top + (total * (idx + 0.1) / reviewSlides.length);
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          setActiveReview(idx);
        }
      });
    });
  }

  // ===== EVENT LISTENERS =====
  function onScroll() {
    computeHeroTarget();
    computeGalleryTarget();
    computeReviewsTarget();
  }

  function onResize() {
    resizeCanvas();
    if (header) {
      document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px');
    }
    computeHeroTarget();
    computeGalleryTarget();
    computeReviewsTarget();
  }

  // ===== MOBILE NAV TOGGLE =====
  var menuBtn = document.getElementById('menuBtn');
  var navEl = document.querySelector('header nav');
  if (menuBtn && navEl) {
    menuBtn.addEventListener('click', function() {
      navEl.classList.toggle('open');
      menuBtn.classList.toggle('active');
    });
    navEl.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navEl.classList.remove('open');
        menuBtn.classList.remove('active');
      });
    });
  }

  // ===== SMOOTH SCROLL FOR NAV / CTA LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== BELGRADE ARBOR HARMONIC SILK CANVAS CURSOR ENGINE =====
  function WaveOscillator(options) {
    options = options || {};
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.0015;
    this.amplitude = options.amplitude || 85;
    this.currentValue = 0;
  }

  WaveOscillator.prototype.update = function() {
    this.phase += this.frequency;
    this.currentValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.currentValue;
  };

  function PhysicsNode() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  function SilkTrail(options, config, mousePos) {
    this.config = config;
    this.mousePos = mousePos;
    this.spring = options.spring + (0.1 * Math.random() - 0.02);
    this.friction = this.config.friction + (0.01 * Math.random() - 0.002);
    this.nodes = [];

    for (var i = 0; i < this.config.size; i++) {
      var node = new PhysicsNode();
      node.x = this.mousePos.x;
      node.y = this.mousePos.y;
      this.nodes.push(node);
    }
  }

  SilkTrail.prototype.update = function() {
    var springFactor = this.spring;
    var leadNode = this.nodes[0];

    leadNode.vx += (this.mousePos.x - leadNode.x) * springFactor;
    leadNode.vy += (this.mousePos.y - leadNode.y) * springFactor;

    for (var i = 0, len = this.nodes.length; i < len; i++) {
      var node = this.nodes[i];
      if (i > 0) {
        var prevNode = this.nodes[i - 1];
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
  };

  SilkTrail.prototype.draw = function(ctx) {
    if (this.nodes.length < 2) return;

    var currX = this.nodes[0].x;
    var currY = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(currX, currY);

    var i = 1;
    var end = this.nodes.length - 2;
    for (; i < end; i++) {
      var nodeA = this.nodes[i];
      var nodeB = this.nodes[i + 1];
      currX = 0.5 * (nodeA.x + nodeB.x);
      currY = 0.5 * (nodeA.y + nodeB.y);
      ctx.quadraticCurveTo(nodeA.x, nodeA.y, currX, currY);
    }

    var nodeLastA = this.nodes[i];
    var nodeLastB = this.nodes[i + 1];
    ctx.quadraticCurveTo(nodeLastA.x, nodeLastA.y, nodeLastB.x, nodeLastB.y);
    ctx.stroke();
    ctx.closePath();
  };

  function CustomCursor() {
    this.canvas = null;
    this.ctx = null;
    this.running = false;
    this.rafId = null;

    this.mousePos = {
      x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
      y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    };

    this.config = {
      friction: 0.5,
      trails: 10,
      size: 10,
      dampening: 0.1,
      tension: 0.98
    };

    this.trails = [];
    this.oscillator = null;

    this.strokeHue = 'hsla(34.2, 42%, 58%, 0.28)';
    this.accentStrokeHue = 'hsla(20, 68%, 65%, 0.38)';
    this.currentStroke = this.strokeHue;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.render = this.render.bind(this);

    this.init();
  }

  CustomCursor.prototype.init = function() {
    if (typeof window === 'undefined') return;

    this.createCanvas();
    this.setupOscillator();
    this.createTrails();
    this.bindEvents();
    this.start();
  };

  CustomCursor.prototype.createCanvas = function() {
    var existingCanvas = document.getElementById('belgrade-cursor-canvas');
    if (existingCanvas) existingCanvas.remove();

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'belgrade-cursor-canvas';
    this.canvas.className = 'belgrade-cursor-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.handleResize();
  };

  CustomCursor.prototype.setupOscillator = function() {
    this.oscillator = new WaveOscillator({
      phase: 2 * Math.random() * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285
    });
  };

  CustomCursor.prototype.createTrails = function() {
    this.trails = [];
    for (var i = 0; i < this.config.trails; i++) {
      this.trails.push(
        new SilkTrail(
          { spring: 0.4 + (i / this.config.trails) * 0.025 },
          this.config,
          this.mousePos
        )
      );
    }
  };

  CustomCursor.prototype.bindEvents = function() {
    var self = this;
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    window.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('orientationchange', this.handleResize, { passive: true });

    window.addEventListener('focus', function() {
      if (!self.running) {
        self.running = true;
        self.render();
      }
    });

    window.addEventListener('blur', function() {
      self.running = false;
    });

    document.addEventListener('mouseover', function(e) {
      if (e.target.closest('a, button, .cta, .lnk, .nav-cta, .hgallery-card, .stat-card, [role="button"]')) {
        self.currentStroke = self.accentStrokeHue;
      }
    });

    document.addEventListener('mouseout', function(e) {
      if (e.target.closest('a, button, .cta, .lnk, .nav-cta, .hgallery-card, .stat-card, [role="button"]')) {
        self.currentStroke = self.strokeHue;
      }
    });
  };

  CustomCursor.prototype.handleMouseMove = function(e) {
    this.mousePos.x = e.clientX;
    this.mousePos.y = e.clientY;
  };

  CustomCursor.prototype.handleTouchMove = function(e) {
    if (e.touches && e.touches.length > 0) {
      this.mousePos.x = e.touches[0].clientX;
      this.mousePos.y = e.touches[0].clientY;
    }
  };

  CustomCursor.prototype.handleTouchStart = function(e) {
    if (e.touches && e.touches.length === 1) {
      this.mousePos.x = e.touches[0].clientX;
      this.mousePos.y = e.touches[0].clientY;
    }
  };

  CustomCursor.prototype.handleResize = function() {
    if (!this.canvas) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
  };

  CustomCursor.prototype.start = function() {
    if (this.running) return;
    this.running = true;
    this.render();
  };

  CustomCursor.prototype.stop = function() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  CustomCursor.prototype.render = function() {
    if (!this.running || !this.ctx || !this.canvas) return;

    if (this.oscillator) {
      this.oscillator.update();
    }

    var width = window.innerWidth;
    var height = window.innerHeight;

    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.clearRect(0, 0, width, height);

    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.strokeStyle = this.currentStroke;
    this.ctx.lineWidth = 1;

    for (var i = 0; i < this.config.trails; i++) {
      var trail = this.trails[i];
      if (trail) {
        trail.update();
        trail.draw(this.ctx);
      }
    }

    this.rafId = requestAnimationFrame(this.render);
  };

  // ===== THIN LINE VERTICAL CURSOR (SITE-WIDE) =====
  function setupLineCursor() {
    if (typeof window === 'undefined' || matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    var cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', function() {
      cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function() {
      cursor.style.opacity = '1';
    });
  }

  // ===== INIT =====
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', function() {
    setTimeout(onResize, 200);
  });

  if (header) {
    document.documentElement.style.setProperty('--headerH', header.offsetHeight + 'px');
  }

  setProgress(0);
  preloadFrames();
  setupReveals();
  setupCursorBuffer();
  setupReviewsNav();
  setupLineCursor();
  new CustomCursor();
})();

