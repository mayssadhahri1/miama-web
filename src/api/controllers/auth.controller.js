
const db = require('../../database/db.config');


const User = db.users;

const bcrypt = require('bcryptjs');

// Bibliothèque pour créer et vérifier les tokens JWT 
const jwt = require('jsonwebtoken');


// ================= INSCRIPTION =================
exports.register = async (req, res) => {
    try {
        // Extraction des données envoyées par le client dans le corps de la requête
        const { username, email, password } = req.body;

        // Vérification les champs bien rempli
        // kan haja ghalata raje3 400 
        if (!username || !email || !password) {
            return res.status(400).send({ message: "Tous les champs sont obligatoires" });
        }

        // Vérification kan compte existe au non avec l email 
        const exist = await User.findOne({ email });
        if (exist) {
            // kan mazjoud raje3 400
            return res.status(400).send({ message: "Email déjà utilisé" });
        }

        
        // le mot passe clair n'est stokee dans le base 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel objet utilisateur avec donnee coorect est recu 
        // Le mot de passe stocke et il  hashé 
        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        // energisetr utlisteur dans le base 
        const data = await user.save();

        // Réponse succès avec le code 201 
        res.status(201).send({
            message: "Compte créé avec succès",
            data
        });

    } catch (err) {
        
        res.status(500).send({ message: err.message });
    }
};


// ================= CONNEXION =================
exports.login = async (req, res) => {
    try {
        //  l'email et du mot de passe envoyés par le client
        const { email, password } = req.body;

        // Recherche de l'utilisateur dans la base de données par son email
        const user = await User.findOne({ email });
        if (!user) {
            
            return res.status(404).send({ message: "Utilisateur introuvable" });
        }

        // Comparaison du mot de passe saisi avec le mot de passe hashé stocké en base
        // bcrypt.compare retourne true si les deux correspondent, false sinon
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            // Mot de passe incorrect 
            return res.status(401).send({ message: "Mot de passe incorrect" });
        }

        // Génération d'un token JWT qui identifie l'utilisateur connecté
        // Il est signé avec une clé secrète et expire après 24 heures
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Données encodées dans le token
            "SECRET_KEY",                       //  Clé secrète 
            { expiresIn: "24h" }                
        );

        // Réponse succès avec le token et les infos de l'utilisateur
        // Le client devra envoyer ce token dans les prochaines requêtes pour s'authentifier
        res.send({
            message: "Login réussi",
            token,
            user
        });

    } catch (err) {
        
        res.status(500).send({ message: err.message });
    }
};