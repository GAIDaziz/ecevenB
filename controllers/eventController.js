// Simule une base de données en mémoire
let events = [
    {
      id: 1,
      title: "Concert de Jazz",
      description: "Une soirée de jazz incroyable.",
      date: "2024-12-25T19:00:00",
      location: "Paris, Salle A",
      price: 50.00,
      organizer_id: 1,
      category_id: 1
    }
  ];
  
  // Obtenir tous les événements
  const getAllEvents = (req, res) => {
    res.json(events);
  };
  
  // Créer un nouvel événement
  const createEvent = (req, res) => {
    const { title, description, date, location, price, organizer_id, category_id } = req.body;
  
    // Vérification des champs requis
    if (!title || !date || !location || !price || !organizer_id || !category_id) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }
  
    const newEvent = {
      id: events.length + 1,
      title,
      description,
      date,
      location,
      price: parseFloat(price),
      organizer_id: parseInt(organizer_id),
      category_id: parseInt(category_id)
    };
  
    events.push(newEvent);
    res.status(201).json(newEvent);
  };
  
  module.exports = { getAllEvents, createEvent };
  