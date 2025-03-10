import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'

const userAuth=async (req,res,next)=>{
    try{
const  {usertoken}=req.headers
// console.log(userToken);

if(!usertoken){
    return res.status(404).json({
        success:false,
        message:"token invalid"
    })
}

const token=jwt.verify(usertoken,process.env.SECRET)

req.body.userId=token.id
next()


    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default userAuth