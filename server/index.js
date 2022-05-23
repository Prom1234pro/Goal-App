import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "./routes/task.js"
import routerUser from "./routes/user.js"
import cookieParser from "cookie-parser"

const connection = async() => {
    try{
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect("mongodb+srv://promise:1234prom@cluster0.xowna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", connectionParams)
        console.log("connected to database")
    }catch(error) {
        console.log(error)
    }
}
const app = express()
connection()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/user/api/tasks", router)
app.use("/user", routerUser)


const port = process.env.PORT || 5000
app.listen(port, ()=> console.log(`server is listening on port ${port}`))
