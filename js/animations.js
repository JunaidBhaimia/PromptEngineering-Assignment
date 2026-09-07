/* =============================================
   JUNAI BHAIMIA UNIVERSITY — ANIMATIONS MODULE
   Handles scroll-triggered fade-ins and counter animations.
   Uses IntersectionObserver — no libraries needed.
   ============================================= */

(function () {
    'use strict';

    // ---- Scroll-Triggered Fade-In Animations ----
    // Elements with class "animate-on-scroll" will fade/slide in when visible
    var animElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            },
            {
                threshold: 0.15, // Trigger when 15% of element is visible
                rootMargin: '0px 0px -50px 0px' // Slight offset so element is mostly in view
            }
        );

        animElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: show everything immediately
        animElements.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    // ---- Animated Counters ----
    // Numbers inside .stat-number elements with data-target attribute
    // will animate counting up when their container scrolls into view
    var statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        var counterObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% visible
        );

        statNumbers.forEach(function (el) {
            counterObserver.observe(el);
        });
    }

    /**
     * Animate a single counter element from 0 to its target value.
     * @param {HTMLElement} element - The element containing the counter
     */
    function animateCounter(element) {
        var target = parseInt(element.getAttribute('data-target'), 10);
        var duration = 2000; // Animation duration in milliseconds
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);

            // Ease-out effect: slow down near the end
            var easedProgress = 1 - Math.pow(1 - progress, 3);
            var currentValue = Math.floor(easedProgress * target);

            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure final value matches exactly
                element.textContent = target;
            }
        }

        requestAnimationFrame(step);
    }
})();
