import React from 'react'
import Hero from './sections/Hero'
import ShowcaseSection from './sections/ShowcaseSection'
import Navbar from './components/Navbar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'
import AboutSection from './sections/AboutSection'

const App = () => {
  return (
    <>
    <Navbar/>
    <Hero />
    <LogoSection/>
    <AboutSection/>
    <ExperienceSection/>
    <FeatureCards/>
    <ShowcaseSection/>
    </>
  )
}

export default App