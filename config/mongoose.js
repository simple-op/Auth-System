const mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/Auth_Systems');


const connection=mongoose.connection;


connection.on("error",function(err){
    if(err){
        console.log(err);
    }
})

connection.once("open",function(){
    console.log("Database connected")
})

module.exports=connection;