// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
    if (totalSlides === 0) return;
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Add active class to current slide
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    if (totalSlides === 0) return;
    showSlide(currentSlide + direction);
}

// Auto-advance carousel every 5 seconds
if (totalSlides > 0) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Initialize first slide
if (slides.length > 0) {
    showSlide(0);
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.navbar')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

const heroSection = document.querySelector('.hero');
let carouselScrollLocked = false;
if (heroSection && totalSlides > 0) {
    heroSection.addEventListener('wheel', function (e) {
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetIndex = currentSlide + direction;

        if (targetIndex >= 0 && targetIndex < totalSlides) {
            e.preventDefault();
            if (!carouselScrollLocked) {
                carouselScrollLocked = true;
                changeSlide(direction);
                setTimeout(() => {
                    carouselScrollLocked = false;
                }, 700);
            }
        }
    }, { passive: false });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll Animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and other elements
document.querySelectorAll('.product-card, .feature, .value-item, .team-member').forEach(element => {
    observer.observe(element);
});

// Add scroll event for navbar shadow
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form Validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b9d';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    return isValid;
}

// Add active class to current page link
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Sticky category nav link highlight based on section in view
    const sections = document.querySelectorAll('#cups, #bars, #watercandy, #cones, #specials, #kulfi');
    const categoryLinks = document.querySelectorAll('.sticky-category-nav a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                categoryLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-60px 0px -60% 0px',
        threshold: 0.2
    });

    sections.forEach(section => sectionObserver.observe(section));
});

// Handle see all button for product sections
document.addEventListener('DOMContentLoaded', function () {
    const seeAllButtons = document.querySelectorAll('.see-all-btn');
    seeAllButtons.forEach(button => {
        button.addEventListener('click', function () {
            const section = this.closest('.product-section');
            const hiddenItems = section.querySelectorAll('.hidden-item');
            const isExpanded = this.textContent === 'See Less';

            hiddenItems.forEach(item => {
                item.style.display = isExpanded ? 'none' : 'block';
            });

            this.textContent = isExpanded ? 'See All' : 'See Less';
        });
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Keyboard navigation for carousel
document.addEventListener('keydown', function (e) {
    if (totalSlides === 0) return;
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});


console.log('MY CHOICE Ice Creams website loaded successfully!');
