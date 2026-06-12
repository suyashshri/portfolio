import { motion } from "framer-motion";
import { ArrowUpRight, Folder } from "lucide-react";
import { GithubIcon } from "./ui/SocialIcon";
import type { MouseEvent } from "react";
import { projects, type Project } from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        onMouseMove={handleMouseMove}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="spotlight-card glass group flex h-full flex-col rounded-2xl"
      >
        {/* visual header */}
        <div
          className={`relative h-40 overflow-hidden rounded-t-2xl bg-linear-to-br ${project.gradient}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-6xl font-medium text-white/10 transition-transform duration-500 group-hover:scale-110">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <span className="absolute top-4 right-4 font-mono text-xs text-white/40">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between">
            <h3 className="text-lg font-semibold text-bright">
              {project.title}
            </h3>
            <div className="flex gap-1">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} source code`}
                  className="rounded-full p-2 text-muted transition-colors hover:text-bright"
                >
                  <GithubIcon size={17} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live site`}
                  className="rounded-full p-2 text-muted transition-colors hover:text-bright"
                >
                  <ArrowUpRight size={17} />
                </a>
              )}
              {!project.repoUrl && !project.liveUrl && (
                <span className="p-2 text-muted">
                  <Folder size={17} />
                </span>
              )}
            </div>
          </div>

          <p className="flex-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-soft"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section-shell py-28">
      <SectionHeading
        eyebrow="01 · Selected work"
        title="Things I've built"
        description="A few projects I'm proud of — AI-powered products that parse, chat, and stream in real time, built end-to-end."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects
          .filter((p) => p.featured)
          .map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
      </div>

      {/* non-featured projects as a compact list */}
      {projects.some((p) => !p.featured) && (
        <div className="mt-10 space-y-3">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <Reveal key={project.title} delay={i * 0.06}>
                <a
                  href={project.liveUrl ?? project.repoUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group flex items-center justify-between gap-4 rounded-xl px-6 py-4 transition-colors duration-300 hover:border-accent/30"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="font-mono text-xs text-muted">
                      {project.year}
                    </span>
                    <span className="truncate font-medium text-soft group-hover:text-bright">
                      {project.title}
                    </span>
                    <span className="hidden truncate text-sm text-muted md:block">
                      {project.tags.slice(0, 3).join(" · ")}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}
        </div>
      )}
    </section>
  );
}
