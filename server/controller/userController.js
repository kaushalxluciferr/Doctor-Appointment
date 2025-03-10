import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import Doctor from '../model/doctor.js'
import Appointment from '../model/appointment.js'
// import razorpay from 'razorpay'





// signup user
const  signup=async(req,res)=>{
    try{
const {email,name,password}=req.body

    if(!validator.isEmail(email))
    {
        return res.status(400).json({
            success:false,
            message:"email is invalid"
        })
    }
    if(password.length<8)
    {
        return res.status(400).json({
            success:false,
            message:"Passowrd should be >=8"
        })
    }
    const hashpass=await bcrypt.hash(password,10)

    const user=new User({
        name,email,password:hashpass
    })
    await user.save()
//generating token 
    const token=jwt.sign({id:user._id},process.env.SECRET)


return res.status(200).json({
    success:true,
    message:"Signup successfull",
    token
})

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


//login user
const login=async(req,res)=>{
    try{
 const {email,password}=req.body

 const user=await User.findOne({email})

 if(!user)
 {
    return res.status(404).json({
success:false,
message:"not user found with this gmail"
    })
 }

 const match=await bcrypt.compare(password,user.password)

 if(!match)
 {
    return res.status(400).json({
        success:false,
        message:"Passowrd is wrong"
    })
 }

 const token=jwt.sign({id:user._id},process.env.SECRET)

 return res.status(200).json({
    success:true,
    token
 })



    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// userprofile data
const getUserData=async(req,res)=>{
    try{
        const {userId}=req.body
        const user=await User.findById(userId).select("-password")
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"user Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// update user profile
const updateUserProfile=async(req,res)=>{
    try{
        const {userId,name,phone,address,dob,gender}=req.body
          const imageFile=req.file

          if(!name||!phone||!dob||!gender)
          {
            return res.status(500).json({
                success:false,
                message:"something is missing"
            })
          }

          await User.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

          if(imageFile)
          {
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            await User.findByIdAndUpdate(userId,{image:imageUpload.secure_url})
          }

          return res.status(200).json({
            success:true,
            message:"updated Successfully"
          })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



//book appointment
const bookAppointment=async(req,res)=>{
    try{
const {userId,docId,slotDate,slotTime}=req.body
const docData=await Doctor.findById(docId).select("-password")

if(!docData.available)
{
    return res.status(400).json({
        success:false,
        message:"Doctor not Available"
    })
}
let slots_booked=docData.slots_booked

if(slots_booked[slotDate])
{
    if(slots_booked[slotDate].includes(slotTime))
    {
        return res.status(400).json({
            success:false,
            message:"slot not available"
        })
    }
    else{
        slots_booked[slotDate].push(slotTime)
    }
}else{
    slots_booked[slotDate]=[]
     slots_booked[slotDate].push(slotTime)
}

const userData=await User.findById(userId).select("-password")
 
delete docData.slots_booked

 const appointment=new Appointment({
    userId,
    docId,
    userData,docData,
    amount:docData.fees,
    slotDate,
    slotTime,
    date:Date.now()
 })
 await appointment.save()

// save new slots data in doctor data 

await Doctor.findByIdAndUpdate(docId,{slots_booked})


 return res.status(200).json({
    success:true,
    message:"Appointment Booked",
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


const getUserAllAppointment=async(req,res)=>{
    try{
        const {userId}=req.body
;
        const appointment=await Appointment.find({userId})
        return res.status(200).json({
            success:true,
            appointment
        })
    }catch(error)
    {
        return res.json({
            success:false,
            message:error.message
        })
    }
}



// cancel the appointment

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


// cannot complete due to kyc verification 
// const razorpayInstance=new razorpay({
//     key_id:'',
//     key_secret:''
// })

             
// // online payment of apppointment razorpay
// const razorpayPayment=async(req,res)=>{
//     try{

//     }catch(error)
//     {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



export {signup,login,getUserData,updateUserProfile,bookAppointment,getUserAllAppointment,cancelAppointment}