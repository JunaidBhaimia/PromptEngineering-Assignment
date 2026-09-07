# Junaid Bhaimia University — Public Website

**JBU** — *Learn. Lead. Create.*

A modern, visually rich public university website built with **HTML5**, **CSS3**, and **Vanilla JavaScript** only. No frameworks, no build tools, no dependencies — just clean, understandable code suitable for MCA students to read, modify, and explain.

---

## Live Preview

Open `index.html` in any modern browser to view the website locally.

---

## Project Structure

```
junaid-bhaimia-university/
├── index.html                    Homepage with hero, stats, programs, events, news & testimonials
├── about.html                    History, vision/mission, core values, milestone timeline
├── academics.html                6 faculties overview + program catalog with degree filtering
├── admissions.html               Application process, scholarships, fees table, FAQ accordion
├── research.html                 Research statistics, centers of excellence, labs, partnerships
├── placements.html               Placement data, career services, alumni success stories
├── governance.html               Board members, leadership profiles + click-to-open detail modal
├── news.html                     Featured story, news cards with search + category filtering
├── events.html                   Upcoming/past events with date, venue info + category filter
├── gallery.html                  Image grid with category filtering + full lightbox viewer
├── contact.html                  Contact form (validated), office hours, enquiry directory
├── PROJECT_STATUS.md             Development tracking log
├── README.md                     This file
│
├── css/
│   ├── style.css                 Global design tokens, reset, typography, buttons, cards, utilities
│   ├── responsive.css            Breakpoint rules (480px → 1440px)
│   └── pages.css                 Home page-specific overrides (hero, stats, testimonials, CTA, etc.)
│
├── js/
│   ├── main.js                   Entry point — initializes scripts on DOMContentLoaded
│   ├── navigation.js             Sticky navbar, mobile hamburger menu, scroll state, active link highlighting
│   ├── animations.js             IntersectionObserver fade-in animations, animated stat counters
│   └── pages.js                  Testimonial slider, FAQ accordion, category filters, form validation,
│                                   governance member modal, gallery lightbox, back-to-top button, smooth scroll
│
└── images/                       Placeholder folders ready for real image assets
    ├── campus/
    ├── academics/
    ├── governance/
    ├── events/
    └── gallery/
```

---

## Pages Overview

| Page | Description | Key Features |
|------|-------------|--------------|
| **Home** | Landing page with hero, marquee, intro, stats, programs preview, campus showcase, research highlights, CTA, news/events previews, testimonials | Animated counters, testimonial slider, scroll-triggered animations, marquee ticker |
| **About** | University history, vision & mission statements, six core values, interactive milestone timeline | Vertical timeline layout, alternating card design |
| **Academics** | Six faculty listings, nine program cards with details | Degree-type filtering (All / Undergraduate / Postgraduate / Doctoral) |
| **Admissions** | Five-step application process, important dates, scholarships, fee table, required documents | FAQ accordion, step-by-step visual flow |
| **Research** | Statistics overview, four research centers, six innovation labs, industry partnerships, opportunities | Animated stat counters, gradient cards |
| **Placements** | Placement statistics, cell description, career services, recruitment pipeline, alumni success stories | Stat dashboard, quote cards, step indicators |
| **Governance** | Board meeting photo section, six leadership profiles, eight board members with detail modals | Click-to-open modal (name, bio, qualifications, experience), keyboard/escape closing |
| **News** | Featured story card, nine article cards | Search bar, category filtering (Achievement / Academic / Research / Campus) |
| **Events** | Six upcoming events, four past events with date/time/venue details | Category filtering, RSVP buttons |
| **Gallery** | Twelve image items in responsive grid | Category filtering (Campus / Academics / Events / Sports / Cultural), lightbox with prev/next/keyboard nav |
| **Contact** | Contact info cards, quick enquiry directory, validated form, office hours schedule, map placeholder, social links | Form field validation, error messages, simulated submission success |

---

## Interactive Features

| # | Feature | Implemented In |
|---|---------|----------------|
| 1 | Responsive mobile hamburger menu | `navigation.js` |
| 2 | Sticky navbar (background changes on scroll) | `navigation.js` |
| 3 | Scroll-triggered fade-in animations | `animations.js` |
| 4 | Animated number counters | `animations.js` |
| 5 | FAQ accordion | `pages.js` |
| 6 | Testimonial slider | `pages.js` |
| 7 | Gallery category filtering | `pages.js` |
| 8 | Gallery lightbox | `pages.js` |
| 9 | Governance member modal | `pages.js` |
| 10 | News category filtering | `pages.js` |
| 11 | Academic degree-type filtering | `pages.js` |
| 12 | Contact form validation | `pages.js` |
| 13 | Back-to-top button | `pages.js` |
| 14 | Smooth scrolling for anchor links | `pages.js` |
| 15 | Active navigation link highlighting | `navigation.js` |
| 16 | Escape-key modal/lightbox closing | `pages.js` |
| 17 | Keyboard gallery navigation (arrow keys) | `pages.js` |

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#0b1220` | Deep navy — backgrounds, headings, footer |
| `--dark` | `#111111` | Near black — body text |
| `--white` | `#ffffff` | Cards, content areas |
| `--cream` | `#f5f3ee` | Warm off-white — alt section backgrounds |
| `--accent` | `#9b1c31` | Burgundy/deep red — CTAs, highlights, badges |
| `--gold` | `#c9a227` | Subtle gold — decorative lines, accents, logo |
| `--gray` | `#6b7280` | Body text secondary, labels |

### Typography

- **Headings:** Georgia / Times New Roman (serif)
- **Body:** Segoe UI / Arial (sans-serif)
- Uses CSS `clamp()` for fluid responsive font sizes

### Responsive Breakpoints

| Breakpoint | Target Devices |
|------------|---------------|
| Base (mobile-first) | All devices below 480px |
| 480px | Small phones |
| 768px | Tablets |
| 992px | Laptops |
| 1200px | Desktops |
| 1440px | Large desktops |

---

## How It Works

### No Build Tools

This project runs directly from the file system — no Node.js, no bundlers, no compilers. Just open `index.html` in a browser.

### Modular JavaScript

Each JS file handles one concern:

- **`main.js`** — Entry point that fires when the DOM is ready
- **`navigation.js`** — Navbar behavior (sticky, hamburger toggle, escape-close, active state)
- **`animations.js`** — `IntersectionObserver` for scroll-based fade-ins and counter animations
- **`pages.js`** — Page-specific interactions (sliders, accordions, filters, forms, modals, lightbox)

All modules use Immediately Invoked Function Expressions (IIFEs) to avoid global scope pollution.

### CSS Architecture

Three layers of styling:

1. **`style.css`** — Global resets, variables, shared components (buttons, cards, marquee, animations)
2. **`responsive.css`** — Breakpoint-specific adjustments
3. **`pages.css`** — Page-specific overrides (hero, stats, testimonials, etc.)

Each HTML page includes inline `<style>` blocks for unique layouts (timelines, modals, lightboxes, banners) to keep things simple and self-contained per-page.

---

## Accessibility

- Semantic HTML5 elements (`nav`, `section`, `article`, `footer`, `main`)
- ARIA roles, labels, and attributes throughout
- `focus-visible` outline styles for keyboard users
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on images, `aria-label` on icon-only buttons
- Keyboard navigation support (tabs for menus, arrow keys for gallery/typewriter slides, Escape to close modals)

---

## Customization Guide

### Adding Real Images

Replace the CSS gradient placeholders in each page with actual images:

1. Place image files in the corresponding `images/` subfolder
2. Replace the placeholder `<div>` elements with `<img src="images/folder/photo.jpg">` tags
3. Adjust aspect-ratio CSS as needed

### Adding More Programs or News Articles

Copy an existing card element inside its container, update the text/content, and add the correct `data-degree` or `data-category` attribute so filtering works correctly.

### Adding More Gallery Items

Add another `.gallery-item` div with the matching `data-category` attribute inside the `.gallery-grid`. The lightbox auto-detects all items.

---

## Technology Stack

- **HTML5** — Structured, semantic markup
- **CSS3** — Custom properties, Flexbox, Grid, transitions, keyframe animations, media queries, clamp()
- **JavaScript (ES5)** — IIFEs, vanilla DOM APIs, IntersectionObserver, requestAnimationFrame — zero libraries

---

## License

Educational project — Junaid Bhaimia University (fictional). Built for demonstration purposes.
