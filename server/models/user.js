import mongoose from "mongoose";
import crypto from "crypto"
import { v4 as uuidv4 } from 'uuid'
const Schema = mongoose.Schema

const user = new Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    salt: String
},{timestamps: true})

// user.virtual("password")
//     .set(function(password){
//         this._password = password
//         this.salt = uuidv4()
//         this.encript_password = this.securePassword(password)
//     })
//     .get(function(){
//         return this._password
//     })
// user.methods = {
//     authenticated: function(password){
//         return this.securePassword(password) === this.encript_password
//     },
//     securePassword: function(password){
//         if(!password) return ""
//         try {
//             return crypto.createHmac("sha256", this.salt).update(password).digest("hex")
//         }
//         catch (error) {
//             return error
//         }
//     }
// }
export default mongoose.model("user", user)