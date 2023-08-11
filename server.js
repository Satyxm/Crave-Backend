// Step 1: Gathering Ingredients (Dependencies)
const express = require('express') // step -1 (requiring express and mongoose)
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000
const { User, Recipe } = require('./models');// importing models from models.js


// Step 2: Setting Up the Kitchen (Database Connection)
mongoose.connect('mongodb://127.0.0.1:27017/craveDB', {
  useUnifiedTopology: true, //It's recommended to set this option to true to ensure your application uses the latest and most efficient connection handling.
});

// Preparing the Cooking Utensils (Middleware)
app.use(express.json());
app.use(cors());

// Our Sous Chefs (Database Connection Event Listeners)
const db = mongoose.connection;

db.on('error', () => { // error is an event
  console.log("MongoDB connection error:"); // put it before the db.once in order to log the errors more quickly
});

db.once('open', () => { //open is an event
  console.log('Connected to MongoDB successfully!'); // starting from () for previous also and this also, these are the callback funcs
}); // step-3 setting up a db connection line-6 to 17

// The Grand Finale (Serving the Deliciousness)
app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`)
})

// ┌────────────────────────────────────────────────────────────────────────┐
// │   Let's Start Creating Our Culinary Masterpieces! (API ENDPOINTS)      │
// └────────────────────────────────────────────────────────────────────────┘

app.post('/api/register', async (req, res) => { // this is an express route declaration and /api/register is the route which'll recieve the client request
    try { // try block -> to handle potential errors in the code
      const { username, email, password } = req.body;

      // Check if the username already exists in the database
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already exists. Cannot register again.' });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already exists. Cannot register again.' });
    }

      //creates a new user in the db
      const newUser = await User.create({ username, email, password });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }); //User-Reg route

  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username and verify the password
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      } //User-login route
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  });

  app.post('/api/recipes', async (req, res) => {
    try {
      const { title, ingredients, instructions } = req.body;
  
      // Create a new recipe in the database
      const newRecipe = await Recipe.create({ title, ingredients, instructions });
  
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create recipe' });
    }
  }); // creating a recipe route

  app.get('/api/recipes', async (req, res) => {
    try {
      // Get all recipes from the database
      const allRecipes = await Recipe.find();
  
      res.status(200).json(allRecipes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get recipes' });
    }
  });
  
  app.delete('/api/recipes/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
  
      // Find the recipe in the database by its ID and delete it
      await Recipe.findByIdAndRemove(recipeId);
  
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete recipe' });
    }
  });
  
  