import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecognitionTicker from "./components/RecognitionTicker";
import FindYourPath from "./components/FindYourPath";
import Programs from "./components/Programs";
import TransformationJourney from "./components/TransformationJourney";
import AcdyOnAdvantage from "./components/AcdyOnAdvantage";
import FeaturedAIProgram from "./components/FeaturedAIProgram";
import UniversityNetwork from "./components/UniversityNetwork";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Lazy-load heavy components to split the bundle
const IntroExperience = lazy(() => import("./components/IntroExperience"));
const GlobalMap = lazy(() => import("./components/GlobalMap"));

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("acdyon_intro_seen");
    }
    return true;
  });

  const [ready, setReady] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(sessionStorage.getItem("acdyon_intro_seen"));
    }
    return false;
  });

  const done = () => {
    sessionStorage.setItem("acdyon_intro_seen", "true");
    setShowIntro(false);
    setReady(true);
  };

  return (
    <main id="top" className="bg-paper text-ink font-inter overflow-x-hidden">
      {showIntro && (
        <Suspense fallback={null}>
          <IntroExperience onComplete={done} />
        </Suspense>
      )}
      <div className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navbar />
        <Hero />
        <RecognitionTicker />
        <FindYourPath />
        <Programs />
        <TransformationJourney />
        <AcdyOnAdvantage />
        <FeaturedAIProgram />
        <Suspense fallback={<div className="h-[600px] bg-paper2" />}>
          <GlobalMap />
        </Suspense>
        <UniversityNetwork />
        <Process />
        <FAQ />
        <Contact />
        <Footer />
        <Chatbot />
      </div>
    </main>
  );
}