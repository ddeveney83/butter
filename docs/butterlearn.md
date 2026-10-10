# Butterlearn

The public product page stays at `/butterlearn`. Account access starts at `/butterlearn/login`; the LMS lives at `/butterlearn/app`. Its layout uses Butter's colours, typography, illustration and motion tokens.

## What works

- Email/password sign-in, email confirmation, password recovery and sign-out, backed by managed Netlify Identity in production.
- Learner dashboards with real enrolled courses, status filters, completion and due dates. A searchable library supports self-enrolment.
- HTML files and zipped HTML course packages, SCORM 1.2 and SCORM 2004 packages. The manifest selects launch files and learning objects.
- An isolated course player with persistent completion, normalized scores, session time, lesson location and suspend data. HTML courses have a manual completion button. Multi-object SCORM courses have explicit part selection and aggregate completion.
- Admin uploads, draft previews, publishing, learner roles/groups, individual or bulk course assignments and optional due dates.
- Manager/admin reports with progress filters and CSV export. Three optional, original Butter starter courses exercise HTML and both SCORM formats.

The public interactive product preview remains a clearly labelled concept with fictional sample records. It is independent of the real LMS and never writes to learner accounts.

## Activate account access on Netlify

1. Open the existing site's [Identity dashboard](https://app.netlify.com/projects/buttertest/identity) and enable Netlify Identity. Activation cannot be performed through Netlify's public add-on API.
2. Keep email confirmation enabled: **do not enable automatic confirmation**. Public registration is intended for learner accounts; choose invite-only registration in Identity settings if the workspace should be private. Configure Identity email templates/delivery in the same dashboard as needed.
3. Create and verify the owner's account at `/butterlearn/login` using `ddeveney83@gmail.com`. Only that verified email receives the initial admin role. Other accounts default to learner; admins grant manager/admin access in People. `BUTTERLEARN_OWNER_EMAIL` optionally overrides the owner email as a Netlify function environment variable.
4. Upload and preview a course in Manage courses, then publish it. People appear after their first sign-in; assign published courses from People. Managers see Team progress.

Identity confirmation, invitation and recovery links arriving at the site root are routed to the LMS login page automatically. Tokens are exchanged on the server for Secure, HttpOnly session cookies. Every authenticated request verifies the provider's user response; expired access sessions renew using the refresh cookie. Never put authentication tokens in frontend environment variables.

## Storage and deployment

`netlify.toml` builds the Vite frontend and bundles `netlify/functions`. The three functions are the LMS API, course content handler and background course importer. Deploy the repository through the existing Netlify Git integration; deploying only `dist` to a static host will not provide LMS services.

Netlify Blobs site stores `butterlearn-data-v1` and `butterlearn-files-v1` persist records and private course assets across deploys. The Netlify runtime supplies storage credentials; no database connection string is needed. Conditional writes protect learner records from concurrent saves. Uploads use 1 MB chunks to stay inside function request limits; a background function checks and extracts the archive. Imported courses start as drafts.

The current import limits are 50 MB compressed, 150 MB expanded, 1,500 files and 18 MB per individual asset. Keep required files inside the archive and export a standard unencrypted ZIP. Packages exceeding these limits need a storage/import enhancement. Assets are served through short-lived, random course-session URLs; course frames are sandboxed without same-origin access to the LMS account. Relative CSS, JavaScript, JSON, media and font resources are supported. Courses depending on same-origin parent-page access, top-level navigation or browser storage inside the course may need re-exporting for sandboxed playback.

## Development and validation

`npm run dev` starts Vite plus the local LMS adapter. Development accounts use hashed passwords and HttpOnly cookies, with records under the ignored `.butterlearn-local/` directory. They are verified immediately and do not send email. Development data and accounts never deploy to Netlify. Set `BUTTERLEARN_LOCAL_DATA` to a temporary directory for isolated browser tests.

```sh
npm ci --cache /workspace/.npm-cache
npm run test:server
BUTTERLEARN_LOCAL_DATA=/tmp/butterlearn-browser-tests npm test
npm run build
```

Server tests cover package validation, permissions, session verification/renewal, concurrent writes, tracking and content isolation. Browser tests upload real ZIPs, publish them, play HTML and both SCORM versions, resume a checkpoint, sign back in, inspect persisted reports, assign due dates and check manager permissions on desktop/mobile. `npm run preview` serves only static build output; use Vite development or Netlify to exercise the API.

## Scope of this release

This is a single Butter workspace. Groups are labels, and managers can report on the whole workspace; there is no organisation isolation or manager-specific team boundary yet. SCORM support implements practical runtime tracking and manual multi-object navigation, rather than a certified full SCORM 2004 sequencing engine. Validate representative exports from the intended authoring tools before onboarding a live learning programme.

Certificates, reminders, automatic assignment rules, SSO, multiple organisations, content versioning/deletion, large media uploads and billing remain future work. They are not implied by the concept preview. Production signup/confirmation/recovery checks require Identity activation and an account with access to its email; local tests do not prove email delivery.
