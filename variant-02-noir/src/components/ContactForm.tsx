"use client";

import { useMemo, useRef, useState } from "react";
import { site, treatments, programmes } from "@/lib/site";

type Fields = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  date: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  date: "",
  message: "",
  consent: false,
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{6,}$/;

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const interests = useMemo(
    () => [
      "The Longevity Diagnostic",
      ...treatments.map((t) => t.name),
      ...programmes.map((p) => `${p.name} — ${p.price}`),
      "Something else",
    ],
    []
  );

  const today = new Date().toISOString().slice(0, 10);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!values.email.trim()) e.email = "We need an email to reply to.";
    else if (!EMAIL_RE.test(values.email.trim())) e.email = "That email address looks incomplete.";
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
      e.phone = "Digits, spaces and + only, please.";
    if (!values.interest) e.interest = "Choose what you are interested in.";
    if (values.date && values.date < today) e.date = "Choose a date from today onward.";
    if (values.message.trim().length < 12)
      e.message = "A sentence or two helps us route you to the right physician.";
    if (!values.consent) e.consent = "We need your permission to reply.";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);

    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      document.getElementById(`field-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));

    // Honeypot: bots fill hidden fields. Pretend it worked, store nothing.
    const trapped = values.website.trim().length > 0;
    const ref = `AUR-${Math.random().toString(36).slice(2, 6).toUpperCase()}${Date.now()
      .toString(36)
      .slice(-3)
      .toUpperCase()}`;

    setReference(ref);
    setStatus("sent");

    if (trapped) {
      setValues(EMPTY);
      return;
    }

    try {
      sessionStorage.setItem(
        "aurelia:lastEnquiry",
        JSON.stringify({ ...values, reference: ref, at: new Date().toISOString() })
      );
    } catch {
      /* storage unavailable — non-fatal */
    }
  }

  function mailtoLink() {
    const subject = encodeURIComponent(`${values.interest || "Consultation"} — ${site.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.phone ? `Phone: ${values.phone}` : "",
        values.date ? `Preferred date: ${values.date}` : "",
        "",
        values.message,
      ]
        .filter(Boolean)
        .join("\n")
    );
    return `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setReference("");
    setStatus("idle");
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ------------------------------ success ------------------------------ */
  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="border border-line bg-surface p-8 sm:p-12">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center border border-brass text-brass">
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
              <path
                d="M1 6.2 5.2 10.4 14 1.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
          </span>
          <p className="eyebrow">Enquiry received</p>
        </div>

        <h3 className="display-md mt-9 max-w-[16ch]">
          Thank you, <em className="italic-display">{values.name.split(" ")[0] || "friend"}.</em>
        </h3>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-muted">
          Your request about{" "}
          <span className="text-chalk">{values.interest || "Aurelia"}</span> is with our concierge.
          A physician reviews every enquiry personally and replies within one working day — usually
          sooner.
        </p>

        <div aria-hidden className="my-10 h-px w-full bg-line" />

        <dl className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {[
            ["Reference", reference],
            ["Reply by", "One working day"],
            ["Sent to", site.contact.email],
          ].map(([k, v]) => (
            <div key={k} className="bg-surface p-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-3 break-all font-display text-lg">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={mailtoLink()}
            className="border border-brass bg-brass px-7 py-3.5 text-[0.6875rem] tracking-[0.24em] text-noir uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-brass"
          >
            Also send from your email
          </a>
          <button
            type="button"
            onClick={reset}
            className="border border-line px-7 py-3.5 text-[0.6875rem] tracking-[0.24em] uppercase transition-all duration-[800ms] hover:border-brass hover:text-brass"
          >
            Send another
          </button>
        </div>

        <p className="mt-7 text-xs leading-relaxed text-muted">
          Demo site: submissions are validated and shown back to you but not stored on a server. The
          button above hands the enquiry to your own mail app.
        </p>
      </div>
    );
  }

  /* -------------------------------- form -------------------------------- */
  const field =
    "w-full border border-line bg-transparent px-4 py-3.5 text-[0.9375rem] text-chalk transition-colors duration-700 placeholder:text-muted/50 focus:border-brass focus:outline-none";
  const label = "eyebrow mb-3 block";
  const err = "mt-2 text-xs text-rust";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border border-line bg-surface p-6 sm:p-10"
    >
      {/* honeypot — visually and programmatically hidden from people */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="mb-9 flex items-center gap-5">
        <span aria-hidden className="h-px w-10 bg-brass/60" />
        <p className="eyebrow">Enquiry</p>
      </div>

      <div className={`grid gap-7 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="field-name" className={label}>
            Full name *
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={field}
            placeholder="Elena Rossi"
          />
          {errors.name && (
            <p id="err-name" className={err}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-email" className={label}>
            Email *
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={field}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="err-email" className={err}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-phone" className={label}>
            Phone <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
            className={field}
            placeholder="+41 79 555 00 00"
          />
          {errors.phone && (
            <p id="err-phone" className={err}>
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-interest" className={label}>
            Interested in *
          </label>
          <select
            id="field-interest"
            name="interest"
            value={values.interest}
            onChange={(e) => set("interest", e.target.value)}
            aria-invalid={!!errors.interest}
            aria-describedby={errors.interest ? "err-interest" : undefined}
            className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%23c2a265%22 stroke-width=%221.2%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10 [&>option]:bg-surface [&>option]:text-chalk`}
          >
            <option value="">Please choose…</option>
            {interests.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {errors.interest && (
            <p id="err-interest" className={err}>
              {errors.interest}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="field-date" className={label}>
            Preferred date <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="field-date"
            name="date"
            type="date"
            min={today}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "err-date" : undefined}
            className={`${field} [color-scheme:dark]`}
          />
          {errors.date && (
            <p id="err-date" className={err}>
              {errors.date}
            </p>
          )}
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor="field-message" className={label}>
            How can we help? *
          </label>
          <textarea
            id="field-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "err-message" : "hint-message"}
            className={`${field} resize-y`}
            placeholder="A little about what you are looking for, and anything a physician should know before we speak."
          />
          <div className="mt-2 flex justify-between gap-4">
            {errors.message ? (
              <p id="err-message" className={err}>
                {errors.message}
              </p>
            ) : (
              <p id="hint-message" className="text-xs text-muted">
                Reviewed by a physician, not a salesperson.
              </p>
            )}
            <p className="shrink-0 text-xs text-muted tabular-nums">
              {values.message.trim().length} characters
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-line pt-9">
        <label htmlFor="field-consent" className="flex cursor-pointer items-start gap-4">
          <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-line transition-colors duration-700 peer-focus-visible:border-brass has-checked:border-brass has-checked:bg-brass">
            <input
              id="field-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "err-consent" : undefined}
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
            />
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              aria-hidden
              className={`pointer-events-none text-noir transition-opacity duration-500 ${
                values.consent ? "opacity-100" : "opacity-0"
              }`}
            >
              <path d="M1 4.2 3.6 6.8 9 1.4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="text-[0.8125rem] leading-relaxed text-muted">
            Aurelia may contact me about this enquiry. Guest records are held under professional medical
            confidentiality duties and are never sold or shared.
          </span>
        </label>
        {errors.consent && (
          <p id="err-consent" className={err}>
            {errors.consent}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-9 w-full border border-brass bg-brass px-8 py-4 text-[0.6875rem] tracking-[0.24em] text-noir uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-brass disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Or reach the concierge directly on{" "}
          <a href={`tel:${site.contact.phoneHref}`} className="link-rule text-brass">
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </form>
  );
}