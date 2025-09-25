// script.js - Updated for Bergmann Productions

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu && 
            !hamburger.contains(event.target) && 
            !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Gallery Filter Functionality (Homepage and Reviews)
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .review-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

/*// Gallery Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const titleEl = this.querySelector('.gallery-overlay h4');
            const descEl = this.querySelector('.gallery-overlay p');
            
            if (img && titleEl && descEl) {
                const title = titleEl.textContent;
                const description = descEl.textContent;
                openLightbox(img.src, title, description);
            }
        });
    });
});*/

function openLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
    
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        const originalButtonText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        setTimeout(() => {
            showMessage('Thank you for subscribing! You\'ll receive our newsletter soon.', 'success', this);
            this.reset();
            button.textContent = originalButtonText;
            button.disabled = false;
        }, 1500);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;
        
        button.innerHTML = '<span>Sending...</span>';
        button.disabled = true;
        
        setTimeout(() => {
            showMessage('Thank you for your message! I\'ll get back to you within 24 hours.', 'success', this);
            this.reset();
            button.innerHTML = originalButtonText;
            button.disabled = false;
        }, 2000);
    });
}

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    // Show partner info for weddings/couples
    const packageSelect = document.getElementById('package');
    const partnerInfo = document.getElementById('partnerInfo');
    
    if (packageSelect && partnerInfo) {
        packageSelect.addEventListener('change', function() {
            if (this.value === 'wedding' || this.value === 'engagement') {
                partnerInfo.style.display = 'block';
            } else {
                partnerInfo.style.display = 'none';
            }
        });
    }
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('button[type="submit"]');
        const originalButtonText = button.innerHTML;
        
        button.innerHTML = '<span>Submitting...</span>';
        button.disabled = true;
        
        setTimeout(() => {
            showMessage('Thank you for your booking request! I\'ll review your details and respond within 24 hours with availability and next steps.', 'success', this);
            this.reset();
            button.innerHTML = originalButtonText;
            button.disabled = false;
            if (partnerInfo) partnerInfo.style.display = 'none';
        }, 2500);
    });
}

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Package Selection on Book Page
document.addEventListener('DOMContentLoaded', function() {
    const packageButtons = document.querySelectorAll('.package-btn');
    const packageSelect = document.getElementById('package');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            if (packageSelect) {
                packageSelect.value = packageType;
                
                // Scroll to booking form
                const bookingSection = document.querySelector('.booking-form-section');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Load More Reviews
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more reviews
        this.textContent = 'Loading...';
        
        setTimeout(() => {
            this.textContent = 'All Reviews Loaded';
            this.disabled = true;
            showMessage('All available reviews have been loaded!', 'success');
        }, 1000);
    });
}

// Helper function to show messages
function showMessage(text, type, form = null) {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert message
    if (form) {
        form.parentNode.insertBefore(message, form.nextSibling);
    } else {
        document.body.appendChild(message);
    }
    
    // Show message with animation
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    // Hide message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.style.opacity = '0';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }
    }, 5000);
}

// CTA Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton && ctaButton.textContent.includes('View My Work')) {
        ctaButton.addEventListener('click', function() {
            const gallery = document.querySelector('.featured-gallery');
            if (gallery) {
                gallery.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.gallery-item, .review-card, .about-content, .contact-info, .contact-form, .booking-step, .package-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Set minimum date for booking forms
document.addEventListener('DOMContentLoaded', function() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
    });
});