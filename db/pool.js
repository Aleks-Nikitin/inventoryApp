const {Pool}=require("pg");
require("dotenv").config();

module.exports=new Pool({
    connectionString:process.env.DB_CON||process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL
})
