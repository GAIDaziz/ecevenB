const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accès refusé, aucun jeton fourni" });
  }

  try {
    const verified = jwt.verify(token, "secretkey"); // Clé temporaire
    req.user = verified; // Ajoute l'utilisateur à la requête
    next(); // Passe à la prochaine fonction
  } catch (err) {
    res.status(400).json({ error: "Jeton invalide" });
  }
};

module.exports = { protect };
