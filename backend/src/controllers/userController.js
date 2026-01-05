import { generateTimetable } from "../services/timetableService.js";
import fs from 'fs'
import path from 'path'


const createTableForUser = async (req, res) => {
  try {
    const user = req.user;
    const rawTimetable = req.body.timetable;

    if (!rawTimetable || !Array.isArray(rawTimetable))
      return res.status(400).json({ success: false, message: "Invalid timetable" });

    // generate timetable
    const { timetable, score, missedSubjects } = await generateTimetable(rawTimetable); 

    return res.json({ success: true, timetable, score, missedSubjects });

    // push into user.tables
    user.tables.unshift({
      score,
      timetable,
      missedSubjects
    });

    if (user.tables.length > 10) user.tables.shift();
    await user.save();

    res.json({
      success: true,
      timetable,
      score,
      missedSubjects,
      tables: user.tables
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: e.message });
  }
};


// const getTimetables = async (req, res) => {
//   try {
//     // const userId = req.user.id; 
//     // const user = await userModel.findById(userId);

//     // if (!user) {
//     //   return res.status(404).json({ success: false, message: "User not found" });
//     // }

//     res.json({ success: true, tables: user.tables })
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ success: false, message: e.message });
//   }
// };

const getSubjects =  (req,res,next) => {
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(),"src","services","simplified.json"),'utf-8'))
    const filtered = data.map(({subject,code,credits}) => ({
        subject,code,credits
    }))
    res.status(200).send(filtered);
}


export { createTableForUser,getSubjects};