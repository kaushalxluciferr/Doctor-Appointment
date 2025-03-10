import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext=createContext()


const AdminContextProvider=(prop)=>{

const [adminToken,setadminToken]=useState(localStorage.getItem('atoken')? localStorage.getItem('atoken'):'')
const backendUrl=import.meta.env.VITE_BACKEND_URL
const [doctors,setdoctors]=useState([])
const [appointments,setappointments]=useState([])
const [dashData,setDashdata]=useState(false)
// get list of all doctors
const fetchDoctor=async()=>{
        try{
        const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{
            headers:{
                token:adminToken                
            }
            })
           if(data.success)
           {
            setdoctors(data.doctors)    
           }else{
            toast.error(data.message)
           }
       }catch(error)
        {
        toast.error(error.message)    
        }
    }




 // change availinility 
 const changeAvailibility=async(docId)=>{
try{
const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{
    token:adminToken
}})
if(data.success)
{    
    toast.success("Updated sucessfully")
    fetchDoctor()   //when the avalibility is changed we get  
}
else{
    toast.error(data.message)
}

}catch(error)
{
    toast.error(error)
}
}




const fetchAllAppointment=async()=>{
    try{
const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{
    token:adminToken
}})
if(data.success)
{
    setappointments(data.appointment)
}
    }catch(error)
    {
        toast.error(error.message)
    }
}



const fetchDashboardData=async()=>{
    try{
const {data}=await axios.get(backendUrl+"/api/admin/dashboard-data",{
    headers:{token:adminToken}
})
if(data.success)
{
    setDashdata(data.dashData)
}
    }catch(error)
    {
        toast.error(error.message)
    }
}




const value={
adminToken,setadminToken,backendUrl,doctors,fetchDoctor,
changeAvailibility,appointments,setappointments,fetchAllAppointment,
fetchDashboardData,dashData
    }
    return (
        <AdminContext.Provider value={value}>
            {prop.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider