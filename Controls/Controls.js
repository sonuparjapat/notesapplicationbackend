
const {userModel,connection}=require("../Models/UserModel")
const express=require("express")
const {auth}=require("../Middlewares/Authmiddleware")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=express.Router()
userRouter.get("/getall",auth,async(req,res)=>{
    try{
        const data=await userModel.find()
res.status(200).json({"data":data})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    try{
        const data= await userModel.findOne({email})
        if(data){
            res.status(400).json({msg:"Already Registered"})
        }
        else{

        
        bcrypt.hash(password, 5, async(err, hash) =>{
            const newuser=new userModel({name,email,password:hash})
            await newuser.save()
            res.status(200).json({msg:"registerd successfully"})
        });
        }
    }catch(err){
        res.status(400).json({msg:err.message})
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
                res.status(200).send({"msg":"login successfully","token":token})
            }
            else{
                res.status(400).json({msg:"wrong password"})
            }
           
        })
      
       
    }else{
        res.status(400).json({"msg":"wrong credentials"})
    }
    
}catch(err){
    res.status(400).json({"msg":err.message})
}
})



module.exports={userRouter}









