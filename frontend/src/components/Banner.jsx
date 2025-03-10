import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {
const navigate=useNavigate()

  return (
    <div className='flex bg-[#5F6FFF] px-6 sm:px-14 lg:px-12 my-20 md:mx-10 rounded-lg '>
      {/* text section */}
  <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
    <div className='text-md sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white'>
        <p>Book appointment</p>
        <p className='ml-4 mt-2'> with 100+ trusted Doctors</p>
    </div>
    <button onClick={()=>{navigate("/login"); scrollTo(0,0)}} className='bg-white p-1 cursor-pointer hover:bg-black hover:text-white sm:p-3 mt-2 rounded-[12px] font-bold'>Create Account</button>
  </div>

{/* banner image section */}
<div className='hidden md:block md:w-1/2 lg:w-[300px] relative'>
<img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" />
</div>
    </div>
  )
}

export default Banner
