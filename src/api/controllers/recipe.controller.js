// On importe slugify → tbdelk titer par url  
const slugify = require('slugify');

const db = require('../../database/db.config');

const Recipe = db.recipes;


// ================= CRÉER UNE RECETTE =================
exports.create = async (req, res) => {
  try {
    // On récupère toutes les infos envoyées par le client
    let { title, description, category, ingredients, difficulty, image } = req.body;

    // kan mabe3dhtch el ingredient alors yt7at tableau viide 
    if (!ingredients) ingredients = [];

    // Si les ingrédients arrivent sous forme de texte séparé par des virgules
    if (typeof ingredients === 'string') {
      ingredients = ingredients
        .split(',')      // n9os b virgrul 
        .map(i => i.trim()) // yna7i el espace e; zayed be3d kol keelma 
        .filter(Boolean);   // On supprime les cases vides 
    }

    // On crée la nouvelle recette 
    const recipe = new Recipe({
      title,
      description,
      category,
      ingredients,
      difficulty: difficulty || "facile", 
      image: image?.trim()                // Si une image est contirnt  on la garde
        ? image
        : "https://via.placeholder.com/300x180", // Sinon iamge par defaut
      slug: slugify(title, { lower: true })       // On génère le slug en minuscules depuis le titre
    });

    // enregistter le recttce 
    const data = await recipe.save();

    // Réponse ok 
    res.status(201).json({
      message: "Recette créée avec succès",
      data
    });

  } catch (err) {
    // Erreur 500
    res.status(500).json({ message: err.message });
  }
};


// ================= RÉCUPÉRER TOUTES LES RECETTES =================
exports.findAll = async (req, res) => {
  try {
    // Filtre vide au départ
    let filter = {};

    // Si le client cherche par mot en le fait pas important M m
    // 
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } }
      ];
    }

    // Si le client filtre par catégori rej3 ak el hajet filter 
    
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Pagination  par défaut : page 1
    const page = parseInt(req.query.page) || 1;

    // Combien de recettes par page 10
    const limit = parseInt(req.query.limit) || 10;

    // On compte le nombre total de recettes qui correspondent au filtre
    // utile pour calculer le nombre de pages total
    const total = await Recipe.countDocuments(filter);

    // On récupère les recettes avec :
    const data = await Recipe.find(filter)
      .populate("category", "name") // On remplace par son nom vrai
      .sort({ createdAt: -1 })       // Tri el akhranin men loul
      .skip((page - 1) * limit)      // On saute les recettes des pages précédentes
      .limit(limit);                 // On retourne seulement le nombre demandé

    // Réponse avec les recettes
    res.json({
      data,
      total,                            // Nombre total de recettes trouvées
      page,                             // Page actuelle
      totalPages: Math.ceil(total / limit) // Nombre total de pages
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= RÉCUPÉRER UNE SEULE RECETTE =================
exports.findOne = async (req, res) => {
  try {
    const data = await Recipe.findById(req.params.id)
      .populate("category", "name"); // On remplace l'ID catégorie par son vrai nom

    // kan mafemch recttet erreur 
    if (!data) {
      return res.status(404).json({ message: "Recette introuvable" });
    }

    // Réponse les donne troubre
    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= MODIFIER UNE RECETTE =================
exports.update = async (req, res) => {
  try {
    
    let { title, ingredients, category, image } = req.body;

    
    //,les ingrdienten tableau 
    if (typeof ingredients === 'string') {
      ingredients = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);
    }

    const updateData = {
      ...req.body,                    // On garde tous les champs envoyés par le client
      ingredients: ingredients || [], // les ingredient dans tableau
      category: category,
      image: image?.trim()            // Si une image est forni on garde
        ? image
        : "https://via.placeholder.com/300x180", 
      slug: title                     // Si le titre a changé on utlise le slug 
        ? slugify(title, { lower: true })
        : undefined                   // Sinon → on ne touche pas au slug existant
    };

    // On cherche la recette par son ID et on la met à jour d'un seul coup
    
    const data = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }                  // raje3 el rectte apes mofication
    ).populate("category", "name"); 

    // Si aucune reccetet  erreur 404
    if (!data) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Réponse succès 
    res.json({
      message: "Recette mise à jour avec succès",
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= SUPPRIMER UNE RECETTE =================
exports.delete = async (req, res) => {
  try {
    const data = await Recipe.findByIdAndDelete(req.params.id);

    // kan mafemch rectte par id erreur 
    if (!data) {
      return res.status(404).json({ message: "not found" });
    }

    // Réponse succès
    res.json({ message: "deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};