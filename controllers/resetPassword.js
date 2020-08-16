const model=require("../models/user");
// USING BCRYPT FOR ENCRYTING RESETED PASS IN DB
const bcrypt=require("bcrypt");
// RESET CONTROLLER 
module.exports.reset=async function(req,res){

    //  console.log(req.body.c_password)
    // FINDING HASH OF CURRENT PASSCODE IF GOOGLE USER RESET HIS/HER PASSCODE
    bcrypt.hash(req.user.password, 10, function(err, hash){ 
                 console.log(req.user.password)
                 console.log(req.body.p_password)
                //  COMPARE PASSCODE WITH BCRYPT COMPARE FUNCTION  
    bcrypt.compare( req.body.p_password,req.user.google===true?hash:req.user.password, function(err, result){
        // IF PASSCODES DOESNT MATCH THEN FOR GOOGLE USERS CURRENT PASSCODE WILL BE SENT AUTOMATICALLY 
        if (!result) {
            
            console.log("sdfds")
       // FLASH FOR INVALID CURRENT PASSCODE
            req.flash("error","Invalid Current Password");
            return res.redirect("back");
        }
       else{ 
        //    REGX* FUNCTION FOR CHECKING NEW PASSCODE
        function validatePassword(password) {
            const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
            return re.test(password);
            
            
        }
        //IF REGX* FUNTION RETURN  TRUE
       if(validatePassword(req.body.n_password))
        {         
            // IF REPEAT NEW PASSCODE AND NEW PASSCODE MATCHES 
                  if(req.body.cn_password===req.body.n_password)
                   {             bcrypt.hash(req.body.n_password, 10, function(err, hash){
                                 model.findByIdAndUpdate(req.user._id,{ password:hash,google:false },function(err,user){
                                    
                                         
                    })

                   })
                //    FLASH FOR SUCCESS
                   req.flash("success","Password Changed Successfully");
                  
                    return res.redirect("/"); 
                   
                   }
                   else{
                          
                  // IF REPEAT NEW PASSCODE AND NEW PASSCODE DOESNT MATCHE 
                    req.flash("error","New Password Mismatch");
                    return res.redirect("back");
        
                             
                            

                   }

                   
        } 
        else{
            // IF REGX* DOESNT VALIDATE PASSCODE
            req.flash("error","Invalid New Password");
            return res.redirect("back");

        }
      
           

       } 

    })
    

})
}