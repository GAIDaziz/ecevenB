const express = require("express");
const { getAllUsers, createUser } = require("../controllers/userController");
const router = express.Router();

// Routes utilisateurs
router.get("/", getAllUsers);        // Obtenir tous les utilisateurs
router.post("/", createUser);       // Ajouter un utilisateur

module.exports = router;
