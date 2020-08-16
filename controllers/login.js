

// LOGIN CONTROLLER
module.exports.loginPage=function(req,res){
  // CHECKING IF USER AUTHENTICATED OR NOR
      if(req.isAuthenticated()){
      // IF TRUE SEND TO HOMEPAGE
        return  res.redirect("/")
      }
        // IF NOT RETURN TO HOMEPAGE WITH LOGIN / SIGNUP  
    return  res.render("./login");
}

// ON LOGIN SUCCESS ROUTER
module.exports.login=function(req,res){

   
    
  // FLASH MESSAGE WITH NOTY ON LOGGED IN
  req.flash("success","You Have Logged In SuccessFully");   
  
  
 return res.redirect("/");

}



