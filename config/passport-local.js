const User=require("../models/user");
const bcrypt=require("bcrypt");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    ,passReqToCallback:true

  },
    function(req,username, password, done) {
          

      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            req.flash("error","Email Not Registered")
          return done(null, false, { message: 'Incorrect username.' });
        }
        
        bcrypt.compare(password,user.password, function(err, result){
          if (!result) {
            req.flash("error","Invalid Password")
            return done(null, false, { message: 'Incorrect password.' });
          }
            

            
           if(user.verified===false){
             req.flash("warning","Plzz Verify Your Email");

            return done(null,false,{message:"Email not verified"});
           }
           else{
          
          return done(null, user);}
        
         }); 
         });
         }
         ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
 
passport.isUserAuth=(req,res,next)=>{

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
