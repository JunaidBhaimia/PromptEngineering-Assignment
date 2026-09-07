/* =============================================
   JUNAI BHAIMIA UNIVERSITY — PAGE INTERACTIONS MODULE
   Handles testimonial slider, back-to-top button,
   FAQ accordions, form validation, and more.
   No libraries needed.
   ============================================= */

(function () {
    'use strict';

    // ---- Back-to-Top Button ----
    var backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Testimonial Slider ----
    initTestimonialSlider();

    function initTestimonialSlider() {
        var track = document.querySelector('.testimonial-slider__track');
        var slides = track ? track.querySelectorAll('.testimonial-slider__slide') : [];
        var dotsContainer = document.querySelector('.testimonial-dots');
        var prevBtn = document.getElementById('testimonial-prev');
        var nextBtn = document.getElementById('testimonial-next');

        if (!track || slides.length === 0) return;

        var currentIndex = 0;
        var totalSlides = slides.length;

        // Create navigation dots
        if (dotsContainer && totalSlides > 1) {
            for (var i = 0; i < totalSlides; i++) {
                var dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function (index) {
                    goToSlide(index);
                }.bind(null, i));
                dotsContainer.appendChild(dot);
            }
        }

        // Previous/Next buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goToLeft();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goToRight();
            });
        }

        /**
         * Move to a specific slide by index
         * @param {number} index - The slide index to move to
         */
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;

            // Move the track
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

            // Update active dot
            if (dotsContainer) {
                var dots = dotsContainer.querySelectorAll('.testimonial-dot');
                dots.forEach(function (dot, i) {
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        function goToLeft() {
            goToSlide(currentIndex - 1);
        }

        function goToRight() {
            goToSlide(currentIndex + 1);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') goToLeft();
            if (event.key === 'ArrowRight') goToRight();
        });
    }

    // ---- FAQ Accordion ----
    // Works on any page that has .accordion-item elements
    initAccordions();

    function initAccordions() {
        var accordionItems = document.querySelectorAll('.accordion-item');

        accordionItems.forEach(function (item) {
            var questionBtn = item.querySelector('.accordion-question');

            if (questionBtn) {
                questionBtn.addEventListener('click', function () {
                    toggleAccordion(item);
                });
            }
        });
    }

    /**
     * Toggle an accordion item open/closed
     * @param {HTMLElement} item - The accordion container
     */
    function toggleAccordion(item) {
        var answer = item.querySelector('.accordion-answer');
        var isOpen = item.classList.contains('is-open');

        // Close all other accordions (optional - remove for multi-open)
        var allItems = document.querySelectorAll('.accordion-item');
        allItems.forEach(function (otherItem) {
            if (otherItem !== item) {
                otherItem.classList.remove('is-open');
                var otherAnswer = otherItem.querySelector('.accordion-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            }
        });

        if (isOpen) {
            item.classList.remove('is-open');
            answer.style.maxHeight = null;
        } else {
            item.classList.add('is-open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    }

    // ---- Category Filtering ----
    // Used on News, Events, Gallery, Academics pages
    initFilters();

    function initFilters() {
        var filterButtons = document.querySelectorAll('.filter-btn');
        var items = document.querySelectorAll('.filterable-item');

        if (filterButtons.length === 0 || items.length === 0) return;

        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filterValue = btn.getAttribute('data-filter');

                // Update active button
                var allButtons = btn.closest('.filters').querySelectorAll('.filter-btn');
                allButtons.forEach(function (b) { b.classList.remove('filter-btn--active'); });
                btn.classList.add('filter-btn--active');

                // Show/hide items
                items.forEach(function (item) {
                    var category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ---- Contact Form Validation ----
    initContactForm();

    function initContactForm() {
        var form = document.getElementById('contact-form');

        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var isValid = validateForm(form);

            if (isValid) {
                var submitBtn = form.querySelector('button[type="submit"]');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate submission (no real backend)
                setTimeout(function () {
                    form.innerHTML = '<div class="form-success">Thank you. Your message has been recorded for this demonstration.</div>';
                }, 800);
            }
        });
    }

    /**
     * Validate the contact form fields
     * @param {HTMLFormElement} form - The form element
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(form) {
        var nameInput = form.querySelector('#contact-name');
        var emailInput = form.querySelector('#contact-email');
        var subjectInput = form.querySelector('#contact-subject');
        var messageInput = form.querySelector('#contact-message');
        var isValid = true;

        // Reset previous error states
        var errorFields = form.querySelectorAll('.input-error');
        errorFields.forEach(function (el) {
            el.classList.remove('input-error');
        });

        // Validate name
        if (!nameInput || nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name.');
            isValid = false;
        }

        // Validate email
        if (!emailInput || !isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate subject
        if (!subjectInput || subjectInput.value.trim() === '') {
            showError(subjectInput, 'Please select a subject.');
            isValid = false;
        }

        // Validate message
        if (!messageInput || messageInput.value.trim().length < 10) {
            showError(messageInput, 'Please enter a message (at least 10 characters).');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Check if a string is a valid email format
     * @param {string} email - The email to validate
     * @returns {boolean}
     */
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Show an error state on an input field
     * @param {HTMLElement} input - The input element
     * @param {string} message - The error message
     */
    function showError(input, message) {
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');

        // Add or update error message element
        var existingMsg = input.parentNode.querySelector('.field-error');
        if (existingMsg) {
            existingMsg.textContent = message;
        } else {
            var errorMsg = document.createElement('span');
            errorMsg.classList.add('field-error');
            errorMsg.textContent = message;
            errorMsg.style.color = '#dc2626';
            errorMsg.style.fontSize = '0.8rem';
            errorMsg.style.marginTop = '0.25rem';
            errorMsg.style.display = 'block';
            input.parentNode.appendChild(errorMsg);
        }
    }

    // ---- Governance Modal ----
    initGovernanceModal();

    function initGovernanceModal() {
        var modal = document.getElementById('member-modal');
        var modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
        var modalClose = modal ? document.getElementById('modal-close') : null;
        var triggerButtons = document.querySelectorAll('.board-member-card[data-bio]');

        if (!modal) return;

        // Open modal with member data
        triggerButtons.forEach(function (card) {
            card.addEventListener('click', function () {
                var bio = card.getAttribute('data-bio');
                var qualifications = card.getAttribute('data-qualifications');
                var experience = card.getAttribute('data-experience');

                var modalName = modal.querySelector('.modal-member-name');
                var modalBio = modal.querySelector('.modal-member-bio');
                var modalQual = modal.querySelector('.modal-member-qualifications');
                var modalExp = modal.querySelector('.modal-member-experience');

                if (modalName) modalName.textContent = card.getAttribute('data-name');
                if (modalBio) modalBio.textContent = bio;
                if (modalQual) modalQual.textContent = qualifications || '';
                if (modalExp) modalExp.textContent = experience || '';

                modal.classList.add('modal--open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close functions
        function closeModal() {
            modal.classList.remove('modal--open');
            document.body.style.overflow = '';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }

        // Escape key close
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('modal--open')) {
                closeModal();
            }
        });
    }

    // ---- Gallery Lightbox ----
    initLightbox();

    function initLightbox() {
        var lightbox = document.getElementById('gallery-lightbox');
        var lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
        var lightboxCounter = lightbox ? lightbox.querySelector('.lightbox-counter') : null;
        var images = document.querySelectorAll('.gallery-item img');
        var currentIndex = 0;

        if (!lightbox || !lightboxImage) return;

        // Open lightbox on image click
        images.forEach(function (img, index) {
            img.addEventListener('click', function () {
                currentIndex = index;
                showLightboxImage(img.src, index + 1, images.length);
                lightbox.classList.add('lightbox--open');
                document.body.style.overflow = 'hidden';
            });
        });

        function showLightboxImage(src, current, total) {
            lightboxImage.src = src;
            lightboxImage.alt = 'Gallery image ' + current + ' of ' + total;
            if (lightboxCounter) {
                lightboxCounter.textContent = current + ' / ' + total;
            }
        }

        function closeLightbox() {
            lightbox.classList.remove('lightbox--open');
            document.body.style.overflow = '';
        }

        // Navigation buttons
        var lbPrev = lightbox.querySelector('.lightbox-prev');
        var lbNext = lightbox.querySelector('.lightbox-next');
        var lbClose = lightbox.querySelector('.lightbox-close');

        if (lbPrev) {
            lbPrev.addEventListener('click', function () {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightboxImage(images[currentIndex].src, currentIndex + 1, images.length);
            });
        }

        if (lbNext) {
            lbNext.addEventListener('click', function () {
                currentIndex = (currentIndex + 1) % images.length;
                showLightboxImage(images[currentIndex].src, currentIndex + 1, images.length);
            });
        }

        if (lbClose) {
            lbClose.addEventListener('click', closeLightbox);
        }

        // Background click to close
        var lbOverlay = lightbox.querySelector('.lightbox-overlay');
        if (lbOverlay) {
            lbOverlay.addEventListener('click', closeLightbox);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function (event) {
            if (!lightbox.classList.contains('lightbox--open')) return;

            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showLightboxImage(images[currentIndex].src, currentIndex + 1, images.length);
            }
            if (event.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                showLightboxImage(images[currentIndex].src, currentIndex + 1, images.length);
            }
        });
    }

    // ---- Smooth Scrolling for Anchor Links ----
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip # links without a target

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                var offset = navbar ? navbar.offsetHeight : 80;
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

})();
