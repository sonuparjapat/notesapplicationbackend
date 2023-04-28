const mongoose=require("mongoose")

const noteschema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    author:{type:String,required:true},
    authorId:{type:String,required:true}
})
const noteModel=mongoose.model("notes",noteschema)

module.exports={noteModel}