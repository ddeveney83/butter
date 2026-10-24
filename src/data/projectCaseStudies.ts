import type { Project } from "./projects.ts";

// New case studies deliberately use labelled artwork until final project media
// is supplied. Sources and replacement instructions are in docs/portfolio-content.md.
const content: Omit<
  Project,
  "hero" | "gallery" | "videoIds" | "scenario" | "choices"
>[] = [
  {
    id: "strategic-skills-mapping",
    title: "Strategic Skills Mapping",
    category: "Learning strategy · Skills analysis",
    filter: "Strategy & capability",
    theme: "mint",
    mediaKind: "placeholder",
    client: "Places for People",
    year: "2025",
    role: "Learning consultancy & needs analysis",
    intro: "A clearer picture of what comes next.",
    description:
      "A learning needs analysis across five operational teams, turning conversations about performance into a shared skills framework and practical development plans.",
    deliverables: [
      "Stakeholder interviews",
      "Skills framework",
      "Development planning",
    ],
    approach:
      "Structured interviews with team leaders and colleagues surfaced the skills people used, the gaps they experienced and the priorities ahead. A common taxonomy connected technical, behavioural and role-specific skills to business needs.",
    outcome:
      "The original case study reports eight skill categories, alignment across five teams and structured personal development plans for more than 17 colleagues. These are reported project outputs, rather than a measured improvement in business performance.",
    metric: {
      value: "5",
      label: "Operational teams brought into one skills analysis",
    },
    caseStudy: {
      service: "Learning strategy & skills mapping",
      heroBrief:
        "An anonymised overview of the skills framework, showing how five teams connect to shared development priorities.",
      sections: [
        {
          heading: "Listen before designing.",
          visualTitle: "Discovery & interviews",
          visualBrief:
            "An anonymised interview board with recurring needs, team perspectives and key questions.",
          paragraphs: [
            "The starting point was the work people needed to do. Conversations with leaders and individual contributors explored everyday responsibilities, changing expectations and barriers to good performance.",
            "Grouping those insights made it possible to distinguish an individual development need from a shared team priority. The analysis gave stakeholders something concrete to discuss before choosing learning interventions.",
          ],
        },
        {
          heading: "Make the gaps visible.",
          visualTitle: "The skills map",
          visualBrief:
            "A redacted skills matrix or heatmap showing the eight categories and team-level gaps.",
          paragraphs: [
            "Eight categories provided a common language for skills that had previously been described in different ways. Technical knowledge sat alongside behavioural skills and the capabilities specific to each role.",
            "Comparing the current picture with future needs helped teams discuss where to focus. The framework supported prioritisation without treating every gap as a request for another course.",
          ],
        },
        {
          heading: "Turn insight into a next step.",
          visualTitle: "Development in practice",
          visualBrief:
            "An anonymised personal development plan connecting a priority skill to a practical action and review point.",
          paragraphs: [
            "Recommendations were translated into personal development plans with colleagues and their managers. Each plan connected a recognised need to an actionable development opportunity.",
            "The resulting framework and plans gave the teams a reference for ongoing development conversations. The value of the work was a clearer basis for decisions, with follow-up needed to establish longer-term performance impact.",
          ],
        },
      ],
    },
  },
  {
    id: "ld-digital-upskilling",
    title: "L&D Digital Upskilling",
    category: "Capability building · Blended learning",
    filter: "Strategy & capability",
    theme: "lilac",
    mediaKind: "placeholder",
    client: "British Red Cross",
    year: "2020–2022",
    role: "Programme design & facilitation",
    intro: "Help the team make it themselves.",
    description:
      "A two-year development programme helping an L&D team build the confidence and practical skills to design, create and publish digital learning independently.",
    deliverables: [
      "Facilitated workshops",
      "Self-paced resources",
      "Creative capstone",
    ],
    approach:
      "Face-to-face workshops, virtual sessions, tool practice and peer support met colleagues at different levels of experience. Instructional design foundations were connected to hands-on work in Rise, Storyline and Vyond, with a playful capstone to bring the learning together.",
    outcome:
      "The source reports that every participant independently published an eLearning asset, with three times as many internal assets produced per quarter. Programme satisfaction was reported as 4.6 out of 5; the figures describe this programme’s experience rather than a guaranteed result.",
    metric: {
      value: "100%",
      label:
        "Of participants reported to have independently published an eLearning asset",
    },
    caseStudy: {
      service: "L&D team development",
      heroBrief:
        "A programme overview bringing together workshop activity, digital learning examples and the Veggie Ninja capstone.",
      sections: [
        {
          heading: "Build the design foundations.",
          visualTitle: "Workshop to workflow",
          visualBrief:
            "A workshop resource or design exercise showing how an objective becomes a learning activity.",
          paragraphs: [
            "The programme began with the decisions behind a useful learning experience. ADDIE, SAM, Bloom’s taxonomy and Gagné’s instructional events gave the team different ways to plan and evaluate their work.",
            "Facilitated exercises connected these ideas to real briefs. The blend of face-to-face and virtual sessions supported both existing colleagues and people joining the team during the programme.",
          ],
        },
        {
          heading: "Give practice a purpose.",
          visualTitle: "Tools & peer learning",
          visualBrief:
            "A composite of Rise, Storyline or Vyond work produced during practice, with any learner information removed.",
          paragraphs: [
            "Self-paced resources and practical tool exercises helped colleagues move from watching a demonstration to creating an asset. Peer forums created space to share work, compare approaches and ask questions.",
            "The emphasis was on making informed design choices rather than collecting software features. Each practice activity gave colleagues a chance to connect a tool to a learning need.",
          ],
        },
        {
          heading: "Make something worth sharing.",
          visualTitle: "Veggie Ninja capstone",
          visualBrief:
            "A title screen and interaction from the Veggie Ninja capstone, or a short recording of the learner experience.",
          paragraphs: [
            "The Veggie Ninja capstone brought design, media production and interaction building into one creative challenge. It offered a playful setting for applying the skills developed throughout the programme.",
            "Independent publishing was the practical milestone. The source also reports increased internal production, showing how capability development can support an ongoing learning service beyond a single training event.",
          ],
        },
      ],
    },
  },
  {
    id: "linkedin-learning",
    title: "Introducing AI Conversations",
    category: "Campaign film · Learning adoption",
    filter: "Video",
    theme: "peach",
    mediaKind: "placeholder",
    client: "Places for People",
    year: "2024",
    role: "Storyboarding & motion design",
    intro: "A new learning tool. A reason to try it.",
    description:
      "An internal launch film introducing LinkedIn Learning’s AI Conversations feature to colleagues at Places for People, using familiar workplace moments to make the benefit clear.",
    deliverables: [
      "Campaign storyboard",
      "Animated launch film",
      "Captioned demonstration",
    ],
    approach:
      "A film of under two minutes connected recognisable conversation challenges to a short tool demonstration and a clear invitation to try it. Screen captures, interface mockups and voiceover kept the explanation grounded in the colleague experience.",
    outcome:
      "The source reports a 35% click-through rate and more than 550 new users within weeks of the campaign. These are reported campaign results; the case study does not establish that the film alone caused every sign-up. This was an internal Places for People campaign, rather than a commission from LinkedIn.",
    metric: {
      value: "550+",
      label: "New users reported within weeks of the internal launch",
    },
    caseStudy: {
      service: "Learning campaigns & animation",
      heroBrief:
        "A launch-film still combining a relatable workplace conversation with the AI Conversations interface.",
      sections: [
        {
          heading: "Start with a familiar moment.",
          visualTitle: "The opening story",
          visualBrief:
            "Storyboard frames introducing the workplace situation and the reason someone might practise a conversation.",
          paragraphs: [
            "The opening needed to answer a simple question: why would a busy colleague care? Familiar workplace scenarios introduced the need before the product appeared.",
            "This gave the campaign a human starting point. The tool became a way to practise something useful, with a short narrative carrying viewers towards the demonstration.",
          ],
        },
        {
          heading: "Show the experience clearly.",
          visualTitle: "The product demonstration",
          visualBrief:
            "A cleared screen capture or frame sequence showing the AI Conversations practice journey.",
          paragraphs: [
            "Screen captures and interface mockups showed what a colleague would encounter after clicking through. The sequence focused on the useful steps, keeping the film short enough for an internal launch.",
            "Voiceover supported the story, while high-contrast captions kept it understandable when watched without sound. The visual treatment connected the practical demonstration to the wider campaign.",
          ],
        },
        {
          heading: "Make the next action obvious.",
          visualTitle: "The launch & invitation",
          visualBrief:
            "The closing film frame or internal campaign placement, with a clear route into the learning account.",
          paragraphs: [
            "The closing invitation directed colleagues to their learning accounts to try the feature. Recognition, demonstration and action formed one continuous journey.",
            "The reported click-through and new-user figures provide context for the launch. They are useful signals of adoption, with further evidence needed to understand sustained use and learning outcomes.",
          ],
        },
      ],
    },
  },
  {
    id: "ai-enabled-scenario-learning",
    title: "AI-Enabled Scenario Learning",
    category: "Scenario video · Leadership development",
    filter: "Video",
    theme: "yellow",
    mediaKind: "placeholder",
    client: "Places for People",
    year: "2024",
    role: "Learning experience & video design",
    intro: "Real dilemmas. Room to think.",
    description:
      "Twenty scenario videos designed for eight leadership programmes, giving facilitators a consistent way to introduce workplace dilemmas and open up discussion.",
    deliverables: [
      "Scenario scripts",
      "AI-presented video",
      "Facilitator resources",
    ],
    approach:
      "A whole–part–whole structure placed a recognisable situation before the theory, then returned to it for reflection. Synthesia presenters, branded environments and reusable resources supported a consistent experience across the programmes.",
    outcome:
      "The source reports 20 scenario videos deployed across eight leadership programmes. These delivery figures describe the reach of the production; they do not by themselves measure a change in leadership behaviour.",
    metric: {
      value: "20",
      label: "Scenario videos created for eight leadership programmes",
    },
    caseStudy: {
      service: "Scenario learning & video production",
      heroBrief:
        "A set of representative scenario-film frames, showing different workplace contexts and presenter treatments.",
      sections: [
        {
          heading: "Let the dilemma do the work.",
          visualTitle: "The scenario storyboard",
          visualBrief:
            "A script extract and storyboard showing the situation, decision point and facilitator prompt.",
          paragraphs: [
            "Each scenario began with a situation leaders could recognise. The scripts created a reason to think and talk before introducing the relevant leadership concept.",
            "The whole–part–whole structure let facilitators return to the opening situation after exploring the theory. That return created space to reconsider a response with a different perspective.",
          ],
        },
        {
          heading: "Create a consistent cast.",
          visualTitle: "The production treatment",
          visualBrief:
            "A cleared montage of Synthesia presenter frames, branded environments and on-screen learning cues.",
          paragraphs: [
            "AI presenters supported production across a set of programmes, with varied characters and custom environments used to make each situation distinct. Branding held the collection together.",
            "The production choices served the facilitated experience: a clear setup, a manageable amount of information and an intentional point to pause. The videos supported conversation rather than replacing the facilitator.",
          ],
        },
        {
          heading: "Design beyond the video.",
          visualTitle: "Facilitator handover",
          visualBrief:
            "A facilitator slide or discussion guide connecting a film to the session activity and debrief.",
          paragraphs: [
            "Reusable resources helped facilitators connect the films to their sessions. Discussion and reflection made the scenarios part of a wider learning experience.",
            "The collection reached eight leadership programmes. Its production scale is documented separately from learning impact, which would require evidence about how leaders applied the ideas at work.",
          ],
        },
      ],
    },
  },
  {
    id: "laaw-2024",
    title: "Learning at Work Week",
    category: "Campaign animation · Internal communications",
    filter: "Video",
    theme: "lilac",
    mediaKind: "placeholder",
    client: "Internal learning team",
    year: "2024",
    role: "Creative concept & motion design",
    intro: "Put a face to the learning team.",
    description:
      "A seven-film internal campaign for Learning at Work Week, introducing the people behind a learning service through short, personalised superhero animations.",
    deliverables: [
      "Campaign concept",
      "Seven animated portraits",
      "Social-first films",
    ],
    approach:
      "Thirty-to-sixty-second animations gave each team member a distinctive superhero introduction. Square-format films, bold typography and captions were designed for discovery in the Viva Engage feed, including viewing without sound.",
    outcome:
      "The source reports more than 1,350 reactions over the week and a 25% increase in requests to the learning service. These are reported campaign figures, with no claim that reactions alone demonstrate improved learning.",
    metric: {
      value: "7",
      label: "Personalised animated films introducing the learning team",
    },
    caseStudy: {
      service: "Learning campaigns & animation",
      heroBrief:
        "A campaign contact sheet bringing together the seven animated superhero portraits.",
      sections: [
        {
          heading: "Make the service feel human.",
          visualTitle: "The superhero concept",
          visualBrief:
            "A character sheet or early storyboard explaining how an individual’s role became a superhero introduction.",
          paragraphs: [
            "The idea brought the people behind the learning service into view. Each animated introduction connected a team member’s personality and expertise to the support available to colleagues.",
            "A shared superhero concept made the films feel like one campaign, while individual treatments gave viewers a reason to recognise and remember the people involved.",
          ],
        },
        {
          heading: "Design for the feed.",
          visualTitle: "Animation in motion",
          visualBrief:
            "A short sequence of campaign frames demonstrating character movement, bold type and readable captions.",
          paragraphs: [
            "Each film ran for 30 to 60 seconds in a square format suited to Viva Engage. Strong contrast and captions kept the message available to colleagues scrolling without sound.",
            "The original production used an acid-yellow, black and indigo palette with bold display typography. Final media can retain that project identity inside the butter case-study frame.",
          ],
        },
        {
          heading: "Connect attention to a service.",
          visualTitle: "The campaign in context",
          visualBrief:
            "An anonymised internal feed placement or campaign results summary with identifying information removed.",
          paragraphs: [
            "Learning at Work Week gave the team a timely reason to introduce its offer. The campaign paired a memorable creative treatment with an existing route to ask the team for help.",
            "The reported reactions and increase in service requests indicate interest during the launch period. They offer a more useful account of the campaign than presenting animation views as a learning outcome.",
          ],
        },
      ],
    },
  },
  {
    id: "humankind-educatorhub",
    title: "Humankind EducatorHub",
    category: "LMS · Moodle · Humanitarian education",
    filter: "LMS",
    theme: "peach",
    mediaKind: "placeholder",
    client: "British Red Cross",
    year: "2026 · Ongoing",
    role: "Digital product & Moodle development",
    intro: "Support the educator. Reach the classroom.",
    description:
      "A Moodle-based learning platform helping UK secondary-school educators approach humanitarian topics with confidence, combining self-paced development with resources for the classroom.",
    deliverables: [
      "Custom Moodle experience",
      "Educator learning journey",
      "Operational handover",
    ],
    approach:
      "A product-led build connected platform architecture, content design and educator needs. A custom homepage and considered course journey helped time-pressed teachers discover learning and classroom resources, with documentation to support the team managing the platform.",
    outcome:
      "The source reports more than 1,500 teachers enrolled, indirect reach to over 4,500 students through the educator model and 78% of educators reporting increased confidence teaching humanitarian topics. Student reach is distinguished from direct platform enrolment; development is ongoing.",
    metric: {
      value: "4,500+",
      label: "Students reportedly reached through the educator model",
    },
    caseStudy: {
      service: "Educator platforms & Moodle development",
      heroBrief:
        "The educator homepage and a representative learning pathway, with any school or learner information removed.",
      sections: [
        {
          heading: "Start with the teacher’s day.",
          visualTitle: "The educator journey",
          visualBrief:
            "A journey map or homepage screen showing the route from discovering a topic to finding a classroom resource.",
          paragraphs: [
            "Sensitive humanitarian topics ask more of an educator than subject knowledge alone. The platform needed to make a useful teaching framework and appropriate resources easy to find.",
            "The journey connected personal development with classroom application. Self-paced learning sat alongside downloadable materials so educators could move from building their own confidence to planning a lesson.",
          ],
        },
        {
          heading: "Build around the learning.",
          visualTitle: "Inside the Moodle experience",
          visualBrief:
            "Cleared Moodle course and resource screens showing navigation, learning content and download placement.",
          paragraphs: [
            "The build used Moodle with a custom homepage and an educator-focused route from first visit to course completion. Platform decisions were made alongside product, content design and marketing colleagues.",
            "Sprint-based work supported an evolving product. The aim was a coherent experience in which the technology, teaching approach and brand worked together for busy secondary-school professionals.",
          ],
        },
        {
          heading: "Leave the team ready to run it.",
          visualTitle: "The operational playbook",
          visualBrief:
            "A redacted handover guide, publishing workflow or support model showing how the education team maintains the platform.",
          paragraphs: [
            "The handover was treated as part of the product. Systems, documentation and processes helped the community education team manage the platform beyond the initial development work.",
            "Reported teacher enrolment, student reach and educator confidence describe different aspects of the project. Keeping them separate makes the scale and limitations of the evidence easier to understand as the platform continues to develop.",
          ],
        },
      ],
    },
  },
];

export const caseStudies: Project[] = content.map((project) => ({
  ...project,
  hero: {
    path: `/work/${project.id}/overview.svg`,
    alt: `${project.title} — overview image placeholder`,
  },
  gallery: project.caseStudy.sections.map((section, index) => ({
    path: `/work/${project.id}/detail-${index + 1}.svg`,
    alt: `${project.title} — ${section.visualTitle.toLowerCase()} image placeholder`,
  })),
  videoIds: [],
  scenario: "",
  choices: [],
}));
