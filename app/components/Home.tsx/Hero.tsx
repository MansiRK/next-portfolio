"use client";
import Button from "../Button";

const Hero = () => {

  return (
    <>
     <section className='hero-section xl:p-25 lg:p-20 md:p-20 p-8 w-full h-full relative '>
         <div className='hero-lines top-0 left-0 absolute flex justify-around items-center w-full h-full bg-transparent z-[10]'>
        <div className='relative w-px h-full bg-[#ffffff19]'>
            <div className='p-square opacity-[0.7] absolute xl:left-[0.5px] lg:left-[0.2px] w-px h-[10vh]'></div>
        </div>

        <div className='relative w-px h-full bg-[#ffffff19]'>
            <div className='p-square opacity-[0.7] absolute xl:left-[0.5px] lg:left-[0.2px] w-px h-[10vh]'></div>
        </div>

        <div className='relative w-px h-full bg-[#ffffff19]'>
            <div className='p-square opacity-[0.7] absolute xl:left-[0.5px] lg:left-[0.2px] w-px h-[10vh]'></div>
        </div>

        <div className='relative w-px h-full bg-[#ffffff19]'>
            <div className='p-square opacity-[0.7] absolute xl:left-[0.5px] lg:left-[0.2px] w-px h-[10vh]'></div>
        </div>

        <div className='relative w-px h-full bg-[#ffffff19]'>
            <div className='p-square opacity-[0.7] absolute xl:left-[0.5px] lg:left-[0.2px] w-px h-[10vh]'></div>
        </div>
    </div>
      <div className='w-full flex xl:flex-row lg:flex-row flex-col-reverse py-16 justify-between relative z-[10]'>
        <div className='xl:w-[50%] lg:w-[50%] w-full xl:mt-0 lg:mt-0 mt-10'>
            <div className='flex xl:mb-16 lg:mb-16 mb-8'><img src="./images/title-icon.svg" alt="icon-title" className='w-[24px] h-[24px] object-cover me-[24px]' /><h6 className='text-[#adb5bd] text-[18px] tracking-[10px] leading-base uppercase'>Hello!</h6></div>

            <h1 className='text-white xl:text-[145px] lg:text-[100px] md:text-[80px] text-[40px] font-semibold xl:leading-[0.8] lg:leading-[0.8] md:leading-[0.9] leading-tight mt-6 mb-4 uppercase'>My name is Mansi Kamble</h1>
            
            <h6 className='uppercase xl:text-[18px] lg:text-[16px] md:text-[16px] text-[14px] font-base leading-tight xl:mt-16 lg:mt-16 md:mt-10 xl:me-16 md:mt-10 mt-8 lg:me-10 md:me-8'>A Full-Stack MERN Developer with experience in building responsive and scalable web applications. Skilled in React, Next.js, Node.js, and modern UI practices. Driven by clean code, good design, and meaningful user experiences.</h6>

            {/* <div className='mt-10'>
                <a href="/" className='border border-white rounded-[28px] px-6 py-3 inline-block text-[19px] leading-base'>More About Me</a>
            </div> */}

            <Button text='More About Me' href='#about'/>
        </div>
        <div className='xl:w-[50%] lg:w-[50%] w-full flex items-center justify-center'>
            <img src="./images/hero-img.webp" className='xl:w-[600px] lg:w-[400px] xl:h-[600px] lg:h-[400px] object-cover rounded-full z-[10]' alt="" />
        </div>
      </div>
    </section>
    
   
    </>
   
  )
}

export default Hero
