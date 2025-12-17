import mongoose from "mongoose";

// --- DaySlots schema (array of 4 slots per day) ---
const daySlotsSchema = new mongoose.Schema(
  {
    Monday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
    Tuesday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
    Wednesday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
    Thursday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
    Friday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
    Saturday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
  },
  { _id: false }
);

// --- Missing subject schema ---
const missingSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    code: { type: String, required: true },    
  },
  { _id: false }
);

// --- Table schema (one generated timetable) ---
const tableSchema = new mongoose.Schema(
  {
    score: { type: Number, default: 0 },
    timetable: { type: daySlotsSchema, default: () => ({}) },
    missedSubjects: { type: [missingSchema], default: [] }, 
  },
  { _id: false }
);

// --- User schema ---
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  registerNumber: { type: Number, required: true },
  tables: { type: [tableSchema], default: [] },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
