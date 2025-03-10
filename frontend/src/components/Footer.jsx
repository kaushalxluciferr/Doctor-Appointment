import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      {/* left part */}
      <div>
<img src={assets.logo} className='mb-5 w-40' alt="" />
<p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi doloremque voluptate natus, dicta praesentium voluptatem blanditiis quasi soluta veritatis accusantium?</p>
      </div>
      {/* center */}
      <div>
<p className='text-xl font-medium mb-5'>Company</p>
<ul className='flex flex-col gap-2 text-blue-600 cursor-pointer'>
    <li>Home</li>
    <li>About us</li>
     <li>Contact Us</li>
     <li>Privacy Policy</li>
</ul>
      </div>
      {/* right aprt */}
      <div>
<p className='text-xl font-medium mb-5'>Get In Touch</p>
<ul className='flex flex-col gap-2 text-blue-600'>
    <li>+09836778968</li>
    <li>abc@gmail.com</li>
</ul>
      </div>
        </div>
<div>
    <hr />
    <p className='py-5 text-sm text-center'>Copyright 2024@ kaushal- All Right Reserved</p>
</div>
    </div>
  )
}

export default Footer
