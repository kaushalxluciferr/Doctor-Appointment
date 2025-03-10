import React from 'react'
import { assets } from '../assets/assets'

function Contact() {
  return (
    <div>
      <div className='text-2xl py-2 text-center'>
        <p className='text-gray-700 font-semibold'>Contact Us</p>
      </div>
<div className='my-8 flex flex-col justify-center  md:flex-row gap-10 mb-28  text-sm '>
<img src={assets.contact_image} className='w-full md:max-w-[340px]' alt="" />


<div className='flex flex-col justify-center items-start gap-6 '>
  <p className='font-semibold text-lg text-gray-700'>Our Office</p>
  <p className='text-gray-600'>54709 willms station <br />suite 350,washington,USA</p>
  <p className='text-gray-600'>Tel:(415) 555-1023 <br />Email:abc@gmailcom</p>
  <p className='text-gray-600 font-semibold text:lg'>currers at previwume</p>
  <p className='text-gray-500'>Learn More about about our team and</p>
  <button className='bg-black p-2 rounded-full text-white font-bold hover:bg-white hover:text-black hover:border'>Explore Jobs</button>
</div>

</div>
    </div>
  )
}

export default Contact
