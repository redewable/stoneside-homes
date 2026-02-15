// ════════════════════════════════════════════════════════════════════════════
//  STONESIDE CUSTOM HOMES — Extraordinary JavaScript v4
//  Modal navigation, keyboard controls, testimonials, mobile fixes
// ════════════════════════════════════════════════════════════════════════════

// Track current modal project index globally
let currentModalIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadAdminContent();
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
  initTestimonials();
  initContactForm();
  initSmoothScroll();
  initCounterAnimation();
  initStickyCta();
});

// ════════════════════════════════════════════════════════════════
// CLOUD DATA LOADER — Reads from Firebase Realtime Database
// ════════════════════════════════════════════════════════════════
function loadAdminContent() {
  const db = firebase.database();

  db.ref('/').on('value', (snapshot) => {
    const DATA = snapshot.val();
    if (!DATA) return;

    // --- 1. HERO ---
    const hero = DATA.hero || {};
    const title1Words = document.querySelectorAll('.title-line-1 .word');
    const title2Words = document.querySelectorAll('.title-line-2 .word');
    
    if (title1Words[0]) title1Words[0].textContent = hero.title1Word1 || 'Where';
    if (title1Words[1]) title1Words[1].textContent = hero.title1Word2 || 'Blueprints';
    if (title2Words[0]) title2Words[0].textContent = hero.title2Word1 || 'Become';
    if (title2Words[1]) title2Words[1].textContent = hero.title2Word2 || 'Legacy';
    if (hero.subtitle) document.querySelector('.hero-subtitle').textContent = hero.subtitle;
    if (hero.location) document.querySelector('.location-text').textContent = hero.location;
    if (hero.years) document.querySelector('.divider-year').textContent = hero.years;
    
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems[0]) {
       statItems[0].querySelector('.stat-value').textContent = hero.stat1Value;
       statItems[0].querySelector('.stat-label').textContent = hero.stat1Label;
    }
    if (statItems[1]) {
       statItems[1].querySelector('.stat-value').textContent = hero.stat2Value;
       statItems[1].querySelector('.stat-label').textContent = hero.stat2Label;
    }
    if (statItems[2]) {
       statItems[2].querySelector('.stat-value').textContent = hero.stat3Value;
       statItems[2].querySelector('.stat-label').textContent = hero.stat3Label;
    }

    // --- 2. CONTENT (Titles/Leads) ---
    const content = DATA.content || {};
    const setHtml = (sel, val) => { const el = document.querySelector(sel); if(el && val) el.innerHTML = val.replace(/\*([^*]+)\*/g, '<em>$1</em>'); };
    const setText = (sel, val) => { const el = document.querySelector(sel); if(el && val) el.textContent = val; };

    setHtml('.legacy-title', content.legacyTitle);
    setText('.legacy-lead', content.legacyLead);
    setHtml('.philosophy-title', content.philosophyTitle);
    setText('.philosophy-lead', content.philosophyLead);
    setHtml('.portfolio-title', content.portfolioTitle);
    setText('.portfolio-lead', content.portfolioLead);
    setHtml('.process-title', content.processTitle);
    setHtml('.contact-title', content.contactTitle);
    setText('.contact-lead', content.contactLead);
    
    // Verse
    if(content.philosophyVerse) document.querySelector('.philosophy-verse blockquote').textContent = `"${content.philosophyVerse}"`;
    if(content.philosophyVerseRef) document.querySelector('.philosophy-verse cite').textContent = content.philosophyVerseRef;

    // --- 3. DYNAMIC LISTS (The Missing Part) ---
    const toArray = (obj) => obj ? (Array.isArray(obj) ? obj : Object.values(obj)) : [];

    // Timeline
    if (DATA.timeline) {
        const track = document.getElementById('timelineTrack');
        if(track) {
            track.innerHTML = toArray(DATA.timeline).map(item => `
                <div class="timeline-item">
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-content"><h3>${item.title}</h3><p>${item.text}</p></div>
                </div>`).join('');
        }
    }

    // Pillars
    if (DATA.pillars) {
        const list = document.querySelector('.philosophy-pillars');
        if(list) {
            list.innerHTML = toArray(DATA.pillars).map(item => `
              <div class="pillar">
                <span class="pillar-num">${item.num}</span>
                <div class="pillar-content">
                  <h3 class="pillar-title">${item.title}</h3>
                  <p class="pillar-text">${item.text}</p>
                </div>
              </div>`).join('');
        }
    }

    // Process Steps - prefer STONESIDE_DATA over Firebase
    const processData = (window.STONESIDE_DATA && window.STONESIDE_DATA.process) || DATA.process;
    if (processData) {
        const list = document.querySelector('.process-steps');
        if(list) {
            // Helper for icons
            const getIcon = (name) => {
                const icons = {
                    plus: '<circle cx="24" cy="24" r="20"/><path d="M24 16v16M16 24h16"/>',
                    grid: '<rect x="8" y="8" width="32" height="32" rx="2"/><path d="M8 20h32M20 8v32"/>',
                    arrow: '<path d="M12 36l24-24M12 12h24v24"/>',
                    home: '<path d="M24 8L8 20v20h32V20L24 8z"/><path d="M18 40V28h12v12"/>',
                    check: '<circle cx="24" cy="24" r="20"/><path d="M16 24l6 6 10-12"/>'
                };
                return icons[name] || icons.plus;
            };

            list.innerHTML = toArray(processData).map(item => `
              <div class="step">
                <div class="step-number">${item.num}</div>
                <div class="step-content">
                  <h3 class="step-title">${item.title}</h3>
                  <p class="step-text">${item.text}</p>
                </div>
                <div class="step-visual">
                  <div class="visual-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
                        ${getIcon(item.icon)}
                    </svg>
                  </div>
                </div>
              </div>`).join('');
            // ★ CRITICAL FIX: Restart the animation observer now that content exists
            setTimeout(() => {
                initProcessSteps();
            }, 100);  
        }
    }

    // --- 4. PROJECTS ---
    // Prefer STONESIDE_DATA (from data.js) over Firebase for projects
    if (window.STONESIDE_DATA && window.STONESIDE_DATA.projects) {
        window.projects = window.STONESIDE_DATA.projects;
    } else if (DATA.projects) {
        window.projects = toArray(DATA.projects);
    }
    initPortfolio();

    // --- 5. TESTIMONIALS --- prefer STONESIDE_DATA
    const testimonialsData = (window.STONESIDE_DATA && window.STONESIDE_DATA.testimonials) || DATA.testimonials;
    if (testimonialsData) {
      const grid = document.getElementById('testimonialsGrid');
      if(grid) {
        grid.innerHTML = toArray(testimonialsData).map(t => `
          <div class="testimonial-card">
            <div class="testimonial-mark">"</div>
            <blockquote class="testimonial-quote">${t.quote}</blockquote>
            <div class="testimonial-author">
              <span class="author-name">${t.name}</span>
              <span class="author-detail">${t.detail}</span>
            </div>
          </div>
        `).join('');
      }
    }
  });
}

// ════════════════════════════════════════════════════════════════
// PRELOADER
// ════════════════════════════════════════════════════════════════
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // SESSION MEMORY: Skip animation if already seen this session
  if (sessionStorage.getItem('stoneside_visited')) {
    preloader.classList.add('done');
    document.querySelector('.hero')?.classList.add('loaded');
    return;
  }

  document.body.classList.add('locked');

  setTimeout(() => {
    preloader.classList.add('exit');
    
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
      document.querySelector('.hero')?.classList.add('loaded');
      sessionStorage.setItem('stoneside_visited', 'true');
    }, 1000);
  }, 3200);

  setTimeout(() => {
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
      sessionStorage.setItem('stoneside_visited', 'true');
    }
  }, 5000);
}

// ════════════════════════════════════════════════════════════════
// CURSOR — Only on desktop with mouse
// ════════════════════════════════════════════════════════════════
function initCursor() {
  // Check for touch device or mobile
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  
  // Hide old cursor elements completely on touch/mobile
  const oldCursor = document.getElementById('cursor');
  const oldGlow = document.getElementById('cursorGlow');
  
  if (isTouchDevice || isSmallScreen || hasCoarsePointer) {
    if (oldCursor) {
      oldCursor.style.display = 'none';
      oldCursor.remove();
    }
    if (oldGlow) {
      oldGlow.style.display = 'none';
      oldGlow.remove();
    }
    return;
  }
  
  // Desktop with mouse - create pencil cursor
  if (oldCursor) oldCursor.style.display = 'none';
  if (oldGlow) oldGlow.style.display = 'none';
  
  const pencil = document.createElement('div');
  pencil.className = 'pencil-cursor';
  pencil.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-45 16 16)">
        <rect x="13" y="4" width="6" height="18" fill="#d4b896"/>
        <rect x="13" y="4" width="6" height="14" fill="#8b7355"/>
        <line x1="14" y1="18" x2="14" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <line x1="16" y1="18" x2="16" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <line x1="18" y1="18" x2="18" y2="22" stroke="#c4a876" stroke-width="0.5"/>
        <rect x="12.5" y="22" width="7" height="3" fill="#a8a8a8"/>
        <rect x="12.5" y="22.5" width="7" height="0.5" fill="#888"/>
        <rect x="12.5" y="24" width="7" height="0.5" fill="#888"/>
        <rect x="13" y="25" width="6" height="3" fill="#d4a5a5" rx="1"/>
        <polygon points="13,4 19,4 16,0" fill="#e8d4b8"/>
        <polygon points="15,2 17,2 16,0" fill="#2d2d2d"/>
        <rect x="14" y="5" width="1" height="12" fill="rgba(255,255,255,0.15)"/>
      </g>
    </svg>
  `;
  document.body.appendChild(pencil);
  
  const glow = document.createElement('div');
  glow.className = 'pencil-glow';
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let pencilX = 0, pencilY = 0;
  let glowX = 0, glowY = 0;
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const pencilSpeed = isHovering ? 0.2 : 0.15;
    pencilX += (mouseX - pencilX) * pencilSpeed;
    pencilY += (mouseY - pencilY) * pencilSpeed;
    pencil.style.transform = `translate(${pencilX - 2}px, ${pencilY - 2}px)`;

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;

    requestAnimationFrame(animate);
  }
  animate();

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

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => glow.classList.add('active'));
    hero.addEventListener('mouseleave', () => {
      if (!isHovering) glow.classList.remove('active');
    });
  }

  const style = document.createElement('style');
  style.textContent = `
    @media (hover: hover) and (pointer: fine) {
      * { cursor: none !important; }
      .pencil-cursor {
        position: fixed;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        pointer-events: none;
        z-index: 10001;
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
      .pencil-glow.active { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ════════════════════════════════════════════════════════════════
// HEADER
// ════════════════════════════════════════════════════════════════
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.pageYOffset > 100) {
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
  const menu = document.getElementById('headerMenu');
  const nav = document.getElementById('mobileNav');
  if (!menu || !nav) return;

  menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    nav.classList.toggle('active');
    nav.setAttribute('aria-hidden', !nav.classList.contains('active'));
    document.body.classList.toggle('locked', nav.classList.contains('active'));
  });

  nav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      nav.classList.remove('active');
      nav.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('locked');
    });
  });
}

// ════════════════════════════════════════════════════════════════
// HERO REVEAL
// ════════════════════════════════════════════════════════════════
function initHeroReveal() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // If preloader was skipped (repeat visit), reveal hero photo sooner
  const visited = sessionStorage.getItem('stoneside_visited');
  const delay = visited ? 800 : 4500;
  setTimeout(() => hero.classList.add('revealed'), delay);

  hero.addEventListener('click', (e) => {
    if (!e.target.closest('a, button')) {
      hero.classList.toggle('revealed');
    }
  });
}

// ════════════════════════════════════════════════════════════════
// TIMELINE
// ════════════════════════════════════════════════════════════════
function initTimeline() {
  const track = document.getElementById('timelineTrack');
  const progressFill = document.getElementById('timelineProgress');
  if (!track) return;

  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - track.offsetLeft - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
  });

  let touchStartX, touchScrollLeft;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchScrollLeft = track.scrollLeft;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    track.scrollLeft = touchScrollLeft + (touchStartX - e.touches[0].pageX);
  }, { passive: true });

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
// PORTFOLIO
// ════════════════════════════════════════════════════════════════
let portfolioListenersBound = false;
let galleryCurrentIndex = 0;

function initPortfolio() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const countCurrent = document.getElementById('galleryCount');
  const countTotal = document.getElementById('galleryTotal');

  // Initialize projects from STONESIDE_DATA if not yet set by Firebase
  if (typeof projects === 'undefined' || !window.projects) {
    if (window.STONESIDE_DATA && window.STONESIDE_DATA.projects) {
      window.projects = window.STONESIDE_DATA.projects;
    }
  }
  if (!track || typeof projects === 'undefined') return;

  // Render gallery items with updated structure
  track.innerHTML = projects.map((project, index) => `
    <article class="gallery-item" data-id="${project.id}" data-index="${index}">
      <div class="gallery-media">
        <img class="gallery-sketch" src="${project.sketch || project.photo || project.image}" alt="${project.title}" loading="lazy" />
        <img class="gallery-photo" src="${project.photo || project.image}" alt="${project.title}" loading="lazy" />
        <span class="gallery-tag">${project.type === 'custom' ? 'Custom Build' : 'Spec Home'}</span>
      </div>
      <div class="gallery-info">
        <h3 class="gallery-title">${project.title}</h3>
        <span class="gallery-location">${project.location}</span>
      </div>
    </article>
  `).join('');

  if (countTotal) countTotal.textContent = String(projects.length).padStart(2, '0');

  // Only bind event listeners once to prevent double-firing
  if (portfolioListenersBound) return;
  portfolioListenersBound = true;

  let isDown = false, startX, scrollLeft, isDragging = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.pageX - track.offsetLeft - startX) * 2;
    if (Math.abs(walk) > 10) isDragging = true;
    track.scrollLeft = scrollLeft - walk;
  });

  track.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      isDragging = false;
      return;
    }
    const item = e.target.closest('.gallery-item');
    if (item) {
      const index = parseInt(item.dataset.index);
      openModal(index);
    }
  });

  const updateCount = () => {
    if (!countCurrent) return;
    const items = track.querySelectorAll('.gallery-item');
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    items.forEach((item, index) => {
      if (Math.abs(scrollCenter - (item.offsetLeft + item.offsetWidth / 2)) < item.offsetWidth / 2) {
        galleryCurrentIndex = index;
        countCurrent.textContent = String(index + 1).padStart(2, '0');
      }
    });
  };

  track.addEventListener('scroll', updateCount, { passive: true });

  const scrollToIndex = (index) => {
    const items = track.querySelectorAll('.gallery-item');
    if (items[index]) {
      track.scrollTo({ left: items[index].offsetLeft - track.clientWidth * 0.05, behavior: 'smooth' });
    }
  };

  prevBtn?.addEventListener('click', () => {
    galleryCurrentIndex = Math.max(0, galleryCurrentIndex - 1);
    scrollToIndex(galleryCurrentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    galleryCurrentIndex = Math.min(projects.length - 1, galleryCurrentIndex + 1);
    scrollToIndex(galleryCurrentIndex);
  });
}

// ════════════════════════════════════════════════════════════════
// PROCESS STEPS — Animated on scroll
// ════════════════════════════════════════════════════════════════
function initProcessSteps() {
  const steps = document.querySelectorAll('.step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(steps).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  steps.forEach(step => observer.observe(step));
}

// ════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ════════════════════════════════════════════════════════════════
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal, .section-tag, .legacy-title, .philosophy-title, .portfolio-title, .process-title, .contact-title, .legacy-lead, .philosophy-lead, .portfolio-lead, .contact-lead');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  elements.forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  });
}

// ════════════════════════════════════════════════════════════════
// TESTIMONIALS — Logic moved to loadAdminContent()
// ════════════════════════════════════════════════════════════════
function initTestimonials() {
  // This function is intentionally empty.
  // Testimonials are now loaded by loadAdminContent() via data.js
}

// ════════════════════════════════════════════════════════════════
// MODAL — With navigation
// ════════════════════════════════════════════════════════════════
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  // Close handlers
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') navigateModal(-1);
    if (e.key === 'ArrowRight') navigateModal(1);
  });

  // Navigation buttons
  document.getElementById('modalPrev')?.addEventListener('click', () => navigateModal(-1));
  document.getElementById('modalNext')?.addEventListener('click', () => navigateModal(1));

  // Reveal button
  document.getElementById('modalReveal')?.addEventListener('click', () => {
    const images = document.getElementById('modalImages');
    images?.classList.toggle('revealed');
    const btn = document.getElementById('modalReveal');
    const text = btn?.querySelector('.reveal-text');
    if (text) text.textContent = images?.classList.contains('revealed') ? 'Show Sketch' : 'Reveal Build';
  });
  
  // View details button
  document.getElementById('modalViewDetails')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof projects !== 'undefined' && projects[currentModalIndex]) {
      const project = projects[currentModalIndex];
      // Navigate to project page (will be created)
      window.location.href = `project.html?id=${project.id}`;
    }
  });
}

function navigateModal(direction) {
  if (typeof projects === 'undefined') return;
  
  const newIndex = currentModalIndex + direction;
  if (newIndex >= 0 && newIndex < projects.length) {
    openModal(newIndex);
  }
}

function updateModalNavigation() {
  if (typeof projects === 'undefined') return;
  
  const prevBtn = document.getElementById('modalPrev');
  const nextBtn = document.getElementById('modalNext');
  
  if (prevBtn) {
    prevBtn.classList.toggle('disabled', currentModalIndex === 0);
  }
  if (nextBtn) {
    nextBtn.classList.toggle('disabled', currentModalIndex === projects.length - 1);
  }
}

function openModal(projectIndex) {
  const modal = document.getElementById('projectModal');
  if (!modal || typeof projects === 'undefined') return;

  const project = projects[projectIndex];
  if (!project) return;
  
  currentModalIndex = projectIndex;

  const setContent = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || '';
  };

  const setAttr = (id, attr, value) => {
    const el = document.getElementById(id);
    if (el) el[attr] = value;
  };

  setContent('modalType', project.type === 'custom' ? 'Custom Build' : 'Spec Home');
  setContent('modalTitle', project.title);
  setContent('modalLocation', project.location);
  setContent('modalDescription', project.description || 'A beautiful custom home built with care and attention to detail.');
  setContent('modalSqft', project.sqft);
  setContent('modalBeds', project.beds);
  setContent('modalBaths', project.baths);
  setContent('modalYear', project.year);
  setContent('modalVerseText', project.verseText ? `"${project.verseText}"` : '');
  setContent('modalVerseRef', project.verseRef || '');

  setAttr('modalSketch', 'src', project.sketch || project.photo || project.image);
  setAttr('modalPhoto', 'src', project.photo || project.image);

  // Reset reveal state
  document.getElementById('modalImages')?.classList.remove('revealed');
  const revealText = document.querySelector('#modalReveal .reveal-text');
  if (revealText) revealText.textContent = 'Reveal Build';

  // Update navigation buttons
  updateModalNavigation();
  
  // Update view details link
  const viewDetailsBtn = document.getElementById('modalViewDetails');
  if (viewDetailsBtn) {
    viewDetailsBtn.href = `project.html?id=${project.id}`;
  }

  modal.classList.add('active');
  document.body.classList.add('locked');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal?.classList.remove('active');
  document.body.classList.remove('locked');
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;

// ════════════════════════════════════════════════════════════════
// CONTACT FORM
// ════════════════════════════════════════════════════════════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.querySelectorAll('input, textarea').forEach(field => {
    if (!field.hasAttribute('placeholder')) field.setAttribute('placeholder', ' ');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.form-submit');
    if (!submitBtn) return;

    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    // Validate
    let isValid = true;
    [firstName, lastName, email, message].forEach(field => {
      if (field && !field.value.trim()) {
        field.parentElement.classList.add('error');
        setTimeout(() => field.parentElement.classList.remove('error'), 500);
        isValid = false;
      }
    });
    
    if (!isValid) return;

    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';

    try {
      // Save to Firebase first
      const formData = Object.fromEntries(new FormData(form));
      const submission = {
        name: (formData.firstName || '') + ' ' + (formData.lastName || ''),
        email: formData.email || '',
        phone: formData.phone || null,
        message: formData.message || null,
        source: 'main-site',
        timestamp: Date.now(),
        submitted_at: new Date().toISOString()
      };
      await db.ref('inquiries').push(submission);

      // Also try email API (non-blocking)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          phone: submission.phone,
          message: submission.message
        })
      });
      if (!response.ok) throw new Error();
    } catch {}

    submitBtn.innerHTML = '<span>Sent Successfully ✓</span>';
    submitBtn.style.background = 'var(--bronze)';
    form.reset();
    
    // Show success message
    const success = document.getElementById('formSuccess');
    if (success) success.classList.add('visible');

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      if (success) success.classList.remove('visible');
    }, 4000);
  });
}

// ════════════════════════════════════════════════════════════════
// ANIMATED COUNTERS — Numbers count up when scrolled into view
// ════════════════════════════════════════════════════════════════
function initCounterAnimation() {
  const counters = document.querySelectorAll('.number-value');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const text = el.textContent.trim();
    const suffix = el.querySelector('.number-suffix');
    const suffixText = suffix ? suffix.textContent : '';
    const numText = text.replace(suffixText, '').trim();
    const target = parseInt(numText);

    if (isNaN(target) || target === 0) return;

    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (suffix) {
        el.innerHTML = `${current}<span class="number-suffix">${suffixText}</span>`;
      } else {
        el.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ════════════════════════════════════════════════════════════════
// STICKY MOBILE CTA — Shows after scrolling past hero
// ════════════════════════════════════════════════════════════════
function initStickyCta() {
  const stickyCta = document.getElementById('stickyCta');
  const contact = document.getElementById('contact');
  if (!stickyCta) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight;
        const contactTop = contact ? contact.getBoundingClientRect().top + scrolled : Infinity;
        const nearContact = scrolled > contactTop - window.innerHeight;

        if (scrolled > heroHeight * 0.8 && !nearContact) {
          stickyCta.classList.add('visible');
        } else {
          stickyCta.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
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
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20,
          behavior: 'smooth'
        });

        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav?.classList.contains('active')) {
          document.getElementById('headerMenu')?.click();
        }
      }
    });
  });
}