
const {userModel,connection}=require("../Models/UserModel")
const express=require("express")
const {auth}=require("../Middlewares/Authmiddleware")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=express.Router()
userRouter.get("/getall",auth,async(req,res)=>{
    try{
        const data=await userModel.find()
res.status(200).json({"data":data,"status":"success"})
    }catch(err){
        res.status(400).send({"err":err.message,"status":"error"})
    }
})


userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const data= await userModel.findOne({email})
        if(data){
            res.status(400).json({msg:"Already Registered","status":"error"})
        }
        else{

        
        bcrypt.hash(password, 5, async(err, hash) =>{
            const newuser=new userModel({name,email,password:hash})
            await newuser.save()
            res.status(200).json({msg:"registerd successfully","status":"success"})
        });
        }
    }catch(err){
        res.status(400).json({msg:err.message,"status":"error"})
    }
})
userRouter.post("/login",async(req,res)=>{

const {email,password}=req.body
try{
    const user=await userModel.findOne({email:email})
    if(user){
        bcrypt.compare(password, user.password, async(err, result)=> {
            if(result){
                var token = jwt.sign({ authorId:user._id }, 'masai',{ expiresIn: 60 * 5 });
                res.status(200).send({"msg":"login successfully","token":token,"status":"success"})
            }
            else{
                res.status(400).json({msg:"wrong password","status":"error"})
            }
           
        })
      
       
    }else{
        res.status(400).json({"msg":"wrong credentials","status":"error"})
    }
    
}catch(err){
    res.status(400).json({"msg":err.message,"status":"error"})
}
})



module.exports={userRouter}









