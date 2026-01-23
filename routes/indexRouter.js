const {Router}= require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/",indexController.getIndexPage);
indexRouter.get("/devs",indexController.getDevPage);
module.exports=indexRouter;