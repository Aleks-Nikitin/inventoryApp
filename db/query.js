const pool = require("./pool");

async function getItemById(id){
    try {
         const {rows} = await pool.query("SELECT * FROM games WHERE id=$1",[id]);
        return rows;
    } catch (error) {
        throw error
    }
   
}
async function getAllGames() {
    const {rows}=await pool.query("SELECT * FROM games");
    return rows;
}
async function getAllDevs(){
    const {rows}=await pool.query("SELECT * FROM devs");
    return rows;
}
async function getGamesByDev(devid) {
    const {rows}= await pool.query("SELECT name,yr,devname FROM games JOIN devs ON games.devid = devs.id");
    return rows;
}
module.exports={
    getItemById,
    getAllGames,
    getAllDevs,
    getGamesByDev
}