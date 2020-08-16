const passport=require("passport")

// LOGOUT ROUTER 
module.exports.logout=function(req,res){
      //CALLING LOGOUT FUNCTION  
  req.logout();
// FLASH MESSAGE FOR LOGGED OUT WITH NOTY
  req.flash("success","You Have Logged Out!!")
 return res.redirect("/");


}