import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/content";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-linear-to-r from-accent to-accent-2"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-x-0 border-t-0"
            : "border-b border-transparent"
        }`}
      >
        <nav className="section-shell flex h-16 items-center justify-between">
          <a
            href="#top"
            className="group flex items-center gap-2 text-sm font-semibold text-bright"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-linear-to-r from-accent to-accent-2 transition-transform duration-300 group-hover:scale-150" />
            {profile.name.toLowerCase()}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:text-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-2">
              <a
                href={profile.resumeUrl}
                download
                className="rounded-full border border-line px-4 py-2 text-sm text-soft transition-all duration-300 hover:border-accent/50 hover:text-bright"
              >
                Resume
              </a>
            </li>
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-soft md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="glass overflow-hidden border-x-0 md:hidden"
            >
              {[...links, { label: "Resume", href: profile.resumeUrl }].map(
                (link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-6 py-3 text-sm text-soft hover:text-bright"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
