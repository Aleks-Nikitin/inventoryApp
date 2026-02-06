const db = require("../db/query");
const{matchedData,validationResult,body}=require("express-validator");
const alphaErr = "must only contain letters.";
const lengthErr="length must be between 2 and 60";
const validateGenre=[
    body("genname").trim()
    .isAlpha().withMessage(`Error genre name:${alphaErr}`)
    .isLength({min:2,max:60}).withMessage(`Error genre name:${lengthErr}`)
]
async function getGenrePage(req,res) {
    const genres= await db.getAllGenres();
    if(req.query.id){
        const genreGames = await db.getGamesByGenre(req.query.id);
       return  res.render("genre",{genres:genres,games:genreGames})
    }
    res.render("genre",{genres:genres});
}
async function deleteGenre(req,res) {
    const {id}=req.query;
    await db.deleteGenreById(id);
    res.redirect("/genre");
}

async function getForm(req,res) {
    const{id}=req.query;
    if(id){
        const genreInfo= await db.getGenreById(id);
        return res.render("genreForm",{title:"Genre Form",genre:genreInfo[0]});
    }
   res.render("genreForm",{title:"genre form"})
}
const postGenre = [validateGenre,async function (req,res) {
    const errors =validationResult(req);
    const {id}= req.query;
    if(!errors.isEmpty()){
        if(id){
            req.body.id=id;
            return res.render("genreForm",{title:"genre Form",errors:errors.array(),genre:req.body})
        }
       return res.render("genreForm",{title:"genre Form",errors:errors.array(),genre:req.body})
    }
    const{genname}= matchedData(req);
 
    if(id){
        await db.updateGenre(genname,id);
        return res.redirect("/genre")
    }
    await db.postGenre(genname);

    res.redirect("/genre");
}]
module.exports={
    getGenrePage,
    getForm,
    postGenre,
    deleteGenre
}