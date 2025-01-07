const mysql = require("mysql2");
require("dotenv").config(); 

// Connexion MySQL
const db = mysql.createConnection({
  host: "127.0.0.1", 
  user: "root",
  password:"", 
  database: "eventura"
});


db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
  } else {
    console.log("Connexion à la base de données réussie !");
  }
});

module.exports = db;
