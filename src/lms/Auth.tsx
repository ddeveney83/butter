import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useViewTransitionState,
} from "react-router-dom";
import { MotionLink as Link, useReducedMotion } from "../components/Motion";
import { Arrow, ButterCharacter, Spark } from "../components/Artwork";
import { api, post } from "./api";
import type { User, Role } from "./types";
import "./LMS.css";
type Session = {
  user: User | null;
  viewRole: Role | null;
  mode: "local" | "netlify";
};
type AuthValue = Session & {
  loading: boolean;
  error: string;
  reload: () => void;
  setUser: (user: User | null) => void;
  switchView: (role: Role) => Promise<void>;
};
const Auth = createContext<AuthValue | null>(null);
export const useAuth = () => useContext(Auth)!;

export function LMSProvider() {
  const [session, setSession] = useState<Session>({
      user: null,
      viewRole: null,
      mode: "netlify",
    }),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const generation = useRef(0);
  const reload = useCallback(() => {
    const current = ++generation.current;
    setError("");
    api<Session>("session")
      .then((value) => {
        if (current !== generation.current) return;
        setSession(value);
        setLoading(false);
      })
      .catch((error) => {
        if (current !== generation.current) return;
        setError(error.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    reload();
    const focus = () => {
      if (document.visibilityState === "visible") reload();
    };
    document.addEventListener("visibilitychange", focus);
    return () => document.removeEventListener("visibilitychange", focus);
  }, [reload]);
  return (
    <Auth.Provider
      value={{
        ...session,
        viewRole: session.viewRole ?? session.user?.role ?? null,
        loading,
        error,
        reload,
        setUser: (user) => {
          generation.current++;
          setLoading(false);
          setSession((value) => ({
            ...value,
            user,
            viewRole: user?.role || null,
          }));
        },
        switchView: async (role) => {
          const value = await post<Session>("session/view", { role });
          generation.current++;
          setSession(value);
          setError("");
        },
      }}
    >
      <Outlet />
    </Auth.Provider>
  );
}
export function Logo() {
  return (
    <Link to="/butterlearn" className="lms-logo" aria-label="Butterlearn home">
      butterlearn
      <Spark />
    </Link>
  );
}
export function Notice({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={`lms-notice${error ? " is-error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
export function Loading() {
  return (
    <p className="lms-loading" role="status">
      A little moment…
    </p>
  );
}

function LMSContent() {
  const location = useLocation();
  const transitioning = useViewTransitionState(location.pathname);
  const [nativeEntry] = useState(transitioning);
  return (
    <div className={`page-enter${nativeEntry ? " native-entry" : ""}`}>
      <Outlet />
    </div>
  );
}

export function LMSLayout() {
  const auth = useAuth(),
    location = useLocation(),
    navigate = useNavigate();
  const reduced = useReducedMotion();
  const [loggingOut, setLoggingOut] = useState(false),
    [logoutError, setLogoutError] = useState(""),
    [switching, setSwitching] = useState(false),
    [viewError, setViewError] = useState("");
  async function switchView(role: Role) {
    if (
      document.querySelector('.studio-workspace[data-unsaved="true"]') &&
      !window.confirm("Switch views? Unsaved course changes will be lost.")
    )
      return;
    setSwitching(true);
    setViewError("");
    try {
      await auth.switchView(role);
      navigate(
        role === "admin"
          ? "/butterlearn/app/manage"
          : role === "manager"
            ? "/butterlearn/app/reports"
            : role === "creator"
              ? "/butterlearn/app/create"
              : "/butterlearn/app",
        {
          replace: true,
          viewTransition:
            !reduced && typeof document.startViewTransition === "function",
        },
      );
    } catch (error) {
      setViewError((error as Error).message);
    } finally {
      setSwitching(false);
    }
  }
  useEffect(() => {
    const main = document.querySelector(".lms-main");
    const focus = () => {
      const heading = main?.querySelector<HTMLElement>("h1");
      if (!heading) return false;
      heading.focus({ preventScroll: true });
      return true;
    };
    const observer = new MutationObserver(() => {
      if (focus()) observer.disconnect();
    });
    if (main && !focus())
      observer.observe(main, { childList: true, subtree: true });
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Butterlearn — Your learning.";
    return () => observer.disconnect();
  }, [location.pathname, auth.loading]);
  if (auth.loading)
    return (
      <div className="lms-auth-loading">
        <Logo />
        <Loading />
      </div>
    );
  if (auth.error)
    return (
      <div className="lms-auth-loading">
        <Logo />
        <Notice error>{auth.error}</Notice>
        <button className="lms-button" onClick={auth.reload}>
          Try again
        </button>
      </div>
    );
  if (!auth.user)
    return (
      <Navigate
        to={
          loggingOut
            ? "/butterlearn/login"
            : "/butterlearn/login?next=" + encodeURIComponent(location.pathname)
        }
        replace
      />
    );
  const user = auth.user;
  const role = auth.viewRole || user.role;
  const links = [
    ["/butterlearn/app", "My learning"],
    ["/butterlearn/app/library", "Course library"],
    ...(["admin", "creator"].includes(role)
      ? [["/butterlearn/app/create", "Create courses"]]
      : []),
    ...(role === "admin"
      ? [
          ["/butterlearn/app/manage", "Manage courses"],
          ["/butterlearn/app/people", "People"],
        ]
      : []),
    ...(["admin", "manager"].includes(role)
      ? [["/butterlearn/app/reports", "Team progress"]]
      : []),
  ];
  return (
    <div className="lms-shell">
      <a className="skip-link" href="#lms-main">
        Skip to learning
      </a>
      <aside className="lms-sidebar">
        <Logo />
        {user.role === "admin" && (
          <div className="lms-view-switch">
            <label htmlFor="lms-view-role">View as</label>
            <select
              id="lms-view-role"
              value={role}
              disabled={switching || loggingOut}
              onChange={(event) => switchView(event.target.value as Role)}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="creator">Creator</option>
              <option value="learner">Learner</option>
            </select>
            {switching && <span role="status">Switching view…</span>}
          </div>
        )}
        <nav aria-label="Learning navigation">
          {links.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              aria-current={location.pathname === to ? "page" : undefined}
            >
              {label}
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="lms-account">
          <span className="lms-avatar" aria-hidden="true">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <strong>{user.name}</strong>
            <span>
              {user.role === "admin"
                ? "Admin"
                : user.role === "manager"
                  ? "Manager"
                  : user.role === "creator"
                    ? "Content creator"
                    : "Learner"}
            </span>
          </div>
          <button
            disabled={loggingOut}
            onClick={async () => {
              if (
                document.querySelector(
                  '.studio-workspace[data-unsaved="true"]',
                ) &&
                !window.confirm(
                  "Sign out? Unsaved course changes will be lost.",
                )
              )
                return;
              setLoggingOut(true);
              setLogoutError("");
              try {
                await post("auth/logout", {});
                auth.setUser(null);
                navigate("/butterlearn/login");
              } catch (error) {
                setLogoutError((error as Error).message);
                setLoggingOut(false);
              }
            }}
          >
            {loggingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>
      <main className="lms-main" id="lms-main">
        {auth.mode === "local" && (
          <p className="lms-local-note">
            Local development. Accounts and learning data stay in this checkout;
            email verification is disabled here.
          </p>
        )}
        {logoutError && <Notice error>{logoutError}</Notice>}
        {viewError && <Notice error>{viewError}</Notice>}
        {user.role === "admin" && role !== "admin" && (
          <div className="lms-view-note" role="status">
            <p>
              <strong>
                {role === "manager"
                  ? "Manager"
                  : role === "creator"
                    ? "Content creator"
                    : "Learner"}{" "}
                view.
              </strong>{" "}
              {role === "learner"
                ? "Learning activity is saved to your account."
                : role === "creator"
                  ? "Build your own drafts. Admins publish when they’re ready."
                  : "Explore your team's learning progress."}
            </p>
            <button disabled={switching} onClick={() => switchView("admin")}>
              Return to admin <Arrow />
            </button>
          </div>
        )}
        <LMSContent key={location.pathname + ":" + role} />
      </main>
    </div>
  );
}

export function LMSLogin() {
  const auth = useAuth(),
    navigate = useNavigate(),
    location = useLocation();
  const callback = new URLSearchParams(location.hash.slice(1));
  const callbackType = callback.has("confirmation_token")
    ? "confirmation"
    : callback.has("recovery_token")
      ? "recovery"
      : callback.has("invite_token")
        ? "invite"
        : null;
  const callbackToken = callback.get(callbackType + "_token") || "";
  const exchange = useRef<{
    token: string;
    promise: Promise<{ user: User }>;
  } | null>(null);
  const [view, setView] = useState<"login" | "signup" | "recover">("login"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [message, setMessage] = useState("");
  const requested = new URLSearchParams(location.search).get("next");
  const destination = requested?.startsWith("/butterlearn/app")
    ? requested
    : "/butterlearn/app";
  useEffect(() => {
    document.title = "Butterlearn — Sign in.";
  }, []);
  useEffect(() => {
    if (callbackType !== "confirmation") return;
    let active = true;
    setBusy(true);
    (exchange.current?.token === callbackToken
      ? exchange.current.promise
      : (exchange.current = {
          token: callbackToken,
          promise: post<{ user: User }>("auth/callback", {
            type: callbackType,
            token: callbackToken,
          }),
        }).promise
    )
      .then((value) => {
        if (active) {
          auth.setUser(value.user);
          navigate(destination, { replace: true });
        }
      })
      .catch((error) => {
        if (active) {
          setError(error.message);
          setBusy(false);
        }
      });
    return () => {
      active = false;
    };
    // Token exchange must run once, including React's development effect replay.
  }, [callbackType, callbackToken]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const result = await post<{
        user?: User;
        message?: string;
        needsConfirmation?: boolean;
      }>(
        callbackType && callbackType !== "confirmation"
          ? "auth/callback"
          : "auth/" + view,
        {
          email: form.get("email"),
          password: form.get("password"),
          name: form.get("name"),
          ...(callbackType ? { type: callbackType, token: callbackToken } : {}),
        },
      );
      if (result.user) {
        auth.setUser(result.user);
        navigate(destination, { replace: true });
      } else {
        setMessage(result.message || "Check your inbox to continue.");
        setBusy(false);
      }
    } catch (error) {
      setError((error as Error).message);
      setBusy(false);
    }
  }
  if (auth.user && !callbackType) return <Navigate to={destination} replace />;
  const resetting = callbackType === "recovery" || callbackType === "invite";
  return (
    <div className="lms-auth-page">
      <header>
        <Logo />
        <Link className="lms-back" to="/butterlearn">
          Back to Butterlearn <Arrow />
        </Link>
      </header>
      <main className="lms-auth-grid">
        <div className="lms-auth-intro">
          <h1>
            A little learning.
            <br />A <span className="underlined">good next step.</span>
          </h1>
          <p>
            Your courses. Your progress.
            <br />
            One welcoming place.
          </p>
          <div className="lms-auth-character">
            <ButterCharacter />
          </div>
        </div>
        <section className="lms-auth-card" aria-labelledby="lms-login-title">
          <h2 id="lms-login-title">
            {resetting
              ? "Make yourself at home."
              : view === "signup"
                ? "Start something good."
                : view === "recover"
                  ? "A fresh start."
                  : "Good to see you."}
          </h2>
          <p>
            {resetting
              ? "Choose a new password to continue."
              : view === "signup"
                ? "Create your learner account."
                : view === "recover"
                  ? "We’ll email you a password reset link."
                  : "Sign in to your Butterlearn account."}
          </p>
          {auth.mode === "local" && (
            <Notice>
              Local development: accounts are verified immediately. The deployed
              site verifies your email.
            </Notice>
          )}
          {error && <Notice error>{error}</Notice>}
          {message && <Notice>{message}</Notice>}
          <form onSubmit={submit}>
            {!resetting && view === "signup" && (
              <label>
                Your name
                <input
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                />
              </label>
            )}
            {!resetting && (
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                />
              </label>
            )}
            {(resetting || view !== "recover") && (
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  required
                  minLength={resetting || view === "signup" ? 12 : undefined}
                  maxLength={128}
                  aria-describedby={
                    resetting || view === "signup"
                      ? "lms-password-hint"
                      : undefined
                  }
                  autoComplete={
                    resetting || view === "signup"
                      ? "new-password"
                      : "current-password"
                  }
                />
              </label>
            )}
            {(resetting || view === "signup") && (
              <span id="lms-password-hint" className="lms-small">
                At least 12 characters.
              </span>
            )}
            <button
              className="lms-button"
              disabled={busy || callbackType === "confirmation"}
              type="submit"
            >
              {busy
                ? "A little moment…"
                : resetting
                  ? "Set password"
                  : view === "signup"
                    ? "Create account"
                    : view === "recover"
                      ? "Send reset link"
                      : "Sign in"}
              <Arrow />
            </button>
          </form>
          {!callbackType && (
            <div className="lms-auth-options">
              {view === "login" ? (
                <>
                  <button
                    onClick={() => {
                      setView("signup");
                      setError("");
                      setMessage("");
                    }}
                  >
                    Create an account
                  </button>
                  <button
                    onClick={() => {
                      setView("recover");
                      setError("");
                      setMessage("");
                    }}
                  >
                    Forgot your password?
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setView("login");
                    setError("");
                    setMessage("");
                  }}
                >
                  Back to sign in
                </button>
              )}
            </div>
          )}
        </section>
      </main>
      <footer>A little different. A lot more memorable.</footer>
    </div>
  );
}
