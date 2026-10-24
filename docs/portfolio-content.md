# Portfolio content and provenance

Source: <https://danieldeveney.com/work>, read successfully on 10 October 2026 after the environment allowlist was updated. The initial eight individual case studies supplied the facts, credited roles, images and video links. The original portfolio belongs to Daniel Deveney. This document retains provenance; the public agency site uses project-focused wording and does not expose personal credits or source-site links. Client relationships are not newly attributed to Butter.

| Project                                 | Source format                              | Recreated preview                                      | Original video                                        |
| --------------------------------------- | ------------------------------------------ | ------------------------------------------------------ | ----------------------------------------------------- |
| Allergen Awareness                      | eLearning                                  | Food-service knowledge check                           | Yes                                                   |
| Matrix Reloaded                         | Blended learning                           | Shared-priority conversation                           | Yes                                                   |
| Alcohol & Drug Awareness                | eLearning                                  | Private reflection                                     | Yes                                                   |
| Record Keeping & Information Management | eLearning                                  | Capture / protect / retrieve journey                   | Yes                                                   |
| 15-Minute Compliance                    | eLearning                                  | Environmental action ordering                          | No video in source                                    |
| Information Security                    | eLearning                                  | Suspicious-message hotspots                            | Yes                                                   |
| Your Learning Platform                  | Cornerstone LMS                            | Searchable sample library, filters and saved resources | Omitted: source duplicates Vaccination Programme film |
| Nansen Learning Academy                 | Webflow LXP, listed in LMS source category | Three learning levels and sample module completion     | Yes                                                   |

The Work filters now group six digital learning experiences under eLearning, three platforms under LMS, two projects under Strategy & capability, and three under Video. Matrix Reloaded retains its **Blended learning** label: the source has five standalone eLearning case studies, and Matrix includes self-paced online modules alongside live sessions and workplace practice. Humankind EducatorHub was added on 24 October 2026 following the user’s explicit request, superseding the earlier exclusion.

## Assets and attribution

`docs/project-media-provenance.json` preserves the original image URLs and video IDs. The frontend data at `src/data/projectMedia.json` contains only local paths, alternative text and video IDs. Four original images per project (one hero and three gallery screens) are hosted locally as 1200px WebP files, approximately 1.4 MB in total. No image CDN access is needed by visitors. Public case studies describe project disciplines rather than an individual’s role; source links and credits stay in this private documentation.

Six original videos use click-to-load YouTube privacy-enhanced embeds, with player controls, fullscreen support and no direct external profile/watch links. Frames are not created until Play is pressed. Videos are referenced through the original public embed IDs rather than downloaded or rehosted. The duplicate video on Your Learning Platform is intentionally not displayed.

Reported results retain their context. For example, the 16% Information Security result is **increased incident reporting**, not reduced incidents; the 15-Minute Compliance £5.5M result is an **estimated six-year saving**, not realised revenue; Nansen's support-ticket reduction applies to academy learners. Interactive previews are recreated examples, not the original courses or connected LMS instances. Search, saved resources, progress and reflection notes are page state only.

## Maintenance

Update facts, outcomes, categories and aliases in `src/data/projects.ts`; update image/video provenance in `src/data/projectMedia.json`. Update course activities in `src/data/coursePreviews.ts` and platform samples in `src/components/PlatformShowcase.tsx`. The six old concept URLs redirect to related sourced projects while preserving query strings and hash links.

Browser coverage includes all fourteen project routes, legacy redirects, shareable discipline filters, original media, video loading on demand, keyboard galleries, course interactions, LMS samples, new case-study placeholders and enquiry context, and responsive layouts from 320px to desktop. Embed interaction is tested with a controlled player response; playback availability is managed by YouTube.


## Additional case studies — 24 October 2026

The user asked to bring across the five recommended projects plus Humankind, excluding Granite Glitch. The source pages below were read on 24 October 2026. New copy describes the documented work and distinguishes delivery outputs from reported outcomes. It does not imply that a client commissioned the newly branded agency. No financial figures have been added.

| Public title | Original source | Discipline |
| --- | --- | --- |
| Strategic Skills Mapping | https://danieldeveney.com/work/strategic-skills-mapping | Learning strategy and needs analysis |
| L&D Digital Upskilling | https://danieldeveney.com/work/ld-digital-upskilling | Team capability and facilitation |
| Introducing AI Conversations | https://danieldeveney.com/work/linkedin-learning | Internal adoption campaign and animation |
| AI-Enabled Scenario Learning | https://danieldeveney.com/work/ai-enabled-scenario-learning | Leadership scenario video |
| Learning at Work Week | https://danieldeveney.com/work/laaw-2024 | Internal communications and character animation |
| Humankind EducatorHub | https://danieldeveney.com/work/humankind-educatorhub | Moodle product development and educator support |

Introducing AI Conversations is an internal campaign for Places for People. LinkedIn Learning is the featured product, not a newly attributed agency client. Humankind is ongoing in 2026; 4,500+ describes indirect student reach through educators, not LMS learner accounts. Its source also reports 1,500+ teacher enrolments and increased teaching confidence reported by 78% of educators. Strategic Skills Mapping reports eight categories, five aligned teams and 17+ individual development plans. The capability programme ran from 2020 to 2022. The scenario library comprises 20 videos across eight programmes. Learning at Work Week comprises seven films; its source client is only identified as the internal L&D team.

### Supplying final images

Each new case study has **four clearly labelled, locally hosted SVG image placeholders** using the existing butter card backdrop: `public/work/<project-id>/overview.svg` and `detail-1.svg` through `detail-3.svg`. They are illustrated layout assets, not screenshots or working application previews. No images or films from the new source projects have been imported. The overview and three detail captions each include an image brief.

Edit `src/data/projectCaseStudies.ts` for the page copy and image briefs. To supply a final image, add an optimised WebP/AVIF file under the matching public directory, then replace the corresponding `hero` or `gallery` entry and alt text in the exported project mapping. Replace the placeholder captions in `ProjectVideo.tsx`, `ProjectCaseStudy.tsx` and static build rendering when the real media is ready. Do not relabel an SVG placeholder as original project imagery. Review all supplied media for personal credits, learner information and permission to publish before inclusion. The existing eight projects continue to use their original previews and media mapping.

The project schema is CreativeWork with butter as the case-study publisher. New placeholder art is not presented as original project evidence in structured data. All six pages are included in static HTML, the sitemap and the public analytics path allowlist. Enquiry links carry a relevant project discipline into the contact form.
