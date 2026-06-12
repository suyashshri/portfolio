import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { timeline } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <section id="experience" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -right-48 h-80 w-80 rounded-full bg-accent-2/8 blur-[110px]"
      />
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 · Journey"
          title="Experience & education"
          description="Where I've worked, what I've learned, and the path that got me here."
        />

        <div ref={lineRef} className="relative ml-3 md:ml-6">
          {/* track + animated progress line */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-line" />
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-linear-to-b from-accent to-accent-2"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-12 pb-2">
            {timeline.map((entry, i) => (
              <Reveal
                key={`${entry.org}-${entry.period}`}
                delay={i * 0.05}
                className="relative pl-10 md:pl-14"
              >
                {/* node */}
                <span className="absolute top-1 left-0 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-surface text-accent">
                  {entry.type === "work" ? (
                    <Briefcase size={13} />
                  ) : (
                    <GraduationCap size={14} />
                  )}
                </span>

                <div className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-accent/25">
                  <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-bright">
                      {entry.title}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mb-3 text-sm font-medium text-accent">
                    {entry.org}
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                  {entry.highlights && (
                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm text-soft">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
