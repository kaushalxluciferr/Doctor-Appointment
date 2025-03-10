import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Profile() {
  const {userData,setUserData,backendUrl,fetchUserData,userToken} =useContext(AppContext)
  const [isEdit,setisEdit]=useState(false)
  const [image,setimage]=useState(false)
  

const updateUserProfile=async()=>{
  try{
const formData=new FormData()

formData.append("name",userData.name)
formData.append("phone",userData.phone)
formData.append("address",JSON.stringify(userData.address))
formData.append("dob",userData.dob)
formData.append("gender",userData.gender)

if(image)
{
  formData.append("image",image)
}

const {data}=await axios.post(backendUrl+'/api/user/updateprofile',formData,{headers:{
  usertoken:userToken
}})

if(data.success)
{
  await fetchUserData()
  setimage(false)
  setisEdit(false)
  toast.success(data.message)
}else{
  toast.error(data.message)
}

  }catch(error)
  {
    toast.error(error.message)
  }
}





  return userData && (
    <div className='max-w-lg flex flex-col gap-2 mt-5 text-sm'>
      {
        isEdit?
        <label htmlFor="image" className='cursor-pointer'>
          <div>
            <img className='w-30 rounded-lg' src={image?URL.createObjectURL(image):userData.image}  />
          </div>
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" name="" id="image" hidden />
        </label>:
      <img className='w-30 rounded-lg' src={userData.image} alt="" />
      }
      {isEdit
      ?<input className='bg-gray-50 text-2xl font-medium max-w-60 mt-4 ' type="text" value={userData.name} onChange={(e)=>setUserData(prev=>({...prev,name:e.target.value}))}   />
:
<p className='font-medium text-2xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div >
        <p className= 'sm:text-xl text-neutral-500 underline mt-1'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-1 text-neutral-700'>
          <p className='font-medium'>Email: </p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
{isEdit?
<input type="text" className='bg-gray-100 max-w-52' onChange={(e)=>setUserData(prev=>({...prev,phone:e.target.value}))} value={userData.phone} />
:
<p className='text-blue-500'>{userData.phone}</p>
}

<p className='font-medium'>Address</p>
{
  isEdit? <p>
<input type="text" className='bg-gray-50' onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} /><br />
<input type="text" className='bg-gray-50' value={userData.address.line2} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} />

  </p>
  :
  <p className='text-gray-500'>
    {userData.address.line1} <br /> {userData.address.line2}
  </p>
}

        </div>
      </div>

<div>
  <p className='sm:text-xl text-neutral-500 underline'>Basic Information</p>
  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
    <p className='font-medium'>Gender: </p>
    {
      isEdit?
      <select className='max-w-20 bg-gray-300' value={userData.gender} onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      :
      <p className='text-gray-400'>{userData.gender}</p>
    }
<p className='font-medium'>BirthDate:</p>
{
  isEdit? <input className='max-w-28 bg-gray-300' type="date" value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))} />
  :
  <p className='text-gray-400'>{userData.dob}</p>
}
  </div>
</div>

<div className='mt-1'>
  {
    isEdit?
    <button className='border p-3 bg-black text-white rounded-full' onClick={updateUserProfile}>Save Info</button>
    :
    <button className='border p-3 bg-black text-white rounded-full' onClick={()=>setisEdit(true)}>Edit Info</button>
  }
</div>
    </div>
  )
}

export default Profile
