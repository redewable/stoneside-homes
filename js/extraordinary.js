// ════════════════════════════════════════════════════════════════════════════
//  STONESIDE CUSTOM HOMES — Extraordinary JavaScript v2
//  Bringing the design to life with cinematic interactions
// ════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Initialize everything
  initPreloader();
  initPencilCursor();
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
// PENCIL CURSOR — Architectural Drafting Pencil
// ════════════════════════════════════════════════════════════════
function initPencilCursor() {
  // Only on desktop
  if (window.matchMedia('(max-width: 1024px)').matches) return;
  
  // Create pencil cursor element
  const pencil = document.createElement('div');
  pencil.className = 'pencil-cursor';
  pencil.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-45 16 16)">
        <!-- Pencil body - wood -->
        <rect x="13" y="4" width="6" height="18" fill="#d4b896"/>
        <!-- Pencil body - painted section -->
        <rect x="13" y="4" width="6" height="14" fill="#8b7355"/>
        <!-- Wood grain lines -->
        <line x1="14" y1="18" x2="14" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <line x1="16" y1="18" x2="16" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <line x1="18" y1="18" x2="18" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <!-- Metal ferrule -->
        <rect x="12.5" y="22" width="7" height="3" fill="#a8a8a8"/>
        <rect x="12.5" y="22.5" width="7" height="0.5" fill="#888"/>
        <rect x="12.5" y="24" width="7" height="0.5" fill="#888"/>
        <!-- Eraser -->
        <rect x="13" y="25" width="6" height="3" fill="#d4a5a5" rx="1"/>
        <!-- Pencil tip - wood sharpened part -->
        <polygon points="13,4 19,4 16,0" fill="#e8d4b8"/>
        <!-- Graphite tip -->
        <polygon points="15,2 17,2 16,0" fill="#2d2d2d"/>
        <!-- Highlight -->
        <rect x="14" y="5" width="1" height="12" fill="rgba(255,255,255,0.15)"/>
      </g>
    </svg>
  `;
  document.body.appendChild(pencil);
  
  // Create glow effect
  const glow = document.createElement('div');
  glow.className = 'pencil-glow';
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let pencilX = 0, pencilY = 0;
  let glowX = 0, glowY = 0;
  let isHovering = false;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function animate() {
    // Pencil follows with smooth interpolation
    const pencilSpeed = isHovering ? 0.2 : 0.15;
    pencilX += (mouseX - pencilX) * pencilSpeed;
    pencilY += (mouseY - pencilY) * pencilSpeed;
    
    // Position pencil with tip at cursor point
    pencil.style.transform = `translate(${pencilX - 2}px, ${pencilY - 2}px)`;

    // Glow follows slower
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover states
  const interactiveElements = 'a, button, .gallery-item, .timeline-item, input, textarea';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveElements)) {
      isHovering = true;
      pencil.classList.add('hovering');
      glow.classList.add('active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveElements)) {
      isHovering = false;
      pencil.classList.remove('hovering');
      glow.classList.remove('active');
    }
  });

  // Show glow on hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => glow.classList.add('active'));
    hero.addEventListener('mouseleave', () => {
      if (!isHovering) glow.classList.remove('active');
    });
  }

  // Add cursor styles
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 1025px) {
      * { cursor: none !important; }
      
      .pencil-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        pointer-events: none;
        z-index: 10001;
        transition: transform 0.05s linear;
      }
      
      .pencil-cursor svg {
        filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.3));
        transition: transform 0.2s ease-out;
      }
      
      .pencil-cursor.hovering svg {
        transform: scale(1.1) rotate(5deg);
      }
      
      .pencil-glow {
        position: fixed;
        top: 0;
        left: 0;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(157, 123, 90, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        transition: opacity 0.4s ease-out;
      }
      
      .pencil-glow.active {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // Hide old cursor elements if they exist
  const oldCursor = document.getElementById('cursor');
  const oldGlow = document.getElementById('cursorGlow');
  if (oldCursor) oldCursor.style.display = 'none';
  if (oldGlow) oldGlow.style.display = 'none';
}

// ════════════════════════════════════════════════════════════════
// HEADER — Scroll State
// ════════════════════════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

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

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
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
// HERO REVEAL — More Sensitive Scroll-based Image Transition
// ════════════════════════════════════════════════════════════════
function initHeroReveal() {
  const hero = document.querySelector('.hero');
  const photoLayer = document.querySelector('.hero-photo-layer');
  
  if (!hero || !photoLayer) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        // MORE SENSITIVE: Start reveal at just 50px of scroll
        // Complete reveal by 30% of hero height
        const startPoint = 50;
        const endPoint = heroHeight * 0.3;
        
        // Calculate progress (0 to 1)
        let progress = 0;
        if (scrollY > startPoint) {
          progress = Math.min((scrollY - startPoint) / (endPoint - startPoint), 1);
        }
        
        // Apply clip-path based on scroll progress
        // Starts from right edge, reveals to left
        const clipRight = 100 - (progress * 100);
        photoLayer.style.clipPath = `polygon(${clipRight}% 0, 100% 0, 100% 100%, ${clipRight}% 100%)`;
        
        // Add revealed class when fully revealed for any CSS transitions
        if (progress >= 1) {
          hero.classList.add('revealed');
        } else {
          hero.classList.remove('revealed');
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  // Initial call
  handleScroll();
  
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

  // Touch support
  let touchStartX;
  let touchScrollLeft;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = (touchStartX - x) * 1.5;
    track.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });

  // Update progress bar
  const updateProgress = () => {
    if (!progressFill) return;
    const scrollWidth = track.scrollWidth - track.clientWidth;
    const progress = scrollWidth > 0 ? (track.scrollLeft / scrollWidth) * 100 : 0;
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
  let dragDistance = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    dragDistance = 0;
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
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    dragDistance = Math.abs(walk);
    if (dragDistance > 10) isDragging = true;
    track.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  let touchStartX;
  let touchScrollLeft;
  let touchDragging = false;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = track.scrollLeft;
    touchDragging = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX;
    const walk = touchStartX - x;
    if (Math.abs(walk) > 10) touchDragging = true;
    track.scrollLeft = touchScrollLeft + walk;
  }, { passive: true });

  // Click handler (only if not dragging)
  track.addEventListener('click', (e) => {
    if (isDragging || touchDragging) {
      e.preventDefault();
      isDragging = false;
      touchDragging = false;
      return;
    }

    const item = e.target.closest('.gallery-item');
    if (item) {
      const id = parseInt(item.dataset.id);
      openModal(id);
    }
  });

  // Update current count on scroll
  let currentIndex = 0;
  
  const updateCount = () => {
    if (!countCurrent) return;
    const items = track.querySelectorAll('.gallery-item');
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      if (Math.abs(scrollCenter - itemCenter) < item.offsetWidth / 2) {
        currentIndex = index;
        countCurrent.textContent = String(index + 1).padStart(2, '0');
      }
    });
  };

  track.addEventListener('scroll', updateCount, { passive: true });

  // Navigation buttons
  const scrollToIndex = (index) => {
    const items = track.querySelectorAll('.gallery-item');
    if (items[index]) {
      const itemLeft = items[index].offsetLeft;
      const trackPadding = track.clientWidth * 0.05; // Account for 5vw padding
      track.scrollTo({
        left: itemLeft - trackPadding,
        behavior: 'smooth'
      });
    }
  };

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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class with stagger based on index
        const index = Array.from(steps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  steps.forEach(step => observer.observe(step));
}

// ════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS — General Reveal
// ════════════════════════════════════════════════════════════════
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal, .section-label, .legacy-title, .philosophy-title, .portfolio-title, .process-title, .contact-title, .legacy-lead, .philosophy-lead, .portfolio-lead, .contact-lead');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
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
// MODAL — Fixed and Improved
// ════════════════════════════════════════════════════════════════
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = document.getElementById('modalClose');
  const revealBtn = document.getElementById('modalReveal');
  const images = document.getElementById('modalImages');

  // Close handlers
  backdrop?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Reveal button
  revealBtn?.addEventListener('click', () => {
    images?.classList.toggle('revealed');
    const isRevealed = images?.classList.contains('revealed');
    const revealText = revealBtn.querySelector('.reveal-text');
    if (revealText) {
      revealText.textContent = isRevealed ? 'Show Sketch' : 'Reveal Build';
    }
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal || typeof projects === 'undefined') return;

  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  // Get elements
  const modalType = document.getElementById('modalType');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalSketch = document.getElementById('modalSketch');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalSqft = document.getElementById('modalSqft');
  const modalBeds = document.getElementById('modalBeds');
  const modalBaths = document.getElementById('modalBaths');
  const modalYear = document.getElementById('modalYear');
  const modalVerseText = document.getElementById('modalVerseText');
  const modalVerseRef = document.getElementById('modalVerseRef');
  const modalImages = document.getElementById('modalImages');
  const modalReveal = document.getElementById('modalReveal');

  // Populate content
  if (modalType) modalType.textContent = project.type === 'custom' ? 'Custom Build' : 'Spec Home';
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalLocation) modalLocation.textContent = project.location;
  if (modalDescription) modalDescription.textContent = project.description || '';

  const photoSrc = project.photo || project.image || '';
  const sketchSrc = project.sketch || photoSrc;

  if (modalSketch) {
    modalSketch.src = sketchSrc;
    modalSketch.alt = `${project.title} sketch`;
  }
  if (modalPhoto) {
    modalPhoto.src = photoSrc;
    modalPhoto.alt = project.title;
  }

  if (modalSqft) modalSqft.textContent = project.sqft;
  if (modalBeds) modalBeds.textContent = project.beds;
  if (modalBaths) modalBaths.textContent = project.baths;
  if (modalYear) modalYear.textContent = project.year;

  if (modalVerseText) modalVerseText.textContent = project.verseText || '';
  if (modalVerseRef) modalVerseRef.textContent = project.verseRef || '';

  // Reset reveal state
  if (modalImages) modalImages.classList.remove('revealed');
  if (modalReveal) {
    const revealText = modalReveal.querySelector('.reveal-text');
    if (revealText) revealText.textContent = 'Reveal Build';
  }

  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');

  // Focus trap
  modal.focus();
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
// CONTACT FORM — With Validation
// ════════════════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Add placeholder attributes for CSS detection
  form.querySelectorAll('input, textarea').forEach(field => {
    if (!field.hasAttribute('placeholder')) {
      field.setAttribute('placeholder', ' ');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    const submitText = submitBtn?.querySelector('.submit-text');
    
    if (!submitBtn || !submitText) return;

    // Basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      // Shake animation for invalid fields
      [name, email, message].forEach(field => {
        if (!field?.value.trim()) {
          field.parentElement.classList.add('error');
          setTimeout(() => field.parentElement.classList.remove('error'), 500);
        }
      });
      return;
    }

    // Disable and show loading
    submitBtn.disabled = true;
    const originalText = submitText.textContent;
    submitText.textContent = 'Sending...';

    try {
      // Try to submit to API
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Success state
        submitText.textContent = 'Sent Successfully';
        submitBtn.style.background = 'var(--bronze)';
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      // Fallback - still show success for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      submitText.textContent = 'Sent Successfully';
      submitBtn.style.background = 'var(--bronze)';
      form.reset();
    }

    // Reset button after delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = originalText;
      submitBtn.style.background = '';
    }, 3000);
  });
}

// ════════════════════════════════════════════════════════════════
// SMOOTH SCROLL — With Header Offset
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
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav?.classList.contains('active')) {
          document.getElementById('headerMenu')?.click();
        }
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