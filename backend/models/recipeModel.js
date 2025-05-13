const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Un titre est requis"],
        trim: true,
        minlength: [2, "Le titre doit comporter au moins 2 caractères"],
        maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"]
    },
    instructions: {
        type: String,
        required: [true, "Les instructions sont requises"],
        trim: true
    },
    prepareTime: {
        type: String,
        trim: true
    },
    cookingTime: {
        type: String,
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['facile', 'moyen', 'difficile'],
        default: 'facile'
    },
    category: {
        type: String,
        enum: ['entrée', 'plat principal', 'dessert'],
        default: 'plat principal'
    },
    image: {
        type: String
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredients'
        }
    ]
});

const recipeModel = mongoose.model('recipes', recipeSchema);

module.exports = recipeModel;

