const model=require("../models/user");
const token=require("../models/verifyToken")
const bcrypt=require("bcrypt");
const random=require("randomstring");
// const passport = require("passport");
const request = require("request");

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
        req.flash("error","All Fields Are Required");
        return  res.redirect("/signup")
    } 
     
    const email=req.body.email;
    if (!validateEmail(email)){
        req.flash("error","Enter a valid email");
       return  res.redirect("/signup")
    }    

    if(req.body.password!=req.body.re_password){
        req.flash("error","Both Password Must Be Same");
        return  res.redirect("/signup")
    }  

    const password=req.body.password;
    if(!validatePassword(password)){
        req.flash("error","Password Must Be Valid");
        return  res.redirect("/signup")
    } 
  
    model.findOne({email:req.body.email},function(err,user){
      if(user){

         req.flash("error","User Already Exists");
        return  res.redirect("/signup")

      }

      else{
         
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            model.create({

                email:req.body.email,
                password:hash,
                name:req.body.name,
                verified:false
             })
        });
       let rtoken=random.generate();

       token.create({
           verifytoken:rtoken,
           email:req.body.email
       })
              
        let options = {
            method: 'POST',
            url: 'https://api.sendinblue.com/v3/smtp/email',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': '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'
            },
            body: {
              sender: {name: 'Team AuthSystems', email: 'AuthSystems@auth.com'},
              to: [{email: email}],
              replyTo: {email:"AuthSystems@auth.com"},
              params: {link: 'http://localhost:8000/verify/?token='+rtoken},
              templateId: 20
            },
            json: true
          };
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
        req.flash("success","You SignedUp Successfully. Verification Mail Sent Your Email ")
        return  res.redirect("/login")
          


      }

    })
   
   

}


