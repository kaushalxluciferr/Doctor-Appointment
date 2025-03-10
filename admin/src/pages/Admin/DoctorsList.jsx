import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {

 const {doctors,adminToken,fetchDoctor,changeAvailibility} =useContext(AdminContext)



 //if we have admin token then we will get all the doctors list
useEffect(()=>{
if(adminToken)
{
  fetchDoctor()
}
},[adminToken])



  return (
    <div className='m-5 max-h-[90vh] overflow-x-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full  flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-55 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-500' src={item.image} />
              <div className='p-4'>
                <p className='text-neutral-50 text-lg font-medium'>{item.name}</p>
                <p className='text-white text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailibility(item._id)} type="checkbox" checked={item.available} />
                  <p className='ml-1'>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default DoctorsList
