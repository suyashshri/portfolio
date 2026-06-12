import { ArrowUp } from "lucide-react";
import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="section-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Crafted with React, Elysia &
          Framer Motion.
        </p>
        <a
          href="#top"
          className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-bright"
        >
          Back to top
          <ArrowUp
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </footer>
  );
}
