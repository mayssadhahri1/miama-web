const db = require('../../database/db.config');

const User = db.users;


// ================= AJOUTER UN FAVORI =================
exports.addFavorite = async (req, res) => {
    try {
        // Extraction de l'ID utilisateur et de l'ID recette depuis le corps de la requête
        const { userId, recipeId } = req.body;

        // Recherche 'utisteur depuis id 
        const user = await User.findById(userId);

        // Si l'utilisateur n'existe pas
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // on ajoute la reccette 
        // si elle n'est pas déjà présente dans la liste des favoris
        if (!user.favorites.includes(recipeId)) {
            user.favorites.push(recipeId); // Ajout de l'ID recette dans le tableau favoris 
            await user.save();             // Sauvegarde dan sle base 
        }

        // Rechargement de l'utilisateur avec les détails complets de chaque recette favorite
        // .populate remplace les IDs par les vrais objets recettes
        const updated = await User.findById(userId).populate("favorites");

        // Réponse avec la liste complète
        return res.status(200).json(updated.favorites);

    } catch (err) {
        // Erreur réponse 500
        return res.status(500).send({ message: err.message });
    }
};


// ================= SUPPRIMER UN FAVORI =================
exports.removeFavorite = async (req, res) => {
    try {
        const { userId, recipeId } = req.body;

        // Recherche de l'utilisateur dans la base de données via son ID
        const user = await User.findById(userId);

        // Suppression de la recette du tableau favoris
        // .filter() garde uniquement les IDs qui sont DIFFÉRENTS de recipeId
        // .toString() est nécessaire car les IDs MongoDB sont des objets, pas des strings
        user.favorites = user.favorites.filter(
            id => id.toString() !== recipeId
        );

        // Sauvegarde de la liste mise à jour
        await user.save();

        // Rechargement de l'utilisateur avec les détails complets des favoris restants
        const updated = await User.findById(userId).populate("favorites");

        // Réponse liste apres sipprision 
        res.status(200).send(updated.favorites);

    } catch (err) {
        // Erreur  500
        res.status(500).send({ message: err.message });
    }
};


// ================= RÉCUPÉRER LES FAVORIS =================
exports.getFavorites = async (req, res) => {
    try {
        // Recherche de l'utilisateur par son ID (passé dans l'URL)
        const user = await User.findById(req.params.userId)
            .populate({
                path: "favorites",       // tableau d'IDs de recettes
                select: "_id title image category difficulty" // Champs à retourner pour chaque recette
                
            });

        // Si aucun utilisateur trouvé avec ID erreur 404
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Réponse avec le tableau des recettes favorites complètes
        return res.status(200).json(user.favorites);

    } catch (err) {
        // Erreur 500
        return res.status(500).send({ message: err.message });
    }
};