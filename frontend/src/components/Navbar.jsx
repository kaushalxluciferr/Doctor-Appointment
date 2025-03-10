import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Navbar() {
 const navigate=useNavigate()

 const [showMenu,setshowMenu]=useState(false)
const {userToken,setuserToken}=useContext(AppContext)


const logout=()=>{
  setuserToken('')
  localStorage.removeItem('userToken')
}

  return (
    <div className='flex items-center justify-between text-sm py-4 px-4 rounded-md border-b border-b-gray-400 bg-gradient-to-t from-blue-300 to-red-200'>
        <img onClick={()=>navigate('/')} src={assets.logo} className='w-40 cursor-pointer' alt="" />
      <ul className='hidden md:flex items-start gap-5 font-medium '>
        <NavLink to={'/'}  className={'px-2 rounded-md'}>
            <li className='py-1'>Home</li> 
        </NavLink>
        <NavLink className={'px-2 rounded-md'} to={'/doctors'}>
            <li className='py-1'>All Doctors</li>
        </NavLink>
        <NavLink className={'px-2 rounded-md'} to={'/about'}>
            <li className='py-1'>About</li>
        </NavLink>
        <NavLink className={'px-2 rounded-md'} to={'/contact'}>
            <li className='py-1'>Contact</li> 
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {userToken ?
    <div className='flex items-center gap-2 cursor-pointer group relative'>
        <img src={assets.profile_pic} className='w-10 rounded-full' alt="" />
        <img src={assets.dropdown_icon} className='w-3' alt="" />

        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
            <div className='bg-stone-100 shadow p-3 rounded-[12px]'>
                <p onClick={()=>navigate('/myprofile')} className='border-b mb-1 hover:text-blue-400'>Profile</p>
                <p onClick={()=>navigate('/my-appointments')} className='border-b mb-1 hover:text-blue-400'>Appointment</p>
                <p onClick={logout} className='border-b mb-1 hover:text-blue-400'>Logout</p>
            </div>
        </div>
    </div>:
    <button onClick={()=>navigate('/login')} className='text-white px-8 py-3 rounded-full font-light hidden md:block bg-black '>Create Account</button>
    }
    <img onClick={()=>setshowMenu(true)} src={assets.menu_icon} className='w-6 md:hidden'  />
<div className={` ${showMenu?"fixed w-full/2":'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
  <div className='flex items-center justify-between px-5 py-6'>
    <img className='w-30' src={assets.logo} alt="" />
    <img className='w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt="" />
  </div>
  <div className='flex items-center  flex-col bg-gray-300 '>
    <NavLink onClick={()=>setshowMenu(false)} className={'mt-1 w-full text-center border-b'} to={'/'}>Home</NavLink>
    <NavLink onClick={()=>setshowMenu(false)} className={'mt-1 w-full text-center border-b'} to={'/doctors'}>All Doctors</NavLink>
    <NavLink onClick={()=>setshowMenu(false)} className={'mt-1 w-full text-center border-b'} to={'/about'}>About us</NavLink>
    <NavLink onClick={()=>setshowMenu(false)} className={'mt-1 w-full text-center mb-2 border-b'} to={'/contact'}>Contact</NavLink>
  </div>
</div>

      </div>
    </div>
  )
}

export default Navbar
