const passport=require("passport")


module.exports.logout=function(req,res){
      
  req.logout();
  req.flash("success","You Have Logged Out!!")
 return res.redirect("/");


}