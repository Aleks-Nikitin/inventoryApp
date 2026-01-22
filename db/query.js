const pool = require("./pool");

async function getItemById(id){
    const {rows} = await pool.query("SELECT * FROM games WHERE id=$1",[id]);
    return rows;
}

module.exports={
    getItemById
}