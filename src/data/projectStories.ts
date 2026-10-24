import type { CaseStudy } from "./projects.ts";

// Narrative for the original portfolio, using the existing project facts and
// gallery screens. Original sources remain in docs/portfolio-content.md.
export const projectStories: Record<string, CaseStudy> = {
  "allergen-awareness": {
    service: "Bespoke eLearning",
    sections: [
      {
        heading: "Start at the counter.",
        visualTitle: "A guide through the learning",
        paragraphs: [
          "The learning centres on the decisions a food-service colleague needs to make. A customer question, uncertain ingredient information or a handling task gives the guidance a practical setting.",
          "An AI-presented host provides continuity across the five-part programme. The experience brings consistent allergen guidance to franchised leisure outlets while keeping attention on safe actions at the point of service.",
        ],
      },
      {
        heading: "Show what follows a decision.",
        visualTitle: "Allergen decisions in context",
        paragraphs: [
          "Branching situations and gamified checks turn the content into choices to consider. Learners can connect a response to its consequences, with food safety information supporting the reasoning.",
          "Food safety and legal specialists shaped the substance, including the treatment of Natasha’s Law. That specialist input helped preserve the distinctions that matter when guidance becomes a learner-facing activity.",
        ],
      },
      {
        heading: "Bring the learning together.",
        visualTitle: "Connected course content",
        paragraphs: [
          "The final assessment unlocks after the modules, bringing the programme’s learning into a shared checkpoint. The sequence connects explanation, practice and assessment rather than treating them as separate pieces.",
          "Early regulator consultation supported Local Authority endorsement. The reported audit improvement and first-attempt pass rate provide different views of the result: workplace practice and performance within the course.",
        ],
      },
    ],
  },
  "matrix-reloaded": {
    service: "Leadership & blended learning",
    sections: [
      {
        heading: "Make the shift understandable.",
        visualTitle: "Introducing matrix working",
        paragraphs: [
          "Matrix working changes how leaders coordinate, influence and share responsibility. The programme introduced those ideas in short digital modules, giving colleagues a foundation for the conversations ahead.",
          "A six-month blend of online learning, virtual sessions and workplace practice let the subject develop over time. Each format had a role in connecting an organisational change to everyday leadership.",
        ],
      },
      {
        heading: "Look beyond the team boundary.",
        visualTitle: "Exploring silos and shared priorities",
        paragraphs: [
          "Bite-sized concepts led into practical conversations about influence, ambiguity and competing priorities. The focus was the work leaders needed to navigate with other teams.",
          "Virtual sessions added space to discuss those situations. The digital content supported that discussion, while workplace exercises offered a route to try the thinking in context.",
        ],
      },
      {
        heading: "Keep the conversation going.",
        visualTitle: "Putting the matrix into context",
        paragraphs: [
          "Microsoft Teams communities supported peer learning between formal activities. Leaders could connect the programme to their own experience and learn from the perspectives of colleagues.",
          "Surveys and focus groups informed refinements during delivery. Reported completion and confidence describe engagement and perception; longer-term changes in leadership practice need their own evidence.",
        ],
      },
    ],
  },
  "alcohol-and-drug-awareness": {
    service: "Course refresh",
    sections: [
      {
        heading: "Begin with a recognisable moment.",
        visualTitle: "Workplace awareness",
        paragraphs: [
          "The refresh replaced an outdated compliance course with a more focused experience. Workplace video situations introduced the topic before moving into policy and theory.",
          "That ordering gave colleagues a context for the guidance. The emphasis was on recognising a situation and thinking about an appropriate response within the workplace.",
        ],
      },
      {
        heading: "Keep the essentials in reach.",
        visualTitle: "Focused learning and knowledge checks",
        paragraphs: [
          "The rebuilt course ran for less than 15 minutes, combining short video scenarios and knowledge checks. Its length supported a busy audience without making duration the only measure of quality.",
          "The checks gave learners a chance to work with the content. SCORM completion data provided a view of participation alongside the more reflective parts of the experience.",
        ],
      },
      {
        heading: "Make room for reflection.",
        visualTitle: "Reflection within the learning journey",
        paragraphs: [
          "Optional anonymous reflection through Microsoft Forms offered a separate space to consider the subject. Feedback provided a qualitative view of awareness alongside course completion.",
          "Keeping that reflection optional recognised the sensitivity of the topic. The source reports both completion and engagement with the social learning component, rather than treating them as the same outcome.",
        ],
      },
    ],
  },
  "record-keeping": {
    service: "Compliance training",
    sections: [
      {
        heading: "Start with the record people need.",
        visualTitle: "The record-keeping experience",
        paragraphs: [
          "The brief responded to gaps identified by the Housing Ombudsman. The learning connected record management to the documentation tasks colleagues encountered in housing work.",
          "A modular structure brought digital records, retention and data protection into a connected experience. The aim was to make approved guidance usable when someone needed to capture or retrieve information.",
        ],
      },
      {
        heading: "Turn the rules into practice.",
        visualTitle: "Working with information",
        paragraphs: [
          "Simulations and knowledge checks connected policy to practical record-handling decisions. Video, animation and infographics offered different ways to explain the important ideas.",
          "Subject specialists informed the content, while WCAG-led design considered access to the experience. These were connected parts of production, from shaping the guidance to checking the learner journey.",
        ],
      },
      {
        heading: "Check more than completion.",
        visualTitle: "Applying the learning",
        paragraphs: [
          "LMS reporting supported delivery and assessment checks. First-attempt assessment performance helped describe how learners responded within the course.",
          "Post-launch audits offered a separate view of workplace records. The reported reduction in errors is presented alongside assessment results so the evidence keeps its original context.",
        ],
      },
    ],
  },
  "15-minute-compliance": {
    service: "Compliance training",
    sections: [
      {
        heading: "Make room for the essential.",
        visualTitle: "A focused start to compliance",
        paragraphs: [
          "The programme redesigned 62 compliance courses into focused modules. A clear learning objective helped establish what each experience needed to do before production began.",
          "Subject matter experts helped prioritise essential content. The work began with the business case and the learning need, rather than shortening material without considering its purpose.",
        ],
      },
      {
        heading: "Give the learner something to do.",
        visualTitle: "Environmental learning in Rise",
        paragraphs: [
          "Short animations, scenarios and simulations brought the content into practical situations. Active learning gave each module more to offer than a sequence of information screens.",
          "The collection included different compliance subjects, with each experience centred on its own objective. A consistent focus helped the modules work as a wider programme without making every topic identical.",
        ],
      },
      {
        heading: "Keep improving after launch.",
        visualTitle: "A clear route into data protection",
        paragraphs: [
          "Completion information, quiz results and learner feedback informed improvements after delivery. Together, they offered different signals about participation, understanding and the experience itself.",
          "The reported training-time saving describes a change in the time required of employees. It remains distinct from evidence about how effectively colleagues apply the guidance at work.",
        ],
      },
    ],
  },
  "information-security": {
    service: "Compliance training",
    sections: [
      {
        heading: "Give the journey a clear rhythm.",
        visualTitle: "Progress and gamification",
        paragraphs: [
          "Six short modules rebuilt the security pathway around relevant situations. Points, badges and visible progress helped connect the parts of the learning journey.",
          "The structure supported engagement while keeping attention on security decisions. The next message in a colleague’s inbox provided a more useful context than an abstract list of threats.",
        ],
      },
      {
        heading: "Use the message people might receive.",
        visualTitle: "A real-world security example",
        paragraphs: [
          "Actual phishing messages, a vishing call scenario and a colleague’s experience grounded the content in recognisable situations. Human testimony helped make the consequences tangible.",
          "Authentic assets supported the decisions learners were asked to consider. The emphasis was on noticing, checking and following the appropriate reporting process.",
        ],
      },
      {
        heading: "Keep the experience available.",
        visualTitle: "The connected security pathway",
        paragraphs: [
          "Transcripts and text equivalents supported access to the media. User testing and SCORM checks considered both the learner experience and its delivery through the platform.",
          "The reported increase concerns security incident reporting. It is presented as reporting behaviour, alongside completion and satisfaction, without converting it into a claim that incidents fell.",
        ],
      },
    ],
  },
  "your-learning-platform": {
    service: "Learning platform strategy",
    sections: [
      {
        heading: "Understand the people using it.",
        visualTitle: "Supporting access on different devices",
        paragraphs: [
          "The migration brought fourteen business areas into a shared learning environment for 25,000 staff and volunteers. Stakeholder consultations helped establish the requirements behind that scale.",
          "The work connected the platform to different user needs, with a secure, responsive experience as the shared direction. Guidance and documentation supported people through the transition.",
        ],
      },
      {
        heading: "Bring the content together.",
        visualTitle: "Platform administration",
        paragraphs: [
          "A coordinated migration moved learning from Fuse to Cornerstone Learning. Platform configuration and role-based access were considered alongside the content being transferred.",
          "The administration experience was part of the wider system. Clear governance and documentation helped teams understand how the shared environment would be managed.",
        ],
      },
      {
        heading: "Test the journey with the teams.",
        visualTitle: "A personalised place to learn",
        paragraphs: [
          "Cross-department user acceptance testing supported rollout. The process connected requirements and configuration to the experience people would encounter when finding and completing learning.",
          "The source reports changes in administration time and mandatory learning completion during the first year after migration. Those results provide context for the transition, with ongoing management remaining part of the platform’s work.",
        ],
      },
    ],
  },
  "nansen-learning-academy": {
    service: "Customer learning platforms",
    sections: [
      {
        heading: "Meet people at their level.",
        visualTitle: "An entry point into the academy",
        paragraphs: [
          "Nansen’s analytics product brings complex information into everyday workflows. The academy provided foundational, intermediate and advanced tracks so users could begin with an appropriate level of learning.",
          "A custom Webflow learning experience connected those routes. The platform strategy considered product adoption alongside the structure of the learning itself.",
        ],
      },
      {
        heading: "Connect the feature to a workflow.",
        visualTitle: "Learning through the product",
        paragraphs: [
          "Microlearning tutorials and guides linked product features to analytics tasks. Video supported explanation while the wider pathway helped users build confidence over time.",
          "The content gave the product’s complexity a learning structure. Each level provided a different starting point within a connected academy experience.",
        ],
      },
      {
        heading: "Support the journey beyond a lesson.",
        visualTitle: "A connected academy experience",
        paragraphs: [
          "A Discord community supported peer learning, while Google Analytics and Gainsight data informed improvements with a globally distributed team. The academy was part of the wider customer experience.",
          "The source’s support-ticket result applies to academy learners, and its new-user figure concerns completing at least one module within 30 days. Keeping those groups clear helps make the reported outcomes useful.",
        ],
      },
    ],
  },
};
