const express= require("express");
require("dotenv").config();
const path = require("node:path");
const itemRouter = require("./routes/itemRouter");
const indexRouter=require("./routes/indexRouter");
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT||3000,"localhost",(err)=>{
    if(err){
        throw err
        
    }
    console.log("server started");
})

app.use("/",indexRouter,itemRouter);
