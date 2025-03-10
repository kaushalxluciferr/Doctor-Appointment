import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'

function Login() {

    
    const [state,setstate]=useState('Admin')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    
    const {setadminToken,backendUrl}=useContext(AdminContext)

const {doctorToken,setdoctorToken}=useContext(DoctorContext)

const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
       if(state==='Admin')
       {
        const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password}) 
        if(data.success)
        {
            localStorage.setItem("atoken",data.token)
            setadminToken(data.token)
            toast.success("login successfully")
        }
        else{
            toast.error(data.message)
        }
    }
    else{
        const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
        if(data.success)
        {
            localStorage.setItem("doctorToken",data.token)
            toast.success("Doctor Login Successfull")
            setdoctorToken(data.token)
        }else{
            toast.error(data.message)
        }
    }
    }catch(error)
    {
toast.error(error?.data.message)
    }
}


  return (
   <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[300px] sm:min-w-96 border rounded-xl  text-sm shadow-lg '>
        <p className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'>{state}</span> Login</p>
        <div className='w-full'>
            <p>Email:</p>
            <input onChange={(e)=>setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded-md w-full p-2 mt-1' type="email" placeholder='Enter Your Email' required />
        </div>
        <div className='w-full'>
            <p>Passowrd:</p>
            <input onChange={(e)=>setpassword(e.target.value)} value={password} className='border border-[#DADADA] rounded-md w-full p-2 mt-1' type="passowrd" placeholder='Enter Your Password' required />
        </div>
        <button className='bg-[#5F6FFF] p-2 m-auto w-full mt-1 text-lg font-black rounded-xl'>Login</button>
        {
            state==="Admin"?
            <p className='text-md'>Doctor Login -? <span onClick={()=>setstate("Doctor")} className='text-red-400 cursor-pointer'>Click here</span> </p>
            :
            <p className='text-md'>Admin Login -?<span onClick={()=>setstate("Admin")} className='text-red-400 cursor-pointer'> Click here</span> </p>
        }
    </div>
   </form>
  )
}

export default Login
