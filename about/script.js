// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.timeline()
    .from('.breadcrumb', { duration: 1, y: 30, opacity: 0, delay: 0.5 })
    .from('.hero-title', { duration: 1, y: 50, opacity: 0, delay: 0.2 })
    .from('.hero-subtitle', { duration: 1, y: 30, opacity: 0, delay: 0.2 })
    .from('.hero-cta', { duration: 1, y: 30, opacity: 0, delay: 0.2 });

// Story section animations
gsap.fromTo('.story-image', 
    { x: -100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

gsap.fromTo('.story-text', 
    { x: 100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Values section animations
gsap.fromTo('.value-card', 
    { y: 80, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.values-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Leadership section animations
gsap.fromTo('.leadership-quote', 
    { scale: 0.8, opacity: 0 },
    {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.leadership-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

gsap.fromTo('.leadership-text', 
    { x: 100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: '.leadership-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Timeline animations
gsap.fromTo('.timeline-item', 
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Timeline progress animation
gsap.fromTo('.timeline::before', 
    { scaleY: 0 },
    {
        scaleY: 1,
        duration: 2,
        transformOrigin: 'top center',
        scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Differentiators section animations
gsap.fromTo('.differentiator-card', 
    { y: 60, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.differentiators-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// CTA section animations
gsap.fromTo('.cta-content h2', 
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

gsap.fromTo('.cta-buttons', 
    { y: 30, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    }
);

// Smooth scrolling for anchor links
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

// Parallax effect for hero background
gsap.to('.hero-background', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Add intersection observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.value-card, .differentiator-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Add hover effects for interactive elements
document.querySelectorAll('.value-card, .differentiator-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, { duration: 0.3, y: -10, ease: 'power2.out' });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, { duration: 0.3, y: 0, ease: 'power2.out' });
    });
});

// Loading animation
window.addEventListener('load', () => {
    gsap.to('.hero-background', {
        duration: 1.5,
        scale: 1.1,
        ease: 'power2.out'
    });
});

// Animate footer elements on scroll
document.addEventListener('DOMContentLoaded', function () {
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.animate-footer').forEach((el, i) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: i * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
});

