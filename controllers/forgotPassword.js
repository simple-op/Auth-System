const random=require("randomstring");
const model=require("../models/token");
var nodemailer = require('nodemailer');

module.exports.forgot=function(req,res){
              let rtoken=random.generate();
              let email=req.body.email;
              model.findOne({email:email},function(err,token){
                    
                  if(!token||(Date.now()-token.created)>60000) {
                    
                    if(token){
                        console.log(Date.now())
                       
                        model.findByIdAndDelete(token._id, function(err){

                        })
                    }

                   model.create({
                    token:rtoken,
                    email:email,
                    created:Date.now()
                })

                var transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,  
                  service: 'gmail',
                  auth: {
                    user: 'rameshkumar160196@gmail.com', 
                
                
                    
                    pass: 'ptwmjg.ad' 
                  }
                });
                
                var mailOptions = {
                  from: 'rameshkumar160196@gmail.com',
                  to: email,
                  subject: 'Sending Email using Node.js',
                  text: 'http://localhost:8000/forgotPass/?token='+rtoken
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
                
                
                   
            }

            else{

                
            }
              })
              

             
             


            
              


            res.redirect("back");
             

}


module.exports.resetForgot=function(req,res){

   res.render("forgotPass")

}