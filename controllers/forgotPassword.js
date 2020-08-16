const random=require("randomstring");
const model=require("../models/token");
const user=require("../models/user");
// THIS IS USED TO SEND MAILS VIA GMAIL
const nodemailer = require('nodemailer');
const bcrypt=require("bcrypt");
// requring request for sending email with mail service provider "SEND IN BLUE"
const request = require("request");
// token expire duration ~10mins
const duration=600000;


// controller for rendering the set new password  page
module.exports.forgot=function(req,res){
  // find user
               user.findOne({email:req.body.email},function(err,user){

    
 
              if(user){   
                // if user found
                      // generate random 32 letters token to store in db 
              let rtoken=random.generate();
              // getting entered email by user
              let email=req.body.email;
              // finding token with email entered
              model.findOne({email:email},function(err,token){
                    
                  if(!token||(Date.now()-token.created)>duration) {
                    
                    
                    if(token){
                        console.log(Date.now())
                        
                        // token found then delete if it is expired
                        model.findByIdAndDelete(token._id, function(err){

                        })
                    }
                //  token not found then create new
                   model.create({
                    token:rtoken,
                    email:email,
                    // setting creation time of token
                    created:Date.now()
                })




               
// sending mail to the user if user token is not present or expired
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
    // sending link to user with token generated
    params: {verificationLink: 'http://localhost:8000/forgotPass/?token='+rtoken},
    templateId: 18
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

                // let transporter = nodemailer.createTransport({
                //     host: "smtp.ethereal.email",
                //     port: 587,
                //     secure: false,  
                //   service: 'gmail',
                //   auth: {
                //     user: 'rameshkumar160196@gmail.com', 
                
                
                    
                //     pass: 'ptwmjg.ad' 
                //   }
                // });
                
                // let mailOptions = {
                //   from: 'rameshkumar160196@gmail.com',
                //   to: email,
                //   subject: 'Sending Email using Node.js',
                //   text: 'http://localhost:8000/forgotPass/?token='+rtoken
                // };
                
                // transporter.sendMail(mailOptions, function(error, info){
                //   if (error) {
                //     console.log(error);
                //   } else {
                //     console.log('Email sent: ' + info.response);
                //   }
                // });
                
                
                req.flash("success","Link Has Been Sent To Your Email");
                return  res.redirect("/login");
                
                 
            }

            else{
              console.log("kjkj")
              req.flash("warning","Link Has Been Already Sent To Your Email")
              return  res.redirect("/login");
             
            }
              })
              

             
             


              
            }
            else{
                 
             
             req.flash("error","Email Not Registered");
             return  res.redirect("/login");
            }
            })
        
          }


module.exports.resetForgot=function(req,res){
     
    model.findOne({token:req.query.token},function(err,token){

        if(token&&(Date.now()-token.created)<duration){
        return    res.render("forgotPass",{
                token:token.token,
                email:token.email 
            })
                   
        }
        else{
          req.flash("error","Link Was Expired Or Invalid");
             return res.redirect("/")
        }  

    })



//     if(!token||(Date.now()-token.created)>60000)           


//    res.render("forgotPass")

}



module.exports.resetForgotPass=function(req,res){

    model.findOne({token:req.body.token},function(err,token){

        if(token&&(Date.now()-token.created)<duration){
            
            user.findOne({email:token.email},function(err,userf){

                function validatePassword(password) {
                    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
                    return re.test(password);
                    
                }
               if(validatePassword(req.body.password))
                {           
                          if(req.body.re_password===req.body.password)
                           {       model.findByIdAndDelete(token._id,function(err,token){

                           })
                             
                             bcrypt.hash(req.body.password, 10, function(err, hash){
                                         user.findByIdAndUpdate(userf._id,{ password:hash,google:false },function(err,user){
                                          


                                            console.log("pass changed")
                                            
                                                 
                            })
        
                           })

                           console.log("fsdfds")
                            req.flash("success","Password Changed Successfully");
                             
                            return  res.redirect("/");
                                    
                           }
                           else{
                            console.log("fsdfds")
                            req.flash("error","Password Mismatch!!");
                            return  res.redirect("back");
                           }

 
            }
            else{
            console.log("fsdfds")
            req.flash("error","Invalid Password");
            return  res.redirect("back");

            }
                   
        })
    }
        else{
          console.log("SAD sad")
          req.flash("error","Link Was Expired. Please Resent Again ");
          return  res.redirect("/");
        } 
        
    })

  

}