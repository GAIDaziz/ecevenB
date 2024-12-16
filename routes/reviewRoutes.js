const express = require("express");
const { getAllReviews, createReview } = require("../controllers/reviewController");

const router = express.Router();

// Routes pour les avis
router.get("/", getAllReviews);     // Obtenir tous les avis
router.post("/", createReview);     // Ajouter un nouvel avis

module.exports = router;
