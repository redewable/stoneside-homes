// ============================================
// STONESIDE CUSTOM HOMES — Premium JavaScript
// premium.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initHeader();
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initPortfolio();
  initTestimonials();
  initModal();
  initContactForm();
  initCountUp();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Wait for all content to load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('no-scroll');
      
      // Remove from DOM after animation
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 2200); // Match preloader animation timing
  });

  // Fallback - remove preloader after max wait time
  setTimeout(() => {
    if (preloader.parentNode) {
      preloader.classList.add('loaded');
      document.body.classList.remove('no-scroll');
    }
  }, 4000);
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(max-width: 1024px)').matches) return;

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function animate() {
    // Dot follows immediately
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

    // Ring follows with more lag
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Re-attach on dynamic content
  const observer = new MutationObserver(() => {
    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  });
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
      requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = nav?.querySelectorAll('a');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close nav on link click
    navLinks?.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// HERO ANIMATIONS
// ============================================
function initHeroAnimations() {
  const heroFrame = document.querySelector('.hero-frame');
  
  if (heroFrame) {
    // Scroll-based reveal for hero image
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
}

// ============================================
// COUNT UP ANIMATION
// ============================================
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          const current = Math.floor(easeProgress * target);
          
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in, [data-aos]');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'aos-animate');
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // Add fade-in class to elements that should animate
  const animateElements = document.querySelectorAll(
    '.section-label, .section-title, .value-card, .pillar, .process-step, .project-card, .contact-step'
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

  function renderProjects(filter = 'all') {
    const filtered = filter === 'all' 
      ? projects 
      : projects.filter(p => p.type === filter);

    grid.innerHTML = filtered.map(project => {
      const typeLabel = project.type === 'custom' ? 'Custom Build' : 'Spec Home';
      const image = project.photo || project.image || '';

      return `
        <article class="project-card fade-in" data-id="${project.id}">
          <div class="project-image">
            <img src="${image}" alt="${project.title}" loading="lazy" />
            <div class="project-overlay"></div>
          </div>
          <div class="project-info">
            <span class="project-type">${typeLabel}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-location">${project.location}</p>
            <div class="project-specs">
              <span class="project-spec">${project.sqft} SF</span>
              <span class="project-spec">${project.beds} Bed</span>
              <span class="project-spec">${project.baths} Bath</span>
              <span class="project-spec">${project.year}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Add click handlers for modal
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        openModal(id);
      });
    });

    // Trigger animations
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('visible');
      });
    }, 100);
  }

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });

  // Initial render
  renderProjects();
}

// ============================================
// TESTIMONIALS
// ============================================
function initTestimonials() {
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const locationEl = document.getElementById('testimonialLocation');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');

  if (!quoteEl || typeof testimonials === 'undefined' || !testimonials.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  // Create dots
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = dotsContainer?.querySelectorAll('.testimonial-dot');

  function goTo(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = testimonials.length - 1;
    if (currentIndex >= testimonials.length) currentIndex = 0;

    const testimonial = testimonials[currentIndex];
    
    // Fade out
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(10px)';

    setTimeout(() => {
      quoteEl.textContent = testimonial.quote;
      authorEl.textContent = testimonial.author;
      locationEl.textContent = testimonial.project;

      // Fade in
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 300);

    // Update dots
    dots?.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Reset autoplay
    resetAutoplay();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(next, 6000);
  }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);

  // Add transition styles
  quoteEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // Start autoplay
  resetAutoplay();
}

// ============================================
// MODAL
// ============================================
function initModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = document.getElementById('modalClose');
  const revealBtn = document.getElementById('modalRevealBtn');
  const imageStack = document.getElementById('modalImageStack');

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
    imageStack?.classList.toggle('revealed');
    revealBtn.textContent = imageStack?.classList.contains('revealed') 
      ? 'Show Sketch' 
      : 'Reveal the Build';
  });
}

function openModal(projectId) {
  const modal = document.getElementById('projectModal');
  if (!modal || typeof projects === 'undefined') return;

  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  // Populate modal
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
  
  const photoSrc = project.photo || project.image || '';
  const sketchSrc = project.sketch || photoSrc;
  
  if (sketchEl) {
    sketchEl.src = sketchSrc;
    sketchEl.alt = `${project.title} sketch`;
  }
  if (photoEl) {
    photoEl.src = photoSrc;
    photoEl.alt = `${project.title} completed`;
  }

  if (sqftEl) sqftEl.textContent = project.sqft;
  if (bedsEl) bedsEl.textContent = project.beds;
  if (bathsEl) bathsEl.textContent = project.baths;
  if (yearEl) yearEl.textContent = project.year;

  if (verseTextEl) verseTextEl.textContent = project.verseText || '';
  if (verseRefEl) verseRefEl.textContent = project.verseRef || '';

  // Reset reveal state
  imageStack?.classList.remove('revealed');
  const revealBtn = document.getElementById('modalRevealBtn');
  if (revealBtn) revealBtn.innerHTML = '<span>Reveal the Build</span>';

  // Show modal
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    if (!submitBtn) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show success state
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');

    // Reset after delay
    setTimeout(() => {
      submitBtn.classList.remove('success');
      submitBtn.disabled = false;
      form.reset();
    }, 2500);
  });
}

// ============================================
// UTILITY: Throttle
// ============================================
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
  }, 16));
}