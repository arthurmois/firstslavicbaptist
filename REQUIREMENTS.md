# First Slavic Baptist Church — Website Requirements

**Domain:** firstslavicbaptist.org  
**Stack:** Static HTML/CSS/JS (no build tool required)

---

## 1. Language Landing Page

- First page visitors see is a full-screen language selector
- Two prominent buttons: **English** and **Русский (Russian)**
- Choice routes to `/en/` or `/ru/` versions of the site
- Optionally remember choice in `localStorage` to skip on return visits

---

## 2. Branding

- **Church name:** First Slavic Baptist Church  
- **Logo:** `slavic_church_business_cards_front.jpeg` (provided)
- Consistent use of name and logo across both language versions

### Brand Colors

| Role           | Hex       | Notes                                          |
|----------------|-----------|------------------------------------------------|
| Primary        | `#9f3168` | Deep raspberry — main accent, headings, CTAs   |
| Secondary      | `#8A95A3` | Slate gray — pulled from the logo, neutral text/UI |

---

## 3. Church Info

- **Address:** 633 E Louetta Road, Spring, Texas 77373
- **Service day & time:** Sundays at 6:00 PM
- **Key verse (NASB):** Matthew 11:28 — *"Come to Me, all who are weary and heavy-laden, and I will give you rest."*
- Display verse prominently on the homepage hero section

---

## 4. Leadership / About Section

- Photo of Art and his family — `art_and_family.jpg` (provided)
- Short pastoral bio — *to come later* (both English and Russian)

---

## 5. Photo Gallery

- Section featuring photos of:
  - The church building (exterior & interior)
  - Congregation / people
- Lightweight gallery — CSS grid or simple lightbox, no heavy JS dependencies

---

## 6. Social Media Links

| Platform  | Link                                                                          |
|-----------|-------------------------------------------------------------------------------|
| Facebook  | https://www.facebook.com/profile.php?id=61566875494496                        |
| Instagram | https://www.instagram.com/slavic_baptist_church_                              |
| YouTube   | https://www.youtube.com/@ArtKamyshin                                          |

- Icons in header and/or footer
- Links open in new tab

---

## 7. Maps Integration

- Embed **Google Maps** and link to **Apple Maps** for the church address
- "Get Directions" button that:
  - On iOS/macOS → opens Apple Maps
  - On Android/other → opens Google Maps
- Embedded map on the Contact / Find Us section

---

## 8. SEO

### Technical SEO
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- Unique `<title>` and `<meta name="description">` per page and per language
- Canonical tags to prevent duplicate content between `/en/` and `/ru/`
- `hreflang` tags for language alternates (`en`, `ru`)
- `robots.txt` and `sitemap.xml`
- Fast load: minified CSS/JS, compressed images (WebP), no render-blocking resources

### Local SEO
- **Google Business Profile** — ensure listing matches site NAP (Name, Address, Phone)
- Structured data (JSON-LD) for `LocalBusiness` / `Church`:
  - Name, address, opening hours, geo coordinates, social profiles
- NAP (Name, Address, Phone) consistent across site, Google, Facebook, Apple Maps

### Content SEO
- Target keywords: "Slavic Baptist church Spring Texas", "Russian church Houston", "Baptist church Spring TX"
- Alt text on all images
- Descriptive `href` text on all links (no "click here")
- Open Graph and Twitter Card meta tags for social sharing previews

---

## 9. Pages / Sections (Single-Page or Multi-Page)

| Section       | Content                                              |
|---------------|------------------------------------------------------|
| Hero          | Church name, verse, service time, CTA (Get Directions)|
| About         | Mission statement, pastoral bio & photo              |
| Services      | Service schedule, what to expect                     |
| Gallery       | Photo grid of church & people                        |
| Contact/Find Us | Address, embedded map, Apple/Google Maps button, social links |
| Footer        | Logo, copyright, quick links, social icons           |

---

## 10. Assets Needed (from client)

- [x] Church logo — `slavic_church_business_cards_front.jpeg`
- [x] Photo of Art and his family — `art_and_family.jpg`
- [ ] Pastoral bio text (English and Russian) — *to come later*
- [ ] Church building photos (exterior)
- [ ] Interior / congregation photos
- [x] Social media profile URLs (Facebook, Instagram, YouTube)
- [ ] Phone number (optional but good for local SEO)
- [x] Brand colors — primary `#9f3168`, secondary `#8A95A3`

---

## 11. Accessibility

- WCAG 2.1 AA minimum
- Sufficient color contrast
- Keyboard navigable
- `lang` attribute set correctly (`en` / `ru`) per page

---

## 12. Architecture, Repository & Deployment Plan

### Architecture

Static site, no build step — plain HTML, CSS, and vanilla JS. Bilingual via two
parallel subfolders that share a single asset base.

**Folder structure**

```
firstslavicbaptist/
├── index.html              # Language landing page (English / Русский selector)
├── en/
│   └── index.html          # English single-page site
├── ru/
│   └── index.html          # Russian single-page site
├── assets/
│   ├── css/
│   │   └── styles.css      # One shared stylesheet for all pages
│   ├── js/
│   │   └── main.js         # Shared JS (lang routing, gallery, maps button)
│   └── img/                # Optimized, web-ready images (WebP)
│       ├── logo.webp
│       ├── art-and-family.webp
│       └── gallery/
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── CNAME                   # Custom domain for GitHub Pages
└── .gitignore
```

**Key decisions**

- Each language is a single scrollable page with anchor nav (`#about`,
  `#services`, `#gallery`, `#contact`).
- Root `index.html` is the full-screen language selector; it writes the choice to
  `localStorage` and redirects returning visitors straight to `/en/` or `/ru/`.
- CSS and JS are shared across all pages — only the HTML text differs per
  language. No duplicated styling.
- `hreflang` + canonical tags cross-link `/en/` and `/ru/` (see §8).
- No framework, no bundler — keeps load fast and hosting trivial.

**Trade-off:** `en/index.html` and `ru/index.html` duplicate page structure (only
text differs). Acceptable for a ~5-section site; if it grows, revisit with a
lightweight templating/build step.

### Image handling

Source photos are large (e.g. `art_and_family.jpg` ≈ 2.2 MB). With no build tool,
optimize manually before committing:

- Keep originals in an `originals/` folder, **gitignored** — never served.
- Commit only resized, compressed **WebP** into `assets/img/`.
- Target: hero/photo images < 200 KB, gallery thumbnails < 80 KB.

### GitHub

- **Repo:** `firstslavicbaptist` under the church/owner account.
- **Branch:** `main` is the single source of truth and the deploy branch.
- **.gitignore:** `.DS_Store`, `originals/`, `node_modules/`.
- Small, descriptive commits. Optionally protect `main` once the site is live.

### Hosting & DNS — recommended: GitHub Pages

GitHub Pages serves the repo directly, free, with automatic HTTPS — the simplest
path for a static site already in GitHub.

1. Repo **Settings → Pages** → deploy from `main`, root (`/`).
2. Add a `CNAME` file containing `firstslavicbaptist.org`.
3. **DNS** at the domain registrar:
   - Apex `@`: four `A` records → GitHub Pages IPs
     (`185.199.108.153`–`185.199.111.153`), plus `AAAA` records for IPv6.
   - `www`: `CNAME` → `<owner>.github.io`.
4. Enable **Enforce HTTPS** in Pages settings once the certificate provisions.
5. Every push to `main` auto-deploys.

**Alternative — Cloudflare Pages:** connect the same GitHub repo, auto-deploys on
push, with a faster global CDN and better caching. Slightly more setup (Cloudflare
account + nameservers). Worth switching to if performance becomes a priority;
GitHub Pages is fine to launch on.

### Deployment flow

```
edit → commit → push to main → host auto-deploys → live at firstslavicbaptist.org
```

No CI pipeline needed to launch. A GitHub Action can be added later to lint HTML
or auto-generate `sitemap.xml`.
