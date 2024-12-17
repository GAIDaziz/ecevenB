// routes/eventRoutes.js

const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const { protect } = require("../middleware/auth");

const router = express.Router();

// Routes pour les événements
router.post("/", protect, createEvent);         // Création
router.get("/", getEvents);                    // Liste
router.get("/:id", getEventById);              // Détails
router.put("/:id", protect, updateEvent);      // Mise à jour
router.delete("/:id", protect, deleteEvent);   // Suppression

module.exports = router;
