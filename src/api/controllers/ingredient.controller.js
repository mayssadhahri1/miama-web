// Importation de la configuration de la base de données
const db = require('../../database/db.config');

const Ingredient = db.ingredients;


// ================= CRÉER UN INGRÉDIENT =================
exports.create = async (req, res) => {
  try {
    // Création d'un nouvel objet ingrédient avec TOUTES les données
    // envoyées par le client dans le corps de la requête (req.body)
  
    const ingredient = new Ingredient(req.body);

    // Sauvegarde de l'ingrédient dans la base de données
    const data = await ingredient.save();

    // Réponse succès l'ingrédient enregistré
    res.status(201).json({
      message: "Ingredient créé",
      data
    });

  } catch (err) {
    // Erreur réponse 500
    res.status(500).json({ message: err.message });
  }
};


// ================= RÉCUPÉRER TOUS LES INGRÉDIENTS =================
exports.findAll = async (req, res) => {
  try {
    // Récupération de TOUS les ingrédients présents dans la base de données
    // sans filtre ni tri → retourne tout le tableau
    const data = await Ingredient.find();

    // Réponse avec la liste complète des ingrédients
    res.json(data);

  } catch (err) {
    // Erreur  500
    res.status(500).json({ message: err.message });
  }
};