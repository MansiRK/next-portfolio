import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <div className='bg-black xl:py-16 xl:px-30 lg:py-14 lg:px-26 md:py-14 md:px-14 py-16 px-8 w-full items-center'>
        <div className='xl:flex lg:flex md:flex block w-full justify-between mb-2 items-start'>
  <div className='xl:w-[70%] lg:w-[70%] md:w-[70%] w-full xl:mb-0 lg:mb-0 md:mb-0 mb-6 xl:flex lg:flex md:flex block justify-between items-start'>
    <div className='xl:w-[50%] lg:w-[50%] md:w-[50%] w-full flex flex-col justify-center items-start pe-[30px]'>
<div className='group cursor-pointer text-start inline-block'>
        <h2 className='xl:text-[45px] lg:text-[35px] md:text-[28px] text-[20px] uppercase inline-block font-base tracking-[3px] leading-tight relative before:absolute before:bottom-[4px] before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>About</h2>
        </div>

        <div className='group cursor-pointer text-start inline-block'>
        <h2 className='xl:text-[45px] lg:text-[35px] md:text-[28px] text-[20px] uppercase inline-block font-base tracking-[3px] leading-tight relative before:absolute before:bottom-[4px] before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Experience</h2>
        </div>

        <div className='group cursor-pointer text-start inline-block'>
        <h2 className='xl:text-[45px] lg:text-[35px] md:text-[28px] text-[20px] uppercase inline-block font-base tracking-[3px] leading-tight relative before:absolute before:bottom-[4px] before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Skills</h2>
        </div>
    </div>


         <div className='xl:w-[50%] lg:w-[50%] md:w-[50%] w-full flex flex-col justify-center items-start pe-[30px]'>
         <div className='group cursor-pointer text-start inline-block'>
        <h2 className='xl:text-[45px] lg:text-[35px] md:text-[28px] text-[20px] uppercase inline-block font-base tracking-[3px] leading-tight relative before:absolute before:bottom-[4px] before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Projects</h2>
        </div>

        <div className='group cursor-pointer text-start inline-block'>
        <h2 className='xl:text-[45px] lg:text-[35px] md:text-[28px] text-[20px] uppercase inline-block font-base tracking-[3px] leading-tight relative before:absolute before:bottom-[4px] before:w-px before:h-[2px] before:bg-transparent group-hover:before:bg-white group-hover:before:h-[2px] group-hover:before:w-full before:transition-all before:duration-500 before:ease-in-out'>Contact</h2>
        </div>
    </div>
         
      </div>
      <div className='xl:w-[30%] lg:w-[30%] md:w-[30%] w-full flex justify-start'>
        <h5 className='xl:text-[25px] lg:text-[20px] md:text-[18px] font-light text-start leading-tight mt-[5px]'>Virar, Mumbai, Maharashtra</h5>
      </div>
        </div>
    

      <div >
        <a href="mailto:kamblemansi1110@gmail.com" className='xl:text-[80px] lg:text-[60px] md:text-[40px] sm:text-[30px] text-[25px] font-base underline leading-base'>kamblemansi1110@gmail.com</a>
      </div>

      <div className='w-full flex justify-evenly mt-6'>
        <div className='w-[60%]'>
            <p className='text-[16px] font-extralight tracking-wide'>© 2026 All Rights Reserved</p>
        </div>

         <div className='w-[40%]'>
            <div className='flex justify-end items-center'>
                <div className='group relative h-[30px] w-[30px] overflow-hidden cursor-pointer mx-2'>
                 <FontAwesomeIcon icon={faGithub} className="text-[24px] me-8 relative top-0 left-1/2 -translate-x-1/2 group-hover:-top-[100%] transition-all duration-500 ease-in-out "/>
                 <FontAwesomeIcon icon={faGithub} className="text-[24px] me-8 absolute top-[170%] left-1/2 -translate-x-1/2 group-hover:top-0 transition-all duration-500 ease-in-out "/>

                </div>

                <div className='group relative h-[30px] w-[30px] overflow-hidden cursor-pointer mx-2'>
                 <FontAwesomeIcon icon={faLinkedin} className="text-[24px] me-8 relative top-0 left-1/2 -translate-x-1/2 group-hover:-top-[100%] transition-all duration-500 ease-in-out "/>
                 <FontAwesomeIcon icon={faLinkedin} className="text-[24px] absolute top-[170%] left-1/2 -translate-x-1/2 group-hover:top-0 transition-all duration-500 ease-in-out "/>

                </div>

                <div className='group relative h-[30px] w-[30px] overflow-hidden cursor-pointer mx-2'>
                 <FontAwesomeIcon icon={faInstagram} className="text-[24px] me-8 relative top-0 left-1/2 -translate-x-1/2 group-hover:-top-[100%] transition-all duration-500 ease-in-out "/>
                 <FontAwesomeIcon icon={faInstagram} className="text-[24px] me-8 absolute top-[170%] left-1/2 -translate-x-1/2 group-hover:top-0 transition-all duration-500 ease-in-out "/>

                </div>

                </div>
        </div>
      </div>

    </div>
  )
}

export default Footer
