import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Button from "./Button";

const questions = [
  {
    id: "goal",
    question: "What are you looking to achieve?",
    options: [
      "Executive Advancement",
      "AI & Future Skills",
      "Doctoral Research",
      "Professional Recognition",
      "Corporate Capability"
    ]
  },
  {
    id: "role",
    question: "Which best describes you?",
    options: [
      "C-Suite Executive",
      "Founder / Entrepreneur",
      "Senior Professional",
      "Consultant / Advisor",
      "Researcher / Educator",
      "Specialist / Domain Expert"
    ]
  },
  {
    id: "priority",
    question: "What matters most right now?",
    options: [
      "Academic credibility",
      "Career advancement",
      "Leadership capability",
      "AI capability",
      "Global positioning",
      "Research contribution"
    ]
  }
];

const pathwayResults = {
  "Executive Advancement": {
    title: "Executive Doctoral Pathway",
    reasons: [
      "Designed around experienced professionals",
      "Applied research orientation",
      "Flexible structure",
      "Academic advancement"
    ]
  },
  "AI & Future Skills": {
    title: "AI & Automation Mastery",
    reasons: [
      "Industry-leading AI curriculum",
      "Hands-on projects",
      "Career-focused outcomes",
      "Expert mentorship"
    ]
  },
  "Doctoral Research": {
    title: "Research Doctorate (PhD)",
    reasons: [
      "Original research contribution",
      "Academic publication support",
      "Global supervisor network",
      "Flexible research timeline"
    ]
  },
  "Professional Recognition": {
    title: "Honorary Recognition Pathway",
    reasons: [
      "Recognition for achievement",
      "Professional distinction",
      "Global credibility",
      "Streamlined process"
    ]
  },
  "Corporate Capability": {
    title: "Corporate Training Program",
    reasons: [
      "Custom organizational learning",
      "Team-wide capability building",
      "AI & digital transformation",
      "Leadership development"
    ]
  }
};

export default function FindYourPath() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const result = pathwayResults[answers.goal] || pathwayResults["Executive Advancement"];

  return (
    <section className="py-24 bg-white" id="find-path">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Path</h2>
            <p className="text-xl text-zinc-600">
              Tell us where you want to go. We'll help you understand the path.
            </p>
          </motion.div>

          {!showResult ? (
            <div className="bg-zinc-50 rounded-2xl p-8 md:p-12">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-zinc-500 mb-2">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                    className="h-full bg-acdyon-black"
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-semibold mb-6">
                  {questions[currentStep].question}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {questions[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`p-4 rounded-xl text-left transition-all duration-200 border-2 ${
                        answers[questions[currentStep].id] === option
                          ? "border-acdyon-black bg-acdyon-black text-white"
                          : "border-zinc-200 hover:border-acdyon-black hover:bg-zinc-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        <ArrowRight size={18} className="opacity-50" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-50 rounded-2xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-acdyon-black rounded-full flex items-center justify-center">
                  <Check className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">YOUR PATH</p>
                  <h3 className="text-3xl font-bold">{result.title}</h3>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-zinc-600 mb-4">Why it may fit:</p>
                <ul className="space-y-3">
                  {result.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={20} className="text-acdyon-black mt-0.5 flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" className="flex-1">
                  Explore Pathway
                </Button>
                <Button variant="secondary" size="lg" className="flex-1">
                  Book Consultation
                </Button>
              </div>

              <button
                onClick={handleReset}
                className="mt-6 text-sm text-zinc-500 hover:text-acdyon-black underline"
              >
                Start Over
              </button>

              <p className="mt-4 text-xs text-zinc-400">
                * This is an indicative pathway suggestion. Final admissions decisions 
                are made by partner institutions after eligibility review.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
