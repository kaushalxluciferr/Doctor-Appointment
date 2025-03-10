import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

function DoctorAppointment() {

const {doctorToken,cancelAppointment,completeAppointment,fetchAppointment,appointments}=useContext(DoctorContext)

useEffect(()=>{
if(doctorToken)
{
  fetchAppointment()
}
},[doctorToken])

console.log(appointments);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm text-black max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>DOB</p>
          <p className='sm:ml-4'>payment</p>
          <p>Date & Time</p>
          <p className='sm:mr-4'>Fees</p>
          <p></p>
          <p className='font-semibold mr-4'>Actions</p>
        </div>
        {
          appointments.reverse().map((item,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center  py-3 px-6 border-b hover:bg-[#5F6FFF] hover:text-white '>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-10 rounded-full' alt="" />
              <p>{item.userData.name}</p>
              </div>
              <p className='mr-1 sm:text-xs sm:font-semibold'>{item.userData.dob}</p>
              <div className='flex items-center'>
               <p className='sm:border-l p-1 sm:ml-4' >{item.payment?"Completed":"Not paid"}</p>
              </div>
              <p className=''>{item.slotDate} | {item.slotTime} </p>
              <p>${item.docData.fees}</p>
              <div>
             {
              item.cancelled? <p className='bg-violet-500 text-lg rounded-lg  text-white p-1.5'>Cancelled</p>
              : item.isCompleted? <p className='bg-violet-500 text-lg rounded-lg  text-white p-1.5'>Completed</p> : <div className='flex gap-2'>
              
              <button 
              onClick={()=>cancelAppointment(item._id)}
              className='bg-red-500 text-lg  hover:bg-gray-600 text-white p-1.5 rounded-full'>cancel</button>
              <button 
              onClick={()=>completeAppointment(item._id)}
              className='bg-green-500 text-lg  hover:bg-gray-600 text-white p-1.5 rounded-full'>Accept</button>
              </div>
             }
              </div>
            </div>

          ))
        }
      </div>
      
    </div>
  )
}

export default DoctorAppointment
