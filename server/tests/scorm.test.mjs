import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { installScormBridge } from "../scorm-runtime.mjs";
function runtime(format, cmi = {}) {
  const messages = [];
  const parent = {
    postMessage: (message, origin) => messages.push({ message, origin }),
  };
  const window = { parent };
  runInNewContext(
    `(${installScormBridge.toString()})(${JSON.stringify({ format, cmi, token: "launch-token", parentOrigin: "https://buttertest.netlify.app" })})`,
    { window, addEventListener: () => {}, setTimeout, clearTimeout },
  );
  return { window, messages };
}
test("SCORM 1.2 implements synchronous initialize/get/set/commit/finish and resume data", () => {
  const { window, messages } = runtime("scorm12", {
    "cmi.core.student_id": "sam",
    "cmi.suspend_data": "slide-3",
    "cmi.core.lesson_status": "incomplete",
  });
  const api = window.API;
  assert.equal(api.LMSGetValue("cmi.suspend_data"), "");
  assert.equal(api.LMSGetLastError(), "301");
  assert.equal(api.LMSInitialize(""), "true");
  assert.equal(api.LMSGetValue("cmi.suspend_data"), "slide-3");
  assert.equal(api.LMSSetValue("cmi.core.student_id", "other"), "false");
  assert.equal(api.LMSGetLastError(), "403");
  assert.equal(api.LMSSetValue("cmi.core.lesson_status", "passed"), "true");
  assert.equal(api.LMSSetValue("cmi.core.score.raw", "90"), "true");
  assert.equal(api.LMSCommit(""), "true");
  assert.equal(messages.at(-1).message.cmi["cmi.core.score.raw"], "90");
  assert.equal(messages.at(-1).origin, "*");
  assert.equal(api.LMSFinish(""), "true");
  assert.equal(api.LMSCommit(""), "false");
});
test("SCORM 2004 exposes its own API, validates status and scaled scores and tracks interaction counts", () => {
  const { window, messages } = runtime("scorm2004", {
    "cmi.completion_status": "unknown",
    "cmi.success_status": "unknown",
    "cmi.suspend_data": "",
  });
  const api = window.API_1484_11;
  assert.equal(api.Initialize(""), "true");
  assert.equal(api.Initialize(""), "false");
  assert.equal(api.GetLastError(), "103");
  assert.equal(api.SetValue("cmi.score.scaled", "2"), "false");
  assert.equal(api.SetValue("cmi.score.scaled", ".85"), "true");
  assert.equal(api.SetValue("cmi.completion_status", "completed"), "true");
  assert.equal(api.SetValue("cmi.success_status", "passed"), "true");
  assert.equal(api.SetValue("cmi.interactions.0.id", "question-1"), "true");
  assert.equal(api.GetValue("cmi.interactions._count"), "1");
  assert.equal(api.Commit(""), "true");
  assert.equal(messages.at(-1).message.cmi["cmi.score.scaled"], ".85");
  assert.equal(api.Terminate(""), "true");
  assert.equal(api.GetValue("cmi.suspend_data"), "");
  assert.equal(api.GetLastError(), "123");
});
