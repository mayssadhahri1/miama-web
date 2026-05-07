const express = require('express');
const database = require('./src/database/db.config');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion MongoDB
database.mongoose.connect(database.url)
    .then(() => {
        console.log('✅ Connected to MongoDB (Recipes DB)');
    })
    .catch(err => {
        console.error('❌ Database connection error:', err);
    });

// Route test API
app.get('/', (req, res) => {
    res.send({
        message: '🍽️ Recipes API is running successfully'
    });
});

// Routes Projet 6 (Recettes)
require('./src/api/routes/router')(app);

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});