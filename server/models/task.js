import mongoose from "mongoose";
import User from "./user.js"
const Schema = mongoose.Schema


const taskSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true,
        index: true
    },
    task: {
        type: String,
        required: true
    },
    reminder: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: new Date()
    }
})

export default mongoose.model("task", taskSchema)