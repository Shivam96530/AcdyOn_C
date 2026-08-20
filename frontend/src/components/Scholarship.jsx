import { motion } from "framer-motion";
import { useState } from "react";
import CutButton from "./CutButton";
import { Calculator } from "lucide-react";

export default function Scholarship() {
  const [experience, setExperience] = useState("");
  const [showEstimate, setShowEstimate] = useState(false);

  const handleEstimate = () => {
    setShowEstimate(true);
  };

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-ink rounded-xl flex items-center justify-center">
                <Calculator className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Scholarship Calculator</h2>
                <p className="text-zinc-500">Discover your indicative scholarship</p>
              </div>
            </div>

            <p className="text-zinc-600 mb-8">
              Tell us a little about your profile to receive an indicative estimate.
              Final scholarship confirmed after eligibility review.
            </p>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                Years of Professional Experience
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["0-4 years", "5-9 years", "10-14 years", "15+ years"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setExperience(option)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 border-2 ${
                      experience === option
                        ? "border-ink bg-ink text-white"
                        : "border-zinc-200 hover:border-ink"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Current intake</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Corporate sponsored</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Referral</span>
              </label>
            </div>

            <CutButton
              href="#contact"
              variant="solid-accent"
              size="lg"
              className="w-full md:w-auto"
            >
              Estimate My Scholarship
            </CutButton>

            {showEstimate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-zinc-50 rounded-xl"
              >
                <p className="text-zinc-600">
                  Based on your profile, you may be eligible for an indicative scholarship.
                  Please book a consultation for a personalized assessment.
                </p>
                <CutButton href="#contact" variant="outline" size="sm" className="mt-4">
                  Book Consultation
                </CutButton>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
