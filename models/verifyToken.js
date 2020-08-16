const mongoose=require("mongoose");



// EMAIL VERIFICATION TOKEN SCHEMA

const schema=new mongoose.Schema({
    // VERIFIACTION TOKEN
    verifytoken:{
        type:String,
        required:true
    },
    // EMAIL OF USER
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