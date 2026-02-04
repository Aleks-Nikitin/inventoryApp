const db = require("../db/query");

async function getIndexPage(req,res){
    const games = await db.getAllGames();
    res.render("index",{title:"Index Page",games:games});
}


module.exports={
    getIndexPage,
}