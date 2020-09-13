// REQURING EXPRESS
const express=require("express");
// ENVOKING EXPRESS FUNCTION
const app=express();
// SETTING PORT FOR WEBAPP
const port=process.env.PORT || 8000;
// RERQURING MONGOOSE CONNECTION
const mongoose=require("./config/mongoose");
// REQURING ROUTES
const router = require("./routes");
// FOR TEMPLATES REQURING EJS
const ejs=require("ejs");
// REQURING NODE PATH
const path=require("path");
// REQURING PASSPORT
const passport = require('passport');
// FOR SESSION CREATION REQURING EXPRESS SESSION
const session=require("express-session");
// REQURING COOKIE PARSER
var cookieParser = require('cookie-parser');
// REQURING PASSPORT STRATAGIES FROM CONFIG FOLDER 

// MONGO CONNECT FOR MAINTING SESSION IN DB

//  REQURING CONNECT FLASH FOR FLASH MESSAGES IN SESSION
const flash = require('connect-flash');
// CUSTOM MIDDLE WARE FOR FLASH MESSAGES
const cMiddleware=require("./config/middleware");
// URL ENCODER TO GET FORM DETAILS
var cors = require('cors')
app.use(cors())
app.use(express.urlencoded());
app.use(express.json({ type: ['application/json', 'application/csp-report'] }));


// USING COOKIE PARSER
app.use(cookieParser());
// CREATING SEESION
app.use(session({
   name:"codeial",
   secret:"ptwmjg.ad",
   saveUninitialized:false,
   resave:false,
   cookie:{
     maxAge:(10000)
   },
  

}))


// CHECKING USER AUTHENTICATION

// USING FLASH MIDDLEWARE
app.use(flash());
// USING CUSTOM MIDDLE WARE FOR FLASH
app.use(cMiddleware.flash);

// SETTING EJS
app.set("view engine","ejs");
// SETTING VIEWS
app.set("views",path.join(__dirname,"./views"));
// SETTING STATICS
app.use(express.static('assets'));
app.use("/forgotPass",express.static("assets"))


// FIRING SERVER UP 
app.listen(port,function(){
     
  console.log(`Server Running on ${port}`);
})
app.use(router);















