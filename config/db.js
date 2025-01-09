const mysql = require("mysql2/promise");
require("dotenv").config(); 

// Connexion MySQL
const pool = mysql.createPool({
  host: "127.0.0.1", 
  user: "root",
  password: "", 
  database: "eventura"
});

module.exports = pool;
