import Banner from '../component/Banner';
import Header from '../component/Header';
import Footer from '../component/Footer';

import {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//mais pourquoi ??

    function Homepage(props){
//il y a du chanement ici ?

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

    if(modal == true){
      return <Redirect to="/logpage"/>
    }

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

      setRecipes(body.recipe);
      console.log("body:", body.recipe)

    }
    console.log('recettes:', recipes)

        var saveRecipe = async() => {
          const data =  await fetch(`/get-recipes/${props.userInfo.token}`
          )
            const addRecipe = await data.json()
            console.log('addRecipe:', addRecipe.message)
            if(addRecipe.message === "Not Found"){
              <Redirect to="/logpage" />  
            }
        }

  /*  var saveRecipe = async () => {
        if(props.userInfo){
            console.log(' je suis dans le if saveRecipe function');
           <Redirect to='/myaccount'/>;
           var token = props.userInfo.token

            if(props.userInfo.token) {
            await fetch('/add-recipe', {
            method: 'PUT',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `recipe=${recipes}token=${token}`
      })
    }
    } else {
        console.log('je suis dans le else saveRecipe function')
         return <Redirect to="/logpage" />;
    }
} */
  
    //Affiche les recettes au click de l'utilisateur
      var recipeListItems = recipes.map((r, i) => {
          return(
          <div key={i} className="home-recipe">        
              <h1>{r.name}</h1> 
              <h3>{r.categorie}</h3>
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
              {/* <div className="save-button" >
                  <button 
                    className="quest-button"
                    onClick={()=> {saveRecipe()}}
                     >Enregistrer cette recette</button>
                  </div> */}
                <div>
      <Button color="danger" onClick={toggle}>Enregistrer</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Merci de vous connecter pour enregistrer une recette
        </ModalBody>
        <ModalFooter>
          <Button 
            color="secondary" 
            onClick={toggle}>Me connecter</Button>
        </ModalFooter>
      </Modal>
    </div>
            </div>
          )
      })

    return(
        <div>
            <Header/>
            <Banner/>

            <div className="home-quest">
                <h2>Découvrez nos recettes de cuisine !!</h2>
                <p>Vous ne serez plus en manque d'inspiration pour vos repas du quotidien !</p>
                <p>Vous souhaitez  découvrir quel type de recette :</p>
            </div>
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

function mapStateToProps(state) {
    return {
      userInfo: state.userInfo,
    };
  }
  
  export default connect(
    mapStateToProps,
    null
  )(Homepage);