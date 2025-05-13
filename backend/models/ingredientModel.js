const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Un nom est requis"],
        trim: true,
        minlength: [2, "Le nom doit comporter au moins 2 caractères"],
        maxlength: [50, "Le nom ne peut pas dépasser 50 caractères"]
    },
    quantity: {
        type: String,
        required: [true, "La quantité est requise"],
        trim: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes'
    }
});

const ingredientModel = mongoose.model('ingredients', ingredientSchema);

module.exports = ingredientModel;

