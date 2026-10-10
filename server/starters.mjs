import { now } from "./domain.mjs";
export function starterCourses() {
  return [
    {
      id: "butter-welcome",
      title: "A good place to begin.",
      format: "scorm12",
      icon: "heart",
      description:
        "Meet Butterlearn and take your first small step. A working SCORM 1.2 starter course.",
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
  ].map((item) => {
    const scorm =
      item.format === "scorm12"
        ? `const api=window.API;api.LMSInitialize('');const saved=api.LMSGetValue('cmi.suspend_data');function finish(){api.LMSSetValue('cmi.core.lesson_status','passed');api.LMSSetValue('cmi.core.score.raw','100');api.LMSSetValue('cmi.core.session_time','0000:01:00');api.LMSSetValue('cmi.suspend_data','finished');api.LMSCommit('');}`
        : item.format === "scorm2004"
          ? `const api=window.API_1484_11;api.Initialize('');const saved=api.GetValue('cmi.suspend_data');function finish(){api.SetValue('cmi.completion_status','completed');api.SetValue('cmi.success_status','passed');api.SetValue('cmi.score.scaled','1');api.SetValue('cmi.session_time','PT1M');api.SetValue('cmi.suspend_data','finished');api.Commit('');}`
          : "";
    const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${item.title}</title><style>body{font:17px/1.6 system-ui,sans-serif;background:#fdfcf8;color:#20201d;margin:0;padding:clamp(24px,6vw,70px)}main{max-width:720px;margin:auto}h1{font-size:clamp(32px,5vw,56px);line-height:1.1;letter-spacing:-2px}h2{font-size:28px;line-height:1.2}button{display:block;width:100%;text-align:left;background:#fff6ce;border:1px solid #20201d;border-radius:12px;padding:18px;margin:12px 0;color:inherit;font:inherit;cursor:pointer}button:hover{background:#f8e477}button:focus-visible{outline:3px solid #8b6918;outline-offset:4px}.result{background:#e2eadd;padding:20px;border-radius:12px;margin-top:24px}p{color:#55554e}</style></head><body><main><p>butterlearn</p><h1>${item.title}</h1><p>${item.description}</p><h2>${item.question}</h2>${item.options.length ? item.options.map((option, index) => `<button onclick="choose(${index})">${option}</button>`).join("") : "<p>Choose one thing you can put into practice today. Find a small moment to try it, notice what changed, then share it with someone.</p><p>Learning is a habit you build with useful experiences, reflection and a little support.</p><p>When you’re ready, use “Mark complete” above this course.</p>"}<div id="result" role="status"></div></main><script>${scorm}function choose(index){const right=index===${item.answer};document.getElementById('result').className='result';document.getElementById('result').textContent=right?'A good call. You’ve completed this course.':'Try a little more curiosity. Choose another response.';if(right)finish();}${item.format !== "html" ? "if(saved==='finished'){document.getElementById('result').textContent='Welcome back. Your completion has been saved.'}" : ""}</script></body></html>`;
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
  });
}
