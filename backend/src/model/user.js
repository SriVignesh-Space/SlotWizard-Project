import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name :{type :String ,required : true},
    email :{type :String ,required : true, unique:true},
    password:{type :String ,required : true},
    department:{type :String ,required : true}, 
    registerNumber:{type: Number,required: true},
    tables: {
        type: [
            {
                score: { type: Number, default: 0 },
                Monday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
                Tuesday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
                Wednesday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
                Thursday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
                Friday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] },
                Saturday: { type: [mongoose.Schema.Types.Mixed], default: ["empty", "empty", "empty", "empty"] }
            }
        ],
        default: []
    }

})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel