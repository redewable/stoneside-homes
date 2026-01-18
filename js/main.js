/**
 * STONESIDE CUSTOM HOMES - MAIN JAVASCRIPT
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initPortfolio();
    initTestimonials();
    initContactForm();
    initModal();
    initCounters();
    updateFooterYear();
});

/**
 * PRELOADER
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Trigger hero animations after preloader
            triggerHeroAnimations();
        }, 2000);
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 4000);
}

/**
 * NAVIGATION
 */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
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
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * HERO ANIMATIONS
 */
function initHeroAnimations() {
    // Parallax effect on hero image
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const heroSection = document.querySelector('.hero');
            const heroHeight = heroSection.offsetHeight;
            
            if (scrollY <= heroHeight) {
                heroImage.style.transform = `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`;
            }
        });
    }
}

function triggerHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .reveal-up');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, index * 150);
    });
}

/**
 * SCROLL ANIMATIONS
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-up:not(.hero .reveal-up)');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = windowHeight - 100;
            
            if (elementTop < revealPoint) {
                el.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

/**
 * PORTFOLIO
 */
function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const filters = document.querySelectorAll('.portfolio-filter');
    const data = window.STONESIDE_DATA?.projects || [];
    
    // Render portfolio items
    function renderPortfolio(filter = 'all') {
        let filteredProjects = data;
        
        if (filter === 'custom') {
            filteredProjects = data.filter(p => p.type === 'custom');
        } else if (filter === 'spec') {
            filteredProjects = data.filter(p => p.type === 'spec');
        } else if (filter === 'featured') {
            filteredProjects = data.filter(p => p.featured);
        }
        
        grid.innerHTML = filteredProjects.map(project => `
            <div class="portfolio-item reveal-up revealed" 
                 data-project-id="${project.id}"
                 data-type="${project.type}">
                ${project.featured ? '<span class="portfolio-item-badge">Featured</span>' : ''}
                <img src="assets/images/${project.image}" alt="${project.title}">
                <div class="portfolio-item-overlay">
                    <h3 class="portfolio-item-title">${project.title}</h3>
                    <span class="portfolio-item-meta">${project.location} • ${project.sqft} sq ft</span>
                </div>
            </div>
        `).join('');
        
        // Add click events to portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => {
                const projectId = item.dataset.projectId;
                const project = data.find(p => p.id === projectId);
                if (project) openProjectModal(project);
            });
        });
    }
    
    // Filter click events
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            renderPortfolio(filter.dataset.filter);
        });
    });
    
    // Initial render
    renderPortfolio();
}

/**
 * PROJECT MODAL
 */
function initModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="modal-gallery">
            <img src="assets/images/${project.image}" alt="${project.title}">
        </div>
        <div class="modal-details">
            <h2>${project.title}</h2>
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <span class="modal-meta-label">Location</span>
                    <span class="modal-meta-value">${project.location}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">Square Feet</span>
                    <span class="modal-meta-value">${project.sqft}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">Bedrooms</span>
                    <span class="modal-meta-value">${project.beds}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">Bathrooms</span>
                    <span class="modal-meta-value">${project.baths}</span>
                </div>
                <div class="modal-meta-item">
                    <span class="modal-meta-label">Year</span>
                    <span class="modal-meta-value">${project.year}</span>
                </div>
            </div>
            <p class="modal-description">${project.description}</p>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

/**
 * TESTIMONIALS SLIDER
 */
function initTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonials-track');
    const testimonials = slider.querySelectorAll('.testimonial');
    const dotsContainer = slider.querySelector('.testimonials-dots');
    const prevBtn = slider.querySelector('.testimonials-nav-btn.prev');
    const nextBtn = slider.querySelector('.testimonials-nav-btn.next');
    
    let currentIndex = 0;
    const totalSlides = testimonials.length;
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('testimonials-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = slider.querySelectorAll('.testimonials-dot');
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance
    let autoAdvance = setInterval(nextSlide, 6000);
    
    slider.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    slider.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(nextSlide, 6000);
    });
}

/**
 * CONTACT FORM
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission (replace with actual endpoint)
        try {
            // In production, send to your backend or email service
            console.log('Form submitted:', data);
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            submitBtn.innerHTML = '<span>Message Sent!</span>';
            submitBtn.style.background = '#4A5D4F';
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
        } catch (error) {
            console.error('Form error:', error);
            submitBtn.innerHTML = '<span>Error - Try Again</span>';
            submitBtn.style.background = '#c0392b';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

/**
 * ANIMATED COUNTERS
 */
function initCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Trigger counters when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

/**
 * UPDATE FOOTER YEAR
 */
function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * SMOOTH SCROLL (Enhancement)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
