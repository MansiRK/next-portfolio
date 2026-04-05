"use client"

import React, { useState } from 'react'

const Navbar = () => {

    const [openNavbar, setOpenNavbar] = useState(false)

    const handleOpenNavbar = () => {
        setOpenNavbar(!openNavbar)
    }

  return (
    <>
    <div className='w-full flex fixed top-0 right-0 items-center justify-end z-50'>
        <button className='h-full text-end flex  group cursor-pointer p-8  z-50' onClick={handleOpenNavbar}>{openNavbar ? "close" : "menu" } <span className='flex flex-col justify-center items-center'><span className={`h-[2px] w-[40px] bg-white ms-4 ${openNavbar ? "rotate-45" : "rotate-0" } transition-all duration-500 ease-in-out`}></span><span className={`h-[2px] w-[40px] bg-white ms-4 ${openNavbar ? "-rotate-45 mt-[0px]" : "rotate-0 mt-[5px]"} transition-all duration-500 ease-in-out group-hover:mt-[0.5pxg]`}></span></span></button>

      <div
  className={`fixed left-0 top-0 w-full h-screen bg-black z-10 flex xl:flex-row lg:flex-row md:flex-row flex-col justify-center items-center transition-transform duration-500 ease-in-out
    ${openNavbar ? "translate-y-0" : "-translate-y-full"}`}
><div className='xl:w-[50%] lg:w-[50%] md:w-[50%] w-full xl:mb-0 lg:mb-0 md:mb-0 mb-8'>
      <img src="./images/navbar-1.webp" alt="navbar-1" className='w-full h-full [clip-path:polygon(0_0,90%_0%,100%_100%,0%_100%)] object-cover' />
    </div>
    <div className='xl:w-[50%] lg:w-[50%] md:w-[50%] w-full flex flex-col justify-start items-center ps-[30px]'>
        <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Home</h2>
        </div>

         <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>About</h2>
        </div>

         {/* <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Experience</h2>
        </div> */}

         <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Skills</h2>
        </div>

         <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Projects</h2>
        </div>

         <div className='group w-full cursor-pointer mb-[10px] text-start inline-block'>
        <h2 className='xl:text-[48px] lg:text-[40px] md:text-[35px] text-[30px] uppercase inline-block font-[500] xl:leading-[72px] leading-tight xl:tracking-[6px] tracking-wider relative before:absolute before:bottom-0 before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Contact</h2>
        </div>
    </div>
    </div>
    </div>
    
    </>

    
   
  )
}

export default Navbar
