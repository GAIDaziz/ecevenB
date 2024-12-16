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
    
    // Vérification du champ obligatoire
    if (!name) {
      return res.status(400).json({ error: "Le nom de la catégorie est requis" });
    }
  
    // Vérifier si la catégorie existe déjà
    const categoryExists = categories.some(cat => cat.name.toLowerCase() === name.toLowerCase());
    if (categoryExists) {
      return res.status(400).json({ error: "La catégorie existe déjà" });
    }
  
    const newCategory = { id: categories.length + 1, name };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  };
  
  module.exports = { getAllCategories, createCategory };
  