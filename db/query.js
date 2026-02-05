const { post } = require("../routes/itemRouter");
const pool = require("./pool");

async function getItemById(id){
    try {
         const {rows} = await pool.query("SELECT * FROM games WHERE id=$1",[id]);
        return rows;
    } catch (error) {
        throw error
    }
   
}
async function postItem(name,yr,bio,devid,genreid){
    console.log(`postItem:${devid},${genreid},${typeof devid}`);
    await pool.query("INSERT INTO games(name,yr,bio,devid,genreid) VALUES($1,$2,$3,$4,$5)",[name,yr,bio,Number(devid),Number(genreid)]);
}
async function updateItem(name,yr,bio,devid,genreid,id){
    await pool.query("UPDATE games SET name=$1, yr=$2,bio=$3,devid=$4,genreid=$5 WHERE id =$6",[name,yr,bio,devid,genreid,id])
}
async function deleteItem(id){
    await pool.query("DELETE FROM games WHERE id =$1",[id])
}
async function getAllGames() {
    const {rows}=await pool.query("SELECT * FROM games");
    return rows;
}
async function getAllDevs(){
    const {rows}=await pool.query("SELECT * FROM devs");
    return rows;
}
async function getDevById(id) {
    const {rows}= await pool.query("SELECT * FROM devs WHERE id=$1",[id]);
    return rows;
}
async function postDev(devname){
    await pool.query("INSERT INTO devs(devname) VALUES($1)",[devname]);
}
async function updateDev(devname,id){
    await pool.query("UPDATE devs SET devname=$1 WHERE id=$2",[devname,id]);
}
async function getAllDevIds(){
    const{rows}=await pool.query("SELECT id FROM devs");
    const idList =[];
    rows.forEach(row=>{
        idList.push(row.id);
    })
    return idList;
}
async function getAllGenreIds() {
    const {rows}=await pool.query("SELECT id FROM genres");
    const idList=[];
    rows.forEach(row=>{
        idList.push(row.id);
    })
    return idList;
}
async function getAllGenres(){
    const {rows}= await pool.query("SELECT * FROM genres");
    return rows;
}
async function getGamesByDev(devid) {
    const {rows}= await pool.query("SELECT name,yr,devname,games.id FROM games JOIN devs ON games.devid = devs.id WHERE devs.id=$1",[devid]);
    return rows;
}
module.exports={
    getItemById,
    getAllGames,
    getAllDevs,
    getGamesByDev,
    getAllGenres,
    getAllGenreIds,
    getAllDevIds,
    postDev,
    updateDev,
    getDevById,
    deleteItem,
    postItem,
    updateItem
}