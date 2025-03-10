import React from 'react'
import { assets } from '../assets/assets'

function About() {

  return (
    <div>
  <div className='text-center text-2xl pt-10 text-gray-700 font-black'>
    <p>About Us</p>
    </div> 

    <div className='flex flex-col sm:flex-row gap-12 my-10 '>
<div>
<img src={assets.about_image} className='w-fullmd:,ax-w-[360px]' alt="" />
</div>
<div className='flex flex-col justify-center gap-6 text-red-500 '>
<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae repudiandae veniam doloremque minus at magnam nesciunt placeat deleniti aspernatur praesentium?</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, doloribus similique ipsum minima consequatur totam eius ab accusamus labore nulla!</p>
<b className='text-black font-black'>Our Vision</b>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error minima placeat quam expedita maxime, dolor molestias? Minus amet tempore tenetur!</p>
</div>
    </div>
    <div className='text-xl my-4 text-center'>
<p className='text-gray-700 font-bold'>Why to Choose Us</p>
    </div>

<div className='flex flex-col sm:flex-row gap-5'>
  <div className=' px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5  border text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all text-gray-500 cursor-pointer duration-500'>
<b>Efficiency</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quasi repellendus at, placeat et nulla?</p>
  </div>
  <div className=' px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5  border text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all text-gray-500 cursor-pointer duration-500'>
    <b>Proficiency</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus minus reiciendis delectus saepe quas rem.</p>
  </div>
  <div className=' px-10 md:px-16 py-8 sm-py-16 flex flex-col gap-5  border text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all text-gray-500 cursor-pointer duration-500'>
<b>Convenience</b>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, blanditiis ea exercitationem ad odio, harum adipisci doloribus sequi quaerat necessitatibus accusantium vitae, veniam numquam praesentium qui mollitia. Non, vitae sit.</p>
  </div>
</div>

    </div>
  )
}

export default About
