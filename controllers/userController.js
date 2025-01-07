const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let users = require("../models/userModel");
const db = require("../config/db");


// Inscription de l'utilisateur
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: "Utilisateur déjà enregistré" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
};

// Connexion de l'utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ error: "Email ou mot de passe incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Email ou mot de passe incorrect" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.json({ message: "Connexion réussie", token });
};

// Affichage du profil utilisateur (route sécurisée)
const getUserProfile = (req, res) => {
  const user = req.user;  // Obtenu depuis le middleware "protect"
  res.json({ message: "Profil utilisateur récupéré avec succès", user });
};



// Mise à jour du profil utilisateur
const updateUserProfile = (req, res) => {
  const { name, email, password } = req.body;
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
  }

  res.json({ message: "Profil mis à jour avec succès", user });
};

// Suppression de l'utilisateur
const deleteUser = (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.user.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  users.splice(userIndex, 1);
  res.json({ message: "Compte supprimé avec succès" });
};

// Liste des utilisateurs (accessible aux admins uniquement)
const getAllUsers = (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Accès refusé" });
  }

  res.json({ message: "Liste des utilisateurs", users });
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};
