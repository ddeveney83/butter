# Portfolio content and provenance

Source: <https://danieldeveney.com/work>, read successfully on 10 October 2026 after the environment allowlist was updated. Eight individual case studies supplied the facts, credited roles, images and video links. Work is attributed to Daniel Deveney; client relationships are not newly attributed to Butter.

| Project | Source format | Recreated preview | Original video |
| --- | --- | --- | --- |
| Allergen Awareness | eLearning | Food-service knowledge check | Yes |
| Matrix Reloaded | Blended learning | Shared-priority conversation | Yes |
| Alcohol & Drug Awareness | eLearning | Private reflection | Yes |
| Record Keeping & Information Management | eLearning | Capture / protect / retrieve journey | Yes |
| 15-Minute Compliance | eLearning | Environmental action ordering | No video in source |
| Information Security | eLearning | Suspicious-message hotspots | Yes |
| Your Learning Platform | Cornerstone LMS | Searchable sample library, filters and saved resources | Omitted: source duplicates Vaccination Programme film |
| Nansen Learning Academy | Webflow LXP, listed in LMS source category | Three learning levels and sample module completion | Yes |

The Work filters group six digital learning experiences under eLearning and two platforms under LMS. Matrix Reloaded retains its **Blended learning** label: the source has five standalone eLearning case studies, and Matrix includes self-paced online modules alongside live sessions and workplace practice. Humankind EducatorHub is excluded at the user's request.

## Assets and attribution

`src/data/projectMedia.json` records original image URLs, alternative text, local paths and source video IDs. Four original images per project (one hero and three gallery screens) are hosted locally as 1200px WebP files, approximately 1.4 MB in total. No image CDN access is needed by visitors. Each case study includes a source link and Daniel's credited role.

Six original videos use click-to-load YouTube privacy-enhanced embeds, with player controls, fullscreen support and direct watch links. Frames are not created until Play is pressed. Videos are referenced through the original public embed IDs rather than downloaded or rehosted. The duplicate video on Your Learning Platform is intentionally not displayed.

Reported results retain their context. For example, the 16% Information Security result is **increased incident reporting**, not reduced incidents; the 15-Minute Compliance £5.5M result is an **estimated six-year saving**, not realised revenue; Nansen's support-ticket reduction applies to academy learners. Interactive previews are recreated examples, not the original courses or connected LMS instances. Search, saved resources, progress and reflection notes are page state only.

## Maintenance

Update facts, outcomes, categories and aliases in `src/data/projects.ts`; update image/video provenance in `src/data/projectMedia.json`. Update course activities in `src/data/coursePreviews.ts` and platform samples in `src/components/PlatformShowcase.tsx`. The six old concept URLs redirect to related sourced projects while preserving query strings and hash links.

Browser coverage includes all eight project routes, legacy redirects, six-versus-two filters, original images, video loading on demand, keyboard galleries, distinct course interactions, LMS samples and responsive layouts from 320px to desktop. Embed interaction is tested with a controlled player response; playback availability is managed by YouTube.
