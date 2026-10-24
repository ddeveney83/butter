import type { Article } from "../editorial";
import { sources } from "./sources.ts";

export const toolSelectionArticles: Article[] = [
  {
    slug: "lms-vs-lxp-vs-lrs",
    title: "LMS vs LXP vs LRS: what does each system do?",
    description:
      "Compare LMS, LXP and LRS roles, common overlaps and integration needs, with a practical example to help you choose the right learning systems.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "idea",
    enquiryService: "Learning strategy",
    sections: [
      {
        heading: "Start with the job each system supports.",
        paragraphs: [
          "An LMS usually manages learning delivery and administration. An LXP usually helps people discover and organise learning opportunities. An LRS stores and retrieves learning-experience statements, commonly through xAPI. These roles can sit in separate products or overlap within a wider platform. The labels are a starting point for questions about the actual workflow.",
          "For example, assigning an induction, finding a useful resource and recording a simulation attempt are three different requirements. You might meet them with one product, several connected tools or a simpler existing arrangement. Describe the learner and administrator journeys before deciding how many systems you need.",
        ],
      },
      {
        heading: "An LMS organises delivery and administration.",
        paragraphs: [
          "A learning management system commonly handles enrolment, assignments, course access and progress reporting. Depending on the product, it may also support assessments, certificates, live sessions and role-based administration. Its useful question is often: who needs to complete which learning, under what conditions, and what record should remain?",
          "Check those details in the actual system. SCORM compatibility, accessible navigation, manager permissions and repeat-attempt behaviour vary between implementations. A platform can also include resource discovery or an embedded LRS. Calling it an LMS does not tell you the quality or scope of those additional capabilities.",
        ],
      },
      {
        heading: "An LXP helps people find and shape a learning route.",
        paragraphs: [
          "A learning experience platform commonly emphasises discovery, curation, recommendations and self-directed pathways. It may gather resources from several places and offer collections, social features or skills-related suggestions. LXP is a product-category label rather than a single technical standard, so suppliers can use it to describe quite different arrangements.",
          "Ask how recommendations are produced, who curates the material and how an employee recognises an approved resource. A feed of links can become another place to search unless its content and navigation help people make useful choices. Check how mandatory learning and authoritative completion records connect to any separate LMS.",
        ],
      },
      {
        heading: "An LRS holds structured experience records.",
        paragraphs: [
          "A learning record store receives, stores and exposes experience records through the interfaces it supports. In an xAPI implementation, statements describe an actor, an action and an object, with optional results and context. This can connect records from different activities when identifiers, event meanings and permissions have been designed consistently.",
          "An LRS may be embedded in a platform or operated separately. Its presence does not by itself provide course enrolment, a learner homepage or meaningful analysis. You still need a plan for which systems send records, how people are identified and who can interpret the resulting data. Storage and a useful report are separate capabilities to demonstrate.",
        ],
        table: {
          caption: "LMS, LXP and LRS: a practical comparison",
          columns: ["System", "Typical role", "Example task", "What to verify"],
          rows: [
            [
              "LMS",
              "Manage delivery and learning administration",
              "Assign induction and review completion",
              "Content support, permissions and record rules",
            ],
            [
              "LXP",
              "Support discovery, curation and learning pathways",
              "Find a relevant resource or collection",
              "Curation, recommendation logic and LMS connections",
            ],
            [
              "LRS",
              "Store and retrieve structured experience statements",
              "Collect simulation events through xAPI",
              "Specification support, identifiers and reporting access",
            ],
          ],
        },
      },
      {
        heading: "Trace one real journey across the proposed arrangement.",
        paragraphs: [
          "Imagine a new colleague receives an assigned induction in an LMS, finds optional role resources through an LXP and practises in a simulation that sends statements to an LRS. Follow the identity, launch and record at each handover. Can the learner reach the activity, and can the right manager see a trustworthy outcome without accessing unrelated information?",
          "Then ask whether each separate component adds enough value to justify its maintenance. Existing systems may already cover part of the journey. Pilot the smallest arrangement that answers the learning and operational questions, including its accessibility and administration. A larger collection of products can still leave the central learner task unresolved.",
        ],
      },
    ],
    relatedSlugs: [
      "lxp-vs-lms-do-you-need-both",
      "do-you-need-a-learning-record-store",
    ],
    resources: [sources.xapi, sources.lti],
    action: {
      to: "/contact?service=Learning%20strategy",
      label: "Discuss your learning-system requirements",
    },
  },
  {
    slug: "choosing-elearning-authoring-tool",
    title: "How to choose an eLearning authoring tool.",
    description:
      "Choose an eLearning authoring tool by testing your learning activities, accessibility, publishing format, review process and future editing needs.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "idea",
    enquiryService: "Bespoke eLearning",
    sections: [
      {
        heading: "Describe what the learner needs to do.",
        paragraphs: [
          "An eLearning authoring tool helps a team create a learning experience. The right choice depends on the activities you need, the people who will maintain them and the environment in which they will run. Begin with a representative task: compare two examples, practise a conversation, follow a procedure or make a judgement with useful feedback.",
          "Separate required behaviour from preferred presentation. A short policy reference may need clear structure, search and dependable access. A branching scenario may need persistent choices and different consequences. A software exercise may need a carefully controlled simulation. Describe one difficult example before comparing template galleries or interface screenshots.",
        ],
      },
      {
        heading: "Match the authoring model to your team.",
        paragraphs: [
          "Block-based tools can make it straightforward to assemble a consistent sequence. Slide-based tools often allow more control over layout and interaction logic. A custom web approach offers a different development workflow again. Each approach changes what authors must understand and how they can safely revise a finished resource.",
          "Ask the person who will own future changes to edit the prototype. Can they replace an image, revise feedback, update captions and publish a new version without breaking the experience? A specialist developer can work with more flexible tools, but the handover must reflect that dependency. Check collaboration, review comments and version control with the people who will use them.",
        ],
      },
      {
        heading: "Test accessibility in the output.",
        paragraphs: [
          "Review what the tool lets an author specify: headings, reading order, labels, text alternatives, captions and keyboard behaviour. Then test a published sample. An editor offering an accessibility setting is useful only if the resulting content and interaction behave appropriately in the delivery environment.",
          "Include an activity with feedback, a long response and an error state. Test keyboard focus, zoom, narrow screens and relevant assistive technology. Establish which barriers an author can fix and which require a different component or supplier change. Document any limitation before choosing an interaction that the tool cannot make usable for the audience.",
        ],
        points: [
          "Can authors define meaningful structure and accessible names?",
          "Does the published activity support the intended input methods?",
          "Can media alternatives be created, edited and checked?",
          "Who can resolve a barrier in a supplied interaction?",
        ],
      },
      {
        heading: "Publish into the environment you will actually use.",
        paragraphs: [
          "Choose the delivery format with the platform owner. HTML, SCORM and hosted integrations have different launch, tracking and update arrangements. An authoring tool listing a format is a reason to test it, not evidence that your complete learner journey has been verified. Include the intended LMS player and identity process in the pilot.",
          "Start a course, make progress, leave and return. Check completion, scores and resume state where required. Review media links and resources that depend on external access. Ask what happens to existing attempts when the course changes, and keep the original source alongside the release package so the next update has a reliable starting point.",
        ],
      },
      {
        heading: "Choose from evidence of a small build.",
        paragraphs: [
          "Give each shortlisted approach the same bounded task and judge it against the same requirements. Keep a record of what worked, what required a workaround and what remained unproven. A representative prototype can reveal review, maintenance and publishing problems that a finished supplier demonstration does not expose.",
          "The result should be a decision your team can explain: this approach supports the intended practice, meets the agreed access requirements and can be maintained by the people responsible. Revisit the choice when the task changes. You do not need to make every future learning experience in the same tool simply because it worked for the first one.",
        ],
      },
    ],
    relatedSlugs: [
      "elearning-tool-pilot-checklist",
      "accessible-elearning-authoring-tools",
    ],
    resources: [sources.wcag, sources.lti],
    action: {
      to: "/contact?service=Bespoke%20eLearning",
      label: "Talk through your authoring requirements",
    },
  },
  {
    slug: "articulate-rise-vs-storyline",
    title: "Articulate Rise vs Storyline: choose around the activity.",
    description:
      "Compare Rise and Storyline for responsive courses, custom interactions and ongoing editing, with a practical way to test which approach fits your project.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "spark",
    enquiryService: "Bespoke eLearning",
    sections: [
      {
        heading: "Use the interaction to frame the comparison.",
        paragraphs: [
          "Articulate Rise and Storyline support different authoring approaches within the Articulate ecosystem. Rise centres on responsive, block-based course creation. Storyline provides slide-based authoring with detailed control over interaction and presentation. Choose by examining the activity you need and the team that will keep it working.",
          "For example, a structured introduction with text, media and checks may fit a block-based route. A multi-step conversation with variables and changing consequences may need a more custom interaction. Those examples are starting points for a prototype, not a rule that every introductory course belongs in one tool and every scenario in the other.",
        ],
      },
      {
        heading: "Consider the page and layout behaviour.",
        paragraphs: [
          "Rise is designed around content blocks that adapt to the available screen space. This can help authors maintain a consistent structure across devices. Check the actual blocks you intend to use, including long labels, media and assessment feedback. A responsive layout still needs clear writing, appropriate assets and a tested learning sequence.",
          "Storyline lets authors compose custom slides and control how elements behave. A player adapting to a device and a slide’s content reflowing into a new layout are different behaviours to inspect. Test text size, reading order and interaction on the smallest intended screen rather than assuming that a desktop composition will remain comfortable to use.",
        ],
        table: {
          caption: "Questions to ask when comparing Rise and Storyline",
          columns: [
            "Design question",
            "Rise approach to examine",
            "Storyline approach to examine",
          ],
          rows: [
            [
              "How is the experience assembled?",
              "A sequence of responsive content blocks",
              "Custom slides, states and interaction logic",
            ],
            [
              "What happens on a phone?",
              "Block reflow, labels and embedded media",
              "Player behaviour, slide readability and input",
            ],
            [
              "Who makes later changes?",
              "The block-authoring and review workflow",
              "Source-project skills and interaction dependencies",
            ],
            [
              "How is access checked?",
              "The specific published blocks and route",
              "Reading order, controls and custom states",
            ],
          ],
        },
      },
      {
        heading: "Model the decision before building it.",
        paragraphs: [
          "Write the scenario’s choices and consequences before selecting a component. Identify which information must persist between steps and whether learners need to compare earlier responses. A custom interaction can be justified by those requirements. It can also become unnecessary complexity when a single decision with useful feedback would meet the goal.",
          "If you combine a Storyline interaction with a Rise course, test the combined experience. Check keyboard entry and exit, media behaviour, text readability and the completion conditions you expect. The surrounding course and embedded activity can have distinct states, so inspect the published route rather than relying only on separate previews.",
        ],
      },
      {
        heading: "Plan accessibility and maintenance together.",
        paragraphs: [
          "Both the authoring environment and the author’s decisions affect the result. Review current supplier accessibility documentation, then test your representative output against the agreed requirements. A custom trigger, button or visual cue needs a usable name, state and reading sequence where relevant. A prebuilt block still needs appropriate content and media alternatives.",
          "Ask the future maintainer to revise a key part. In a custom scenario, changing one choice may affect several feedback states or later branches. Record those dependencies in the handover. For block-based content, check who can revise shared assets and translations while keeping the course structure and approved wording consistent.",
        ],
      },
      {
        heading: "Compare a published example on your platform.",
        paragraphs: [
          "Create the same representative activity in the plausible approaches and publish it into the intended delivery environment. Follow a normal attempt and an interrupted one, then inspect the required records. Include a learner and a content owner in the review so the choice reflects both use and maintenance.",
          "Product features and supported workflows change. Use the current Articulate documentation when confirming a requirement, and keep your pilot results with the project brief. A defensible decision explains why the chosen workflow serves this learning task and this team, without turning a tool preference into a rule for every project.",
        ],
      },
    ],
    relatedSlugs: [
      "choosing-elearning-authoring-tool",
      "elearning-storyboarding",
    ],
    resources: [sources.rise, sources.storyline, sources.wcag],
    action: {
      to: "/contact?service=Bespoke%20eLearning",
      label: "Discuss a representative course prototype",
    },
  },
  {
    slug: "h5p-vs-bespoke-html-elearning",
    title: "H5P vs bespoke HTML eLearning: what should you build?",
    description:
      "Compare H5P and bespoke HTML eLearning for interaction design, platform integration, accessibility and maintenance before choosing a production route.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "spark",
    enquiryService: "Bespoke eLearning",
    sections: [
      {
        heading: "Compare the authoring and maintenance arrangements.",
        paragraphs: [
          "H5P is an ecosystem of interactive HTML5 content types and supporting authoring and hosting arrangements. A bespoke HTML experience is a custom web build shaped around a particular task. Both can produce interactive learning, but they place different responsibilities on the author, developer and platform owner.",
          "Start with an activity. An interactive video with bounded questions might fit an existing H5P content type. A complex decision tool with a very particular workflow might need a custom implementation. The useful question is how well the approach supports the learner’s action and whether the team can maintain the result.",
        ],
      },
      {
        heading: "Test a content type against the real task.",
        paragraphs: [
          "H5P offers a range of content types, each with its own fields, behaviour and dependencies. Try the specific type and version you intend to use. Confirm that the instructions, feedback and navigation support your design. Two activities described as interactive presentations can still behave differently for a keyboard user or on a narrow screen.",
          "With a bespoke build, specify those behaviours before development. A custom interface gives you control over the learning sequence, but someone must implement, test and document it. Recreating a familiar interaction can add maintenance work without improving the learning. Use custom development when the required behaviour or integration gives it a clear purpose.",
        ],
      },
      {
        heading: "Agree hosting, launch and tracking separately.",
        paragraphs: [
          "H5P can be used through supported host systems and integrations, including the routes described in its documentation for platforms such as Moodle, WordPress and Drupal. Confirm the exact hosting arrangement, content libraries and update process. An exported H5P activity should not automatically be treated as a SCORM package with equivalent tracking.",
          "A custom HTML resource also needs an agreed delivery model. It might be hosted directly, packaged with a SCORM runtime or connected through another supported integration. Define the required completion, score and resume behaviour explicitly. Interactivity in the browser does not, by itself, create the learning record your organisation expects.",
        ],
        points: [
          "Where will the activity run, and who maintains the host?",
          "Which content types or custom dependencies must remain available?",
          "How will the learner enter, leave and resume the activity?",
          "Which records must the platform receive, and how will they be tested?",
        ],
      },
      {
        heading: "Review the actual accessibility of the activity.",
        paragraphs: [
          "Review H5P’s current accessibility guidance for the content types you shortlist, then test the published example. Check focus, reading order, feedback, media alternatives and reflow. A shared product name does not mean every activity type has the same accessibility behaviour or that your chosen content meets the agreed requirements.",
          "For custom HTML, use appropriate semantic controls and involve accessibility review during design. Test the same learner tasks as you would in the H5P route. Establish how a barrier will be corrected: through content changes, a library update or a code change. That ownership can materially affect whether the learning remains usable after handover.",
        ],
      },
      {
        heading: "Choose a route the team can keep healthy.",
        paragraphs: [
          "Ask a content owner to revise the prototype and ask a technical owner to explain its dependencies. Check how an activity is exported, backed up and moved to another environment. An export file is useful only when the receiving system can interpret the content and provide the required behaviour.",
          "Keep the source, approved assets, release instructions and test results together. Choose H5P when a suitable content type and supported hosting workflow meet the need. Choose a custom approach when the required task warrants it and the organisation can support the development lifecycle. In either case, a representative published pilot provides better evidence than the label alone.",
        ],
      },
    ],
    relatedSlugs: ["choosing-elearning-authoring-tool", "scorm-or-html-course"],
    resources: [sources.h5p, sources.h5pDocs, sources.wcag],
    action: {
      to: "/contact?service=Bespoke%20eLearning",
      label: "Explore the right interaction for your learners",
    },
  },
  {
    slug: "do-you-need-a-learning-record-store",
    title: "Do you need a learning record store? A practical LRS guide.",
    description:
      "Decide whether you need an LRS by tracing your learning-data question, xAPI events, identities, reporting access and operational responsibilities.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "idea",
    enquiryService: "Learning strategy",
    sections: [
      {
        heading: "Name the question that existing records cannot answer.",
        paragraphs: [
          "A learning record store can support a structured record of experiences across connected activities. Before introducing one, describe the decision your current records cannot support. You might need to examine a sequence of simulation attempts, join events from different learning tools or retain consistent experience records across an agreed ecosystem.",
          "If the immediate requirement is to see who completed an assigned course, first examine the reporting already available in your learning platform. An additional store may not change the evidence you need. A clear unanswered question gives the LRS proposal a purpose and helps identify the smallest useful integration to test.",
        ],
      },
      {
        heading: "Define a meaningful statement and a consistent identity.",
        paragraphs: [
          "In an xAPI implementation, a statement identifies an actor, a verb and an object, with additional fields where appropriate. Decide what one event means before collecting a long sequence. A learner selecting a response, completing an attempt and demonstrating a task under observation are different events with different evidential limits.",
          "Agree identifiers across the systems involved. A person using an email address in one tool and a separate account identifier in another can be difficult to recognise consistently. Establish the identity and privacy model with the responsible teams. Include activity versions and context when these are needed to interpret a result after the learning changes.",
        ],
      },
      {
        heading: "Check the route from activity to decision.",
        paragraphs: [
          "An LRS can receive valid statements while the organisation still lacks a useful report. Demonstrate how the records will be queried, interpreted and presented to the right person. Define the view you need, the permitted audience and the action they can take. Confirm which parts belong to the LRS and which require another reporting or integration layer.",
          "For a simulation pilot, create known attempts and follow their events into a report. Include an interrupted session and a retry. Check whether repeated events can be distinguished appropriately and whether the record preserves the context you need. A correctly formatted statement does not establish that its interpretation matches the learning activity.",
        ],
        points: [
          "Which real decision will the records inform?",
          "Which systems produce events, and who owns their meaning?",
          "How are people, activities and versions identified?",
          "Who can access a report, and what can they infer from it?",
        ],
      },
      {
        heading: "Separate xAPI storage from course launch.",
        paragraphs: [
          "xAPI does not define every aspect of launching a course, enrolling a learner or managing an LMS attempt. cmi5 is a separate specification that uses xAPI and defines additional launch and session behaviour for its scope. Verify the exact standards and versions involved in the proposed workflow rather than assuming that one compatibility statement covers all of them.",
          "This distinction matters when a team expects an LRS to behave like a complete course platform. You may need an existing LMS, a launch service or another application alongside it. butterlearn currently supports HTML and SCORM workflows; an LRS, xAPI or cmi5 integration would require a separate technical brief and implementation.",
        ],
      },
      {
        heading: "Assign ownership before expanding the event stream.",
        paragraphs: [
          "Agree authentication, permitted clients, retention, access controls and a route for correcting integration errors. Browser-based activities need a deliberate authentication design that protects privileged credentials. Document who maintains the event vocabulary and who reviews a change when a course or source system is updated.",
          "Pilot one useful question from end to end and evaluate the operational work it creates. Expand only when additional records support an identifiable decision. A well-governed small event model is easier to interpret than a large collection of poorly defined traces, and it gives the organisation a stronger foundation for later learning analysis.",
        ],
      },
    ],
    relatedSlugs: ["lms-vs-lxp-vs-lrs", "learning-analytics"],
    resources: [sources.xapi, sources.cmi5],
    action: {
      to: "/contact?service=Learning%20strategy",
      label: "Discuss the learning records you actually need",
    },
  },
  {
    slug: "lxp-vs-lms-do-you-need-both",
    title: "LXP vs LMS: do you need both for workplace learning?",
    description:
      "Decide whether an LXP adds useful discovery and curation to your LMS, with questions about content ownership, learner journeys and integration.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "heart",
    enquiryService: "Learning strategy",
    sections: [
      {
        heading: "Define the discovery problem you want to solve.",
        paragraphs: [
          "An organisation may have a dependable LMS while employees still struggle to find relevant learning. An LXP could help with discovery and curation, but first investigate the difficulty. People might be facing inconsistent resource names, an unclear role pathway or several disconnected content libraries. Improving the existing information architecture may address part of that problem.",
          "Watch a few representative colleagues search for help with a real task. Ask which words they use, how they judge a result and where they give up. A request for a more modern learning experience becomes easier to evaluate when it includes a concrete discovery journey and a useful definition of success.",
        ],
      },
      {
        heading: "Distinguish required learning from optional exploration.",
        paragraphs: [
          "Mandatory learning commonly needs clear assignments, deadlines and authoritative records. Optional exploration may benefit from collections, recommendations and peer contributions. Both can exist in one experience, provided the learner can understand what is required, what is suggested and which resource is approved for an operational task.",
          "For example, a new team leader might need an assigned policy course and want resources on preparing a first team meeting. Show how the proposed arrangement supports both journeys. If an LXP links to the LMS for required learning, test the handover and return. Avoid creating competing versions of the same requirement or conflicting completion messages.",
        ],
      },
      {
        heading: "Give curation a named owner.",
        paragraphs: [
          "A discovery interface depends on the quality of its resources and metadata. Agree who approves a collection, removes outdated material and responds to broken links. Define how user-contributed content is identified and reviewed. A platform can make publishing easier while also making the need for editorial responsibility more visible.",
          "Ask how recommendations are generated and what evidence supports the suggested route. A declared interest, a role label and an inferred skill gap provide different kinds of context. Give learners a way to understand or adjust relevant choices. Treat a recommendation as something to evaluate against the task, rather than an automatic statement of what the person needs.",
        ],
        points: [
          "Which resources are authoritative, and who maintains them?",
          "How are suggested activities distinguished from assigned requirements?",
          "Who owns metadata, collections and content retirement?",
          "Can learners understand why a resource has been suggested?",
        ],
      },
      {
        heading: "Trace identity, access and records across both systems.",
        paragraphs: [
          "A second platform introduces handovers. Check sign-in, permissions, content launch and the return route. Confirm whether completion data is copied, linked or displayed from another source, and which system is authoritative. Inspect the experience with separate learner, manager and administrator accounts.",
          "LTI can support defined learning-tool integrations where the relevant products and services implement it. It does not automatically solve every synchronisation or reporting requirement. Ask the supplier to demonstrate the actual integration, including an error or expired session. A smooth presentation can conceal manual reconciliation that your team would later have to operate.",
        ],
      },
      {
        heading: "Pilot the smallest useful collection.",
        paragraphs: [
          "Choose one audience and a small, maintained set of resources. Ask people to find something for a real task, explain why they trust it and return to it later. Compare the result with the current route. Look at clarity and usefulness alongside participation, and ask content owners to demonstrate the maintenance process.",
          "An LXP can be a useful addition when its discovery workflow solves an identified need and the organisation can support its curation and connections. An improved LMS library or a clearer existing portal may also meet the requirement. Keep the decision tied to observed journeys and continuing ownership so the new interface remains useful after launch.",
        ],
      },
    ],
    relatedSlugs: ["lms-vs-lxp-vs-lrs", "elearning-tool-pilot-checklist"],
    resources: [sources.lti, sources.udl],
    action: {
      to: "/contact?service=Learning%20strategy",
      label: "Explore your learning-discovery requirements",
    },
  },
  {
    slug: "elearning-tool-pilot-checklist",
    title: "An eLearning tool pilot checklist for a useful shortlist.",
    description:
      "Run a practical eLearning tool pilot with shared tasks, observable acceptance criteria and evidence from learners, authors and administrators.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "idea",
    enquiryService: "Learning strategy",
    sections: [
      {
        heading: "Give every shortlisted tool the same task.",
        paragraphs: [
          "A pilot helps you inspect how a tool behaves in your context before making a wider commitment. Define a small, representative task and use it across the plausible options. A useful sample contains something that could change the decision: branching feedback, a media requirement, a difficult update or a record that must appear in a particular report.",
          "For example, ask each approach to support a short onboarding scenario with three plausible responses, accessible feedback and a return to an unfinished attempt. Use approved sample material and fictional accounts. Keep the learning task stable so differences in the result can be discussed without confusing them with differences in the brief.",
        ],
      },
      {
        heading: "Write observable acceptance criteria.",
        paragraphs: [
          "Describe what a reviewer should be able to see or do. ‘Easy to use’ is difficult to apply consistently. ‘A new starter can find the assigned activity, identify the next action and return to the same checkpoint after signing in again’ gives the pilot a clearer test. Identify essential requirements before the demonstration begins.",
          "Use a shared record with the requirement, test steps, observed result, unresolved issue and owner. Mark a requirement as demonstrated, unmet or still unverified. A feature mentioned in a presentation can remain unverified until someone follows the relevant journey. This makes the decision reviewable without pretending that every observation fits a precise numerical score.",
        ],
        table: {
          caption: "A reusable pilot evidence sheet",
          columns: [
            "Requirement",
            "Representative check",
            "Evidence to retain",
          ],
          rows: [
            [
              "Learner access",
              "Find and launch the assigned activity",
              "Observed route, permissions and any barrier",
            ],
            [
              "Accessible interaction",
              "Complete the decision with keyboard and relevant assistive technology",
              "Test conditions, result and remediation owner",
            ],
            [
              "Progress record",
              "Leave, resume and complete a known attempt",
              "Expected and observed records",
            ],
            [
              "Content update",
              "Revise feedback and republish the activity",
              "Source version, update steps and regression result",
            ],
          ],
        },
      },
      {
        heading: "Include the people who will use and maintain it.",
        paragraphs: [
          "Ask representative learners to attempt a realistic task and explain what they expect at each step. Include accessibility requirements and relevant device conditions. A participant struggling to find the next action provides a different observation from a subject specialist identifying inaccurate guidance. Record both and assign each issue to the right owner.",
          "Ask an author to edit the sample and an administrator to publish, assign or report on it. If the workflow depends on a specialist, include that person in the review. A successful learner demonstration can still conceal an update process that the content owner cannot operate reliably.",
        ],
      },
      {
        heading: "Test a normal route, an interruption and a change.",
        paragraphs: [
          "Complete the intended journey first. Then close the browser partway through, sign back in and check what resumes. Follow a validation error and a retry where applicable. Use the real delivery environment, because an authoring preview cannot establish how the course behaves inside a different platform’s player.",
          "Finally, make a realistic content change. Inspect whether the published resource, feedback and records remain consistent. Identify how the new version relates to existing attempts and which checks need repeating. A pilot that includes an update gives the team evidence about maintenance as well as first release.",
        ],
      },
      {
        heading: "Turn findings into a decision record.",
        paragraphs: [
          "Summarise which essential requirements were demonstrated, which issues remain and what responsibility the organisation would take on. Separate an observed limitation from an unanswered question. Ask suppliers to clarify an unverified capability with an example that matches your workflow, and retain that evidence alongside the brief.",
          "End with an owner, an agreed next step and the conditions that would trigger another review. You may choose a tool, refine the task or decide that the existing arrangement is sufficient. The value of the pilot is the quality of the decision it makes possible, including a clearer understanding of what still needs design or implementation.",
        ],
      },
    ],
    relatedSlugs: ["choosing-elearning-authoring-tool", "choosing-lms"],
    resources: [sources.checks, sources.wcag],
    action: {
      to: "/contact?service=Learning%20strategy",
      label: "Plan a representative tool pilot",
    },
  },
  {
    slug: "open-source-vs-managed-lms",
    title: "Open-source vs managed LMS: separate software from hosting.",
    description:
      "Compare LMS ownership and hosting arrangements by examining updates, integrations, support, accessibility and the responsibilities your team will retain.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "spark",
    enquiryService: "Learning strategy",
    sections: [
      {
        heading: "Ask two questions about the arrangement.",
        paragraphs: [
          "Open source describes the software’s licensing and access to source code. Managed hosting describes who operates an environment and which responsibilities they accept. An open-source LMS can be provided as a managed service. A product’s licence and the way your organisation runs it are related decisions that should be examined separately.",
          "Begin with your required learner and administration journeys, then identify who can support them. A team may want access to the software’s code while relying on a partner for hosting and updates. Another may prefer a tightly defined service with fewer local customisations. The important question is which arrangement your organisation can operate and maintain responsibly.",
        ],
      },
      {
        heading: "Make responsibilities explicit.",
        paragraphs: [
          "List the work around the platform: identity, backups, updates, monitoring, integrations, content, accessibility and user support. Assign an owner to each part. Managed service does not necessarily mean that every task is included, and access to source code does not mean your team has the capacity to maintain a customised system.",
          "For example, a host may update the platform while the organisation remains responsible for reviewing plugins and fixing authored content. Ask how an issue moves between the internal team and the service provider. A learner should not be left without support because a problem sits between the course, the player and a separate identity service.",
        ],
        table: {
          caption: "Questions about LMS operation and ownership",
          columns: ["Area", "Evidence to request", "Responsibility to agree"],
          rows: [
            [
              "Updates",
              "A representative release and testing process",
              "Who schedules, approves and verifies a change",
            ],
            [
              "Recovery",
              "A demonstrated restore procedure",
              "Who restores service and checks the data",
            ],
            [
              "Integrations",
              "A working identity and course-launch journey",
              "Who maintains each connection",
            ],
            [
              "Accessibility",
              "Relevant review evidence and an issue-resolution route",
              "Who fixes platform and content barriers",
            ],
          ],
        },
      },
      {
        heading: "Review customisation and extension dependencies.",
        paragraphs: [
          "A plugin, theme or integration can meet a useful local need. It also becomes something to review during updates. Identify who maintains it, which platform versions it supports and how a change will be tested. Ask whether the requirement could be met through a supported configuration before introducing a new dependency.",
          "If you commission custom development, agree access to the source, documentation and test evidence. Check how another competent team could maintain it later. The same principle applies to proprietary integrations: a convenient connection still needs an owner and a route to recovery when a connected service changes.",
        ],
      },
      {
        heading: "Test recovery and a representative move.",
        paragraphs: [
          "Ask for a recovery demonstration using an appropriate test environment. A backup existing and a successful restoration are different observations. Confirm what the backup contains, which configuration is required and how the team checks that accounts, courses, files and relevant records remain consistent after restoration.",
          "Moodle’s migration documentation illustrates that moving an existing Moodle environment involves coordinated handling of its database, files and code. That is a different task from transferring a learning package to an unrelated LMS. Use documentation for the actual product and version, and ask the service provider to demonstrate the relevant process.",
        ],
      },
      {
        heading: "Choose a sustainable operating model.",
        paragraphs: [
          "Bring technical, learning, accessibility and service owners into the decision. Review the arrangement with the people who will handle a content update, a learner access issue and a platform release. Keep the responsibilities in a form that survives a change of supplier or internal team.",
          "A suitable model combines the required learning experience with a support and maintenance arrangement the organisation can sustain. Confirm what is demonstrated, what is contractually defined and what remains your responsibility. Software labels can narrow the conversation, but the operating model determines much of the experience after launch.",
        ],
      },
    ],
    relatedSlugs: [
      "migrate-elearning-between-platforms",
      "elearning-tool-pilot-checklist",
    ],
    resources: [sources.moodleMigration, sources.checks],
    action: {
      to: "/contact?service=Learning%20strategy",
      label: "Clarify your platform and handover requirements",
    },
  },
  {
    slug: "migrate-elearning-between-platforms",
    title: "How to migrate eLearning to a new platform.",
    description:
      "Plan an eLearning migration by separating course files, learning records, identities and integrations, then test a staged move and rollback route.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "idea",
    enquiryService: "Course refresh",
    sections: [
      {
        heading: "Inventory content and records separately.",
        paragraphs: [
          "Moving eLearning involves more than uploading a collection of course files. Identify the source projects, published packages, hosted resources, media, user accounts, assignments and records that matter. Each has a different transfer route. A SCORM package can contain the course without carrying the LMS’s complete history of learner attempts.",
          "Record an owner and a required outcome for each item. Some resources may be retired, revised or retained only as historical records. Inspect links to policies and external media, because those dependencies can survive inside a package long after the original course owner has forgotten them. A clear inventory makes the move easier to test and explain.",
        ],
      },
      {
        heading: "Agree what must survive the move.",
        paragraphs: [
          "Define the required treatment of completion history, assessment outcomes, certificates and unfinished attempts. Confirm which records the destination can import and which need a separate archive or reporting arrangement. Avoid promising seamless resume behaviour across unrelated platforms before a representative attempt has been tested.",
          "Agree how identities will be matched without creating duplicate accounts or assigning records to the wrong person. Establish access, retention and validation with the responsible information-governance teams. Use fictional or appropriately authorised test data during trials, and record the mapping decisions so the production move can be reviewed.",
        ],
        points: [
          "Which content remains current, and who approves it?",
          "Which historical records must remain accessible?",
          "How will users, courses and versions be matched?",
          "What should happen to an incomplete attempt?",
        ],
      },
      {
        heading: "Test a package that contains the difficult part.",
        paragraphs: [
          "Select representative examples: a simple resource, a scored course, a branching activity and content with media or external dependencies. Check the destination’s supported formats and runtime behaviour. Follow launch, progress, interruption, return and completion, then compare the resulting records with the agreed expectations.",
          "Include keyboard use, accessible feedback, zoom and the intended devices in the check. A migration can change the player, frame size or permissions around otherwise unchanged content. If an integration uses LTI or another supported standard, demonstrate the actual launch and data exchange rather than assuming the old configuration can be copied unchanged.",
        ],
      },
      {
        heading: "Rehearse the change and its recovery route.",
        paragraphs: [
          "Use a staging environment and a small controlled group to rehearse the sequence. Decide how changes made in the old platform during the transition will be handled. Name the point at which new assignments or attempts begin in the destination, and make the learner instructions clear enough to avoid competing active routes.",
          "Keep a viable recovery plan. Define the conditions for pausing or reversing the move, who makes that decision and how users will be informed. Test the restore or rollback procedure appropriate to the systems involved. A successful content upload is one milestone within a wider operational change.",
        ],
      },
      {
        heading: "Verify access, records and ownership after launch.",
        paragraphs: [
          "Check a sample of real access routes and authorised records after the move. Confirm that the correct people can find the right learning and that support teams know where to direct an issue. Keep the original evidence and migration mapping available for investigation without retaining unnecessary duplicate personal data.",
          "Finish with a handover that names content owners, review dates and the people responsible for integrations and reporting. Use what the rehearsal revealed to improve the ongoing update process. A migration is a useful opportunity to remove obsolete dependencies and clarify ownership, while keeping the agreed learning and record requirements in view.",
        ],
      },
    ],
    relatedSlugs: ["scorm-or-html-course", "elearning-quality-assurance"],
    resources: [sources.moodleMigration, sources.lti, sources.wcag],
    action: {
      to: "/contact?service=Course%20refresh",
      label: "Plan a representative course review before moving",
    },
  },
  {
    slug: "accessible-elearning-authoring-tools",
    title: "How to evaluate accessible eLearning authoring tools.",
    description:
      "Evaluate authoring-tool accessibility through a representative build, published interaction tests and a clear plan for resolving content and platform barriers.",
    topic: "Learning tech",
    date: "2026-10-24",
    icon: "heart",
    enquiryService: "Bespoke eLearning",
    sections: [
      {
        heading: "Define the access requirements before the demonstration.",
        paragraphs: [
          "An accessible authoring workflow needs to support both the people making the content and the people using the published result. Agree the intended audience, devices, activities and accessibility target before reviewing a tool. Ask which requirements concern the editor, which concern the output and which depend on the hosting platform.",
          "For example, an editor may let an author add alternative text while a custom interaction still needs work on keyboard focus and feedback announcements. A learner may complete the content but struggle with the platform’s launch controls. Keep those parts visible so a supplier claim is checked against the journey your audience will actually follow.",
        ],
      },
      {
        heading: "Give an author a representative content task.",
        paragraphs: [
          "Ask an author to create a short activity with a meaningful heading structure, instructional imagery, media and a decision with feedback. Include a long response and an error state. These details expose requirements that a simple title screen will not reveal. Use the content types and components you genuinely expect to rely on.",
          "Inspect what the author can define and maintain: labels, reading order, text alternatives, captions, instructions and the state of controls. If a component limits those decisions, ask how the required behaviour can be achieved. Record whether remediation belongs to the author, developer, component supplier or platform owner.",
        ],
        table: {
          caption: "Authoring capability and published checks",
          columns: [
            "Area",
            "Authoring requirement to examine",
            "Published behaviour to test",
          ],
          rows: [
            [
              "Structure",
              "Meaningful headings and reading sequence",
              "The information order with relevant assistive technology",
            ],
            [
              "Interaction",
              "Control names, states and feedback",
              "Keyboard operation, visible focus and understandable results",
            ],
            [
              "Media",
              "Editable captions and alternatives",
              "Accurate synchronisation and equivalent access to important information",
            ],
            [
              "Layout",
              "Content that can adapt appropriately",
              "Readability and operation with zoom and narrow screens",
            ],
          ],
        },
      },
      {
        heading: "Test the published output in context.",
        paragraphs: [
          "Complete the activity with a keyboard and the relevant assistive technology. Check that focus remains visible, the reading order is meaningful and a learner can understand feedback without relying on colour alone. Use zoom and a narrow viewport to inspect the complete task, including navigation and any error message.",
          "Publish to the intended delivery platform and repeat the journey. An authoring preview cannot establish how a different player or embedded frame affects access. W3C’s Easy Checks can help with an initial review, but it explicitly describes a preliminary process. A conformance judgement needs an appropriate evaluation of the agreed scope and criteria.",
        ],
      },
      {
        heading: "Evaluate alternatives and repair routes.",
        paragraphs: [
          "If a proposed activity depends on dragging, rapid timing or a particular sensory cue, examine an appropriate alternative that preserves the intended task. Sometimes a simpler control can support the same decision more clearly. A visually impressive interaction is useful only when the intended audience can participate and understand its result.",
          "Ask how an author can correct a barrier after publication. Check whether a library update affects existing courses and which regression checks are needed. Include the people responsible for accessible content in the pilot, and involve disabled learners in suitable evaluation. Their observations complement technical checks rather than replacing them.",
        ],
      },
      {
        heading: "Retain evidence and a maintenance commitment.",
        paragraphs: [
          "Keep the sample, tool version, delivery conditions, checks and unresolved issues with the selection record. Make essential requirements and remediation ownership explicit before adopting a workflow. Supplier documentation can inform the evaluation, but a representative published example gives your team evidence about its own content and environment.",
          "Recheck important behaviour after tool, component or platform changes. Give future authors clear patterns they can reuse and explain the limits of those patterns. Choosing an authoring tool is the beginning of an accessible production process; maintaining the content and its delivery is continuing work with named owners.",
        ],
      },
    ],
    relatedSlugs: [
      "accessible-elearning-wcag",
      "elearning-tool-pilot-checklist",
    ],
    resources: [sources.wcag, sources.checks, sources.media],
    action: {
      to: "/contact?service=Bespoke%20eLearning",
      label: "Discuss an accessible course prototype",
    },
  },
];
