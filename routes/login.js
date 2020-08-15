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

 

module.exports=router;