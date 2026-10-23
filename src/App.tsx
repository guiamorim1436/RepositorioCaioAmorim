import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroCanvasSection } from './components/HeroCanvasSection';
import { PresentationSection } from './components/PresentationSection';
import { VehicleOverview } from './components/VehicleOverview';
import { SpecsSection } from './components/SpecsSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07080a] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Cinematic Scroll-Driven Canvas Section */}
        <HeroCanvasSection />

        {/* Presentation Section */}
        <PresentationSection />

        {/* Engineering & Bento Details */}
        <VehicleOverview />

        {/* Technical Specs Comparison */}
        <SpecsSection />

        {/* Demonstration Call To Action */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
