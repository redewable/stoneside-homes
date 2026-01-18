// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// PORTFOLIO
// ============================================
function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' 
            ? projects 
            : projects.filter(p => p.type === filter);
        
        grid.innerHTML = filtered.map(project => `
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
        `).join('');
        
        // Add click handlers
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', () => openModal(parseInt(item.dataset.id)));
        });
        
        // Re-trigger animations
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item.fade-in').forEach(el => {
                el.classList.add('visible');
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
    
    let currentIndex = 0;
    
    // Render testimonials
    track.innerHTML = testimonials.map((t, i) => `
        <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
            <p class="testimonial-quote">${t.quote}</p>
            <p class="testimonial-author">${t.author}</p>
            <p class="testimonial-project">${t.project}</p>
        </div>
    `).join('');
    
    // Render dots
    dotsContainer.innerHTML = testimonials.map((_, i) => `
        <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>
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
        dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });
    
    // Auto-advance
    setInterval(() => goToSlide(currentIndex + 1), 6000);
}

// ============================================
// MODAL
// ============================================
function initModal() {
    const modal = document.getElementById('projectModal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    document.getElementById('modalType').textContent = project.type === 'custom' ? 'Custom Home' : 'Spec Home';
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalLocation').textContent = project.location;
    document.getElementById('modalDescription').textContent = project.description;
    
    document.getElementById('modalSpecs').innerHTML = `
        <div class="spec-item">
            <span class="spec-label">Sq Ft</span>
            <span class="spec-value">${project.sqft}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Beds</span>
            <span class="spec-value">${project.beds}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Baths</span>
            <span class="spec-value">${project.baths}</span>
        </div>
        <div class="spec-item">
            <span class="spec-label">Year</span>
            <span class="spec-value">${project.year}</span>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        // Simulate submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
