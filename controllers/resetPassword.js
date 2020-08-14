const model=require("../models/user");
const bcrypt=require("bcrypt");

module.exports.reset=async function(req,res){

    //  console.log(req.body.c_password)
    bcrypt.compare( req.body.p_password,req.user.password, function(err, result){
        if (!result) {

            console.log("Didnt Password")
        }
       else{
        function validatePassword(password) {
            const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$/;
            return re.test(password);
            
        }
       if(validatePassword(req.body.n_password))
        {
                  if(req.body.cn_password===req.body.n_password)
                   {             bcrypt.hash(req.body.n_password, 10, function(err, hash){
                                 model.findByIdAndUpdate(req.user._id,{ password:hash },function(err,user){
                                    
                                         
                    })

                   })
                            
                   }
                   else{
                          
                            
                             
                            

                   }

                   
        } 
        else{


        }
      
           

       } 

    })
    return res.redirect("/");

}