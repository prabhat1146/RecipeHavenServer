const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    ingredients: [{
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
    }, ],
    instructions: [{
        stepNumber: {
            type: Number,
            required: true,
        },
        instruction: {
            type: String,
            required: true,
        },
    }, ],
    prepTime: {
        type: String, // time in minutes
        required: true,
    },
    cookTime: {
        type: String, // time in minutes
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }, ],
    image: [{
        type: String, // URL or path to the image
        required: false,
    }],    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for authors
        required: true,
    },
    datePublished: {
        type: Date,
        default: Date.now,
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
            trim: true,
        },
    }, ],
    averageRating: {
        type: Number,
        default: 0,
    },
    nutritionFacts: {
        calories: {
            type: String,
            required: false,
        },
        fat: {
            type: String,
            required: false,
        },
        protein: {
            type: String,
            required: false,
        },
        carbs: {
            type: String,
            required: false,
        },
        sugar: {
            type: String,
            required: false,
        },
        fiber: {
            type: String,
            required: false,
        },
        sodium: {
            type: String,
            required: false,
        },
    },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);