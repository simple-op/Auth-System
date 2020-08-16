const mongoose=require("mongoose");





const schema=new mongoose.Schema({
    verifytoken:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
},

  { 
    timestamps:true
})





const model=mongoose.model("verify_token",schema);

module.exports=model;