# Portfolio content handoff

The next portfolio should feature **six eLearning projects and two LMS projects**, selected from <https://danieldeveney.com/work>.

The source site is currently blocked by this cloud environment's network allowlist. A configuration draft adds `danieldeveney.com` and `www.danieldeveney.com`, preserving existing Netlify access. It must be applied before source research can continue. No project names, client claims, outcomes or images from that website have been imported or inferred.

## Prepared preview formats

`src/components/CourseInteraction.tsx` provides six distinct activities, currently demonstrated using Butter's existing, explicitly labelled concept projects:

| Current concept | Preview format |
| --- | --- |
| Onboarding | A guided journey with selectable steps |
| Leadership | A conversation with choices and feedback |
| Wellbeing | A reflection slider, suggestions and a local-only note |
| Compliance | A knowledge check with feedback |
| Sustainability | An ordering activity with keyboard-accessible move controls |
| Product skills | A visual hotspot exploration |

The format is selected through `CoursePreview.interaction` in `src/data/coursePreviews.ts`. The shared player retains device switching, keyboard screen navigation, reveal cards, gallery navigation and reduced-motion support.

## Complete after source access is restored

1. Read the Work listing and individual project pages. Choose six actual eLearning projects and two actual LMS projects, favouring variety in subjects, formats and platform functionality.
2. Record each project's original title, URL, credited role, described deliverables and supported outcomes. Retain attribution to Daniel Deveney; do not imply a new Butter client relationship or invent metrics.
3. Adapt the copy into Butter's voice and choose a preview activity that fits each verified brief. Clearly identify recreated interactive previews and illustrative data.
4. Give the two LMS projects distinct platform previews appropriate to their documented features. Learner-facing and administrator-facing layouts are candidates, subject to source evidence.
5. Import suitable source images where available, with meaningful alternative text. Keep any remaining placeholders labelled.
6. Update the project cards, case studies, Home selections, work filters, counts, metadata and source links for eight projects. Preserve or redirect existing project URLs deliberately.
7. Update the tests for the selected projects, verify direct routes, all eight previews, six-versus-two filters, gallery interactions and small-screen layouts, then publish to Netlify.

The current preview work is a local draft and has not been pushed to the production branch while source selection is blocked.
