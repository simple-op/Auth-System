const express=require("express");
const passport=require("passport")
const router=express.Router();
const login=require("../controllers/login");





//  FOR LOGIN ROUTE PROTECTION
router.post('/login',
login.login
);
// GOOGLE AUTH


 

module.exports=router;