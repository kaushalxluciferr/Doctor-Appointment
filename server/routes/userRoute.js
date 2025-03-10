import express from 'express'
import { bookAppointment, cancelAppointment, getUserAllAppointment, getUserData, login, signup, updateUserProfile } from '../controller/userController.js'
import userAuth from '../middleware/userAuth.js'
import upload from '../middleware/multer.js'

const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post('/login',login)
userRouter.get('/getuser',userAuth,getUserData)
userRouter.post('/updateprofile',upload.single('image'),userAuth,updateUserProfile)
userRouter.post('/bookappointment',userAuth,bookAppointment)
userRouter.get('/appointment',userAuth,getUserAllAppointment)
userRouter.post('/delete-Appointment',userAuth,cancelAppointment)
export default userRouter