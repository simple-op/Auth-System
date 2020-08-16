const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt=require("bcrypt");
const User=require("../models/user");
const random=require("randomstring");
const token=require("../models/verifyToken")
const { flash } = require('./middleware');


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: "452208836900-m28iubjinjde3et71eadr009md00h3mu.apps.googleusercontent.com",
    clientSecret: "Qkvx6iJYxrABN3tHRPj_AJcJ",
    callbackURL: "https://auth-systems.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error in google strategy-passport', err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user){
            if(user.verified===false){
                User.findByIdAndUpdate(user._id,{verified:true},function(err,user){
                        token.findOneAndDelete({email:user.email},function(err){

                        })
                      
                    console.log("verified");
                })
               }       
                 
            // if found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and set it as req.user
            let pass=random.generate({
                length:16
                

            })
            

                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: pass,
                    google:true,
                    verified:true


                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}
                    
                  
                         
                    return done(null,user);
                });
        
            


        }

    }); 
}
));