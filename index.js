const express = require("express");
const cors = require("cors");
require("dotenv").config();


// Importation des routes
const db = require("./config/db"); // Assurez-vous que ce fichier configure bien la connexion à MySQL.
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes principales
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes); // Attention à ce que ces routes soient bien définies dans adminRoutes.js

// Route d'accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Eventura !");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
