const passport=require("passport")


module.exports.logout=function(req,res){
      
  req.logout();
 return res.redirect("/");


}