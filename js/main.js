// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript (Sketchfilm)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initLoader();
  initCursor();
  initMagnetic();

  initNavigation();
  initHeroTransform();     // NEW: sketch -> photo in hero
  initPortfolio();
  initTestimonials();
  initModal();             // updated for new modal DOM
  initContactForm();
  initScrollAnimations();
});

// ============================================
// LOADER
// ============================================
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const lines = Array.from(loader.querySelectorAll('.loader-line'));
  let idx = 0;

  const rotate = () => {
    if (!lines.length) return;
    lines.forEach((l) => l.classList.remove('is-active'));
    lines[idx % lines.length]?.classList.add('is-active');
    idx += 1;
  };

  rotate();
  const rotTimer = setInterval(rotate, 650);

  // Premium timing, but always exits.
  setTimeout(() => {
    clearInterval(rotTimer);
    loader.classList.add('done');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 560);
  }, 2200);
}

// ============================================
// CURSOR (pencil-ish) + HOVER STATE
// ============================================
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let fx = x;
  let fy = y;

  window.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
  });

  const loop = () => {
    fx += (x - fx) * 0.12;
    fy += (y - fy) * 0.12;
    follower.style.transform = `translate(${fx}px, ${fy}px)`;
    requestAnimationFrame(loop);
  };
  loop();

  const setLink = (on) => {
    cursor.classList.toggle('is-link', on);
    follower.classList.toggle('is-link', on);
  };

  const attach = () => {
    document
      .querySelectorAll('a, button, .work-item, .filter-btn, .modal-close, .reveal-btn, .transform-toggle')
      .forEach((el) => {
        el.addEventListener('mouseenter', () => setLink(true));
        el.addEventListener('mouseleave', () => setLink(false));
      });
  };

  attach();

  // Re-attach on DOM changes (portfolio render)
  const mo = new MutationObserver(() => attach());
  mo.observe(document.body, { childList: true, subtree: true });
}

// ============================================
// MAGNETIC HOVER
// ============================================
function initMagnetic() {
  const items = document.querySelectorAll('.magnetic');
  if (!items.length) return;

  items.forEach((el) => {
    const strength = 10;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(relX / rect.width) * strength}px, ${(relY / rect.height) * strength}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 74;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================================
// HERO TRANSFORM (Sketch -> Photo)
// - Scroll reveals on desktop
// - Hold-to-reveal on mobile
// ============================================
function initHeroTransform() {
  const wrap = document.getElementById('heroTransform');
  const btn = document.getElementById('heroToggle');
  if (!wrap) return;

  let holdActive = false;

  // Hold-to-reveal
  const setRevealed = (on) => {
    wrap.classList.toggle('revealed', on);
  };

  const startHold = (e) => {
    e.preventDefault();
    holdActive = true;
    setRevealed(true);
  };

  const endHold = (e) => {
    e.preventDefault();
    holdActive = false;
    setRevealed(false);
  };

  if (btn) {
    // Touch + mouse
    btn.addEventListener('pointerdown', startHold);
    btn.addEventListener('pointerup', endHold);
    btn.addEventListener('pointercancel', endHold);
    btn.addEventListener('pointerleave', () => {
      if (holdActive) setRevealed(false);
      holdActive = false;
    });
  }

  // Scroll reveal (only when not holding)
  const onScroll = () => {
    if (holdActive) return;

    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight || 800;

    // Reveal when component is in the middle band of viewport
    const inView = rect.top < vh * 0.62 && rect.bottom > vh * 0.38;
    setRevealed(inView);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

// ============================================
// PORTFOLIO (Selected Homes)
// ============================================
function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    console.warn('[Portfolio] projects not found.');
    return;
  }

  // Support both old and new data formats:
  // - new: photo + sketch
  // - old: image
  const getCardImage = (p) => p.photo || p.image || '';

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

    grid.innerHTML = filtered
      .map((p) => {
        const typeLabel = p.type === 'custom' ? 'Custom Home' : 'Spec Home';
        const img = getCardImage(p);

        return `
          <article class="work-item fade-in" data-id="${p.id}">
            <div class="work-media">
              <img src="${img}" alt="${p.title}" loading="lazy">
              <div class="work-overlay" aria-hidden="true"></div>
            </div>
            <div class="work-body">
              <div class="work-type">${typeLabel}</div>
              <h3 class="work-title">${p.title}</h3>
              <p class="work-loc">${p.location}</p>
              <div class="work-specs">
                <span>${p.sqft} SQ FT</span>
                <span>${p.beds} BED</span>
                <span>${p.baths} BATH</span>
                <span>${p.year}</span>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    document.querySelectorAll('.work-item').forEach((item) => {
      item.addEventListener('click', () => openModal(parseInt(item.dataset.id, 10)));
    });

    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('visible'));
    }, 60);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  renderProjects();
}

// ============================================
// TESTIMONIALS
// ============================================
function initTestimonials() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  // Your current index.html doesn’t include testimonials section,
  // so this should simply no-op if elements don't exist.
  if (!track || !dotsContainer || !prevBtn || !nextBtn) return;
  if (typeof testimonials === 'undefined' || !Array.isArray(testimonials)) return;

  let currentIndex = 0;

  track.innerHTML = testimonials
    .map(
      (t, i) => `
      <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
        <p class="testimonial-quote">“${t.quote}”</p>
        <p class="testimonial-author">${t.author}</p>
        <p class="testimonial-project">${t.project}</p>
      </div>`
    )
    .join('');

  dotsContainer.innerHTML = testimonials
    .map(
      (_, i) => `<button class="dotbtn ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
    )
    .join('');

  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const dots = Array.from(document.querySelectorAll('.dotbtn'));

  function goTo(index) {
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  dots.forEach((d) => d.addEventListener('click', () => goTo(parseInt(d.dataset.index, 10))));

  if (slides.length > 1) setInterval(() => goTo(currentIndex + 1), 6500);
}

// ============================================
// MODAL (Sketch -> Photo + verse)
// ============================================
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = document.getElementById('modalClose') || modal.querySelector('.modal-close');
  const revealBtn = document.getElementById('modalReveal');

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  revealBtn?.addEventListener('click', () => {
    const t = document.getElementById('modalTransform');
    if (t) t.classList.toggle('revealed');
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const p = (typeof projects !== 'undefined' ? projects : []).find((x) => x.id === projectId);
  if (!p) return;

  const modalType = document.getElementById('modalType');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalSpecs = document.getElementById('modalSpecs');

  const modalSketch = document.getElementById('modalSketch');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalTransform = document.getElementById('modalTransform');

  const verseText = document.getElementById('modalVerseText');
  const verseRef = document.getElementById('modalVerseRef');

  // Reset reveal state every open
  if (modalTransform) modalTransform.classList.remove('revealed');

  // Fill copy
  if (modalType) modalType.textContent = p.type === 'custom' ? 'Custom Home' : 'Spec Home';
  if (modalTitle) modalTitle.textContent = p.title;
  if (modalLocation) modalLocation.textContent = p.location;
  if (modalDescription) modalDescription.textContent = p.description || '';

  // Fill images (support both old/new data formats)
  const sketchSrc = p.sketch || p.image || p.photo || '';
  const photoSrc = p.photo || p.image || '';

  if (modalSketch) {
    modalSketch.src = sketchSrc;
    modalSketch.alt = `${p.title} sketch`;
  }
  if (modalPhoto) {
    modalPhoto.src = photoSrc;
    modalPhoto.alt = `${p.title} completed home`;
  }

  // Fill specs
  if (modalSpecs) {
    modalSpecs.innerHTML = `
      <div class="spec-item"><span class="spec-label">Sq Ft</span><span class="spec-value">${p.sqft}</span></div>
      <div class="spec-item"><span class="spec-label">Beds</span><span class="spec-value">${p.beds}</span></div>
      <div class="spec-item"><span class="spec-label">Baths</span><span class="spec-value">${p.baths}</span></div>
      <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${p.year}</span></div>
    `;
  }

  // Verse (optional per project)
  if (verseText) verseText.textContent = p.verseText || '';
  if (verseRef) verseRef.textContent = p.verseRef || '';

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Reset modal reveal state for next open
  const t = document.getElementById('modalTransform');
  if (t) t.classList.remove('revealed');
}

// ============================================
// CONTACT FORM (placeholder behavior)
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    await new Promise((r) => setTimeout(r, 1200));

    btn.textContent = 'Request Sent';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 1600);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => obs.observe(el));
}