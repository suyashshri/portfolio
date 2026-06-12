import { motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  profile,
  projects,
  skillGroups,
  timeline,
  socials,
} from "../data/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

interface Line {
  id: number;
  node: ReactNode;
}

const PROMPT = (
  <span className="shrink-0">
    <span className="text-emerald-400">guest</span>
    <span className="text-muted">@</span>
    <span className="text-accent">{`${"suyash"}.dev`}</span>
    <span className="text-muted"> ~ </span>
    <span className="text-accent-2">❯</span>
  </span>
);

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "projects",
  "skills",
  "experience",
  "socials",
  "contact",
  "resume",
  "status",
  "echo",
  "date",
  "history",
  "clear",
  "sudo",
] as const;

function Hint({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}

function Key({ children }: { children: ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (...nodes: ReactNode[]) => {
    setLines((prev) => [
      ...prev,
      ...nodes.map((node) => ({ id: idRef.current++, node })),
    ]);
  };

  // welcome message
  useEffect(() => {
    push(
      <p>
        <Hint>Welcome to</Hint> <Key>{profile.name.toLowerCase()}.dev</Key>{" "}
        <Hint>v1.0.0 — an interactive way to get to know me.</Hint>
      </p>,
      <p>
        <Hint>
          Type <Key>help</Key> to see available commands. Try <Key>Tab</Key> to
          autocomplete, <Key>↑</Key>/<Key>↓</Key> for history.
        </Hint>
      </p>,
      <p>&nbsp;</p>,
    );
  }, []);

  // keep scrolled to bottom
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  async function run(raw: string) {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd) {
      case "":
        break;

      case "help":
        push(
          <div className="grid gap-x-8 gap-y-0.5 sm:grid-cols-2">
            {[
              ["whoami", "who am I?"],
              ["about", "a short bio"],
              ["projects", "things I've built"],
              ["skills", "my tech stack"],
              ["experience", "where I've worked"],
              ["socials", "find me elsewhere"],
              ["contact", "get my email"],
              ["resume", "open my resume"],
              ["status", "ping the live API"],
              ["date", "current date & time"],
              ["history", "commands you've run"],
              ["clear", "wipe the screen"],
            ].map(([name, desc]) => (
              <p key={name}>
                <Key>{name.padEnd(11)}</Key> <Hint>{desc}</Hint>
              </p>
            ))}
          </div>,
        );
        break;

      case "whoami":
        push(
          <p>
            {profile.name} —{" "}
            <Hint>
              {profile.role}, {profile.tagline}. {profile.location}.
            </Hint>
          </p>,
        );
        break;

      case "about":
        profile.about.forEach((para) =>
          push(
            <p>
              <Hint>{para}</Hint>
            </p>,
            <p>&nbsp;</p>,
          ),
        );
        break;

      case "projects":
        projects.forEach((p, i) =>
          push(
            <p>
              <span className="text-muted">
                {String(i + 1).padStart(2, "0")}.
              </span>{" "}
              <Key>{p.title}</Key>{" "}
              <span className="text-muted">({p.year})</span>
            </p>,
            <p className="pl-6">
              <Hint>{p.description}</Hint>
            </p>,
            <p className="pl-6 text-accent-2/80">{p.tags.join(" · ")}</p>,
            <p>&nbsp;</p>,
          ),
        );
        break;

      case "skills":
        skillGroups.forEach((group) =>
          push(
            <p>
              <Key>{group.title}</Key> <Hint>→ {group.skills.join(", ")}</Hint>
            </p>,
          ),
        );
        break;

      case "experience":
        timeline.forEach((t) =>
          push(
            <p>
              <span className="text-muted">{t.period}</span>{" "}
              <Key>{t.title}</Key> <Hint>@ {t.org}</Hint>
            </p>,
            <p className="pl-4">
              <Hint>{t.description}</Hint>
            </p>,
            <p>&nbsp;</p>,
          ),
        );
        break;

      case "socials":
        socials.forEach((s) =>
          push(
            <p>
              <Key>{s.label.padEnd(12)}</Key>{" "}
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent-2 underline decoration-accent-2/40 underline-offset-4 hover:decoration-accent-2"
              >
                {s.url.replace("mailto:", "")}
              </a>
            </p>,
          ),
        );
        break;

      case "contact":
        push(
          <p>
            <Hint>Drop me a line at</Hint>{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent-2 underline decoration-accent-2/40 underline-offset-4 hover:decoration-accent-2"
            >
              {profile.email}
            </a>{" "}
            <Hint>
              — or scroll down and use the form.{" "}
              {profile.availability.toLowerCase()}!
            </Hint>
          </p>,
        );
        break;

      case "resume":
        push(
          <p>
            <Hint>Opening resume…</Hint>
          </p>,
        );
        window.open(profile.resumeUrl, "_blank");
        break;

      case "status": {
        push(
          <p>
            <Hint>Pinging API…</Hint>
          </p>,
        );
        try {
          const started = performance.now();
          const res = await fetch("/api/health");
          const ms = Math.round(performance.now() - started);
          const data = (await res.json()) as { status: string; uptime: number };
          push(
            <p>
              <span className="text-emerald-400">
                ● {data.status.toUpperCase()}
              </span>{" "}
              <Hint>
                — Elysia API answered in {ms}ms · uptime{" "}
                {Math.floor(data.uptime)}s
              </Hint>
            </p>,
          );
        } catch {
          push(
            <p>
              <span className="text-rose-400">● OFFLINE</span>{" "}
              <Hint>— couldn't reach the API server.</Hint>
            </p>,
          );
        }
        break;
      }

      case "echo":
        push(<p>{arg || " "}</p>);
        break;

      case "date":
        push(
          <p>
            <Hint>{new Date().toString()}</Hint>
          </p>,
        );
        break;

      case "history":
        history.forEach((h, i) =>
          push(
            <p>
              <span className="text-muted">{String(i + 1).padStart(3)}</span>{" "}
              {h}
            </p>,
          ),
        );
        break;

      case "clear":
        setLines([]);
        break;

      case "sudo":
        if (arg === "hire-me" || arg === "hire me") {
          push(
            <p>
              <span className="text-emerald-400">✔ Permission granted.</span>{" "}
              <Hint>Excellent choice — let's talk:</Hint>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-accent-2 underline decoration-accent-2/40 underline-offset-4"
              >
                {profile.email}
              </a>
            </p>,
          );
        } else {
          push(
            <p>
              <Hint>
                guest is not in the sudoers file. This incident will be
                reported.{" "}
              </Hint>
              <Hint>
                (psst — try <Key>sudo hire-me</Key>)
              </Hint>
            </p>,
          );
        }
        break;

      default:
        push(
          <p>
            <span className="text-rose-400">command not found:</span> {cmd}{" "}
            <Hint>
              — type <Key>help</Key> for the list.
            </Hint>
          </p>,
        );
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const raw = input;
      push(
        <p className="flex gap-2">
          {PROMPT}
          <span className="text-bright">{raw}</span>
        </p>,
      );
      if (raw.trim()) setHistory((prev) => [...prev, raw]);
      setHistoryIndex(-1);
      setInput("");
      void run(raw);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        push(
          <p>
            <Hint>{matches.join("   ")}</Hint>
          </p>,
        );
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <section id="terminal" className="relative py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 h-72 w-72 rounded-full bg-accent/8 blur-[110px]"
      />
      <div className="section-shell">
        <SectionHeading
          eyebrow="05 · Terminal"
          title="Don't like scrolling?"
          description="Explore this whole portfolio from the command line instead. Type help to get started."
        />

        <Reveal>
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="glass overflow-hidden rounded-2xl shadow-[0_24px_80px_-24px_rgba(167,139,250,0.25)]"
          >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-line bg-elevated/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-muted">
                guest@{profile.name.toLowerCase()}.dev — zsh
              </span>
            </div>

            {/* body */}
            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="h-96 cursor-text overflow-y-auto p-5 font-mono text-[13px] leading-relaxed text-soft sm:text-sm"
            >
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {line.node}
                </motion.div>
              ))}

              {/* input row */}
              <div className="flex gap-2">
                {PROMPT}
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-label="Terminal input"
                    className="w-full bg-transparent text-bright caret-accent-2 outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
