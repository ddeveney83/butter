import { useCallback, useSyncExternalStore } from "react";
import {
  Link,
  NavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";

export type MotionPreference = "system" | "full" | "reduced";
const storageKey = "butter-motion";
const changeEvent = "butter-motion-change";
let preference: MotionPreference = "system";

function validPreference(value: string | null): value is MotionPreference {
  return value === "system" || value === "full" || value === "reduced";
}

function applyPreference() {
  const reduced =
    preference === "reduced" ||
    (preference === "system" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  window.dispatchEvent(new Event(changeEvent));
}

export function setMotionPreference(value: MotionPreference) {
  preference = value;
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // The setting still works for this visit when storage is unavailable.
  }
  applyPreference();
}

export function initializeMotion() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch {
    // Follow the device preference when browser storage is blocked.
  }
  const requested = new URLSearchParams(location.search).get("motion");
  preference = validPreference(saved) ? saved : "system";
  if (validPreference(requested)) setMotionPreference(requested);
  else applyPreference();
  if (validPreference(requested)) {
    const url = new URL(location.href);
    url.searchParams.delete("motion");
    history.replaceState(
      history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }
  window
    .matchMedia("(prefers-reduced-motion: reduce)")
    .addEventListener("change", applyPreference);
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = validPreference(event.newValue) ? event.newValue : "system";
    applyPreference();
  });
}

function subscribePreference(callback: () => void) {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
}

export function useMotionPreference() {
  return useSyncExternalStore(
    subscribePreference,
    () => preference,
    () => "system" as MotionPreference,
  );
}

export function MotionSettings() {
  const selected = useMotionPreference();
  const deviceReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <label className="motion-setting">
      Motion
      <select
        aria-label="Motion preference"
        value={selected}
        onChange={(event) =>
          setMotionPreference(event.target.value as MotionPreference)
        }
      >
        <option value="system">
          Device setting ({deviceReduced ? "reduced" : "on"})
        </option>
        <option value="full">Full motion</option>
        <option value="reduced">Reduced motion</option>
      </select>
    </label>
  );
}

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    [query],
  );
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => true);
}

export function useReducedMotion() {
  const selected = useMotionPreference();
  const deviceReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return selected === "system" ? deviceReduced : selected === "reduced";
}

export function MotionLink(props: LinkProps) {
  const reduced = useReducedMotion();
  return (
    <Link
      {...props}
      viewTransition={
        !reduced && typeof document.startViewTransition === "function"
      }
    />
  );
}

export function MotionNavLink(props: NavLinkProps) {
  const reduced = useReducedMotion();
  return (
    <NavLink
      {...props}
      viewTransition={
        !reduced && typeof document.startViewTransition === "function"
      }
    />
  );
}
