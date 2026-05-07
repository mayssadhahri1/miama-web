const config = require('../config/config');
const mongoose = require('mongoose');

const db = {};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url = config.DB_URL;

// MODELS
db.recipes = require('../api/models/recipe.model')(mongoose);
db.categories = require('../api/models/category.model')(mongoose);
db.users = require("../api/models/user.model")(mongoose);
db.favorites = require('../api/models/favorite.model')(mongoose);
db.ingredients = require('../api/models/ingredient.model')(mongoose);
module.exports = db;