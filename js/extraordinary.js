// ════════════════════════════════════════════════════════════════════════════
//  STONESIDE CUSTOM HOMES — Extraordinary JavaScript
//  Bringing the design to life with cinematic interactions
// ════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Initialize everything
  initPreloader();
  initCursor();
  initHeader();
  initMobileNav();
  initHeroReveal();
  initTimeline();
  initPortfolio();
  initProcessSteps();
  initScrollAnimations();
  initModal();
  initContactForm();
  initSmoothScroll();
});

// ════════════════════════════════════════════════════════════════
// PRELOADER — Cinematic Brand Reveal
// ════════════════════════════════════════════════════════════════
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('locked');

  // Start exit animation after progress completes
  const exitDelay = 3200;

  setTimeout(() => {
    preloader.classList.add('exit');
    
    // Remove preloader and unlock body after wipe animation
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
      
      // Trigger hero animations
      document.querySelector('.hero')?.classList.add('loaded');
      
      // Trigger hero image reveal after a moment
      setTimeout(() => {
        document.querySelector('.hero')?.classList.add('revealed');
      }, 800);
    }, 1000);
  }, exitDelay);

  // Fallback
  setTimeout(() => {
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
    }
  }, 5000);
}

// ════════════════════════════════════════════════════════════════
// CUSTOM CURSOR — Contextual States
// ════════════════════════════════════════════════════════════════
function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorGlow = document.getElementById('cursorGlow');
  
  if (!cursor || window.matchMedia('(max-width: 1024px)').matches) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show glow on hero
    const hero = document.querySelector('.hero');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      if (mouseY < rect.bottom) {
        cursorGlow?.classList.add('active');
      } else {
        cursorGlow?.classList.remove('active');
      }
    }
  });

  // Smooth animation loop
  function animate() {
    // Cursor follows with smooth interpolation
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.transform = `translate(${cursorX - 24}px, ${cursorY - 24}px)`;

    // Glow follows slower
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
      cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    }

    requestAnimationFrame(animate);
  }
  animate();

  // Cursor states
  const setCursorState = (state) => {
    cursor.classList.remove('pointer', 'view');
    if (state) cursor.classList.add(state);
  };

  // Interactive elements
  const addCursorListeners = () => {
    // Pointer state for links and buttons
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('pointer'));
      el.addEventListener('mouseleave', () => setCursorState(null));
    });

    // View state for gallery items
    document.querySelectorAll('.gallery-item, .timeline-item').forEach(el => {
      el.addEventListener('mouseenter', () => setCursorState('view'));
      el.addEventListener('mouseleave', () => setCursorState(null));
    });
  };

  addCursorListeners();

  // Re-attach on DOM changes
  const observer = new MutationObserver(addCursorListeners);
  observer.observe(document.body, { childList: true, subtree: true });
}

// ════════════════════════════════════════════════════════════════
// HEADER — Scroll State
// ════════════════════════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Scrolled state
        if (currentScroll > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ════════════════════════════════════════════════════════════════
// MOBILE NAV
// ════════════════════════════════════════════════════════════════
function initMobileNav() {
  const menuBtn = document.getElementById('headerMenu');
  const nav = document.getElementById('mobileNav');
  const navLinks = nav?.querySelectorAll('a');

  if (!menuBtn || !nav) return;

  const toggleNav = () => {
    const isActive = nav.classList.contains('active');
    
    menuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    nav.setAttribute('aria-hidden', isActive);
    document.body.classList.toggle('locked');
  };

  menuBtn.addEventListener('click', toggleNav);

  // Close on link click
  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleNav();
      }
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggleNav();
    }
  });
}

// ════════════════════════════════════════════════════════════════
// HERO REVEAL — Scroll-based Image Transition
// ════════════════════════════════════════════════════════════════
function initHeroReveal() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const triggerPoint = heroHeight * 0.3;

        if (scrollY > triggerPoint) {
          hero.classList.add('revealed');
        } else {
          // Only remove if we're at the very top
          if (scrollY < 50) {
            hero.classList.remove('revealed');
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ════════════════════════════════════════════════════════════════
// TIMELINE — Horizontal Scroll with Drag
// ════════════════════════════════════════════════════════════════
function initTimeline() {
  const track = document.getElementById('timelineTrack');
  const progressFill = document.getElementById('timelineProgress');
  
  if (!track) return;

  // Drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('active');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Update progress bar
  const updateProgress = () => {
    if (!progressFill) return;
    const scrollWidth = track.scrollWidth - track.clientWidth;
    const progress = (track.scrollLeft / scrollWidth) * 100;
    progressFill.style.width = `${Math.max(20, progress)}%`;
  };

  track.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ════════════════════════════════════════════════════════════════
// PORTFOLIO — Gallery with Drag & Navigation
// ════════════════════════════════════════════════════════════════
function initPortfolio() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const countCurrent = document.getElementById('galleryCount');
  const countTotal = document.getElementById('galleryTotal');

  if (!track || typeof projects === 'undefined') return;

  // Render gallery items
  track.innerHTML = projects.map((project, index) => {
    const image = project.photo || project.image || '';
    const typeLabel = project.type === 'custom' ? 'Custom Build' : 'Spec Home';

    return `
      <article class="gallery-item" data-id="${project.id}" data-index="${index}">
        <img class="gallery-image" src="${image}" alt="${project.title}" loading="lazy" />
        <div class="gallery-overlay"></div>
        <div class="gallery-info">
          <span class="gallery-type">${typeLabel}</span>
          <h3 class="gallery-title">${project.title}</h3>
          <span class="gallery-location">${project.location}</span>
        </div>
      </article>
    `;
  }).join('');

  // Update count
  if (countTotal) countTotal.textContent = String(projects.length).padStart(2, '0');

  // Drag to scroll
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  // Click handler (only if not dragging)
  track.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }

    const item = e.target.closest('.gallery-item');
    if (item) {
      const id = parseInt(item.dataset.id);
      openModal(id);
    }
  });

  // Update current count on scroll
  const updateCount = () => {
    if (!countCurrent) return;
    const items = track.querySelectorAll('.gallery-item');
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      if (Math.abs(scrollCenter - itemCenter) < item.offsetWidth / 2) {
        countCurrent.textContent = String(index + 1).padStart(2, '0');
      }
    });
  };

  track.addEventListener('scroll', updateCount, { passive: true });

  // Navigation buttons
  const scrollToIndex = (index) => {
    const items = track.querySelectorAll('.gallery-item');
    if (items[index]) {
      items[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  };

  let currentIndex = 0;

  prevBtn?.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = Math.min(projects.length - 1, currentIndex + 1);
    scrollToIndex(currentIndex);
  });
}

// ════════════════════════════════════════════════════════════════
// PROCESS STEPS — Scroll Reveal
// ════════════════════════════════════════════════════════════════
function initProcessSteps() {
  const steps = document.querySelectorAll('.step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animations
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  steps.forEach(step => observer.observe(step));
}

// ════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS — General Reveal
// ════════════════════════════════════════════════════════════════
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal, .section-label, .legacy-title, .philosophy-title, .portfolio-title, .process-title, .contact-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    observer.observe(el);
  });

  // Number counting animation
  const countElements = document.querySelectorAll('[data-count]');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCount(el, target);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countElements.forEach(el => countObserver.observe(el));
}

function animateCount(element, target) {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// ════════════════════════════════════════════════════════════════
// MODAL
// ════════════════════════════════════════════════════════════════
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = document.getElementById('modalClose');
  const revealBtn = document.getElementById('modalReveal');
  const images = document.getElementById('modalImages');

  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  revealBtn?.addEventListener('click', () => {
    images?.classList.toggle('revealed');
    const isRevealed = images?.classList.contains('revealed');
    revealBtn.querySelector('.reveal-text').textContent = isRevealed ? 'Show Sketch' : 'Reveal Build';
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal || typeof projects === 'undefined') return;

  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  // Populate modal
  const elements = {
    type: document.getElementById('modalType'),
    title: document.getElementById('modalTitle'),
    location: document.getElementById('modalLocation'),
    description: document.getElementById('modalDescription'),
    sketch: document.getElementById('modalSketch'),
    photo: document.getElementById('modalPhoto'),
    sqft: document.getElementById('modalSqft'),
    beds: document.getElementById('modalBeds'),
    baths: document.getElementById('modalBaths'),
    year: document.getElementById('modalYear'),
    verseText: document.getElementById('modalVerseText'),
    verseRef: document.getElementById('modalVerseRef'),
    images: document.getElementById('modalImages')
  };

  if (elements.type) elements.type.textContent = project.type === 'custom' ? 'Custom Build' : 'Spec Home';
  if (elements.title) elements.title.textContent = project.title;
  if (elements.location) elements.location.textContent = project.location;
  if (elements.description) elements.description.textContent = project.description || '';

  const photoSrc = project.photo || project.image || '';
  const sketchSrc = project.sketch || photoSrc;

  if (elements.sketch) {
    elements.sketch.src = sketchSrc;
    elements.sketch.alt = `${project.title} sketch`;
  }
  if (elements.photo) {
    elements.photo.src = photoSrc;
    elements.photo.alt = `${project.title}`;
  }

  if (elements.sqft) elements.sqft.textContent = project.sqft;
  if (elements.beds) elements.beds.textContent = project.beds;
  if (elements.baths) elements.baths.textContent = project.baths;
  if (elements.year) elements.year.textContent = project.year;

  if (elements.verseText) elements.verseText.textContent = project.verseText || '';
  if (elements.verseRef) elements.verseRef.textContent = project.verseRef || '';

  // Reset reveal state
  elements.images?.classList.remove('revealed');
  const revealBtn = document.getElementById('modalReveal');
  if (revealBtn) {
    revealBtn.querySelector('.reveal-text').textContent = 'Reveal Build';
  }

  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}

// Make available globally
window.openModal = openModal;
window.closeModal = closeModal;

// ════════════════════════════════════════════════════════════════
// CONTACT FORM
// ════════════════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const submitText = submitBtn?.querySelector('.submit-text');
    
    if (!submitBtn || !submitText) return;

    // Disable and show loading
    submitBtn.disabled = true;
    const originalText = submitText.textContent;
    submitText.textContent = 'Sending...';

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success state
    submitText.textContent = 'Sent Successfully';
    submitBtn.style.background = 'var(--bronze)';

    // Reset after delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = originalText;
      submitBtn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ════════════════════════════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header')?.offsetHeight || 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ════════════════════════════════════════════════════════════════
// UTILITY — Throttle
// ════════════════════════════════════════════════════════════════
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
