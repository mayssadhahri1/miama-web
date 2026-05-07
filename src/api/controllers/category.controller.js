// Importation de la configuration de la base de données
const db = require('../../database/db.config');


const Category = db.categories;


// ================= CRÉER UNE CATÉGORIE =================
exports.create = async (req, res) => {
  try {
    // Extraction du nom et de la description envoyés par le client
    const { name, description } = req.body;

    // Vérification que le nom est bien rempli 
    // La description nom obligtoire 
    if (!name) {
      return res.status(400).json({ message: "Nom obligatoire" });
    }

    // Création d'un nouvel objet catégorie avec les données reçues
    const category = new Category({ name, description });

    // Sauvegarde de la catégorie ddans le base 
    const data = await category.save();

    // Réponse succès erecettet emregister 
    res.status(201).json({
      message: "Catégorie créée",
      data
    });

  } catch (err) {
    // Erreur inattendue 500
    res.status(500).json({ message: err.message });
  }
};


// ================= RÉCUPÉRER TOUTES LES CATÉGORIES =================
exports.findAll = async (req, res) => {
  try {
    // Objet  filter retourne toutes les catégories
    let filter = {};

    // Si fait searh  on filtre les catégories dont le nom contient ce mot
    if (req.query.search) {
      filter.name = {
        $regex: req.query.search, // Recherche contient le mot
        $options: "i"             // "i" =  ykoun insensible ya M A may MAY 
      };
    }

    // Récupération des catégories 
    // .sort({ createdAt: -1 }) → tri du plus récent au plus ancien
    const data = await Category.find(filter).sort({ createdAt: -1 });

    //  liste des catégories trouvées
    res.json({ data });

  } catch (err) {
    // Erreur réponse 500
    res.status(500).json({ message: err.message });
  }
};


// ================= RÉCUPÉRER UNE SEULE CATÉGORIE =================
exports.findOne = async (req, res) => {
  try {
    // Recherche de la catégorie par son id 
    
    const data = await Category.findById(req.params.id);

    // kan mafemch id erreur 
    if (!data) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    // Réponse avec les données de la catégorie trouvée
    res.json(data);

  } catch (err) {
    // ereur  réponse 500
    res.status(500).json({ message: err.message });
  }
};


// ================= MODIFIER UNE CATÉGORIE =================
exports.update = async (req, res) => {
  try {
    // Recherche de la catégorie par son ID et mise à jour les donnes 
    const data = await Category.findByIdAndUpdate(
      req.params.id, // ID de la catégorie
      req.body,      // Nouvelles donnee teb3edhh 
      { new: true }  // trje3lk el version jidid avec upadte 
    );

    // Si aucune catégorie trouvée avec cet ID → erreur 404
    if (!data) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    // Réponse succès
    res.json({
      message: "Catégorie mise à jour",
      data
    });

  } catch (err) {
    // Erreur  réponse 500
    res.status(500).json({ message: err.message });
  }
};


// ================= SUPPRIMER UNE CATÉGORIE =================
exports.delete = async (req, res) => {
  try {
    // Recherche de la catégorie par son ID et suppression directe 
    const data = await Category.findByIdAndDelete(req.params.id);

    // kan afmech category erreur 
    if (!data) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    // Réponse succès : la catégorie a bien  supprimée
    res.json({ message: "Catégorie supprimée" });

  } catch (err) {
    // Erreur réponse 500
    res.status(500).json({ message: err.message });
  }
};