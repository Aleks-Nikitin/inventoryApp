const {Router}= require("express");
const devController = require("../controllers/devController");
const devRouter = Router();

devRouter.get("/",devController.getDevPage);
devRouter.get("/add",devController.getForm);
devRouter.post("/add",devController.postDev);
devRouter.get("/delete",devController.deleteDev)
module.exports=devRouter;