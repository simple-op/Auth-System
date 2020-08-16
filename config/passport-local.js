const User=require("../models/user");
// using bcrypt to encrypt passcode
const bcrypt=require("bcrypt");
// 
const passport = require('passport')
// requring local passport strategy to login from db 
const LocalStrategy = require('passport-local').Strategy;


// using local strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    ,passReqToCallback:true

  },
    function(req,username, password, done) {
          
// finding user with the email in db
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          // if  user not found
            req.flash("error","Email Not Registered")
          return done(null, false, { message: 'Incorrect username.' });
        }
        // using bcrypt to compare entered passcode 
        bcrypt.compare(password,user.password, function(err, result){
          if (!result) {
            // invalid passcode if doesnt match
            req.flash("error","Invalid Password")
            return done(null, false, { message: 'Incorrect password.' });
          }
            

            
           if(user.verified===false){
            //  if email is not verified
             req.flash("warning","Plzz Verify Your Email");
              // cant login without verification
            return done(null,false,{message:"Email not verified"});
           }
           else{
          // everything ok then login ..passing user to req object
          return done(null, user);}
        
         }); 
         });
         }
         ));
  // serializing user id
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // deserializing
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
 
passport.isUserAuth=(req,res,next)=>{
// authenthication function
  if(req.isAuthenticated()){

    res.locals.user=req.user;
  }

  return next();

}

passport.isAuth=(req,res,next)=>{

  if(req.isAuthenticated()){

    return next();
  }
  
  return res.redirect("/login");

}
