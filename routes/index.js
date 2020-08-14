const express=require("express");
const router=express.Router();



router.get("/",require("../controllers/home").home);
router.get("/logout",require("../controllers/logout").logout);
router.post("/resetPassword",require("../controllers/resetPassword").reset)
router.post("/forgot",require("../controllers/forgotPassword").forgot)
router.get("/forgotPass",require("../controllers/forgotPassword").resetForgot)





router.use(require("./signup"));
router.use(require("./login"));

module.exports=router; 