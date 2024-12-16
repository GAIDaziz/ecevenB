const express = require("express");
const { getAllEvents, createEvent } = require("../controllers/eventController");

const router = express.Router();

// Routes pour les événements
router.get("/", getAllEvents);         // Obtenir tous les événements
router.post("/", createEvent);         // Créer un nouvel événement

module.exports = router;
