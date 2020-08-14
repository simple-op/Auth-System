const express=require("express");
const router=express.Router();
const signup=require("../controllers/signup");


router.get("/signup",signup.createPage)
router.post("/signup",signup.signup)


module.exports=router; 