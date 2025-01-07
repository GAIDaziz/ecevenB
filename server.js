/*const express = require("express");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = 3000;

// Middleware pour lire le JSON
app.use(express.json());

// Routes principales
app.use("/api/users", userRoutes);

//evénement rout 
app.use("/api/events", eventRoutes);

//catégorie rout 
app.use("/api/categories", categoryRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
