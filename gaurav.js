
document.addEventListener('DOMContentLoaded', function() {
    

    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. NAVBAR SCROLL EFFECTS (Subtle glass transition) - NO MOBILE MENU
    const navBar = document.querySelector('.nav-bar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navBar.style.transform = 'translateY(-100%)';
            navBar.style.background = 'rgba(255, 255, 255, 0.15)';
        } else {
            navBar.style.transform = 'translateY(0)';
            navBar.style.background = 'rgba(255, 255, 255, 0.2)';
        }
        
        lastScrollY = currentScrollY;
    });

    // 3. SCROLL ANIMATIONS (Staggered reveal - human timing)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .service-card, .skills li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) rotateX(10deg)';
        el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });

    // 4. HERO BUTTON RIPPLE EFFECT
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // 5. SERVICE CARDS HOVER (Desktop only)
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateX(8deg) rotateY(5deg)';
            this.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.25)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
    });

    // 6. BACK TO TOP BUTTON
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        border: none; border-radius: 50%; background: rgba(255,255,255,0.9);
        color: #667eea; font-size: 1.5rem; font-weight: bold; cursor: pointer;
        opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. CONTACT LINKS (External links in new tab)
    document.querySelectorAll('.contact-link[href^="http"], .contact-links a[href^="https"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    console.log('🎉 Clean Portfolio loaded! No mobile menu - Desktop navbar only 🚀');
});

// CSS for ripple + back-to-top
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    .back-to-top:hover {
        transform: translateY(-3px) scale(1.1); background: rgba(102,126,234,0.9);
        color: white; box-shadow: 0 15px 35px rgba(102,126,234,0.4);
    }
`;
document.head.appendChild(style);
// Add this to your existing script.js INSIDE DOMContentLoaded
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}