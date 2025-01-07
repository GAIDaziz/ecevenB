// adminRoutes.js

const express = require("express");
const router = express.Router();


const {
  getAllUsers,
  updateUser,
  deleteUser,
  getDashboardStats,  
} = require("../controllers/adminController");

// Routes
router.get("/users", getAllUsers);        // Voir tous les utilisateurs
router.put("/users/:id", updateUser);     // Modifier un utilisateur
router.delete("/users/:id", deleteUser);  // Supprimer un utilisateur
router.get("/dashboard", getDashboardStats); //tableau de bord

module.exports = router;
