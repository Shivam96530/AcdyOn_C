import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight, Mail, Calendar } from "lucide-react";
import CutButton from "./CutButton";

/* ============================================================
   Mega-menu structure
   Programs | Doctoral | Universities | Resources | Contact
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

  Doctoral: {
    width: "double",
    columns: [
      {
        heading: "Doctoral",
        subheading:
          "Doctoral pathways and honorary recognition from globally accredited institutions.",
        chips: ["DBA", "PhD", "Honorary Doctorate"],
        subLinks: [
          "Overview",
          "upGrad: Leadership & AI",
          "upGrad: Doctorate (DBA)",
        ],
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
        ],
      },
      {
        heading: "More pathways",
        subheading:
          "Additional executive doctoral routes and honorary recognition.",
        items: [
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
          {
            title: "Academic Recognition",
            description: "Understanding international positioning and fit.",
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

/* Contact panel — different shape from mega-menus (contact card style) */
const contactPanel = {
  intro: "Talk to an academic advisor. Choose the way that works best for you.",
  primaryActions: [
    {
      icon: Calendar,
      title: "Book a Consultation",
      description: "30-minute call with an academic advisor.",
      href: "#contact",
    },
    {
      icon: Mail,
      title: "admissions@acdyon.com",
      description: "Reply within one working day.",
      href: "mailto:admissions@acdyon.com",
    },
  ],
  offices: [
    { flag: "🇺🇸", country: "United States", phone: "+1 213 534 7859" },
    { flag: "🇬🇧", country: "United Kingdom", phone: "+44 7465 278021" },
    { flag: "🇮🇳", country: "India", phone: "+91 9779914422" },
  ],
};

/* ============================================================
   Mega Menu Dropdown Panel
   ============================================================ */
function MegaMenuPanel({ menuKey, onLinkClick }) {
  const menu = megaMenus[menuKey];
  if (!menu) return null;

  const isDouble = menu.width === "double";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 ${
        isDouble ? "w-[820px]" : "w-[420px]"
      } bg-paper border border-line btn-cut-sm shadow-2xl overflow-hidden`}
      style={{ zIndex: 100 }}
    >
      <div
        className={`grid ${
          isDouble ? "grid-cols-2 divide-x divide-line" : "grid-cols-1"
        }`}
      >
        {menu.columns.map((column) => (
          <div key={column.heading} className="p-6">
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45 font-semibold mb-1">
                {column.heading}
              </p>
              <p className="text-xs text-ink/60 leading-relaxed">
                {column.subheading}
              </p>
            </div>

            {column.chips && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {column.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[10px] font-semibold bg-ink text-paper px-2 py-1 btn-cut-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {column.subLinks && (
              <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 pb-3 border-b border-line">
                {column.subLinks.map((link) => (
                  <a
                    key={link}
                    href="#programs"
                    onClick={onLinkClick}
                    className="text-[11px] text-ink/60 hover:text-accent transition"
                  >
                    {link}
                  </a>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {column.items.map((item) => (
                <a
                  key={item.title}
                  href="#programs"
                  onClick={onLinkClick}
                  className="group block p-3 -mx-3 hover:bg-paper2 transition"
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
      </div>
    </motion.div>
  );
}

/* ============================================================
   Contact Panel (specialized layout, not a standard mega menu)
   ============================================================ */
function ContactMenuPanel({ onLinkClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-0 top-full mt-3 w-[420px] bg-paper border border-line btn-cut-sm shadow-2xl overflow-hidden"
      style={{ zIndex: 100 }}
    >
      <div className="p-6">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45 font-semibold mb-1">
            Contact
          </p>
          <p className="text-xs text-ink/60 leading-relaxed">
            {contactPanel.intro}
          </p>
        </div>

        {/* Primary actions */}
        <div className="space-y-2 mb-5">
          {contactPanel.primaryActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.title}
                href={action.href}
                onClick={onLinkClick}
                className="group flex items-start gap-3 p-3 -mx-3 hover:bg-paper2 transition"
              >
                <span className="mt-0.5 grid h-8 w-8 place-items-center btn-cut-sm bg-ink text-paper shrink-0">
                  <Icon size={14} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink group-hover:text-accent transition leading-tight">
                    {action.title}
                  </p>
                  <p className="text-[11px] text-ink/60 mt-0.5 leading-snug">
                    {action.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-ink/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                />
              </a>
            );
          })}
        </div>

        {/* Global offices */}
        <div className="pt-4 border-t border-line">
          <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45 font-semibold mb-3">
            Global offices
          </p>
          <div className="space-y-2">
            {contactPanel.offices.map((office) => (
              <a
                key={office.country}
                href={`tel:${office.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-between py-1.5 group"
              >
                <span className="flex items-center gap-2 text-sm text-ink/80">
                  <span>{office.flag}</span>
                  <span>{office.country}</span>
                </span>
                <span className="text-[11px] text-ink/55 group-hover:text-accent transition font-mono">
                  {office.phone}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Main Navbar
   ============================================================ */
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null); // key of menu or "Contact"
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
          {/* Home */}
          <a
            href="#top"
            className="px-3 py-2 text-sm text-ink/75 hover:text-ink transition"
          >
            Home
          </a>

          {/* Mega menu triggers */}
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

          {/* Contact trigger with special panel */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter("Contact")}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm transition ${
                openMenu === "Contact" ? "text-ink font-medium" : "text-ink/75 hover:text-ink"
              }`}
              aria-expanded={openMenu === "Contact"}
              aria-haspopup="true"
            >
              Contact
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  openMenu === "Contact" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openMenu === "Contact" && (
                <ContactMenuPanel onLinkClick={closeAll} />
              )}
            </AnimatePresence>
          </div>

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
          Mobile menu (fullscreen overlay)
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

              {/* Nav items */}
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

                {/* Mega menu accordions */}
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
                            <div className="pb-4 space-y-4">
                              {menu.columns.map((column) => (
                                <div
                                  key={column.heading}
                                  className="pl-3 border-l border-paper/15"
                                >
                                  <p className="text-[10px] uppercase tracking-[0.24em] text-paper/45 font-semibold mb-2">
                                    {column.heading}
                                  </p>

                                  {column.chips && (
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                      {column.chips.map((chip) => (
                                        <span
                                          key={chip}
                                          className="text-[10px] font-semibold bg-paper text-ink px-2 py-0.5 btn-cut-sm"
                                        >
                                          {chip}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {column.subLinks && (
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 pb-2 border-b border-paper/10">
                                      {column.subLinks.map((link) => (
                                        <a
                                          key={link}
                                          href="#programs"
                                          onClick={closeAll}
                                          className="text-[11px] text-paper/60 hover:text-paper transition"
                                        >
                                          {link}
                                        </a>
                                      ))}
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    {column.items.map((item) => (
                                      <a
                                        key={item.title}
                                        href="#programs"
                                        onClick={closeAll}
                                        className="block py-1.5"
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
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                {/* Contact accordion for mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-b border-paper/10"
                >
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === "Contact" ? null : "Contact"
                      )
                    }
                    className="w-full flex items-center justify-between py-4 text-xl font-display tracking-tight text-left"
                    aria-expanded={mobileExpanded === "Contact"}
                  >
                    Contact
                    <ChevronDown
                      size={18}
                      className={`text-paper/50 transition-transform duration-200 ${
                        mobileExpanded === "Contact" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === "Contact" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-4 pl-3 border-l border-paper/15">
                          <p className="text-xs text-paper/60 leading-relaxed">
                            {contactPanel.intro}
                          </p>
                          <div className="space-y-3">
                            <a
                              href="#contact"
                              onClick={closeAll}
                              className="block"
                            >
                              <p className="text-sm font-semibold text-paper">
                                Book a Consultation
                              </p>
                              <p className="text-[11px] text-paper/50">
                                30-minute call with an academic advisor
                              </p>
                            </a>
                            <a
                              href="mailto:admissions@acdyon.com"
                              onClick={closeAll}
                              className="block"
                            >
                              <p className="text-sm font-semibold text-paper">
                                admissions@acdyon.com
                              </p>
                              <p className="text-[11px] text-paper/50">
                                Email admissions team
                              </p>
                            </a>
                          </div>
                          <div className="pt-2 space-y-1">
                            {contactPanel.offices.map((office) => (
                              <a
                                key={office.country}
                                href={`tel:${office.phone.replace(/\s/g, "")}`}
                                className="flex items-center justify-between text-xs py-1"
                              >
                                <span>{office.flag} {office.country}</span>
                                <span className="font-mono text-paper/70">{office.phone}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Mobile CTA (fixed bottom) */}
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
