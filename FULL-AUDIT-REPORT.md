# Full SEO Audit — Prophotogr (Pro Photo GR)

**Audit date:** 2026-04-14
**Scope:** Live site `https://www.prophotogr.com/` + source in `src/` + build in `dist/`
**Business type detected:** Local professional photographer — Athens, Greece
**Primary entity:** Ιωάννης Μαστροσταμάτης / Pro Photo GR
**Services detected:** portrait, art, product, event, couple, automotive photography + videography
**NAP signals:** `Prophotogr5@gmail.com` · `+30 694 011 5915` · Athens, Greece

### Live deployment checks

| Probe | Result |
|---|---|
| `https://www.prophotogr.com/` | `200 OK`, 34 KB, Vercel `fra1` edge, `x-vercel-cache: HIT` |
| `http://prophotogr.com` → `https://prophotogr.com` | `308` ✅ |
| `http://www.prophotogr.com` → `https://www.prophotogr.com` | `308` ✅ |
| `https://prophotogr.com` → `https://www.prophotogr.com` | `307` ⚠️ (use 308 for canonical permanence) |
| `/robots.txt` | `404` ❌ |
| `/sitemap.xml` | `404` ❌ |
| `/sitemap-index.xml` | `404` ❌ |
| `/llms.txt` | `404` ❌ |
| HSTS | ✅ `max-age=63072000` |
| `<img>` tags in production HTML | **1** (just the logo) |
| `application/ld+json` blocks in production HTML | **0** |
| Analytics / pixel scripts in production HTML | **0** (no GA, GTM, Plausible, Meta Pixel, Hotjar, Clarity) |
| Security headers (CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) | **0 of 5 present** |

Live HTML diff against local `dist/index.html`: only whitespace differences — findings below apply equally to production.

---

## Executive summary

**SEO Health Score: 25 / 100 — Critical**

This is a visually polished single-page portfolio with almost **zero SEO infrastructure**. Search engines can see the shell but can't understand what the business is, where it operates, what services it offers, or which images belong to which category. For a local service business in Athens targeting queries like *"φωτογράφος γάμου Αθήνα"* or *"product photographer Greece"*, the site is effectively invisible.

### Top 5 critical issues

1. **No meta description, no usable `<title>`** — SERP snippet will just read *"Prophotogr"*.
2. **161 portfolio images rendered as CSS `background-image`** — not indexable, zero alt text, zero Google Images traffic.
3. **Zero structured data** — no `LocalBusiness`, `Person`, `ProfessionalService`, `ImageObject`, or Open Graph. Invisible to AI Overviews, ChatGPT, Perplexity.
4. **`<html lang="en">` on Greek content** — wrong language signal, hurts both ranking and accessibility.
5. **Single-page architecture with anchor-only nav** — cannot rank separate pages for each service/city combination. Competitors with `/services/portrait-athens/` win by default.

### Top 5 quick wins (under 2 hours each)

1. Write a proper `<title>` and `<meta name="description">` in `Layout.astro`.
2. Add `/public/robots.txt` and an Astro-generated `/sitemap.xml`.
3. Add `LocalBusiness` + `Person` JSON-LD schema (NAP is already in the source).
4. Add Open Graph + Twitter Card tags pointing at a hero image.
5. Change `<html lang="en">` → `lang="el"` (or split bilingual via hreflang).

---

## 1. Technical SEO  — score 25 / 100

| Check | Status | Notes |
|---|---|---|
| `<title>` | ⚠️ Weak | `<title>Prophotogr</title>` — 11 chars, no keywords, no location. Target: 50–60 chars. |
| `<meta name="description">` | ❌ Missing | Will generate a random SERP snippet. |
| `<link rel="canonical">` | ❌ Missing | Risk of dupe indexing (`/`, `/?utm=…`, `/index.html`). |
| `<html lang>` | ❌ Wrong | `lang="en"` but bio is Greek. |
| Viewport | ❌ Bad | `maximum-scale=1` blocks pinch-zoom — accessibility violation, Lighthouse penalty. |
| Favicons | ✅ OK | `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`. |
| `robots.txt` | ❌ Missing | File not present in `public/`. |
| `sitemap.xml` | ❌ Missing | No sitemap generated; Astro's `@astrojs/sitemap` not installed. |
| `llms.txt` | ❌ Missing | No file for AI crawlers. |
| Security headers | ❌ Missing | `vercel.json` is 5 lines — no CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |
| HTTP → HTTPS | ➖ Vercel default | Vercel handles this; once deployed with a domain, verify 301. |
| Structured data | ❌ Missing | See §4. |
| Astro image optimisation | ⚠️ Unused | `astro/assets` configured but site uses raw `<img>` / `background-image`. No responsive `srcset`. |

## 2. Content Quality & E-E-A-T — score 30 / 100

| E-E-A-T signal | Present? | Evidence |
|---|---|---|
| **Experience** | Partial | Bio claims 5 years; "facts counter" shows 6 years / 355 clients / 9,800 followers. Not independently verifiable. |
| **Expertise** | Weak | No training, gear, workflow, client list, or awards listed. |
| **Authoritativeness** | Missing | No logos of brands worked with, no press mentions, no backlinks. |
| **Trustworthiness** | Missing | No testimonials, no reviews, no privacy policy, no terms. |

Other content findings:

- **Word count on the only indexable page:** ~180 words (the single bio paragraph plus a few headings). Google Dec-2025 E-E-A-T update extends quality review to all competitive queries — this is classified as **thin content**.
- **No blog / insights section.** `NewsSection` is commented out in `src/pages/index.astro:68`. Kills content freshness and topical authority.
- **No testimonials component.**
- **No pricing page / packages** — users searching *"photo shoot price Athens"* get no landing page.
- **Duplicate text risk:** None found (single page).
- **Readability:** Greek bio is a single 70-word run-on sentence with four `.` — hard to scan, low passage-level citability for AI search.

## 3. On-Page SEO — score 25 / 100

| Element | Issue |
|---|---|
| `<h1>` | ❌ None. The hero displays *"Everyone Needs a / Prophotogr"* but it's wrapped in `<div>` not `<h1>`. |
| `<h2>` headings | Generic: *"About"*, *"Design"*, *"Branding"*, *"Get in touch"*. No keyword modifiers. |
| `<h4>` headings | *"Automotive / ART / Events / Products / Portrait / Couple Photography"* — would be perfect section anchors if they linked to dedicated pages. |
| Internal links | Only in-page anchor links (`#home`, `#about`, …). No crawlable deep structure. |
| Outbound links | 4 — Facebook, Instagram, TikTok, `210designs.com` (credit). All `rel="noopener noreferrer"`. ✅ |
| Anchor text | "Use the form", "Download CV", icon-only social — no descriptive anchor text. |
| URL structure | Only `/`. Greek searches for *"φωτογράφος προϊόντων Αθήνα"* land on a generic homepage. |
| Keyword targeting | No evidence of intent — no copy targeting *"wedding photographer Athens"*, *"event photographer Greece"*, etc. |
| Breadcrumbs | N/A (single page), but needed once sub-pages exist. |

## 4. Schema & Structured Data — score 5 / 100

Grep of `dist/index.html` for `application/ld+json` → **0 matches**.

Missing (all should exist for this business):

1. **`LocalBusiness` / `ProfessionalService`** — for Athens NAP, opening hours, service area, aggregateRating.
2. **`Person`** — Ioannis Mastrostamatis as the practitioner; `sameAs` to FB/IG/TikTok.
3. **`Service`** (×5) — one per offering (Portrait, Product, Event, Couple, Automotive).
4. **`ImageObject`** for each portfolio photo (rich image results).
5. **`WebSite`** with `SearchAction` (once search exists) + `publisher`.
6. **`BreadcrumbList`** when sub-pages exist.
7. **`FAQPage`** — for common questions (pricing, location coverage, booking).
8. **`Organization`** with `logo`, `contactPoint`.

Open Graph / Twitter Cards: also 0 tags. Facebook/WhatsApp shares will render as a blank preview.

## 5. Performance (Core Web Vitals) — score 40 / 100

Measured heuristics (no live site to run Lighthouse against):

| Signal | Assessment |
|---|---|
| **LCP** | Hero section uses a large JPG background from `/img/background/`. 1.4 MB total in that folder. No `rel="preload"`, no `<img loading="eager">`, no AVIF. Likely > 3.0 s on 4G. |
| **INP** | Swiper + GSAP + glightbox + custom `main.ts` all init on load. Menu animations and hero auto-play add main-thread work. |
| **CLS** | `background-image` divs have fixed vh heights — CLS likely low. ✅ |
| **Font loading** | `@fontsource/oswald` + `@fontsource/raleway` locally — good. Verify `font-display: swap`. |
| **CSS** | Inline + split — `inlineStylesheets: 'auto'` ✅. |
| **JS bundle** | Swiper (+100 KB), GSAP (+70 KB), glightbox (+25 KB), ionicons.min.css (+80 KB). Audit whether all are needed on homepage. |
| **3rd-party** | None detected (no GA, no chat widget, no Maps embed). |
| **Preconnect / preload** | Missing for the hero image. |

## 6. Images — score 15 / 100

| Check | Count / Finding |
|---|---|
| Total image files in `public/img/` | 161 JPG/PNG |
| Files > 500 KB | 6 (largest: `_DSC7845-2.jpg` 690 KB in `portrait/`) |
| Total `public/img/` weight | ~40 MB |
| `<img>` tags in built HTML | **1** (the logo) |
| `alt` attributes in built HTML | **1** (`alt="Prophotogr Logo"`) |
| Images rendered as CSS `background-image` | Majority of portfolio + hero + nav menu |
| WebP / AVIF coverage | 0 % |
| Responsive `srcset` | 0 % |
| Descriptive filenames | ~0 % (`_DSC7845-2.jpg`, `exofilo.jpg`, `ME 45T copy.jpg`) |
| `width` / `height` attributes | N/A (bg-images) |
| Astro `<Image>` / `<Picture>` usage | 0 |

**Impact:** the site is a photography portfolio with zero Google Images presence. This is the single biggest missed organic channel for a photographer.

## 7. AI Search Readiness (GEO) — score 15 / 100

| Signal | Status |
|---|---|
| `llms.txt` at root | ❌ Missing |
| AI crawlers not blocked (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) | ✅ By default (no `robots.txt` blocks them) but also no explicit `Allow` |
| Passage-level citability | Low — one Greek run-on paragraph |
| Machine-readable NAP | ❌ No schema |
| Q&A-style content | ❌ None (no FAQ) |
| Author/entity identity | ⚠️ Name appears in body copy only, no `Person` schema, no `sameAs` |
| Brand mention anchor | ⚠️ Brand name "Prophotogr" appears in title, bio, footer — but ambiguous vs. `Pro Photo GR` vs. `Pro_photo_gr` |

## 8. Accessibility (SEO-adjacent)

- `maximum-scale=1` blocks zoom — WCAG 2.1 SC 1.4.4 failure. Google weights this.
- Icon-only social links have no accessible name (empty `<a>` with `ion-social-*` class, no `aria-label`).
- Form inputs in `ContactSection` use `placeholder` but no `<label>`.
- Preloader `<div>`s have no ARIA live role.

## 9. Other observations

- `vercel.json:1` does not define `headers` — add security headers + long cache for `/img/*` and `/_astro/*`.
- `ContactSection.astro:14` exposes email in plaintext `mailto:` — acceptable for SEO NAP, but consider `rel="nofollow"` off so Google sees it.
- `cv.pdf` is hosted at `/cv.pdf` but not linked from schema — a missed `Person.hasCredential` opportunity.
- `_backups/` directory exists in project root — verify it's not deployed. Vercel only deploys `dist/`, so this is safe but worth a gitignore check.
- Credit link `https://210designs.com` in footer passes PageRank — acceptable if intentional.

---

## Category scoring

| Category | Weight | Raw | Weighted |
|---|---|---|---|
| Technical SEO | 25 % | 25 | 6.25 |
| Content Quality | 25 % | 30 | 7.50 |
| On-Page SEO | 20 % | 25 | 5.00 |
| Schema | 10 % | 5 | 0.50 |
| Performance | 10 % | 40 | 4.00 |
| Images | 5 % | 15 | 0.75 |
| AI Search Readiness | 5 % | 15 | 0.75 |
| **Total** | **100 %** |  | **≈ 25 / 100** |

See `ACTION-PLAN.md` for prioritised fixes.
