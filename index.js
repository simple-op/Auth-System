const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
const mongoose=require("./config/mongoose");
const router = require("./routes");
const ejs=require("ejs");
const path=require("path");
const passport = require('passport');
const session=require("express-session");
var cookieParser = require('cookie-parser');
require("./config/passport-local");
require("./config/oauth")
const mongo_connect=require("connect-mongo")(session);
const flash = require('connect-flash');
const cMiddleware=require("./config/middleware");
app.use(express.urlencoded());


app.use(cookieParser());
app.use(session({
   name:"codeial",
   secret:"ptwmjg.ad",
   saveUninitialized:false,
   resave:false,
   cookie:{
     maxAge:(1000*60*60*24*2)
   },
   store:new mongo_connect({

     mongooseConnection:mongoose,
     autoRemove:"disable"

   },function(err){
     console.log(err||"connect-mongo")
   })

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.isUserAuth);

app.use(flash());
app.use(cMiddleware.flash);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));
app.use(express.static('assets'));
app.use("/forgotPass",express.static("assets"))



app.listen(port,function(){
     
  console.log(`Server Running on ${port}`);
})
app.use(router);















