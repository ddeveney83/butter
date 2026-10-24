# butter

A minimal creative learning agency website, built with React, React Router, TypeScript, and Vite. Warm yellows, a small coral accent, rounded Nunito headings, a lowercase wordmark and matching outlined iconography, responsive layouts, and subtle animation with reduced-motion support.

## Pages

Home, About, Services, Work, butterlearn, Journal, Labs, and Contact each have a dedicated URL. The Work page includes fourteen sourced projects: six digital learning experiences (including one blended programme), three LMS/LXP projects, two strategy and capability projects, and three video campaigns. Six new case studies use labelled image placeholders; the original eight retain their interactive samples. The About and Services pages include keyboard-accessible tabs; service details and project FAQs expand in place.

The footer links to the Brand guide at `/brand`: brand principles, copyable colour swatches, a DM Sans typography playground, tone-of-voice examples, illustration guidance, spacing, live components and a replayable motion example. Shared colours, font roles and spacing live in `src/tokens.css`; the guide reads the colour, spacing and motion values directly from the live CSS. The page is in `src/pages/Brand.tsx` and `src/pages/Brand.css`.

Each eLearning project has a three-screen course preview with desktop/mobile views, a distinct activity and reveal cards. Two of the platform projects have their own samples: an enterprise library with search, filters and saved resources, and an academy with level-based pathways and sample module completion. All previews are clearly labelled recreations with illustrative content; state stays on the page.

Cards combine original course/platform screens with butter’s pastel canvases, outlined and tilted windows, offset shadows and playful illustrations. The same card component is used on Home and Work; its presentation and screen selection live in `src/components/ProjectCardArtwork.tsx` and its stylesheet. The original eight projects use optimised WebP images under `public/work/`. The six newer case studies reuse the same card artwork with local SVG placeholders, one overview and three detail slots per project. Their content and media paths live in `src/data/projectCaseStudies.ts`; the image brief under each slot describes the final media to supply. Replace its `hero` or `gallery` path and alt text when adding final images. Three source screens per project open in a keyboard-accessible gallery with arrow-key navigation, Escape and focus restoration. Six case studies include original project videos from the source site, embedded from YouTube’s privacy-enhanced host only after the visitor presses Play. Your Learning Platform remains image-led because the source reuses a video from another case study. Project facts and source attribution live in `src/data/projects.ts`, local asset paths and video IDs in `src/data/projectMedia.json`, with original URLs retained privately in `docs/project-media-provenance.json`, and the recreated course content in `src/data/coursePreviews.ts`. See `docs/portfolio-content.md` for the selection and provenance.

butterlearn at `/butterlearn` introduces the LMS and includes an interactive learner, manager and admin concept. The actual platform starts at `/butterlearn/login`, with learner dashboards, a course library, HTML/SCORM uploads and playback, persistent progress, publishing, assignments and reports. Production account access requires Netlify Identity to be enabled. See [the butterlearn guide](docs/butterlearn.md) for activation, storage, limits and release scope.


Page navigation uses soft View Transition crossfades where supported, with a simple entrance fallback elsewhere. Shared timing and easing in `src/motion.css` also coordinate scroll reveals, the mobile menu, tab indicators, accordions and hover states. Reduced-motion preferences disable movement and update immediately when changed.

The footer's Motion selector follows the device setting by default and offers Full motion or Reduced motion for this site. The choice is saved locally and applies consistently to CSS, reveals, page transitions, smooth scrolling and the butter trail. Windows' Animation effects setting is reported as reduced motion by Chrome and Edge when switched off. To explicitly enable motion directly, open `https://buttertest.netlify.app/?motion=full`; use `?motion=system` or the footer selector to return to the device setting. This also works for the current visit when local storage is blocked.

Mouse devices use a small SVG butter cursor with context labels for projects, links, tabs, accordions, and controls. Text entry and sliders retain their native cursors; touch devices use their usual controls. Edit the artwork in `public/butter-cursor.svg` and the hint behavior in `src/components/ButterCursor.tsx`. Link and button hints can be overridden with `data-cursor-label`.

Mouse movement leaves a translucent butter ribbon with an eased head, rounded turns and a meteor-like taper from the fuller head to a fine tail. Frame-rate-independent easing and quadratic curves keep the movement smooth; the taper follows distance around the curve, and the smear gradually thins and fades over two seconds. Fast movements remain connected. The canvas effect in `src/components/ButterTrail.tsx` clears on navigation, scrolling and pointer exit, pauses while dragging, and stops drawing once it has faded. Mouse support also covers touch-enabled laptops with a mouse attached. Touch-only devices and reduced-motion preferences disable the trail.

## Develop

Use Node.js 22.12+ (validated on Node.js 24) and npm. Each cloud task is isolated; use this existing checkout without creating a worktree.

```sh
cd /workspace/butter
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

## Validate

```sh
npm run build
npm run test:server
npm test
```

The browser tests use Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another Chromium executable when needed. They cover desktop and mobile rendering of all seventeen canonical page/project routes and six legacy project redirects, direct page loads, navigation and browser history, filter persistence, learning samples, keyboard tabs and accordions, stable tab and sample layouts from 320px to 1440px, contact validation, expanded FAQ layouts, live reduced-motion changes, interrupted page transitions, browser fallbacks, and unknown URLs. Use `BUTTERLEARN_LOCAL_DATA=/tmp/butterlearn-tests npm test` with a fresh Vite server to isolate LMS fixtures. Browser tests also cover real LMS upload/playback/tracking workflows. `npm run preview` serves static build output; it does not start LMS services.

## Contact and portfolio content

The contact form uses Netlify Forms (`butter-contact`) with a honeypot. Form processing is enabled on the existing Netlify site. The enquiries recipient is configured privately in Netlify’s email notification settings, so it does not appear in the frontend. Local browser tests mock capture and failure responses; they do not send real enquiries. Update the destination in Netlify notifications, rather than a `VITE_` variable.

Public case studies use project-focused agency language. Original credits and sources are retained in the private repository documentation, outside the deployed site. Outcomes are reported source figures. Edit project facts in `src/data/projects.ts`, course samples in `src/data/coursePreviews.ts` and platform samples in `src/components/PlatformShowcase.tsx`.

The [24 October agency-site review](docs/agency-site-review-2026-10-24.md) records the structural checks, local Lighthouse results and prioritised lead-generation improvements. It distinguishes the tested production build from the older live deployment, which remains blocked by the Netlify account credit limit.

## Deploy

Build with `npm run build`. The marketing site uses static assets; the LMS also requires the Netlify Functions in this repository, Netlify Blobs and enabled Netlify Identity. Fonts and images are served locally. Video players make external YouTube requests after the visitor chooses to play; no video credentials are required.

### Netlify

Import `ddeveney83/butter` from GitHub in Netlify and select the `main` branch. The included `netlify.toml` configures Node.js 24, `npm run build`, the `dist` publish directory, and a client-side routing fallback so every page and project URL opens directly. Managed storage uses runtime credentials supplied by Netlify. Enable Identity and verify the owner email to activate LMS account access, as described in [docs/butterlearn.md](docs/butterlearn.md).

For deployment from this cloud environment, supply `NETLIFY_AUTH_TOKEN` securely in environment settings with access to `api.netlify.com`. An existing site can be selected with the non-secret `NETLIFY_SITE_ID`; otherwise a new site can be created after account access is verified. Never commit authentication tokens or local Netlify state.

## Journal, Labs and search

The Journal contains 33 original articles: three initial guides, 20 articles on learning design and education in practice, and a ten-article tool-selection collection covering LMS/LXP/LRS roles, authoring, platform evaluation and migration. The index includes search and topic filters. Comparison tables have semantic row/column headings, contained horizontal scrolling on small screens and complete prerendered HTML. Table text is included in article structured data and reading-time estimates. Each article has a direct route, reading time, correctly formatted publication date and two curated related articles. New content lives in `src/data/journal/`, grouped by subject; `sources.ts` holds the external further-reading links. Labs contains five project walkthroughs: Digital Accessibility Now, Resilience Check-in, The Journey, ShredMap and EventHub. Project notes and locally hosted screenshots replace the starter experiments. Each page retains its alpha/beta status and includes an accessible screen gallery. Content lives in `src/data/editorial.ts`; the pages use the shared typography, colour and motion system. The supplied melting-play logo is served as a 32 KB transparent WebP in the shared lockup and hero artwork. `src/components/BrandLogo.tsx` owns the lowercase wordmark; `src/tokens.css` defines the yellow, ink, paper and coral palette. `src/brand-refresh.css` applies the treatment to marketing pages and the learning platform. Nunito is self-hosted for headings and the wordmark, with DM Sans for body text and controls. Matching SVG icons use soft yellow fills, a golden edge, bold rounded black outlines and small coral sparks. The previous mascot assets remain available in `public/brand` but are no longer displayed. The social share card is `public/brand/butter-social.png`.

`npm run build` generates static, crawlable HTML for 69 public pages after Vite, including the full article text, unique descriptions, canonical and Open Graph tags, and structured data. It also generates `sitemap.xml` and `robots.txt`. Set `VITE_SITE_URL` to the final site origin before switching to a custom domain. Private LMS routes and the brand reference page are excluded from the sitemap. Client navigation refreshes the same metadata. Search ranking and indexing are not guaranteed by these technical foundations.


## Enquiries and conversion measurement

The homepage leads with a project enquiry, a concrete service description and reported outcomes linked to their case studies. Seven service pages live under `/services/`: `bespoke-elearning`, `staff-onboarding`, `compliance-training`, `course-refresh`, `learning-strategy`, `ld-team-development` and `learning-animation`. The newer pages connect skills analysis, team capability and animation to their portfolio examples and relevant journal articles. Projects and articles link back to the corresponding services, and enquiry links retain the selected service. `/elearning-devon` describes services for Devon businesses without claiming a studio address or local client engagements. The service and regional pages are prerendered, linked in the site and included in the sitemap with Service structured data. Related journal articles use service-specific enquiry links.

Contact explains the initial conversation and proposal process. No fixed reply-time promise is currently published. The required fields remain name, email and project notes; company and timing are optional. An enquiry includes its allowlisted entry page, preceding public page, and a broad source category. These provide context for the conversation. The static contact page also includes a usable form for browsers without JavaScript. Netlify must register the updated form during the next successful deployment; production inbox delivery still needs checking after publication resumes.

`src/lib/marketing.ts` sends fixed events to the first-party `/api/marketing/events` endpoint: public page views, enquiry clicks, first form interaction and successful or failed form capture. The collector validates event names and public paths, drops extra fields and query strings, rejects other origins and stores daily aggregate counters in the private `butter-marketing-v1` Netlify Blobs store. It stores no names, email addresses, enquiry text, IP addresses or visitor identifiers. It uses no analytics cookies, respects Do Not Track and Global Privacy Control, and excludes private LMS routes. Measurement failures do not interrupt an enquiry. Browser sessions, unique visitors and revenue attribution cannot be inferred from these counts.

The scheduled `marketing-cleanup` function removes daily counter records older than 90 days. The form's private notification destination remains configured in Netlify. The `/privacy` page explains form handling, measurement, media and the motion preference.

Export aggregate counts as CSV:

```sh
# Local development data (defaults to /tmp/butter-marketing).
node scripts/marketing-report.mjs --local --days=30

# Production: supply NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID securely.
node --use-env-proxy scripts/marketing-report.mjs --days=30 > /tmp/butter-marketing-report.csv
```

`BUTTER_MARKETING_LOCAL_DATA` overrides the local counter directory. CSV columns are event, page, source_page and count. Review `enquiry_success` by source_page alongside the Netlify submissions themselves to understand which routes generate enquiries. Do not present these browser-reported totals as unique people or an independent audit of captured submissions; network failures and privacy choices can affect measurement.


## Labs project content

`src/data/labs.ts` holds the five Labs projects, their build notes, technology lists and image captions. `public/labs/` contains the selected original project imagery; `docs/labs-media-provenance.json` records the private source links and excluded images. Screens containing personal author credits were omitted from the public assets. Public data uses only local image paths and studio-focused copy. These are project walkthroughs of the source alpha/beta builds, rather than newly hosted copies of the underlying applications. The image viewer supports arrow keys, Home/End, Escape, focus trapping and focus return.

Retired commercial and journal URLs redirect to the enquiry form and the replacement project-briefing article. Navigation, structured data, forms and the sitemap use the current content only. The retired interactive Labs routes no longer appear in the site; journal links now point to the relevant project or service pages.

The service catalogue lives in `src/data/offers.ts`; each entry supplies page copy, FAQs, relevant project IDs and reading links. `ServiceCards` shares the Home and Devon service grid. `publicPaths` supplies both the anonymous-measurement allowlist and static search-page generation. TypeScript rejects unused local declarations and parameters. The cleanup removed the superseded portfolio-art renderer, styles for retired concept cards, course-image placeholders and the old contact/estimator interface, an unreachable Labs build branch, unnecessary exports and an unused development dependency. Historical redirects, maintenance scripts, live interactions and original media remain in use.
