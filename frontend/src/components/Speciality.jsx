import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

function Speciality() {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-700'>
      <h1 className='text-2xl font-medium text-[#5F6FFF]'>Search Doctor by Speciality</h1>
      <p className=' sm-1/3 text-sm text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, eius!</p>
      <div className='flex sm:justify-center pt-5 w-full overflow-scroll gap-4'>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0 )} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/doctors/${item.speciality}`}>
                <img src={item.image} className='w-16 sm:w-20 mb-2' alt="" />
                <p className='text-[#5F6FFF]'>{item.speciality}</p>
            
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Speciality
