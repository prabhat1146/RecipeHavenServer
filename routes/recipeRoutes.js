const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public route
router.get('/', recipeController.getAllRecipes);

// Protected routes
router.post('/add',  recipeController.createRecipe);
router.put('/update:id', authMiddleware, recipeController.updateRecipe);
router.delete('/delete:id', authMiddleware, recipeController.deleteRecipe);

// Admin-only route (example: retrieve all recipes with extra data if needed)
router.get('/all', recipeController.getAllRecipes);
router.get('/user/recipe', recipeController.getRecipesByEmail);


module.exports = router;