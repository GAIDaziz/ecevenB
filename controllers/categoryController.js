// categoryController.js

// Simule une base de données en mémoire
let categories = [
  { id: 1, name: "Musique" },
  { id: 2, name: "Conférence" },
  { id: 3, name: "Sport" }
];

// Obtenir toutes les catégories
const getAllCategories = (req, res) => {
  res.json(categories);
};

// Ajouter une nouvelle catégorie
const createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Le nom de la catégorie est requis" });
  }

  const categoryExists = categories.some(
    (cat) => cat.name.toLowerCase() === name.toLowerCase()
  );
  if (categoryExists) {
    return res.status(400).json({ error: "La catégorie existe déjà" });
  }

  const newCategory = { id: categories.length + 1, name };
  categories.push(newCategory);
  res.status(201).json({
    message: "Catégorie créée avec succès",
    newCategory,
  });
};

// Supprimer une catégorie
const deleteCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);

  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);

  if (categoryIndex === -1) {
    return res.status(404).json({ error: "Catégorie non trouvée" });
  }

  categories.splice(categoryIndex, 1);
  res.json({ message: "Catégorie supprimée avec succès" });
};

// Export des fonctions
module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
