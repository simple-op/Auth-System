const random=require("randomstring");
const model=require("../models/token");
const user=require("../models/user")
const nodemailer = require('nodemailer');
const bcrypt=require("bcrypt");


module.exports.forgot=function(req,res){
               user.findOne({email:req.body.email},function(err,user){

    
 
              if(user){                
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

                let transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,  
                  service: 'gmail',
                  auth: {
                    user: 'rameshkumar160196@gmail.com', 
                
                
                    
                    pass: 'ptwmjg.ad' 
                  }
                });
                
                let mailOptions = {
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
              

             
             


            
              
            }
            })
            res.redirect("back");


             

}


module.exports.resetForgot=function(req,res){
     
    model.findOne({token:req.query.token},function(err,token){

        if(token&&(Date.now()-token.created)<60000){
            res.render("forgotPass",{
                token:token.token})
                   
        }
        else{
            res.redirect("/")
        }  

    })



//     if(!token||(Date.now()-token.created)>60000)           


//    res.render("forgotPass")

}



module.exports.resetForgotPass=function(req,res){

    model.findOne({token:req.body.token},function(err,token){

        if(token&&(Date.now()-token.created)<60000){
            
            user.findOne({email:token.email},function(err,userf){

                function validatePassword(password) {
                    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
                    return re.test(password);
                    
                }
               if(validatePassword(req.body.password))
                {
                          if(req.body.re_password===req.body.password)
                           {             bcrypt.hash(req.body.password, 10, function(err, hash){
                                         user.findByIdAndUpdate(userf._id,{ password:hash },function(err,user){
                                          
                                            console.log("pass changed")
                                            
                                                 
                            })
        
                           })
                                    
                           }

 
            }
                   
        })
    }
        else{
          return  res.redirect("/");
        } 
        return  res.redirect("/");
    })

  

}