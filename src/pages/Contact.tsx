import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Arrow, ButterCharacter, Doodle } from "../components/Artwork";
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
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("form-name", "butter-contact");
    data.set("interest", interest);
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
    } catch {
      setState("error");
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
          A big idea, a tricky challenge, or a little “what if?”. Tell us what’s
          on your mind.
        </p>
      </PageHero>
      <section className="contact-page container">
        <aside className="contact-info">
          <Doodle kind="heart" />
          <p className="large-copy">
            Your knowledge.
            <br />
            Our curiosity.
            <br />
            Let’s see what happens.
          </p>
          <p className="contact-info-note">
            Send us a little about your project.
            <br />
            The Butter studio will take it from there.
          </p>
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
          onChange={() => {
            if (state !== "sending") setState("idle");
          }}
        >
          <input type="hidden" name="form-name" value="butter-contact" />
          <input type="hidden" name="interest" value={interest} />
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
              placeholder="We’d love to make…"
              required
              maxLength={3000}
              rows={5}
            />
          </label>
          <div className="form-row">
            <label>
              Budget
              <select
                disabled={state === "sending"}
                name="budget"
                defaultValue=""
              >
                <option value="">Let’s work it out</option>
                <option>Under £2,500</option>
                <option>£2,500–£7,500</option>
                <option>£7,500–£15,000</option>
                <option>£15,000+</option>
              </select>
            </label>
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
            {state === "sent"
              ? "Thanks. Your enquiry is with Butter."
              : state === "error"
                ? "We couldn’t send your enquiry. Your details are still here; please try again."
                : "We’ll use your details to reply about this enquiry."}
          </p>
        </form>
      </section>
    </>
  );
}
