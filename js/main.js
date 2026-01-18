// ============================================
// STONESIDE CUSTOM HOMES - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initHeader();
    initMobileMenu();
    initWork();
    initTestimonials();
    initModal();
    initForm();
    initReveal();
    initSmoothScroll();
});

// ============================================
// LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('done');
            document.body.classList.remove('locked');
        }, 2300);
    });
    
    document.body.classList.add('locked');
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower is slower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'rgba(255,255,255,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'rgba(255,255,255,0.5)';
        });
    });
}

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('locked');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('locked');
        });
    });
}

// ============================================
// WORK / PORTFOLIO
// ============================================
function initWork() {
    const grid = document.getElementById('workGrid');
    const filters = document.querySelectorAll('.filter-btn');
    
    if (!grid) return;
    
    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' 
            ? projects 
            : projects.filter(p => p.type === filter);
        
        grid.innerHTML = filtered.map(project => `
            <article class="work-item reveal" data-id="${project.id}">
                <div class="work-img">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="work-overlay"></div>
                <div class="work-info">
                    <span class="work-tag">${project.type === 'custom' ? 'Custom Home' : 'Spec Home'}</span>
                    <h3 class="work-title">${project.title}</h3>
                    <p class="work-loc">${project.location}</p>
                </div>
            </article>
        `).join('');
        
        // Re-attach click handlers
        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', () => openModal(parseInt(item.dataset.id)));
        });
        
        // Trigger reveal animations
        setTimeout(() => {
            document.querySelectorAll('.work-item.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }, 100);
    }
    
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
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
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    const currentEl = document.getElementById('testCurrent');
    const totalEl = document.getElementById('testTotal');
    
    if (!slider) return;
    
    let current = 0;
    const total = testimonials.length;
    
    // Render slides
    slider.innerHTML = testimonials.map((t, i) => `
        <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
            <p class="test-quote">${t.quote}</p>
            <p class="test-author">${t.author}</p>
            <p class="test-project">${t.project}</p>
        </div>
    `).join('');
    
    totalEl.textContent = String(total).padStart(2, '0');
    
    function goTo(index) {
        const slides = document.querySelectorAll('.testimonial-slide');
        slides.forEach(s => s.classList.remove('active'));
        
        current = index;
        if (current < 0) current = total - 1;
        if (current >= total) current = 0;
        
        slides[current].classList.add('active');
        currentEl.textContent = String(current + 1).padStart(2, '0');
    }
    
    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));
    
    // Auto advance
    setInterval(() => goTo(current + 1), 6000);
}

// ============================================
// MODAL
// ============================================
function initModal() {
    const modal = document.getElementById('modal');
    const modalBg = document.getElementById('modalBg');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal) return;
    
    modalBg?.addEventListener('click', closeModal);
    modalClose?.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(id) {
    const modal = document.getElementById('modal');
    const project = projects.find(p => p.id === id);
    
    if (!project || !modal) return;
    
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').alt = project.title;
    document.getElementById('modalTag').textContent = project.type === 'custom' ? 'Custom Home' : 'Spec Home';
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalLoc').textContent = project.location;
    document.getElementById('modalDesc').textContent = project.description;
    
    document.getElementById('modalSpecs').innerHTML = `
        <div class="spec">
            <span class="spec-label">Sq Ft</span>
            <span class="spec-value">${project.sqft}</span>
        </div>
        <div class="spec">
            <span class="spec-label">Beds</span>
            <span class="spec-value">${project.beds}</span>
        </div>
        <div class="spec">
            <span class="spec-label">Baths</span>
            <span class="spec-value">${project.baths}</span>
        </div>
        <div class="spec">
            <span class="spec-label">Year</span>
            <span class="spec-value">${project.year}</span>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.classList.add('locked');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('locked');
    }
}

// ============================================
// CONTACT FORM
// ============================================
function initForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const btnText = btn.querySelector('span');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'Sending...';
        btn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        btnText.textContent = 'Sent!';
        btn.style.background = '#4a5d4f';
        
        setTimeout(() => {
            form.reset();
            btnText.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // Also observe sections for staggered reveals
    document.querySelectorAll('.section-head, .about-content, .about-images, .process-step, .feature').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
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
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
