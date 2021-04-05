var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var recipeModel = require('../models/recipes')

const bcrypt = require('bcrypt');
var uid2 = require('uid2');
const { find, getMaxListeners } = require('../models/users');

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
        res.json({result: result, lastname: searchUser.lastName, firstname: searchUser.firstName, token: token, email: searchUser.email, id: searchUser._id})
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

//recherche des recettes par catégorie
router.post('/recipes', async function(req, res, next) {
  const category = JSON.parse(req.body.categorie)
  console.log('categorie:', category)

      const recipe = await recipeModel.find({categorie: category})

      console.log("backend recipe:", recipe)

  res.json({recipe})
})

//ajoute des recettes de l'utilisateur depuis son compte
router.post('/add-new-recipe', async function (req, res, next) { 

    const newRecipe = new recipeModel({
      categorie: req.body.categorie,
      name: req.body.name,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation,
      picture: req.body.picture,
      time: req.body.time,  
      preparation_time: req.body.preparation_time,  
      cook_time: req.body.cook_time,
    });

   const savedRecipe = await newRecipe.save();

   console.log('newRecipe :', savedRecipe)

  res.json({ message: "ok", category: savedRecipe.categorie, nameRecipe: savedRecipe.name, ingredients: savedRecipe.ingredients, time: savedRecipe.preparation_time });
});

router.put('/add-recipe', async function (req, res, next) {
  console.log('je passe ici')

    const user = await userModel.findById({ _id: req.body.id });
    console.log('user', user)
    
console.log("req.body@@@@@@@", JSON.parse(req.body.recipes))
  userModel.findByIdAndUpdate(id, {recipes:JSON.parse(req.body.recipes) }, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found!`
      });
    } else res.send({ message: "Recipe in user account was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: err
    });
  });
});


  //const user = await userModel.findOne({ token: req.body.token })

    //const saveRecipe = req.body.recipe;
    //console.log('saveRecipe :', saveRecipe);


   
  //  res.json({ recipe: findRecipe, token: user.token, message: "ok" });
  // })
        
//enregistre les recettes dans son compte
router.get('/get-recipes/:id', async function (req, res, next) {

  const recipe = await recipeModel.findById({_id: req.params.id})
  //const recipeParse = JSON.parse(recipe);
  console.log('recipe',recipe)//c'est null ??
  // const user = await userModel.findOne({token: req.params.token})
  // .populate('recipes')
  // .exec()

  const user = await userModel.findOne({_id: req.params.id})
  .populate({
    path: 'recipes',
    model: recipeModel
  }).exec()

  console.log('user populate: ', user)
  
  res.json(/*message: 'ok bien reçu du back',*/ user.recipes);
})




module.exports = router;
