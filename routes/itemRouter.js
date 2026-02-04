const {Router}= require("express");
const itemController = require("../controllers/itemController")
const itemRouter = Router();

itemRouter.get("/item",itemController.getItem);
itemRouter.post("/item",itemController.postItem);
itemRouter.get("/item/add",itemController.getItemForm);
itemRouter.get("/item/delete",itemController.deleteItem);
module.exports=itemRouter;