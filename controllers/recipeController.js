const Recipe = require('../models/Recipe');
const User = require('../models/User');
// const redisClient = require('../config/redisClient');

// Create a new recipe
exports.createRecipe = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body); // Log the body to check
        console.log('Request Files:', req.files); // Log any files (if you are uploading images)
        const recipe = await Recipe.create({ ...req.body});
        res.status(201).json("recipe");
    } catch (error) {
        console.error('Error:', error); // Log the error if one occurs
        next(error);
    }
};


// Get all recipes with caching
exports.getAllRecipes = async(req, res, next) => {
    try {
        // const cachedRecipes = await redisClient.get('recipes');
        // if (cachedRecipes) {
        //     return res.json(JSON.parse(cachedRecipes));
        // }

        const recipes = await Recipe.find().populate('author', 'username');
        // redisClient.setex('recipes', 3600, JSON.stringify(recipes)); // Cache for 1 hour
        res.json(recipes);
    } catch (error) {
        next(error);
    }
};

exports.getRecipesByEmail = async(req, res, next) => {
    try {
        const { email } = req.query; // Extract email from request parameters

        // Find the user by email to get their ID
        const user = await User.findOne({ email });
        console.log(email)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch recipes authored by the user with the found ID
        const recipes = await Recipe.find({ author: user._id })
            .populate('author', 'username email'); // Populate author details

        
    
        

        res.json(recipes);
    } catch (error) {
        next(error);
    }
};


// Update recipe
exports.updateRecipe = async(req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        next(error);
    }
};

// Delete recipe
exports.deleteRecipe = async(req, res, next) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        next(error);
    }
};