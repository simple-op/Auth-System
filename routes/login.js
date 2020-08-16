const express=require("express");
const passport=require("passport")
const router=express.Router();
const login=require("../controllers/login");
require("../config/passport-local");


// FOR LOGIN
router.get("/login",login.loginPage)
//  FOR LOGIN ROUTE PROTECTION
router.post('/login' ,passport.authenticate('local', { 
failureRedirect: '/login',failureMessage:"Invalid Username And Password" }),
login.login
);
// GOOGLE AUTH
router.get('/auth/google',passport.authenticate('google', { scope: ["profile","email" ]}),function(req,res){
    req.flash("success","logged in with gmail");
    return res.redirect("/")

});
//  GOOGLE AUTH CALLBACK
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),login.login
 );


 

module.exports=router;