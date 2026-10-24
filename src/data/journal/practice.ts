import type { Article } from "../editorial";
import { sources } from "./sources.ts";

export const practiceArticles: Article[] = [
  {
    slug: "retrieval-practice",
    title: "Retrieval practice: make remembering part of learning.",
    description:
      "Use retrieval practice in lessons and digital learning with low-stakes questions, useful feedback and opportunities to apply remembered ideas.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Ask learners to bring the idea back.",
        paragraphs: [
          "Retrieval practice means attempting to recall information or a procedure rather than only seeing it again. A learner might explain a principle from memory, sketch the stages of a process or answer a short question before checking a reference. The attempt to retrieve is part of the learning activity, rather than simply a final measurement after teaching has finished.",
          "Research guidance from the Institute of Education Sciences recommends using quizzes to re-expose learners to key content and asking questions that encourage explanation. That does not mean every quiz format will produce the same result. What learners retrieve, how much support they need and the feedback they receive all affect the experience you are designing.",
        ],
      },
      {
        heading: "Choose something worth retrieving.",
        paragraphs: [
          "Start with an idea learners will need again. In a science lesson, that might be the relationship between a model and an observation. In workplace learning, it might be the warning signs that trigger an escalation. Avoid filling the activity with incidental details simply because they are easy to turn into short-answer questions.",
          "Suppose a team has learned a three-stage checking process. At the start of a later session, ask them to write the stages and explain the purpose of one check. Then show a brief case and ask where an error could enter. The first prompt retrieves the structure; the second checks whether learners can use it to reason about a situation.",
        ],
      },
      {
        heading: "Keep the stakes low enough to practise.",
        paragraphs: [
          "Explain that the activity is a chance to strengthen and diagnose learning, and say how responses will be used. A practice prompt does not need a public leaderboard or a permanent score. Give people thinking time and accessible ways to respond. If only the fastest hands or loudest voices contribute, you will see a narrow sample of what the group knows.",
          "Choose the amount of support deliberately. An open question, a partially completed diagram and a set of options provide different cues. If learners cannot begin, a prompt or example can make an attempt possible. Gradually reduce that support when the intended performance requires more independent recall. Difficulty is useful only when it remains connected to the learning goal.",
        ],
        points: [
          "Explain the purpose before asking for a response.",
          "Allow an individual attempt before group discussion.",
          "Use accessible response formats and adequate thinking time.",
          "Separate practice records from formal assessment decisions.",
        ],
      },
      {
        heading: "Close the loop with feedback.",
        paragraphs: [
          "After the attempt, provide an accurate answer or model and explain the key distinction. Ask learners to compare it with their response and correct a specific part. Leaving a misconception unexamined can make the activity less useful. A teacher or facilitator should also inspect patterns in the responses and decide whether the next explanation needs to change.",
          "For the checking-process example, a learner might remember the order but misunderstand why the second check matters. Feedback should address that reasoning, not just award two out of three. A later prompt can ask them to detect the same issue in a new case, giving both learner and teacher another opportunity to see whether the explanation helped.",
        ],
      },
      {
        heading: "Revisit and apply, rather than repeat forever.",
        paragraphs: [
          "Space retrieval across later learning opportunities and vary the context when transfer matters. A question immediately after an explanation and a question several days later tell you different things. Neither a single successful recall nor repeated recognition of an unchanged item proves that a learner can apply an idea in unfamiliar work.",
          "Use retrieval as one part of a wider sequence that includes explanation, examples, practice and feedback. Review which questions expose useful gaps and which merely encourage memorising the wording. A small set of well-chosen prompts can be more informative than a large bank of items that all ask for the same superficial response.",
        ],
      },
    ],
    relatedSlugs: ["spaced-practice", "formative-assessment"],
    resources: [sources.study],
    action: {
      to: "/services/staff-onboarding",
      label: "Explore staff onboarding",
    },
  },
  {
    slug: "spaced-practice",
    title: "Spaced practice: design the return, not just the reminder.",
    description:
      "Plan spaced practice with purposeful revisits, retrieval prompts and feedback, using a realistic schedule that fits learners’ work or study.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "spark",
    sections: [
      {
        heading: "Spread the practice over time.",
        paragraphs: [
          "Spaced practice distributes learning opportunities across time rather than concentrating all of them in one sitting. A return to an idea asks the learner to reconnect with it after an interval. The Institute of Education Sciences includes spacing in its guidance on organising instruction and study. Turning that principle into a programme still requires decisions about the task, audience and opportunities to practise.",
          "There is no single ideal timetable for every topic or learner. A schedule depends on prior knowledge, complexity, how long the learning needs to remain available and what opportunities exist to revisit it. Treat a proposed rhythm as a design to evaluate, rather than a formula that predicts a particular percentage of retention.",
        ],
      },
      {
        heading: "Give each return a different purpose.",
        paragraphs: [
          "Imagine a short programme on handling a customer complaint. The first activity models a useful conversation. A later prompt asks learners to recall the opening principles before checking a guide. Another presents a new complaint with an additional constraint. A follow-up asks them to reflect on a relevant conversation, without sharing identifying customer details.",
          "The sequence combines remembering, applying and reflecting. Sending the same video four times may create repeated exposure, but does not necessarily require those actions. Decide what each return asks the learner to do and how it builds on the previous attempt. Keep the new task small enough to fit the promised time.",
        ],
      },
      {
        heading: "Plan a rhythm people can actually follow.",
        paragraphs: [
          "Choose intervals with the audience’s calendar in mind. Shift patterns, teaching timetables and access to devices can make a theoretically attractive schedule impractical. Agree how learners will find the activity, when they can complete it and what happens if they miss one. A reminder is useful only if the linked task is accessible and worth returning to.",
          "For a pilot, you could plan an initial session, a short revisit later that week and another in a following week. Those dates are a starting point for evaluation, not a universal recommendation. If the underlying task occurs rarely, provide a reference and a route to support at the moment of need as well as scheduled practice.",
        ],
        points: [
          "Choose the knowledge or judgement that needs revisiting.",
          "Define a useful action for each return.",
          "Protect realistic time and provide a clear entry link.",
          "Plan a catch-up route and a way to ask for help.",
        ],
      },
      {
        heading: "Use feedback to adjust support.",
        paragraphs: [
          "A delayed attempt can reveal that learners remember a phrase but miss the condition in which it applies. Show a clear explanation and provide another opportunity to use the distinction. If many people make the same error, revisit the teaching or the example rather than simply sending another notification.",
          "In the complaint example, learners might recall ‘acknowledge the concern’ but make an assurance they are not authorised to give. The next activity can contrast acknowledgement with an unsupported promise. This is a more targeted response than asking learners to rewatch the whole programme and hoping they notice the relevant sentence.",
        ],
      },
      {
        heading: "Measure the learning question, not just the clicks.",
        paragraphs: [
          "Completion tells you whether an activity was recorded as finished. A later practice response tells you something about what the learner can retrieve or apply under those conditions. A workplace observation can add another perspective. Keep these measures distinct and avoid turning one of them into a claim that the programme alone caused a business result.",
          "Review the schedule with learners and facilitators. Look for tasks that arrive at an awkward time, prompts that repeat without adding value and useful gaps that deserve more practice. Plan a sequence of revisits that fits the learning goal and the audience’s opportunities to practise.",
        ],
      },
    ],
    relatedSlugs: ["retrieval-practice", "blended-learning-design"],
    resources: [sources.study],
    action: {
      to: "/services/staff-onboarding",
      label: "Discuss a practice sequence",
    },
  },
  {
    slug: "formative-assessment",
    title: "Formative assessment: find out, then change what happens next.",
    description:
      "Use formative assessment to surface learner thinking, spot misconceptions and adapt teaching with practical classroom and online examples.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "The response should inform a decision.",
        paragraphs: [
          "An assessment is formative in its use when evidence of learning informs what the teacher or learner does next. A quiz can serve that purpose, but so can an explanation, a sketch, a discussion or a short worked task. Collecting answers without responding to what they reveal is not the same as using them to improve the next step.",
          "Before creating the question, name the decision it will help you make. You might need to choose between a new example, further guided practice or moving to a more complex task. If every possible response leads to exactly the same experience, ask whether the evidence is being used or merely stored.",
        ],
      },
      {
        heading: "Ask a question that reveals the reasoning.",
        paragraphs: [
          "A useful diagnostic question distinguishes between plausible ways of thinking. In a lesson about averages, several options might reflect common errors in choosing which values to include or which measure to use. Ask learners to explain a choice, compare two methods or identify a mistake. The explanation can be more informative than a correct selection alone.",
          "In workplace learning, show a request that sits near an escalation threshold. Ask learners what they would do and which detail shaped their decision. A wrong answer could reflect a missing rule, an overlooked condition or a reasonable interpretation of an ambiguous case. Those causes require different responses from the designer or facilitator.",
        ],
      },
      {
        heading: "Hear from more than the volunteers.",
        paragraphs: [
          "Use a response approach that lets everyone think and contribute. This might be a brief individual note, a labelled diagram, an accessible poll or a private written explanation before discussion. Provide enough time and clear instructions. A quick show of hands can be useful for some purposes, but cannot automatically reveal what quieter learners understand.",
          "For an online course, offer a clear way to submit a response and receive feedback. Explain whether the response is private, visible to peers or part of a formal record. Give an alternative when a collaboration tool creates an access barrier. Evidence becomes more useful when the collection method does not exclude part of the audience.",
        ],
        points: [
          "Make the target idea or skill clear.",
          "Choose a task that can expose a meaningful misconception.",
          "Give every learner a viable route to respond.",
          "Plan how different response patterns will change the next step.",
        ],
      },
      {
        heading: "Prepare a response to the patterns.",
        paragraphs: [
          "You do not need to design a separate lesson for every possible answer. Anticipate a few useful patterns. If most learners miss the same distinction, revisit it with a contrasting example. If a small group needs support, provide a focused task while others attempt a suitable extension. If the question itself was unclear, repair the question before interpreting the answers as a learning gap.",
          "Automated feedback can handle a bounded misconception, but it has limits. A multiple-choice response rarely reveals the learner’s whole reasoning. Use a prompt for explanation or a later discussion where the judgement matters. Tell learners why the next activity is being suggested so the adaptation feels purposeful rather than arbitrary.",
        ],
      },
      {
        heading: "Check whether the response helped.",
        paragraphs: [
          "Return to the idea with a fresh but comparable task. If learners can explain the principle in a new situation, you have more useful evidence than an immediate repeat of an unchanged question. If they still struggle, examine the explanation, the prerequisite knowledge and the task conditions rather than assuming a lack of effort.",
          "Keep the process proportionate. A one-minute check can guide a ten-minute teaching decision; it does not always need a dashboard or a permanent score. The important cycle is to elicit thinking, interpret it, act on it and look again. Technology can support that cycle, but the decision about what to do with the evidence remains central.",
        ],
      },
    ],
    relatedSlugs: [
      "feedback-that-improves-learning",
      "write-learning-objectives",
    ],
    resources: [sources.feedback, sources.metacognition],
    action: { to: "/services", label: "Design useful assessment with butter" },
  },
  {
    slug: "feedback-that-improves-learning",
    title: "Feedback that improves learning: give it somewhere to go.",
    description:
      "Design useful learning feedback that explains the task, identifies a next step and gives learners a chance to act on the advice.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Plan the next attempt before the comment.",
        paragraphs: [
          "Feedback is most useful when learners can do something with it. A detailed comment delivered after the final opportunity to practise may explain a result without changing the learning experience. Before writing feedback, decide what action it should support: revise a response, compare a model, practise a weak step or apply a principle in a new situation.",
          "The Education Endowment Foundation’s feedback guidance emphasises that feedback is not automatically beneficial in every form or context. The practical implication is to examine its content, timing and use, rather than assume that more comments or faster automated responses must be better. Start with the learner’s task and the next useful move.",
        ],
      },
      {
        heading: "Connect the advice to a clear standard.",
        paragraphs: [
          "Learners need to know what they are aiming for. Give them criteria, a model or a worked example they can interpret. Then point to a specific aspect of their response and explain how it relates to the goal. ‘Be more analytical’ is difficult to act on without an example of the reasoning you want to see.",
          "For a project recommendation, feedback might say: ‘You identified the audience and the deadline. The recommendation does not yet explain which evidence makes the proposed format suitable. Add one reason linked to the audience’s working conditions.’ This recognises what is present and gives a bounded revision task, rather than a judgement about the learner’s ability.",
        ],
      },
      {
        heading: "Explain consequences in decision-based learning.",
        paragraphs: [
          "In a scenario, a simple ‘incorrect’ can leave the learner guessing which part of their reasoning needs attention. Explain what the selected response could lead to and which detail matters. Keep the explanation specific to the option rather than showing the same generic paragraph after every choice.",
          "If a learner opens a difficult conversation with an accusation, feedback can explain how that wording may make the other person defensive and leave the actual issue unclear. Ask them to rewrite the opening using an observation and a question. The task turns the feedback into a fresh attempt, rather than an obstacle to click past.",
        ],
        points: [
          "Name the relevant feature of the response.",
          "Connect it to the task or success criteria.",
          "Explain a useful principle or consequence.",
          "Offer a concrete next action and a way to check it.",
        ],
      },
      {
        heading: "Choose timing to fit the purpose.",
        paragraphs: [
          "Immediate feedback can prevent a learner practising an error through the rest of a procedure. A short delay can sometimes allow time for comparison, reflection or an independent attempt. There is no single timing rule for every activity. Consider the risk of leaving an error uncorrected, the difficulty of the task and what the learner will do before feedback arrives.",
          "In live teaching, allow thinking time before supplying a model. In a self-paced course, let learners review the situation and their response alongside the explanation. Avoid disappearing toast messages or feedback available only through colour. People need enough time and an accessible route to understand the advice.",
        ],
      },
      {
        heading: "Look for use, not just delivery.",
        paragraphs: [
          "Ask learners to identify what they changed and why, then inspect the revised work or a later application. A feedback panel being opened does not tell you whether its advice was understood. If the same misunderstanding persists, the comment may need a clearer example, a smaller next step or a conversation.",
          "Keep the volume manageable. One or two high-value improvements can give a learner a better starting point than an exhaustive list of faults. Feedback should make the next attempt more informed. Design the time, space and support for that attempt as carefully as the words that introduce it.",
        ],
      },
    ],
    relatedSlugs: ["formative-assessment", "write-better-learning-scenarios"],
    resources: [sources.feedback],
    action: {
      to: "/labs/the-journey",
      label: "Explore The Journey",
    },
  },
  {
    slug: "worked-examples",
    title: "Worked examples: show the thinking, then hand it over.",
    description:
      "Use worked examples to model a process, reveal decision points and gradually move learners towards independent practice in a new context.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "idea",
    sections: [
      {
        heading: "Make the reasoning visible.",
        paragraphs: [
          "A worked example shows how a task is completed, with enough explanation for learners to understand why each important step is taken. It can be a solved mathematical problem, a modelled conversation, a diagnostic walkthrough or a sample piece of writing. The point is to expose the process that an expert might otherwise perform without explanation.",
          "Guidance from the Institute of Education Sciences recommends alternating worked solutions with opportunities for learners to solve problems themselves. For a designer, this suggests a sequence that moves between observation and action. Watching an expert complete five tasks is not the same experience as understanding one model, attempting a related task and getting feedback.",
        ],
      },
      {
        heading: "Choose an example that reveals a useful distinction.",
        paragraphs: [
          "Start with a task that contains the main decision without too many competing complications. A data analyst might demonstrate how to choose between two chart types for a particular question. The explanation should identify the question, the relevant characteristics of the data and the reason one representation fits. Showing a finished chart without that reasoning leaves the important judgement hidden.",
          "Use the actual language and tools learners will encounter where possible. Keep irrelevant detail out of the first example, then introduce complexity deliberately. If every model uses the same easy case, learners may copy its surface pattern without noticing the conditions that make the method appropriate.",
        ],
      },
      {
        heading: "Ask learners to explain part of the model.",
        paragraphs: [
          "Pause at a decision point and ask why the next step follows, which evidence matters or what would change under a different condition. Give enough time to think before revealing the explanation. These prompts can help a learner engage with the structure of the solution rather than simply follow the movement of a cursor.",
          "For the chart example, ask why a bar chart is suitable for comparing categories and what would be different if the question concerned change over time. A useful response names the relationship between the question and the representation. Merely repeating the chart’s name tells you less about the learner’s reasoning.",
        ],
        points: [
          "What is the task trying to achieve?",
          "Which detail makes this step appropriate?",
          "What plausible alternative would be less suitable, and why?",
          "What change in the situation would require a different approach?",
        ],
      },
      {
        heading: "Remove support in useful steps.",
        paragraphs: [
          "After a complete example, offer a partially completed task and ask learners to supply a missing decision or explanation. Later, ask them to complete a fresh task with access to appropriate guidance. Adjust the support to the audience’s starting point. A novice may need another model; someone with relevant experience may be ready for an unfamiliar case.",
          "Do not remove information simply to make the activity harder. Remove support because the learner is moving towards the intended degree of independence. If the real task is performed with a reference, practising effective use of that reference may be more appropriate than insisting on an entirely unaided performance.",
        ],
      },
      {
        heading: "Test transfer beyond the original pattern.",
        paragraphs: [
          "Provide a problem with changed surface details and a reason to reconsider the method. Ask learners to explain whether the original approach still fits. This can reveal whether they have learned a useful principle or memorised a sequence of clicks. Include feedback that addresses the method choice, not just the final answer.",
          "Check the example’s accessibility too. A screen recording needs more than a fast mouse demonstration: ensure important visual information is available through suitable description, provide captions for speech and make navigation usable. The model should reveal the thinking to everyone who needs it, including someone who cannot follow the visual cursor path.",
        ],
      },
    ],
    relatedSlugs: ["cognitive-load-elearning", "authentic-assessment"],
    resources: [sources.study, sources.media],
    action: { to: "/work", label: "Explore interactive learning examples" },
  },
  {
    slug: "teaching-online-discussion",
    title: "Online discussion activities that lead somewhere.",
    description:
      "Plan purposeful online discussions with a clear prompt, accessible participation, facilitation and a useful output beyond posting a reply.",
    topic: "Education in practice",
    date: "2026-10-23",
    icon: "heart",
    sections: [
      {
        heading: "Give the conversation a job.",
        paragraphs: [
          "‘Post your thoughts and reply to two people’ describes participation, but does not explain what the discussion is meant to accomplish. A useful online discussion asks learners to compare interpretations, examine evidence, improve a draft or make a shared decision. Start with that purpose before deciding how many posts to require.",
          "For example, give a group a short teaching case and ask which of two proposed responses best addresses the learner’s difficulty. Require a reason linked to the case, then invite someone to challenge an assumption. The exchange has a task: improve a judgement by considering another perspective. Counting replies alone would miss whether that happened.",
        ],
      },
      {
        heading: "Write a prompt with something to discuss.",
        paragraphs: [
          "A question with one obvious answer can produce a row of near-identical posts. An excessively open invitation can leave learners unsure where to begin. Provide a shared case, a manageable choice and a reason to examine alternatives. Make sure the material contains enough information for a fair response without requiring specialist knowledge the group has not yet encountered.",
          "You might ask learners to choose a response, identify the evidence behind it and name one question that would affect their decision. Then ask peers to add a contrasting interpretation or a relevant missing consideration. This gives a response a meaningful role without encouraging disagreement for its own sake.",
        ],
      },
      {
        heading: "Make participation possible and predictable.",
        paragraphs: [
          "Explain the deadline, expected time, response format and visibility of contributions. Offer an accessible route to the material and check the discussion tool with keyboard and assistive technology users. Provide guidance on respectful disagreement, privacy and what to do if someone needs support. Avoid asking for identifiable examples from sensitive work or personal experiences as a condition of participation.",
          "Consider asynchronous participation when learners work across time zones or cannot attend live. If a live discussion is necessary, provide preparation and an appropriate alternative for someone unable to speak or attend. Choices should preserve the learning purpose, not quietly create a less supported route for part of the audience.",
        ],
        points: [
          "State the question and the evidence learners should use.",
          "Explain who can see contributions and how they will be used.",
          "Make the time commitment and response expectations realistic.",
          "Provide a way to ask for help or raise a concern privately.",
        ],
      },
      {
        heading: "Facilitate the thinking, not every turn.",
        paragraphs: [
          "A facilitator can highlight a useful distinction, ask for evidence or connect two contributions. Responding to every post with a judgement may discourage learners from engaging with each other. Decide when to step in, particularly for a misconception that would undermine later learning or a comment that breaches the agreed participation guidance.",
          "For the teaching case, you could summarise two competing explanations and ask what evidence would distinguish them. If the group converges too quickly, offer a plausible counterexample. If the discussion becomes confused, restate the decision and relevant criteria. These interventions move the work forward rather than simply add more text to read.",
        ],
      },
      {
        heading: "Give the exchange an ending and an output.",
        paragraphs: [
          "Ask learners to revise their initial response, produce a short recommendation or identify what changed in their reasoning. Close with a concise synthesis that connects the discussion to the learning goal and distinguishes open questions from agreed guidance. A long thread should not leave learners guessing which explanation they can rely on.",
          "Evaluate the activity by looking at the quality of reasoning and revision as well as who could participate. If the output is repetitive, the prompt may need a sharper decision. If only a few voices shape the conclusion, revisit the participation design. A discussion is useful when the exchange changes the quality of thinking, not just the number of contributions.",
        ],
      },
    ],
    relatedSlugs: [
      "blended-learning-design",
      "feedback-that-improves-learning",
    ],
    resources: [sources.udl, sources.feedback],
    action: {
      to: "/contact",
      label: "Talk about your blended learning programme",
    },
  },
];
