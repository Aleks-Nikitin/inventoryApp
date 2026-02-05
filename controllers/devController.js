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
    const{id}=req.query;
    if(id){
        const devInfo= await db.getDevById(id);
        return res.render("devForm",{title:"Dev Form",dev:devInfo[0]});
    }
   res.render("devForm",{title:"Dev form"})
}
const postDev = [validateDev,async function (req,res) {
    const errors =validationResult(req);
    const {id}= req.query;
    if(!errors.isEmpty()){
        if(id){
            req.body.id=id;
            return res.render("devForm",{title:"Dev Form",errors:errors.array(),dev:req.body})
        }
       return res.render("devForm",{title:"Dev Form",errors:errors.array(),dev:req.body})
    }
    const{devname}= matchedData(req);
 
    if(id){
        await db.updateDev(devname,id);
        return res.redirect("/dev")
    }
    await db.postDev(devname);

    res.redirect("/dev");
}]
module.exports={
    getDevPage,
    getForm,
    postDev
}