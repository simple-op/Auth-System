const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrypt=require("bcrypt");
const User=require("../models/user");
const random=require("randomstring");
const { flash } = require('./middleware');


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.use(new GoogleStrategy({
    clientID: "31189753133-0hm3llpntv263u8matdfb9d6pfjcdjd2.apps.googleusercontent.com",
    clientSecret: "y-QWPkZXIT5DWNvktAiZd6k_",
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error in google strategy-passport', err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user){
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
                    google:true


                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}
                    
                         
                         
                         
                    return done(null,user);
                });
        
            


        }

    }); 
}
));