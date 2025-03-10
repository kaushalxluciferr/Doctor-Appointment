import Doctor from "../model/doctor.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Appointment from "../model/appointment.js"
// change available
const changeAvailability=async(req,res)=>{
try{
const {docId}=req.body

const docData=await Doctor.findById(docId)
await Doctor.findByIdAndUpdate(docId,{available:!docData.available})

return res.status(200).json({
    success:true,
    message:"updated Sucessfully"
})

}catch(error)
{
    return res.status(500).json({
        success:false,
        error:error.message
    })
}
}



// get list of all doctor
const doctorList=async(req,res)=>{
    try{

        const doctors=await Doctor.find().select("-password")
        return res.status(200).json({
            success:true,
            doctors
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// doctor login

const doctorLogin=async(req,res)=>{
    try{
const {email,password}=req.body

const doctor=await Doctor.findOne({email})
if(!doctor)
{
    return res.json({
        success:false,
        message:"doctor with this email not exist"
    })
}

const match=await bcrypt.compare(password,doctor.password)
if(!match)
{
    return res.json({
        success:false,
        message:'something is wrong'
    })
}

const token=jwt.sign({id:doctor._id},process.env.SECRET)
return res.status(200).json({
    success:true,
    token
})
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


//get  specific doctor appointment
const  getDoctorApppointment=async(req,res)=>{
    try{
const {doctorId}=req.body
const appointment=await Appointment.find({docId:doctorId})
return res.json({
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



// complete the Appointment
const completeAppointment=async(req,res)=>{
    try{
const {doctorId,id}=req.body

const appointmentData=await Appointment.findById(id)

if(appointmentData &&appointmentData.docId===doctorId)
{
    await Appointment.findByIdAndUpdate(id,{isCompleted:true})
    return res.json({
        success:true,
        message:"Appointment Completed"
    })
}
else{
    return res.json({
        success:false,
        message:"failed"
    })
}

    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



const cancelAppointment=async(req,res)=>{
    try{
        const {id,doctorId}=req.body

        const appointmentData=await Appointment.findById(id)
        if(appointmentData &&appointmentData.docId===doctorId)
        {
            await Appointment.findByIdAndUpdate(id,{cancelled:true})
            return res.json({
                success:true,
                message:"Appointment Cancelled"
            })
        }
        else{
            return res.json({
                success:false,
                message:"something is wrong"
            })
        }
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


// get dashboard data
const doctorDashboard = async (req, res) => {
    try {
      const { doctorId } = req.body;
  
      const appointment = await Appointment.find({ docId: doctorId });
  
      let earning = 0;
  
      // Calculate earning
      appointment.forEach((item) => {
        if (item.isCompleted || item.payment) {
          earning += item.amount;
        }
      });
  
      // Extract unique patients
      let patients = [];
      appointment.forEach((item) => {
        if (!patients.includes(item.userId)) {
          patients.push(item.userId);
        }
      });
  
      const dashData = {
        earning,
        appointment: appointment.length,
        patients: patients.length,
        latestAppointment: appointment.reverse().slice(0, 5),
      };
  
      return res.json({
        success: true,
        dashData,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


//   doctor profile 
const doctorProfile=async(req,res)=>{
    try{
        const {doctorId}=req.body
        const doctor=await Doctor.findById(doctorId).select('-password')
        if(!doctor)
        {
            return res.json({
                success:false,
                message:"no any doctor exist"
            })
        }
        return res.status(200).json({
            success:true,
            doctor
        })
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


// update doctor profile
const updateProfile=async (req,res)=>{
    try{
        const {doctorId,fees,address,available}=req.body


        await Doctor.findByIdAndUpdate(doctorId,{fees,address,available})
        return res.json({
            success:true,
            message:"updated Successfully"
        })
    }catch(error)
    {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}


export {updateProfile,changeAvailability,doctorList,doctorLogin,getDoctorApppointment,completeAppointment,cancelAppointment,doctorDashboard,doctorProfile}