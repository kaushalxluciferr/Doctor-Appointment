import React, { createContext, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Appointment from './pages/Appointment'
import MyAppointment from './pages/MyAppointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'
import { AppContext } from './context/AppContext'
function App() {
  const {userToken}=useContext(AppContext)
  console.log(userToken);
  
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        
<Route path='/' element={userToken?<Home/>:<Login/>} />
<Route path='/doctors' element={userToken? <Doctor/>:<Login/>} />
<Route path='/doctors/:speciality' element={userToken?<Doctor/>:<Login/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/myprofile' element={userToken?<Profile/>:<Login/>}/>
<Route path='/my-appointments' element={userToken?<MyAppointment/>:<Login/>}/>
<Route path='/appointment/:docId' element={userToken?<Appointment/>:<Login/>}/>

      </Routes>
<Footer/>  
<ToastContainer position='bottom-right'/>    
    </div>
  )
}

export default App
