// Simule une base de données en mémoire
let users = [
    { id: 1, name: "Alice", role: "ADMIN" },
    { id: 2, name: "Bob", role: "ORGANIZER" },
    { id: 3, name: "Charlie", role: "PARTICIPANT" }
  ];
  
  // Obtenir tous les utilisateurs
  const getAllUsers = (req, res) => {
    res.json(users);
  };
  
  // Ajouter un utilisateur
  const createUser = (req, res) => {
    const { name, role } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: "Nom et rôle requis" });
    }
    const newUser = { id: users.length + 1, name, role };
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  module.exports = { getAllUsers, createUser };
  