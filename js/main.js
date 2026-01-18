// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // Premium loader: rotate lines + finish safely (prevents stuck loader)
  initLoader();

  // Cursor + magnetic
  initCursor();
  initMagnetic();

  // UI
  initNavigation();
  initPortfolio();
  initTestimonials();
  initModal();
  initContactForm();
  initScrollAnimations();
});

function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const lines = Array.from(loader.querySelectorAll('.loader-line'));
  let idx = 0;

  const rotate = () => {
    lines.forEach((l) => l.classList.remove('is-active'));
    lines[idx % lines.length]?.classList.add('is-active');
    idx += 1;
  };

  rotate();
  const rotTimer = setInterval(rotate, 650);

  // Let the loader feel premium, then exit.
  // If something else fails later, we still remove the loader.
  setTimeout(() => {
    clearInterval(rotTimer);
    loader.classList.add('done');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 520);
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

  document.querySelectorAll('a, button, .work-item, .filter-btn, .modal-close').forEach((el) => {
    el.addEventListener('mouseenter', () => setLink(true));
    el.addEventListener('mouseleave', () => setLink(false));
  });
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

  // Smooth scroll guard for "#"
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
// PORTFOLIO
// ============================================
function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!grid) return;

  if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    console.warn('[Portfolio] projects not found.');
    return;
  }

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' ? projects : projects.filter((p) => p.type === filter);

    grid.innerHTML = filtered
      .map((p) => {
        const typeLabel = p.type === 'custom' ? 'Custom Home' : 'Spec Home';
        return `
          <article class="work-item fade-in" data-id="${p.id}">
            <div class="work-media">
              <img src="${p.image}" alt="${p.title}" loading="lazy">
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

    // trigger fade-in for new nodes
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
    .map((_, i) => `<button class="dotbtn ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`)
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
// MODAL
// ============================================
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const overlay = modal.querySelector('.modal-overlay');
  const closeBtn = modal.querySelector('.modal-close');

  overlay?.addEventListener('click', closeModal);
  closeBtn?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  const p = projects.find((x) => x.id === projectId);
  if (!p) return;

  const modalImage = document.getElementById('modalImage');
  const modalType = document.getElementById('modalType');
  const modalTitle = document.getElementById('modalTitle');
  const modalLocation = document.getElementById('modalLocation');
  const modalDescription = document.getElementById('modalDescription');
  const modalSpecs = document.getElementById('modalSpecs');

  modalImage.src = p.image;
  modalImage.alt = p.title;
  modalType.textContent = p.type === 'custom' ? 'Custom Home' : 'Spec Home';
  modalTitle.textContent = p.title;
  modalLocation.textContent = p.location;
  modalDescription.textContent = p.description;

  modalSpecs.innerHTML = `
    <div class="spec-item"><span class="spec-label">Sq Ft</span><span class="spec-value">${p.sqft}</span></div>
    <div class="spec-item"><span class="spec-label">Beds</span><span class="spec-value">${p.beds}</span></div>
    <div class="spec-item"><span class="spec-label">Baths</span><span class="spec-value">${p.baths}</span></div>
    <div class="spec-item"><span class="spec-label">Year</span><span class="spec-value">${p.year}</span></div>
  `;

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