import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "./Motion";
import ButterTrail from "./ButterTrail";

function describeTarget(target: Element | null): string {
  if (!target) return "";
  let control = target.closest<HTMLElement>(
    "a[href], button, input, select, textarea, [role='button'], [contenteditable='true']",
  );
  if (!control) control = target.closest("label")?.control ?? null;
  if (
    !control ||
    control.closest("[inert]") ||
    control.matches(":disabled, [aria-disabled='true']")
  )
    return "";
  if (
    control instanceof HTMLSelectElement ||
    control instanceof HTMLTextAreaElement ||
    control.isContentEditable
  )
    return "";
  if (control instanceof HTMLInputElement) {
    if (control.type === "range") return "Adjust";
    if (["checkbox", "radio"].includes(control.type))
      return control.checked ? "Selected" : "Select";
    if (!["button", "submit", "reset"].includes(control.type)) return "";
  }
  const custom = control.dataset.cursorLabel;
  if (custom !== undefined) return custom;
  if (control.hasAttribute("aria-expanded"))
    return control.getAttribute("aria-expanded") === "true" ? "Close" : "Open";
  if (control.getAttribute("role") === "tab")
    return control.getAttribute("aria-selected") === "true"
      ? "Current tab"
      : "View tab";
  if (control.closest(".filter-list"))
    return control.getAttribute("aria-pressed") === "true"
      ? "Showing"
      : control.closest(".editorial-list")
        ? "Filter articles"
        : control.closest(".lab-playground")
          ? "Change view"
          : "Filter work";
  if (control.closest(".interest-chips, .segmented-control"))
    return control.getAttribute("aria-pressed") === "true"
      ? "Selected"
      : "Choose";
  if (control.closest(".scenario-choices, .lab-choices"))
    return control.getAttribute("aria-pressed") === "true"
      ? "Selected"
      : "Try this";
  if (control.matches(".back-top")) return "Back to top";
  if (control.closest(".feedback-reset")) return "Try again";
  if (control.matches(".contact-actions .reset-link"))
    return control.textContent?.includes("Copied") ? "Copied" : "Copy brief";
  if (control instanceof HTMLButtonElement && control.type === "submit")
    return control.closest(".contact-actions") ? "Send enquiry" : "Submit";
  if (control instanceof HTMLAnchorElement) {
    if (control.matches(".project")) return "Explore";
    if (control.matches(".editorial-card"))
      return control.pathname.startsWith("/journal/")
        ? "Read article"
        : "Try experiment";
    if (control.matches(".wordmark")) return "Home";
    if (control.closest(".next-project")) return "Next project";
    if (control.protocol === "mailto:")
      return control.closest(".contact-actions") ? "Open draft" : "Email us";
    if (control.hash && control.pathname === location.pathname) return "Scroll";
    if (control.closest("nav"))
      return control.textContent?.trim() || "View page";
    if (control.pathname === "/contact") return "Let’s talk";
    if (control.pathname === "/work")
      return control.closest(".project-hero") ? "Back to work" : "View work";
    if (control.pathname === "/services") return "View services";
  }
  return "Open";
}

export default function ButterCursor() {
  const enabled = useMediaQuery("(any-hover: hover) and (any-pointer: fine)");
  const hint = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled || !hint.current) return;
    const node = hint.current;
    const root = document.documentElement;
    root.classList.add("butter-cursor-enabled");
    let point = { x: 0, y: 0 };
    let size = { width: 0, height: 0 };
    let active = false;
    let dragging = false;
    let current = "";
    let frame = 0;

    function hide() {
      node.dataset.visible = "false";
      if (current) {
        current = "";
        setLabel("");
      }
    }
    function position() {
      const gap = 18;
      const edge = 8;
      let x = point.x + gap;
      let y = point.y + gap;
      if (x + size.width > innerWidth - edge) x = point.x - size.width - gap;
      if (y + size.height > innerHeight - edge) y = point.y - size.height - gap;
      x = Math.max(edge, Math.min(x, innerWidth - size.width - edge));
      y = Math.max(edge, Math.min(y, innerHeight - size.height - edge));
      node.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    }
    function refresh() {
      frame = 0;
      position();
      if (!active || dragging) {
        hide();
        return;
      }
      const next = describeTarget(document.elementFromPoint(point.x, point.y));
      if (next !== current) {
        current = next;
        setLabel(next);
      }
      node.dataset.visible = next ? "true" : "false";
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(refresh);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        active = false;
        hide();
        return;
      }
      point = { x: event.clientX, y: event.clientY };
      active = true;
      schedule();
    }
    function down() {
      dragging = true;
      hide();
    }
    function up() {
      dragging = false;
      schedule();
    }
    function leave(event: PointerEvent) {
      if (!event.relatedTarget) {
        active = false;
        hide();
      }
    }
    function pause() {
      active = false;
      dragging = false;
      hide();
    }
    function keyboard(event: KeyboardEvent) {
      if (event.key === "Tab" || event.key === "Escape") pause();
    }

    const resize = new ResizeObserver(() => {
      size = { width: node.offsetWidth, height: node.offsetHeight };
      position();
    });
    resize.observe(node);
    // Keep the hint accurate after a click even when the pointer stays still.
    const changes = new MutationObserver(schedule);
    changes.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "aria-expanded",
        "aria-selected",
        "aria-pressed",
        "disabled",
        "aria-disabled",
        "data-cursor-label",
      ],
    });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointercancel", pause, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("keydown", keyboard);
    document.addEventListener("visibilitychange", pause);
    window.addEventListener("blur", pause);
    window.addEventListener("scroll", schedule, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      root.classList.remove("butter-cursor-enabled");
      cancelAnimationFrame(frame);
      resize.disconnect();
      changes.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", pause);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("visibilitychange", pause);
      window.removeEventListener("blur", pause);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <ButterTrail />
      <div
        ref={hint}
        className="butter-cursor-hint"
        data-visible="false"
        aria-hidden="true"
      >
        <span>{label}</span>
      </div>
    </>
  );
}
