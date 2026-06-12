/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to make the portfolio yours.
 *  Every section of the site reads from here — no other file
 *  needs to change when you swap in your real content.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Suyash",
  firstName: "Suyash",
  role: "Full-stack Developer",
  tagline: "building AI-powered web products",
  availability: "Available for work",
  location: "India · IST",
  email: "suyashshrivastava736@gmail.com",
  resumeUrl: "/resume.pdf",
  heroIntro:
    "I design and build fast, intelligent web applications — from pixel-perfect interfaces to LLM-powered backends that stream, reason, and scale.",
  about: [
    "I'm a full-stack developer who cares as much about how software feels as how it works. These days my happy place is the intersection of product engineering and AI — shipping apps where LLMs do real work: parsing resumes, chatting with documents, streaming answers token by token.",
    "On the frontend I live in React, Next.js, and TypeScript; on the backend I reach for Bun, Node, and Postgres. I've integrated OpenAI and OpenRouter models into production apps with SSE streaming, prompt pipelines, and vector search — and I handle the data side too, from Prisma schemas to Snowflake warehouses.",
    "When I'm not coding, I'm probably experimenting with new models, reading about system design, or refining this very website.",
  ],
  stats: [
    { value: "3.5+", label: "Years writing code" },
    { value: "10+", label: "Projects shipped" },
    { value: "3+", label: "AI/LLM products built" },
    { value: "∞", label: "Cups of chai" },
  ],
};

export const socials = [
  { label: "GitHub", url: "https://github.com/suyashshri", icon: "github" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/suyash-shrivastava-98a653190/",
    icon: "linkedin",
  },
  { label: "Twitter / X", url: "https://x.com/codexyash129", icon: "twitter" },
  {
    label: "Email",
    url: "mailto:suyashshrivastava736@gmail.com",
    icon: "mail",
  },
] as const;

export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  /** Tailwind gradient classes used for the card's visual header */
  gradient: string;
}

export const projects: Project[] = [
  {
    title: "HireMind",
    year: "2026",
    description:
      "A real-time AI-powered resume analysis platform with async job processing, LLM-driven match scoring, and real-time cover letter streaming via SSE.",
    tags: ["React", "TypeScript", "Bun", "Prisma", "Redis", "BullMQ"],
    liveUrl: "https://hiremind.codexyash.com",
    repoUrl: "https://github.com/suyashshri/AI-resume",
    featured: true,
    gradient: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
  },
  {
    title: "ChattyBot",
    year: "2026",
    description:
      "Full-stack LLM chat platform with real-time AI streaming and inference observability, supporting multiple AI models via a unified API..",
    tags: ["Bun", "TypeScript", "PostgreSQL", "Nginx", "Docker"],
    repoUrl: "https://github.com/your-username/forge-api",
    featured: true,
    gradient: "from-cyan-500/30 via-sky-500/20 to-transparent",
  },
  {
    title: "Brainbase",
    year: "2025",
    description:
      "AI-Powered Chat PDF feature enabling real-time document interaction and enhancing user engagement through AI intelligence.",
    tags: ["Nextjs", "Typescript", "VectorDB", "Tailwind", "PostgreSQL"],
    liveUrl: "https://example.com",
    featured: true,
    gradient: "from-amber-500/25 via-orange-500/15 to-transparent",
  },
];

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Vite"],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Bun",
      "REST APIs",
      "Server-Sent Events (SSE)",
      "System Design",
    ],
  },
  {
    title: "AI / LLM",
    skills: [
      "OpenAI API",
      "OpenRouter",
      "LLM Integration",
      "Prompt Engineering",
    ],
  },
  {
    title: "Database",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "SQL",
      "Prisma ORM",
      "Drizzle",
      "Snowflake",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (S3, EC2, Lambda)", "Docker", "Nginx", "CI/CD"],
  },
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Python"],
  },
  {
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "Cursor",
      "Turborepo",
      "Data Structures & Algorithms",
    ],
  },
];

/** Flat list used by the scrolling marquee strip */
export const marqueeSkills = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Bun",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "AWS",
  "Docker",
  "OpenAI API",
  "Snowflake",
  "Python",
  "Turborepo",
];

export interface TimelineItem {
  type: "work" | "education";
  title: string;
  org: string;
  period: string;
  description: string;
  highlights?: string[];
}

export const timeline: TimelineItem[] = [
  {
    type: "work",
    title: "Software Developer",
    org: "LTIMindtree · Pune",
    period: "Aug 2022 — Present",
    description:
      "Building and maintaining scalable full-stack web applications end-to-end with React.js, Node.js, and Express.js — owning everything from responsive UIs to backend services and data pipelines.",
    highlights: [
      "Improved user engagement by 40% by shipping production-ready full-stack features",
      "Cut response latency by 30% by optimizing PostgreSQL + Prisma ORM backend services and data workflows",
      "Integrated AWS S3 for secure, high-volume file storage with faster asset delivery",
      "Delivered cross-platform responsive apps in React.js and Next.js with 99.9% uptime",
      "Designed Snowflake-based ETL pipelines enabling near real-time analytics",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Engineering",
    org: "AISSMS, Pune University",
    period: "2018 — 2022",
    description:
      "Graduated with a CGPA of 8.97/10. Built a strong foundation in data structures, algorithms, and software engineering that powers my full-stack work today.",
  },
];
