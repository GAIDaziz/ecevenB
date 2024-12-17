const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Inscription
router.post("/register", registerUser);

// Connexion
router.post("/login", loginUser);

// Profil utilisateur sécurisé
router.get("/profile", protect, getUserProfile);

//-----------------------------
// Mise à jour du profil utilisateur             
router.put("/profile", protect, updateUserProfile);

// Suppression de l'utilisateur
router.delete("/profile", protect, deleteUser);

// Liste des utilisateurs (admin)
router.get("/all", protect, getAllUsers);

//----------------------------------------------- la partie qui crache-----------

module.exports = router;
