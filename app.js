const express= require("express");
require("dotenv").config();
const path = require("node:path");
const itemRouter = require("./routes/itemRouter");
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen(process.env.PORT||8080,"localhost",(err)=>{
    if(err){
        throw err
        
    }
    console.log("server started");
})

app.get("/",(req,res)=>{
    res.render("index",{title:"Index page"})
})
app.use("/",itemRouter);