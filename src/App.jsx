// App.jsx
import React, { useState } from 'react';
import Preloader from './components/Preloader';

import Hero from './sections/Hero';
import ShowcaseSection from './sections/ShowcaseSection';
import Navbar from './components/Navbar';
import LogoSection from './sections/LogoSection';
import FeatureCards from './sections/FeatureCards';
import ExperienceSection from './sections/ExperienceSection';
import AboutSection from './sections/AboutSection';
import TechStack from './sections/TechStack';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CrosshairCursor from './components/CrosshairCursor';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
    <CrosshairCursor/>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <LogoSection />
          <AboutSection />
          <FeatureCards />
          <ExperienceSection />
          <TechStack />
          <ShowcaseSection />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
