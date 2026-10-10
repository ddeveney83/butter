import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Arrow, Spark } from "./components/Artwork";
import { projects } from "./data/projects";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

const links = [
  ["/about", "About"],
  ["/services", "Services"],
  ["/work", "Work"],
  ["/pricing", "Pricing"],
  ["/contact", "Contact"],
];
const meta: Record<string, [string, string]> = {
  "/": [
    "Learning with feeling.",
    "Butter is a creative learning studio. We turn complex things into learning experiences people feel, remember, and use.",
  ],
  "/about": [
    "A little more human.",
    "Meet Butter: a creative learning studio bringing curiosity, clarity, and humanity to digital learning.",
  ],
  "/services": [
    "Big ideas. A little Butter.",
    "Learning strategy, digital experiences, story and design, and ongoing creative support from Butter.",
  ],
  "/work": [
    "A taste of our work.",
    "Explore six Butter learning concepts, from onboarding and leadership to wellbeing and sustainability.",
  ],
  "/pricing": [
    "Find your starting point.",
    "Explore indicative project budgets and build a ballpark learning project estimate with Butter.",
  ],
  "/contact": [
    "Good things start with hello.",
    "Tell Butter about your learning challenge and start a creative conversation.",
  ],
};

function Site() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const firstRender = useRef(true);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenuOpen(false);
    const project = projects.find(
      (item) => location.pathname === `/work/${item.id}`,
    );
    const [title, description] =
      meta[location.pathname] ||
      (project
        ? [project.title, project.description]
        : ["A little lost?", "Let’s get you back to Butter."]);
    document.title = `Butter — ${title}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() =>
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);
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
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header container">
        <Link className="wordmark" to="/" aria-label="Butter home">
          butter
          <span className="brand-dot" aria-hidden="true">
            <Spark />
          </span>
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
        >
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={to === "/contact" ? "nav-contact" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              {to === "/contact" && <Arrow diagonal />}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main" key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <Link className="wordmark" to="/" aria-label="Butter home">
              butter
              <span className="brand-dot" aria-hidden="true">
                <Spark />
              </span>
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
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
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
          </nav>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Butter. Made with feeling.
            </span>
            <span>Good learning. No added nonsense.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
