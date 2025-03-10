import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets'
function AdminDashboard() {
  const { backendUrl,adminToken,dashData,fetchDashboardData}=useContext(AdminContext)



  useEffect(()=>{
if(adminToken)
{
  fetchDashboardData()
}
  },[adminToken])

console.log(dashData);


  return dashData && (
    <div className='m-5 sm:p-20'>

<div className='animate-bounce sm:block text-[#5F6FFF] text-center text-xs sm:text-2xl bg-red-100 sm:p-1 rounded-2xl mb-10'>
 <h1> Welcome to my Admin Page</h1>
</div>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center bg-[#5F6FFF] gap-2 min-w-52 p-4 rounded border-2 cursor-pointer border-gray-100 hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div className='flex gap-2 text-lg font-bold'>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>
        <div  className='flex items-center bg-[#5F6FFF] gap-2 min-w-52 p-4 rounded border-2 cursor-pointer border-gray-100 hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div className='flex gap-2 text-lg font-bold'>
            <p>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
        <div  className='flex items-center bg-[#5F6FFF] gap-2 min-w-52 p-4 rounded border-2 cursor-pointer border-gray-100 hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div className='flex gap-2 text-lg font-bold'>
            <p>{dashData.appointments}</p>
            <p>Appointment</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default AdminDashboard
