const express=require("express");
const router=express.Router();
const passport=require("passport")



router.get("/",require("../controllers/home").home);
router.get("/logout",require("../controllers/logout").logout);
router.post("/resetPassword",require("../controllers/resetPassword").reset)
router.post("/forgot",require("../controllers/forgotPassword").forgot)
router.get("/forgotPass",require("../controllers/forgotPassword").resetForgot)
router.post("/resetForgotPass",require("../controllers/forgotPassword").resetForgotPass)

  






router.use(require("./signup"));
router.use(require("./login"));

module.exports=router; 