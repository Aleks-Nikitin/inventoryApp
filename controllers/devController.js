const db = require("../db/query");
const{matchedData,validationResult,body}=require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr="length must be between 2 and 60";
const validateDev=[
    body("devname").trim()
    .isAlpha().withMessage(`Error developer's name:${alphaErr}`)
    .isLength({min:2,max:60}).withMessage(`Error dev name:${lengthErr}`)
]
async function getDevPage(req,res) {
    const devs= await db.getAllDevs();
    if(req.query.id){
        const devGames = await db.getGamesByDev(req.query.id);
       return  res.render("dev",{devs:devs,games:devGames})
    }
    res.render("dev",{devs:devs});
}


async function getForm(req,res) {
   return res.render("devForm",{title:"Dev form"})
}
const postDev = [validateDev,async function (req,res) {
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.render("devForm",{title:"Dev Form",errors:errors.array(),dev:req.body})
    }
    const{devname}= matchedData(req);
    await db.postDev(devname);

    res.redirect("/dev");
}]
module.exports={
    getDevPage,
    getForm,
    postDev
}