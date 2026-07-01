# FishTokri — SEO Setup Spec (For Replit Agent Implementation)

> **Instruction to Replit Agent:** Implement the SEO configuration below exactly as specified — meta tags, URL slugs, JSON-LD schema, robots.txt, sitemap.xml, and category/product-level metadata. This is a basic/foundational SEO setup meant to be applied at site build time. Product list and pricing are sourced from the live product catalog (191 SKUs, 10 categories).

## 1. Site-Wide Config

```
Site name: FishTokri
Tagline: Freshly cut seafood & meat, hygienically packed and delivered to your doorstep
Default title suffix: | FishTokri
Homepage title: Fresh Fish, Seafood, Chicken & Mutton Online in Mumbai | FishTokri
Homepage meta description: Order 100% fresh fish, seafood, chicken & mutton online in Mumbai. Hygienically cut, cleaned & delivered to your doorstep. 60+ varieties. Free delivery above ₹500. Order now on FishTokri.
Default OG image: /assets/og-default.jpg (1200x630)
Favicon: /favicon.ico
Canonical domain: https://fishtokri.com (use this as canonical host for all pages — redirect fishtokri.in permanently to fishtokri.com with 301 if both are live)
Language: en-IN
Currency: INR
```

## 2. robots.txt (create at site root)

```
User-agent: *
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /login/
Disallow: /admin/
Disallow: /*?sort=
Disallow: /*?filter=
Disallow: /*?utm_
Disallow: /search?

Sitemap: https://fishtokri.com/sitemap.xml
```

## 3. Sitemap

Generate `sitemap.xml` dynamically from the product/category database (not hand-written), auto-updating whenever products are added/removed. Include:
- Homepage (priority 1.0)
- All 10 category pages (priority 0.8)
- All product pages (priority 0.6)
- Static pages: About, FAQ, Contact, Delivery Areas (priority 0.5)
- Blog/recipe posts once published (priority 0.5)

Exclude: cart, checkout, account, filtered/sorted URLs. Submit sitemap to Google Search Console after deploy.

## 4. URL Structure

```
/                                     → Homepage
/[category-slug]/                    → Category listing page
/[category-slug]/[product-slug]/     → Product detail page
/delivery-locations/[area-slug]/     → Locality landing page (Thane, Kalyan, Mulund, etc.)
/recipes/[post-slug]/                → Blog/recipe content
/about-us/
/faq/
/contact-us/
```
Rules: lowercase, hyphenated, no special characters, no trailing query params indexed, max 3 folder levels deep.

## 5. Global JSON-LD — Organization / LocalBusiness (add to every page, in <head> or footer)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://fishtokri.com/#business",
  "name": "FishTokri",
  "image": "https://fishtokri.com/assets/logo.jpg",
  "url": "https://fishtokri.com",
  "telephone": "+91-9220200100",
  "priceRange": "₹₹",
  "servesCuisine": "Seafood, Meat",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shop No.2, Shiva Nand Society, Near Jambli Naka, Khartan Road",
    "addressLocality": "Thane West",
    "addressRegion": "Maharashtra",
    "postalCode": "400601",
    "addressCountry": "IN"
  },
  "areaServed": [
    { "@type": "City", "name": "Thane" },
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Kalyan" }
  ],
  "openingHours": "Mo-Su 09:00-19:00"
}
```
*(Replit Agent: pull the real address/phone/hours from the client's confirmed business record before deploy — placeholder values above are drawn from public directory listings and must be verified.)*

## 6. Category Page SEO Template

For each category page, set:
- **Title tag:** `{Category Name} Online in Mumbai | Fresh & Hygienically Cut | FishTokri`
- **Meta description:** `Buy fresh {category keyword} online in Mumbai. Hygienically cleaned, cut & delivered same-day. {X}+ varieties available. Order now on FishTokri.`
- **H1:** `{Category Name} Online in Mumbai`
- **Intro copy (150-250 words, unique per category, placed above the fold):** see category-specific intro text below.
- **BreadcrumbList schema:** Home > {Category}

### Category Intro Copy (paste as unique on-page content per category)

**Fish And Seafood** (`/fish-and-seafood/`, 84 products, focus keyword: *fish online Mumbai*)

> Buy fresh fish and seafood online in Mumbai — pomfret, surmai, rawas, bombil, crabs and more, hygienically cleaned and cut, delivered same-day to your doorstep.

**Prawns** (`/prawns/`, 24 products, focus keyword: *prawns online Mumbai*)

> Order fresh prawns online in Mumbai — jumbo, tiger, freshwater and seawater varieties, cleaned and ready to cook, delivered same-day.

**Pomfret** (`/pomfret/`, 31 products, focus keyword: *pomfret fish online Mumbai*)

> Buy fresh silver pomfret and khapri pomfret (paplet) online in Mumbai, available whole or sliced in every size, hygienically cleaned and delivered same-day.

**Chicken** (`/chicken/`, 11 products, focus keyword: *chicken online Mumbai*)

> Order fresh chicken online in Mumbai — boneless, curry cut, lollipop, keema and more, delivered hygienically packed to your doorstep.

**Mutton** (`/mutton/`, 8 products, focus keyword: *mutton online Mumbai*)

> Buy fresh goat mutton online in Mumbai — curry cut, chops, boneless cubes and more, delivered fresh and hygienically packed.

**Eggs** (`/eggs/`, 4 products, focus keyword: *eggs online Mumbai*)

> Order farm-fresh eggs online in Mumbai — omega, power and desi eggs, delivered fresh to your doorstep.

**Dry Fish** (`/dry-fish/`, 7 products, focus keyword: *dry fish online Mumbai*)

> Buy authentic dry fish online in Mumbai — dry bombil, dry prawns (sode), dry kardi and more, sourced and packed for freshness.

**Ready To Cook** (`/ready-to-cook/`, 15 products, focus keyword: *ready to cook seafood online Mumbai*)

> Order marinated, ready-to-cook fish, chicken and prawns online in Mumbai — pre-marinated in authentic Malvani and tandoori flavours, ready for your pan.

**Spices** (`/masala-spices/`, 6 products, focus keyword: *masala online Mumbai*)

> Buy authentic Malvani, Saraswat, CKP and Koli masalas online — the same spice blends used to marinate FishTokri's ready-to-cook range.

**Frozen Foods** (`/frozen-foods/`, 1 products, focus keyword: *frozen seafood online Mumbai*)

> Order frozen seafood online in Mumbai, hygienically packed and delivered to your doorstep.

## 7. Product Page SEO Template

For every product page, generate programmatically from the product database using this formula (do not hand-write 191 pages):

- **Title tag:** `Buy {Product Name} Online in Mumbai | Fresh & Hygienically Cut | FishTokri`
- **Meta description:** `Order {Product Name} online in Mumbai. 100% fresh {category keyword}, hygienically cleaned & cut, delivered same-day to your doorstep. Free delivery above ₹500. Order now on FishTokri.`
- **URL:** `/{category-slug}/{product-slug}/`
- **H1:** `{Product Name}`
- **Image alt text:** `{Product Name} - fresh {category keyword} online delivery Mumbai FishTokri`
- **Canonical tag:** self-referencing, strip all query params
- **Product JSON-LD:** (template below, populate dynamically from DB fields: name, price, category, availability)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product.name}}",
  "image": "{{product.image_url}}",
  "description": "Fresh {{product.name}}, hygienically cleaned and cut, delivered same-day across Mumbai.",
  "sku": "{{product.short_code}}",
  "category": "{{product.category}}",
  "brand": { "@type": "Brand", "name": "FishTokri" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "{{product.price}}",
    "availability": "https://schema.org/InStock",
    "url": "https://fishtokri.com/{{category_slug}}/{{product_slug}}/"
  }
}
```

## 8. Core Sitewide Target Keywords

```
fresh fish online Mumbai
buy fish online Thane
seafood delivery Mumbai
chicken online delivery Mumbai
mutton online Mumbai
fish home delivery near me
pomfret online Mumbai
surmai online Mumbai
prawns online delivery Mumbai
crab online Mumbai
ready to cook marinated fish online
dry fish online Mumbai
```

## 9. Full Product Metadata Table (auto-generate all product pages from this)

> Replit Agent: use this table as the seed data / SEO field mapping for every product record in the database. `Slug` = URL segment. `Focus Keyword` = primary keyword to weight in title/H1/alt text/first 100 words of description.


### Fish And Seafood — 84 products (`/fish-and-seafood/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Surmai Slices - Mixed | `surmai-slices-mixed` | 145 | Buy Surmai Slices - Mixed Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai slices - mixed online Mumbai |
| Surmai Boneless Cubes | `surmai-boneless-cubes` | 495 | Buy Surmai Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai boneless cubes online Mumbai |
| Tarli (Sardine) | `tarli-sardine` | 225 | Buy Tarli (Sardine) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | tarli (sardine) online Mumbai |
| Vaam (Yellow Eel) - Cubes | `vaam-yellow-eel-cubes` | 275 | Buy Vaam (Yellow Eel) - Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | vaam (yellow eel) - cubes online Mumbai |
| Surmai Slices - Medium | `surmai-slices-medium` | 895 | Buy Surmai Slices - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai slices - medium online Mumbai |
| Surmai Cubes (boneless) | `surmai-cubes-boneless` | 995 | Buy Surmai Cubes (boneless) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai cubes (boneless) online Mumbai |
| Vaam (Yellow Eel) - Cubes (Mini Pack) | `vaam-yellow-eel-cubes-mini-pack` | 300 | Buy Vaam (Yellow Eel) - Cubes (Mini Pack) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | vaam (yellow eel) - cubes (mini pack) online Mumbai |
| Surmai - Head & Tail | `surmai-head-tail` | 45 | Buy Surmai - Head & Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai - head & tail online Mumbai |
| Surmai Slices - Small | `surmai-slices-small` | 445 | Buy Surmai Slices - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai slices - small online Mumbai |
| Tilapia - Boneless Fillet | `tilapia-boneless-fillet` | 195 | Buy Tilapia - Boneless Fillet Online in Mumbai | Fresh & Hygienically Cut | FishTokri | tilapia - boneless fillet online Mumbai |
| Surmai Slices - Big | `surmai-slices-big` | 545 | Buy Surmai Slices - Big Online in Mumbai | Fresh & Hygienically Cut | FishTokri | surmai slices - big online Mumbai |
| Squid (Makul) - Whole, Cleaned | `squid-makul-whole-cleaned` | 395 | Buy Squid (Makul) - Whole, Cleaned Online in Mumbai | Fresh & Hygienically Cut | FishTokri | squid (makul) - whole, cleaned online Mumbai |
| Jumbo Halwa Slices | `jumbo-halwa-slices` | 445 | Buy Jumbo Halwa Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jumbo halwa slices online Mumbai |
| Rawas Head And Tail | `rawas-head-and-tail` | 95 | Buy Rawas Head And Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rawas head and tail online Mumbai |
| Saundale - Whole & Cleaned | `saundale-whole-cleaned` | 275 | Buy Saundale - Whole & Cleaned Online in Mumbai | Fresh & Hygienically Cut | FishTokri | saundale - whole & cleaned online Mumbai |
| Mandeli | `mandeli` | 145 | Buy Mandeli Online in Mumbai | Fresh & Hygienically Cut | FishTokri | mandeli online Mumbai |
| Kupa (Tuna) - Boneless Cubes | `kupa-tuna-boneless-cubes` | 195 | Buy Kupa (Tuna) - Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | kupa (tuna) - boneless cubes online Mumbai |
| Kupa (Tuna) - Head & Tail | `kupa-tuna-head-tail` | 45 | Buy Kupa (Tuna) - Head & Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | kupa (tuna) - head & tail online Mumbai |
| Kupa (Tuna) - Slices | `kupa-tuna-slices` | 225 | Buy Kupa (Tuna) - Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | kupa (tuna) - slices online Mumbai |
| Lady Fish (Kane) - Big | `lady-fish-kane-big` | 345 | Buy Lady Fish (Kane) - Big Online in Mumbai | Fresh & Hygienically Cut | FishTokri | lady fish (kane) - big online Mumbai |
| Lepa (sole Fish) - Whole | `lepa-sole-fish-whole` | 245 | Buy Lepa (sole Fish) - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | lepa (sole fish) - whole online Mumbai |
| Mahi Mahi - Boneless Cubes | `mahi-mahi-boneless-cubes` | 400 | Buy Mahi Mahi - Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | mahi mahi - boneless cubes online Mumbai |
| Mahi Mahi - Boneless Cubes (Mini Pack) | `mahi-mahi-boneless-cubes-mini-pack` | 200 | Buy Mahi Mahi - Boneless Cubes (Mini Pack) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | mahi mahi - boneless cubes (mini pack) online Mumbai |
| Lady Fish (Kane) | `lady-fish-kane` | 325 | Buy Lady Fish (Kane) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | lady fish (kane) online Mumbai |
| Rawas Slices - Mixed | `rawas-slices-mixed` | 195 | Buy Rawas Slices - Mixed Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rawas slices - mixed online Mumbai |
| Rani (Pink Perch) | `rani-pink-perch` | 195 | Buy Rani (Pink Perch) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rani (pink perch) online Mumbai |
| Motka (silver Fish) | `motka-silver-fish` | 195 | Buy Motka (silver Fish) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | motka (silver fish) online Mumbai |
| Rawas Slices - Small | `rawas-slices-small` | 495 | Buy Rawas Slices - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rawas slices - small online Mumbai |
| Red Snapper (Tamboshi) - Boneless Cubes | `red-snapper-tamboshi-boneless-cubes` | 545 | Buy Red Snapper (Tamboshi) - Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | red snapper (tamboshi) - boneless cubes online Mumbai |
| Rohu (Medium) | `rohu-medium` | 395 | Buy Rohu (Medium) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rohu (medium) online Mumbai |
| Rohu (Small) | `rohu-small` | 295 | Buy Rohu (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rohu (small) online Mumbai |
| Shark (Mooshi) Cubes (Mini Pack) | `shark-mooshi-cubes-mini-pack` | 200 | Buy Shark (Mooshi) Cubes (Mini Pack) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | shark (mooshi) cubes (mini pack) online Mumbai |
| Indian Basa Fillet | `indian-basa-fillet` | 395 | Buy Indian Basa Fillet Online in Mumbai | Fresh & Hygienically Cut | FishTokri | indian basa fillet online Mumbai |
| Jitada - Head & Tail | `jitada-head-tail` | 45 | Buy Jitada - Head & Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada - head & tail online Mumbai |
| Jitada (Seabass ) - Small | `jitada-seabass-small` | 395 | Buy Jitada (Seabass ) - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada (seabass ) - small online Mumbai |
| Jitada (Seabass) - Large | `jitada-seabass-large` | 845 | Buy Jitada (Seabass) - Large Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada (seabass) - large online Mumbai |
| Jitada (Seabass) - Medium | `jitada-seabass-medium` | 595 | Buy Jitada (Seabass) - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada (seabass) - medium online Mumbai |
| Jitada (Seabass) - Xl | `jitada-seabass-xl` | 1095 | Buy Jitada (Seabass) - Xl Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada (seabass) - xl online Mumbai |
| Jitada Boneless Cubes | `jitada-boneless-cubes` | 595 | Buy Jitada Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada boneless cubes online Mumbai |
| Jitada Slices | `jitada-slices` | 375 | Buy Jitada Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | jitada slices online Mumbai |
| Kaalva (Oyster) | `kaalva-oyster` | 345 | Buy Kaalva (Oyster) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | kaalva (oyster) online Mumbai |
| Rawas Slices - Medium | `rawas-slices-medium` | 495 | Buy Rawas Slices - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rawas slices - medium online Mumbai |
| Saundale - Whole & Cleaned (big) | `saundale-whole-cleaned-big` | 545 | Buy Saundale - Whole & Cleaned (big) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | saundale - whole & cleaned (big) online Mumbai |
| Rawas Boneless Cubes | `rawas-boneless-cubes` | 445 | Buy Rawas Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | rawas boneless cubes online Mumbai |
| Karli Slices | `karli-slices` | 175 | Buy Karli Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | karli slices online Mumbai |
| 500rawas Slices - Medium | `500rawas-slices-medium` | 995 | Buy 500rawas Slices - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | 500rawas slices - medium online Mumbai |
| Ghol Cubes - (boneless) | `ghol-cubes-boneless` | 545 | Buy Ghol Cubes - (boneless) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | ghol cubes - (boneless) online Mumbai |
| Ghol Cubes - (with Skin & Bone) | `ghol-cubes-with-skin-bone` | 445 | Buy Ghol Cubes - (with Skin & Bone) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | ghol cubes - (with skin & bone) online Mumbai |
| Baby Surmai - Medium | `baby-surmai-medium` | 700 | Buy Baby Surmai - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - medium online Mumbai |
| Baby Surmai - Xl | `baby-surmai-xl` | 1600 | Buy Baby Surmai - Xl Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - xl online Mumbai |
| Baby Surmai - Xxl | `baby-surmai-xxl` | 1950 | Buy Baby Surmai - Xxl Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - xxl online Mumbai |
| Baby Surmai - Extra Small | `baby-surmai-extra-small` | 395 | Buy Baby Surmai - Extra Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - extra small online Mumbai |
| Baby Surmai Slices | `baby-surmai-slices` | 325 | Buy Baby Surmai Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai slices online Mumbai |
| Catla (Small) | `catla-small` | 300 | Buy Catla (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | catla (small) online Mumbai |
| Cat Fish Egg | `cat-fish-egg` | 450 | Buy Cat Fish Egg Online in Mumbai | Fresh & Hygienically Cut | FishTokri | cat fish egg online Mumbai |
| Baby Surmai - Large | `baby-surmai-large` | 1000 | Buy Baby Surmai - Large Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - large online Mumbai |
| Bangda - Curry Cut | `bangda-curry-cut` | 175 | Buy Bangda - Curry Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | bangda - curry cut online Mumbai |
| Bangda - Whole & Cleaned | `bangda-whole-cleaned` | 175 | Buy Bangda - Whole & Cleaned Online in Mumbai | Fresh & Hygienically Cut | FishTokri | bangda - whole & cleaned online Mumbai |
| Black Crab - Big | `black-crab-big` | 995 | Buy Black Crab - Big Online in Mumbai | Fresh & Hygienically Cut | FishTokri | black crab - big online Mumbai |
| Black Crab - Female | `black-crab-female` | 445 | Buy Black Crab - Female Online in Mumbai | Fresh & Hygienically Cut | FishTokri | black crab - female online Mumbai |
| Black Crab - Jumbo | `black-crab-jumbo` | 445 | Buy Black Crab - Jumbo Online in Mumbai | Fresh & Hygienically Cut | FishTokri | black crab - jumbo online Mumbai |
| Bombil - Fry Cut | `bombil-fry-cut` | 295 | Buy Bombil - Fry Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | bombil - fry cut online Mumbai |
| Black Crab - Medium | `black-crab-medium` | 395 | Buy Black Crab - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | black crab - medium online Mumbai |
| Black Crab - Small | `black-crab-small` | 345 | Buy Black Crab - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | black crab - small online Mumbai |
| Fresh Javla (Tiny Shrimps) | `fresh-javla-tiny-shrimps` | 400 | Buy Fresh Javla (Tiny Shrimps) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh javla (tiny shrimps) online Mumbai |
| Fish Egg (gabholi) | `fish-egg-gabholi` | 495 | Buy Fish Egg (gabholi) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fish egg (gabholi) online Mumbai |
| Doma | `doma` | 375 | Buy Doma Online in Mumbai | Fresh & Hygienically Cut | FishTokri | doma online Mumbai |
| Dara Rawas - Medium | `dara-rawas-medium` | 600 | Buy Dara Rawas - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dara rawas - medium online Mumbai |
| Dara Rawas - Large | `dara-rawas-large` | 750 | Buy Dara Rawas - Large Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dara rawas - large online Mumbai |
| Clams (Tisrya) | `clams-tisrya` | 195 | Buy Clams (Tisrya) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | clams (tisrya) online Mumbai |
| Clams (Shimplya) | `clams-shimplya` | 125 | Buy Clams (Shimplya) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | clams (shimplya) online Mumbai |
| Ghol - (head & Bone) | `ghol-head-bone` | 195 | Buy Ghol - (head & Bone) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | ghol - (head & bone) online Mumbai |
| Bombil - Whole | `bombil-whole` | 295 | Buy Bombil - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | bombil - whole online Mumbai |
| Hilsa (Pala) With Egg | `hilsa-pala-with-egg` | 1395 | Buy Hilsa (Pala) With Egg Online in Mumbai | Fresh & Hygienically Cut | FishTokri | hilsa (pala) with egg online Mumbai |
| Indian Basa Boneless Cubes | `indian-basa-boneless-cubes` | 195 | Buy Indian Basa Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | indian basa boneless cubes online Mumbai |
| Baby Rawas - Extra Small | `baby-rawas-extra-small` | 275 | Buy Baby Rawas - Extra Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - extra small online Mumbai |
| Baby Rawas - Xl | `baby-rawas-xl` | 1125 | Buy Baby Rawas - Xl Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - xl online Mumbai |
| Baby Rawas - Xxl | `baby-rawas-xxl` | 1495 | Buy Baby Rawas - Xxl Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - xxl online Mumbai |
| Baby Rawas Slices | `baby-rawas-slices` | 325 | Buy Baby Rawas Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas slices online Mumbai |
| Baby Shark (mooshi) Cubes | `baby-shark-mooshi-cubes` | 225 | Buy Baby Shark (mooshi) Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby shark (mooshi) cubes online Mumbai |
| Baby Surmai - Small | `baby-surmai-small` | 595 | Buy Baby Surmai - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby surmai - small online Mumbai |
| Baby Rawas - Small | `baby-rawas-small` | 475 | Buy Baby Rawas - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - small online Mumbai |
| Baby Rawas - Medium | `baby-rawas-medium` | 745 | Buy Baby Rawas - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - medium online Mumbai |
| Baby Rawas - Large | `baby-rawas-large` | 995 | Buy Baby Rawas - Large Online in Mumbai | Fresh & Hygienically Cut | FishTokri | baby rawas - large online Mumbai |

### Prawns — 24 products (`/prawns/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| White Prawns (Jumbo) - Tail On | `white-prawns-jumbo-tail-on` | 425 | Buy White Prawns (Jumbo) - Tail On Online in Mumbai | Fresh & Hygienically Cut | FishTokri | white prawns (jumbo) - tail on online Mumbai |
| King Crab | `king-crab` | 400 | Buy King Crab Online in Mumbai | Fresh & Hygienically Cut | FishTokri | king crab online Mumbai |
| Lobsters Prawns | `lobsters-prawns` | 1795 | Buy Lobsters Prawns Online in Mumbai | Fresh & Hygienically Cut | FishTokri | lobsters prawns online Mumbai |
| Scampi Prawns - Jumbo (Head On) | `scampi-prawns-jumbo-head-on` | 445 | Buy Scampi Prawns - Jumbo (Head On) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | scampi prawns - jumbo (head on) online Mumbai |
| Seawater Red Prawns (Big) | `seawater-red-prawns-big` | 395 | Buy Seawater Red Prawns (Big) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater red prawns (big) online Mumbai |
| Seawater Red Prawns (medium) | `seawater-red-prawns-medium` | 375 | Buy Seawater Red Prawns (medium) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater red prawns (medium) online Mumbai |
| Seawater White Prawns (big) | `seawater-white-prawns-big` | 445 | Buy Seawater White Prawns (big) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater white prawns (big) online Mumbai |
| Seawater Red Prawns (Small) - Uncleaned | `seawater-red-prawns-small-uncleaned` | 245 | Buy Seawater Red Prawns (Small) - Uncleaned Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater red prawns (small) - uncleaned online Mumbai |
| Seawater Tiger Prawns (Jumbo) - Tail On | `seawater-tiger-prawns-jumbo-tail-on` | 745 | Buy Seawater Tiger Prawns (Jumbo) - Tail On Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater tiger prawns (jumbo) - tail on online Mumbai |
| Seawater White Prawns (Small) | `seawater-white-prawns-small` | 345 | Buy Seawater White Prawns (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater white prawns (small) online Mumbai |
| Seawater White Prawns (Tiny) | `seawater-white-prawns-tiny` | 295 | Buy Seawater White Prawns (Tiny) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater white prawns (tiny) online Mumbai |
| Seawater Red Prawns (Tiny) | `seawater-red-prawns-tiny` | 325 | Buy Seawater Red Prawns (Tiny) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater red prawns (tiny) online Mumbai |
| Seawater Tiger Prawns - Cleaned, Tail On | `seawater-tiger-prawns-cleaned-tail-on` | 695 | Buy Seawater Tiger Prawns - Cleaned, Tail On Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater tiger prawns - cleaned, tail on online Mumbai |
| Lobsters | `lobsters` | 895 | Buy Lobsters Online in Mumbai | Fresh & Hygienically Cut | FishTokri | lobsters online Mumbai |
| Seawater White Prawns (medium) | `seawater-white-prawns-medium` | 395 | Buy Seawater White Prawns (medium) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater white prawns (medium) online Mumbai |
| Seawater Red Prawns (Small) | `seawater-red-prawns-small` | 345 | Buy Seawater Red Prawns (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | seawater red prawns (small) online Mumbai |
| Fresh Water Prawns (Big) | `fresh-water-prawns-big` | 345 | Buy Fresh Water Prawns (Big) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh water prawns (big) online Mumbai |
| Fresh Water Black Tiger Prawns (Big)- Tail On | `fresh-water-black-tiger-prawns-big-tail-on` | 595 | Buy Fresh Water Black Tiger Prawns (Big)- Tail On Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh water black tiger prawns (big)- tail on online Mumbai |
| Fresh Karandi | `fresh-karandi` | 375 | Buy Fresh Karandi Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh karandi online Mumbai |
| Fresh Water Prawns (Medium) | `fresh-water-prawns-medium` | 345 | Buy Fresh Water Prawns (Medium) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh water prawns (medium) online Mumbai |
| Fresh Water Prawns (Medium) - Cleaned, Tail On | `fresh-water-prawns-medium-cleaned-tail-on` | 250 | Buy Fresh Water Prawns (Medium) - Cleaned, Tail On Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh water prawns (medium) - cleaned, tail on online Mumbai |
| Freshwater Prawns - Medium (Un-Cleaned) | `freshwater-prawns-medium-un-cleaned` | 245 | Buy Freshwater Prawns - Medium (Un-Cleaned) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | freshwater prawns - medium (un-cleaned) online Mumbai |
| Fresh Water Prawns (Small) | `fresh-water-prawns-small` | 325 | Buy Fresh Water Prawns (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | fresh water prawns (small) online Mumbai |
| Mussels | `mussels` | 200 | Buy Mussels Online in Mumbai | Fresh & Hygienically Cut | FishTokri | mussels online Mumbai |

### Pomfret — 31 products (`/pomfret/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Silver Pomfret (Xxxl ) - Whole | `silver-pomfret-xxxl-whole` | 2095 | Buy Silver Pomfret (Xxxl ) - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret (xxxl ) - whole online Mumbai |
| Silver Pomfret ( Xxl) - Sliced | `silver-pomfret-xxl-sliced` | 1445 | Buy Silver Pomfret ( Xxl) - Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( xxl) - sliced online Mumbai |
| Khapri Pomfret - Xl , Whole | `khapri-pomfret-xl-whole` | 1345 | Buy Khapri Pomfret - Xl , Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - xl , whole online Mumbai |
| Khapri Pomfret - Xxl Sliced | `khapri-pomfret-xxl-sliced` | 1895 | Buy Khapri Pomfret - Xxl Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - xxl sliced online Mumbai |
| Silver Pomfret - Extra Small , Whole (Pack Of 2) | `silver-pomfret-extra-small-whole-pack-of-2` | 245 | Buy Silver Pomfret - Extra Small , Whole (Pack Of 2) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret - extra small , whole (pack of 2) online Mumbai |
| Khapri Pomfret (paplet) - Large, Whole | `khapri-pomfret-paplet-large-whole` | 895 | Buy Khapri Pomfret (paplet) - Large, Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret (paplet) - large, whole online Mumbai |
| Khapri Pomfret (Paplet) - Small, Sliced | `khapri-pomfret-paplet-small-sliced` | 100 | Buy Khapri Pomfret (Paplet) - Small, Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret (paplet) - small, sliced online Mumbai |
| Silver Pomfret - Medium, Sliced | `silver-pomfret-medium-sliced` | 395 | Buy Silver Pomfret - Medium, Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret - medium, sliced online Mumbai |
| Silver Pomfret - Medium, Whole | `silver-pomfret-medium-whole` | 425 | Buy Silver Pomfret - Medium, Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret - medium, whole online Mumbai |
| Silver Pomfret - Small, Whole (Pack Of 2) | `silver-pomfret-small-whole-pack-of-2` | 345 | Buy Silver Pomfret - Small, Whole (Pack Of 2) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret - small, whole (pack of 2) online Mumbai |
| Silver Pomfret ( Xl ) - Whole | `silver-pomfret-xl-whole` | 995 | Buy Silver Pomfret ( Xl ) - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( xl ) - whole online Mumbai |
| Silver Pomfret ( Xl) - Sliced | `silver-pomfret-xl-sliced` | 945 | Buy Silver Pomfret ( Xl) - Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( xl) - sliced online Mumbai |
| Silver Pomfret ( Xxl ) - Whole | `silver-pomfret-xxl-whole` | 1245 | Buy Silver Pomfret ( Xxl ) - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( xxl ) - whole online Mumbai |
| Khapri Pomfret - Large, Sliced | `khapri-pomfret-large-sliced` | 995 | Buy Khapri Pomfret - Large, Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - large, sliced online Mumbai |
| Khapri Pomfret - Medium, Sliced | `khapri-pomfret-medium-sliced` | 595 | Buy Khapri Pomfret - Medium, Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - medium, sliced online Mumbai |
| Khapri Pomfret - Medium, Whole | `khapri-pomfret-medium-whole` | 725 | Buy Khapri Pomfret - Medium, Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - medium, whole online Mumbai |
| Khapri Pomfret - Small Sliced | `khapri-pomfret-small-sliced` | 375 | Buy Khapri Pomfret - Small Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - small sliced online Mumbai |
| Silver Pomfret ( Large ) - Sliced | `silver-pomfret-large-sliced` | 635 | Buy Silver Pomfret ( Large ) - Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( large ) - sliced online Mumbai |
| Silver Pomfret ( Large ) - Whole | `silver-pomfret-large-whole` | 635 | Buy Silver Pomfret ( Large ) - Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | silver pomfret ( large ) - whole online Mumbai |
| Khapri Pomfret - Xl , Sliced | `khapri-pomfret-xl-sliced` | 1295 | Buy Khapri Pomfret - Xl , Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | khapri pomfret - xl , sliced online Mumbai |
| Halwa Slices - Curry Cut | `halwa-slices-curry-cut` | 800 | Buy Halwa Slices - Curry Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa slices - curry cut online Mumbai |
| Halwa Slices - Mixed | `halwa-slices-mixed` | 295 | Buy Halwa Slices - Mixed Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa slices - mixed online Mumbai |
| Halwa Head And Tail | `halwa-head-and-tail` | 295 | Buy Halwa Head And Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa head and tail online Mumbai |
| Halwa - Xl Sliced | `halwa-xl-sliced` | 1125 | Buy Halwa - Xl Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - xl sliced online Mumbai |
| Halwa Slices - Medium | `halwa-slices-medium` | 345 | Buy Halwa Slices - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa slices - medium online Mumbai |
| Halwa - Large | `halwa-large` | 995 | Buy Halwa - Large Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - large online Mumbai |
| Halwa Cubes - Head & Tail | `halwa-cubes-head-tail` | 700 | Buy Halwa Cubes - Head & Tail Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa cubes - head & tail online Mumbai |
| Halwa - Xxl Sliced | `halwa-xxl-sliced` | 1145 | Buy Halwa - Xxl Sliced Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - xxl sliced online Mumbai |
| Halwa - Small | `halwa-small` | 495 | Buy Halwa - Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - small online Mumbai |
| Halwa - Extra Small | `halwa-extra-small` | 475 | Buy Halwa - Extra Small Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - extra small online Mumbai |
| Halwa - Medium | `halwa-medium` | 745 | Buy Halwa - Medium Online in Mumbai | Fresh & Hygienically Cut | FishTokri | halwa - medium online Mumbai |

### Chicken — 11 products (`/chicken/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Chicken Breast Boneless | `chicken-breast-boneless` | 245 | Buy Chicken Breast Boneless Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken breast boneless online Mumbai |
| Chicken Boneless Cubes | `chicken-boneless-cubes` | 245 | Buy Chicken Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken boneless cubes online Mumbai |
| Chicken Lollipop 1 | `chicken-lollipop-1` | 195 | Buy Chicken Lollipop 1 Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken lollipop 1 online Mumbai |
| Chicken Thigh Boneless | `chicken-thigh-boneless` | 225 | Buy Chicken Thigh Boneless Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken thigh boneless online Mumbai |
| Chicken Lollipop | `chicken-lollipop` | 195 | Buy Chicken Lollipop Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken lollipop online Mumbai |
| Chicken Liver | `chicken-liver` | 75 | Buy Chicken Liver Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken liver online Mumbai |
| Chicken Legs Whole | `chicken-legs-whole` | 325 | Buy Chicken Legs Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken legs whole online Mumbai |
| Chicken Keema-Mince | `chicken-keema-mince` | 260 | Buy Chicken Keema-Mince Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken keema-mince online Mumbai |
| Chicken Gizzard | `chicken-gizzard` | 75 | Buy Chicken Gizzard Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken gizzard online Mumbai |
| Chicken Drumsticks | `chicken-drumsticks` | 145 | Buy Chicken Drumsticks Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken drumsticks online Mumbai |
| Chicken Curry Cut | `chicken-curry-cut` | 175 | Buy Chicken Curry Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | chicken curry cut online Mumbai |

### Mutton — 8 products (`/mutton/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Goat Mutton - Curry Cut | `goat-mutton-curry-cut` | 495 | Buy Goat Mutton - Curry Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat mutton - curry cut online Mumbai |
| Goat Mutton Chops | `goat-mutton-chops` | 595 | Buy Goat Mutton Chops Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat mutton chops online Mumbai |
| Goat Paya | `goat-paya` | 295 | Buy Goat Paya Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat paya online Mumbai |
| Goat Mutton -Boneless Cubes | `goat-mutton-boneless-cubes` | 295 | Buy Goat Mutton -Boneless Cubes Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat mutton -boneless cubes online Mumbai |
| Goat Mutton - Shoulder Cut | `goat-mutton-shoulder-cut` | 595 | Buy Goat Mutton - Shoulder Cut Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat mutton - shoulder cut online Mumbai |
| Goat Mince (keema) | `goat-mince-keema` | 595 | Buy Goat Mince (keema) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat mince (keema) online Mumbai |
| Goat Brain (Bheja) | `goat-brain-bheja` | 195 | Buy Goat Brain (Bheja) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat brain (bheja) online Mumbai |
| Goat - Liver | `goat-liver` | 225 | Buy Goat - Liver Online in Mumbai | Fresh & Hygienically Cut | FishTokri | goat - liver online Mumbai |

### Eggs — 4 products (`/eggs/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Omega Brown Eggs | `omega-brown-eggs` | 300 | Buy Omega Brown Eggs Online in Mumbai | Fresh & Hygienically Cut | FishTokri | omega brown eggs online Mumbai |
| Power Eggs | `power-eggs` | 58 | Buy Power Eggs Online in Mumbai | Fresh & Hygienically Cut | FishTokri | power eggs online Mumbai |
| Free Power Eggs | `free-power-eggs` | 55 | Buy Free Power Eggs Online in Mumbai | Fresh & Hygienically Cut | FishTokri | free power eggs online Mumbai |
| Desi Egg | `desi-egg` | 132 | Buy Desi Egg Online in Mumbai | Fresh & Hygienically Cut | FishTokri | desi egg online Mumbai |

### Dry Fish — 7 products (`/dry-fish/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Dry Sode(Prawns) | `dry-sodeprawns` | 445 | Buy Dry Sode(Prawns) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry sode(prawns) online Mumbai |
| Dry Kardi - Cleaned | `dry-kardi-cleaned` | 345 | Buy Dry Kardi - Cleaned Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry kardi - cleaned online Mumbai |
| Dry Kardi | `dry-kardi` | 325 | Buy Dry Kardi Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry kardi online Mumbai |
| Dry Javla (Tiny Shrimps) | `dry-javla-tiny-shrimps` | 145 | Buy Dry Javla (Tiny Shrimps) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry javla (tiny shrimps) online Mumbai |
| Dry Fish Cleaning | `dry-fish-cleaning` | 60 | Buy Dry Fish Cleaning Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry fish cleaning online Mumbai |
| Cuttlefish | `cuttlefish` | 300 | Buy Cuttlefish Online in Mumbai | Fresh & Hygienically Cut | FishTokri | cuttlefish online Mumbai |
| Dry Bombay Duck (Bombil) | `dry-bombay-duck-bombil` | 345 | Buy Dry Bombay Duck (Bombil) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | dry bombay duck (bombil) online Mumbai |

### Ready To Cook — 15 products (`/ready-to-cook/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Marinated Silver Pomfret - Large Whole | `marinated-silver-pomfret-large-whole` | 595 | Buy Marinated Silver Pomfret - Large Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated silver pomfret - large whole online Mumbai |
| Solkadhi - Classic Taste | `solkadhi-classic-taste` | 125 | Buy Solkadhi - Classic Taste Online in Mumbai | Fresh & Hygienically Cut | FishTokri | solkadhi - classic taste online Mumbai |
| Solkadhi - Garlic & Chilli | `solkadhi-garlic-chilli` | 125 | Buy Solkadhi - Garlic & Chilli Online in Mumbai | Fresh & Hygienically Cut | FishTokri | solkadhi - garlic & chilli online Mumbai |
| Marinated Chicken Lollipop | `marinated-chicken-lollipop` | 145 | Buy Marinated Chicken Lollipop Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated chicken lollipop online Mumbai |
| Marinated Chicken Tikka | `marinated-chicken-tikka` | 175 | Buy Marinated Chicken Tikka Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated chicken tikka online Mumbai |
| Marinated Halwa Slices | `marinated-halwa-slices` | 325 | Buy Marinated Halwa Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated halwa slices online Mumbai |
| Marinated Surmai Slices | `marinated-surmai-slices` | 445 | Buy Marinated Surmai Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated surmai slices online Mumbai |
| Marinated Prawns Koliwada | `marinated-prawns-koliwada` | 375 | Buy Marinated Prawns Koliwada Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated prawns koliwada online Mumbai |
| Marinated Prawns Koliwada (Big) | `marinated-prawns-koliwada-big` | 425 | Buy Marinated Prawns Koliwada (Big) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated prawns koliwada (big) online Mumbai |
| Marinated Rawas Slices | `marinated-rawas-slices` | 425 | Buy Marinated Rawas Slices Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated rawas slices online Mumbai |
| Marinated Silver Pomfret - Small (Whole) | `marinated-silver-pomfret-small-whole` | 375 | Buy Marinated Silver Pomfret - Small (Whole) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated silver pomfret - small (whole) online Mumbai |
| Marinated Silver Pomfret (Small) | `marinated-silver-pomfret-small` | 375 | Buy Marinated Silver Pomfret (Small) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated silver pomfret (small) online Mumbai |
| Marinated Chicken Lollipop | `marinated-chicken-lollipop` | 145 | Buy Marinated Chicken Lollipop Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated chicken lollipop online Mumbai |
| Marinated Silver Pomfret - Medium Whole | `marinated-silver-pomfret-medium-whole` | 445 | Buy Marinated Silver Pomfret - Medium Whole Online in Mumbai | Fresh & Hygienically Cut | FishTokri | marinated silver pomfret - medium whole online Mumbai |
| Add On Marination (Fish Fry) | `add-on-marination-fish-fry` | 99 | Buy Add On Marination (Fish Fry) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | add on marination (fish fry) online Mumbai |

### Spices — 6 products (`/masala-spices/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Saraswat Masala | `saraswat-masala` | 45 | Buy Saraswat Masala Online in Mumbai | Fresh & Hygienically Cut | FishTokri | saraswat masala online Mumbai |
| Ckp Masala | `ckp-masala` | 45 | Buy Ckp Masala Online in Mumbai | Fresh & Hygienically Cut | FishTokri | ckp masala online Mumbai |
| Special Aagri Koli Masala | `special-aagri-koli-masala` | 45 | Buy Special Aagri Koli Masala Online in Mumbai | Fresh & Hygienically Cut | FishTokri | special aagri koli masala online Mumbai |
| Malvani Masala | `malvani-masala` | 45 | Buy Malvani Masala Online in Mumbai | Fresh & Hygienically Cut | FishTokri | malvani masala online Mumbai |
| Add On Marination (Koliwada Mix) | `add-on-marination-koliwada-mix` | 30 | Buy Add On Marination (Koliwada Mix) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | add on marination (koliwada mix) online Mumbai |
| Add On Marination (Tandoori) | `add-on-marination-tandoori` | 99 | Buy Add On Marination (Tandoori) Online in Mumbai | Fresh & Hygienically Cut | FishTokri | add on marination (tandoori) online Mumbai |

### Frozen Foods — 1 products (`/frozen-foods/`)

| Product Name | Slug | Price (₹) | Title Tag | Focus Keyword |
|---|---|---|---|---|
| Frozen Basa | `frozen-basa` | 375 | Buy Frozen Basa Online in Mumbai | Fresh & Hygienically Cut | FishTokri | frozen basa online Mumbai |

## 10. Technical SEO Checklist for Replit Agent

- [ ] Server-render (SSR/SSG) product and category pages — do not rely on client-side-only rendering for indexable content
- [ ] Implement dynamic `<title>` and `<meta name="description">` per route using the templates above
- [ ] Add canonical tags on every page, self-referencing
- [ ] Generate `sitemap.xml` dynamically from the product DB at build/deploy time
- [ ] Add `robots.txt` exactly as specified in Section 2
- [ ] Inject `LocalBusiness` JSON-LD sitewide (Section 5)
- [ ] Inject `Product` JSON-LD on every product page (Section 7)
- [ ] Add `BreadcrumbList` JSON-LD on category and product pages
- [ ] Compress and lazy-load all product images; serve WebP; set explicit width/height to avoid layout shift
- [ ] Ensure mobile Lighthouse score ≥ 90 for Performance, SEO, and Best Practices before going live
- [ ] Set up 301 redirects for any old/legacy URLs (site was previously in maintenance mode — audit old URLs in Search Console once available)
- [ ] Return proper HTTP status codes (200 live pages, 404 for missing products, 410/301 for discontinued products, 503 only during genuine short maintenance windows — never 200 on a maintenance placeholder)
- [ ] Add `hreflang="en-IN"` / `lang="en-IN"` on `<html>` tag
- [ ] Set up Google Search Console + submit sitemap immediately after launch
- [ ] Set up GA4 e-commerce tracking (add_to_cart, purchase events) for organic-traffic conversion tracking later
