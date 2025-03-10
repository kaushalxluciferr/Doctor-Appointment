import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import Appointment from './pages/Admin/Appointment'
import DoctorsList from './pages/Admin/DoctorsList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointment from './pages/Doctor/DoctorAppointment'
import DoctorProfile from './pages/Doctor/DoctorProfile'
function App() {

const {adminToken}=useContext(AdminContext)
const {doctorToken}=useContext(DoctorContext)

  return adminToken||doctorToken ? (
    <div className=''>
<Navbar/>
<div className='flex items-start'>
  <Sidebar/>
  <Routes>
    {/* admin Route part */}
    <Route path='/' element={<></>}/>
    <Route path='/admin-dashboard' element={<AdminDashboard/>} />
    <Route path='/add-doctors' element={<AddDoctor/>}/>
    <Route path='/all-appintments' element={<Appointment/>}/>
    <Route path='/doctorlist' element={<DoctorsList/>}/>

{/* doctor route part */}

<Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
<Route path='/doctor-Appointment' element={<DoctorAppointment/>}/>
<Route path='/doctor-profile' element={<DoctorProfile/>}/>

  </Routes>
</div>
      <ToastContainer position='bottom-right'/>
    </div>
  ):(
    <>
      <Login/>
<ToastContainer position='bottom-right'/>

    </>
  )
}

export default App
