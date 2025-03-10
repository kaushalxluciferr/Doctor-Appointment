import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'


function Appointment() {
  
  const {docId}=useParams()
  const {doctors,fetchDoctor,userToken,backendUrl}=useContext(AppContext) 
  const [docSlot,setdocSlot]=useState([])
  const [slotIndex,setslotIndex]=useState(0)
  const [slotTime,setslotTime]=useState('')
   const navigate=useNavigate()
  const days=["SUN","MON","TUE","WED","THU","FRI","SAT"]
const [docInfo,setdocInfo]=useState(null)

//Fetch the single doctor info according to their id  
const getDoctor=async()=>{
  if(doctors &&doctors.length>0)
  {
    const doccInfo=await doctors.find(doc=>doc._id === docId)
    setdocInfo(doccInfo)
  }
}


// get available slot
const getAvailableSlot=async()=>{
setdocSlot([])
// getting  current data
let today=new Date()

for(let i=0;i<7;i++)
{
  // getting date with index
  let currentDate=new Date(today)
  currentDate.setDate(today.getDate()+i)
// setting end time of the date with index

let endTime=new Date()
endTime.setDate(endTime.getDate()+i)
endTime.setHours(21,0,0,0)
// setting hours

if(today.getDate()===currentDate.getDate())
{
  currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
  currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
}else{
  currentDate.setHours(10)
  currentDate.setMinutes(0)
}
let timeSlot=[]
while(currentDate<endTime)
{
 let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) 


 let day=currentDate.getDate()
 let month=currentDate.getMonth()+1
 let year=currentDate.getFullYear()

const slotDate=day+"/"+month+"/"+year

const slotTime=formattedTime

const isSlotAvailable=docInfo.slots_booked[slotDate]&&docInfo.slots_booked[slotDate].includes(slotTime)?false:true
if(isSlotAvailable)
  {
  // add slot t o array
  timeSlot.push({
    datetime:new Date(currentDate),
    time:formattedTime
  })
}
// increment curr time by 30 min
currentDate.setMinutes(currentDate.getMinutes()+30)
}
setdocSlot(prev=>([...prev,timeSlot]))
}
}


const bookAppointment=async()=>{
  if(!userToken)
  {
    toast.warn("Login To Book Appointment")
    navigate("/login")
  }
  try{
const date=docSlot[slotIndex][0].datetime
let day=date.getDate()
let month=date.getMonth()+1  //Jan-1 feb-2 
let year=date.getFullYear()

const slotDate=day+'/'+month+'/'+year
const {data}=await axios.post(backendUrl+'/api/user/bookappointment',{docId,slotDate,slotTime},{
  headers:{
    usertoken:userToken
  }
})
if(data.success)
{
  toast.success("Appointment Booked Succesfull")
  fetchDoctor()
  navigate('/my-appointments')
}
else{
  toast.error(data.message)
}

  }catch(error)
  {
toast.error(error.message)
  }
}

console.log(docId);



// 
useEffect(()=>{
getDoctor()
},[doctors,docId])

useEffect(()=>{
getAvailableSlot()
},[docInfo])

useEffect(()=>{
console.log(docSlot);

},[docSlot])

  return  docInfo &&(
    <div>
      {/* details */}
<div className='flex flex-col sm:flex-row gap-4'>
  <div className='mt-2'>
    <img className='w-full sm:max-w-72 rounded-lg bg-[#5F6FFF]' src={docInfo.image} alt="" />
  </div>
  <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-2'>
    <p className='flex items-center gap-2 text-xl font-medium text-gray-900'>{docInfo.name} <img className='w-4' src={assets.verified_icon} alt="" /></p>
    <div className='flex items-center gap-2 text-xs text-blue-700 font-black'>
      <p>{docInfo.degree} - {docInfo.speciality}</p>
      <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
    </div>
{/* about doctor */}

<div>
  <p className='flex items-center gap-1 text-sm font-medium text-gray-700 mt-3 '>About <img src={assets.info_icon} alt="" /></p>
  <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
</div>
<p className='text-blue-700 font-bold mt-2'>
  Appointment Fee: <span>${docInfo.fees}</span>
</p>

  </div>
</div>

{/* slot booking ui */}

<div className='sm:ml-72 sm:pl-3 my-2 font-medium text-gray-700'>
  <p>Booking slots</p>
  <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
    {
      docSlot.length&&docSlot.map((item,index)=>(
<div onClick={()=>setslotIndex(index)} className={`text-center py-4 min-w-16 rounded-full cursor-pointer ${slotIndex===index?"bg-[#5F6FFF] text-white":"border border-gray-300"}`} key={index}>
<p>{item[0]&&days[item[0].datetime.getDay()]}</p>
<p>{item[0]&& item[0].datetime.getDate()}</p>
</div>
      ))
    }
  </div>
  <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
    {
      docSlot.length &&docSlot[slotIndex].map((item,index)=>(
        <p onClick={()=>setslotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer  ${item.time===slotTime?'bg-[#5F6FFF] text-white':"bg-blue-300 text-white"} `}>
          {item.time.toLowerCase()}
        </p>
      ))
    }
  </div>
  <button className='my-6 py-3 px-14 bg-black text-white rounded-full cursor-pointer hover:bg-[#5F6FFF] color-white' onClick={bookAppointment}>Book An Appointment</button>
</div>
{/* lit of related doctors */}
<RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

    </div>
  )
}

export default Appointment
