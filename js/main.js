// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initPortfolio();
  initTestimonials();
  initModal();
  initContactForm();
  initScrollAnimations();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scroll (fixes href="#" crash)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!href.startsWith('#') || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ============================================
// PORTFOLIO
// ============================================
function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!grid) return;
  if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    console.warn('[Portfolio] projects not found. Ensure js/data.js loads before js/main.js');
    return;
  }

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

    grid.innerHTML = filtered
      .map(
        (project) => `
          <article class="portfolio-item fade-in" data-id="${project.id}">
            <div class="portfolio-image">
              <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="portfolio-info">
              <span class="portfolio-type">${project.type === 'custom' ? 'Custom Home' : 'Spec Home'}</span>
              <h3 class="portfolio-title">${project.title}</h3>
              <p class="portfolio-location">${project.location}</p>
            </div>
          </article>
        `
      )
      .join('');

    document.querySelectorAll('.portfolio-item').forEach((item) => {
      item.addEventListener('click', () => openModal(parseInt(item.dataset.id, 10)));
    });

    setTimeout(() => {
      document.querySelectorAll('.portfolio-item.fade-in').forEach((el) => el.classList.add('visible'));
    }, 100);
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

  if (!track || !dotsContainer || !prevBtn || !nextBtn) return;
  if (typeof testimonials === 'undefined' || !Array.isArray(testimonials)) {
    console.warn('[Testimonials] testimonials not found. Ensure js/data.js loads before js/main.js');
    return;
  }

  let currentIndex = 0;

  track.innerHTML = testimonials
    .map(
      (t, i) => `
        <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
          <p class="testimonial-quote">${t.quote}</p>
          <p class="testimonial-author">${t.author}</p>
          <p class="testimonial-project">${t.project}</p>
        </div>
      `
    )
    .join('');

  dotsContainer.innerHTML = testimonials
    .map(
      (_, i) => `<button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
    )
    .join('');

  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');

  function goToSlide(index) {
    if (!slides.length) return;

    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index, 10))));

  if (slides.length > 1) setInterval(() => goToSlide(currentIndex + 1), 6000);
}

// ============================================
// MODAL
// ============================================
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');

  if (overlay) overlay.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const modalImage = document.getElementById('modalImage');
  const modalType = document.getElementById('modalType');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalSpecs = document.getElementById('modalSpecs');

  if (modalImage) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
  }
  if (modalType) modalType.textContent = project.type === 'custom' ? 'Custom Home' : 'Spec Home';
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalLocation) modalLocation.textContent = project.location;
  if (modalDescription) modalDescription.textContent = project.description;

  if (modalSpecs) {
    modalSpecs.innerHTML = `
      <div class="spec-item"><span class="spec-label">Sq Ft</span><span class="spec-value">${project.sqft}</span></div>
      <div class="spec-item"><span class="spec-label">Beds</span><span class="spec-value">${project.beds}</span></div>
      <div class="spec-item"><span class="spec-label">Baths</span><span class="spec-value">${project.baths}</span></div>
      <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${project.year}</span></div>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    btn.textContent = 'Message Sent!';
    btn.style.background = '#4CAF50';

    setTimeout(() => {
      form.reset();
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
    { threshold: 0.1 }
  );

  els.forEach((el) => observer.observe(el));
}