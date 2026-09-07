/* =============================================
   JUNAI BHAIMIA UNIVERSITY — NAVIGATION MODULE
   Handles sticky navbar, mobile menu, active state.
   ============================================= */

(function () {
    'use strict';

    // ---- DOM References ----
    var navbar = document.getElementById('navbar');
    var hamburgerBtn = document.getElementById('hamburger-btn');
    var navMenu = document.getElementById('nav-menu');
    var navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];

    // ---- Sticky Navbar Effect ----
    // Change navbar appearance when user scrolls down
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    // Attach scroll listener with throttle
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) >= 50) {
            handleScroll();
            lastScroll = currentScroll;
        }
    });

    // ---- Mobile Menu Toggle ----
    function openMenu() {
        if (!navMenu || !hamburgerBtn) return;
        navMenu.classList.add('nav-menu--open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMenu() {
        if (!navMenu || !hamburgerBtn) return;
        navMenu.classList.remove('nav-menu--open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Hamburger click toggle
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function () {
            var isOpen = navMenu.classList.contains('nav-menu--open');
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when clicking a nav link (mobile behavior)
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function () {
            closeMenu();
        });
    }

    // Close menu on outside click
    document.addEventListener('click', function (event) {
        if (!navMenu || !navMenu.classList.contains('nav-menu--open')) return;
        if (!navbar.contains(event.target)) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navMenu && navMenu.classList.contains('nav-menu--open')) {
            closeMenu();
        }
    });

    // ---- Active Page State ----
    // Highlight current page in navigation
    setActivePage();

    function setActivePage() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        for (var i = 0; i < navLinks.length; i++) {
            var link = navLinks[i];
            var linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('nav-link--active');
            } else {
                link.classList.remove('nav-link--active');
            }
        }
    }
})();
