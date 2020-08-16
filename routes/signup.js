const express=require("express");
const router=express.Router();
const signup=require("../controllers/signup");

// FOR USER SIGNUP
// RENDER CREATE PAGE ON THIS ROUTE
router.get("/signup",signup.createPage)
// GETTING DATA FROM FORM
router.post("/signup",signup.signup)


module.exports=router; 