const{Router}= require("express");
const genreController=require("../controllers/genreController");
const genreRouter=Router();
genreRouter.get("/",genreController.getGenrePage)
genreRouter.get("/add",genreController.getForm)
genreRouter.post("/add",genreController.postGenre)
genreRouter.get("/delete",genreController.deleteGenre)
module.exports=genreRouter;