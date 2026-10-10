# Butterlearn product direction

Butterlearn is a future LMS for teams that want welcoming learning, clear progress and straightforward administration. The marketing page at `/butterlearn` presents planned capabilities; the platform is not available yet. `/butterlearn/login` explains that account access is coming soon.

## First working release

- Account sign-in and recovery, with learner, manager and admin permissions.
- Organisation and team membership, with access scoped to each organisation.
- A course library for SCORM packages, video and downloadable resources. Confirm the SCORM version and tracking requirements before implementing the player.
- Assigned learning pathways, due dates, resume points and recorded completion.
- A learner dashboard showing what to do next and personal progress.
- Manager reports for assigned teams, with completion filters and exports.
- Admin course publishing, group management and learning assignments.
- Accessible layouts and controls that work on mobile and with a keyboard.

## Later candidates

Reminders, completion certificates, assessment results, organisation branding and single sign-on. Prioritise these through conversations with prospective teams. Pricing and launch timing are undecided.

## Current concept

The interactive preview in `src/pages/Butterlearn.tsx` uses fictional people and courses. Completing a sample updates Sam’s manager report, and assignment controls demonstrate an admin workflow. State exists only in React and resets when visitors leave the page; it does not create accounts, publish courses, save records or send reminders.

The contact links prefill a Butterlearn enquiry using the existing email-draft form. Keep this marketing route public when the LMS is implemented. Replace the coming-soon login page only once real account access is ready, and connect the preview features to the platform deliberately rather than treating sample state as stored learner data.
