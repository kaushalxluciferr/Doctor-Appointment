import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
function Appointment() {

  const {adminToken,appointments,fetchAllAppointment,backendUrl}=useContext(AdminContext)
  console.log(appointments);

const cancelAppointment=async(id)=>{
  try{
const {data} =await axios.post(backendUrl+'/api/admin/cancel-appointment',{id},{headers:{
  token:adminToken
}})
if(data.success)
{
  fetchAllAppointment()
  toast.success("cancelled successfully")
}
  }catch(error)
  {
    toast.error(error.message)
  }
}



  
useEffect(()=>{
if(adminToken)
{
  fetchAllAppointment()
}else{
  toast.error("Login Please😁❤️")
}
},[adminToken])



  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm text-black max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>DOB</p>
          <p className='ml-2'>Doctor</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {
          appointments.map((item,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center  py-3 px-6 border-b hover:bg-[#5F6FFF] hover:text-white '>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className='w-10 rounded-full' alt="" />
              <p>{item.userData.name}</p>
              </div>
              <p className='mr-1'>{item.userData.dob}</p>
              <div className='flex items-center'>
                <img src={item.docData.image} className='w-12 rounded-full ml-1' alt="" />
              <p className='ml-2 '>{item.docData.name}</p>
              </div>
              <p className=''>{item.slotDate} | {item.slotTime} </p>
              <p>${item.docData.fees}</p>
              <div>
             {
              item.cancelled? <p className='bg-violet-500 text-lg rounded-lg  text-white p-1.5'>Cancelled</p>
              : <button 
              onClick={()=>cancelAppointment(item._id)}
              className='bg-red-500 text-lg  hover:bg-gray-600 text-white p-1.5 rounded-full'>cancel</button>
             }
              </div>
            </div>

          ))
        }
      </div>
      
    </div>
  )
}

export default Appointment
