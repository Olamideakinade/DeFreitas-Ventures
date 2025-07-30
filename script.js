// ai




document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        let mainTitle = new Typed('#main-title', {
            strings: ['DeFreitas Ventures Inc.'],
            typeSpeed: 70,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                let subtitle = new Typed('#subtitle', {
                    strings: ['Where Vision Meets Enterprise.'],
                    typeSpeed: 50,
                    showCursor: false,
                    cursorChar: '|',
                    startDelay: 300,
                    onComplete: (self) => {
                        // Add gold color animation after typing
                        document.getElementById('main-title').classList.add('text-gradient');
                        document.getElementById('subtitle').classList.add('text-gradient');
                    }
                });
            }
        });
    }, 1000);

    // Prevent horizontal scroll everywhere
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100vw';
    document.body.style.width = '100vw';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.maxWidth = '100vw';

    // WhatsApp float always visible and fixed, no animation or transform
    const float = document.getElementById('whatsappFloat') || document.querySelector('.whatsapp-float');
    if (float) {
        float.style.position = 'fixed';
        float.style.right = window.innerWidth <= 600 ? '1rem' : '2rem';
        float.style.bottom = window.innerWidth <= 600 ? '1rem' : '2rem';
        float.style.zIndex = 1500;
        float.style.pointerEvents = 'auto';
        float.style.animation = 'none';
        float.style.transform = 'none';
        window.addEventListener('resize', function () {
            float.style.right = window.innerWidth <= 600 ? '1rem' : '2rem';
            float.style.bottom = window.innerWidth <= 600 ? '1rem' : '2rem';
        });
    }

    // Fix nav-menu: remove any transform/left animation
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.transform = 'none';
        navMenu.style.left = '0';
        navMenu.style.maxWidth = '100vw';
    }

    // Initialize orange bubbles after DOM is ready
    createOrangeBubbles();

    // GSAP bounce animation for About section title
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".gsap-bounce-title",
            { y: -80, opacity: 0, scale: 0.7 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: ".gsap-bounce-title",
                    start: "top 80%",
                    end: "top 30%",
                    toggleActions: "play reverse play reverse",
                    onLeaveBack: () => {
                        gsap.to(".gsap-bounce-title", {
                            y: 60,
                            opacity: 0.5,
                            scale: 0.85,
                            duration: 0.7,
                            ease: "power2.in"
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(".gsap-bounce-title", {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.1,
                            ease: "bounce.out"
                        });
                    }
                }
            }
        );

        // Contact CTA unique crazy GSAP animations
        gsap.set(".cta-title", { opacity: 0, y: 100, scale: 0.7, rotate: -15 });
        gsap.set(".cta-description", { opacity: 0, x: -80, scale: 0.7, skewX: 15 });
        gsap.set(".cta-buttons .btn-primary", { opacity: 0, y: 80, scale: 0.6, rotate: 5 });
        gsap.set(".cta-buttons .btn-whatsapp", { opacity: 0, y: 80, scale: 0.6, rotate: -5 });

        ScrollTrigger.create({
            trigger: ".contact-cta",
            start: "top 80%",
            onEnter: function() {
                // Animate title with textillate-like effect (letters pop in)
                gsap.to(".cta-title", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.6)",
                    onStart: () => {
                        // Per-letter pop-in
                        const title = document.querySelector('.cta-title');
                        if (title && !title.classList.contains('text-animated')) {
                            title.classList.add('text-animated');
                            const chars = title.textContent.split('');
                            title.innerHTML = chars.map((c, i) =>
                                `<span class="cta-letter" style="display:inline-block;opacity:0">${c}</span>`
                            ).join('');
                            gsap.to('.cta-letter', {
                                opacity: 1,
                                y: 0,
                                scale: 1.1,
                                stagger: 0.05,
                                ease: "back.out(2.2)",
                                duration: 0.55
                            });
                        }
                    }
                });
                // Animate description
                gsap.to(".cta-description", {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    skewX: 0,
                    duration: 1.1,
                    delay: 0.4,
                    ease: "expo.out"
                });
                // Animate buttons with crazy bounce and rotation
                gsap.to(".cta-buttons .btn-primary", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 1,
                    delay: 0.7,
                    ease: "back.out(2.2)"
                });
                gsap.to(".cta-buttons .btn-whatsapp", {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 1,
                    delay: 0.9,
                    ease: "back.out(2.2)"
                });
                // Button crazy wiggle on hover
                document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
                    btn.addEventListener('mouseenter', function() {
                        gsap.fromTo(btn, { rotate: -3 }, { rotate: 3, yoyo: true, repeat: 3, duration: 0.15, ease: "power1.inOut" });
                    });
                });
            },
            onLeaveBack: function() {
                // Reverse all
                gsap.to(".cta-title", { opacity: 0, y: 100, scale: 0.7, rotate: -15, duration: 0.6, ease: "power2.in" });
                gsap.to(".cta-description", { opacity: 0, x: -80, scale: 0.7, skewX: 15, duration: 0.5, ease: "power2.in" });
                gsap.to(".cta-buttons .btn-primary", { opacity: 0, y: 80, scale: 0.6, rotate: 5, duration: 0.5, ease: "power2.in" });
                gsap.to(".cta-buttons .btn-whatsapp", { opacity: 0, y: 80, scale: 0.6, rotate: -5, duration: 0.5, ease: "power2.in" });
            }
        });
    }

    // GSAP About Title Animation (no bounce, now a smooth reveal with color flicker)
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(".gsap-about-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            skewX: 0,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".gsap-about-title",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            onStart: () => {
                // Flicker effect
                gsap.fromTo(
                    ".gsap-about-title",
                    { filter: "brightness(1.8)", opacity: 0.8 },
                    {
                        filter: "brightness(1)",
                        opacity: 1,
                        duration: 0.6,
                        repeat: 3,
                        yoyo: true,
                        ease: "power1.inOut"
                    }
                );
            }
        });

        // Contact CTA Section Animation
        // Add sparkles
        const ctaSection = document.querySelector('.super-cta-bg');
        if (ctaSection && !ctaSection.querySelector('.cta-sparkle')) {
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'cta-sparkle';
                sparkle.style.width = `${Math.random() * 18 + 12}px`;
                sparkle.style.height = sparkle.style.width;
                sparkle.style.left = `${Math.random() * 90}%`;
                sparkle.style.top = `${Math.random() * 80 + 5}%`;
                sparkle.style.animationDelay = `${Math.random() * 8}s`;
                ctaSection.appendChild(sparkle);
            }
        }

        // Animate CTA content
        gsap.set(".gsap-cta-content", { opacity: 0, y: 80, scale: 0.95 });
        gsap.set(".gsap-cta-title", { opacity: 0, y: 60, scale: 0.95, rotate: -5 });
        gsap.set(".gsap-cta-desc", { opacity: 0, y: 40, scale: 0.95, skewX: 8 });
        gsap.set(".gsap-cta-btn", { opacity: 0, y: 60, scale: 0.8, rotate: 0 });

        ScrollTrigger.create({
            trigger: ".super-cta-bg",
            start: "top 80%",
            onEnter: function() {
                gsap.to(".gsap-cta-content", {
                    opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out"
                });
                gsap.to(".gsap-cta-title", {
                    opacity: 1, y: 0, scale: 1, rotate: 0, duration: 1.1, ease: "expo.out"
                });
                gsap.to(".gsap-cta-desc", {
                    opacity: 1, y: 0, scale: 1, skewX: 0, duration: 1, delay: 0.2, ease: "expo.out"
                });
                gsap.to(".gsap-cta-btn", {
                    opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, delay: 0.4, ease: "elastic.out(1,0.7)"
                });
                // Per-letter textillate-like effect for CTA title
                const title = document.querySelector('.gsap-cta-title');
                if (title && !title.classList.contains('text-animated')) {
                    title.classList.add('text-animated');
                    const chars = title.textContent.split('');
                    title.innerHTML = chars.map((c, i) =>
                        `<span class="cta-letter" style="display:inline-block;opacity:0">${c}</span>`
                    ).join('');
                    gsap.to('.cta-letter', {
                        opacity: 1,
                        y: 0,
                        scale: 1.1,
                        stagger: 0.04,
                        ease: "back.out(2.2)",
                        duration: 0.45
                    });
                }
            },
            onLeaveBack: function() {
                gsap.to(".gsap-cta-content", { opacity: 0, y: 80, scale: 0.95, duration: 0.6, ease: "power2.in" });
                gsap.to(".gsap-cta-title", { opacity: 0, y: 60, scale: 0.95, rotate: -5, duration: 0.5, ease: "power2.in" });
                gsap.to(".gsap-cta-desc", { opacity: 0, y: 40, scale: 0.95, skewX: 8, duration: 0.5, ease: "power2.in" });
                gsap.to(".gsap-cta-btn", { opacity: 0, y: 60, scale: 0.8, duration: 0.5, ease: "power2.in" });
            }
        });
    }

    // GSAP bounce animation for About section title
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".gsap-bounce-title",
            { y: -80, opacity: 0, scale: 0.7 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: ".gsap-bounce-title",
                    start: "top 80%",
                    end: "top 30%",
                    toggleActions: "play reverse play reverse",
                    onLeaveBack: () => {
                        gsap.to(".gsap-bounce-title", {
                            y: 60,
                            opacity: 0.5,
                            scale: 0.85,
                            duration: 0.7,
                            ease: "power2.in"
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(".gsap-bounce-title", {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.1,
                            ease: "bounce.out"
                        });
                    }
                }
            }
        );
    }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Header scroll effect
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

function updateHeader() {
    if (window.scrollY > 100) {
        header.classList.remove('transparent');
    } else {
        header.classList.add('transparent');
    }
}

window.addEventListener('scroll', updateHeader);
updateHeader(); // Initial call

// Mobile menu toggle (fix: check for existence and ensure only one event listener)
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('mobileNav');
    // Open/close menu with smooth exit
    hamburger.addEventListener('click', function () {
        if (!navMenu.classList.contains('open')) {
            hamburger.classList.add('active');
            navMenu.classList.add('open');
            navMenu.classList.remove('closing');
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            hamburger.classList.remove('active');
            navMenu.classList.add('closing');
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            setTimeout(() => {
                navMenu.classList.remove('closing');
            }, 400); // match CSS transition duration
        }
    });
    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
            hamburger.classList.remove('active');
            navMenu.classList.add('closing');
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            setTimeout(() => {
                navMenu.classList.remove('closing');
            }, 400);
        }
    });
    // Highlight active link
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-link').forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');
            hamburger.classList.remove('active');
            navMenu.classList.add('closing');
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            setTimeout(() => {
                navMenu.classList.remove('closing');
            }, 400);
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Swiper for gallery
const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});

// Contact Modal functions
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.elements['name'].value;
    const email = this.elements['email'].value;
    const message = this.elements['message'].value;

    // Compose mailto link
    const mailto = `mailto:support@dvcorp.org?subject=Contact%20Form%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;

    // Open mail client
    window.location.href = mailto;

    // Optionally show a message or close modal
    closeContactModal();
});

// Contact form handling (AJAX version, kept for reference)
// document.getElementById('contactForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     const formData = new FormData(this);
//     const submitButton = this.querySelector('button[type="submit"]');
//     const originalText = submitButton.textContent;
    
//     // Show loading state
//     submitButton.textContent = 'Sending...';
//     submitButton.disabled = true;
    
//     try {
//         // Simulate form submission (replace with actual endpoint)
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         // Show success message
//         showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
//         this.reset();
        
//         // Close modal after success
//         setTimeout(() => {
//             closeContactModal();
//         }, 2000);
        
//     } catch (error) {
//         showFormMessage('Failed to send message. Please try again.', 'error');
//     } finally {
//         submitButton.textContent = originalText;
//         submitButton.disabled = false;
//     }
// });

// function showFormMessage(message, type) {
//     const existingMessage = document.querySelector('.form-message');
//     if (existingMessage) {
//         existingMessage.remove();
//     }
    
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `form-message form-${type}`;
//     messageDiv.textContent = message;
    
//     const form = document.getElementById('contactForm');
//     form.appendChild(messageDiv);
    
//     // Remove message after 5 seconds
//     setTimeout(() => {
//         messageDiv.remove();
//     }, 5000);
// }

// Intersection Observer for animation triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for custom animations
document.querySelectorAll('.venture-card, .trust-item').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 300);
        }
    });
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll indicator functionality
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelector('.footer-bottom p').innerHTML = 
    `&copy; ${currentYear} DeFreitas Ventures Inc. All rights reserved.`;

// Add smooth hover effects to venture cards
document.querySelectorAll('.venture-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// WhatsApp float button animation (disable animation and transform)
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
    whatsappFloat.style.animation = 'none';
    whatsappFloat.style.transform = 'none';
}

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load (commented out by default)
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typeWriter(heroTitle, originalText, 50);
//     }
// });

function createOrangeBubbles() {
    const container = document.querySelector('.orange-bubbles');
    if (!container) return;
    container.innerHTML = '';
    const bubbleCount = 7;
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'orange-bubble';
        const size = Math.random() * 40 + 20; // 20px to 60px
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 80 + 5}%`;
        bubble.style.top = `${Math.random() * 80 + 5}%`;
        bubble.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
        bubble.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(bubble);
    }
    // Randomize opacity every 2s
    setInterval(() => {
        container.querySelectorAll('.orange-bubble').forEach(bubble => {
            bubble.style.opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
        });
    }, 2000);
}

document.addEventListener('DOMContentLoaded', createOrangeBubbles);

console.log('DeFreitas Ventures Inc. - Website loaded successfully');

// Smooth scrolling for project and contact buttons
document.addEventListener('DOMContentLoaded', function () {
    const projectBtn = document.getElementById('scrollToProjectBtn');
    if (projectBtn) {
        projectBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById('project');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    const contactBtn = document.getElementById('scrollToContactBtn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById('contact');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

