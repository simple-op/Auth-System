const user=require("../models/user")
const token=require("../models/verifyToken")
// VERIFIY THE USER AFTER SIGN UP
module.exports.verify=function(req,res){

   token.findOne({verifytoken:req.query.token},function(err,tokenf){
    //  FINDING TOKEN 
              console.log(tokenf);
            if(tokenf){
              // IF FOUND
              user.findOne({email:tokenf.email},function(err,userf){
                   
                if(userf){
                    user.findByIdAndUpdate(userf._id,{verified:true},function(err,user){
                    

                        console.log("verified");
                    })
                    
                  token.findByIdAndDelete(tokenf._id,function(err,tokenf){
                      console.log("Token Deleted")
                  })
                  req.flash("success","Your Email Is Verified . Login Now !!");

                  return res.redirect("/login"); 
                }
                else{
                //  IF EMAIL NOT FOUND
                    req.flash("error","Email Not found . Sign Up First!!");

                    return res.redirect("/login"); 

                }
                  
              })
               

            }

            else{
              // IF TOKEN NOT FOUND
                req.flash("error","Invalid Link or Expired");
                return res.redirect("/login"); 

            }
   })

   


}