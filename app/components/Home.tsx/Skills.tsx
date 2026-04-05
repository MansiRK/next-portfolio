"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import SkillModel from '../SkillModel'

import dynamic from 'next/dynamic';
import ServerCanvas from '../SkillsCanvas/ServerCanvas';

const DesktopCanvas = dynamic(() => import('@/app/components/SkillsCanvas/DesktopCanvas'), { ssr: false });

const SkillRow = ({ title, type }: any) => (
  <div className="flex items-center gap-16 mb-24">
    <SkillModel type={type} />
    <h2 className="text-[72px] font-medium text-white">{title}</h2>
  </div>
)

const Skills = () => {

return (
    <section
      id="skills"
      className="relative skills-section xl:p-25 lg:p-20 md:p-20 p-8"
    >
      <div className=" mb-16">
        <img
          src="./images/title-icon.svg"
          alt="icon-title"
          className="w-[24px] h-[24px] me-[24px]"
        />
        <h6 className="text-[#adb5bd] text-[18px] tracking-[10px] uppercase">
          Skills
        </h6>

         <div className="skill-div group flex items-center justify-start relative p-[48px] cursor-pointer overflow-hidden duration-1000 border-[#222222] border-b w-full">
          <div className='w-[30%] relative'>
          <DesktopCanvas/>

          </div>

            <div className="w-[70%] flex flex-col justify-center items-start ps-[48px]">
              <h2 className="text-[72px] font-medium text-white">Frontend</h2>
              <p className="text-[#adb5bd] max-w-[700px]">
                We believe in the power of visual storytelling...
              </p>
            </div>

          </div>

          <div className="skill-div group flex items-center justify-start relative p-[48px] cursor-pointer overflow-hidden duration-1000 border-[#222222] border-b w-full">
          <div className='w-[30%] relative'>
          <ServerCanvas/>

          </div>

            <div className="w-[70%] flex flex-col justify-center items-start ps-[48px]">
              <h2 className="text-[72px] font-medium text-white">Backend</h2>
              <p className="text-[#adb5bd] max-w-[700px]">
                We believe in the power of visual storytelling...
              </p>
            </div>

          </div>

      </div>

    </section>
  )
}

export default Skills