import { useEffect, useRef, useState, type FormEvent } from "react";

function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ButterCharacter({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 460"
      fill="none"
      role="img"
      aria-label="A smiling butter character with cartoon gloves and dancing feet"
    >
      <g
        stroke="#20201d"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M183 311c-10 35-13 47-35 68m139-69c5 20 17 31 28 44" />
        <path
          d="M143 369c-20-7-34 1-45 19-13 22-3 36 21 33l48-10c12-3 14-14 7-24-6-10-16-16-31-18Z"
          fill="#20201d"
        />
        <path
          d="M306 350c16-7 30 0 34 13l7 13c25 0 35 9 31 20-4 15-55 14-73 4-16-9-13-37 1-50Z"
          fill="#20201d"
        />
        <path d="M110 217c-26 5-39 20-39 41m277-65c26-12 31-26 36-48" />
        <path d="m135 114 71-45 144 54 2 166-69 49-145-53Z" fill="#fff2a5" />
        <path d="m135 114 144 51 71-42-144-54Z" fill="#fff8ce" />
        <path d="m279 165 71-42 2 166-69 49Z" fill="#eac850" />
        <path d="m135 114 144 51 4 173-145-53Z" fill="#f8df65" />
        <path d="m154 106 136 47" strokeWidth="3" />
        <ellipse
          cx="183"
          cy="202"
          rx="13"
          ry="24"
          fill="#20201d"
          transform="rotate(-7 183 202)"
        />
        <ellipse
          cx="231"
          cy="217"
          rx="13"
          ry="24"
          fill="#20201d"
          transform="rotate(-7 231 217)"
        />
        <path
          d="m178 246 60 16c-6 24-24 29-40 20-12-7-18-20-20-36Z"
          fill="#20201d"
        />
        <path d="M196 276c9-11 21-10 31-5" stroke="#fff8ce" strokeWidth="5" />
        <path d="M163 231c-8-1-11 1-14 4m99 23c8 1 11 5 12 9" strokeWidth="3" />
        <path
          d="M62 246c-13-9-22-4-20 8l5 13c-19-15-28-8-20 6l9 12c-19-6-21 5-7 15l12 8c-7 6-4 16 12 18 18 2 36-10 39-24 4-17-13-28-14-40-1-17-15-21-16-16Z"
          fill="#fffcf2"
        />
        <path d="m47 277 15 9m-22 9 16 4m13-35 3 17" strokeWidth="3" />
        <path
          d="M367 137c-7-20-3-33 7-32 6 0 8 9 9 15 4-30 10-40 18-36 7 4 1 24 0 34 13-19 25-25 29-15 3 7-9 22-14 28 22-9 33-5 29 4-4 8-21 13-25 15 9 10 1 23-15 24-17 1-29-18-38-37Z"
          fill="#fffcf2"
        />
        <path d="m393 136 9-7m-3 19 15-7" strokeWidth="3" />
        <path d="m68 373-15 4m318-62 17 6M85 126l-12-12" strokeWidth="4" />
      </g>
      <ellipse cx="180" cy="194" rx="4" ry="7" fill="#fff8ce" />
      <ellipse cx="228" cy="209" rx="4" ry="7" fill="#fff8ce" />
    </svg>
  );
}

const projects = [
  {
    id: "onboarding",
    title: "A fresh start.",
    category: "Onboarding · Digital learning",
    theme: "yellow",
    intro: "First days should feel like possibility.",
    description:
      "A concept for an onboarding experience that replaces the information avalanche with a welcoming, bite-sized journey. A clear path, useful conversations, and little wins make room for confidence.",
    deliverables: [
      "Learning strategy",
      "Experience design",
      "Interactive eLearning",
    ],
    outcome:
      "The idea: help new starters feel at home before they need to know everything.",
  },
  {
    id: "leadership",
    title: "People, not processes.",
    category: "Leadership · Interactive storytelling",
    theme: "lilac",
    intro: "Good leadership starts with being human.",
    description:
      "A concept for a scenario-led learning experience about the moments that matter. Learners explore real-world conversations, try a response, and see the story unfold — with room to reflect and try again.",
    deliverables: [
      "Creative direction",
      "Branching scenarios",
      "Motion & illustration",
    ],
    outcome:
      "The idea: turn abstract leadership principles into everyday actions.",
  },
];

function ProjectArt({ kind }: { kind: string }) {
  if (kind === "yellow")
    return (
      <div className="project-art art-onboarding" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="learning-window">
          <div className="window-top">
            <span className="mini-brand">hello.</span>
            <span className="window-dots">•••</span>
          </div>
          <div className="window-content">
            <span className="lesson-pill">Your first day, your way.</span>
            <strong>
              Big things.
              <br />
              Small beginnings.
            </strong>
            <div className="window-bottom">
              <span className="lesson-progress">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="mini-next">
                <Arrow />
              </span>
            </div>
          </div>
        </div>
        <div className="sticker star-sticker">
          <Spark />
          <span>let’s go!</span>
        </div>
      </div>
    );
  return (
    <div className="project-art art-leadership" aria-hidden="true">
      <div className="leadership-window">
        <div className="leadership-top">
          <span>the human side</span>
          <span>01 / 05</span>
        </div>
        <div className="smile-flower">
          <svg viewBox="0 0 200 200">
            <path
              d="M100 25C119-7 143 3 142 36c35-15 53 8 29 33 37 11 36 39 0 50 25 28 7 49-28 35 2 39-25 48-43 16-20 32-44 23-42-15-35 14-53-10-29-36-36-11-38-40 0-50C5 43 23 21 58 36 57 1 82-6 100 25Z"
              fill="#f8e477"
              stroke="#f8e477"
              strokeWidth="7"
            />
            <ellipse cx="79" cy="83" rx="8" ry="15" fill="#20201d" />
            <ellipse cx="122" cy="83" rx="8" ry="15" fill="#20201d" />
            <path
              d="M69 115q32 36 64 0"
              fill="none"
              stroke="#20201d"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <strong>
          A little empathy.
          <br />A big difference.
        </strong>
        <div className="choice-row">
          <span>Let’s talk about it</span>
          <Arrow />
        </div>
      </div>
      <Spark className="art-spark" />
    </div>
  );
}

function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    element.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      element.close();
      previouslyFocused?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal"
      aria-label={title}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button, a[href], input, textarea, select, [tabindex="0"]',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}

function ContactForm() {
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = `Hi Butter,\n\n${form.get("brief")}\n\nFrom ${form.get("name")}\n${form.get("email")}`;
    const recipient = import.meta.env.VITE_CONTACT_EMAIL || "ddeveney83@gmail.com";
    setEmailDraft(
      `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent("A little Butter for our next project")}&body=${encodeURIComponent(body)}`,
    );
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => setEmailDraft(null)}
    >
      <h2>
        What’s on
        <br />
        your mind?
      </h2>
      <p>A big idea, a tricky challenge, or just a hello. We’re all ears.</p>
      <label>
        Your name
        <input
          name="name"
          autoComplete="name"
          placeholder="Sam Smith"
          required
          maxLength={100}
        />
      </label>
      <label>
        Your email
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="sam@company.com"
          required
          maxLength={200}
        />
      </label>
      <label>
        A little about your project
        <textarea
          name="brief"
          placeholder="We’d love to make…"
          required
          maxLength={3000}
          rows={3}
        />
      </label>
      {emailDraft ? (
        <a className="pill-button" href={emailDraft}>
          Open email draft <Arrow diagonal />
        </a>
      ) : (
        <button className="pill-button" type="submit">
          Create an email draft <Arrow diagonal />
        </button>
      )}
      <p className="form-note" role="status">
        {emailDraft
          ? "Your draft is ready. Open your email app to review and send. Nothing has been sent yet."
          : "Opens in your email app, ready for you to send."}
      </p>
    </form>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const project = selected === null ? null : projects[selected];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header container">
        <a className="wordmark" href="#" aria-label="Butter home">
          butter
          <span className="brand-dot" aria-hidden="true">
            ✳
          </span>
        </a>
        <button
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
          className={menuOpen ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Our work
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About us
          </a>
          <button
            className="nav-contact"
            onClick={() => {
              setMenuOpen(false);
              setContactOpen(true);
            }}
          >
            Let’s talk <Arrow diagonal />
          </button>
        </nav>
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <h1>
              Learning
              <br />
              with{" "}
              <span className="feeling">
                feeling
                <svg
                  viewBox="0 0 380 18"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12Q165-2 374 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p>
              We make learning that moves people.
              <br className="desktop-break" /> A little curiosity. A lot of
              creativity.
              <br className="desktop-break" /> And just the right amount of
              Butter.
            </p>
            <a className="pill-button" href="#work">
              Explore our work <Arrow diagonal />
            </a>
          </div>
          <div className="hero-art">
            <div className="butter-circle" />
            <Spark className="hero-spark" />
            <ButterCharacter className="hero-character" />
            <span className="handwritten">
              good things
              <br />
              are spreading.
            </span>
            <svg
              className="hero-squiggle"
              viewBox="0 0 85 60"
              aria-hidden="true"
            >
              <path
                d="M4 4C74 0 82 24 41 33c-29 6-28-8-5-12 24-4 35 10 23 34m0 0-1-13m1 13 11-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <a className="scroll-note" href="#work">
            Scroll for the good stuff <span>↓</span>
          </a>
          <span className="hero-footer-note">
            Independent minds. Shared curiosity.
          </span>
        </section>
        <div
          className="ticker"
          aria-label="Thoughtfully made. Joyfully learned."
        >
          <div>
            <span>Thoughtfully made.</span>
            <Spark />
            <span>Joyfully learned.</span>
            <Spark />
            <span>Seriously good learning.</span>
            <Spark />
            <span>Thoughtfully made.</span>
            <Spark />
          </div>
        </div>
        <section id="work" className="work section container">
          <div className="section-intro">
            <h2>
              Proof is in
              <br />
              the <span className="underlined">pudding.</span>
            </h2>
            <p>
              Fresh perspectives. Memorable experiences.
              <br />
              Here’s a little taste of what’s possible.
            </p>
          </div>
          <div className="projects">
            {projects.map((item, index) => (
              <button
                className="project"
                key={item.id}
                onClick={() => setSelected(index)}
                aria-label={`View ${item.title} concept project`}
              >
                <div className="project-image">
                  <ProjectArt kind={item.theme} />
                  <span className="project-open">
                    <Arrow diagonal />
                  </span>
                  <span className="concept-label">Concept project</span>
                </div>
                <div className="project-caption">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </div>
                  <Arrow diagonal />
                </div>
              </button>
            ))}
          </div>
        </section>
        <section id="about" className="about section">
          <div className="container about-grid">
            <div>
              <h2>
                Complex things.
                <br />
                Made <span className="underlined">simple.</span>
              </h2>
              <div className="about-doodle">
                <ButterCharacter />
                <span>
                  Less blah.
                  <br />
                  More aha!
                </span>
              </div>
            </div>
            <div className="about-copy">
              <p className="large-copy">
                Learning should spark something.
                <br />A new thought. A better way.
                <br />A moment that sticks.
              </p>
              <p>
                We’re Butter, a creative studio bringing a little more humanity
                to digital learning. We turn your knowledge into experiences
                that feel good and do good.
              </p>
              <p>
                From the first “what if?” to the final little detail, we blend
                clear thinking with playful creativity. Always made for the
                people on the other side of the screen.
              </p>
              <div className="services">
                <div>
                  <span>01</span>
                  <h3>Learning strategy</h3>
                  <Arrow diagonal />
                </div>
                <div>
                  <span>02</span>
                  <h3>Digital experiences</h3>
                  <Arrow diagonal />
                </div>
                <div>
                  <span>03</span>
                  <h3>Story & design</h3>
                  <Arrow diagonal />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section container">
          <Spark className="contact-spark" />
          <h2>
            Got something
            <br />
            worth <span className="underlined">spreading?</span>
          </h2>
          <div className="contact-bottom">
            <p>Let’s turn it into something people remember.</p>
            <button
              className="pill-button"
              onClick={() => setContactOpen(true)}
            >
              Let’s make it happen <Arrow diagonal />
            </button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="wordmark" href="#" aria-label="Butter home">
              butter
              <span className="brand-dot" aria-hidden="true">
                ✳
              </span>
            </a>
            <p>
              A little different.
              <br />A lot more memorable.
            </p>
            <a className="back-top" href="#">
              Back to top <span>↑</span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Butter. Made with feeling.
            </span>
            <span>Good learning. No added nonsense.</span>
          </div>
        </div>
      </footer>
      {project && (
        <Modal title={project.title} onClose={() => setSelected(null)}>
          <div className="case-study">
            <span className="case-note">
              Concept project — an example of our approach
            </span>
            <h2>{project.title}</h2>
            <p className="case-intro">{project.intro}</p>
            <ProjectArt kind={project.theme} />
            <p>{project.description}</p>
            <div className="deliverables">
              {project.deliverables.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="case-outcome">{project.outcome}</p>
            <button
              className="pill-button"
              onClick={() => {
                setSelected(null);
                setContactOpen(true);
              }}
            >
              Make something like this <Arrow diagonal />
            </button>
          </div>
        </Modal>
      )}
      {contactOpen && (
        <Modal
          title="Start a conversation with Butter"
          onClose={() => setContactOpen(false)}
        >
          <ContactForm />
        </Modal>
      )}
    </>
  );
}
