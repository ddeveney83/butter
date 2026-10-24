import { publicPaths } from "../data/publicPaths";
type EventName =
  | "page_view"
  | "enquiry_click"
  | "form_start"
  | "calculator_start"
  | "calculator_enquiry"
  | "enquiry_success"
  | "enquiry_error";
const allowed = new Set(publicPaths);
let current = "";
let previous = "";
let entry = "";
const safePath = (path: string) => {
  if (!path) return "";
  const value = path.replace(/\/+$/, "") || "/";
  return allowed.has(value) ? value : "";
};
const measurementAllowed = () =>
  navigator.doNotTrack !== "1" &&
  !(navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl;
export function trackMarketing(event: EventName, source = "") {
  const path = safePath(location.pathname);
  if (!path || !measurementAllowed()) return;
  // Fixed event names and allowlisted paths only: no query strings, form content or identifiers.
  void fetch("/api/marketing/events", {
    method: "POST",
    credentials: "omit",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, path, source: safePath(source) }),
  }).catch(() => {});
}
export function marketingPage(path: string) {
  const safe = safePath(path);
  if (!safe || safe === current) return;
  previous = current;
  current = safe;
  if (!entry) entry = safe;
  trackMarketing("page_view");
}
export function enquiryContext() {
  let source = "direct";
  let referrerPath = "";
  try {
    if (document.referrer) {
      const referrer = new URL(document.referrer);
      const host = referrer.hostname;
      if (referrer.origin === location.origin) {
        source = "internal";
        referrerPath = safePath(referrer.pathname);
      } else if (/(^|\.)(google\.[a-z.]+|bing.com|duckduckgo.com)$/.test(host))
        source = "search";
      else if (
        /(^|\.)(linkedin.com|facebook.com|instagram.com|t.co)$/.test(host)
      )
        source = "social";
      else source = "referral";
    }
  } catch {
    /* No raw referrer is retained. */
  }
  return {
    entry_page: entry || safePath(location.pathname),
    enquiry_origin: previous || referrerPath || entry || "/contact",
    source_kind: source,
  };
}
export function onMarketingClick(event: MouseEvent) {
  const target =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>("a[href]")
      : null;
  if (!target || event.button !== 0) return;
  const destination = new URL(target.href, location.href);
  const name =
    target.dataset.conversion ||
    (destination.origin === location.origin &&
    destination.pathname === "/contact"
      ? "enquiry_click"
      : "");
  if (name === "enquiry_click" || name === "calculator_enquiry")
    trackMarketing(name);
}
