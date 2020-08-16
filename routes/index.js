const express=require("express");
const router=express.Router();
const passport=require("passport")


// FOR HOMEPAGE
router.get("/",require("../controllers/home").home);
// FOR LOGOUT
router.get("/logout",require("../controllers/logout").logout);
// FOR RESET THE PASSCODE ON POST METHOD
router.post("/resetPassword",require("../controllers/resetPassword").reset)
// FOR FORGOT PASSCODE POST METHOD
router.post("/forgot",require("../controllers/forgotPassword").forgot)
// FOR RENDER FORGOT NEW PASSCODE PAGE
router.get("/forgotPass",require("../controllers/forgotPassword").resetForgot)
// FOR SENDING EMAIL FOR FORGOT PASS
router.post("/resetForgotPass",require("../controllers/forgotPassword").resetForgotPass)
// FOR VERIFY OF EMAIL
router.get("/verify",require("../controllers/verify").verify)

  






router.use(require("./signup"));
router.use(require("./login"));
router.get("/*",function(req,res){
    
    res.redirect("/");
  })
  



module.exports=router; 