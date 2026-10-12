# Butter

A minimal creative learning agency website, built with React, React Router, TypeScript, and Vite. Butter yellow, bold typography, a supplied cartoon mascot and matching SVG iconography, responsive layouts, and subtle animation with reduced-motion support.

## Pages

Home, About, Services, Work, Butterlearn, Journal, Labs, Pricing, and Contact each have a dedicated URL. The Work page includes eight sourced projects: six digital learning experiences (including one blended programme) and two LMS/LXP projects, with shareable case study pages and interactive samples. The About and Services pages include keyboard-accessible tabs; service details and pricing FAQs expand in place.

The footer links to the Brand guide at `/brand`: brand principles, copyable colour swatches, a DM Sans typography playground, tone-of-voice examples, illustration guidance, spacing, live components and a replayable motion example. Shared colours, font roles and spacing live in `src/tokens.css`; the guide reads the colour, spacing and motion values directly from the live CSS. The page is in `src/pages/Brand.tsx` and `src/pages/Brand.css`.

Each eLearning project has a three-screen course preview with desktop/mobile views, a distinct activity and reveal cards. The two platform projects have their own samples: an enterprise library with search, filters and saved resources, and an academy with level-based pathways and sample module completion. All previews are clearly labelled recreations with illustrative content; state stays on the page.

Cards combine original course/platform screens with Butter’s pastel canvases, outlined and tilted windows, offset shadows and playful illustrations. The same card component is used on Home and Work; its presentation and screen selection live in `src/components/ProjectCardArtwork.tsx` and its stylesheet. Cards and galleries use original project imagery, downloaded as optimised WebP files under `public/work/`. Three source screens per project open in a keyboard-accessible gallery with arrow-key navigation, Escape and focus restoration. Six case studies include original project videos from the source site, embedded from YouTube’s privacy-enhanced host only after the visitor presses Play. Your Learning Platform remains image-led because the source reuses a video from another case study. Project facts and source attribution live in `src/data/projects.ts`, local asset paths and video IDs in `src/data/projectMedia.json`, with original URLs retained privately in `docs/project-media-provenance.json`, and the recreated course content in `src/data/coursePreviews.ts`. See `docs/portfolio-content.md` for the selection and provenance.

Butterlearn at `/butterlearn` introduces the LMS and includes an interactive learner, manager and admin concept. The actual platform starts at `/butterlearn/login`, with learner dashboards, a course library, HTML/SCORM uploads and playback, persistent progress, publishing, assignments and reports. Production account access requires Netlify Identity to be enabled. See [the Butterlearn guide](docs/butterlearn.md) for activation, storage, limits and release scope.

The Pricing page includes illustrative GBP project and support budgets, plus an interactive calculator. Choose a learning format, number of pieces, branching scenarios, and bespoke motion to update the estimate live. The enquiry link carries the estimate into the Contact page. These figures are guides, not fixed quotes or a claim of a universal market rate.

Page navigation uses soft View Transition crossfades where supported, with a simple entrance fallback elsewhere. Shared timing and easing in `src/motion.css` also coordinate scroll reveals, the mobile menu, tab indicators, accordions, pricing updates, and hover states. Reduced-motion preferences disable movement and update immediately when changed.

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

The browser tests use Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another Chromium executable when needed. They cover desktop and mobile rendering of all seventeen canonical page/project routes and six legacy project redirects, direct page loads, navigation and browser history, filter persistence, learning samples, keyboard tabs and accordions, stable tab and sample layouts from 320px to 1440px, maximum calculator totals and handoff, contact validation, expanded FAQ layouts, live reduced-motion changes, interrupted page transitions, browser fallbacks, and unknown URLs. Use `BUTTERLEARN_LOCAL_DATA=/tmp/butterlearn-tests npm test` with a fresh Vite server to isolate LMS fixtures. Browser tests also cover real LMS upload/playback/tracking workflows. `npm run preview` serves static build output; it does not start LMS services.

## Contact and portfolio content

The contact form uses Netlify Forms (`butter-contact`) with a honeypot. Form processing is enabled on the existing Netlify site. The enquiries recipient is configured privately in Netlify’s email notification settings, so it does not appear in the frontend. Local browser tests mock capture and failure responses; they do not send real enquiries. Update the destination in Netlify notifications, rather than a `VITE_` variable.

Public case studies use project-focused agency language. Original credits and sources are retained in the private repository documentation, outside the deployed site. Outcomes are reported source figures; projected savings are identified as projections. Edit project facts in `src/data/projects.ts`, course samples in `src/data/coursePreviews.ts` and platform samples in `src/components/PlatformShowcase.tsx`. Pricing defaults and calculator assumptions are in `src/pages/Pricing.tsx`.

## Deploy

Build with `npm run build`. The marketing site uses static assets; the LMS also requires the Netlify Functions in this repository, Netlify Blobs and enabled Netlify Identity. Fonts and images are served locally. Video players make external YouTube requests after the visitor chooses to play; no video credentials are required.

### Netlify

Import `ddeveney83/butter` from GitHub in Netlify and select the `main` branch. The included `netlify.toml` configures Node.js 24, `npm run build`, the `dist` publish directory, and a client-side routing fallback so every page and project URL opens directly. Managed storage uses runtime credentials supplied by Netlify. Enable Identity and verify the owner email to activate LMS account access, as described in [docs/butterlearn.md](docs/butterlearn.md).

For deployment from this cloud environment, supply `NETLIFY_AUTH_TOKEN` securely in environment settings with access to `api.netlify.com`. An existing site can be selected with the non-secret `NETLIFY_SITE_ID`; otherwise a new site can be created after account access is verified. Never commit authentication tokens or local Netlify state.

## Journal, Labs and search

The Journal contains three original practical guides, with index filters and individual article routes. Labs contains three working, session-only learning experiments. Content lives in `src/data/editorial.ts`; the pages use the shared typography, colour and motion system. The supplied mascot is served as a 155 KB transparent WebP, with its PNG cutout retained for social imagery. Decorative icons use matching warm shading, bold black outlines and cartoon faces.

`npm run build` generates static, crawlable HTML for 23 public pages after Vite, including the full article text, unique descriptions, canonical and Open Graph tags, and structured data. It also generates `sitemap.xml` and `robots.txt`. Set `VITE_SITE_URL` to the final site origin before switching to a custom domain. Private LMS routes and the brand reference page are excluded from the sitemap. Client navigation refreshes the same metadata. Search ranking and indexing are not guaranteed by these technical foundations.
