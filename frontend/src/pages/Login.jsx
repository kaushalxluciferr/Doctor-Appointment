import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [state,setstate]=useState('signup')

  const [email,setemail]=useState("")
  const [name,setname]=useState("")
  const [password,setpassword]=useState("")
const navigate=useNavigate()
     const {backendUrl,setuserToken}=useContext(AppContext)
console.log(state);

const handlesubmit=async(e)=>{
e.preventDefault()
try{

  if(state==="signup")
  {
    const {data}=await axios.post(backendUrl+"/api/user/signup",{name,email,password})
    if(data.success)
      {
      setuserToken(data.token)
      localStorage.setItem("userToken",data.token)
      
      navigate('/')
      toast.success("signup successfull")
    }else{
      toast.error(data.message)
    }
  }
  else{
    const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
    if(data.success)
    {
      console.log(data.token);
      setuserToken(data.token)
      localStorage.setItem("userToken",data.token)
      toast.success("login successfull")
      navigate('/')
    }
    else{
      toast.error(data.message)
    }
  }
}catch(error)
{
toast.error(error.message)
}

}

  return (
<form  className='min-h-[80vh] flex items-center' onSubmit={handlesubmit}>
  <div className='flex flex-col gap-2 m-auto items-start p-6 min-w-[340px] sm:min-w-96 border rounded-lg text-zinc-600 text-sm shadow-lg '>
    <p className=' text-center font-semibold text-2xl'>{state==="signup"?"Create an Account":"Login Here"}</p>
    <p className=''>{state==="signup"?"Signup to book Appointment":"Login to book appointment"}</p>
    {
      state==="signup"?
<div className='w-full'>
  <p >Full Name</p>
  <input className='rounded w-full border border-zinc-300 p-2 mt-1 ' type="text" onChange={(e)=>setname(e.target.value)} value={name} placeholder='Enter Your Name' required  />
</div>
     :null 
    }
<div className='w-full'>
  <p>Email</p>
  <input className='rounded w-full border border-zinc-300 p-2 mt-1 ' type="email" onChange={(e)=>setemail(e.target.value)} value={email} placeholder='Enter Your Email' required  />
</div>
<div className='w-full'>
  <p>Password</p>
  <input className='rounded w-full border border-zinc-300 p-2 mt-1 ' type="password" onChange={(e)=>setpassword(e.target.value)} value={password} placeholder='Enter Your password' required  />
</div>
<button  type='submit' className='m-auto bg-[#5F6FFF] text-white text-md w-full mt-1 font-black rounded p-2'>{state==='signup'?"Sign Up ":"Login"}</button>
{state==='signup'? <p className='text-[14px]'>Already have An Account <span className='text-red-500 cursor-pointer' onClick={()=>setstate("login")}>Login Here</span></p>: <p>Want to create Account <span onClick={()=>setstate("signup")} className='text-red-400 cursor-pointer'> Signup here</span></p> }
  </div>
</form>
  )
}

export default Login
