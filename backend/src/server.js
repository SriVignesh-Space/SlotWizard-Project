import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./db.js"
import userRouter from "./routes/userRoutes.js"
const PORT = process.env.PORT || 5000
const app = express()

await connectDB()

app.use(express.json())
app.use(cors())
app.use('/api/user' , userRouter)
app.get('/',(req,res)=>{
    res.send("API working")
})


app.listen(PORT , ()=>{
    console.log("Server running")
})