import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, socials } from "../data/content";
import MagneticButton from "./ui/MagneticButton";
import SocialIcon from "./ui/SocialIcon";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-136 w-216 -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.35), rgba(103,232,249,0.12), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-32 h-96 w-96 rounded-full bg-accent-2/10 blur-[100px]"
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="section-shell relative w-full pt-28 pb-20"
      >
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-soft">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>
          <span className="font-mono text-xs text-muted">
            {profile.location}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-5xl text-5xl font-semibold tracking-tight text-bright sm:text-7xl"
        >
          {profile.firstName} —{" "}
          <span className="text-gradient">{profile.role}</span>{" "}
          <span className="font-serif italic font-normal text-soft">
            {profile.tagline}.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.heroIntro}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="#work">
            View work <ArrowDown size={16} />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch <ArrowUpRight size={16} />
          </MagneticButton>
          <div className="ml-1 flex items-center gap-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="rounded-full p-2.5 text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-bright"
              >
                <SocialIcon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
