import userModel from '../model/user.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateTimetable } from "../services/timetableService.js";
import fs from 'fs'
import path from 'path'


const registerUser = async(req,res)=>{
    try{
        const {name,email,password,department,registerNumber} = req.body
        if (!name || !email || !password || !department || !registerNumber) {
            return res.json({sucess:false,message:"Missing Details"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData ={
            name,
            email,
            password:hashedPassword,
            department,
            registerNumber
        }   
        const newUser = new userModel(userData)

        const user = await newUser.save()

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite : "lax"
        });
        res.json({success:true,token,user:{name:user.name}})
    }
    catch(e){
        console.log(e)
        res.json({sucess:false,message:e.message})
    }
}
const logoutUser = (req, res) => {
    try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,   
      sameSite: "lax"  
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        if (!email || !password) {
            return res.json({sucess:false,message:"Missing Details"})
        }
        const user = await userModel.findOne({email})

        if (!user){
            return res.json({sucess:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
            res.cookie("token", token, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
            res.json({success:true,token,user:{name:user.name}})
        }
        else {
            return res.json({sucess:false,message:"Invalid password"})
        }
        
    }
    catch(e){
        console.log(e)
        res.json({sucess:false,message:e.message})
    }
}

const editProfile = async (req, res) => {
    try {
        const user = req.user; 
        const { name, department, registerNumber } = req.body;

        if (name) user.name = name;
        if (department) user.department = department;
        if (registerNumber) user.registerNumber = registerNumber;

        await user.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                name: user.name,
                department: user.department,
                registerNumber: user.registerNumber,
                email: user.email
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "Please provide both current and new passwords." });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Current password is incorrect." });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: "Password updated successfully." });
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, message:e.message });
    }
};


const createTableForUser = async (req, res) => {
  try {
    const user = req.user;
    const rawTimetable = req.body.timetable;

    if (!rawTimetable || !Array.isArray(rawTimetable))
      return res.status(400).json({ success: false, message: "Invalid timetable" });

    const { timetable, score } = await generateTimetable(rawTimetable);

    user.tables.push({ score: score,...timetable });

    if (user.tables.length > 10) user.tables.shift();
    await user.save();

    res.json({ success: true, timetable, score, tables: user.tables });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

const getTimetables = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, tables: user.tables });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: e.message });
  }
};

const getSubjects =  (req,res,next) => {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(),"src","services","simplified.json"),'utf-8'))
    const filtered = data.map(({subject,code,credits}) => ({
        subject,code,credits
    }))
    res.status(200).send(filtered);
}


export { registerUser, loginUser, createTableForUser, getTimetables,getSubjects, logoutUser };