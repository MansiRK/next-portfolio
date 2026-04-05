import React from 'react'
import Hero from '../components/Home.tsx/Hero'
import Mission from '../components/Home.tsx/Mission'
import About from '../components/Home.tsx/About'
import Skills from '../components/Home.tsx/Skills'

const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Mission/>
      <About/>
      <Skills/>
    </div>
  )
}

export default HomePage
