import type { Article } from "../editorial";
import { sources } from "./sources.ts";

export const designArticles: Article[] = [
  {
    slug: "learning-needs-analysis",
    title: "Learning needs analysis: find the real problem.",
    description:
      "Run a useful learning needs analysis: investigate performance gaps, talk to learners and decide whether a course is the right response.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Turn the request into a question.",
        paragraphs: [
          "‘We need a course on the new process’ is a proposed solution. A learning needs analysis asks what is happening, what should happen and why the difference exists. That distinction matters because a course can explain a process while leaving the obstacle to using it untouched. Begin by making the performance gap concrete enough to investigate.",
          "Imagine that a support team keeps reopening customer cases. Before writing a module, ask which cases reopen, at what point and for what reason. A missing diagnostic skill suggests one response. An outdated help page, a broken permissions setting or a target that rewards closing too quickly suggests another. Several causes can exist together.",
        ],
      },
      {
        heading: "Look at work, then listen to people.",
        paragraphs: [
          "Use a small, purposeful sample of evidence: recent work, recurring errors, existing guidance and conversations with people doing the task. Ask someone to walk through a real example rather than describe an ideal process. Watch where they pause, improvise, search for information or rely on a colleague. Get permission before observing or recording work, and avoid collecting unnecessary personal information.",
          "Speak to new starters, experienced colleagues and the people who support them. Managers can describe the desired standard; learners can explain the conditions in which they must achieve it. Neither perspective should stand alone. A learner saying ‘I know what to do, but the system will not let me’ is a useful lead to check, rather than a reason to prescribe more training.",
        ],
        points: [
          "What does successful performance look like in an actual example?",
          "Which part is difficult, and when does that difficulty appear?",
          "What information, time, tools and support are available?",
          "Who performs the task reliably, and what helps them?",
        ],
      },
      {
        heading: "Separate capability from conditions.",
        paragraphs: [
          "Group your findings into things people need to know or practise and things the organisation needs to fix. A person may understand a rule but lack authority to act. They may have the skill but face an interface that encourages the wrong step. Calling every issue a knowledge gap obscures these differences and makes a weak intervention look like a learner problem.",
          "For the support team, you might discover that colleagues cannot distinguish two fault types and also use an obsolete troubleshooting page. A short diagnostic practice activity could address the first issue. Updating the page and naming its owner addresses the second. Agree responsibilities for both before asking whether the learning has worked.",
        ],
      },
      {
        heading: "Choose a small intervention you can test.",
        paragraphs: [
          "State the change you expect, the audience and the evidence you will look for. For example: ‘Support colleagues will choose the appropriate diagnostic route for these three case types, using the current troubleshooting guide.’ This can lead to a prototype with a few realistic cases, rather than a large programme built around everything the team might eventually need.",
          "Try the prototype with representative colleagues and inspect their reasoning. If people succeed in practice but still struggle at work, investigate access, workload and supervision before adding more content. Decide what a useful result would look like and when to review it. A comparison with earlier case data can inform the discussion, but changes in staffing or case complexity may also explain a difference.",
        ],
      },
      {
        heading: "Write a brief people can challenge.",
        paragraphs: [
          "A useful output is a concise decision record: the performance gap, the evidence, the likely causes, the proposed response and what remains uncertain. Share it with the people who supplied the evidence. Give them a chance to correct an assumption before it becomes a production plan. Keep the language about tasks and conditions rather than labelling an audience as disengaged or resistant.",
          "Finish with a named owner, a review date and a practical measure. If there is no clear learning need, say so. Improving a job aid or a handover can be a more focused response. The purpose of analysis is to choose a response that fits the problem, including when that response is smaller than a course.",
        ],
      },
    ],
    relatedSlugs: ["write-learning-objectives", "learning-analytics"],
    resources: [sources.implementation],
    action: { to: "/services", label: "Explore learning strategy with butter" },
  },
  {
    slug: "write-learning-objectives",
    title: "How to write learning objectives you can actually assess.",
    description:
      "Write measurable learning objectives that connect the task, conditions and success criteria to useful practice and fair assessment.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Describe the performance, not the topic.",
        paragraphs: [
          "A learning objective tells you what someone should be able to do after learning. ‘Understand data protection’ names a broad intention, but leaves the designer guessing what practice to create and the learner guessing what matters. A useful objective identifies an observable action in a situation that resembles the work or study the learner will do.",
          "For example: ‘Given a customer request and the approved identity-check guide, choose the appropriate verification route and identify when to escalate.’ This objective gives you a starting point for the activity, the resources and the assessment. It also makes the boundaries visible: the course is supporting a specific decision, not covering every possible issue in data protection.",
        ],
      },
      {
        heading: "Name the conditions and the standard.",
        paragraphs: [
          "Conditions explain what support and constraints apply. Will the learner use a checklist, work with a colleague, consult documentation or perform from memory? If the real task allows a reference, an assessment that bans it may test recall rather than effective performance. If the task must be performed unaided, make that requirement explicit and provide suitable practice.",
          "A standard describes what counts as a successful response. It might include completing every safety-critical step, identifying relevant evidence or explaining a decision with an accurate rationale. Avoid inventing a percentage simply because your authoring tool needs a pass mark. Decide which errors matter and ask a subject specialist to review the proposed standard.",
        ],
        points: [
          "Action: what will the person do?",
          "Conditions: what situation, tools and information apply?",
          "Criteria: how will someone recognise an acceptable performance?",
          "Scope: which cases are included, and which need escalation?",
        ],
      },
      {
        heading: "Build the assessment before the slides.",
        paragraphs: [
          "Draft a sample task as soon as you write the objective. For the verification example, show a realistic request and the relevant guide, then ask the learner to select a route and explain why. If you cannot design a fair task, the objective may be too broad, ambiguous or dependent on information you have not supplied.",
          "Now work backwards to the support the learner needs: an explanation of the key distinction, a modelled example and a chance to practise a more difficult case. This keeps activities connected to the outcome. A slide listing policy dates might be accurate while contributing little to the decision you actually want someone to make.",
        ],
      },
      {
        heading: "Use verbs to clarify the task.",
        paragraphs: [
          "Words such as identify, compare, diagnose, draft and demonstrate can help, but choosing an impressive verb does not automatically improve an objective. ‘Analyse the process’ is still vague if the learner does not know which process, for what purpose or against which criteria. Add the context that makes the action meaningful.",
          "Keep the list short enough to guide decisions. If you have twenty objectives for a ten-minute resource, look for a smaller coherent task or a need to divide the experience. Separate outcomes that genuinely require different practice. A course introduction should help learners see the point; it does not need to reproduce a dense internal specification word for word.",
        ],
      },
      {
        heading: "Check alignment with a real example.",
        paragraphs: [
          "Place the objective, practice activity and assessment next to each other. Could a learner pass the assessment without doing the intended thing? Could someone do the real task competently and still fail because of irrelevant wording or inaccessible controls? These questions expose mismatches early, while they are relatively easy to change.",
          "Ask a learner and a subject specialist to review one example together. Revise the objective if the task reveals a missing condition or an unrealistic expectation. Objectives should be useful working decisions, not ceremonial text that survives untouched while the rest of the course changes around it.",
        ],
      },
    ],
    relatedSlugs: ["authentic-assessment", "formative-assessment"],
    resources: [sources.udl],
    action: { to: "/work", label: "See learning design in practice" },
  },
  {
    slug: "cognitive-load-elearning",
    title: "Cognitive load in eLearning: make room for the difficult bit.",
    description:
      "Apply cognitive load principles to eLearning with clearer examples, focused screens and activities that support the learner’s actual task.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Make the task demanding for the right reason.",
        paragraphs: [
          "Learning a new process can be demanding because the ideas themselves are unfamiliar. An unclear layout can add another demand: working out where to look and how the parts connect. Cognitive load theory offers a useful way to examine that difference. The design aim is to remove avoidable processing while keeping the thinking that the learning requires.",
          "Consider someone learning a new reporting system. They need to distinguish two similar report types. If the explanation, screenshot and decision rule sit on different pages, they must also remember where each piece lives. Bringing the relevant pieces together can help them spend more attention on the distinction rather than on navigating the resource.",
        ],
      },
      {
        heading: "Design for what the learner already knows.",
        paragraphs: [
          "A detailed demonstration can support a novice and frustrate someone who already performs the task. Establish which terms, steps and relationships are familiar before deciding how much to explain. Let experienced learners reach reference material or a challenge without forcing them through every introductory screen, where the delivery and assessment requirements allow it.",
          "For a beginner, show one complete example and explain the decision points. For an experienced audience facing a new exception, focus on what changes. You do not need a separate course for every person, but you do need to check whether your assumed starting point matches the audience. Prior knowledge is a design variable, not an afterthought.",
        ],
      },
      {
        heading: "Keep the explanation close to the thing it explains.",
        paragraphs: [
          "Use labels beside the relevant part of a diagram rather than making readers search a distant key. Highlight the current area of a screen demonstration. Break a long process into meaningful stages, while keeping a visible sense of how the stages connect. Removing all context can make a short screen harder to understand than a longer, well-structured explanation.",
          "Use media with a clear job. Background music, animated stickers and decorative stock images can compete with a difficult explanation. A simple visual that reveals a relationship may contribute more than a polished animation that merely repeats a heading. Accessible alternatives still matter: captions and transcripts provide access, even when you offer choices about how learners use them.",
        ],
        points: [
          "Can the learner see the relevant example and explanation together?",
          "Does each image reveal something useful about the task?",
          "Can a long demonstration be paused, replayed or navigated?",
          "Are unfamiliar terms explained before the learner needs them?",
        ],
      },
      {
        heading: "Use disclosure to manage a task, not hide it.",
        paragraphs: [
          "Tabs and accordions can separate supporting detail, but they do not automatically make content easier. If a learner must compare three options, putting each option behind a different tab may create extra memory work. If they need one optional definition, an expandable explanation can keep the main route focused.",
          "Try two versions of a representative screen. Ask learners to complete the same task and explain what they used. Observe missed details, repeated navigation and confusion, rather than assuming that fewer visible words must be better. A representative prototype can help you explore that trade-off with learners before committing to a layout.",
        ],
      },
      {
        heading: "Leave room for useful effort.",
        paragraphs: [
          "An effortless interface is helpful; an effortless learning activity is not always the goal. Retrieving an idea, explaining a choice and solving a slightly unfamiliar problem can require productive effort. Avoid simplifying away the judgement you want someone to develop. Instead, provide enough support for them to attempt it and useful feedback when their reasoning needs work.",
          "Finish a review by asking two separate questions: ‘What makes this task intellectually demanding?’ and ‘What makes this resource awkward to use?’ The first can reveal the learning opportunity. The second can reveal design work you should do before launch. Keeping the questions separate helps you avoid treating every struggle as either desirable challenge or poor usability.",
        ],
      },
    ],
    relatedSlugs: ["worked-examples", "microlearning-design"],
    resources: [sources.study, sources.udl],
    action: {
      to: "/labs/digital-accessibility-now",
      label: "Explore Digital Accessibility Now",
    },
  },
  {
    slug: "universal-design-for-learning",
    title: "Universal Design for Learning: plan for learner variability.",
    description:
      "Use Universal Design for Learning to anticipate barriers, offer meaningful choices and keep learning goals clear across varied audiences.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Expect difference from the beginning.",
        paragraphs: [
          "Universal Design for Learning, often shortened to UDL, is a framework for anticipating learner variability. CAST organises its guidelines around engagement, representation, and action and expression. The practical question is how the learning environment can offer routes towards a clear goal, instead of assuming everyone will participate in the same way under the same conditions.",
          "A learner may be familiar with the subject but new to the language of instruction. Another may rely on a keyboard or screen reader. Someone else may be studying in short periods between shifts. These circumstances can overlap and change. Designing for a fictional average learner can turn ordinary differences into avoidable barriers.",
        ],
      },
      {
        heading: "Keep the goal clear and examine the route.",
        paragraphs: [
          "Start with what learners need to achieve, then ask which parts of the proposed activity are essential. If the goal is to explain a sound project decision, a recorded talk, written explanation or structured conversation might each provide useful evidence. If the goal is to demonstrate a particular physical procedure, those alternatives may not show the required performance.",
          "Choice should preserve the standard rather than quietly changing the task. Write common criteria before offering different response formats. Explain what evidence is needed and make sure learners have the tools and time to provide it. In regulated or formally accredited settings, agree permissible adjustments with the responsible assessment team.",
        ],
      },
      {
        heading: "Offer options that solve identifiable barriers.",
        paragraphs: [
          "A transcript can help someone who cannot hear a recording and someone who needs to search for a term. A labelled process diagram can help connect an explanation to a sequence of actions. A glossary can reduce unnecessary language demands without reducing the conceptual challenge. Select options because of the access or learning purpose they serve, rather than adding every possible format to every screen.",
          "Do not confuse UDL with sorting people into fixed visual, auditory or kinaesthetic learning styles. Providing a diagram because it explains a spatial relationship is a task-based design decision. Assigning a person one permanent preferred mode and restricting their learning to it is a different claim, and is not what meaningful choice requires.",
        ],
        points: [
          "Make the purpose and success criteria visible.",
          "Explain unfamiliar language without making learners leave the task.",
          "Provide accessible alternatives for information carried by media.",
          "Offer response choices when they can demonstrate the same outcome fairly.",
        ],
      },
      {
        heading: "Build agency without building a maze.",
        paragraphs: [
          "An optional deeper example or a choice of relevant practice context can help learners make useful decisions about their route. Twenty unexplained buttons can do the opposite. Give choices a clear purpose and explain when each route might help. A sensible suggested path should remain available for someone who does not yet know what they need.",
          "For an onboarding programme, you could offer a short explanation, a worked example and an opportunity to practise, all connected to the same task. An experienced colleague might move directly to practice; a newcomer might begin with the example. Keep support reachable from the activity so a wrong first choice does not become a dead end.",
        ],
      },
      {
        heading: "Review the barriers with learners.",
        paragraphs: [
          "Ask representative learners where they lost the thread, could not participate or needed a different explanation. Include disabled learners in evaluation and provide accessible ways to contribute. Combine those observations with technical accessibility checks. UDL is a design framework; it does not replace WCAG conformance work or an organisation’s responsibilities around reasonable adjustments.",
          "Record which barriers you found, which design decisions addressed them and what still needs attention. Then revisit the decisions when the audience or content changes. The useful outcome is a clearer, more flexible learning experience, not a checklist of optional features that nobody has tested.",
        ],
      },
    ],
    relatedSlugs: ["accessible-elearning-wcag", "authentic-assessment"],
    resources: [sources.udl, sources.wcag],
    action: { to: "/services", label: "Explore inclusive learning design" },
  },
  {
    slug: "blended-learning-design",
    title: "Blended learning design: give every part a purpose.",
    description:
      "Design a blended learning journey that connects preparation, live practice and workplace follow-up instead of repeating the same content.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Design one journey across different settings.",
        paragraphs: [
          "Blended learning combines learning settings or methods into a connected experience. A common example joins self-paced digital work with a facilitated session and workplace practice. The value comes from what each part enables and how the parts connect, rather than from the simple fact that a programme contains both a webinar and a course.",
          "Suppose team leaders need to practise difficult conversations. A short digital preparation could introduce a useful structure and one modelled example. A facilitated session could provide rehearsal and feedback. A workplace follow-up could help the leader plan and reflect on a real conversation. Repeating the same explanation in all three places would use time without creating the same progression.",
        ],
      },
      {
        heading: "Choose the setting that supports the activity.",
        paragraphs: [
          "Use self-paced resources when learners benefit from controlling pace, revisiting explanations or preparing an initial response. Use live time where another person adds something important: dialogue, observation, coached practice or a chance to challenge an assumption. Keep reference materials available where the work happens, rather than treating the end of the scheduled programme as the end of support.",
          "These are design choices, not rigid rules. A well-designed asynchronous discussion can support dialogue, and a live demonstration can introduce an unfamiliar task. Consider the audience’s access, schedules, accessibility requirements and available support. Avoid describing one format as inherently engaging or another as inherently passive.",
        ],
      },
      {
        heading: "Make the handovers explicit.",
        paragraphs: [
          "Tell learners what to bring from one stage to the next. For the conversation programme, preparation might produce a short opening statement and one question. The live session begins by using those drafts, so the preparation has a visible purpose. The follow-up asks learners to adapt the opening to a relevant situation and seek appropriate support before trying it.",
          "Plan for missing preparation. Provide a concise recap or an alternative entry task so the live session can still function without shaming people. Check whether preparation fits the time learners actually have and whether managers will protect it. A sequence that depends on hidden unpaid effort is likely to create uneven opportunities to participate.",
        ],
        points: [
          "Before: what should the learner know, notice or produce?",
          "During: what can they practise with support from others?",
          "After: what will help them use the learning in context?",
          "Between stages: how will they find the next task and get help?",
        ],
      },
      {
        heading: "Equip the facilitator and the manager.",
        paragraphs: [
          "A blended programme needs more than learner-facing assets. Give facilitators an explanation of the goal, timings, prompts, likely misconceptions and guidance for feedback. Show how the digital preparation connects to the session. Include an accessible alternative for any activity that assumes speaking, moving around or using a particular collaboration tool.",
          "Give managers a small, specific role. Asking them to ‘reinforce the learning’ leaves too much open. Asking them to protect time for one practice attempt and discuss two reflection questions is more actionable. Be clear about confidentiality, especially when the subject involves sensitive conversations or personal experiences.",
        ],
      },
      {
        heading: "Evaluate the connections, not just attendance.",
        paragraphs: [
          "Look at whether learners use preparation during practice and whether practice informs later action. A session attendance record can help with administration, but does not tell you whether someone can conduct a useful conversation. Combine participation information with a review of practice, learner feedback and an appropriate follow-up task.",
          "Pilot the whole sequence with a small group, including the reminders, links, facilitator notes and manager support. A polished digital component cannot compensate for a live session that assumes different content or a follow-up nobody knows exists. Treat the journey between activities as part of the learning design.",
        ],
      },
    ],
    relatedSlugs: ["spaced-practice", "feedback-that-improves-learning"],
    resources: [sources.udl, sources.feedback],
    action: { to: "/services", label: "Shape a connected learning journey" },
  },
  {
    slug: "microlearning-design",
    title: "Microlearning design: one useful job, done well.",
    description:
      "Plan microlearning around a focused task, useful practice and the moment of need, with examples of when a short resource helps or falls short.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Give the small resource a specific job.",
        paragraphs: [
          "Microlearning usually describes a short, focused learning experience. There is no universal number of minutes that makes it effective. A useful starting point is the job the resource needs to do: prepare someone for one decision, help them practise a distinction or remind them of a step they already know. Shortness is a constraint, not the outcome.",
          "A two-minute resource could help a new colleague recognise when to escalate a customer request. It is less likely to prepare them for every complex conversation they will face. Define the boundary before you choose a format. A small promise that the experience fulfils is more valuable than a broad promise compressed into a fast slideshow.",
        ],
      },
      {
        heading: "Distinguish learning from reference.",
        paragraphs: [
          "A checklist at the moment of need supports performance by making information available. A short activity that asks someone to recall, decide or explain supports a different kind of work. Both can be useful. Name which purpose you intend, because the design and the evidence of success will differ.",
          "For example, a one-page equipment shutdown checklist should be easy to find, scan and trust. A short learning activity about recognising an unusual fault might use contrasting cases and feedback. Counting both as ‘three minutes of content consumed’ hides the difference between accessing support and developing a judgement.",
        ],
      },
      {
        heading: "Build a complete small experience.",
        paragraphs: [
          "Start with a recognisable situation, give the learner enough context to act and ask for one useful response. Explain the response with specific feedback, then identify a next step or reference. You may need very little exposition when the example does the explaining. You may also discover that the task cannot be reduced responsibly to one short activity.",
          "For an escalation resource, show a realistic request, the relevant threshold and two plausible routes. Ask which route fits and why. Feedback can point out the deciding detail and link to the current policy. The activity remains small because it has a limited task, not because every sentence has been shortened beyond usefulness.",
        ],
        points: [
          "One recognisable situation.",
          "One focused action or decision.",
          "Enough context to respond fairly.",
          "Feedback that explains the relevant distinction.",
          "A clear route to fuller guidance or support.",
        ],
      },
      {
        heading: "Connect the pieces where the task demands it.",
        paragraphs: [
          "Breaking a long programme into short units does not automatically create a coherent learning journey. Learners still need to see relationships, combine steps and practise the whole task. Use a visible sequence, recurring examples and occasional integrated practice when the outcome involves several connected decisions.",
          "A series of short reminders can support spaced practice if learners retrieve and apply something across time. Sending the same explanation repeatedly is a different design. Plan what each revisit asks the learner to do, and vary the context when they need to recognise the idea in more than one situation.",
        ],
      },
      {
        heading: "Test usefulness in the actual context.",
        paragraphs: [
          "Try the resource on the device and in the setting where people will use it. Check loading time, text size, captions, keyboard access and whether links open without a new permissions problem. If the audience works in a noisy environment, an audio-only explanation will create an avoidable barrier, regardless of how brief it is.",
          "Ask what the learner can now decide or do and whether the resource is easy to return to. Use completion information only for the question it can answer. When the goal is quick support, successful use may involve finding one line and leaving. Designing around that need can be more useful than maximising time spent in the module.",
        ],
      },
    ],
    relatedSlugs: ["cognitive-load-elearning", "spaced-practice"],
    resources: [sources.study, sources.media],
    action: { to: "/contact", label: "Scope a focused learning moment" },
  },
  {
    slug: "elearning-storyboarding",
    title: "An eLearning storyboard that makes review easier.",
    description:
      "Create an eLearning storyboard that connects objectives, content, interactions and accessibility before visual production begins.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Treat the storyboard as a working agreement.",
        paragraphs: [
          "An eLearning storyboard describes what learners will encounter, do and receive in response. It gives subject specialists, designers, developers and reviewers something concrete to discuss before production makes changes more expensive. It does not need to resemble a finished course, but it should make the learning logic understandable.",
          "Choose a format your team can review reliably. A document, slide deck or structured web page can all work. Include stable screen or activity IDs so comments remain traceable when the order changes. A beautiful template is less useful than a plain one that makes an unanswered decision obvious.",
        ],
      },
      {
        heading: "Show the action as well as the words.",
        paragraphs: [
          "For each activity, state the purpose, visible copy, learner action and feedback. If a choice changes the next screen, show that route. If a learner can revisit a previous response, describe what should happen. ‘Add an interaction here’ postpones the design decision instead of communicating it.",
          "For a customer-service scenario, record the situation, available information, response options and consequence of each option. Include the reasoning behind the preferred approach and any cases where escalation is required. This lets a reviewer challenge the judgement rather than approve a paragraph that will later be turned into an ambiguous question.",
        ],
        points: [
          "Activity ID and the objective it supports.",
          "On-screen copy, instructions and any narration.",
          "Media purpose, source and production requirements.",
          "Learner action, response states and feedback.",
          "Navigation, completion and any tracking requirements.",
        ],
      },
      {
        heading: "Make accessibility part of the specification.",
        paragraphs: [
          "Describe the reading order and how a keyboard user completes the task. Provide the purpose of an image and a draft text alternative when relevant. For audio or video, plan captions, transcripts and any description needed for important visual information. These decisions can affect the script and composition, so they belong before the final media is made.",
          "If a prototype uses colour to indicate a choice, specify an additional text or shape cue. If an activity asks learners to drag items, describe an accessible alternative interaction. A storyboard cannot prove the finished course is accessible, but it can prevent predictable omissions and give testing a clearer starting point.",
        ],
      },
      {
        heading: "Give reviewers a focused brief.",
        paragraphs: [
          "Ask each reviewer to examine the decisions they are equipped to judge. A subject specialist can check accuracy and realistic consequences. A learning reviewer can check alignment and practice. An accessibility or technical reviewer can identify design risks. Explain which details are provisional so comments about placeholder colours do not obscure a missing decision rule.",
          "Set a route for resolving conflicting feedback. Keep a decision log with the issue, owner and outcome. When a requested change affects scope, sequence or assessment, make that impact visible. Silent compromises can leave a storyboard internally inconsistent even when every individual comment has been marked resolved.",
        ],
      },
      {
        heading: "Prototype the uncertain part before sign-off.",
        paragraphs: [
          "A storyboard can communicate a branching route without showing how it feels to use. Build a small prototype when timing, movement, input or layout is central to the experience. Test the difficult interaction, not just the introduction. Ask representative learners to attempt the task and explain what they think is happening.",
          "Update the storyboard with the decisions the prototype reveals. Then agree what is approved, what remains open and how later changes will be handled. A storyboard should reduce uncertainty across the team; it is most useful when it stays connected to the decisions made during production and testing.",
        ],
      },
    ],
    relatedSlugs: [
      "write-better-learning-scenarios",
      "elearning-quality-assurance",
    ],
    resources: [sources.media, sources.checks],
    action: { to: "/services", label: "Explore digital learning production" },
  },
  {
    slug: "authentic-assessment",
    title: "Authentic assessment: test the task that matters.",
    description:
      "Design authentic assessment with realistic tasks, clear criteria and accessible evidence, so results say more than a recall quiz alone.",
    topic: "Learning design",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Start with the performance you need evidence of.",
        paragraphs: [
          "An authentic assessment asks learners to apply knowledge or skills in a task that meaningfully resembles their intended use. That might involve diagnosing a fault, reviewing a proposal, explaining a decision or completing a practical procedure. It does not have to reproduce every detail of the workplace to test something useful.",
          "Suppose learners need to evaluate a project brief. A recall quiz can check whether they recognise the names of its sections. Asking them to identify missing information in a sample brief gives you different evidence. Asking them to explain which missing details would change the proposed approach brings the assessment closer to the judgement the work requires.",
        ],
      },
      {
        heading: "Use realism selectively.",
        paragraphs: [
          "Include the constraints that shape the decision: incomplete information, competing priorities, relevant tools or a need to justify a recommendation. Leave out incidental complexity that makes the task longer without improving the evidence. A simulated inbox with fifty irrelevant messages can test persistence more than the intended professional judgement.",
          "Choose whether the learner should have access to guidance. If competent practice includes consulting a reference, allowing that reference can make the task more representative. If a skill must be demonstrated without assistance, explain why and provide practice under those conditions. The assessment setting should follow the outcome, not a blanket rule that all help is cheating.",
        ],
      },
      {
        heading: "Make the criteria concrete.",
        paragraphs: [
          "Write a small set of observable criteria before creating the scoring interface. For the project brief, criteria might include identifying the audience, separating a business problem from a requested deliverable, and explaining which unanswered question affects scope. Show what an adequate response looks like, and distinguish essential requirements from desirable polish.",
          "Try the criteria on contrasting sample responses. If two reviewers reach different judgements, discuss the evidence each used and refine the rubric. Avoid criteria such as ‘shows excellent understanding’ without explaining what that understanding looks like in the task. A more detailed rubric is useful only when its distinctions can be applied consistently.",
        ],
        points: [
          "What must the learner do or produce?",
          "Which evidence demonstrates the intended outcome?",
          "Which errors require revision or further support?",
          "Can reviewers apply the criteria consistently?",
        ],
      },
      {
        heading: "Make participation fair and accessible.",
        paragraphs: [
          "Check that the task does not accidentally assess an unrelated skill. A timed spoken response may be inappropriate when the goal is to construct a sound written plan. Offer accessible response formats when they preserve the intended evidence, and agree formal adjustments where required. Tell learners what tools, collaboration and AI assistance are permitted.",
          "In higher-stakes settings, plan verification, moderation and appeals with the responsible assessment team. Authenticity does not remove the need for trustworthy decisions. Equally, surveillance should not be the default response to every concern: clear task design, drafts, discussion of reasoning and appropriate checks can provide different kinds of evidence.",
        ],
      },
      {
        heading: "Use the result to support the next attempt.",
        paragraphs: [
          "Give feedback against the criteria and identify a concrete improvement. If the learner omitted a constraint from the brief, show how that omission could affect the recommendation. Offer an opportunity to revise or practise the weak part before repeating the whole task, where assessment policy permits.",
          "Review the assessment after use. Are learners failing because of the intended challenge, missing information or confusing instructions? Does a pass correspond to an acceptable performance beyond the assessment itself? One task provides a sample of performance, not proof of competence in every future situation. Use that limitation to plan sensible follow-up and support.",
        ],
      },
    ],
    relatedSlugs: ["write-learning-objectives", "formative-assessment"],
    resources: [sources.udl, sources.feedback],
    action: { to: "/contact", label: "Talk through your assessment approach" },
  },
];
