import React from 'react'
import { SiteNavbar } from './components/SiteNavbar'
import { Hero } from './sections/Hero'
import { Vision } from './sections/Vision'
import { LearningPaths } from './sections/LearningPaths'
import { Projects } from './sections/Projects'
import { ProcessPath } from './sections/ProcessPath'
import { Faqs } from './sections/Faqs'
import { Contact } from './sections/Contact'
import { FooterSection } from './sections/Footer'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[var(--text-black,#0A0A0A)] flex flex-col selection:bg-[var(--green-highlight,#6CF05A)] selection:text-black">
      <SiteNavbar />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero />

        <Vision />

        {/* Learning paths and coding challenges */}
        <LearningPaths />

        {/* Projects */}
        <Projects />

        {/* How to get started */}
        <ProcessPath />

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
