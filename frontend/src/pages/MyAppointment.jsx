import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function MyAppointment() {

  const [appointment,setappointment]=useState([])

 const {userToken,backendUrl,fetchDoctor}=useContext(AppContext)


 const getuserAllAppointment=async()=>{
  try{
const {data}=await axios.get(backendUrl+"/api/user/appointment",{headers:{usertoken:userToken}})
if(data.success)
{
  setappointment(data.appointment.reverse())
}else{
  toast.error(data.message)
}
  }catch(error)
  {
    toast.error(error.message)
  }
 }

 useEffect(()=>{
if(userToken)
{
  getuserAllAppointment()

}
 },[userToken])



 const cancelAppointment=async(id)=>{
  try{
const {data} =await axios.post(backendUrl+'/api/user/delete-Appointment',{id},{headers:{usertoken:userToken}})
if(data.success)
{
  toast.success(data.message)
  getuserAllAppointment()
  fetchDoctor()
}
  }catch(error)
  {
    toast.error(error.message)
  }
 }



 const payonline=()=>{
  alert("this feature will be available soon")
 }

 console.log(appointment);
 
  return (
    <div>
      <div className='text-center'>
      <p className='text-zinc-800 border-b font-medium mt-10 pb-2'>My Appointments</p>
      </div>
      <div>
        {appointment.map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b' key={index}>
            <div>
              <img className='w-28 bg-gray-100 rounded-lg' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='font-semibold text-neutral-800'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-800 font-medium mt-1'>Address</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'>Date: {item.slotDate} </p>
              <p className='text-xs mt-1'>Time: {item.slotTime} </p>
            </div>
            <div>

            </div>
            <div className='flex flex-col justify-end gap-4'>
              {
                item.cancelled?<p className='text-red-600 border p-1 rounded-xl'>This asspointment is canceled</p>:
                item.isCompleted? <p className='text-green-700 border p-1 rounded-xl'>Appointment Completed</p>:
                <>
                <button className='bg-green-400  p-1 rounded-xl   cursor-pointer' onClick={payonline}>Pay Online</button>
              <button className='bg-red-400 text-white p-1 rounded-xl  cursor-pointer' onClick={()=>cancelAppointment(item._id)}>Cancel</button>
                </>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointment
