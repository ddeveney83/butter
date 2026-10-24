import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
  useViewTransitionState,
} from "react-router-dom";
import {
  MotionLink as Link,
  MotionNavLink as NavLink,
  useMediaQuery,
  useReducedMotion,
  MotionSettings,
  initializeMotion,
} from "./components/Motion";
import { Arrow } from "./components/Artwork";
import { projects } from "./data/projects";
import ButterCursor from "./components/ButterCursor";
import BrandLogo from "./components/BrandLogo";
import { marketingPage, onMarketingClick } from "./lib/marketing";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import OfferPage from "./pages/Offer";
import Devon from "./pages/Devon";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import Brand from "./pages/Brand";
import Butterlearn from "./pages/Butterlearn";
import Journal, { JournalArticle } from "./pages/Journal";
import Labs, { LabExperiment } from "./pages/Labs";
import { getPageMeta, structuredData } from "./data/seo";
import { LMSProvider, LMSLayout, LMSLogin, Loading } from "./lms/Auth";
import {
  Dashboard,
  Library,
  ManageCourses,
  People,
  Reports,
} from "./lms/Pages";
import { CoursePlayer } from "./lms/Player";
const CourseStudio = lazy(() => import("./lms/Authoring"));

const links = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/work", "Work"],
  ["/butterlearn", "butterlearn"],
  ["/journal", "Journal"],
  ["/labs", "Labs"],
  ["/contact", "Contact"],
];

function PageContent() {
  const location = useLocation();
  const transitioning = useViewTransitionState(location.pathname);
  // Remember how this page entered, so the fallback cannot replay after a crossfade.
  const [nativeEntry] = useState(transitioning);
  return (
    <main
      id="main"
      className={`page-enter${nativeEntry ? " native-entry" : ""}`}
    >
      <Outlet />
    </main>
  );
}

function Site() {
  const location = useLocation();
  const transitioning = useViewTransitionState(location.pathname);
  const reduced = useReducedMotion();
  const compactNavigation = useMediaQuery("(max-width: 1120px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const firstRender = useRef(true);
  const focusPending = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenuOpen(false);
    marketingPage(location.pathname);
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const [title, description] = getPageMeta(path);
    document.title = `butter — ${title}`;
    const siteURL = (
      import.meta.env.VITE_SITE_URL || "https://buttertest.netlify.app"
    ).replace(/\/$/, "");
    function tag(attribute: "name" | "property", key: string, value: string) {
      let element = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = value;
    }
    tag("name", "description", description);
    tag("property", "og:title", `butter — ${title}`);
    tag("property", "og:description", description);
    tag(
      "property",
      "og:type",
      path.startsWith("/journal/") ? "article" : "website",
    );
    tag("property", "og:url", siteURL + path);
    tag("property", "og:image", siteURL + "/brand/butter-social.png");
    tag("property", "og:site_name", "butter");
    tag("name", "twitter:card", "summary_large_image");
    tag(
      "name",
      "robots",
      path === "/brand" || title === "A little lost?"
        ? "noindex,follow"
        : "index,follow",
    );
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = siteURL + path;
    let schema = document.getElementById("page-structured-data");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "page-structured-data";
      schema.setAttribute("type", "application/ld+json");
      document.head.append(schema);
    }
    schema.textContent = JSON.stringify(structuredData(path, siteURL));
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    focusPending.current = true;
  }, [location.pathname]);
  useEffect(() => {
    if (transitioning || !focusPending.current) return;
    let nextFrame = 0;
    // Let the crossfade and browser history restore settle before moving focus.
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => {
        document
          .querySelector<HTMLElement>("main h1")
          ?.focus({ preventScroll: true });
        focusPending.current = false;
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [location.pathname, transitioning]);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  useEffect(() => {
    document.querySelector("main h1")?.setAttribute("tabindex", "-1");
  }, [location.pathname]);
  useEffect(() => {
    document.addEventListener("click", onMarketingClick, true);
    return () => document.removeEventListener("click", onMarketingClick, true);
  }, []);
  return (
    <>
      <ButterCursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header container">
        <Link className="wordmark" to="/" aria-label="butter home">
          <BrandLogo />
        </Link>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          className={`nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
          inert={compactNavigation && !menuOpen}
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={to === "/contact" ? "nav-contact" : undefined}
              data-conversion={to === "/contact" ? "enquiry_click" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {to === "/contact" && <Arrow diagonal />}
            </NavLink>
          ))}
        </nav>
      </header>
      <PageContent key={location.pathname} />
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Link className="wordmark" to="/" aria-label="butter home">
              <BrandLogo />
            </Link>
            <p>
              A little different.
              <br />A lot more memorable.
            </p>
            <button
              className="back-top"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: reduced ? "instant" : "smooth",
                });
                document
                  .querySelector<HTMLElement>("header a")
                  ?.focus({ preventScroll: true });
              }}
            >
              Back to top <span aria-hidden="true">↑</span>
            </button>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {links.map(([to, label]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
            <Link to="/elearning-devon">For Devon businesses</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/brand">Brand guide</Link>
          </nav>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} butter. Made with feeling.
            </span>
            <span>Good learning. No added nonsense.</span>
            <MotionSettings />
          </div>
        </div>
      </footer>
    </>
  );
}

// Resolve the motion setting before the router reads the URL or content paints.
initializeMotion();

// Identity email links arrive at the site root with a URL fragment.
if (
  /(?:^#|&)(confirmation_token|recovery_token|invite_token)=/.test(
    location.hash,
  )
) {
  history.replaceState(history.state, "", "/butterlearn/login" + location.hash);
}

const router = createBrowserRouter([
  {
    element: <LMSProvider />,
    children: [
      { path: "/butterlearn/login", element: <LMSLogin /> },
      {
        path: "/butterlearn/app",
        element: <LMSLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "library", element: <Library /> },
          { path: "courses/:courseId", element: <CoursePlayer /> },
          { path: "manage", element: <ManageCourses /> },
          {
            path: "create",
            element: (
              <Suspense fallback={<Loading />}>
                <CourseStudio />
              </Suspense>
            ),
          },
          {
            path: "create/:courseId",
            element: (
              <Suspense fallback={<Loading />}>
                <CourseStudio />
              </Suspense>
            ),
          },
          { path: "people", element: <People /> },
          { path: "reports", element: <Reports /> },
        ],
      },
    ],
  },
  {
    element: <Site />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:slug", element: <OfferPage /> },
      { path: "/elearning-devon", element: <Devon /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/work", element: <Work /> },
      { path: "/work/:slug", element: <Project /> },
      { path: "/butterlearn", element: <Butterlearn /> },

      { path: "/pricing", element: <Navigate to="/contact" replace /> },
      {
        path: "/journal/what-does-elearning-cost",
        element: (
          <Navigate to="/journal/how-to-brief-elearning-project" replace />
        ),
      },
      { path: "/contact", element: <Contact /> },
      { path: "/journal", element: <Journal /> },
      { path: "/journal/:slug", element: <JournalArticle /> },
      { path: "/labs", element: <Labs /> },
      { path: "/labs/:slug", element: <LabExperiment /> },
      { path: "/brand", element: <Brand /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
