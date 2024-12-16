const express = require("express");
const { getAllCategories, createCategory } = require("../controllers/categoryController");

const router = express.Router();

// Routes pour les catégories
router.get("/", getAllCategories);       // Obtenir toutes les catégories
router.post("/", createCategory);        // Ajouter une nouvelle catégorie

module.exports = router;
