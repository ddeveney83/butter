import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Arrow, ButterCharacter, Doodle } from "../components/Artwork";
import { MotionLink as Link } from "../components/Motion";
import { enquiryContext, trackMarketing } from "../lib/marketing";
import { nextSteps } from "../data/offers";
import { PageHero } from "../components/UI";

const interests = [
  "Learning strategy",
  "Digital learning",
  "Story & design",
  "Ongoing support",
  "Not sure yet",
];
export default function Contact() {
  const [params] = useSearchParams();
  const [interest, setInterest] = useState(
    params.get("service") || "Not sure yet",
  );
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const started = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("form-name", "butter-contact");
    data.set("interest", interest);
    const context = enquiryContext();
    for (const [key, value] of Object.entries(context)) data.set(key, value);
    setState("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          Array.from(data.entries()).map(([key, value]) => [
            key,
            String(value),
          ]),
        ).toString(),
      });
      if (!response.ok) throw new Error("The enquiry could not be sent.");
      setState("sent");
      trackMarketing("enquiry_success", context.enquiry_origin);
    } catch {
      setState("error");
      trackMarketing("enquiry_error", context.enquiry_origin);
    }
  }
  return (
    <>
      <PageHero
        title={
          <>
            Good things start
            <br />
            with <span className="underlined">hello.</span>
          </>
        }
      >
        <p>
          Tell us what your people need to do and what is getting in the way. A
          few lines are enough; you do not need a finished brief.
        </p>
      </PageHero>
      <section className="contact-page container">
        <aside className="contact-info">
          <Doodle kind="heart" />
          <p className="large-copy">
            A clear brief.
            <br />A useful next step.
          </p>
          <p className="contact-info-note">
            We’ll reply by email to understand the brief and suggest a next
            step. An initial conversation carries no obligation.
          </p>
          <ol className="contact-expectations">
            {nextSteps.map((step) => (
              <li key={step.title}>
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="contact-character">
            <ButterCharacter />
            <span>
              all ears.
              <br />
              good ideas.
            </span>
          </div>
        </aside>
        <form
          className="contact-form full-contact-form"
          onSubmit={submit}
          name="butter-contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="website"
          aria-busy={state === "sending"}
          onFocusCapture={() => {
            if (!started.current) {
              started.current = true;
              trackMarketing("form_start", enquiryContext().enquiry_origin);
            }
          }}
          onChange={() => {
            if (state !== "sending") setState("idle");
          }}
        >
          <input type="hidden" name="form-name" value="butter-contact" />
          <input type="hidden" name="interest" value={interest} />
          {["entry_page", "enquiry_origin", "source_kind"].map((name) => (
            <input key={name} type="hidden" name={name} />
          ))}
          <p hidden>
            <label>
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset className="interest-fieldset">
            <legend>What can we help with?</legend>
            <div className="interest-chips">
              {!interests.includes(interest) && (
                <button type="button" aria-pressed="true">
                  {interest}
                </button>
              )}
              {interests.map((item) => (
                <button
                  type="button"
                  disabled={state === "sending"}
                  key={item}
                  aria-pressed={interest === item}
                  onClick={() => {
                    setInterest(item);
                    setState("idle");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="form-row">
            <label>
              Your name
              <input
                disabled={state === "sending"}
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
                disabled={state === "sending"}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="sam@company.com"
                required
                maxLength={200}
              />
            </label>
          </div>
          <label>
            Company <span className="optional">(optional)</span>
            <input
              disabled={state === "sending"}
              name="company"
              autoComplete="organization"
              placeholder="Where you make things happen"
              maxLength={200}
            />
          </label>
          <label>
            A little about your project
            <textarea
              disabled={state === "sending"}
              name="brief"
              defaultValue={params.get("brief") || ""}
              placeholder="Who is the learning for, and what would you like them to do differently?"
              required
              maxLength={3000}
              rows={5}
            />
          </label>
          <div className="form-row">
            <label>
              Timing
              <select
                disabled={state === "sending"}
                name="timing"
                defaultValue=""
              >
                <option value="">Flexible</option>
                <option>Within a month</option>
                <option>In 1–3 months</option>
                <option>In 3–6 months</option>
                <option>Just exploring</option>
              </select>
            </label>
          </div>
          <div className="contact-actions">
            <button
              className="pill-button"
              type="submit"
              disabled={state === "sending" || state === "sent"}
            >
              {state === "sending"
                ? "Sending…"
                : state === "sent"
                  ? "Enquiry sent"
                  : "Send your enquiry"}
              <Arrow diagonal />
            </button>
          </div>
          <p
            className="form-note"
            role={state === "error" ? "alert" : "status"}
          >
            {state === "sent" ? (
              "Thanks. Your enquiry is with butter. We’ll reply by email to clarify the brief and suggest a useful next step."
            ) : state === "error" ? (
              "We couldn’t send your enquiry. Your details are still here; please try again."
            ) : (
              <>
                We’ll use your details to reply about this enquiry.{" "}
                <Link to="/privacy">How we handle your information</Link>.
              </>
            )}
          </p>
        </form>
      </section>
    </>
  );
}
