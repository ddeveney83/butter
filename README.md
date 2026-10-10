# Butter

A minimal creative learning studio website, built with React, TypeScript, and Vite. Butter yellow, bold typography, original SVG characters, responsive layouts, and accessible case-study and contact dialogs.

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

The browser tests use Chromium at `/usr/bin/chromium`. Set `CHROMIUM_PATH` to another Chromium executable when needed. They cover desktop and mobile rendering, navigation, focus management, concept project details, and contact validation. `npm run preview` serves the production build.

## Contact and portfolio content

The contact form prepares a draft addressed to `ddeveney83@gmail.com`. The visitor opens it in their email application to review and send. It does not send messages automatically or store visitor information. To change the public contact address, set `VITE_CONTACT_EMAIL` in a local `.env` file or deployment environment, then rebuild.

The two featured projects are explicitly labelled concepts. Replace their copy and artwork in `src/App.tsx` with approved client work when available. No client relationships, performance metrics, or testimonials are fabricated.

## Deploy

Build with `npm run build` and deploy the `dist` directory to a static host. There are no backend services, database requirements, or runtime credentials. Fonts and artwork are served locally; the site makes no external font or image requests.

### Netlify

Import `ddeveney83/butter` from GitHub in Netlify and select the `main` branch. The included `netlify.toml` configures Node.js 24, `npm run build`, and the `dist` publish directory. The contact address is already included; no environment variables are required for the first deployment.

For deployment from this cloud environment, supply `NETLIFY_AUTH_TOKEN` securely in environment settings with access to `api.netlify.com`. An existing site can be selected with the non-secret `NETLIFY_SITE_ID`; otherwise a new site can be created after account access is verified. Never commit authentication tokens or local Netlify state.
