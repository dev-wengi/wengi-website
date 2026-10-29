import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { LearningPaths } from './sections/LearningPaths'
import { Projects } from './sections/Projects'
import { HowItWorks } from './sections/HowItWorks'
import { Faqs } from './sections/Faqs'
import { Contact } from './sections/Contact'
import { FooterSection } from './sections/Footer'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[var(--text-black,#0A0A0A)] flex flex-col selection:bg-[var(--green-highlight,#6CF05A)] selection:text-black">
      {/* Section 1: Sticky Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero />

        {/* Learning paths and coding challenges */}
        <LearningPaths />

        {/* Projects */}
        <Projects />

        {/* How to get started */}
        <HowItWorks />

        {/* Frequently asked questions */}
        <Faqs />

        {/* Contact and newsletter */}
        <Contact />
      </main>

      {/* Footer with pixel field, editorial content, and links */}
      <FooterSection />
    </div>
  )
}

export default App
