const mongoose=require("mongoose");





const schema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    created:{
          type:Number,
          required:true,
          default:Date.now()    
    }
},

  { 
    timestamps:true
})





const model=mongoose.model("token",schema);

module.exports=model;