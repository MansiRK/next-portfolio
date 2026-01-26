'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Mission = () => {
  const textRef = useRef(null)

  useEffect(() => {
    const textEl = textRef.current
    if (!textEl) return

    const fullText = textEl.innerText
    textEl.innerText = '' // clear initially

    // GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textEl,
        start: 'top 90%', // when top of element hits 80% of viewport
        end: 'bottom 10%', // end point
        scrub: 0.5, // smooth scrubbing
        toggleActions: 'play reverse play reverse',
      }
    })

    // Typing effect
    tl.to({}, { // dummy tween to allow typing
      duration: 1, // duration of typing
      onUpdate: function () {
        const progress = this.progress()
        const chars = Math.floor(fullText.length * progress)
        textEl.innerText = fullText.substring(0, chars)
      },
      ease: 'none',
    })
  }, [])

  return (
    <section className='mission-section relative h-screen flex justify-center items-center'>
      <div className='p-[40px] relative text-center z-[10] flex flex-col justify-center items-center'>
        <h3
          ref={textRef}
          className='px-16 uppercase text-[35px] leading-[35px] font-base text-white'
        >
          Our mission is simple: to empower brands and businesses with compelling design and marketing solutions that leave a lasting impact. We believe that every project is an opportunity to make the ordinary extraordinary.
        </h3>
      </div>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden z-[1]'>
        <video src="./videos/1044-142621375_large.mp4" muted autoPlay loop className='h-full w-full object-cover opacity-[0.7]'></video>
      </div>
    </section>
  )
}

export default Mission
