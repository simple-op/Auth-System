const model=require("../models/user");
// REQURING TOKEN FOR VALIDATION
const token=require("../models/verifyToken");
const bcrypt=require("bcrypt");
const random=require("randomstring");
// const passport = require("passport");
const request = require("request");

// RENDER SIGN UP PAGE ON SIGNUP ROUTE
module.exports.createPage = function(req, res){
    if(req.isAuthenticated()){
      // IF USER LOGGED IN REDIRECT TO HOMEPAGE
      return  res.redirect("/");
    }

    return res.render('./signup', {
        
    })
}


// REGX* FOR VALIDATING NEW ENTERED EMAIL
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    
}
// VALIDATING NEW PASSCODE WITH REGX* 
//IF TRUE
function validatePassword(password) {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
    return re.test(password);
    
}


// ON POST REQ SIGN UP CONTROLLER
module.exports.signup=function(req,res){
    console.log("called")
    // IF ANY FIELD IS EMPTY 
    if(!req.body.password||!req.body.email||!req.body.password||!req.body.re_password){
      // ERROR FLASH 
        req.flash("error","All Fields Are Required");
        return  res.redirect("/signup")
    } 
     
    const email=req.body.email;
    // IF REGX* RETURN FALSE FOR ENTERED EMAIL
    if (!validateEmail(email)){
        req.flash("error","Enter a valid email");
       return  res.redirect("/signup")
    }    
    //  IF PASSCODE AND REENTERED PASSCODE DOESNT MATCH
    if(req.body.password!=req.body.re_password){
        req.flash("error","Both Password Must Be Same");
        return  res.redirect("/signup")
    }  
   
    const password=req.body.password;
    // IF REGX* RETURN FALSE FOR ENTERED PASSCODE
    if(!validatePassword(password)){
        req.flash("error","Password Must Be Valid");
        return  res.redirect("/signup")
    } 
  //  FINDING IF USER ALREADY PRESENT SHOW ERROR
    model.findOne({email:req.body.email},function(err,user){
      if(user){

         req.flash("error","User Already Exists");
        return  res.redirect("/signup")

      }

      else{
        //  IF EVERYTHING FINE THEN SIGN UP AFTER ENCRYPTION OF PASSCODE AND SAVE TO DB 
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            model.create({

                email:req.body.email,
                password:hash,
                name:req.body.name,
                verified:false
             })
        });
      //  GENERATING TOKEN FOR VARIFICATION
       let rtoken=random.generate();
  //  CREATING TOKEN IN DB
       token.create({
           verifytoken:rtoken,
           email:req.body.email
       })
      // SENDING MAIL WITH SEND IN BLUE SERVICE aPI
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
              // VERIFY LINK TO EMAIL
              params: {link: 'http://localhost:8000/verify/?token='+rtoken},
              templateId: 20
            },
            json: true
          };
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
          
            console.log(body);
          });
          // IF SUCCESS THEN SUCCESS MESSAGE
        req.flash("success","You SignedUp Successfully. Verification Mail Sent Your Email ")
        return  res.redirect("back")
          


      }

    })
   
   

}


