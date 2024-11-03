const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', userController.getProfile);
router.get('/profile-and-recipe', userController.getProfileAndRecipe);

// router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Admin-only routes
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser);
router.get('/', authMiddleware, adminMiddleware, userController.getAllUsers);

module.exports = router;