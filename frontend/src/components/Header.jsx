import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div  className='flex mt-4 flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* left side */}
<div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
<p className='text-xl md:text-2xl lg:text-3xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment<br />
With Tristed Doctors</p>
<div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
    <img src={assets.group_profiles} className='w-20' alt="" />
    <p>Lorem ipsum, dolor sit amet <br className='hidden sm:block' /> consectetur adipisicing elit. Tempore, ex!</p>
</div>
<a href="#speciality" className='bg-white flex gap-2 p-2 rounded-[12px] m-auto hover:scale-105 transition-all duration-300 text-md'>
    Book Appointment <img src={assets.arrow_icon} className='w-4' alt="" />
</a>

</div>
{/* right side */}
<div className='w-1/2 relative '>
<img src={assets.header_img}  className='w-full md:absolute bottom-0 h-auto rounded-lg' alt="" />
</div>
    </div>
  )
}

export default Header
