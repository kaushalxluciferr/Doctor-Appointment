import jwt from 'jsonwebtoken'


// athenticate admin
export const adminAuth=async(req,res,next)=>{
try{

    const {token}=req.headers
    if(!token)
    {
        return res.status(404).json({
            success:false,
            message:"token not found"
        })
    }

    const tokenMatch= jwt.verify(token,process.env.SECRET)
    if(tokenMatch!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
    {
        return res.status(500).json({
            success:false,
            message:"not authorized"
        })
    }
    next()

}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}