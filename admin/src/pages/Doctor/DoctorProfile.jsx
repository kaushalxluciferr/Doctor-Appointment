import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function DoctorProfile() {

const [isEdit,setisEdit]=useState(false)

const {backendUrl,doctorToken,setprofileData,fetchProfile,profileData}=useContext(DoctorContext)
useEffect(()=>{
if(doctorToken)
{
  fetchProfile()
}
},[doctorToken])

console.log(profileData);

const updateProfile=async()=>{
  try{
const updateData={
  address:profileData.address,
  fees:profileData.fees,
  available:profileData.available
}
const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{
  doctortoken:doctorToken
}})
if(data.success)
{
  toast.success(data.message)
  setisEdit(false)
  fetchProfile()
}else{
  toast.error(data.message)
}
  }catch(error)
  {
toast.error(error.message)
  }
}


  return profileData&&(
    <div className=''>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-[#5F6FFF]/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1  border border-stone-100 rounded-lg p-8 py-7 text-black  bg-white'>
          <p className='flex items-center gap-2 font-bold '>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 '>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button  className='py-0.5 px-2 border text-xs rounded-full '>{profileData.experience}</button>
          </div>
          {/* doc about */}
          <div >
            <p className='mt-2'>About:</p>
            <p className='flex items-center gap-1 tetx-sm font-medium mt-0 '></p>
            <p className='text-sm max-w-[700px] mt-1'>{profileData.about}</p>
          </div>
          <p className='text-fuchsia-700 font-medium mt-4'>
            Appointment Fee: <span className='border p-1 rounded-md'>{isEdit? <input className='' type="number" value={profileData.fees} onChange={(e)=>setprofileData(prev=>({...prev,fees:e.target.value}))} /> : profileData.fees}</span> 
          </p>
          <div className='flex gap-2 py-2'>
            <p>Address:</p> 
            <p>{isEdit? <input type="text" value={profileData.address.line1} onChange={(e)=>setprofileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} />  : profileData.address.line1 }</p>
            <p>{isEdit ? <input type="text" value={profileData.address.line2} onChange={(e)=>setprofileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} /> :profileData.address.line2}</p>
          </div>
          <div className='flex  gap-1 pt-2 mt-02'>
            <input onChange={()=>isEdit && setprofileData(prev=>({...prev,available:!prev.available}))}checked={profileData.available} type="checkbox" />
            <label htmlFor="" className=''>Available</label>
          </div>
          {
            isEdit? <button onClick={updateProfile}     className='hover:text-white rounded-md mt-2 w-full hover:bg-[#5F6FFF] px-4 py-1 border border-[%5F6FFF] text-sm rounded-full]'>Save</button>:
            <button onClick={()=>setisEdit(true)} className='hover:text-white rounded-md mt-2 w-full hover:bg-[#5F6FFF] px-4 py-1 border border-[%5F6FFF] text-sm rounded-full]'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
