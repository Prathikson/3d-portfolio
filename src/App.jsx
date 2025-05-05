import React from 'react'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection'
import Navbar from './components/Navbar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'
import AboutSection from './sections/AboutSection'
import TechStack from './sections/TechStack'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'

const App = () => {
  return (
    <>
    <Navbar/>
    <Hero />
    <LogoSection/>
    <AboutSection/>
    <FeatureCards/>
    <ExperienceSection/>
    <TechStack/>
    <ShowcaseSection/>
    <Testimonials/>
    <Contact/>
    
    </>
  )
}

export default App