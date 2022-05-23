import User from "../models/user.js"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

export default asyncHandler(async(req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){

        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, "promise")
            req.user = await User.findById(decode.id).select("-password")
            next()
        } catch (error) {
            res.status(401).json({message: "not authorized"})
        }
    }
    if(!token){
        res.status(401).json({message: "not authorized"})
    }
})
