import Doctor from "../model/doctor.js"
import {v2 as cloudinary} from 'cloudinary'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Appointment from "../model/appointment.js"
import User from "../model/user.js"



// Api for Adding Doctor
const addDoctor=async (req,res)=>{
    try{
        const { name,email,password,speciality,degree,
            experience,about,fees,address}=req.body
        const imageFile=req.file
        
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address||!imageFile){
          return res.status(404).json({
            success:false,
            message:"Something is missing"
          })
        }

        if(!validator.isEmail(email))
        {
 return res.json({
    success:false,
    message:"Enter valid EMail"
 })
        }

        if(password.length<8)
        {
            return res.json({
                success:false,
                message:"more than 8 digit pass"
            })
        }
        const hash=await bcrypt.hash(password,10)

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageurl=imageUpload.secure_url
         
         const doctorData={
            name,email,
            image:imageurl,password:hash
            ,speciality,degree,experience,about,fees,address:JSON.parse(address)
         }

         const doctor=new Doctor(doctorData)
await doctor.save()

return res.status(200).json({
    success:true,
    message:"doctor added",
    doctor
})

    }catch(error)
    {
return res.status(500).json({
    success:false,
    message:error.message
})
    }
}

// admin login

const adminLogin=async(req,res)=>{
try{
    const {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD)
    {   
        const token=jwt.sign(email+password,process.env.SECRET)
        return res.status(200).json({
            success:true,
            token
        })
    }
    return res.status(500).json({
        success:false,
        message:"seomething is wrong"
    })
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

// to get all  doctors list
const  allDoctors=async(req,res)=>{
    try{
        
        const doctors=await Doctor.find({}).select('-password')
        if(!doctors)
        {
            return res.status(500).json({
                success:false,
                message:"no doctors added"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Here are All The doctors"
            ,doctors
        })
    }
catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}



// all appintment list
const AllAppointmnet=async(req,res)=>{
    try{
        const appointment=await Appointment.find({})
        
        return res.status(200).json({
            success:true,
            appointment
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// appointment cancel by admin
const cancelAppointment=async(req,res)=>{
    try{

const {id}=req.body
const appointData=await Appointment.findByIdAndUpdate(id,{cancelled:true})

const {docId,slotDate,slotTime}=appointData

const docData=await Doctor.findById(docId)
let slots_booked=docData.slots_booked
slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
await Doctor.findByIdAndUpdate(docId,{slots_booked})

return res.status(200).json({
    success:true,
    message:"Cancelled successfuly"
})
}catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}


// get dashboard data for admin panel

const admindashboardData=async(req,res)=>{
    try{
        const user=await User.find({})
        const doctor=await Doctor.find({})
        const appointment=await Appointment.find({})

        const dashData={
            patients:user.length,
            doctors:doctor.length,
            appointments:appointment.length,
            latestAppointment:appointment.reverse().slice(0,5)
        }
        return res.status(200).json({
            success:true,
            dashData
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


export {addDoctor,adminLogin,allDoctors,AllAppointmnet,cancelAppointment,admindashboardData}