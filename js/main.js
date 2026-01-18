// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript
// Craftsman Heritage Edition
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initCustomCursor();
    initPortfolio();
    initTestimonials();
    initModal();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after animations complete
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Trigger hero animations after preloader
            triggerHeroAnimations();
        }, 2800); // Wait for house drawing animation
    });
}

function triggerHeroAnimations() {
    // Add visible class to hero elements for staggered reveal
    const heroElements = document.querySelectorAll('.hero .reveal');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll behavior for header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// ============================================
// CUSTOM CURSOR (Pencil)
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    
    if (!cursor || window.innerWidth < 1024) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.transform = `translate(${cursorX - 5}px, ${cursorY - 25}px) rotate(-30deg)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1';
        });
    });
}

// ============================================
// PORTFOLIO
// ============================================
function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = window.projectsData || [];
    
    // Render projects
    function renderProjects(filter = 'all') {
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(p => p.type === filter);
        
        grid.innerHTML = filteredProjects.map(project => `
            <article class="portfolio-item reveal" data-id="${project.id}" data-type="${project.type}" data-sqft="${project.sqft} sq ft">
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="portfolio-overlay">
                        <div class="overlay-content">
                            <span class="view-project">
                                View Project
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="portfolio-info">
                    <span class="portfolio-type">${project.type === 'custom' ? 'Custom Home' : 'Spec Home'}</span>
                    <h3 class="portfolio-title">${project.title}</h3>
                    <p class="portfolio-location">${project.location}</p>
                </div>
            </article>
        `).join('');
        
        // Re-initialize scroll animations for new items
        initScrollAnimations();
        
        // Add click handlers
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                const projectId = parseInt(item.dataset.id);
                openModal(projectId);
            });
        });
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Fade out, filter, fade in
            grid.style.opacity = '0';
            setTimeout(() => {
                renderProjects(filter);
                grid.style.opacity = '1';
            }, 300);
        });
    });
    
    // Initial render
    renderProjects();
    
    // Update filter counts
    updateFilterCounts();
}

function updateFilterCounts() {
    const projects = window.projectsData || [];
    const allCount = projects.length;
    const customCount = projects.filter(p => p.type === 'custom').length;
    const specCount = projects.filter(p => p.type === 'spec').length;
    
    document.querySelector('[data-filter="all"] .filter-count').textContent = allCount;
    document.querySelector('[data-filter="custom"] .filter-count').textContent = customCount;
    document.querySelector('[data-filter="spec"] .filter-count').textContent = specCount;
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
function initTestimonials() {
    const track = document.querySelector('.testimonial-track');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');
    const testimonials = window.testimonialsData || [];
    
    let currentIndex = 0;
    
    // Render testimonials
    track.innerHTML = testimonials.map((t, index) => `
        <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
            <div class="testimonial-content">
                <p class="testimonial-quote">${t.quote}</p>
                <div class="testimonial-author">
                    <span class="author-name">${t.author}</span>
                    <span class="author-project">${t.project}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Render dots
    dotsContainer.innerHTML = testimonials.map((_, index) => `
        <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to testimonial ${index + 1}"></button>
    `).join('');
    
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentIndex = index;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        if (currentIndex >= slides.length) currentIndex = 0;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });
    
    // Auto-advance
    setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 6000);
}

// ============================================
// MODAL
// ============================================
function initModal() {
    const modal = document.getElementById('projectModal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close handlers
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Close modal on CTA click
    modal.querySelector('.modal-cta').addEventListener('click', closeModal);
}

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const projects = window.projectsData || [];
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    // Populate modal content
    document.getElementById('modalMainImage').src = project.image;
    document.getElementById('modalMainImage').alt = project.title;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalLocation').textContent = project.location;
    document.getElementById('modalDescription').textContent = project.description;
    
    // Type badge
    modal.querySelector('.project-type-badge').textContent = 
        project.type === 'custom' ? 'Custom Home' : 'Spec Home';
    
    // Specs
    document.getElementById('modalSpecs').innerHTML = `
        <div class="spec-item">
            <span class="spec-label">Square Feet</span>
            <span class="spec-value">${project.sqft}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Bedrooms</span>
            <span class="spec-value">${project.beds}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Bathrooms</span>
            <span class="spec-value">${project.baths}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Year</span>
            <span class="spec-value">${project.year}</span>
        </div>
    `;
    
    // Gallery thumbnails
    const thumbsContainer = document.getElementById('modalThumbs');
    thumbsContainer.innerHTML = project.gallery.map((img, index) => `
        <div class="gallery-thumb ${index === 0 ? 'active' : ''}" data-src="${img}">
            <img src="${img}" alt="${project.title} - Image ${index + 1}">
        </div>
    `).join('');
    
    // Thumbnail click handlers
    thumbsContainer.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbsContainer.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            document.getElementById('modalMainImage').src = thumb.dataset.src;
        });
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger process step animations
                if (entry.target.classList.contains('process-step')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal, .process-step').forEach(el => {
        observer.observe(el);
    });
    
    // Tape measure stats animation
    const tapeStats = document.querySelectorAll('.tape-stat');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTapeMeasure(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    tapeStats.forEach(stat => statsObserver.observe(stat));
}

function animateTapeMeasure(element) {
    const number = element.querySelector('.tape-number');
    const targetValue = parseInt(element.dataset.count);
    
    let current = 0;
    const duration = 1500;
    const increment = targetValue / (duration / 16);
    
    function updateNumber() {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
        } else {
            requestAnimationFrame(updateNumber);
        }
        
        // Update display (keep the + or % suffix)
        const suffix = number.querySelector('.tape-plus, .tape-percent');
        const suffixHTML = suffix ? suffix.outerHTML : '';
        number.innerHTML = Math.floor(current) + suffixHTML;
    }
    
    updateNumber();
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        submitBtn.style.background = '#4CAF50';
        
        // Reset after delay
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// UTILITY: Debounce
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// PARALLAX EFFECTS (Optional enhancement)
// ============================================
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    
    // Subtle parallax on hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.1}px)`;
    }
    
    // Blueprint grid movement
    const blueprintGrid = document.querySelector('.blueprint-grid-animated');
    if (blueprintGrid && scrolled < window.innerHeight) {
        blueprintGrid.style.transform = `translate(${scrolled * 0.02}px, ${scrolled * 0.02}px)`;
    }
}, 10));