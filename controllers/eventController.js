// controllers/eventController.js

let events = require("../models/eventModel");

// Création d'un événement
const createEvent = (req, res) => {
  const { title, description, date, location, price, category } = req.body;

  if (!title || !date || !location || !price || !category) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  const event = {
    id: events.length + 1,
    title,
    description,
    date,
    location,
    price,
    category,
    organizer: req.user.id,
  };

  events.push(event);
  res.status(201).json({ message: "Événement créé avec succès", event });
};

// Liste des événements
const getEvents = (req, res) => {
  const { category, date } = req.query;

  let filteredEvents = events;

  if (category) {
    filteredEvents = filteredEvents.filter(
      (event) => event.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (date) {
    filteredEvents = filteredEvents.filter(
      (event) => new Date(event.date).toISOString().split("T")[0] === date
    );
  }

  res.json(filteredEvents);
};

// Détails d'un événement
const getEventById = (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ error: "Événement non trouvé" });
  }

  res.json(event);
};

// Mise à jour d'un événement
const updateEvent = (req, res) => {
  const event = events.find((e) => e.id === parseInt(req.params.id));

  if (!event) {
    return res.status(404).json({ error: "Événement non trouvé" });
  }

  if (event.organizer !== req.user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  const { title, description, date, location, price, category } = req.body;

  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (location) event.location = location;
  if (price) event.price = price;
  if (category) event.category = category;

  res.json({ message: "Événement mis à jour", event });
};

// Suppression d'un événement
const deleteEvent = (req, res) => {
  const eventIndex = events.findIndex((e) => e.id === parseInt(req.params.id));

  if (eventIndex === -1) {
    return res.status(404).json({ error: "Événement non trouvé" });
  }

  const event = events[eventIndex];
  if (event.organizer !== req.user.id) {
    return res.status(403).json({ error: "Accès refusé" });
  }

  events.splice(eventIndex, 1);
  res.json({ message: "Événement supprimé avec succès" });
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
