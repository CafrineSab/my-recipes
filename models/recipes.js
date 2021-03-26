var mongoose = require('mongoose');

var RecipeSchema = mongoose.Schema({
    categorie: String,
    name: String,
    picture: String,
    ingredients: [String],
    preparation: String,
    time: String,
    preparation_time: String,
    cook_time: String,
    accessibility: String,
    cost: String
});

var recipeSchema = mongoose.model('recipes', RecipeSchema);

module.exports = recipeSchema;