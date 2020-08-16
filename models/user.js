const mongoose=require("mongoose");



// USER SCHEMA

const schema=new mongoose.Schema({
    // EMAIL OF USER
    email:{
        type:String,
        required:true
    },
    // NAME OF USER
    name:{
        type:String,
        required:true
    },
    // PASSCODE OF USER
    password:{
        type:String,
        required:true
    },
    // CHECKING FOR GOOGLE ACCOUNT
    google:{
        type:Boolean,
        required:true,
        default:false

    },
    // EMAIL VERIFICATION
    verified:{
        type:Boolean,
        required:true,
        default:false
    }
      
},{ 
    timestamps:true
})





const model=mongoose.model("users",schema);

module.exports=model;