import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AppContext=createContext()

const AppContextProvider=(props)=>{

const backendUrl=import.meta.env.VITE_BACKEND_URL
const [doctors,setdoctors]=useState([])
const [userData,setUserData]=useState(false)

const [userToken,setuserToken]=useState(localStorage.getItem("userToken")||false)

// get all doctors data 
const fetchDoctor=async()=>{
    try{
const {data}=await axios.get(backendUrl+"/api/doctor/list")
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

useEffect(()=>{
fetchDoctor()
},[])


// get user data
const fetchUserData=async()=>{
    try{
const {data}=await axios.get(backendUrl+'/api/user/getuser',{
    headers:{
        usertoken:userToken
    }
})
if(data.success)
{
    setUserData(data.user)
}else{
    toast.error(data.message)
}

    }catch(error)
    {
        toast.error(error.message)
    }
}

useEffect(()=>{
if(userToken)
{
    fetchUserData()
}
},[userToken])

    const value={
doctors,backendUrl,userToken,setuserToken,
userData,setUserData,fetchUserData,fetchDoctor
    }

    return (
        <AppContext.Provider value={value}> 
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider