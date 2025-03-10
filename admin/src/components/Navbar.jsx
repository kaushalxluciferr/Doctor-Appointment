import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

function Navbar() {
const {adminToken,setadminToken}=useContext(AdminContext)
const {setdoctorToken}=useContext(DoctorContext)
const logout=()=>
{  
    localStorage.removeItem('aToken')
    localStorage.removeItem("doctorToken")
    setdoctorToken('')
setadminToken('')
}

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-gradient-to-l from-red-200 to-blue-400 '>
      <div className='flex items-center gap-5 text-xs'>
        <img  src={assets.admin_logo} className='w-36 sm:w-40 cursor-pointer' alt="" />
        <p className='text-black border px-2 rounded-lg bg-amber-300 font-bold py-0.5'>{adminToken?"Admin":"Doctor"}</p>
      </div>
      <button onClick={logout} className='bg-[#5F6FFF] p-1.5 rounded-md text-lg cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
