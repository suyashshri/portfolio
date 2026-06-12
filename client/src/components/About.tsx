import { motion } from "framer-motion";
import { profile } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-[-12rem] h-80 w-80 rounded-full bg-accent/8 blur-[110px]"
      />
      <div className="section-shell">
        <SectionHeading eyebrow="02 · About" title="A bit about me" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            {profile.about.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-lg leading-relaxed text-muted">
                  {i === 0 ? (
                    <>
                      <span className="font-serif text-2xl italic text-bright">
                        {paragraph.split(" ").slice(0, 4).join(" ")}{" "}
                      </span>
                      {paragraph.split(" ").slice(4).join(" ")}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="grid h-fit grid-cols-2 gap-4">
            {profile.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 + i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="glass rounded-2xl p-6"
                >
                  <p className="text-gradient text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
