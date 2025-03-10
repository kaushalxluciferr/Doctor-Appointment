import jwt from 'jsonwebtoken'

const doctorAuth=async(req,res,next)=>{
    try{
const {doctortoken}=req.headers
if(!doctortoken)
{
    return res.json({
        success:false,
        message:"Token not Provided"
    })
}

const token= jwt.verify(doctortoken,process.env.SECRET)
req.body.doctorId=token.id
next()
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export default doctorAuth