import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "../data/content";

export default function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="bg-paper2 py-24">
      <div className="mx-auto max-w-[1000px] px-5 md:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">FAQ</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
            Questions professionals ask before choosing AcdyOn
          </h2>
        </div>

        <div className="mt-14 border-t border-black/15">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div key={faq.question} className="border-b border-black/15">
                <button
                  onClick={() => setActive(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium tracking-[-0.025em] md:text-xl">
                    {faq.question}
                  </span>
                  {isOpen ? <Minus size={19} /> : <Plus size={19} />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-6 text-sm leading-7 text-black/60 md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
