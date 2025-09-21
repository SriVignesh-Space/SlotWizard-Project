import express from "express"
import {registerUser,loginUser,createTableForUser,getTimetables,getSubjects,logoutUser} from '../controllers/userController.js'
import {verifyToken} from '../middleware/authMiddleware.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',verifyToken,logoutUser) 
userRouter.post('/timetables',verifyToken, createTableForUser)
userRouter.get('/timetables',verifyToken, getTimetables)
userRouter.get('/subjects',getSubjects)

export default userRouter
