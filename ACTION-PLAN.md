# SEO Action Plan — Prophotogr (https://www.prophotogr.com/)

**Production:** `https://www.prophotogr.com/` on Vercel · canonical host: `www`
**Status today:** site is live, HTTPS + HSTS work, but `/robots.txt`, `/sitemap.xml`, `/llms.txt` all 404 and the HTML has zero schema, zero OG tags, and 1 indexable `<img>`. Once Critical + High items below are shipped, this site is in a good place to actually rank.

Ordered by priority. Each item lists the **file to change**, the **expected effort**, and the **impact**.

---

## 🔴 Critical — do this week

### 1. Add a real `<title>` and meta description
**File:** `src/layouts/Layout.astro`
**Effort:** 15 min

Replace the current head with:

```astro
---
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}
const {
  title = 'Pro Photo GR — Επαγγελματίας Φωτογράφος Αθήνα | Portrait, Product, Event',
  description = 'Pro Photo GR — Ιωάννης Μαστροσταμάτης. Επαγγελματίας φωτογράφος στην Αθήνα με εξειδίκευση σε portrait, προϊόντα, events και couple photography. Κλείστε ραντεβού.',
  ogImage = '/img/background/4.jpg',
} = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site ?? 'https://www.prophotogr.com');
---
```

Then update `index.astro:11` to pass `description` and `ogImage` as well.

### 2. Fix the language attribute
**File:** `src/layouts/Layout.astro:8`
**Effort:** 2 min

```diff
- <html lang="en">
+ <html lang="el">
```

If you plan an English version later, add `hreflang` pairs at that time.

### 3. Fix the viewport meta
**File:** `src/layouts/Layout.astro:12`
**Effort:** 2 min — **accessibility + Lighthouse win**

```diff
- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
+ <meta name="viewport" content="width=device-width, initial-scale=1" />
```

### 4. Add Open Graph + Twitter Card tags
**File:** `src/layouts/Layout.astro` (inside `<head>`)
**Effort:** 15 min

```astro
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Pro Photo GR" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL(ogImage, canonical)} />
<meta property="og:locale" content="el_GR" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={new URL(ogImage, canonical)} />
```

Set `site: 'https://www.prophotogr.com'` (or whatever your production domain is) in `astro.config.mjs` so `Astro.url` resolves.

### 5. Add `robots.txt` + sitemap
**Effort:** 20 min

Create `public/robots.txt`:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://www.prophotogr.com/sitemap-index.xml
```

Install the official sitemap integration:

```bash
npm install @astrojs/sitemap
```

In `astro.config.mjs`:

```js
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.prophotogr.com',
  integrations: [sitemap()],
  // ...existing config
});
```

### 6. Add `LocalBusiness` + `Person` JSON-LD
**File:** `src/layouts/Layout.astro`
**Effort:** 30 min

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.prophotogr.com/#business",
      "name": "Pro Photo GR",
      "image": "https://www.prophotogr.com/Sticker_7x7-converted-from-png.svg",
      "url": "https://www.prophotogr.com",
      "telephone": "+30-694-011-5915",
      "email": "Prophotogr5@gmail.com",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Athens",
        "addressCountry": "GR"
      },
      "areaServed": { "@type": "Country", "name": "Greece" },
      "sameAs": [
        "https://www.facebook.com/p/Pro_photo_gr-100077780100902/",
        "https://www.instagram.com/pro_photo_gr_/",
        "https://www.tiktok.com/@m_ioannis_"
      ],
      "founder": { "@id": "https://www.prophotogr.com/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.prophotogr.com/#person",
      "name": "Ιωάννης Μαστροσταμάτης",
      "jobTitle": "Professional Photographer",
      "worksFor": { "@id": "https://www.prophotogr.com/#business" }
    }
  ]
})} />
```

Validate at <https://validator.schema.org/>.

---

## 🟠 High — within 2 weeks

### 7. Convert portfolio `background-image`s to real `<img>` with alt text
**Files:** `src/components/sections/WorksSection.astro`, `HeroSection.astro`, `AboutSection.astro`, `ContactSection.astro`, `src/pages/index.astro:39-43`
**Effort:** 3–4 hours
**Impact:** Unlocks Google Images — likely the #1 organic channel for this business.

Use Astro's `<Image>` component so it auto-generates AVIF/WebP + responsive `srcset`:

```astro
---
import { Image } from 'astro:assets';
import portraitCover from '../../assets/portrait/exofilo.jpg';
---
<Image
  src={portraitCover}
  alt="Portrait photoshoot in Athens — black and white studio portrait by Pro Photo GR"
  widths={[480, 800, 1200, 1920]}
  sizes="(min-width: 1024px) 50vw, 100vw"
  loading="lazy"
/>
```

Move images from `public/img/` into `src/assets/` so Astro can optimise them (items in `public/` are passed through untouched). Keep the existing CSS positioning by wrapping each `<Image>` in the same container.

Write alt text in Greek for Greek-keyword targeting, e.g. *"Φωτογράφιση προϊόντος e-shop — λευκό φόντο, studio lighting"*.

### 8. Split the single page into crawlable sub-pages
**New files:** `src/pages/services/portrait.astro`, `product.astro`, `event.astro`, `couple.astro`, `automotive.astro`
**Effort:** 1 day
**Impact:** Lets you rank separately for each `[service] photographer Athens` query.

Each page should have:
- Unique `<h1>`, `<title>`, meta description
- ~400+ words of Greek copy describing the service, process, typical deliverables
- 8–12 `<Image>` tags with keyword-rich alt text
- A `Service` schema block
- Internal link back to `/` and cross-links to sibling services

### 9. Add an `<h1>` to the homepage
**File:** `src/components/sections/HeroSection.astro:30-32`
**Effort:** 5 min

Wrap the hero tagline in an `<h1>`:

```astro
<h1 class="...existing classes...">
  <span class="block ...">Everyone Needs a</span>
  <span class="block ...">Prophotogr</span>
</h1>
```

Replace the current `<div>`s. Google treats this as the strongest on-page signal.

### 10. Image compression + modern formats
**Effort:** 2 hours

After step 7 (moving to `src/assets`), Astro handles this automatically. For anything that must stay in `public/`, run once:

```bash
# From project root
find public/img -type f \( -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c '
  for f; do
    cwebp -q 82 "$f" -o "${f%.*}.webp"
  done
' sh {} +
```

Target: every hero/cover image under 200 KB, every gallery thumb under 80 KB.

### 11. Fix accessible names on icon-only social links
**Files:** `src/components/sections/HeroSection.astro:78-80`, `ContactSection.astro:38-40`
**Effort:** 10 min

```diff
- <a class="ion-social-facebook" href="..." ...></a>
+ <a class="ion-social-facebook" href="..." aria-label="Follow Pro Photo GR on Facebook" ...></a>
```

Do the same for TikTok and Instagram. Empty anchors currently score 0 on accessibility and confuse screen readers.

### 12. Label the contact form inputs
**File:** `src/components/sections/ContactSection.astro:77-88`
**Effort:** 15 min

Replace placeholder-only inputs with visible `<label>` + `aria-required`.

---

## 🟡 Medium — within the month

### 13. Add `FAQPage` schema for common enquiries
**Effort:** 1 hour
**Impact:** AI Overviews + People Also Ask visibility.

Add a visible FAQ section (5–8 Q&A) and mark it up with `FAQPage` JSON-LD. Target questions like *"Πόσο κοστίζει ένα photoshoot στην Αθήνα;"*.

### 14. Add testimonials / reviews block with `Review` schema
**Effort:** 2 hours

Pull 4–6 quotes from your Google Business Profile or clients and embed them with `aggregateRating` nested inside the `ProfessionalService`.

### 15. Add security headers via `vercel.json`
**File:** `vercel.json`
**Effort:** 15 min

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    },
    {
      "source": "/(.*)\\.(webp|avif|jpg|jpeg|png|svg|woff2)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 16. Add an `llms.txt`
**File:** `public/llms.txt`
**Effort:** 15 min

```
# Pro Photo GR
> Professional photographer Ioannis Mastrostamatis, based in Athens, Greece. Portrait, product, event, couple and automotive photography and videography.

## Contact
- Email: Prophotogr5@gmail.com
- Phone: +30 694 011 5915
- Instagram: https://www.instagram.com/pro_photo_gr_/
- TikTok: https://www.tiktok.com/@m_ioannis_
- Facebook: https://www.facebook.com/p/Pro_photo_gr-100077780100902/

## Services
- Portrait photography
- Product / e-commerce photography
- Event photography
- Couple photography
- Automotive photography
- Videography

## Location
Athens, Greece. Available for bookings across Greece.
```

### 17. Connect Google Search Console + Bing Webmaster Tools
**Effort:** 30 min

Site is already live at `https://www.prophotogr.com/` — verify both `https://www.prophotogr.com` and `https://prophotogr.com` (the naked redirect) as separate properties (or use a Domain property covering both). Add verification meta tag to `Layout.astro`, submit the sitemap from step 5, monitor coverage and Core Web Vitals reports.

### 17b. Make the naked → www redirect a permanent 308
**File:** `vercel.json`
**Effort:** 5 min

Currently `https://prophotogr.com/` returns `307` (temporary). Force `308` so search engines collapse the duplicate cleanly:

```json
{
  "redirects": [
    { "source": "/(.*)", "has": [{ "type": "host", "value": "prophotogr.com" }], "destination": "https://www.prophotogr.com/$1", "permanent": true }
  ]
}
```

### 18. Audit and trim JS bundle
**Effort:** 2 hours

The homepage loads Swiper + GSAP + glightbox simultaneously. Check if:
- `glightbox` is still used after step 7 (Astro's `<Image>` may replace lightbox needs)
- GSAP can be replaced by Swiper's built-in transitions on the hero
- `ionicons.min.css` (80 KB of unused icons) can be subsetted or replaced with inline SVG for the ~8 icons actually used.

Target: homepage JS + CSS under 200 KB gzipped.

### 19. Add a blog / case studies section
**Effort:** 1 week (content) + 2 hours (template)

Uncomment or replace the `NewsSection`. Publish 1 post/month covering a shoot: *"Case study: Product photography για [brand] — setup, lighting, post"*. Each post:
- Targets a long-tail Greek keyword
- Has 4–10 original images with alt text
- Links back to relevant service page
- Has `Article` schema

---

## 🟢 Low — backlog / nice to have

### 20. Set up Google Business Profile (if not already)
Verify the Athens address, upload 20+ photos, respond to reviews.

### 21. Build local backlinks
Shoot-for-credit arrangements with local cafés / boutiques / events — earn a `<a href="prophotogr.com">` from their site.

### 22. Analytics
Add Plausible or GA4 + log events for CV download and form submit.

### 23. Replace `210designs` footer credit with a `rel="sponsored"` link
If the credit is contractual, keep it. If optional, consider removing — it's passing link equity off your domain.

### 24. Rename image files descriptively before upload
Future uploads: `portrait-athens-studio-black-white.jpg` rather than `_DSC7845-2.jpg`.

### 25. Add `hreflang` when bilingual
If you add English pages, include `<link rel="alternate" hreflang="el" …>` and `hreflang="en"` pairs.

---

## Expected score after Critical + High fixes

| Category | Now | After C + H |
|---|---|---|
| Technical SEO | 25 | 80 |
| Content Quality | 30 | 55 |
| On-Page SEO | 25 | 70 |
| Schema | 5 | 75 |
| Performance | 40 | 70 |
| Images | 15 | 80 |
| AI Search | 15 | 65 |
| **Total** | **25** | **~70** |

Full Medium + Low completion can push this to 85+.
