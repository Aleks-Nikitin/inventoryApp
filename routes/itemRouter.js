const {Router}= require("express");
const itemController = require("../controllers/itemController")
const itemRouter = Router();

itemRouter.get("/item",itemController.getItem)

module.exports=itemRouter;