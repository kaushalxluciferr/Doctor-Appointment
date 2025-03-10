import express from 'express'
import { cancelAppointment, completeAppointment, doctorDashboard, doctorList, doctorLogin, doctorProfile, getDoctorApppointment, updateProfile } from '../controller/doctorController.js'
import doctorAuth from '../middleware/doctorAuth.js'

const doctorRouter=express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/get-appointment',doctorAuth,getDoctorApppointment)
doctorRouter.post('/complete-appointment',doctorAuth,completeAppointment)
doctorRouter.post('/cancel-appointment',doctorAuth,cancelAppointment)
doctorRouter.get('/doctor-dashboard',doctorAuth,doctorDashboard)
doctorRouter.get('/doctor-profile',doctorAuth,doctorProfile)
doctorRouter.post('/update-profile',doctorAuth,updateProfile)
export default doctorRouter