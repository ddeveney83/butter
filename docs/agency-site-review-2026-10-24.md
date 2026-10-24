# Agency structure and lead-generation review — 24 October 2026

The new build provides a solid agency-site foundation: clear service routes, a substantial portfolio, useful editorial content and a straightforward enquiry form. Its effectiveness as a lead generator is still unproven. The immediate barrier is deployment; the next priorities are credible visual evidence, stronger connections between services and work, and measurement of qualified enquiries.

Scope: the public agency website, excluding LMS functionality. Reviewed implementation: `a65600b`, followed by the text-contrast correction included with this report. The portfolio additions were pushed to GitHub before this review. This assessment distinguishes the production build tested locally from the older website currently served by Netlify.

## What is in place

- **66 crawlable public pages:** ten core pages, four service pages, fourteen project case studies, 33 journal articles and five Labs projects. The brand reference page and private learning routes are excluded from the sitemap.
- The Work index now covers eLearning, LMS, strategy and capability, and video. Shareable filters help visitors find a relevant discipline. Each project has a dedicated URL, project context, a documented approach, reported results and an enquiry route.
- The six new case studies have one overview and three detail-image slots each. Their illustrated placeholders deliberately reuse the butter card treatment. Captions explain what final media to supply; they do not claim to be original screenshots or functioning products.
- The homepage introduces the offer and reported project outcomes. Four service landing pages connect a buying need to deliverables, a relevant project, useful reading and a contextual enquiry. The Devon page provides a regional entry point without inventing an office address.
- The contact form has three required fields: name, email and project description. Company and timing are optional. Contextual enquiry links preselect an interest, and submissions retain the originating page and broad acquisition source. Error handling keeps the visitor’s brief available for retry.
- Canonicals, social metadata, article/service/project structured data, XML sitemap generation and robots rules are implemented. Public bundles are checked for personal attribution and the private contact destination.

## Priorities

| Priority | Finding and evidence | Recommended next step |
| --- | --- | --- |
| **P0 — Restore deployment** | Netlify marked the `a65600b` deployment as an error: `Skipped due to account credit usage exceeded`. The public homepage still has the older “Butter” title. Requests to the public `/sitemap.xml` and `/robots.txt` returned HTTP 200 with homepage HTML, not their intended content. New project URLs also return that old HTML. | Resolve the account credit limit, deploy the latest commit, then check the live page content, XML sitemap and robots response. Until then, search engines and prospects cannot receive the improvements in this repository. |
| **P0 — Verify real enquiry delivery** | Browser tests confirm capture success/error handling using controlled responses. They do not prove that a genuine production submission reaches Netlify Forms and the private inbox. | Once deployed, perform an authorised end-to-end test, check the Netlify submission record and inbox notification, and confirm reply handling. Keep the Gmail destination private as requested. |
| **P1 — Add convincing project evidence** | The six new pages contain the requested image placeholders. Existing outcomes are labelled as reported results; there are no client testimonials on the public agency pages. | Populate the new hero/detail slots with cleared project media. Prioritise one strong strategy example, one animation sequence and Humankind’s educator journey. Add approved client quotes or references with concrete context where available. Keep indirect student reach distinct from platform enrolment and avoid claiming historical commissions as new butter engagements. |
| **P1 — Connect the broader offer** | Dedicated service routes currently cover bespoke eLearning, onboarding, compliance and course refreshes. Strategy, capability development and animation appear in the Services overview and new case studies, but have no equivalent service landing pages. Home currently features the first two eLearning projects. | Add focused strategy/capability and learning-animation service pages, linking each to the relevant case studies and articles. Curate the homepage work selection to show contrasting disciplines once final media is ready. Add a relevant enquiry link after a case study’s outcome as well as at its end. |
| **P1 — Establish a branded production origin** | Canonicals and the sitemap default to `https://buttertest.netlify.app`. `VITE_SITE_URL` already allows this to be changed. | Connect the final branded domain, set the production origin consistently and redirect the staging origin. Verify the resulting sitemap in Search Console. Search Console access and indexing status were not established during this review. |
| **P2 — Reduce mobile download and rendering work** | The production entry bundle is approximately 699 KB of JavaScript, 213 KB gzipped, plus 150 KB of CSS, 28 KB gzipped. The baseline mobile Lighthouse run identified unused page code, oversized card imagery and render-blocking CSS. | Split public routes and full article bodies into smaller loads, provide responsive image sizes for card artwork, and reduce CSS needed by the first view. Retest after deployment and use field data when enough traffic exists. Aim for a 75th-percentile LCP of 2.5 seconds or less rather than optimising only a lab score. |
| **P2 — Measure lead quality** | Anonymous page views, enquiry clicks, form starts, successes and errors are implemented, with a CSV report script. These are event counts, not deduplicated people, qualified opportunities or won projects. | Review the counts alongside real enquiries weekly. Record qualified/unqualified, service, source page, next action and outcome in a simple private lead log or CRM. Agree a response window the studio can sustain. Do not infer unique visitors or a reliable conversion rate from raw events alone. |
| **P2 — Tighten routing and regional discovery** | The SPA catch-all in `netlify.toml` returns HTTP 200 for unknown URLs. Legacy project aliases redirect in React rather than with server-side 301s. The Devon page is linked in the footer, but local enquiries and regional search performance are unmeasured. | Add permanent redirects for known old project URLs and an appropriate HTTP 404 for unknown public pages while retaining valid app routes. Strengthen the Devon page with genuine local evidence and relevant regional links. Use a real, eligible service-area business profile if appropriate; avoid thin town-by-town duplicate pages or invented premises. |

## Validation and limits

The production build and `scripts/verify-search.mjs` pass. A static audit of all 66 generated pages found one H1 per page, no missing local image files, no image elements missing an alt attribute, and no unresolved internal page links among the generated content and known app routes. This does not establish the quality of every alternative-text description or validate every fragment link.

Thirty-six relevant browser checks passed across desktop and mobile after updating the gallery test’s stale caption expectation. Coverage includes all project routes, the new filters and case-study content, original course interactions, keyboard galleries, enquiry context, delivery-error recovery and privacy signals. Twenty server tests also passed, including anonymous measurement and its privacy controls. The broader agency-page sweep checked for runtime errors, horizontal overflow, personal attribution and incorrect brand capitalisation.

The review found insufficient contrast in legacy secondary labels on the contact and project pages: small text ranged from 3.08:1 to 4.48:1 against the paper background. Those labels now use the shared `--muted` colour. The final Lighthouse results are recorded below after rechecking the correction.

| Local production page | Mobile performance | Automated accessibility | Technical SEO |
| --- | --- | --- | --- |
| Home | 91/100 | 100/100 | 100/100 |
| Contact | Not measured | 100/100 | 100/100 |
| Humankind EducatorHub | Not measured | 100/100 | 100/100 |

The final homepage run measured a simulated LCP of 3.0 seconds, total blocking time of 60 ms and CLS of 0.003. The contrast checks passed on all three audited pages following the correction.

Lighthouse was run against the local production preview with a simulated mobile profile. Automated scores are a limited check; they are not a manual accessibility audit, field performance data, evidence of search indexing, or evidence of production enquiry delivery. The public site remains on an older deployment until the Netlify account limit is resolved.

The recommended sequence is to restore deployment and verify enquiry delivery, populate the strongest visual evidence, connect that evidence to relevant service pages, then improve mobile performance and review qualified-lead data. Further article volume is a lower priority than making the existing content and work convert.
