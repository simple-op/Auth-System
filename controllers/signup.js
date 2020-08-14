const model=require("../models/user");
const bcrypt=require("bcrypt");
const passport = require("passport");

module.exports.createPage = function(req, res){
    if(req.isAuthenticated()){
      return  res.redirect("/");
    }

    return res.render('./signup', {
        
    })
}



function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    
}
function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
    return re.test(password);
    
}



module.exports.signup=function(req,res){
    console.log("called")
    
    if(!req.body.password||!req.body.email||!req.body.password||!req.body.re_password){
        return  res.render("./signup",{
            err:"Enter every detail"
        })
    } 
     
    const email=req.body.email;
    if (!validateEmail(email)){
       return  res.render("./signup",{
            err:"Enter a valid email"
        })
    }    

    if(req.body.password!=req.body.re_password){
        return  res.render("./signup",{
            err:"Both password must be same"
        })
    }  

    const password=req.body.password;
    if(!validatePassword(password)){
        return  res.render("./signup",{
            err:"Password must be valid "
        })
    } 
  
    model.findOne({email:req.body.email},function(err,user){
      if(user){

        return  res.render("./signup",{
              err:"User Already Exists"
          })

      }

      else{
         
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            model.create({

                email:req.body.email,
                password:hash,
                name:req.body.name
             })
        });
        
        return  res.redirect("/login")
          


      }

    })
   
   

}


