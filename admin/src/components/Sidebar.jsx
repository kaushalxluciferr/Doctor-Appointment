import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
function Sidebar() {

const {adminToken}=useContext(AdminContext)
const {doctorToken}=useContext(DoctorContext)


  return (
    <div className='min-h-screen bg-white'>
       {
        adminToken && <ul className='text-[#515151]  mt-5'>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 text-white border-black":""}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden sm:block'>DashBoard</p>
           </NavLink>
           <NavLink to={'/add-doctors'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 text-white border-black":""}`} >
            <img src={assets.add_icon} alt="" />
            <p  className='hidden sm:block'>Add Doctors</p>
           </NavLink>
           <NavLink to={'/all-appintments'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 border-black text-white":""}`}>
            <img src={assets.appointment_icon} alt="" />
            <p  className='hidden sm:block'>Appointment</p>
           </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 border-black text-white":""}`} to={'/doctorlist'}>
            <img src={assets.people_icon} alt="" />
            <p  className='hidden sm:block'>Doctors List</p>
           </NavLink>


        </ul>
       }   
        {
        doctorToken && <ul className='text-[#515151]  mt-5'>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 text-white border-black":""}`} to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden sm:block'>DashBoard</p>
           </NavLink>
           <NavLink to={'/doctor-Appointment'} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 border-black text-white":""}`}>
            <img src={assets.appointment_icon} alt="" />
            <p  className='hidden sm:block'>Appointment</p>
           </NavLink>
           <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:mx-9 md:min-w-40 cursor-pointer rounded-2xl ${isActive?"bg-[#5F6FFF] px-1 border-r-4 border-black text-white":""}`} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt="" />
            <p  className='hidden sm:block'>My Profile</p>
           </NavLink>


        </ul>
       }        
    </div>
  )
}

export default Sidebar
