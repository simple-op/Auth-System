// custom middle ware for flash messages
module.exports.flash=function(req,res,next){
        res.locals.flash={
              "success":req.flash("success"),
              "error":req.flash("error"),
              "warning":req.flash("warning")
        }
       
        next();

}