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
  
  // Créer un nouvel avis
  const createReview = (req, res) => {
    const { event_id, user_id, rating, comment } = req.body;
  
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
  
  // Mettre à jour un avis
  const updateReview = (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
  
    const reviewIndex = reviews.findIndex((r) => r.id === parseInt(id));
  
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Avis non trouvé" });
    }
  
    // Mise à jour des champs modifiables
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "La note doit être comprise entre 1 et 5" });
    }
  
    reviews[reviewIndex] = {
      ...reviews[reviewIndex],
      rating: rating || reviews[reviewIndex].rating,
      comment: comment || reviews[reviewIndex].comment,
      date: new Date().toISOString() // Mise à jour automatique de la date
    };
  
    res.json(reviews[reviewIndex]);
  };
  
  // Supprimer un avis
  const deleteReview = (req, res) => {
    const { id } = req.params;
    const reviewIndex = reviews.findIndex((r) => r.id === parseInt(id));
  
    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Avis non trouvé" });
    }
  
    reviews.splice(reviewIndex, 1);
    res.json({ message: "Avis supprimé avec succès" });
  };
  
  module.exports = {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview
  };
  