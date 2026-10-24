# butter: SEO, lead generation and design review

Reviewed 24 October 2026 (Europe/London). Baseline: `18be886`, with the corrections recorded below. Scope: the public agency website, including the butterlearn marketing entry point, excluding LMS application functionality. The repository build and the public deployment were assessed separately.

## Assessment

The current repository follows the brief well: a lowercase butter identity, paper and black foundations, butter yellow, restrained coral accents, bold rounded Nunito headings and lighter DM Sans copy. Outlined illustrations, the consistent service grid, case-study structure and image-only project galleries make it recognisable as one agency. Journal Cards/List choices and the service-selection guidance improve scanning without adding decorative headings or more navigation.

The next step is to strengthen evidence and conversion, rather than add more visual treatments or a large batch of articles. The biggest gaps are an older live deployment, unfinished project imagery, unverified production enquiry delivery and the amount of code downloaded by the marketing pages. Search Console, rankings, real traffic and qualified-enquiry data were not available; this is an implementation and journey review, not evidence that the site currently ranks or converts.

## Corrections completed in this pass

- Replaced slogan-only search titles on Home, About, Services, Work, Contact, Journal, Labs and Devon with descriptive service/topic titles. The visible headings retain the butter voice. Generated core-page headings are now separated from search titles.
- Added a contextual homepage link to the Devon page, supplementing the footer route without inventing a Devon office or address.
- Curated the two homepage projects to show an eLearning example and an LMS example: Allergen Awareness and Your Learning Platform. Both have original project media. The selection is shared with the static build.
- Connected the twelve journal articles that lacked a specific related service. All 33 now have a relevant service link and a contextual enquiry route. The existing verification script now checks this requirement.
- Added the real butter mark to Organization/publisher structured data.
- Generated six permanent legacy-project redirects from the existing alias data. These are prepared in the build's `_redirects` file for a future hosted release; their server behaviour has not been tested on a new deployment. Browser aliases remain available.
- Corrected service-card, journal-row, project-card and process-tab accessible names to match their visible content. Project thumbnails remain decorative within links whose caption supplies their name; full project images retain their descriptions. Standardised the contrast of inactive tabs and homepage service numbers using the shared muted colour. Removed the unnecessary low-contrast “Aa.” watermark from illustrated journal cards, keeping the card layout and illustration treatment.

No Netlify deployment was triggered. Changes are prepared in the repository and pushed to GitHub only.

## Priorities for SEO and enquiries

| Priority | Evidence | Recommended action |
| --- | --- | --- |
| **1. Plan the production launch** | The public `https://buttertest.netlify.app/` still returns the older “Butter — Learning with feeling.” title. The sitemap and robots URLs both return HTTP 200 with homepage HTML. `/services/lms-development` returns that same older HTML. The repository generates the correct files and pages. | Keep deployment paused as requested. When ready to release, choose the branded domain, set `VITE_SITE_URL`, deploy the tested build, redirect the previous origin and verify the served canonicals, robots file and sitemap. Submit the sitemap in Search Console. Repository changes cannot affect search discovery until released. |
| **2. Verify the enquiry reaches the studio** | The form has three required fields, preserves the brief on failure, carries service/source context and supports successful capture in controlled browser tests. Those tests mock the POST response. They do not prove delivery to the private inbox. | After release, make an authorised production test and confirm both the form record and the email notification. Verify replies and spam handling. Keep the current destination private. Agree a response window before putting one in public copy. |
| **3. Replace placeholders with persuasive evidence** | Six of fourteen case studies still use image placeholders. There are useful reported results, original examples and project films, but no approved testimonial section on the agency pages. | Prioritise final media for LMS architecture, skills strategy and animation. Show a real screen or decision, the business problem, the delivery constraints and what changed. Add two or three approved quotes with context. Keep reported results labelled and explain the measurement period or method where available. |
| **4. Reduce mobile page weight** | The main production bundle is about 732 KB of JavaScript / 222 KB gzip, plus 138 KB of CSS / 26 KB gzip. Lighthouse identifies unused code, render-blocking resources and main-thread work. Public routing imports LMS modules, while shared metadata imports full article data. | Separate LMS imports from the marketing entry point. Separate lightweight metadata from full article bodies so route splitting actually reduces downloads. Add responsive image variants for card screens and reduce critical CSS. Validate on representative mobile hardware and then use field Core Web Vitals. Target LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile. |
| **5. Build local authority around Devon** | There is one substantive Devon page, coverage of Exeter, Plymouth, Torbay and North Devon, a footer link and now a homepage link. There is no verified local office, address, regional client testimonial or business-profile evidence in this review. | Add a genuine regional project or example, a clear remote/on-site delivery statement once confirmed, and relevant partner or regional directory links. Assess eligibility for a service-area business profile. Keep the business name and contact details consistent. Add separate town pages only when they provide genuinely different local evidence and usefulness. |
| **6. Measure qualified leads, not just clicks** | Anonymous page views, enquiry clicks, form starts, successes and errors exist. These are event totals, not unique visitors, qualified opportunities or revenue. | Review the event report alongside a private enquiry log each week: service, source page, fit, next action and outcome. Use this to identify where people stop. Check form delivery before rewriting a page because it appears to produce few leads. |

## Search opportunities in the existing content

The site already has eight service pages, fourteen case studies, 33 articles and five Labs projects. Build depth around those assets before increasing volume. These are intent clusters to validate in Search Console after launch, not researched search-volume estimates or ranking promises.

| Buyer intent | Primary page | Supporting evidence or content |
| --- | --- | --- |
| Bespoke eLearning design and development | `/services/bespoke-elearning` | Original learning examples; objectives, scenarios, authoring-tool selection and project-briefing guides. |
| LMS architecture, Moodle and platform development | `/services/lms-development` | Platform case studies; LMS/LXP/LRS, open-source/managed platforms and tracking guides. Complete the Humankind imagery. |
| LMS delivery, migration and project management | `/services/lms-project-management` | Platform rollout evidence; selection, pilot, migration and acceptance-testing guidance. A practical migration checklist would be a useful next addition. |
| Compliance training design | `/services/compliance-training` | Record-keeping and food-safety examples; scenarios and authentic assessment. Explain the role of the client's policy reviewers. |
| eLearning refresh and accessibility improvement | `/services/course-refresh` | Existing refresh example; WCAG, accessible authoring and QA articles. Offer a clearly scoped course-review conversation. |
| Learning strategy and needs analysis | `/services/learning-strategy` | Skills-mapping evidence; needs analysis and learning objectives. Complete the project visuals. |
| L&D team capability and authoring support | `/services/ld-team-development` | Practical upskilling case study, worked examples and feedback. Add a sample workshop output or reusable design resource. |
| Training animation and learning video | `/services/learning-animation` | Existing films, storyboards and scenario examples. Use a short captioned production reel or final frames when cleared. |
| eLearning and LMS support for Devon businesses | `/elearning-devon` | Regional delivery information and genuine local proof. Link to the relevant service rather than creating duplicate versions of every service page. |

Twelve existing articles gained service links in this pass. Next, add a few contextual links within relevant article paragraphs, where they help the reader choose a next step. Keep the topic-specific bottom CTA. Review overlapping learning-platform articles against the queries they actually receive before consolidating or rewriting them. Keep the butter studio byline and credible sources, and add real review dates when content changes.

Several article titles are long enough that search results may truncate them. That is not a ranking failure by itself. Shorten a title only when the intended topic is unclear or Search Console suggests a useful improvement; retain the natural, specific article headings.

## Lead-generation improvements to pursue

1. **Make the evidence easy to assess.** Complete the three most commercially useful placeholder projects before expanding the portfolio. Put approved screenshots, useful constraints and a client voice alongside the existing results. A focused sample is more persuasive than another generic claim about creativity.
2. **Offer a useful first conversation.** The existing form and no-obligation copy are a good foundation. Define what a course review or LMS discovery conversation covers and what the prospect should bring. Do not promise a free audit, turnaround or outcome until the studio can support it.
3. **Give readers a practical resource.** Reuse the project-briefing article as a concise, ungated briefing checklist with a contextual enquiry link. This supports the buyer without adding another required form or competing with Contact.
4. **Strengthen the agency profile.** About explains values well but has little concrete operational evidence. Add verified capabilities, delivery arrangements and approved client/partner references. Keep the agency voice and avoid unsupported headcounts, years, credentials or location claims.
5. **Protect the buying journey.** Keep Services, relevant Work and Contact prominent. Labs and butterlearn should support the agency story with clear labels and a route back to an enquiry. Preserve the requested navigation and assess its effectiveness using real enquiry context before changing it.

## Design consistency and remaining technical work

- Retain the desktop 4×2 service grid. The card-to-guidance flow now uses one catalogue and a consistent illustration vocabulary; adding more category systems would make it harder to choose.
- Keep yellow as the main interaction colour and coral for small accents and focus. Pastels belong inside project-media canvases rather than becoming a second site palette.
- Keep headings bold and body text quieter. Topic labels, read times and project facts serve a purpose; avoid adding decorative eyebrows, badges and repeated subheadings.
- Preserve reduced-motion behaviour, native touch cursors, keyboard focus and content that stays usable without hover. Voice-control label checks informed the accessible-name correction in this pass.
- Keep the reusable gallery and project structure. Replace the labelled placeholder assets rather than designing a separate layout for each new project.
- Consolidate static and client rendering before a larger redesign. The build generates full article/case-study text, but some core-page HTML is a simplified parallel template. It can drift from the React presentation; using one rendering source would improve maintenance and initial-view consistency.
- Replace the catch-all HTTP 200 response for unknown public URLs with a genuine hosted 404 while explicitly preserving valid application routes. The six known project aliases are now prepared as permanent redirects; unknown-route handling still needs a hosted routing test.
- Add visible, restrained breadcrumbs and matching BreadcrumbList data on deep pages if navigation testing supports it. FAQ content is useful for people; agency FAQ markup should not be sold as a guaranteed rich-result opportunity.
- Keep the Brand guide outside the sitemap. Its current robots block means crawlers may not see the client-side noindex instruction; serve a crawlable noindex response or move the guide behind access control as part of routing cleanup.

## Verification and limitations

The production build and search verification pass. The static sweep covers 70 public pages: one H1 each, unique titles, descriptions and canonicals, no missing internal page links or fragment targets, valid local image paths and no images missing an alt attribute. Alt-attribute presence is not a complete review of alternative-text quality. All 33 articles now have a service route; no public pricing copy, personal attribution or private enquiry destination was introduced.

Twenty-four desktop/mobile browser checks passed across public routes, enquiry journeys, article filtering, keyboard interactions, narrow layouts and privacy signals. Ten focused follow-up checks passed after the article-link and accessible-name corrections. Another ten checks cover the shared project-card and tab changes, including gallery focus/scroll restoration. A wider axe-core sweep of eight representative marketing pages at desktop and mobile widths passed all sixteen checks against its WCAG A/AA rules after the contrast and label corrections. This is automated coverage, not a complete manual accessibility audit. Controlled enquiry tests did not send a real enquiry or notification.

Lighthouse was run against the local production preview, not the live site. Home, Contact and the LMS-development service page pass the final automated accessibility and technical SEO categories at 100/100. Those checks do not establish full accessibility compliance or ranking potential.

The isolated homepage mobile run scored 89/100 for performance: LCP 3.1 seconds, total blocking time 80 ms and CLS 0.003. Earlier runs varied while browser tests were running; the isolated result is the useful local baseline. Layout stability is good, but LCP is above the 2.5-second target. This is a simulated lab result, not field Core Web Vitals or evidence of conversion performance.

No Search Console inspection, domain ownership check, live submission, client-quote approval or field-user measurement was performed. The public deployment remains older; publishing and inbox verification are deliberately left for the agreed launch stage.

## Suggested order

Prepare the branded production origin and enquiry-delivery check for the eventual release; finish the strongest three project examples; reduce the marketing bundle; add regional proof and one practical buyer resource; then review qualified enquiries and Search Console queries before adding more pages.
