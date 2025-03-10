import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import {useNavigate} from 'react-router-dom'
function DoctorDashboard() {

  const {doctorToken,dashData,setdashData,doctorDashboard}=useContext(DoctorContext)
const navigate=useNavigate()
  useEffect(()=>{
if(doctorToken)
{
  doctorDashboard()
}
  },[doctorToken])

  console.log(dashData);
  
  return dashData && (
    <div className='m-5 sm:p-20'>
   
   <div className='animate-bounce sm:block text-[#5F6FFF] text-center text-xs sm:text-2xl bg-red-100 sm:p-1 rounded-2xl mb-10'>
    <h1> Welcome to my Admin Page</h1>
   </div>
         <div className='flex flex-wrap gap-3'>
           <div className='flex items-center bg-[#5F6FFF] gap-2 min-w-52 p-4 rounded border-2 cursor-pointer border-gray-100 hover:scale-105 transition-all'>
             <img className='w-14' src={assets.appointments_icon} alt="" />
             <div className='flex gap-2 text-lg font-bold'>
               <p>{dashData.appointment}</p>
               <p>appointment</p>
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
             <img className='w-14' src={assets.earning_icon} alt="" />
             <div className='flex gap-2 text-lg font-bold'>
               <p>{dashData.earning}</p>
               <p>Earnings</p>
             </div>
           </div>
           
         </div>
         <div className='text-center mt-4'>
         <button onClick={()=>navigate("/doctor-Appointment")} className='bg-[#5F6FFF] text-xl rounded-2xl p-2'> My Appointment</button>
         </div>
       </div>
  )
}

export default DoctorDashboard


