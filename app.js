const express= require("express");
require("dotenv").config();
const path = require("node:path");
const itemRouter = require("./routes/itemRouter");
const indexRouter=require("./routes/indexRouter");
const devRouter = require("./routes/devRouter");
const genreRouter = require("./routes/genreRouter");
const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
const port = process.env.PORT || 8070;
app.listen(port,"0.0.0.0",(err)=>{
    if(err){
        throw new Error
        
    }
    console.log("server started");
})

app.use("/",indexRouter,itemRouter);
app.use("/dev",devRouter);
app.use("/genre",genreRouter);
