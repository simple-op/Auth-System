const express=require("express");
const router=express.Router();
const passport=require("passport")



router.get("/verify",require("../controllers/verify").verify)

  






router.use(require("./signup")); 
router.use(require("./login"));
router.get("/*",function(req,res){
    
    res.redirect("https://determined-morse-7bb646.netlify.app");
  })
  



module.exports=router; 