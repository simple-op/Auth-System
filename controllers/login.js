 const User= require("../models/user")
 const bcrypt=require("bcrypt");
const { json } = require("express");

// LOGIN CONTROLLER
module.exports.loginPage=function(req,res){
  // CHECKING IF USER AUTHENTICATED OR NOR
      if(req.isAuthenticated()){
      // IF TRUE SEND TO HOMEPAGE
        return  res.redirect("/")
      }
        // IF NOT RETURN TO HOMEPAGE WITH LOGIN / SIGNUP  
    return  res.json({
      error:"login"
    });
}

// ON LOGIN SUCCESS ROUTER
module.exports.login=function(req,res){
  console.log(req.body)

    User.findOne({email:req.body.email},function(err,user){
       if(user){
           bcrypt.compare(req.body.password,user.password,function(err,same){
                 if(same&&user.verified){
               return      res.json(user)
                 } 
                 else if(!user.verified){ 
                return     res.json({
                       error:"Account Not Verified"
                     })
                 } 
                 else{
                 return    res.json({
                       error:"Wrong Password"


                     })
                 }  
                     

           })

       }
       else{
         return res.json({
           error:"Email Not Registered"
         })
       }


    })
    // if(req.xhr){
    //   return res.status(200).json({
    //     data:{
             

    //          user:req.user
            
    //     }
          

    //   })
       

    // }
  // FLASH MESSAGE WITH NOTY ON LOGGED IN
 
} 



