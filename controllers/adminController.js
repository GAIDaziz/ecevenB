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
  
  // Exporter les fonctions
  module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
  };
  