// ============================================
// STONESIDE CUSTOM HOMES — Premium JavaScript
// premium.js
// ============================================

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    // Preloader prevents layout shift on load; keep it, but honor reduced motion.
    initPreloader({ prefersReducedMotion });

    // Cursor is desktop-only and should never run on touch / coarse pointer.
    if (!prefersReducedMotion && !isCoarsePointer) initCursor();

    initHeader();
    initNavigation();
    initHeroAnimations({ prefersReducedMotion });
    initScrollAnimations({ prefersReducedMotion });
    initPortfolio();
    initTestimonials({ prefersReducedMotion });
    initModal();
    initContactForm();
    if (!prefersReducedMotion) initCountUp();
  });

  // ============================================
  // PRELOADER
  // ============================================
  function initPreloader({ prefersReducedMotion } = {}) {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // If you're using the preloader, ensure scroll is locked until it's gone.
    document.body.classList.add('no-scroll');

    const minDuration = prefersReducedMotion ? 300 : 2200;
    const maxDuration = prefersReducedMotion ? 1200 : 4000;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');

        setTimeout(() => {
          try { preloader.remove(); } catch (_) {}
        }, 900);
      }, minDuration);
    });

    // Fallback
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
      }
    }, maxDuration);
  }

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  function initCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.matchMedia('(max-width: 1024px)').matches) return;

    const pencil = cursor.querySelector('.cursor-pencil');
    if (!pencil) return;

    // Smooth follow + subtle rotation based on velocity.
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    let angle = -35; // default “architect pencil” tilt

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animate() {
      const dx = mouseX - x;
      const dy = mouseY - y;

      // Follow
      x += dx * 0.18;
      y += dy * 0.18;

      // Velocity angle (smoothed)
      const vX = x - lastX;
      const vY = y - lastY;
      const targetAngle = Math.atan2(vY, vX) * 180 / Math.PI;
      if (Number.isFinite(targetAngle)) angle += (targetAngle - angle) * 0.15;

      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`;

      lastX = x;
      lastY = y;
      requestAnimationFrame(animate);
    }

    // Initialize position immediately to avoid “jump”
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) rotate(${angle}deg)`;
    requestAnimationFrame(animate);

    // Hover states
    const bindHover = (root = document) => {
      root.querySelectorAll('a, button, summary, input, textarea, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
    };

    bindHover();

    const observer = new MutationObserver(() => bindHover());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ============================================
  // HEADER
  // ============================================
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset || 0;

          if (currentScroll > 50) header.classList.add('scrolled');
          else header.classList.remove('scrolled');

          if (currentScroll > lastScroll && currentScroll > 200) header.classList.add('hidden');
          else header.classList.remove('hidden');

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================
  // NAVIGATION
  // ============================================
  function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
      const closeNav = () => {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      };

      const openNav = () => {
        navToggle.classList.add('active');
        nav.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');

        // Focus first link for keyboard users.
        const firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      };

      navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('active');
        if (isOpen) closeNav();
        else openNav();
      });

      nav.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.matches('a[href^="#"]')) closeNav();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
          closeNav();
          navToggle.focus({ preventScroll: true });
        }
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      });
    });
  }

  // ============================================
  // HERO ANIMATIONS
  // ============================================
  function initHeroAnimations({ prefersReducedMotion } = {}) {
    const heroFrame = document.querySelector('.hero-frame');
    if (!heroFrame) return;

    if (prefersReducedMotion) {
      heroFrame.classList.add('revealed');
      return;
    }

    const handleScroll = () => {
      const rect = heroFrame.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
        heroFrame.classList.add('revealed');
      } else {
        heroFrame.classList.remove('revealed');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ============================================
  // COUNT UP ANIMATION
  // ============================================
  function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number.parseInt(counter.dataset.count || '0', 10);
        if (!Number.isFinite(target)) return;

        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * target);

          counter.textContent = String(current);

          if (progress < 1) requestAnimationFrame(updateCounter);
          else counter.textContent = String(target);
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations({ prefersReducedMotion } = {}) {
    const fadeElements = document.querySelectorAll('.fade-in, [data-aos]');
    if (!fadeElements.length) return;

    if (prefersReducedMotion) {
      fadeElements.forEach(el => el.classList.add('visible', 'aos-animate'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible', 'aos-animate');
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    const animateElements = document.querySelectorAll(
      '.section-label, .section-title, .value-card, .pillar, .process-step, .project-card, .contact-step, .faq-item'
    );

    animateElements.forEach(el => {
      if (!el.classList.contains('fade-in') && !el.hasAttribute('data-aos')) {
        el.classList.add('fade-in');
        observer.observe(el);
      }
    });
  }

  // ============================================
  // PORTFOLIO
  // ============================================
  function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!grid || typeof projects === 'undefined') return;

    const safeText = (s) => {
      const str = String(s ?? '');
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const placeholder = 'assets/images/custom_home.jpg';

    function renderProjects(filter = 'all') {
      const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

      grid.innerHTML = filtered.map(project => {
        const typeLabel = project.type === 'custom' ? 'Custom Build' : 'Spec Home';
        const image = project.photo || project.image || placeholder;

        return `
          <article class="project-card fade-in" data-id="${project.id}" tabindex="0" role="button" aria-label="Open project: ${safeText(project.title)}">
            <div class="project-image">
              <img src="${safeText(image)}" alt="${safeText(project.title)}" loading="lazy" decoding="async" onerror="this.src='${placeholder}'" />
              <div class="project-overlay"></div>
            </div>
            <div class="project-info">
              <span class="project-type">${safeText(typeLabel)}</span>
              <h3 class="project-title">${safeText(project.title)}</h3>
              <p class="project-location">${safeText(project.location)}</p>
              <div class="project-specs" aria-hidden="true">
                <span class="project-spec">${safeText(project.sqft)} SF</span>
                <span class="project-spec">${safeText(project.beds)} Bed</span>
                <span class="project-spec">${safeText(project.baths)} Bath</span>
                <span class="project-spec">${safeText(project.year)}</span>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Click + keyboard handlers
      grid.querySelectorAll('.project-card').forEach(card => {
        const open = () => {
          const id = Number.parseInt(card.dataset.id || '0', 10);
          openModal(id, card);
        };

        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
          }
        });
      });

      // Trigger animations
      setTimeout(() => {
        grid.querySelectorAll('.project-card').forEach(card => card.classList.add('visible'));
      }, 50);
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.filter || 'all');
      });
    });

    renderProjects();
  }

  // ============================================
  // TESTIMONIALS
  // ============================================
  function initTestimonials({ prefersReducedMotion } = {}) {
    const quoteEl = document.getElementById('testimonialQuote');
    const authorEl = document.getElementById('testimonialAuthor');
    const locationEl = document.getElementById('testimonialLocation');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!quoteEl || typeof testimonials === 'undefined' || !testimonials.length) return;

    let currentIndex = 0;
    let autoplayInterval;

    testimonials.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer?.appendChild(dot);
    });

    const dots = dotsContainer?.querySelectorAll('.testimonial-dot');

    function goTo(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = testimonials.length - 1;
      if (currentIndex >= testimonials.length) currentIndex = 0;

      const t = testimonials[currentIndex];

      if (!prefersReducedMotion) {
        quoteEl.style.opacity = '0';
        quoteEl.style.transform = 'translateY(10px)';
      }

      setTimeout(() => {
        quoteEl.textContent = t.quote;
        authorEl.textContent = t.author;
        locationEl.textContent = t.project;

        if (!prefersReducedMotion) {
          quoteEl.style.opacity = '1';
          quoteEl.style.transform = 'translateY(0)';
        }
      }, prefersReducedMotion ? 0 : 250);

      dots?.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
      resetAutoplay();
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      if (prefersReducedMotion) return;
      autoplayInterval = setInterval(next, 7000);
    }

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    quoteEl.style.transition = prefersReducedMotion ? 'none' : 'opacity 0.3s ease, transform 0.3s ease';

    resetAutoplay();
  }

  // ============================================
  // MODAL
  // ============================================
  let lastFocusedElement = null;

  function initModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = document.getElementById('modalClose');
    const revealBtn = document.getElementById('modalRevealBtn');
    const imageStack = document.getElementById('modalImageStack');

    const close = () => closeModal();

    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusables = getFocusable(modal);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    revealBtn?.addEventListener('click', () => {
      imageStack?.classList.toggle('revealed');
      const revealed = imageStack?.classList.contains('revealed');
      revealBtn.innerHTML = revealed ? '<span>Show Sketch</span>' : '<span>Reveal the Build</span>';
    });
  }

  function openModal(projectId, triggerEl) {
    const modal = document.getElementById('projectModal');
    if (!modal || typeof projects === 'undefined') return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    lastFocusedElement = triggerEl || document.activeElement;

    const typeEl = document.getElementById('modalType');
    const titleEl = document.getElementById('modalTitle');
    const locationEl = document.getElementById('modalLocation');
    const descEl = document.getElementById('modalDescription');
    const sketchEl = document.getElementById('modalSketch');
    const photoEl = document.getElementById('modalPhoto');
    const sqftEl = document.getElementById('modalSqft');
    const bedsEl = document.getElementById('modalBeds');
    const bathsEl = document.getElementById('modalBaths');
    const yearEl = document.getElementById('modalYear');
    const verseTextEl = document.getElementById('modalVerseText');
    const verseRefEl = document.getElementById('modalVerseRef');
    const imageStack = document.getElementById('modalImageStack');

    if (typeEl) typeEl.textContent = project.type === 'custom' ? 'Custom Build' : 'Spec Home';
    if (titleEl) titleEl.textContent = project.title;
    if (locationEl) locationEl.textContent = project.location;
    if (descEl) descEl.textContent = project.description || '';

    const photoSrc = project.photo || project.image || 'assets/images/custom_home.jpg';
    const sketchSrc = project.sketch || photoSrc;

    if (sketchEl) {
      sketchEl.src = sketchSrc;
      sketchEl.alt = `${project.title} sketch`;
    }
    if (photoEl) {
      photoEl.src = photoSrc;
      photoEl.alt = `${project.title} completed`;
    }

    if (sqftEl) sqftEl.textContent = String(project.sqft ?? '');
    if (bedsEl) bedsEl.textContent = String(project.beds ?? '');
    if (bathsEl) bathsEl.textContent = String(project.baths ?? '');
    if (yearEl) yearEl.textContent = String(project.year ?? '');

    if (verseTextEl) verseTextEl.textContent = project.verseText || '';
    if (verseRefEl) verseRefEl.textContent = project.verseRef || '';

    imageStack?.classList.remove('revealed');
    const revealBtn = document.getElementById('modalRevealBtn');
    if (revealBtn) revealBtn.innerHTML = '<span>Reveal the Build</span>';

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    // Focus close button
    const closeBtn = document.getElementById('modalClose');
    closeBtn?.focus({ preventScroll: true });
  }

  function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');

    // Return focus
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      try { lastFocusedElement.focus({ preventScroll: true }); } catch (_) { lastFocusedElement.focus(); }
    }
    lastFocusedElement = null;
  }

  function getFocusable(root) {
    return Array.from(root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, summary, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-submit');
    const hpField = form.querySelector('#company'); // honeypot

    const setState = (state) => {
      submitBtn?.classList.remove('loading', 'success', 'error');
      if (state) submitBtn?.classList.add(state);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      // Honeypot
      if (hpField && hpField.value && hpField.value.trim().length > 0) {
        // Pretend success.
        form.reset();
        return;
      }

      const payload = {
        name: form.name?.value?.trim() || '',
        email: form.email?.value?.trim() || '',
        phone: form.phone?.value?.trim() || '',
        location: form.location?.value?.trim() || '',
        message: form.message?.value?.trim() || ''
      };

      // Basic validation (native required isn't reliable when novalidate is used)
      if (!payload.name || !payload.email || !payload.message) {
        setState('error');
        submitBtn.disabled = false;
        return;
      }

      setState('loading');
      submitBtn.disabled = true;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Bad response');

        setState('success');
        form.reset();

        setTimeout(() => {
          setState(null);
          submitBtn.disabled = false;
        }, 2200);
      } catch (err) {
        // Fallback to mailto so the form is never a dead end.
        const subject = encodeURIComponent('Stoneside Custom Homes — New Inquiry');
        const body = encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nLocation: ${payload.location}\n\nMessage:\n${payload.message}`
        );

        window.location.href = `mailto:YOUR_EMAIL_HERE?subject=${subject}&body=${body}`;

        setState(null);
        submitBtn.disabled = false;
      }
    });
  }

  // ============================================
  // UTILITY: Throttle
  // ============================================
  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ============================================
  // PARALLAX EFFECTS (Optional Enhancement)
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', throttle(() => {
      const scrollY = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const windowCenterY = window.innerHeight / 2;
        const offset = (centerY - windowCenterY) * speed;

        el.style.transform = `translateY(${offset}px)`;
      });
    }, 16), { passive: true });
  }
})();
