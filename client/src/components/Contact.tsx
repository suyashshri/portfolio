import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import { profile, socials } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import SocialIcon from "./ui/SocialIcon";

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full rounded-xl border border-line bg-elevated/60 px-4 py-3 text-sm text-bright placeholder:text-muted/70 outline-none transition-all duration-300 focus:border-accent/60 focus:ring-2 focus:ring-accent/15";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Couldn't send your message — is the API server running? You can always email me directly.",
      );
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 h-112 w-176 -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.45), rgba(103,232,249,0.15), transparent)",
        }}
      />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="06 · Contact"
          title="Let's build something together"
          description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-muted">
                Prefer email? Reach me directly at{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-bright underline decoration-accent/50 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {profile.email}
                </a>
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  href={profile.resumeUrl}
                  variant="ghost"
                  download
                >
                  <Download size={16} /> Download resume
                </MagneticButton>
              </div>

              <div>
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
                  Elsewhere
                </p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="glass rounded-full p-3 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-bright"
                    >
                      <SocialIcon name={s.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="glass space-y-4 rounded-2xl p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  minLength={2}
                  placeholder="Your name"
                  className={inputClasses}
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
              <input
                name="subject"
                placeholder="Subject (optional)"
                className={inputClasses}
              />
              <textarea
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder="Tell me about your project…"
                className={`${inputClasses} resize-none`}
              />

              <div className="flex items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-bright px-6 py-3 text-sm font-medium text-base transition-colors duration-300 hover:bg-accent disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <Send size={15} />
                    </>
                  )}
                </motion.button>

                <AnimatePresence mode="wait">
                  {status === "sent" && (
                    <motion.p
                      key="sent"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-emerald-400"
                    >
                      <CheckCircle2 size={16} /> Message sent — I'll reply soon!
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-rose-400"
                    >
                      <AlertCircle size={16} className="shrink-0" /> {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
