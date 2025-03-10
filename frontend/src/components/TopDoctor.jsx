import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function TopDoctor() {
const navigate=useNavigate()

const {doctors} =useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 md:mx-10 text-gray-700'>
      <h1 className='text-2xl font-medium'>Top Doctos to Book</h1>
      <p className='sm:w-1/3 text-sm text-center '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, deleniti.</p>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 pt-5 w-full gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0,10).map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-md overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img src={item.image} className='bg-blue-50' alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      {
                        item.available?
                      <>  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p></>
                        :
                        <>  <p className='w-2 h-2 bg-red-500 rounded-full'></p><p className='text-red-500'>Not Available</p></>

                      }
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-[#5F6FFF] px-12 py-3 rounded-full text-white font-bold hover:bg-blue-100 hover:text-black duration-500'>More</button>
    </div>
  )
}

export default TopDoctor
