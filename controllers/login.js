


module.exports.loginPage=function(req,res){
      if(req.isAuthenticated()){
        
        return  res.redirect("/")
      }
       
    return  res.render("./login");
}

module.exports.login=function(req,res){

   
    
  
  req.flash("success","You Have Logged In SuccessFully");   
  

 return res.redirect("/");

}



