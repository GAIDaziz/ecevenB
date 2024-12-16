const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Inscription
router.post("/register", registerUser);

// Connexion
router.post("/login", loginUser);

// Profil utilisateur (route sécurisée)
router.get("/profile", protect, getUserProfile);

module.exports = router;
