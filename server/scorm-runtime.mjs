// This function is also injected into the isolated course document. Keep it self-contained.
export function installScormBridge(config) {
  const initial = { ...config.cmi };
  let data = { ...initial },
    initialized = false,
    terminated = false,
    error = "0",
    timer;
  const is2004 = config.format === "scorm2004";
  const errors = {
    0: "No error",
    101: "General exception",
    103: "Already initialized",
    104: "Content instance terminated",
    112: "Termination before initialization",
    113: "Termination after termination",
    122: "Retrieve data before initialization",
    123: "Retrieve data after termination",
    132: "Store data before initialization",
    133: "Store data after termination",
    142: "Commit before initialization",
    143: "Commit after termination",
    201: "Invalid argument",
    301: "Not initialized",
    401: "Not implemented",
    402: "Invalid set value",
    403: "Read only",
    404: "Write only",
    405: "Incorrect data type",
  };
  if (is2004)
    Object.assign(errors, {
      401: "Undefined data model element",
      402: "Unimplemented data model element",
      403: "Value not initialized",
      404: "Read only",
      405: "Write only",
      406: "Incorrect data type",
    });
  const readOnly = new Set([
    "cmi.core.student_id",
    "cmi.core.student_name",
    "cmi.core.entry",
    "cmi.core.total_time",
    "cmi.core.lesson_mode",
    "cmi.learner_id",
    "cmi.learner_name",
    "cmi.entry",
    "cmi.total_time",
    "cmi.mode",
    "cmi.credit",
    "cmi.core.credit",
  ]);
  function fail(code) {
    error = code;
    return "false";
  }
  function guard(type) {
    if (terminated)
      return fail(
        is2004 ? { get: "123", set: "133", commit: "143" }[type] : "301",
      );
    if (!initialized)
      return fail(
        is2004 ? { get: "122", set: "132", commit: "142" }[type] : "301",
      );
    return null;
  }
  function persist(kind) {
    clearTimeout(timer);
    window.parent.postMessage(
      {
        type: "butterlearn-scorm",
        launch: config.token,
        kind,
        cmi: { ...data },
      },
      // Sandboxed wrappers have opaque origins. Messages go only to the direct
      // parent; both wrapper and LMS receivers verify source and launch token.
      "*",
    );
  }
  const api = {
    Initialize(argument) {
      if (argument !== "") return fail("201");
      if (terminated) return fail(is2004 ? "104" : "101");
      if (initialized) return fail(is2004 ? "103" : "101");
      initialized = true;
      error = "0";
      persist("initialize");
      return "true";
    },
    Terminate(argument) {
      if (argument !== "") return fail("201");
      if (terminated) return fail(is2004 ? "113" : "301");
      if (!initialized) return fail(is2004 ? "112" : "301");
      persist("terminate");
      terminated = true;
      error = "0";
      return "true";
    },
    GetValue(key) {
      if (guard("get")) return "";
      if (typeof key !== "string") {
        error = "201";
        return "";
      }
      if (key.endsWith("._children")) {
        error = "0";
        return key === "cmi.core._children"
          ? "student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time"
          : key.includes("score")
            ? "raw,min,max,scaled"
            : key === "cmi._children"
              ? "learner_id,learner_name,location,credit,completion_status,success_status,entry,score,total_time,mode,exit,session_time,suspend_data,interactions,objectives,progress_measure"
              : "";
      }
      if (key.endsWith("._count")) {
        const prefix = key.slice(0, -7);
        const indices = Object.keys(data)
          .filter((name) => name.startsWith(prefix + "."))
          .map((name) => Number(name.slice(prefix.length + 1).split(".")[0]))
          .filter(Number.isFinite);
        error = "0";
        return String(indices.length ? Math.max(...indices) + 1 : 0);
      }
      if (
        key === "cmi.core.exit" ||
        key === "cmi.exit" ||
        key.endsWith("session_time")
      ) {
        error = is2004 ? "405" : "404";
        return "";
      }
      if (!(key in data)) {
        error = "401";
        return "";
      }
      error = "0";
      return data[key];
    },
    SetValue(key, value) {
      const invalid = guard("set");
      if (invalid) return invalid;
      if (
        typeof key !== "string" ||
        !/^(cmi\.|adl\.nav\.request)/.test(key) ||
        key.length > 240 ||
        key.endsWith("._children") ||
        key.endsWith("._count")
      )
        return fail("401");
      if (readOnly.has(key)) return fail(is2004 ? "404" : "403");
      const text = String(value);
      if (
        text.length >
        (key === "cmi.suspend_data" ? (is2004 ? 64000 : 4096) : 16000)
      )
        return fail(is2004 ? "406" : "405");
      if (
        key === "cmi.core.lesson_status" &&
        ![
          "passed",
          "completed",
          "failed",
          "incomplete",
          "browsed",
          "not attempted",
        ].includes(text)
      )
        return fail(is2004 ? "406" : "405");
      if (
        key === "cmi.completion_status" &&
        !["completed", "incomplete", "not attempted", "unknown"].includes(text)
      )
        return fail(is2004 ? "406" : "405");
      if (
        key === "cmi.success_status" &&
        !["passed", "failed", "unknown"].includes(text)
      )
        return fail(is2004 ? "406" : "405");
      if (
        key === "cmi.score.scaled" &&
        (!Number.isFinite(Number(text)) ||
          Number(text) < -1 ||
          Number(text) > 1)
      )
        return fail(is2004 ? "406" : "405");
      if (
        key === "adl.nav.request" &&
        ![
          "_none_",
          "continue",
          "previous",
          "exit",
          "exitAll",
          "abandon",
          "abandonAll",
          "suspendAll",
        ].includes(text)
      )
        return fail("401");
      data[key] = text;
      error = "0";
      persist("update");
      return "true";
    },
    Commit(argument) {
      if (argument !== "") return fail("201");
      const invalid = guard("commit");
      if (invalid) return invalid;
      persist("commit");
      error = "0";
      return "true";
    },
    GetLastError() {
      return error;
    },
    GetErrorString(code) {
      return errors[code] || "Unknown error";
    },
    GetDiagnostic(code) {
      return errors[code || error] || "Unknown error";
    },
  };
  window.API = {
    LMSInitialize: api.Initialize,
    LMSFinish: api.Terminate,
    LMSGetValue: api.GetValue,
    LMSSetValue: api.SetValue,
    LMSCommit: api.Commit,
    LMSGetLastError: api.GetLastError,
    LMSGetErrorString: api.GetErrorString,
    LMSGetDiagnostic: api.GetDiagnostic,
  };
  window.API_1484_11 = api;
  // Some authoring tools wrap a learning object in another course iframe.
  // Relay its tracking through this frame; the LMS still verifies its direct frame.
  addEventListener("message", (event) => {
    if (
      event.data?.type !== "butterlearn-scorm" ||
      event.data.launch !== config.token
    )
      return;
    if (
      !Array.from(document.querySelectorAll("iframe,frame")).some(
        (frame) => frame.contentWindow === event.source,
      )
    )
      return;
    window.parent.postMessage(event.data, "*");
  });
  addEventListener("pagehide", () => {
    if (initialized) persist("leave");
  });
  persist("ready");
}

export function bridgeScript(config) {
  return `<script>(${installScormBridge.toString()})(${JSON.stringify(config).replaceAll("<", "\\u003c")});</script>`;
}
