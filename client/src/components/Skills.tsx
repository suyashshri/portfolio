import { motion } from "framer-motion";
import { skillGroups, marqueeSkills } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="03 · Skills"
          title="Tools of the trade"
          description="The technologies I reach for to take an idea from sketch to production — including the AI/LLM stack behind my recent products."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.1}>
              <div className="glass h-full rounded-2xl p-6">
                <h3 className="mb-5 font-mono text-xs tracking-[0.2em] text-accent uppercase">
                  {group.title}
                </h3>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ scale: 1.06 }}
                      className="cursor-default rounded-full border border-line bg-elevated px-3.5 py-1.5 text-sm text-soft transition-colors duration-300 hover:border-accent/40 hover:text-bright"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* infinite marquee strip */}
      <div className="relative mt-20 overflow-hidden border-y border-line py-5 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-12 font-mono text-sm text-muted"
            >
              {skill}
              <span className="text-accent/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
