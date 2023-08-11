const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });
  
  const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
  });
  
// creating models using Schemas

  const User = mongoose.model('User', userSchema);
  const Recipe = mongoose.model('Recipe', recipeSchema);
  
  module.exports = { User, Recipe }; // from line 1 to 16 step-2
  // exporting these modules