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
  const [emailDraft, setEmailDraft] = useState<string | null>(null);
  const [draftBody, setDraftBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const recipient =
    import.meta.env.VITE_CONTACT_EMAIL || "ddeveney83@gmail.com";
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = `Hi Butter,\n\n${form.get("brief")}\n\nInterested in: ${interest}\nBudget: ${form.get("budget") || "Let’s work it out"}\nTiming: ${form.get("timing") || "Flexible"}\n\nFrom ${form.get("name")}\n${form.get("email")}${form.get("company") ? `\n${form.get("company")}` : ""}`;
    setDraftBody(body);
    setEmailDraft(
      `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent("A little Butter for our next project")}&body=${encodeURIComponent(body)}`,
    );
    setCopied(false);
    setCopyError(false);
  }
  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(draftBody);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
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
          <a className="contact-email" href={`mailto:${recipient}`}>
            {recipient}
            <Arrow diagonal />
          </a>
          <p className="contact-info-note">
            Prefer a simple email?
            <br />
            That’s a good place to start, too.
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
          onChange={() => {
            setEmailDraft(null);
            setCopied(false);
            setCopyError(false);
          }}
        >
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
                  key={item}
                  aria-pressed={interest === item}
                  onClick={() => {
                    setInterest(item);
                    setEmailDraft(null);
                    setCopied(false);
                    setCopyError(false);
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
          </div>
          <label>
            Company <span className="optional">(optional)</span>
            <input
              name="company"
              autoComplete="organization"
              placeholder="Where you make things happen"
              maxLength={200}
            />
          </label>
          <label>
            A little about your project
            <textarea
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
              <select name="budget" defaultValue="">
                <option value="">Let’s work it out</option>
                <option>Under £2,500</option>
                <option>£2,500–£7,500</option>
                <option>£7,500–£15,000</option>
                <option>£15,000+</option>
              </select>
            </label>
            <label>
              Timing
              <select name="timing" defaultValue="">
                <option value="">Flexible</option>
                <option>Within a month</option>
                <option>In 1–3 months</option>
                <option>In 3–6 months</option>
                <option>Just exploring</option>
              </select>
            </label>
          </div>
          <div className="contact-actions">
            {emailDraft ? (
              <>
                <a className="pill-button" href={emailDraft}>
                  Open email draft <Arrow diagonal />
                </a>
                <button
                  className="reset-link"
                  type="button"
                  onClick={copyBrief}
                >
                  {copied ? "Copied!" : "Copy project brief"}
                  <span aria-hidden="true">{copied ? "✓" : "↗"}</span>
                </button>
              </>
            ) : (
              <button className="pill-button" type="submit">
                Create an email draft <Arrow diagonal />
              </button>
            )}
          </div>
          <p className="form-note" role="status">
            {emailDraft
              ? "Your draft is ready. Open your email app to review and send. Nothing has been sent yet."
              : "Opens in your email app, ready for you to send. Your details stay in this browser until you choose to send."}
            {copyError &&
              " Copying wasn’t available. You can still open and send the email draft."}
          </p>
        </form>
      </section>
    </>
  );
}
