const express=require("express")
const {userModel,connection}=require("./Models/UserModel")
const { userRouter } = require("./Controls/Controls")
const {noteRouter}=require("./Controls/Note.route")
const { auth } = require("./Middlewares/Authmiddleware")
const cors=require("cors")

const app=express()
app.use(cors())

app.use(express.json())


app.use("/user",userRouter)

app.use(auth)
 app.use("/notes",noteRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("server is running at port 8080")
})