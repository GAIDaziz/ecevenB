const express = require("express");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
const PORT = 5000;

// Middleware pour lire le JSON
app.use(express.json());

// Routes principales
app.use("/api/users", userRoutes);

//evénement rout 
app.use("/api/events", eventRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
