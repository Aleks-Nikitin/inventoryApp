const db = require("../db/query");

async function getIndexPage(req,res){
    const games = await db.getAllGames();
    res.render("index",{title:"Index Page",games:games});
}

async function getDevPage(req,res) {
    const devs= await db.getAllDevs();
    if(req.query.id){
        const devGames = await db.getGamesByDev(req.query.id);
       return  res.render("dev",{devs:devs,games:devGames})
    }
    res.render("dev",{devs:devs});
}
module.exports={
    getIndexPage,
    getDevPage
}