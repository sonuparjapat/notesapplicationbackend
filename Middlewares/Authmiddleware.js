const userModel=require("../Models/UserModel")
var jwt = require('jsonwebtoken');
 const auth=(async(req,res,next)=>{
const token=req.headers.authorization

if(token){
   

try{
    jwt.verify(token.split(" ")[1], 'masai', function(err, decoded) {
        if(decoded){
            console.log(decoded)
            req.body.authorId=decoded.authorId
         next()
        }else{
            res.status(400).json({msg:err})
        }
 
       })
    
    
}catch(err){
    res.status(400).json({"msg":err.message})
}

}
else{
    res.status(400).json({msg:"please login first"})
}


})
module.exports={auth}