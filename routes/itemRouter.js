const {Router}= require("express");
const itemController = require("../controllers/itemController")
const itemRouter = Router();

itemRouter.get("/item",itemController.getItem);
itemRouter.post("/item",itemController.postItem);
itemRouter.get("/item/add",itemController.getItemForm);
module.exports=itemRouter;