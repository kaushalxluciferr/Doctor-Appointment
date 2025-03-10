import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/mongoDB.js'
import connectCloud from './config/cloudinary.js'
import adminRoute from './routes/adminRoute.js'
import doctorRouter from './routes/DoctorRoute.js'
import userRouter from './routes/userRoute.js'

 connectDB()
 connectCloud()


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/admin',adminRoute)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get("/",(req,res)=>{
    res.send("hey sanamikaa, hey")
})

app.listen(process.env.PORT,()=>{
    console.log("love you from server");
    
})