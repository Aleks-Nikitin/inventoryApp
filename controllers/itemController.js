const db =require("../db/query");
const {matchedData,body,validationResult}=require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 50 characters.";
const yrErr="must be between 1910 and 2040";
const devErr ="Not a valid developer";
const bioErr ="must not exceed 300 characters";
const genreId = "Not a valid genre"
const validateGame=[
    body("name").trim()
    .isAlpha().withMessage(`Error name:${alphaErr}`)
    .isLength({min:1,max:50}).withMessage(`Error name:${lengthErr}`),
    body("yr").trim()
    .isInt({min:1910,max:2040}).withMessage(`Error year: ${yrErr}`),
    body("devid").trim()
    .exists().withMessage(`Error dev:${devErr}`),
    body("genreid").trim()
    .exists().withMessage(`Error genre:${genreId}`),
    
    body("bio").trim()
    .isLength({max:300}).withMessage(`Error description:${bioErr}`)
]
async function getItem(req,res){
    const {id} = req.query;
    const itemInfo = await db.getItemById(id);
    res.render("item",{item:itemInfo})

}
async function getItemForm(req,res){
    const devs = await db.getAllDevs();
    const genres = await db.getAllGenres();
    res.render("itemForm.ejs",{title:"Add your game",devs:devs,genres:genres});
}
const postItem=[validateGame,async function (req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         const devs = await db.getAllDevs();
        const genres = await db.getAllGenres();
        return res.status(400).render("itemForm",{
            errors:errors.array(),title:"Add your game",devs:devs,genres:genres
        })
    }
    const {name,yr,bio,devid,genreid}=matchedData(req);
    await db.postItem(name,yr,bio,devid,genreid);
    res.redirect("/")
}]

module.exports={
    getItem,
    getItemForm,
    postItem
}