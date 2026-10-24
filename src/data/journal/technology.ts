import type { Article } from "../editorial";
import { sources } from "./sources.ts";

export const technologyArticles: Article[] = [
  {
    slug: "accessible-elearning-wcag",
    title: "Accessible eLearning: a practical WCAG review plan.",
    description:
      "Plan an accessible eLearning review across content, interactions, media and the LMS, using WCAG 2.2 and real learner journeys as a starting point.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Review the whole learner journey.",
        paragraphs: [
          "An accessible course needs more than readable slides. A learner must also be able to find it, sign in, launch it, use the controls, understand feedback and return to their progress. Review the learning platform, course player and content as a connected journey. An accessible activity behind an inaccessible login still leaves someone unable to participate.",
          "WCAG 2.2 provides testable accessibility criteria for web content. Agree the target conformance level and the scope of the review with the responsible team. A quick checklist can identify problems, but cannot establish that every relevant criterion has been met. Keep a record of what was tested, on which versions and with which tools.",
        ],
      },
      {
        heading: "Start with structure and language.",
        paragraphs: [
          "Use meaningful headings, descriptive links and labels that explain what a control does. Keep instructions close to the activity they describe. Write text alternatives according to an image’s purpose: a decorative flourish does not need a detailed description, while an instructional diagram may need a fuller text explanation of its relationships.",
          "Check that meaning survives without colour, sound or a particular screen position. ‘Select the green option on the right’ depends on information some learners may not perceive. ‘Select the option labelled Escalate’ gives a clearer route. Plain language reduces avoidable complexity, but should retain the terminology and distinctions learners need for the task.",
        ],
      },
      {
        heading: "Test interactions with more than a mouse.",
        paragraphs: [
          "Complete the activity using a keyboard. Check that focus is visible, the sequence makes sense and no control traps the user. A tab should expose its selected state; an accordion should communicate whether it is open; a quiz should make the result available without relying only on an animated colour change. Test the behaviour with relevant assistive technology, not just the appearance.",
          "Zoom the interface and check reflow on a narrow viewport. Look for clipped feedback, overlapping navigation and text that can no longer be read alongside its controls. Provide an alternative to an interaction that depends on a complex pointer gesture when required. If timing is involved, examine whether learners can pause, extend or otherwise complete the task under the applicable criteria.",
        ],
        points: [
          "Sign in, launch and return using the keyboard.",
          "Check accessible names, roles, states and error messages.",
          "Test text contrast, visible focus, zoom and reflow.",
          "Confirm that instructions and feedback remain understandable without colour alone.",
        ],
      },
      {
        heading: "Plan media alternatives before recording.",
        paragraphs: [
          "Captions should represent speech and meaningful sounds, with accurate timing and speaker identification where needed. A transcript supports another route to audio information, but does not automatically replace every requirement for a synchronised media alternative. If important visual information is not explained in the soundtrack, plan how a learner who cannot see it will receive that information.",
          "For a software demonstration, narrating ‘choose the Reports tab’ is more informative than ‘click here’. If the learning depends on a silent visual change, describe it in the script or provide an appropriate audio description or other required alternative. Check the finished player for keyboard operation and accessible controls as well as the accuracy of its media.",
        ],
      },
      {
        heading: "Combine checks with learner evaluation.",
        paragraphs: [
          "Automated tools can identify some issues, such as certain missing labels or contrast failures. They cannot judge every instruction, reading sequence or activity. Combine them with manual testing and evaluation involving disabled learners. W3C’s Easy Checks is a useful first review, explicitly presented as preliminary rather than a complete conformance assessment.",
          "Log each issue with its location, impact, reproduction steps and owner. Retest after a fix and check that a course update has not broken a previously working route. Accessibility is part of design, production and maintenance. Treating it as a final export setting makes both barriers and rework more likely.",
        ],
      },
    ],
    relatedSlugs: [
      "universal-design-for-learning",
      "elearning-quality-assurance",
    ],
    resources: [sources.wcag, sources.checks, sources.media],
    action: { to: "/services", label: "Discuss accessible digital learning" },
  },
  {
    slug: "ai-in-instructional-design",
    title: "AI in instructional design: useful drafts, human decisions.",
    description:
      "Use generative AI in instructional design with a clear brief, source checks, privacy boundaries and human review of learning and assessment decisions.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Choose a bounded job for the tool.",
        paragraphs: [
          "Generative AI can produce drafts, alternatives and summaries that an instructional designer can inspect. It does not know whether a proposed activity fits your audience, whether an explanation matches local policy or whether a fluent answer is factually correct. Start with a task whose output you are qualified to evaluate and whose errors you can catch before they reach learners.",
          "Useful tasks might include suggesting alternative phrasings for an instruction, generating possible misconceptions for review or identifying places where a storyboard changes terminology. These are starting points for professional judgement. Asking a tool to produce and approve a complete course combines too many uncertain decisions into one apparently finished output.",
        ],
      },
      {
        heading: "Protect the inputs before improving the prompt.",
        paragraphs: [
          "Use only tools and data permitted by your organisation. Check whether learner records, client material, personal information or confidential policy content may be entered. Removing a person’s name does not necessarily make a detailed case anonymous. Review the provider’s data handling and the settings available to your organisation with the appropriate privacy and security teams.",
          "A safe prompt can use a fictional situation and an approved public reference instead of a real customer case. State the audience, intended action, constraints and output format. Tell the tool which parts are uncertain and require a reviewer. A longer prompt cannot compensate for an unauthorised input or an unreliable source.",
        ],
      },
      {
        heading: "Use a draft to expose choices.",
        paragraphs: [
          "For example: ‘Suggest three plausible responses to a fictional handover problem for new team leaders. Keep the options similar in length. Explain the assumption behind each. Do not invent company policy.’ The response may reveal useful alternatives, but each one still needs a check for realism, fairness and alignment with the intended learning outcome.",
          "Ask whether the preferred option is obvious because it is longer, more polite or filled with official language. Check whether the situation supplies enough information. Replace stereotypes and generic organisational language with context you can justify. The aim is not to preserve the generated text; it is to use the draft to make better design decisions.",
        ],
        points: [
          "Name the audience, task and conditions.",
          "Use approved material and fictional or authorised examples.",
          "Ask for alternatives and assumptions that a reviewer can inspect.",
          "Keep an accountable person responsible for the final decision.",
        ],
      },
      {
        heading: "Verify facts, sources and assessment logic.",
        paragraphs: [
          "Check factual claims against reliable source material and confirm that cited publications actually exist and support the statement. Review dates, terminology and local requirements. Generated citations can look credible while being wrong. A second AI-generated answer is not an independent verification of the first.",
          "Assessment needs particular care. Inspect whether there is a defensible answer, whether alternatives are plausible and whether feedback accurately explains the reasoning. In higher-stakes settings, follow the organisation’s assessment validation and moderation processes. Do not use an unvalidated model response as the sole basis for judging a learner’s competence.",
        ],
      },
      {
        heading: "Evaluate the workflow as well as the output.",
        paragraphs: [
          "Try the workflow on a small piece of content. Record the review and correction effort as well as the drafting time. Ask whether the finished work is more useful, accurate and accessible than your normal approach. A rapid first draft can create a slower overall process if it introduces errors that are difficult to detect.",
          "Keep a short record of the tool, approved use, sources and human checks appropriate to the project. UNESCO’s guidance on generative AI in education and research is a useful reference for a human-centred approach, including privacy and inclusion. Revisit your process as tools and organisational rules change; the learning goal and responsibility for the learner remain with the people designing the experience.",
        ],
      },
    ],
    relatedSlugs: ["elearning-storyboarding", "authentic-assessment"],
    resources: [sources.ai],
    action: { to: "/labs", label: "Explore small learning experiments" },
  },
  {
    slug: "choosing-lms",
    title: "How to choose an LMS: test the learner journey first.",
    description:
      "Choose a learning management system by testing real learner and admin journeys, course formats, accessibility, reporting and exit requirements.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Write journeys before the feature list.",
        paragraphs: [
          "A learning management system can store courses and records, but your users experience a sequence of tasks. A new starter accepts an invitation, finds assigned learning, launches a course, pauses and returns. A manager checks progress for the people they support. A content owner updates a resource without accidentally losing its history. Start your selection with these journeys.",
          "Choose a few representative cases, including an awkward one. You might need to support a learner with limited connectivity, an external participant or a manager responsible for more than one team. A demonstration that follows your cases will reveal more than a tour of the vendor’s most polished screens.",
        ],
      },
      {
        heading: "Test the content you actually intend to use.",
        paragraphs: [
          "Upload representative HTML and SCORM packages rather than relying on a compatibility badge. Check the versions supported, launch behaviour, completion rules, scores and resume state. Include video, accessible interactions and any external resources. A package being accepted for upload does not prove that all of its tracking and media will behave as intended.",
          "Follow a complete attempt: start, make progress, close, sign out, return and finish. Check the learner view and the reporting record. Repeat on the devices and browsers the audience uses. If an integration or content standard is essential, ask the supplier to demonstrate that exact requirement and explain any limits in writing.",
        ],
      },
      {
        heading: "Give administrators and managers real tasks.",
        paragraphs: [
          "Ask an administrator to enrol a group, update a due date and correct an assignment. Ask a manager to find someone who needs support without seeing unrelated teams’ information. Ask a content creator to save a draft, preview it and understand the publication workflow. Time spent on routine administration can matter as much as an attractive learner homepage.",
          "Inspect permission boundaries using separate accounts, not just screenshots. If administrators can switch role views, check that the interface makes the assumed view clear and that the server enforces the intended permissions. A role selector is convenient for review, but should not allow an ordinary learner to gain administrative powers.",
        ],
        points: [
          "Learner: find, launch, resume and finish the relevant learning.",
          "Manager: see the right team and identify a useful support action.",
          "Creator: draft, preview, revise and submit content appropriately.",
          "Administrator: assign, publish, audit and correct records safely.",
        ],
      },
      {
        heading: "Review accessibility, data and operations.",
        paragraphs: [
          "Include accessibility testing across login, navigation, course playback and reporting. Ask what evidence supports the supplier’s claims and how issues are resolved. Involve the people responsible for security, privacy, identity and procurement early. Consider data location, retention, exports, backups, support arrangements and what happens during an outage.",
          "Define the reports you need and who should see them. Completion, assessment outcomes and evidence of workplace performance answer different questions. Ask to export sample records and confirm that identifiers and dates are usable outside the interface. A dashboard that looks informative may still fail to supply the data your operational process needs.",
        ],
      },
      {
        heading: "Compare the whole arrangement, including the exit.",
        paragraphs: [
          "Compare the service arrangement using a realistic audience and workflow. Clarify how active users, storage, support, integrations and implementation will be managed. Ask what you can export when you leave: course packages, learner records, authored content and media may have different arrangements. Keep the requirements and the evidence from demonstrations together so the decision remains reviewable.",
          "butterlearn can be explored with HTML and SCORM examples, learner dashboards and role-based workflows. Those features are a starting point for a technical conversation, not a substitute for checking your production requirements. Whichever platform you consider, a small pilot using real tasks is a useful final test before a wider commitment.",
        ],
      },
    ],
    relatedSlugs: ["lms-vs-lxp-vs-lrs", "elearning-tool-pilot-checklist"],
    resources: [sources.checks],
    action: { to: "/butterlearn", label: "Explore the butterlearn platform" },
  },
  {
    slug: "learning-analytics",
    title: "Learning analytics: start with a decision, not a dashboard.",
    description:
      "Plan learning analytics around useful questions, trustworthy data and proportionate privacy, with examples that distinguish completion from performance.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Name the decision the data should support.",
        paragraphs: [
          "Learning analytics can help a team understand participation, progress and patterns in responses. Its usefulness depends on the question being asked and the quality of the data available. Start with a decision: who needs support, which explanation needs revision or whether a delivery problem is preventing access. Then identify the minimum evidence needed to inform it.",
          "For example, a manager might need to know which new starters have not finished an assigned course before a supported practice session. A designer might need to know which scenario produces a recurring misunderstanding. These are different questions, requiring different records and different permissions. Combining them into one large dashboard does not automatically make either decision easier.",
        ],
      },
      {
        heading: "Define what each record actually means.",
        paragraphs: [
          "A completion field might mean that a learner reached a final screen, selected a finish control or met an assessment condition. A time field might represent active interaction, an open browser session or a value reported by the course. Write down the operational definition before interpreting the number. Different packages can report similar-looking fields in different ways.",
          "Long time spent could reflect careful practice, an interruption, a confusing screen or an inaccessible interaction. Short time spent could reflect prior knowledge or a resource that efficiently answered a question. Avoid labelling either pattern as engagement without further evidence. A metric is an observation produced by a system, not a complete explanation of the learner’s experience.",
        ],
      },
      {
        heading: "Connect patterns to evidence you can inspect.",
        paragraphs: [
          "Suppose many learners choose the same incorrect option. Review the question, feedback and source guidance before concluding that the audience lacks a skill. The option might be ambiguous or the course may omit a relevant condition. A few learner interviews or a review of written reasoning can help explain the pattern.",
          "For outcomes beyond the course, consider a relevant work sample, observation or operational measure. Compare like with like where possible and acknowledge changes in context, staffing or task difficulty. A rise in a business measure after a course does not establish that the course caused the change. Use several sources to support a proportionate conclusion.",
        ],
        points: [
          "Question: which decision are we trying to make?",
          "Definition: how is the record produced?",
          "Context: what else could explain the pattern?",
          "Action: what will we change or investigate?",
        ],
      },
      {
        heading: "Collect less, explain more.",
        paragraphs: [
          "Agree who can access the data, why it is collected and how long it is kept. Explain the use to learners in language they can understand. Consult the organisation’s privacy and information-governance teams about the relevant requirements, especially when records are linked to employment or formal assessment decisions.",
          "Use aggregate patterns when individual identification is unnecessary. Restrict managers to the information they need for their role. Avoid collecting detailed behavioural traces simply because an integration makes them available. Small groups can remain identifiable even in a report with names removed, so check the actual disclosure risk rather than relying only on the word anonymous.",
        ],
      },
      {
        heading: "Close the loop and check the data pipeline.",
        paragraphs: [
          "Test the reporting journey using known attempts: unfinished, completed, failed where applicable and resumed. Confirm that the expected records appear once, with usable identifiers and dates. Examine what happens when a course is updated or a learner changes teams. Inconsistent data can create misleading trends long before anyone opens the dashboard.",
          "Give each report an owner and a planned use. If a recurring report never leads to a decision, revise or retire it. If a change is made because of the evidence, check the later result. The value of learning analytics lies in the quality of the action it supports, not the quantity of charts it produces.",
        ],
      },
    ],
    relatedSlugs: ["formative-assessment", "xapi-vs-scorm"],
    resources: [sources.xapi],
    action: {
      to: "/butterlearn",
      label: "Explore learner and team progress views",
    },
  },
  {
    slug: "xapi-vs-scorm",
    title: "xAPI vs SCORM: choose the tracking your question needs.",
    description:
      "Understand the practical difference between xAPI and SCORM, what an LRS does and which tracking questions to resolve before choosing a format.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Separate delivery from the learning record.",
        paragraphs: [
          "SCORM defines a model for packaged learning content to communicate with a compatible learning management system. It is commonly used to report fields such as completion, score, location and session time during a course attempt. The exact fields and behaviour depend on the SCORM version and how the content and LMS implement it.",
          "The Experience API, usually called xAPI, describes statements about experiences that can be sent to a learning record store, or LRS. It can support records from different activities and systems, provided those systems are implemented to send meaningful statements. Choosing xAPI does not itself create a complete course delivery, enrolment or assessment solution.",
        ],
      },
      {
        heading: "Use the question to narrow the choice.",
        paragraphs: [
          "If your operational question is whether an assigned packaged course was completed and what score it reported, SCORM may be sufficient. Check resume behaviour, completion rules and reporting in the intended LMS. A familiar standard can still produce an unreliable record if the course closes before data is committed or reports a field the platform interprets differently.",
          "If you need to connect records across a simulation, a separate practice tool and another system, xAPI may be worth investigating. First describe the events and the decisions they will support. More detailed events are not automatically better evidence. A recorded button press says that a system observed a button press; it does not establish that the learner understood the underlying concept.",
        ],
      },
      {
        heading: "Plan the LRS, identities and vocabulary.",
        paragraphs: [
          "An xAPI implementation needs somewhere to send statements, a way to authenticate and an agreed approach to identifying people and activities. Use meaningful, consistent identifiers. If one system records an activity as a vague label and another uses a different identifier for the same thing, combining the records becomes harder.",
          "Profiles and shared vocabularies can help define how statements represent a particular type of experience. Agree which verbs, activity types, results and contextual information are needed. Validate statements against the relevant specification and any profile you adopt. Avoid exposing privileged LRS credentials in a public client; design the authentication and integration with the responsible technical team.",
        ],
        points: [
          "Which systems will produce and consume the records?",
          "How will learners and activities be identified consistently?",
          "What does each event mean, and which data is necessary?",
          "Who owns authentication, retention, access and reporting?",
        ],
      },
      {
        heading: "Do not assume xAPI defines the launch.",
        paragraphs: [
          "xAPI alone does not specify every aspect of how an LMS launches a course or manages an attempt. cmi5 is a separate specification that uses xAPI and adds defined behaviour for an LMS launch and session model. Support for one of these technologies should not be taken as proof of support for the other.",
          "Ask vendors to demonstrate the exact combination you need: package, launch, identity, record storage and report. For butterlearn, the current course workflow supports HTML, SCORM 1.2 and practical SCORM 2004 tracking. It does not currently provide an xAPI LRS integration or cmi5 course launch. An article explaining those options is not a claim that the platform implements them.",
        ],
      },
      {
        heading: "Pilot a representative record from end to end.",
        paragraphs: [
          "Choose one activity and trace its record from the learner’s action to the report someone will use. Test duplicate submissions, interrupted sessions, identity changes and the relevant access rules. Check whether the record can be interpreted outside the original tool. A technically valid statement can still be unhelpful if the business meaning is unclear.",
          "Make the decision proportionate. SCORM can be a suitable answer to a bounded package-tracking requirement. xAPI can support a broader event model when the integrations, governance and analysis justify it. Choose the approach you can implement, maintain and use responsibly, rather than the one with the most expansive description of future possibilities.",
        ],
      },
    ],
    relatedSlugs: ["scorm-or-html-course", "learning-analytics"],
    resources: [sources.xapi, sources.cmi5],
    action: { to: "/contact", label: "Discuss course delivery and tracking" },
  },
  {
    slug: "elearning-quality-assurance",
    title: "eLearning quality assurance: test the journey before launch.",
    description:
      "Build an eLearning QA plan covering content accuracy, accessible interactions, responsive layouts, SCORM tracking and a reviewable launch decision.",
    topic: "Learning tech",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Agree what ready means.",
        paragraphs: [
          "eLearning quality assurance checks whether the finished experience behaves as intended and supports its agreed purpose. Start with acceptance criteria from the brief: audience, outcomes, platforms, accessibility target, completion rules and handover requirements. Without those decisions, testing can become a collection of personal preferences rather than a reviewable launch judgement.",
          "Create a small test plan with named owners for content, learning design, accessibility and technical behaviour. Use representative devices, browsers and user roles. Record the version of the course and platform under review. An issue that cannot be tied to a version or reproduced is harder to fix and easier to accidentally reintroduce.",
        ],
      },
      {
        heading: "Review the learning as well as the spelling.",
        paragraphs: [
          "Check the accuracy of explanations, examples and feedback against approved source material. Ask whether activities practise the intended objective and whether assessments give a fair opportunity to demonstrate it. In a scenario, inspect every option and branch, including an unhelpful choice, a retry and a return to an earlier screen.",
          "Use consistent terminology and make ownership of changing facts explicit. A technically functioning quiz can still teach a misconception if its feedback is wrong. A perfectly proofread module can still omit the one decision the audience needs to practise. Include both subject review and a learning review rather than treating one as a substitute for the other.",
        ],
      },
      {
        heading: "Exercise the interface under realistic conditions.",
        paragraphs: [
          "Test keyboard navigation, visible focus, reading order, accessible names and feedback announcements. Check the course at narrow widths and with zoom. Open long accordion content, choose the longest response, display validation errors and switch tabs repeatedly. Short placeholder copy rarely exposes the layout problems that appear with real content.",
          "Test captions, transcripts, audio controls and the purpose of image alternatives. Check links, downloads and permissions from a learner account. Try a slow connection or a device with a different viewport where relevant. Automated checks can help, but manual and assistive technology testing are needed for issues that a scanner cannot judge.",
        ],
        points: [
          "Follow a normal route, an error route and a return route.",
          "Use the keyboard and relevant assistive technology.",
          "Test long content, narrow screens, zoom and media alternatives.",
          "Check permissions as a learner, manager and administrator where applicable.",
        ],
      },
      {
        heading: "Verify reporting in the intended LMS.",
        paragraphs: [
          "For SCORM, upload the actual release package to the intended platform. Start an attempt, make progress, close it and return. Finish under each relevant assessment condition and inspect the recorded completion, score and resume data. A local authoring preview cannot establish how the package behaves within a different LMS player.",
          "For an HTML resource, agree what the platform records and how completion is triggered. In butterlearn, HTML courses use a learner-facing Mark complete control; that differs from a SCORM package reporting its own outcome. Test the route users will actually follow, including what they see after they leave the course and return to their dashboard.",
        ],
      },
      {
        heading: "Retest fixes and record the launch decision.",
        paragraphs: [
          "Log issues with steps to reproduce, expected behaviour, actual behaviour, impact and an owner. Prioritise barriers to access, incorrect guidance, lost progress and security problems appropriately. When a fix is made, retest the affected route and related behaviour. Do not close an issue solely because the code or storyboard has changed.",
          "Finish with a release record: the approved version, checks completed, unresolved issues, who accepted them and who will maintain the course. Run a small post-launch check using real access routes without collecting unnecessary learner data. A clear handover makes later updates safer and gives the organisation a practical basis for deciding when the learning needs another review.",
        ],
      },
    ],
    relatedSlugs: ["accessible-elearning-wcag", "elearning-storyboarding"],
    resources: [sources.checks, sources.wcag],
    action: { to: "/contact", label: "Plan your course production and QA" },
  },
];
