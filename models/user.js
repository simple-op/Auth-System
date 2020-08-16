const mongoose=require("mongoose");





const schema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    google:{
        type:Boolean,
        required:true,
        default:false

    },
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