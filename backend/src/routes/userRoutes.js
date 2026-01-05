import express from "express"
import {createTableForUser,getSubjects} from '../controllers/userController.js'
import {verifyToken} from '../middleware/authMiddleware.js'
const userRouter = express.Router()

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)
// userRouter.get('/logout',verifyToken,logoutUser) 
userRouter.post('/timetables', createTableForUser)
// userRouter.get('/timetables', getTimetables)
userRouter.get('/subjects',getSubjects)
// userRouter.get('/loggedin',verifyToken,loggedIn)

export default userRouter
