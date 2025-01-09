const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let user = require("../models/userModel");
const db = require("../config/db");


// Inscription de l'utilisateur
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
      const [userExists] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

      if (userExists.length > 0) {
          return res.status(400).json({ error: "Utilisateur déjà enregistré" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

      res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
      res.status(500).json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};

// Connexion de l'utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};


// Affichage du profil utilisateur (route sécurisée)
const getUserProfile = (req, res) => {
  const user = req.user;  // Obtenu depuis le middleware "protect"
  res.json({ message: "Profil utilisateur récupéré avec succès", user });
};



// Mise à jour du profil utilisateur
const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  try {
    let updateQuery = 'UPDATE users SET ';
    const updateValues = [];
    
    if (name) {
      updateQuery += 'name = ?, ';
      updateValues.push(name);
    }

    if (email) {
      updateQuery += 'email = ?, ';
      updateValues.push(email);
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateQuery += 'password = ?, ';
      updateValues.push(hashedPassword);
    }

    updateQuery = updateQuery.slice(0, -2); // Remove last comma and space
    updateQuery += ' WHERE id = ?';
    updateValues.push(userId);

    await db.query(updateQuery, updateValues);

    res.json({ message: "Profil mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
  }
};


// Suppression de l'utilisateur
const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
};


// Liste des utilisateurs (accessible aux admins uniquement)
const getAllUsers = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Accès refusé" });
  }

  try {
    const [users] = await db.query('SELECT id, name, email, role FROM users');
    res.json({ message: "Liste des utilisateurs", users });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
};
