import Banner from '../component/Banner';
import Header from '../component/Header';
import Footer from '../component/Footer';

import {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

    function Homepage(props){

    const [categorieSelected, setCategorieSelected] = useState()
    const [recipes, setRecipes] = useState([])
    //const [categorie, setCategorie] = useState(['entrée'])
    const [entree, setEntree] = useState('Entrée')
    const [plat, setPlat] = useState('Plat')
    const [dessert, setDessert] = useState('Dessert')

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
      
    console.log('modal:', modal)

    const {
      buttonLabel,
      className
    } = props;

   /* if(modal == true){
      return <Redirect to="/logpage"/>
    }*/

//Choix de la catégorie
    const handleCategorie = (c) => {
        setCategorieSelected(c)
    }
    console.log("categorieSelected:", categorieSelected)

   //Affiche la catégorie de plats choisi s(entrée, plat ou dessert)
      const onSubmitCategorie = async () => {
      const dataRecipes = await fetch("/recipes",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `categorie=${categorieSelected}`
      })
      const body = await dataRecipes.json()
      console.log('dataRecipes:', body)

      setRecipes(body.recipe);
      const reducerRecipe = props.saveRecipe(body)
      console.log("body:", body.recipe)
      console.log('reducerRecipe :', reducerRecipe);

    }
    console.log('recettes:', recipes)

     /*   var saveRecipe = async() => {
          const data =  await fetch(`/get-recipes/${props.userInfo.token}`
          )
            const addRecipe = await data.json()
            console.log('addRecipe:', addRecipe.message)
            if(addRecipe.message === "Not Found"){
              <Redirect to="/logpage" />  
            }
        }*/

    var saveRecipe = async (_id) => {
        const array = [{
          _id: '605a97330e0832ea1ec2dc26',
          categorie: 'Dessert',
          name: 'salades',
          picture: 'www.sab.com',
          ingredients: ['toto', 'oeufs', 'salade'],
          preparation: 'préparation',
          time: '1h30',
          preparation_time: '30 mn',
          cook_time: '2mn',
          accessibility: 'pas cher',
          cost: 'facile'
      },
      {
        _id: '605b061c0c977407a785421f',
        categorie: 'Dessert',
        name: 'salades',
        picture: 'www.sab.com',
        ingredients: ['toto', 'oeufs', 'salade'],
        preparation: 'préparation',
        time: '1h30',
        preparation_time: '30 mn',
        cook_time: '2mn',
        accessibility: 'pas cher',
        cost: 'facile'
      },
      {
        _id: '605b068b0c977407a785a9c8',
        categorie: 'Dessert',
        name: 'salades',
        picture: 'www.sab.com',
        ingredients: ['toto', 'oeufs', 'salade'],
        preparation: 'préparation',
        time: '1h30',
        preparation_time: '30 mn',
        cook_time: '2mn',
        accessibility: 'pas cher',
        cost: 'facile'
      }]
          console.log("ident", _id)
          const postRecette = recipes.find(r => r._id === _id)
          props.saveRecipe(postRecette)

          console.log("posted Recette", postRecette)
          if(props.userInfo) {
            let id = props.userInfo.id

              const data =  await fetch('/add-recipe', {
            method: 'put',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `recipes=${JSON.stringify(postRecette)}&id=${id}`
      })
          const addRecipe = await data.json()
          console.log('addRecipe :', addRecipe)
          }

   
} 


    //Affiche les recettes au click de l'utilisateur
      var recipeListItems = recipes.map((r, i) => {
          return(
          <div key={i} className="home-recipe">   
            
              <h2>{r.name}</h2> 
              <div>
              <img className='img-recipe' src={r.picture}/>
              </div>
              <div className="text-recipe">
              <p>{`Temps total : ${r.time}, préparation: ${r.preparation_time}, cuisson: ${r.cook_time}`}</p>
              <p>{`${r.accessibility}, ${r.cost}`}</p></div>
              <div className='text-recipe-prep'>
              <h4>Ingrédients :</h4>
              <p >{r.ingredients}</p>
              <h4>Préparation :</h4>
              <p>{r.preparation}</p>
              </div>
               <div className="save-button" >
                  <p
                    className="save-button"
                    onClick={()=> {saveRecipe(r._id); console.log('je suis dans le click')}}
                     >Enregistrer cette recette</p>
                  </div> 
                <div>
     {/* { <Button color="danger" onClick={toggle}>Enregistrer</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Merci de vous connecter pour enregistrer une recette
        </ModalBody>
        <ModalFooter>
          <Button 
            color="secondary" 
            onClick={() => saveRecipe()}>Me connecter</Button>
        </ModalFooter>
      </Modal>} */}
    </div>
            </div>
          )
      })

      console.log('recipeList :', recipeListItems)


    return(
      <div >
           <Header/>
           <Banner/>

        <div className="homepage-main">

            <div className="home-quest">
                <h2 className="title-process">Tout d'abord choisissez la catégorie de recette que vous souhaitez cuisiner</h2>
                <p>Vous ne serez plus en manque d'inspiration pour vos repas du quotidien !</p>
            </div>
        </div>
            <h4 className='title-connect'> <Link to="logpage">N'oubliez pas de vous connectez pour enregistrer vos recettes préférées</Link></h4>
            <div className='buttons-hp'>
                <button             
                    className="button-recipe"
                    onClick={()=> {handleCategorie(entree);onSubmitCategorie(); console.log('je clique sur entrée')}}>Entrée</button>
              <button 
                    className="button-recipe"
                    onClick={()=> {handleCategorie(plat);onSubmitCategorie(); console.log('je clique sur plat')}}>Plat</button>
                <button 
                    className="button-recipe"
                    onClick={()=> {handleCategorie(dessert);onSubmitCategorie(); console.log('je clique sur dessert')}}>Dessert</button>

            </div>  
                <div className='homepage'>
                    {recipeListItems}
                </div>

       
                
                <Footer/>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
  return {
    saveRecipe: function (recipe) {
      dispatch({ type: "saveRecipe", recipe: recipe});
    }
  }
};

function mapStateToProps(state) {
    return {
      userInfo: state.userInfo, recipe: state.recipe
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Homepage);