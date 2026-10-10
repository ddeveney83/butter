# Butter

A minimal creative learning studio website, built with React, React Router, TypeScript, and Vite. Butter yellow, bold typography, original SVG characters, responsive layouts, and subtle animation with reduced-motion support.

## Pages

Home, About, Services, Work, Pricing, and Contact each have a dedicated URL. The Work page includes eight sourced projects: six digital learning experiences (including one blended programme) and two LMS/LXP projects, with shareable case study pages and interactive samples. The About and Services pages include keyboard-accessible tabs; service details and pricing FAQs expand in place.

The footer links to the Brand guide at `/brand`: brand principles, copyable colour swatches, a DM Sans typography playground, tone-of-voice examples, illustration guidance, spacing, live components and a replayable motion example. Shared colours, font roles and spacing live in `src/tokens.css`; the guide reads the colour, spacing and motion values directly from the live CSS. The page is in `src/pages/Brand.tsx` and `src/pages/Brand.css`.

Each eLearning project has a three-screen course preview with desktop/mobile views, a distinct activity and reveal cards. The two platform projects have their own samples: an enterprise library with search, filters and saved resources, and an academy with level-based pathways and sample module completion. All previews are clearly labelled recreations with illustrative content; state stays on the page.

Cards and galleries use original project imagery, downloaded as optimised WebP files under `public/work/`. Three source screens per project open in a keyboard-accessible gallery with arrow-key navigation, Escape and focus restoration. Six case studies include original project videos from the source site, embedded from YouTube’s privacy-enhanced host only after the visitor presses Play. Your Learning Platform remains image-led because the source reuses a video from another case study. Project facts and source attribution live in `src/data/projects.ts`, the original asset URLs and video IDs in `src/data/projectMedia.json`, and the recreated course content in `src/data/coursePreviews.ts`. See `docs/portfolio-content.md` for the selection and provenance.

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
npm test
```

The browser tests use Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another Chromium executable when needed. They cover desktop and mobile rendering of all fifteen canonical page/project routes and six legacy project redirects, direct page loads, navigation and browser history, filter persistence, learning samples, keyboard tabs and accordions, stable tab and sample layouts from 320px to 1440px, maximum calculator totals and handoff, contact validation, expanded FAQ layouts, live reduced-motion changes, interrupted page transitions, browser fallbacks, and unknown URLs. `npm run preview` serves the production build.

## Contact and portfolio content

The contact form prepares a draft addressed to `ddeveney83@gmail.com`. The visitor opens it in their email application to review and send. It does not send messages automatically or store visitor information. To change the public contact address, set `VITE_CONTACT_EMAIL` in a local `.env` file or deployment environment, then rebuild.

Portfolio work is credited to Daniel Deveney and linked to the original case studies. Outcomes are reported source figures; projected savings are identified as projections. Edit project facts in `src/data/projects.ts`, course samples in `src/data/coursePreviews.ts` and platform samples in `src/components/PlatformShowcase.tsx`. Pricing defaults and calculator assumptions are in `src/pages/Pricing.tsx`.

## Deploy

Build with `npm run build` and deploy the `dist` directory to a static host. There are no backend services, database requirements, or runtime credentials. Fonts and images are served locally. Video players make external YouTube requests after the visitor chooses to play; no video credentials are required.

### Netlify

Import `ddeveney83/butter` from GitHub in Netlify and select the `main` branch. The included `netlify.toml` configures Node.js 24, `npm run build`, the `dist` publish directory, and a client-side routing fallback so every page and project URL opens directly. The contact address is already included; no environment variables are required for the first deployment.

For deployment from this cloud environment, supply `NETLIFY_AUTH_TOKEN` securely in environment settings with access to `api.netlify.com`. An existing site can be selected with the non-secret `NETLIFY_SITE_ID`; otherwise a new site can be created after account access is verified. Never commit authentication tokens or local Netlify state.
