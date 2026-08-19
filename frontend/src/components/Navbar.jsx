import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CutButton from "./CutButton";

const links = [
  ["Programs", "#programs"],
  ["Universities", "#network"],
  ["Journey", "#about"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-4 pt-3 md:pt-4">
      <div
        className={`flex items-center justify-between px-5 md:px-8 py-3 rounded-2xl transition-all ${
          scrolled
            ? "bg-paper/95 backdrop-blur-xl border border-line shadow-sm"
            : "bg-paper/70 backdrop-blur-md border border-line/50"
        }`}
      >
        <a href="#top" className="flex items-center gap-2">
          <img src="/acdyon-logo.webp" alt="AcdyOn Logo" className="h-9 w-auto object-contain" />
          <span className="text-lg font-semibold tracking-[-0.03em] text-ink">
            AcdyOn
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-2">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="px-4 py-2 text-sm text-ink/70 hover:text-ink transition"
            >
              {label}
            </a>
          ))}
          <CutButton
            href="#contact"
            variant="solid"
            size="sm"
            className="ml-2"
          >
            Book Consultation
          </CutButton>
        </nav>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden grid h-10 w-10 place-items-center btn-cut-sm bg-ink text-paper"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-ink text-paper p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/acdyon-logo.webp" alt="AcdyOn Logo" className="h-7 w-auto object-contain" />
              <span className="text-lg font-semibold tracking-[-0.03em] text-paper">AcdyOn</span>
            </div>
            <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center btn-cut-sm bg-paper text-ink">
              <X size={18} />
            </button>
          </div>
          <div className="mt-16 space-y-6">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block text-3xl font-display tracking-tight"
              >
                {label}
              </a>
            ))}
          </div>
          <CutButton
            href="#contact"
            variant="solid-accent"
            size="lg"
            className="absolute inset-x-6 bottom-8 justify-center"
          >
            Book Consultation
          </CutButton>
        </div>
      )}
    </header>
  );
}
