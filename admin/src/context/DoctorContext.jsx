import { createContext, useState } from "react";
import axios from 'axios' 
import {toast} from 'react-toastify'

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const [doctorToken,setdoctorToken]=useState(localStorage.getItem("doctorToken")?localStorage.getItem("doctorToken"):"")
    
    const [appointments,setappointment]=useState([])
    const [dashData,setdashData]=useState(false)
    const [profileData,setprofileData]=useState(false)

    const fetchAppointment=async()=>{
        try{
            const {data}=await axios.get(backendUrl+"/api/doctor/get-appointment",{headers:{
                doctorToken:doctorToken
            }})
            if(data.success)
            {
                setappointment(data.appointment.reverse())
            }else{
                toast.error(data.message)
            }
        }catch(error)
        {
            toast.error(error.message)
        }
    }


    const completeAppointment=async(id)=>{
        try{
const {data}=await axios.post(backendUrl+"/api/doctor/complete-appointment",{id},{headers:{
    doctortoken:doctorToken
}})
if(data.success)
{
    toast.success(data.message)
    fetchAppointment()
}else{
    toast.error(data.message)
}
}catch(error)
        {
            toast.error(error.message)
        }
    }



 const cancelAppointment=async(id)=>{
        try{
const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{id},{headers:{
    doctortoken:doctorToken
}})
if(data.success)
{
    toast.success(data.message)
    fetchAppointment()
}else{
    toast.error(data.message)
}
        }catch(error)
        {
            toast.error(error.message)
        }
    }


// doctor dashboard

const doctorDashboard=async()=>{
    try{
const {data}=await axios.get(backendUrl+'/api/doctor/doctor-dashboard',{headers:{
    doctortoken:doctorToken
}})
if(data.success)
{
    setdashData(data.dashData)
}else{
    toast.error(data.message)
}
    }catch(error)
    {
        toast.error(error.message)
    }
}


// get profile data
const fetchProfile=async()=>{
    try{
const {data}=await axios.get(backendUrl+'/api/doctor/doctor-profile',{headers:{
    doctortoken:doctorToken
}})
if(data.success)
{
    setprofileData(data.doctor)
}
else{
    toast.error(data.message)
}
}catch(error)
    {
        toast.error(error.message)
    }
}


    const value={
doctorToken,setdoctorToken,backendUrl,
appointments,fetchAppointment,setappointment
,completeAppointment,cancelAppointment,doctorDashboard,dashData,setdashData,
fetchProfile,setprofileData,profileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider