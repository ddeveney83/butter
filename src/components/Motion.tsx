import { useCallback, useSyncExternalStore } from "react";
import {
  Link,
  NavLink,
  type LinkProps,
  type NavLinkProps,
} from "react-router-dom";

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
  return useMediaQuery("(prefers-reduced-motion: reduce)");
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
