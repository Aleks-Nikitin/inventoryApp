const pool = require("./pool");

async function getItemById(id){
    try {
         const {rows} = await pool.query("SELECT * FROM games WHERE id=$1",[id]);
        return rows;
    } catch (error) {
        throw error
    }
   
}

module.exports={
    getItemById
}