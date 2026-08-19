import { useEffect, useState } from "react";
import IntroExperience from "./components/IntroExperience";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecognitionTicker from "./components/RecognitionTicker";
import FindYourPath from "./components/FindYourPath";
import Programs from "./components/Programs";
import TransformationJourney from "./components/TransformationJourney";
import AcdyOnAdvantage from "./components/AcdyOnAdvantage";
import FeaturedAIProgram from "./components/FeaturedAIProgram";
import GlobalMap from "./components/GlobalMap";
import UniversityNetwork from "./components/UniversityNetwork";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("acdyon_intro_seen")) {
      setShowIntro(false);
      setReady(true);
    }
  }, []);

  const done = () => {
    sessionStorage.setItem("acdyon_intro_seen", "true");
    setShowIntro(false);
    setReady(true);
  };

  return (
    <main id="top" className="bg-paper text-ink font-inter overflow-x-hidden">
      {showIntro && <IntroExperience onComplete={done} />}
      <div className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navbar />
        <Hero />
        <RecognitionTicker />
        <FindYourPath />
        <Programs />
        <TransformationJourney />
        <AcdyOnAdvantage />
        <FeaturedAIProgram />
        <GlobalMap />
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