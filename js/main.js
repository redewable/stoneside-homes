// ============================================
// STONESIDE CUSTOM HOMES - Fixed Main JS
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
// LOADER - Fixed null check for body and loader
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('done');
            if (document.body) document.body.classList.remove('locked');
        }, 1500);
    });
    
    if (document.body) document.body.classList.add('locked');
}

// ============================================
// MOBILE MENU - Fixed IDs to match index.html
// ============================================
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn'); // Matches index.html
    const mobileMenu = document.getElementById('mobileMenu'); // Matches index.html
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        if (document.body) document.body.classList.toggle('locked');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            if (document.body) document.body.classList.remove('locked');
        });
    });
}

// ============================================
// HEADER
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// WORK / PORTFOLIO
// ============================================
function initWork() {
    const grid = document.getElementById('workGrid');
    const filters = document.querySelectorAll('.filter-btn');
    
    // Safety check for the 'projects' data array from projects.js
    if (!grid || typeof projects === 'undefined') return;
    
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
        
        document.querySelectorAll('.work-item').forEach(item => {
            item.addEventListener('click', () => openModal(parseInt(item.dataset.id)));
        });
        
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

// ... (Functions below remain as they were in your source file)

function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    function animate() {
        cursorX += (mouseX - cursorX) * 0.2; cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px'; cursor.style.top = cursorY + 'px';
        followerX += (mouseX - followerX) * 0.1; followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

function initTestimonials() {
    const slider = document.getElementById('testimonialSlider');
    if (!slider || typeof testimonials === 'undefined') return;
    slider.innerHTML = testimonials.map((t, i) => `
        <div class="testimonial-slide ${i === 0 ? 'active' : ''}">
            <p class="test-quote">${t.quote}</p>
            <p class="test-author">${t.author}</p>
            <p class="test-project">${t.project}</p>
        </div>
    `).join('');
}

function initModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    document.getElementById('modalBg')?.addEventListener('click', closeModal);
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
}

function openModal(id) {
    const modal = document.getElementById('modal');
    const project = projects.find(p => p.id === id);
    if (!project || !modal) return;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    modal.classList.add('active');
    if (document.body) document.body.classList.add('locked');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        if (document.body) document.body.classList.remove('locked');
    }
}

function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent!');
    });
}

function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
        });
    });
}