const express=require("express");
const passport=require("passport")
const router=express.Router();
const login=require("../controllers/login");
require("../config/passport-local");



router.get("/login",login.loginPage)
 
router.post('/login' ,passport.authenticate('local', { 
failureRedirect: '/login',failureMessage:"Invalid Username And Password" }),
login.login
);

router.get('/auth/google',passport.authenticate('google', { scope: ["profile","email" ]}));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),login.login
 );


 

module.exports=router;