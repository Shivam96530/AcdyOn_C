import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import CutButton from "./CutButton";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent-hover transition-colors shadow-xl"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{ boxShadow: "0 4px 20px rgba(200, 69, 31, 0.4)" }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-paper border border-ink/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-ink text-paper p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-paper">AcdyOn Assistant</h3>
                <p className="text-xs text-paper/60">Launching Soon</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-paper/70 hover:text-paper"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-8 h-8 bg-paper2 rounded-full flex items-center justify-center flex-shrink-0">
                  👋
                </div>
                <div className="bg-paper2 border border-ink/10 rounded-2xl rounded-tl-none p-4">
                  <p className="text-sm text-ink/85 mb-3 leading-relaxed">
                    Hello. Our AI-powered assistant is launching soon.
                  </p>
                  <p className="text-sm text-ink/85 mb-4 leading-relaxed">
                    In the meantime, our academic advisors are available for personalised guidance. Book a consultation to discuss your pathway.
                  </p>
                  <CutButton
                    href="#contact"
                    variant="solid-accent"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Consultation
                  </CutButton>
                </div>
              </div>

              {/* Input (Disabled) */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  disabled
                  className="flex-1 px-4 py-3 bg-paper2 border border-ink/10 rounded-full text-sm text-ink disabled:opacity-50"
                />
                <button
                  disabled
                  className="w-12 h-12 bg-ink text-paper rounded-full flex items-center justify-center disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
