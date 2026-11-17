import React from 'react'
import { Hero } from '../sections/Hero'
import { Vision } from '../sections/Vision'
import { Projects } from '../sections/Projects'
import { ProcessPath } from '../sections/ProcessPath'
import { Faqs } from '../sections/Faqs'
import { Contact } from '../sections/Contact'
import { usePageTitle } from '../components/ScrollManager'

export const Home: React.FC = () => {
  usePageTitle('Dev.wengi | Learn to code by building')

  return (
    <>
      <Hero />
      <Vision />
      <Projects />
      <ProcessPath />
      <Faqs />
      <Contact />
    </>
  )
}

export default Home
