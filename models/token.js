const mongoose=require("mongoose");





const schema=new mongoose.Schema({
    // TOKEN TO VERIFY THE FORGOT PASSCODE LINK
    token:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    // CREaTED USED TO VERIFY TOKEN AGE
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