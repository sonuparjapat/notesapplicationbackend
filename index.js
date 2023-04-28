const express=require("express")
const {userModel,connection}=require("./Models/UserModel")
const { userRouter } = require("./Controls/Controls")
const {noteRouter}=require("../Backend/Controls/Note.route")
const { auth } = require("./Middlewares/Authmiddleware")
const cors=require("cors")

const app=express()
app.use(cors({
  origin: 'http://localhost:8080', // replace with your client-side origin
  methods: ['GET', 'POST','DELETE','PUT','PATCH'], // replace with allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // replace with allowed headers
}));
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