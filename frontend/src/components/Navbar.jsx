import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import CutButton from "./CutButton";

/* ============================================================
   Mega-menu structure
   Programs | Doctoral | Universities | Resources = have dropdowns
   Home | About | Contact = simple scroll links (no dropdown)
   ============================================================ */
const megaMenus = {
  Programs: {
    width: "single",
    columns: [
      {
        heading: "Programs",
        subheading:
          "Executive education, AI mastery, and professional development programmes.",
        items: [
          {
            title: "Agentic AI & Automation Mastery",
            description:
              "Build AI agents, automate workflows, and deploy real projects.",
          },
          {
            title: "Cybersecurity & AI Mastery",
            description:
              "Industry-focused cybersecurity training with career acceleration.",
          },
          {
            title: "AI for Business Leaders",
            description:
              "Strategic AI decision-making for executives and founders.",
          },
          {
            title: "Corporate Training",
            description:
              "Custom AI and leadership learning for organisations.",
          },
        ],
      },
    ],
  },

  // Doctoral — trimmed to a single floating column, no chips/sublinks clutter
  Doctoral: {
    width: "single",
    columns: [
      {
        heading: "Doctoral pathways",
        subheading:
          "Executive doctorates and honorary recognition from accredited partner institutions.",
        items: [
          {
            title: "Kennedy University DBA",
            description: "US-based prestigious DBA programme.",
          },
          {
            title: "Dunster Business School DBA",
            description: "Swiss QS 4-Star DBA with international reach.",
          },
          {
            title: "LSMT DBA",
            description: "London-based research-driven DBA programme.",
          },
          {
            title: "EIMT DBA",
            description: "Swiss innovation-focused DBA for executives.",
          },
          {
            title: "Birchwood DBA",
            description: "Accelerated 2-year US executive DBA.",
          },
          {
            title: "Honorary Doctorate",
            description:
              "Recognition for distinguished professional contribution.",
          },
        ],
      },
    ],
  },

  Universities: {
    width: "single",
    columns: [
      {
        heading: "Universities",
        subheading:
          "International pathways, verification, and academic clarity.",
        items: [
          {
            title: "Partner Universities",
            description: "Explore the global academic network.",
          },
          {
            title: "Academic Recognition",
            description: "Understanding international positioning and fit.",
          },
          {
            title: "Global Network",
            description: "Geographic reach and regional pathways.",
          },
        ],
      },
    ],
  },

  Resources: {
    width: "single",
    columns: [
      {
        heading: "Resources",
        subheading:
          "Insights, guides, and tools for navigating your learning journey.",
        items: [
          {
            title: "Blogs",
            description:
              "Insights on AI, education, and academic advancement.",
          },
          {
            title: "Brochures",
            description: "Detailed program brochures and guides.",
          },
          {
            title: "Events",
            description: "Webinars, open days, and information sessions.",
          },
          {
            title: "Scholarship Calculator",
            description: "Estimate your indicative scholarship and net fee.",
          },
        ],
      },
    ],
  },
};

/* Map each mega-menu key to the section it should smooth-scroll to */
const menuSectionMap = {
  Programs: "#programs",
  Doctoral: "#programs",
  Universities: "#network",
  Resources: "#faq",
};

/* ============================================================
   Floating Mega Menu Panel
   ============================================================ */
function MegaMenuPanel({ menuKey, onLinkClick }) {
  const menu = megaMenus[menuKey];
  if (!menu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[380px] bg-paper border border-line btn-cut-sm shadow-2xl overflow-hidden"
      style={{ zIndex: 100 }}
    >
      {menu.columns.map((column) => (
        <div key={column.heading} className="p-6">
          {/* Column header */}
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45 font-semibold mb-1">
              {column.heading}
            </p>
            <p className="text-xs text-ink/60 leading-relaxed">
              {column.subheading}
            </p>
          </div>

          {/* Items */}
          <div className="space-y-1">
            {column.items.map((item) => (
              <a
                key={item.title}
                href={menuSectionMap[menuKey] || "#top"}
                onClick={onLinkClick}
                className="group block p-3 -mx-3 hover:bg-paper2 transition rounded-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink group-hover:text-accent transition leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-ink/60 mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-ink/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ============================================================
   Main Navbar
   ============================================================ */
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => clearTimeout(closeTimer.current);
  }, []);

  const handleMenuEnter = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-4 pt-3 md:pt-4">
      <div
        className={`flex items-center justify-between px-5 md:px-8 py-3 rounded-2xl transition-all ${
          scrolled
            ? "bg-paper/95 backdrop-blur-xl border border-line shadow-sm"
            : "bg-paper/75 backdrop-blur-md border border-line/50"
        }`}
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={closeAll}
          className="flex items-center gap-2.5 text-ink shrink-0"
          aria-label="AcdyOn home"
        >
          <img src="/acdyon-logo.webp" alt="AcdyOn Logo" className="h-9 w-auto object-contain" />
          <span className="text-lg font-semibold tracking-[-0.03em] text-ink">
            AcdyOn
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Home — simple link */}
          <a
            href="#top"
            onClick={closeAll}
            className="px-3 py-2 text-sm text-ink/75 hover:text-ink transition"
          >
            Home
          </a>

          {/* Dropdown menus: Programs, Doctoral, Universities, Resources */}
          {Object.keys(megaMenus).map((key) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => handleMenuEnter(key)}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 text-sm transition ${
                  openMenu === key ? "text-ink font-medium" : "text-ink/75 hover:text-ink"
                }`}
                aria-expanded={openMenu === key}
                aria-haspopup="true"
              >
                {key}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    openMenu === key ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === key && (
                  <MegaMenuPanel menuKey={key} onLinkClick={closeAll} />
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* About — simple scroll link, no dropdown */}
          <a
            href="#about"
            onClick={closeAll}
            className="px-3 py-2 text-sm text-ink/75 hover:text-ink transition"
          >
            About
          </a>

          {/* Contact — simple scroll link, no dropdown */}
          <a
            href="#contact"
            onClick={closeAll}
            className="px-3 py-2 text-sm text-ink/75 hover:text-ink transition"
          >
            Contact
          </a>

          {/* CTA */}
          <CutButton
            href="#contact"
            variant="solid"
            size="sm"
            className="ml-3"
          >
            Book Consultation
          </CutButton>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden grid h-10 w-10 place-items-center btn-cut-sm bg-ink text-paper"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* ============================================================
          Mobile overlay
          ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink text-paper overflow-y-auto lg:hidden"
          >
            <div className="p-6 pb-32">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2.5">
                  <img src="/acdyon-logo.webp" alt="AcdyOn Logo" className="h-7 w-auto object-contain" />
                  <span className="text-lg font-semibold tracking-[-0.03em] text-paper">
                    AcdyOn
                  </span>
                </div>
                <button
                  onClick={closeAll}
                  className="grid h-10 w-10 place-items-center btn-cut-sm bg-paper text-ink"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {/* Home */}
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  href="#top"
                  onClick={closeAll}
                  className="flex items-center justify-between py-4 border-b border-paper/10 text-xl font-display tracking-tight"
                >
                  Home
                  <ArrowUpRight size={18} className="text-paper/40" />
                </motion.a>

                {/* Dropdown menus as accordions */}
                {Object.entries(megaMenus).map(([key, menu], index) => {
                  const isExpanded = mobileExpanded === key;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + (index + 1) * 0.05 }}
                      className="border-b border-paper/10"
                    >
                      <button
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : key)
                        }
                        className="w-full flex items-center justify-between py-4 text-xl font-display tracking-tight text-left"
                        aria-expanded={isExpanded}
                      >
                        {key}
                        <ChevronDown
                          size={18}
                          className={`text-paper/50 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 space-y-1 pl-3 border-l border-paper/15">
                              <p className="text-[10px] uppercase tracking-[0.24em] text-paper/45 font-semibold mb-2">
                                {menu.columns[0].heading}
                              </p>
                              {menu.columns[0].items.map((item) => (
                                <a
                                  key={item.title}
                                  href={menuSectionMap[key] || "#top"}
                                  onClick={closeAll}
                                  className="block py-2"
                                >
                                  <p className="text-sm font-semibold text-paper leading-tight">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-paper/50 mt-0.5 leading-snug">
                                    {item.description}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* About — simple scroll link */}
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  href="#about"
                  onClick={closeAll}
                  className="flex items-center justify-between py-4 border-b border-paper/10 text-xl font-display tracking-tight"
                >
                  About
                  <ArrowUpRight size={18} className="text-paper/40" />
                </motion.a>

                {/* Contact — simple scroll link */}
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  href="#contact"
                  onClick={closeAll}
                  className="flex items-center justify-between py-4 border-b border-paper/10 text-xl font-display tracking-tight"
                >
                  Contact
                  <ArrowUpRight size={18} className="text-paper/40" />
                </motion.a>
              </div>
            </div>

            {/* Fixed bottom CTA */}
            <div className="fixed inset-x-0 bottom-0 p-6 bg-ink border-t border-paper/10">
              <CutButton
                href="#contact"
                variant="solid-accent"
                size="lg"
                className="w-full justify-center"
                onClick={closeAll}
              >
                Book Consultation
              </CutButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
