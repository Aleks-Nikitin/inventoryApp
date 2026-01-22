const db =require("../db/query");

async function getItem(req,res){
    const {id} = req.query;
    const itemInfo = await db.getItemById(id);
    res.render("item",{item:itemInfo})

}


module.exports={
    getItem
}