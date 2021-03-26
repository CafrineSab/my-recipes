var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var recipeModel = require('../models/recipes')

const bcrypt = require('bcrypt');
var uid2 = require('uid2');

//test concluant pour le back


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-in', async function(req, res, next) {
  var result = ""
  var searchUser = null
  var errorSignIn = []
  var token = null
  
  
  if(req.body.signInEmail == ''
  || req.body.signInPassword == ''
  ){
    errorSignIn.push('Merci de renseigner tous les champs')
    result = "erreur champs vides"
    res.json({result: result, error: errorSignIn})
  }

  if(errorSignIn.length == 0){
    searchUser = await userModel.findOne({
      email: req.body.signInEmail,
    })
  console.log('searchUser back:', searchUser)
    
    if(searchUser){
      if(bcrypt.compareSync(req.body.signInPassword, searchUser.password)){
        result = "true"
        token = searchUser.token
         console.log('ligne 40:', searchUser.firstName)
        res.json({result: result, lastname: searchUser.lastName, firstname: searchUser.firstName, token: token, email: searchUser.email})
      } 
      else {
        result = "erreur email ou mdp"
        errorSignIn.push('Email ou Mot de passe incorrect')
        res.json({result: result, error: errorSignIn})
      }
    }
    else {
      result = "erreur utilisateur inexistant"
      errorSignIn.push('Utilisateur inexistant')
      res.json({result: result, error: errorSignIn})
    }
    
  }
});

router.post('/sign-up', async function(req, res, next) {

  var error = []
  var result = false
  var savedUser = null
  var token = null

  if(req.body.lastName == ''
  || req.body.firstName == ''
  || req.body.signUpEmail == ''
  || req.body.signUpPassword == ''
  ){
    error.push('Merci de renseigner tous les champs')
    res.json({error})
  }

  var user = await userModel.findOne({ email : req.body.signUpEmail });

  if (user && req.body.signUpEmail == user.email){
    error.push('Utilisateur déjà présent')
    res.json({error})
  }

  var cost = 10;
  const hash = bcrypt.hashSync(req.body.signUpPassword, cost);
  if (error.length == 0){
    
    var newUser = new userModel ({
      lastName: req.body.lastname,
      firstName: req.body.firstname,
      email: req.body.signUpEmail,
      password: hash,
      token: uid2(32)
    });

    savedUser = await newUser.save();
    console.log("ligne 94 :", savedUser);
    if(savedUser){
      result = true
      token = savedUser.token
    }
    res.json({result: result, lastname: savedUser.lastName, firstname: savedUser.firstName, token: token, email: savedUser.email})
  }
});

router.post('/recipes', async function(req, res, next) {
  const category = req.body.categorie
  console.log('ligne 104:', req.body)

      const recipe = await recipeModel.find({categorie: category})

      console.log("backend recipe:", recipe)

  res.json({recipe})
})

router.put('/add-recipe', async function (req, res, next) {
  const user = await userModel.findOne({ token: req.body.token });
  console.log('user: ', user)
  if (user == null) {
    res.redirect('/sign-in')
  } else {
    const saveRecipe = req.body.recipe;
    console.log(saveRecipe);
    const newRecipe = new recipeModel({
      categorie: saveRecipe.categorie,
      name: saveRecipe.name,
      picture: saveRecipe.picture,
      ingredients: saveRecipe.ingredients,
      preparation: saveRecipe.preparation,
    });
    newRecipe.users.push(req.body.token);
    await newRecipe.save();
   // user.itineraries.push(newItinerary._id);
   // await user.save();
   console.log('saverecipe:', saveRecipe)
   console.log('newRecipe :', newRecipe)
  }
  res.json({ message: "ok" });
});

router.get('/get-recipes/:token', async function (req, res, next) {
  const user = await (await userModel.findOne({token: req.params.token}))
  .populate('recipes')
  .exec()
  
  res.json(populatedRecipe);
})



module.exports = router;
