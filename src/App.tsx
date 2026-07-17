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
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        {/* Organisation logique : Contexte, Objectifs, Actions, Résultats */}
        <ProjectFlow />
        <Overview />
        <Architecture />
        <StepTimeline />
        <TerraformSection />
        <ConfigTable />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
