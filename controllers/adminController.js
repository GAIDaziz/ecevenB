const pool = require("../config/db");

// Fonctions de validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidRole = (role) => {
  const validRoles = ["ADMIN", "ORGANIZER", "PARTICIPANT"];
  return validRoles.includes(role);
};

// Obtenir tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour un utilisateur avec validations
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }
    if (role && !isValidRole(role)) {
      return res.status(400).json({ error: 'Rôle invalide' });
    }

    await pool.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Obtenir les statistiques du tableau de bord
const getDashboardStats = async (req, res) => {
  try {
    const [userCount] = await pool.query('SELECT COUNT(*) AS totalUsers FROM users');
    const [eventCount] = await pool.query('SELECT COUNT(*) AS totalEvents FROM events');
    const [categoryCount] = await pool.query('SELECT COUNT(*) AS totalCategories FROM categories');
    const [reviewCount] = await pool.query('SELECT COUNT(*) AS totalReviews FROM reviews');

    res.json({
      message: 'Statistiques du tableau de bord',
      stats: {
        totalUsers: userCount[0].totalUsers,
        totalEvents: eventCount[0].totalEvents,
        totalCategories: categoryCount[0].totalCategories,
        totalReviews: reviewCount[0].totalReviews
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Exporter les fonctions
module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getDashboardStats,  
};
