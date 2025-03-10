import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import {toast} from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

function AddDoctor() {

  const {backendUrl,adminToken}=useContext(AdminContext)

  const [image,setimage]=useState(false)
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState('')
  const [experience,setexperience]=useState("1 Year")
  const [fees,setfees]=useState('')
  const [about,setabout]=useState('')
  const [speciality,setspeciality]=useState('General Physician')
  const [degree,setdegree]=useState("")
  const [address1,setaddress1]=useState('')
  const [address2,setaddress2]=useState('')


  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
      if(!image) {
        return toast.error("please select image")
      }
      const formData=new FormData()
      formData.append("image",image)
      formData.append("name",name)
      formData.append("email",email)
      formData.append("password",password)
      formData.append("experience",experience)
      formData.append("fees",Number(fees))
      formData.append("about",about)
      formData.append("speciality",speciality)
      formData.append("degree",degree)
      formData.append("address",JSON.stringify({line1:address1,line2:address2}))


      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{
        headers:{
          token:adminToken
        }
      })
      if(data.success)
      {
        toast.success(data.message)
        setabout('')
        setaddress1("")
        setaddress2("")
        setdegree("")
        setemail("")
        setexperience("1 Year")
        setfees("")
        setimage(false)
        setname("")
        setpassword("")
        setspeciality("General Physician")

      }
else{
  toast.error(data.message)
}
    }catch(error)
    {
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={handlesubmit}  className='m-5 w-full'>
<p className='mb-3 text-lg font-medium'>Add Doctors</p>
<div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[82vh] overflow-y-scroll text-black'  >
  <div className='flex items-center gap-4 mb-2 text-gray-500'>
    <label htmlFor='doc-img'> <img src={ image? URL.createObjectURL(image): assets.upload_area} className='w-16 bg-gray-100 rounded-full cursor-pointer' alt="" /></label>
   <input onChange={(e)=>setimage(e.target.files[0])}  type="file" id='doc-img' hidden />
   <p>Upload doctor <br /> picture</p>
  </div>
<div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
  <div className='w-full lg:flex-1 flex flex-col gap-4'>
    <div className='flex-1 flex flex-col gap-1'>
      <p>Your Name</p>
      <input  onChange={(e)=>setname(e.target.value)} value={name} className='border px-2 py-1 rounded' type="text" placeholder='Enter Your name' required />
    </div>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Doctor Email</p>
      <input value={email} onChange={(e)=>setemail(e.target.value)} className='border px-2 py-1 rounded' type="email" placeholder='Enter Email' required />
    </div>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Password</p>
      <input value={password} onChange={(e)=>setpassword(e.target.value)} className='border px-2 py-1 rounded' type="password" placeholder='Enter password' />
    </div>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Doctor Experience</p>
      <select value={experience} onChange={(e)=>setexperience(e.target.value)} className='border px-2 py-1 rounded' >
        <option value='1 Year'>1 Year</option>
        <option value='2 Year'>2 Year</option>
        <option value='3 Year'>3 Year</option>
        <option value='4 Year'>4 Year</option>
        <option value='5 Year'>5 Year</option>
        <option value='6 Year'>6 Year</option>
        <option value='7 Year'>7 Year</option>
        <option value='8 Year'>8 Year</option>
        <option value='9 Year'>9 Year</option>
        <option value='10 Year'>10 Year</option>
      </select>
    </div>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Fees</p>
      <input value={fees} onChange={(e)=>setfees(e.target.value)} className='border px-2 py-1 rounded' type="number" placeholder='Enter Fees' />
    </div>
  </div>
  <div className='w-full lg:flex-1 flex flex-col gap-4'>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Speciality</p>
      <select value={speciality} onChange={(e)=>setspeciality(e.target.value)} className='border px-2 py-1 rounded' >
        <option value="General physician">General physician</option>
        <option value="Gynecologist">Gynecologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Pediatricians">Pediatricians</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
      </select>
    </div>
    <div  className='flex-1 flex flex-col gap-1'>
      <p>Educational:</p>
      <input value={degree} onChange={(e)=>setdegree(e.target.value)} className='border px-2 py-1 rounded' type="text" placeholder='Enter Your Detail' />
    </div>

    <div  className='flex-1 flex flex-col gap-1'>
      <p>ADDRESS</p>
      <input value={address1} onChange={(e)=>setaddress1(e.target.value)} className='border px-2 py-1 rounded' type="text" placeholder='Address1' name="" id="" /> <br />
      <input value={address2} onChange={(e)=>setaddress2(e.target.value)} className='border px-2 py-1 rounded' type="text" placeholder='Address2' name="" id="" />
    </div>
  </div>
</div>
<div >
    <p className='mt-2 mb-2'>About Doctor:</p>
    <textarea value={about} onChange={(e)=>setabout(e.target.value)} className='w-full px-4 h-[100px] pt-2 border rounded-md' placeholder='write about doctor' required/>
</div>
  <button type='submit' className='bg-[#5F6FFF] p-3 rounded-full text-white font-semibold mt-2'>Add Doctor</button>

</div>
    </form>
  )
}

export default AddDoctor
