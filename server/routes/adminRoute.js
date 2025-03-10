import express from 'express'
import { addDoctor, admindashboardData, adminLogin, AllAppointmnet, allDoctors, cancelAppointment } from '../controller/AdminController.js'
import upload from '../middleware/multer.js'
import { adminAuth } from '../middleware/adminAuth.js'
import { changeAvailability } from '../controller/doctorController.js'

const adminRoute=express.Router()


adminRoute.post('/add-doctor',adminAuth,upload.single("image"),addDoctor)
adminRoute.post('/login',adminLogin)
adminRoute.post('/all-doctors',adminAuth,allDoctors)
adminRoute.post('/change-availability',adminAuth,changeAvailability)
adminRoute.get("/appointments",adminAuth,AllAppointmnet)
adminRoute.post('/cancel-appointment',adminAuth,cancelAppointment)
adminRoute.get('/dashboard-data',adminAuth,admindashboardData)
export default adminRoute