module.exports = app => {

  const express = require('express');
  const router = express.Router();

  const recipeController = require('../controllers/recipe.controller');
  const categoryController = require('../controllers/category.controller');
  const authController = require('../controllers/auth.controller');
  const favoriteController = require('../controllers/favorite.controller');

  // AUTH
  router.post('/register', authController.register);
  router.post('/login', authController.login);

  // RECIPES
  router.post('/recipes', recipeController.create);
  router.get('/recipes', recipeController.findAll);
  router.get('/recipes/:id', recipeController.findOne);
  router.put('/recipes/:id', recipeController.update);
  router.delete('/recipes/:id', recipeController.delete);

  // CATEGORIES
  router.post('/categories', categoryController.create);
  router.get('/categories', categoryController.findAll);
  router.get('/categories/:id', categoryController.findOne);
  router.put('/categories/:id', categoryController.update);
  router.delete('/categories/:id', categoryController.delete);

  // FAVORITES
  router.post('/favorites/add', favoriteController.addFavorite);
  router.post('/favorites/remove', favoriteController.removeFavorite);
  router.get('/favorites/:userId', favoriteController.getFavorites);

  // ✅ IMPORTANT (ONLY ONE)
  app.use('/api', router);
};