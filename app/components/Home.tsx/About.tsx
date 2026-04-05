"use client"

import React, { useEffect, useRef } from 'react'
import Counter from './Counter'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


const About = () => {

const experienceText = useRef<HTMLHeadingElement | null>(null)

useEffect(() => {
  if (!experienceText.current) return

  const chars = experienceText.current.querySelectorAll(".char")

  gsap.fromTo(
    chars,
    { color: "#343a40" },
    {
      color: "#ffffff",
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: experienceText.current,
        start: "top 90%",
        end: "top 10%",
        scrub: true,
        toggleActions
: "play reverse play reverse",
      },
    }
  )
}, [])

  return (
    <section id="about" className='relative about-section xl:p-25 lg:p-20 md:p-20 p-8'>
        <div className='relative'>
            <h2 className='text-[48px] font-[600] uppercase -tracking-[5px]'>About Me</h2>
            <div className='flex justify-center mt-[48px]'>
                <p className='xl:w-[50%] lg:w-[50%] md:w-[60%] w-full text-[26px] xl:mt-[48px] lg:mt-[40px] mt-0 leading-[40px] -tracking-[1px] font-extralight text-[#adb5bd]'>I’m a Full-Stack MERN Developer with 2+ years of experience building responsive, scalable web applications. I enjoy turning complex problems into clean, user-friendly solutions.</p>
            </div>

           <h2
  ref={experienceText}
  className="text-[32px] md:text-[48px] lg:text-[60px]
leading-[38px] md:leading-[52px] lg:leading-[60px] font-light xl:mt-[144px] lg:mt-[100px] md:mt-[100px] mt-[54px] mb-[24px] uppercase text-[#343a40]"
>
  {"I’ve worked on multiple full-stack projects involving REST APIs, authentication, dashboards, and real-time features. My experience includes collaborating with designers, backend teams, and deploying production-ready applications."
    .split(" ")
    .map((word: string, wordIndex: number) => (
      <span
        key={wordIndex}
        className="word inline-block whitespace-nowrap mr-[0.25em]"
      >
        {word.split("").map((char: string, charIndex: number) => (
          <span
            key={charIndex}
            className="char inline-block whitespace-pre"
          >
            {char}
          </span>
        ))}
      </span>
    ))}
</h2>


        </div>

       <Counter/>
      <svg id="mySVG" className='h-auto w-screen top-[-100px] left-[50px] absolute -z-[1]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1504.2 1318.3">
                            <path className="cls-1" d="M267.9,0V287.2c0,83.78,67.92,151.7,151.7,151.7h457.2c83.78,0,151.7,67.92,151.7,151.7h0c0,83.78-67.92,151.7-151.7,151.7H251.7c-83.78,0-151.7,67.92-151.7,151.7v1.6c0,83.78,67.92,151.7,151.7,151.7H2336.35" fill="none" stroke="rgba(33,37,41,0.376)" strokeMiterlimit={10} strokeWidth={150} strokeDashoffset={0} strokeDasharray="4647.3642578125" />
                        </svg>
    </section>
  )
}

export default About
