import { now } from "./domain.mjs";
import { compileDocument } from "./authoring.mjs";
export function starterCourses() {
  return [
    {
      id: "butter-welcome",
      title: "A good place to begin.",
      format: "scorm12",
      icon: "heart",
      description:
        "Meet butterlearn and take your first small step. A working SCORM 1.2 starter course.",
      question: "What makes learning useful?",
      options: ["More slides", "A useful next step", "A bigger certificate"],
      answer: 1,
    },
    {
      id: "butter-decisions",
      title: "Make a good call.",
      format: "scorm2004",
      icon: "idea",
      description:
        "Practise a decision and see how progress is recorded. A working SCORM 2004 starter course.",
      question: "A teammate seems unsure about a new process. What do you do?",
      options: [
        "Send the whole manual",
        "Ask what would help, then practise together",
        "Wait until the next review",
      ],
      answer: 1,
    },
    {
      id: "butter-resources",
      title: "Room to grow.",
      format: "html",
      icon: "spark",
      description:
        "A short HTML learning resource about building a sustainable learning habit.",
      question: "Small steps count.",
      options: [],
      answer: 0,
    },
  ]
    .map((item) => {
      const scorm =
        item.format === "scorm12"
          ? `const api=window.API;api.LMSInitialize('');const saved=api.LMSGetValue('cmi.suspend_data');function finish(){api.LMSSetValue('cmi.core.lesson_status','passed');api.LMSSetValue('cmi.core.score.raw','100');api.LMSSetValue('cmi.core.session_time','0000:01:00');api.LMSSetValue('cmi.suspend_data','finished');api.LMSCommit('');}`
          : item.format === "scorm2004"
            ? `const api=window.API_1484_11;api.Initialize('');const saved=api.GetValue('cmi.suspend_data');function finish(){api.SetValue('cmi.completion_status','completed');api.SetValue('cmi.success_status','passed');api.SetValue('cmi.score.scaled','1');api.SetValue('cmi.session_time','PT1M');api.SetValue('cmi.suspend_data','finished');api.Commit('');}`
            : "";
      const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${item.title}</title><style>body{font:17px/1.6 system-ui,sans-serif;background:#fffefb;color:#111110;margin:0;padding:clamp(24px,6vw,70px)}main{max-width:720px;margin:auto}h1{font-size:clamp(32px,5vw,56px);line-height:1.1;letter-spacing:-2px}h2{font-size:28px;line-height:1.2}button{display:block;width:100%;text-align:left;background:#ffedb1;border:1px solid #111110;border-radius:12px;padding:18px;margin:12px 0;color:inherit;font:inherit;cursor:pointer}button:hover{background:#ffdf55}button:focus-visible{outline:3px solid #a52e34;outline-offset:4px}.result{background:#e2eadd;padding:20px;border-radius:12px;margin-top:24px}p{color:#55554e}</style></head><body><main><p>butterlearn</p><h1>${item.title}</h1><p>${item.description}</p><h2>${item.question}</h2>${item.options.length ? item.options.map((option, index) => `<button onclick="choose(${index})">${option}</button>`).join("") : "<p>Choose one thing you can put into practice today. Find a small moment to try it, notice what changed, then share it with someone.</p><p>Learning is a habit you build with useful experiences, reflection and a little support.</p><p>When you’re ready, use “Mark complete” above this course.</p>"}<div id="result" role="status"></div></main><script>${scorm}function choose(index){const right=index===${item.answer};document.getElementById('result').className='result';document.getElementById('result').textContent=right?'A good call. You’ve completed this course.':'Try a little more curiosity. Choose another response.';if(right)finish();}${item.format !== "html" ? "if(saved==='finished'){document.getElementById('result').textContent='Welcome back. Your completion has been saved.'}" : ""}</script></body></html>`;
      return {
        course: {
          id: item.id,
          title: item.title,
          description: item.description,
          format: item.format,
          icon: item.icon,
          minutes: 3,
          published: true,
          lessons: [{ id: "lesson-1", title: item.title, path: "index.html" }],
          assetPrefix: `packages/${item.id}`,
          createdAt: now(),
        },
        html,
      };
    })
    .concat(authoredStarters());
}

function authoredStarters() {
  const text = (id, html) => ({ id, type: "text", html });
  const image = {
    id: "workspace-image",
    type: "image",
    url: "/learning-assets/workspace.svg",
    alt: "A workspace illustrated with a notebook, laptop, coffee and plant",
    caption: "A little space for a fresh perspective.",
  };
  const projects = [
    {
      id: "butter-notice",
      title: "A moment to notice.",
      format: "html",
      icon: "heart",
      description:
        "An example HTML course. Explore mindful working with a short video, image hotspots and reflection.",
      minutes: 4,
      blocks: [
        text(
          "notice-intro",
          "<h2>Make a little room.</h2><p>A pause does not need to be long. Notice what is around you, choose one useful focus and give it your attention.</p>",
        ),
        {
          id: "notice-video",
          type: "video",
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          title: "Notice the details · sample nature clip",
          transcript:
            "A short, silent example clip shows flowers moving gently outdoors. Notice a colour, a movement and a small detail. This public CC0 media is a placeholder for your own course video.",
        },
        {
          id: "notice-spots",
          type: "hotspots",
          url: image.url,
          alt: image.alt,
          points: [
            {
              title: "Clear one distraction",
              html: "<p>Close a tab you do not need. Give the next task a little more space.</p>",
              x: 54,
              y: 47,
            },
            {
              title: "Capture a thought",
              html: "<p>Put one thought on paper rather than keeping it in your head.</p>",
              x: 20,
              y: 60,
            },
            {
              title: "Take a pause",
              html: "<p>Step away for a moment, take a breath and return with a clear next step.</p>",
              x: 86,
              y: 63,
            },
          ],
        },
        {
          id: "notice-reflection",
          type: "accordion",
          items: [
            {
              title: "What did you notice?",
              html: "<p>Name one thing you had overlooked. A useful pause starts with paying attention.</p>",
            },
            {
              title: "What will you try?",
              html: "<p>Choose a two-minute pause between your next two tasks.</p>",
            },
          ],
        },
      ],
    },
    {
      id: "butter-feedback",
      title: "Feedback that lands.",
      format: "html",
      icon: "spark",
      description:
        "An example HTML course. Turn a difficult conversation into a useful next step with flip cards, tabs and a practice question.",
      minutes: 6,
      blocks: [
        text(
          "feedback-intro",
          "<h2>Be clear. Be kind.</h2><p>Useful feedback connects an observation to its impact, then opens a conversation about what could happen next.</p>",
        ),
        {
          id: "feedback-columns",
          type: "columns",
          columns: [
            "<h3>Say what happened.</h3><p>Describe something specific that you saw or heard. Leave assumptions about intention out of the conversation.</p>",
            "<h3>Explain why it matters.</h3><p>Connect your observation to a real effect on the work or the people involved.</p>",
          ],
        },
        {
          id: "feedback-flips",
          type: "flipcards",
          items: [
            {
              title: "Instead of ‘You never listen’…",
              html: "<p>Try: ‘During the handover, I had not finished explaining the change before we moved on.’</p>",
            },
            {
              title: "Instead of ‘Be more professional’…",
              html: "<p>Try: ‘When the update arrived after the deadline, the team had to change its plan.’</p>",
            },
          ],
        },
        {
          id: "feedback-tabs",
          type: "tabs",
          items: [
            {
              title: "Prepare",
              html: "<p>Pick one observation, a clear impact and a useful question.</p>",
            },
            {
              title: "Discuss",
              html: "<p>Share your perspective, then ask what the other person noticed.</p>",
            },
            {
              title: "Agree",
              html: "<p>Choose a small next step together and decide when to check in.</p>",
            },
          ],
        },
        {
          id: "feedback-quiz",
          type: "quiz",
          question: "Which opening gives feedback a useful starting point?",
          options: [
            "You are always careless",
            "In yesterday's handover, the new deadline was missing from the notes",
            "Everyone thinks you should try harder",
          ],
          answer: 1,
          feedback:
            "Specific observations make it easier to understand the issue and agree a next step.",
        },
      ],
    },
    {
      id: "butter-safety",
      title: "Spot the safer choice.",
      format: "scorm2004",
      icon: "idea",
      description:
        "An example SCORM 2004 course. Explore a workspace and practise safer choices. Completion and quiz scores save to your dashboard.",
      minutes: 5,
      blocks: [
        text(
          "safety-intro",
          "<h2>A small check. A safer day.</h2><p>This is an illustrative practice course, rather than formal safety guidance. Explore the workspace, then check your next step.</p>",
        ),
        {
          id: "safety-hotspots",
          type: "hotspots",
          url: image.url,
          alt: image.alt,
          points: [
            {
              title: "Your screen",
              html: "<p>Take a moment to check comfort, glare and the position of your screen.</p>",
              x: 54,
              y: 45,
            },
            {
              title: "Your desk",
              html: "<p>Keep the space you use clear and put frequently used items within easy reach.</p>",
              x: 21,
              y: 61,
            },
            {
              title: "Your drink",
              html: "<p>Keep drinks away from electrical equipment and avoid trailing cables.</p>",
              x: 86,
              y: 63,
            },
          ],
        },
        {
          id: "safety-panels",
          type: "accordion",
          items: [
            {
              title: "Before you begin",
              html: "<p>Notice the space around you. If something is unclear, follow your workplace's guidance or ask the appropriate person.</p>",
            },
            {
              title: "If you spot a concern",
              html: "<p>Pause and report the concern through your workplace's established process.</p>",
            },
          ],
        },
        {
          id: "safety-quiz",
          type: "quiz",
          question:
            "You notice a possible problem with your workspace. What is a useful next step?",
          options: [
            "Ignore it until someone else notices",
            "Pause, check the guidance and report the concern",
            "Change electrical equipment yourself",
          ],
          answer: 1,
          feedback:
            "A pause and the right support are a better starting point than a guess.",
        },
      ],
    },
  ];
  return projects.map(({ id, ...document }) => {
    const assetPrefix = `packages/${id}/draft-1`;
    return {
      course: {
        id,
        ...document,
        blocks: undefined,
        authored: true,
        placeholder: true,
        published: true,
        draftRevision: 1,
        publishedRevision: 1,
        assetPrefix,
        lessons: [
          { id: "lesson-1", title: document.title, path: "index.html" },
        ],
        createdAt: now(),
      },
      draft: { document, revision: 1, assetPrefix, updatedAt: now() },
      html: compileDocument(document),
    };
  });
}

export async function seedStarterCourses(store, files, createdBy) {
  let added = 0;
  for (const sample of starterCourses()) {
    const key = `courses/${sample.course.id}`;
    if (await store.get(key, { type: "json" })) continue;
    await files.set(`${sample.course.assetPrefix}/index.html`, sample.html, {
      metadata: { type: "text/html; charset=utf-8" },
    });
    if (sample.draft)
      await store.setJSON(`authoring/${sample.course.id}`, sample.draft, {
        onlyIfNew: true,
      });
    const result = await store.setJSON(
      key,
      { ...sample.course, createdBy },
      { onlyIfNew: true },
    );
    if (result.modified) added++;
  }
  return added;
}
