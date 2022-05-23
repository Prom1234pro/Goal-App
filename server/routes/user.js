import express from "express";
import bcrypt from "bcryptjs";
import Task from "../models/task.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import protect from "../middlewares/protected.js"

const routerUser = express.Router();

routerUser.post("/register",async(req, res)=>{
    const {name, email, password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const encript_password = await bcrypt.hash(password, salt)
        const user = new User({name, email, password:encript_password})
        await user.save()
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } catch (error) {
        res.status(500).json({
            message: "User already exist"
        })
    }
})
routerUser.post("/login",asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            token: generateToken(user.id)
        })
    }else {
        res.status(400).json({message: "Invalid Credentials"})
    }
}))

routerUser.get("/",protect,asyncHandler(async(req, res)=>{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        _id: _id,
        name, email
    })
}))
const generateToken = (id)=>{
    return jwt.sign({id},"promise",{expiresIn:'30d'})
}

// routerUser.post('/signup', async(req, res) => {
//     const user = new User(req.body)
//     user.save((err, user)=>{
//         if(err){
//             return res.status(401).json({
//                 message: "Email already taken"
//             })
//         }
//         if(!err){
//             console.log(user)
//             return res.send(user)
//         }
//     })
// })
// routerUser.post('/signin', (req, res) => {
//     const {email, password} = req.body
//     User.findOne({email},(err, user)=>{
//         if(err || !user){
//             return res.status(404).json({
//                 meaasge: "Email not found"
//             })
//         }
//         if(!user.authenticated(password)){
//             return res.status(404).json({
//                 message: "Invalid password"
//             })
//         }
//         const token = jwt.sign({_id: user._id},"procode")
//         res.cookie('token',token,{expire: new Date()+1})
//         const {_id, name, email} = user
//         return res.json({
//             token,
//             user: {
//                 _id, name, email
//             }
//         })
//     })
// })
// routerUser.get("/", async (req, res) => {
//     try {
//         const user = await User.find()
//         res.send(user)
//     } catch (error) {
//         res.send(error)
//     }
// })
// routerUser.delete('/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         const task = await Task.deleteMany({user_id: req.params.id})
//         res.send([user,task])
//     } catch (error) {
//         res.send(error)
//     }
// })
export default routerUser