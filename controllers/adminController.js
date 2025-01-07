// Simule une base de données en mémoire
let users = [
    { id: 1, name: "Admin User", email: "admin@example.com", role: "ADMIN" },
    { id: 2, name: "Event Organizer", email: "organizer@example.com", role: "ORGANIZER" },
    { id: 3, name: "Participant User", email: "participant@example.com", role: "PARTICIPANT" },
  ];

  
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
  const getAllUsers = (req, res) => {
    res.json(users);
  };
  
  // Mettre à jour un utilisateur avec validations
  const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
  
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  
    // Validation de l'email
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: "Email invalide" });
    }
  
    // Validation du rôle
    if (role && !isValidRole(role)) {
      return res.status(400).json({ error: "Rôle invalide" });
    }
  
    // Mise à jour des données
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (role) users[userIndex].role = role;
  
    res.json({
      message: "Utilisateur mis à jour avec succès",
      user: users[userIndex],
    });
  };
  
  // Supprimer un utilisateur
  const deleteUser = (req, res) => {
    const { id } = req.params;
  
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  
    users.splice(userIndex, 1);
    res.json({ message: "Utilisateur supprimé avec succès" });
  };
  
  // Simuler des données dans adminController.js
let events = [
  { id: 1, title: "Concert de jazz", date: "2024-12-20" },
  { id: 2, title: "Conférence tech", date: "2024-12-22" },
];

let categories = [
  { id: 1, name: "Musique" },
  { id: 2, name: "Conférence" },
];

let reviews = [
  { id: 1, eventId: 1, userId: 2, rating: 5, comment: "Super événement !" },
];

  
  
  // Tableau de bord : statistiques clés
const getDashboardStats = (req, res) => {
  const totalUsers = users.length;
  const totalEvents = events.length;      // Simulez les événements
  const totalCategories = categories.length;  // Simulez les catégories
  const totalReviews = reviews.length;    // Simulez les avis

  res.json({
    message: "Statistiques du tableau de bord",
    stats: {
      totalUsers,
      totalEvents,
      totalCategories,
      totalReviews,
    },
  });
};




  // Exporter les fonctions
  module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    getDashboardStats,  
  };
  