// ════════════════════════════════════════════════════════════════════════════
//  STONESIDE CUSTOM HOMES — Extraordinary JavaScript v3
//  Now with admin dashboard integration
// ════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  loadAdminContent(); // Load content from admin dashboard
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
// ADMIN CONTENT LOADER — Reads from localStorage
// ════════════════════════════════════════════════════════════════
function loadAdminContent() {
  // Load Hero Content
  const heroContent = JSON.parse(localStorage.getItem('stoneside_hero') || 'null');
  if (heroContent) {
    // Title words
    const title1Words = document.querySelectorAll('.title-line-1 .word');
    const title2Words = document.querySelectorAll('.title-line-2 .word');
    
    if (title1Words[0]) title1Words[0].textContent = heroContent.title1Word1 || 'Where';
    if (title1Words[1]) title1Words[1].textContent = heroContent.title1Word2 || 'Blueprints';
    if (title2Words[0]) title2Words[0].textContent = heroContent.title2Word1 || 'Become';
    if (title2Words[1]) title2Words[1].textContent = heroContent.title2Word2 || 'Legacy';
    
    // Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle && heroContent.subtitle) {
      subtitle.innerHTML = heroContent.subtitle.replace(/\n/g, '<br/>');
    }
    
    // Location
    const location = document.querySelector('.location-text');
    if (location && heroContent.location) {
      location.textContent = heroContent.location;
    }
    
    // Years divider
    const years = document.querySelector('.divider-year');
    if (years && heroContent.years) {
      years.textContent = heroContent.years;
    }
    
    // Stats
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems[0]) {
      const value = statItems[0].querySelector('.stat-value');
      const label = statItems[0].querySelector('.stat-label');
      if (value && heroContent.stat1Value) value.innerHTML = heroContent.stat1Value;
      if (label && heroContent.stat1Label) label.textContent = heroContent.stat1Label;
    }
    if (statItems[1]) {
      const value = statItems[1].querySelector('.stat-value');
      const label = statItems[1].querySelector('.stat-label');
      if (value && heroContent.stat2Value) value.textContent = heroContent.stat2Value;
      if (label && heroContent.stat2Label) label.textContent = heroContent.stat2Label;
    }
    if (statItems[2]) {
      const value = statItems[2].querySelector('.stat-value');
      const label = statItems[2].querySelector('.stat-label');
      if (value && heroContent.stat3Value) value.textContent = heroContent.stat3Value;
      if (label && heroContent.stat3Label) label.textContent = heroContent.stat3Label;
    }
  }

  // Load Page Content
  const pageContent = JSON.parse(localStorage.getItem('stoneside_content') || 'null');
  if (pageContent) {
    // Legacy
    const legacyTitle = document.querySelector('.legacy .title-large');
    const legacyLead = document.querySelector('.legacy-lead');
    if (legacyTitle && pageContent.legacyTitle) legacyTitle.textContent = pageContent.legacyTitle;
    if (legacyLead && pageContent.legacyLead) legacyLead.textContent = pageContent.legacyLead;
    
    // Philosophy
    const philosophyTitle = document.querySelector('.philosophy-title');
    const philosophyLead = document.querySelector('.philosophy-lead');
    if (philosophyTitle && pageContent.philosophyTitle) {
      const parts = pageContent.philosophyTitle.split(' ');
      if (parts.length >= 2) {
        philosophyTitle.innerHTML = `${parts[0]} ${parts[1]}<br/><em>${parts.slice(2).join(' ')}</em>`;
      }
    }
    if (philosophyLead && pageContent.philosophyLead) philosophyLead.textContent = pageContent.philosophyLead;
    
    // Pillars
    const pillars = document.querySelectorAll('.pillar');
    if (pillars[0]) {
      const title = pillars[0].querySelector('.pillar-title');
      const text = pillars[0].querySelector('.pillar-text');
      if (title && pageContent.pillar1Title) title.textContent = pageContent.pillar1Title;
      if (text && pageContent.pillar1Text) text.textContent = pageContent.pillar1Text;
    }
    if (pillars[1]) {
      const title = pillars[1].querySelector('.pillar-title');
      const text = pillars[1].querySelector('.pillar-text');
      if (title && pageContent.pillar2Title) title.textContent = pageContent.pillar2Title;
      if (text && pageContent.pillar2Text) text.textContent = pageContent.pillar2Text;
    }
    if (pillars[2]) {
      const title = pillars[2].querySelector('.pillar-title');
      const text = pillars[2].querySelector('.pillar-text');
      if (title && pageContent.pillar3Title) title.textContent = pageContent.pillar3Title;
      if (text && pageContent.pillar3Text) text.textContent = pageContent.pillar3Text;
    }
    
    // Portfolio
    const portfolioTitle = document.querySelector('.portfolio-title');
    const portfolioLead = document.querySelector('.portfolio-lead');
    if (portfolioTitle && pageContent.portfolioTitle) {
      const parts = pageContent.portfolioTitle.split(' ');
      portfolioTitle.innerHTML = `${parts.slice(0, 2).join(' ')}<br/><em>${parts.slice(2).join(' ')}</em>`;
    }
    if (portfolioLead && pageContent.portfolioLead) portfolioLead.textContent = pageContent.portfolioLead;
    
    // Process
    const processTitle = document.querySelector('.process-title');
    if (processTitle && pageContent.processTitle) {
      const parts = pageContent.processTitle.split(' ');
      processTitle.innerHTML = `${parts[0]} ${parts[1]}<br/><em>${parts[2]}</em><br/>${parts.slice(3).join(' ')}`;
    }
    
    // Contact
    const contactTitle = document.querySelector('.contact-title');
    const contactLead = document.querySelector('.contact-lead');
    if (contactTitle && pageContent.contactTitle) {
      const parts = pageContent.contactTitle.split(' ');
      contactTitle.innerHTML = `${parts.slice(0, 2).join(' ')}<br/><em>${parts[2]}</em><br/>${parts.slice(3).join(' ')}`;
    }
    if (contactLead && pageContent.contactLead) contactLead.textContent = pageContent.contactLead;
  }

  // Load Settings
  const settings = JSON.parse(localStorage.getItem('stoneside_settings') || 'null');
  if (settings) {
    // Scripture verse
    const verseElements = document.querySelectorAll('.verse-line, .side-verse .verse-line');
    const verseRefs = document.querySelectorAll('.verse-ref');
    
    if (settings.scriptureVerse) {
      const verseParts = settings.scriptureVerse.split(',');
      verseElements.forEach((el, i) => {
        if (verseParts[i]) el.textContent = verseParts[i].trim();
      });
    }
    
    if (settings.scriptureRef) {
      verseRefs.forEach(el => el.textContent = `— ${settings.scriptureRef}`);
    }
    
    // Footer
    const footerName = document.querySelector('.footer-name');
    const footerLocation = document.querySelector('.footer-location');
    if (footerName && settings.companyName) footerName.textContent = settings.companyName;
    if (footerLocation && settings.location) footerLocation.textContent = settings.location;
  }
}

// ════════════════════════════════════════════════════════════════
// PRELOADER
// ════════════════════════════════════════════════════════════════
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('locked');

  setTimeout(() => {
    preloader.classList.add('exit');
    
    setTimeout(() => {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
      document.querySelector('.hero')?.classList.add('loaded');
    }, 1000);
  }, 3200);

  // Fallback
  setTimeout(() => {
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
      document.body.classList.remove('locked');
    }
  }, 5000);
}

// ════════════════════════════════════════════════════════════════
// PENCIL CURSOR
// ════════════════════════════════════════════════════════════════
function initPencilCursor() {
  if (window.matchMedia('(max-width: 1024px)').matches) return;
  
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

  const oldCursor = document.getElementById('cursor');
  const oldGlow = document.getElementById('cursorGlow');
  if (oldCursor) oldCursor.style.display = 'none';
  if (oldGlow) oldGlow.style.display = 'none';
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
  const menuBtn = document.getElementById('headerMenu');
  const nav = document.getElementById('mobileNav');
  const navLinks = nav?.querySelectorAll('a');

  if (!menuBtn || !nav) return;

  const toggleNav = () => {
    menuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('locked');
  };

  menuBtn.addEventListener('click', toggleNav);

  navLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) toggleNav();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) toggleNav();
  });
}

// ════════════════════════════════════════════════════════════════
// HERO REVEAL — More Sensitive
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
        
        // Start at 30px, complete by 25% of hero
        const startPoint = 30;
        const endPoint = heroHeight * 0.25;
        
        let progress = 0;
        if (scrollY > startPoint) {
          progress = Math.min((scrollY - startPoint) / (endPoint - startPoint), 1);
        }
        
        const clipRight = 100 - (progress * 100);
        photoLayer.style.clipPath = `polygon(${clipRight}% 0, 100% 0, 100% 100%, ${clipRight}% 100%)`;
        
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

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// ════════════════════════════════════════════════════════════════
// TIMELINE
// ════════════════════════════════════════════════════════════════
function initTimeline() {
  const track = document.getElementById('timelineTrack');
  const progressFill = document.getElementById('timelineProgress');
  
  if (!track) return;

  let isDown = false;
  let startX;
  let scrollLeft;

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
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  // Touch
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
function initPortfolio() {
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const countCurrent = document.getElementById('galleryCount');
  const countTotal = document.getElementById('galleryTotal');

  if (!track || typeof projects === 'undefined') return;

  track.innerHTML = projects.map((project, index) => `
    <article class="gallery-item" data-id="${project.id}" data-index="${index}">
      <img class="gallery-image" src="${project.photo || project.image}" alt="${project.title}" loading="lazy" />
      <div class="gallery-overlay"></div>
      <div class="gallery-info">
        <span class="gallery-type">${project.type === 'custom' ? 'Custom Build' : 'Spec Home'}</span>
        <h3 class="gallery-title">${project.title}</h3>
        <span class="gallery-location">${project.location}</span>
      </div>
    </article>
  `).join('');

  if (countTotal) countTotal.textContent = String(projects.length).padStart(2, '0');

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
    if (item) openModal(parseInt(item.dataset.id));
  });

  let currentIndex = 0;
  
  const updateCount = () => {
    if (!countCurrent) return;
    const items = track.querySelectorAll('.gallery-item');
    const scrollCenter = track.scrollLeft + track.clientWidth / 2;
    items.forEach((item, index) => {
      if (Math.abs(scrollCenter - (item.offsetLeft + item.offsetWidth / 2)) < item.offsetWidth / 2) {
        currentIndex = index;
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
    currentIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = Math.min(projects.length - 1, currentIndex + 1);
    scrollToIndex(currentIndex);
  });
}

// ════════════════════════════════════════════════════════════════
// PROCESS STEPS
// ════════════════════════════════════════════════════════════════
function initProcessSteps() {
  const steps = document.querySelectorAll('.step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(steps).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), index * 100);
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
  const elements = document.querySelectorAll('.reveal, .section-label, .legacy-title, .philosophy-title, .portfolio-title, .process-title, .contact-title, .legacy-lead, .philosophy-lead, .portfolio-lead, .contact-lead');

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

  // Count animation
  const countElements = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target, parseInt(entry.target.dataset.count));
        countObserver.unobserve(entry.target);
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
    element.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = target;
  }

  requestAnimationFrame(update);
}

// ════════════════════════════════════════════════════════════════
// MODAL
// ════════════════════════════════════════════════════════════════
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  document.getElementById('modalReveal')?.addEventListener('click', () => {
    const images = document.getElementById('modalImages');
    images?.classList.toggle('revealed');
    const btn = document.getElementById('modalReveal');
    const text = btn?.querySelector('.reveal-text');
    if (text) text.textContent = images?.classList.contains('revealed') ? 'Show Sketch' : 'Reveal Build';
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal || typeof projects === 'undefined') return;

  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const setContent = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const setAttr = (id, attr, value) => {
    const el = document.getElementById(id);
    if (el) el[attr] = value;
  };

  setContent('modalType', project.type === 'custom' ? 'Custom Build' : 'Spec Home');
  setContent('modalTitle', project.title);
  setContent('modalLocation', project.location);
  setContent('modalDescription', project.description || '');
  setContent('modalSqft', project.sqft);
  setContent('modalBeds', project.beds);
  setContent('modalBaths', project.baths);
  setContent('modalYear', project.year);
  setContent('modalVerseText', project.verseText || '');
  setContent('modalVerseRef', project.verseRef || '');

  setAttr('modalSketch', 'src', project.sketch || project.photo || project.image);
  setAttr('modalPhoto', 'src', project.photo || project.image);

  document.getElementById('modalImages')?.classList.remove('revealed');
  const revealText = document.querySelector('#modalReveal .reveal-text');
  if (revealText) revealText.textContent = 'Reveal Build';

  modal.classList.add('active');
  document.body.classList.add('locked');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  modal?.classList.remove('active');
  document.body.classList.remove('locked');
}

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
    const submitText = submitBtn?.querySelector('.submit-text');
    if (!submitBtn || !submitText) return;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      [name, email, message].forEach(field => {
        if (!field?.value.trim()) {
          field.parentElement.classList.add('error');
          setTimeout(() => field.parentElement.classList.remove('error'), 500);
        }
      });
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitText.textContent;
    submitText.textContent = 'Sending...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      if (!response.ok) throw new Error();
    } catch {}

    submitText.textContent = 'Sent Successfully';
    submitBtn.style.background = 'var(--bronze)';
    form.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = originalText;
      submitBtn.style.background = '';
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