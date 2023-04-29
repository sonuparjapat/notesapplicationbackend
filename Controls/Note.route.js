const express=require("express")
const {noteModel}=require("../Models/Note")


const noteRouter=express.Router()

noteRouter.post("/create",async(req,res)=>{
    try{
        const data=new noteModel(req.body)
        await data.save()
        res.status(200).json({msg:"addedsuccessfully",data:req.body})
    }catch(err){
        res.status(400).json({msg:err})
    }

})
// noteRouter.get("/getall",async(req,res)=>{
//     try{
//         const data=await noteModel.find()
//         res.status(200).send({"data":data})

//     }catch(err){
//         res.status(400).json({msg:err})
//     }
// })
noteRouter.get("/",async(req,res)=>{
    
  try{
    const notes= await noteModel.find({authorId:req.body.authorId})
 console.log(notes)
res.status(200).json({data:notes})
  } catch(err){
    res.status(400).json({"err":err})
  } 
})
noteRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const {note}=await noteModel.findOne({_id:id})
    try{

        if(req.body.authorId!==note.authorId){
            res.status(200).json({msg:"You are not authorised to do that"})
        }
        else{
await noteModel.findByIdAndDelete({_id:id})
res.status(200).json({msg:"deleted successfully"})
        }

    }catch(err){
        res.status(400).json({err:err})
    }
})
noteRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const noteid=await noteModel.findOne({_id:id})
    try{
       
        if(req.body.authorId!==noteid.authorId){
            res.status(400).json({msg:"You are not authorised to do this"})
        }
        else{
            await noteModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"updated successfully"})
        }
    }catch(err){
        res.status(400).send({msg:err})
    }
})
module.exports={noteRouter}