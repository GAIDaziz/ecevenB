// categoryRoutes.js

const express = require("express");
const router = express.Router();

// Import correct du contrôleur
const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Routes
router.get("/", getAllCategories);       // Obtenir toutes les catégories
router.post("/", createCategory);        // Créer une nouvelle catégorie
router.delete("/:id", deleteCategory);   // Supprimer une catégorie

module.exports = router;
