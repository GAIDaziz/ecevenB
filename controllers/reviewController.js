// Simule une base de données en mémoire
let reviews = [
    {
      id: 1,
      event_id: 1,
      user_id: 1,
      rating: 5,
      comment: "Événement incroyable !",
      date: "2024-12-10T18:00:00"
    }
  ];
  
  // Obtenir tous les avis
  const getAllReviews = (req, res) => {
    res.json(reviews);
  };
  
  // Ajouter un nouvel avis
  const createReview = (req, res) => {
    const { event_id, user_id, rating, comment } = req.body;
  
    // Validation des champs requis
    if (!event_id || !user_id || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Données invalides pour l'avis" });
    }
  
    const newReview = {
      id: reviews.length + 1,
      event_id: parseInt(event_id),
      user_id: parseInt(user_id),
      rating: parseInt(rating),
      comment: comment || "",
      date: new Date().toISOString()
    };
  
    reviews.push(newReview);
    res.status(201).json(newReview);
  };
  
  module.exports = { getAllReviews, createReview };
  