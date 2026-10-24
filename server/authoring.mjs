import sanitizeHtml from "sanitize-html";
import { problem, text } from "./domain.mjs";

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
export function mediaURL(value, optional = false) {
  if (optional && !value) return "";
  if (typeof value !== "string" || value.length > 2000)
    throw problem(400, "Use a valid HTTPS media URL.");
  if (/^\/learning-assets\/[a-zA-Z0-9_.-]+$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password)
      return url.href;
  } catch {
    /* Invalid URL. */
  }
  throw problem(400, "Use a valid HTTPS media URL.");
}
export function richHTML(value) {
  if (typeof value !== "string" || value.length > 30000)
    throw problem(400, "Keep each text area below 30,000 characters.");
  return sanitizeHtml(value, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "code",
      "pre",
      "hr",
      "a",
      "img",
      "br",
    ],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] },
    allowedSchemes: ["https"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attrs) => ({
        tagName,
        attribs: {
          href: /^https:\/\//i.test(attrs.href || "") ? attrs.href : "",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      img: (tagName, attrs) => {
        let src = "";
        try {
          src = mediaURL(attrs.src);
        } catch {
          /* Strip unsafe images. */
        }
        return {
          tagName,
          attribs: { src, alt: (attrs.alt || "").slice(0, 300) },
        };
      },
    },
  });
}
function videoURL(value) {
  const url = mediaURL(value, true);
  if (url.startsWith("/")) throw problem(400, "Use an HTTPS video URL.");
  return url;
}
const string = (value, max = 500) =>
  typeof value === "string" && value.length <= max
    ? value
    : (() => {
        throw problem(400, "This content is too long or invalid.");
      })();
const items = (value, min = 1, max = 12) => {
  if (!Array.isArray(value) || value.length < min || value.length > max)
    throw problem(400, `Use between ${min} and ${max} items.`);
  return value;
};

export function validateDocument(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw problem(400, "Enter course content.");
  const ids = new Set();
  return {
    title: text(input.title),
    description: string(input.description || "", 2000),
    minutes: Math.max(1, Math.min(600, Number(input.minutes) || 10)),
    icon: ["heart", "idea", "spark"].includes(input.icon) ? input.icon : "idea",
    format:
      input.format === "scorm2004"
        ? "scorm2004"
        : input.format === "html"
          ? "html"
          : (() => {
              throw problem(400, "Choose HTML or SCORM 2004.");
            })(),
    blocks: items(input.blocks, 0, 60).map((block) => {
      if (!block || !/^[\w-]{1,80}$/.test(block.id || "") || ids.has(block.id))
        throw problem(400, "Each block needs a unique identifier.");
      ids.add(block.id);
      const base = { id: block.id, type: block.type };
      switch (block.type) {
        case "text":
          return { ...base, html: richHTML(block.html) };
        case "columns":
          return {
            ...base,
            columns: items(block.columns, 2, 3).map(richHTML),
            videos:
              block.videos === undefined
                ? []
                : items(block.videos, 0, 3).map(videoURL),
          };
        case "image":
          return {
            ...base,
            url: mediaURL(block.url, true),
            alt: string(block.alt || "", 300),
            caption: string(block.caption || "", 500),
          };
        case "video":
          return {
            ...base,
            url: videoURL(block.url),
            title: string(block.title || "Video", 180),
            transcript: string(block.transcript || "", 12000),
          };
        case "flipcards":
        case "accordion":
        case "tabs":
          return {
            ...base,
            items: items(block.items).map((item) => ({
              title: text(item.title, 180),
              html: richHTML(item.html),
            })),
          };
        case "hotspots":
          return {
            ...base,
            url: mediaURL(block.url, true),
            alt: string(block.alt || "", 300),
            points: items(block.points).map((point) => ({
              title: text(point.title, 180),
              html: richHTML(point.html),
              x: Math.max(0, Math.min(100, Number(point.x) || 0)),
              y: Math.max(0, Math.min(100, Number(point.y) || 0)),
            })),
          };
        case "quiz": {
          const options = items(block.options, 2, 6).map((option) =>
            text(option, 300),
          );
          if (
            !Number.isInteger(block.answer) ||
            block.answer < 0 ||
            block.answer >= options.length
          )
            throw problem(400, "Choose a correct quiz answer.");
          return {
            ...base,
            question: text(block.question, 500),
            options,
            answer: block.answer,
            feedback: string(block.feedback || "A good call.", 1000),
          };
        }
        default:
          throw problem(400, "This content block is not supported.");
      }
    }),
  };
}

function video(block) {
  if (!block.url)
    return '<p class="placeholder">Add a video to bring this moment to life.</p>';
  const url = new URL(block.url);
  let embed;
  if (["www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)) {
    const id =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") || url.pathname.split("/").pop();
    if (/^[\w-]{11}$/.test(id || ""))
      embed = `https://www.youtube-nocookie.com/embed/${id}`;
  } else if (
    ["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
  ) {
    const id = url.pathname.split("/").pop();
    if (/^\d+$/.test(id || "")) embed = `https://player.vimeo.com/video/${id}`;
  }
  return `${embed ? `<iframe class="video" src="${escape(embed)}" title="${escape(block.title)}" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>` : `<video class="video" controls preload="metadata" src="${escape(block.url)}" aria-label="${escape(block.title)}"></video>`}${block.transcript ? `<details><summary>Read the transcript</summary><p class="transcript">${escape(block.transcript)}</p></details>` : ""}`;
}
function renderBlock(block) {
  const key = block.id;
  switch (block.type) {
    case "text":
      return `<section class="rich">${block.html}</section>`;
    case "columns":
      return `<section class="columns columns-${block.columns.length}">${block.columns.map((html, index) => `<div class="rich">${html}${block.videos?.[index] ? video({ url: block.videos[index], title: `Column ${index + 1} video`, transcript: "" }) : ""}</div>`).join("")}</section>`;
    case "image":
      return block.url
        ? `<figure><img src="${escape(block.url)}" alt="${escape(block.alt)}" loading="lazy">${block.caption ? `<figcaption>${escape(block.caption)}</figcaption>` : ""}</figure>`
        : '<div class="placeholder">An image goes here.</div>';
    case "video":
      return `<section>${video(block)}</section>`;
    case "flipcards":
      return `<section class="flip-grid">${block.items.map((item) => `<button class="flip-card" aria-expanded="false"><span class="flip-front"><strong>${escape(item.title)}</strong><small>Turn it over ↗</small></span><span class="flip-back rich" hidden>${item.html}<small>Turn it back ↙</small></span></button>`).join("")}</section>`;
    case "accordion":
      return `<section class="accordion">${block.items.map((item) => `<details><summary>${escape(item.title)}<span aria-hidden="true">+</span></summary><div class="rich detail-body">${item.html}</div></details>`).join("")}</section>`;
    case "tabs":
      return `<section class="tabs"><div role="tablist" aria-label="Explore the topics">${block.items.map((item, i) => `<button role="tab" id="${key}-tab-${i}" aria-controls="${key}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${escape(item.title)}</button>`).join("")}</div>${block.items.map((item, i) => `<div class="rich tab-panel" role="tabpanel" tabindex="0" id="${key}-panel-${i}" aria-labelledby="${key}-tab-${i}" ${i ? "hidden" : ""}>${item.html}</div>`).join("")}</section>`;
    case "hotspots":
      return `<section class="hotspots"><div class="hotspot-image">${block.url ? `<img src="${escape(block.url)}" alt="${escape(block.alt)}">` : '<div class="placeholder">Add an image, then explore its hotspots.</div>'}${block.points.map((point, i) => `<button class="hotspot" style="left:${point.x}%;top:${point.y}%" aria-label="${escape(point.title)}" aria-expanded="false" aria-controls="${key}-point-${i}">${i + 1}</button>`).join("")}</div><p class="hint">Choose a numbered point to explore.</p>${block.points.map((point, i) => `<div class="rich hotspot-panel" id="${key}-point-${i}" hidden><h3>${escape(point.title)}</h3>${point.html}</div>`).join("")}</section>`;
    case "quiz":
      return `<form class="quiz" data-answer="${block.answer}" data-feedback="${escape(block.feedback)}"><fieldset><legend>${escape(block.question)}</legend>${block.options.map((option, i) => `<label><input type="radio" name="${key}-answer" value="${i}" required> ${escape(option)}</label>`).join("")}</fieldset><button type="submit">Check answer ↗</button><p class="quiz-feedback" role="status"></p></form>`;
  }
}
function learnerInteractions() {
  document.querySelectorAll(".flip-card").forEach((button) =>
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      button.querySelector(".flip-front").hidden = open;
      button.querySelector(".flip-back").hidden = !open;
    }),
  );
  document.querySelectorAll(".tabs").forEach((group) => {
    const tabs = [...group.querySelectorAll("[role=tab]")];
    function select(tab, focus = false) {
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.getAttribute("aria-controls")).hidden =
          !active;
      });
      if (focus) tab.focus();
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (event) => {
        let next;
        if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
        if (event.key === "ArrowLeft")
          next = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          select(tabs[next], true);
        }
      });
    });
  });
  document.querySelectorAll(".hotspots").forEach((group) =>
    group.querySelectorAll(".hotspot").forEach((button) =>
      button.addEventListener("click", () => {
        const open = button.getAttribute("aria-expanded") !== "true";
        group.querySelectorAll(".hotspot").forEach((item) => {
          const active = open && item === button;
          item.setAttribute("aria-expanded", String(active));
          document.getElementById(item.getAttribute("aria-controls")).hidden =
            !active;
        });
      }),
    ),
  );
  const quizzes = [...document.querySelectorAll(".quiz")];
  const finish = document.getElementById("finish-course");
  const api = finish ? window.API_1484_11 : null;
  const started = Date.now();
  if (api) {
    api.Initialize("");
    if (api.GetValue("cmi.completion_status") === "completed") {
      finish.textContent = "Completed ✓";
      finish.disabled = true;
    } else api.SetValue("cmi.completion_status", "incomplete");
    let answers = {};
    try {
      answers = JSON.parse(api.GetValue("cmi.suspend_data") || "{}");
    } catch {
      /* Start fresh if an earlier version used another resume format. */
    }
    quizzes.forEach((form) => {
      const name = form.querySelector("input").name;
      const value = answers?.[name];
      const radio = [...form.querySelectorAll("input")].find(
        (input) => input.value === value,
      );
      if (radio) {
        radio.checked = true;
        form.dataset.correct = String(value === form.dataset.answer);
        if (form.dataset.correct === "true")
          form.querySelector(".quiz-feedback").textContent =
            form.dataset.feedback;
      }
    });
  }
  quizzes.forEach((form) =>
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const answer = form.querySelector("input:checked");
      if (!answer) return;
      const correct = answer.value === form.dataset.answer;
      form.dataset.correct = String(correct);
      form.querySelector(".quiz-feedback").textContent = correct
        ? form.dataset.feedback
        : "Not quite. Think it through and try another answer.";
      form.querySelector(".quiz-feedback").classList.toggle("correct", correct);
      if (api) {
        const answers = {};
        quizzes.forEach((item) => {
          const checked = item.querySelector("input:checked");
          if (checked) answers[checked.name] = checked.value;
        });
        api.SetValue("cmi.suspend_data", JSON.stringify(answers));
        api.SetValue(
          "cmi.session_time",
          `PT${Math.floor((Date.now() - started) / 1000)}S`,
        );
        api.Commit("");
      }
    }),
  );
  if (finish) {
    finish.addEventListener("click", () => {
      const status = document.getElementById("finish-status");
      if (quizzes.some((form) => form.dataset.correct !== "true")) {
        status.textContent =
          "Check each knowledge question before finishing. You can try again as often as you like.";
        return;
      }
      if (!api) {
        status.textContent =
          "This is a preview. Your progress will be saved when you open the course from the library.";
        return;
      }
      api.SetValue("cmi.completion_status", "completed");
      api.SetValue("cmi.success_status", "passed");
      if (quizzes.length) {
        api.SetValue("cmi.score.scaled", "1");
        api.SetValue("cmi.score.raw", "100");
        api.SetValue("cmi.score.min", "0");
        api.SetValue("cmi.score.max", "100");
      }
      api.SetValue("cmi.progress_measure", "1");
      api.SetValue(
        "cmi.session_time",
        `PT${Math.floor((Date.now() - started) / 1000)}S`,
      );
      api.Commit("");
      finish.textContent = "Completed ✓";
      finish.disabled = true;
      status.textContent = "A good step. Your completion has been saved.";
    });
  }
}
export function compileDocument(document) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(document.title)}</title><style>
  *{box-sizing:border-box}body{margin:0;background:#fffefb;color:#111110;font:17px/1.65 system-ui,sans-serif;padding:clamp(20px,5vw,64px)}main{max-width:920px;margin:auto}header{margin-bottom:48px}h1{font-size:clamp(36px,6vw,64px);line-height:1.03;letter-spacing:-2px;margin:0 0 20px}h2{font-size:clamp(26px,4vw,38px);line-height:1.15;letter-spacing:-1px}h3{font-size:23px;line-height:1.25}p{margin:0 0 18px}main>section,main>figure,main>form{margin:32px 0}img{max-width:100%;height:auto;border-radius:16px}figure{margin:0}figcaption,.hint,small{font-size:13px;color:#64645c}blockquote{margin:24px 0;padding:20px;border-left:4px solid #ffdf55;background:#ffedb1;border-radius:0 12px 12px 0}a{color:inherit;text-underline-offset:4px}button,summary,input{font:inherit}button,summary{cursor:pointer}button{color:inherit;border:1px solid #cccbbf;border-radius:12px;padding:14px 20px;background:#ffdf55;transition:background .25s ease,transform .25s ease}button:hover{background:#f1d24d}button:focus-visible,summary:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #a52e34;outline-offset:4px}.columns{display:grid;gap:28px}.columns-2{grid-template-columns:repeat(2,minmax(0,1fr))}.columns-3{grid-template-columns:repeat(3,minmax(0,1fr))}.columns>div{min-width:0}.video{display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:16px;background:#111110}.transcript{white-space:pre-wrap}.flip-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:16px}.flip-card{min-height:210px;text-align:left;padding:28px;background:#ffedb1}.flip-card[aria-expanded=true]{background:#e9e4f1}.flip-card strong{display:block;font-size:24px;line-height:1.2}.flip-card small{display:block;margin-top:22px}.flip-card span:not([hidden]),.tab-panel,.hotspot-panel,.detail-body{animation:appear .3s ease both}details{border-bottom:1px solid #cccbbf}summary{list-style:none;padding:18px 0;display:flex;justify-content:space-between;gap:20px;font-weight:650}summary::-webkit-details-marker{display:none}details[open] summary>span{transform:rotate(45deg)}.detail-body{padding-bottom:20px}.tabs [role=tablist]{display:flex;overflow:auto;gap:8px;border-bottom:1px solid #cccbbf;padding-bottom:12px}.tabs [role=tab]{white-space:nowrap;background:transparent}.tabs [aria-selected=true]{background:#ffdf55}.tab-panel{padding:24px 0}.hotspot-image{position:relative}.hotspot-image>img{display:block;width:100%}.hotspot{position:absolute;transform:translate(-50%,-50%);border:2px solid #111110;border-radius:50%;width:44px;height:44px;padding:0;font-weight:bold;box-shadow:0 2px 8px #0002}.hotspot[aria-expanded=true]{background:#111110;color:#ffdf55}.hotspot-panel{background:#ffedb1;padding:24px;border-radius:16px}.placeholder{background:#e9e4f1;border:1px dashed #bcb8c4;border-radius:16px;min-height:180px;display:grid;place-items:center;padding:24px;text-align:center}.quiz{background:#f3f2e9;border-radius:16px;padding:28px}.quiz fieldset{border:0;margin:0 0 20px;padding:0}.quiz legend{font-weight:700;font-size:23px;line-height:1.3;margin-bottom:20px}.quiz label{display:flex;align-items:center;gap:12px;padding:12px 0}.quiz input{accent-color:#a52e34;width:20px;height:20px;flex-shrink:0}.quiz-feedback{margin:18px 0 0}.correct{color:#365237}footer{border-top:1px solid #cccbbf;padding-top:28px;margin-top:48px}[hidden]{display:none!important}@keyframes appear{from{opacity:0;translate:0 5px}to{opacity:1;translate:0 0}}@media(max-width:600px){.columns{grid-template-columns:1fr}.quiz{padding:20px}.hotspot{width:36px;height:36px}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
  </style></head><body><main><header><h1>${escape(document.title)}</h1><p>${escape(document.description)}</p></header>${document.blocks.map(renderBlock).join("")}<footer>${document.format === "scorm2004" ? '<button id="finish-course">Finish course ↗</button><p id="finish-status" role="status"></p>' : "<p>Take one idea into your day. When you’re ready, choose “Mark complete” in butterlearn.</p>"}</footer></main><script>(${learnerInteractions.toString()})();</script></body></html>`;
}
