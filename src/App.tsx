import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectFlow from "./components/ProjectFlow";
import Overview from "./components/Overview";
import Architecture from "./components/Architecture";
import StepTimeline from "./components/StepTimeline";
import TerraformSection from "./components/TerraformSection";
import ConfigTable from "./components/ConfigTable";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

export default function App() {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        {/* Organisation logique structurée selon STAR : Contexte, Objectifs, Actions, Résultats */}
        <ProjectFlow lang={lang} />
        <Overview lang={lang} />
        <Architecture lang={lang} />
        <StepTimeline lang={lang} />
        <TerraformSection lang={lang} />
        <ConfigTable lang={lang} />
        <Skills lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
