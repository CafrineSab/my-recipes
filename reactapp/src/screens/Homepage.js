import Banner from '../component/Banner';
import Header from '../component/Header';
import Footer from '../component/Footer';

import { useState} from 'react'
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';

import { Button, CardImg, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Collapse, Col, Container, Form, Input, Label, FormText, FormGroup } from 'reactstrap';
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

    const [isOpen, setIsOpen] = useState(false);

    const toggleRecipe = () => setIsOpen(!isOpen);
      
    console.log('modal:', modal)

        //Ajout recette
        const [category, setCategory] = useState('')
        const [nameRecipe, setNameRecipe] = useState('')
        const [ingredients, setIngredients] = useState('')
        const [time, setTime] = useState('')
        const [cookTime, setCookTime]= useState('')
        const [prepTime, setPrepTime] = useState('')
        const [preparation, setPreparation] = useState('')


//Choix de la catégorie
    const handleCategorie = (c) => {
        setCategorieSelected(c)
    }
    console.log("categorieSelected:", categorieSelected)

   //Affiche la catégorie de plats choisi s(entrée, plat ou dessert)
      const onSubmitCategorie = async () => {
      const dataRecipes = await fetch("https://sheltered-inlet-01930.herokuapp.com/recipes",
      {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `categorie=${categorieSelected}`
      })
      //const body = await dataRecipes.json()
      console.log('dataRecipes:', body)

      setRecipes(body.recipe);
      const reducerRecipe = props.saveRecipe(body)
      console.log("body:", body.recipe)
      console.log('reducerRecipe :', reducerRecipe);

    }
    console.log('recettes:', recipes)

    //Enregistrer la recette dans myacocount
    var saveRecipe = async (_id) => {

          console.log("ident", _id)
          const postRecette = recipes.find(r => r._id === _id)
          props.saveRecipe(postRecette)

          if(props.userInfo) {
            let id = props.userInfo.id

              const data =  await fetch('https://sheltered-inlet-01930.herokuapp.com/add-recipe', {
            method: 'put',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `recipes=${JSON.stringify(postRecette)}&id=${id}`
      })
          const addRecipe = await data.json()
          }
} 

      //Ajout de recette lien avec le backend
      const handleAddNewRecipe  = async () => {
        const dataAddRecipe = await fetch("https://sheltered-inlet-01930.herokuapp.com/add-new-recipe", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `categorie=${category}&name=${nameRecipe}&ingredients=${ingredients}&preparation_time=${prepTime}&time=${time}&cook_time=${cookTime}&preparation=${preparation}`
        });
        const bodyNewRecipe = await dataAddRecipe.json();
        console.log('bodyNewRecipe:', bodyNewRecipe);      
        
        setCategory('');
        setNameRecipe('');
        setIngredients('');
        setPrepTime('');
        setTime('');
        setCookTime('');
        setPreparation('');

      }
      

    //Affiche le détaile de la recette au click de l'utilisateur
      var recipeListItems = recipes.map((r, i) => {
          return(

            <Card>
              <CardImg top width="100%" src={r.picture} alt="Card image cap" />
                <CardTitle tag="h5">{r.name}</CardTitle>
                  <CardText>{`Temps total : ${r.time}, préparation: ${r.preparation_time}, cuisson: ${r.cook_time}`}</CardText >
                    <Button color="primary" onClick={()=>toggleRecipe()} style={{ marginBottom: '1rem' }}>Découvrir la recette</Button>
              <Collapse isOpen={isOpen}>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Ingrédients :</CardSubtitle>
                  <CardText>{r.ingredients}</CardText>
                    <CardBody>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Préparation :
                      </CardSubtitle>
                        <CardText>{r.preparation}</CardText>
                          <Button 
                            onClick={()=> {saveRecipe(r._id); console.log('je suis dans le click')}}
                            color="info">Enregistrer la recette</Button>
                    </CardBody>
                    </Collapse> 
                  </Card>
          )
      });


    return(
      <div>
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
                    onClick={()=> {handleCategorie(entree);onSubmitCategorie()}}>Entrée</button>
                <button 
                    className="button-recipe"
                    onClick={()=> {handleCategorie(plat);onSubmitCategorie()}}>Plat</button>
                <button 
                    className="button-recipe"
                    onClick={()=> {handleCategorie(dessert);onSubmitCategorie()}}>Dessert</button>

            </div> 
            <Container style={{display:'flex', justifyContent:"center", flexDirection:'row'}}>
              <Col lg="4">
                {recipeListItems}
              </Col>
          </Container> 
            <div className="addrecipe">
                <h2 className='title-addrecipe'>Parce que notre communauté aime les nouveautés, vous pouvez aussi participer et nous partager vos recettes préférées !</h2>
            <div className="addrecipe-form">        

            <Form>
            <h3>Ajouter une recette</h3>
            <div>
            <Label>Catégorie</Label>
            <Input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                placeholder=""
                value={category}/>
            </div>
            <div>
            <Label>Nom du plat</Label>
            <Input
                type="text"
                onChange={(e) => setNameRecipe(e.target.value)}
                placeholder=""
                value={nameRecipe} />
            </div>
            <div>
            <Label>Ingrédients</Label>
            <Input
                type="textarea"
                onChange={(e) => setIngredients(e.target.value)}
                placeholder=""
                value= {ingredients}/>
            </div>
            <div>
            <Label>Temps de réalisation (time)</Label>
            <Input
                type="text"
                onChange={(e) => setTime(e.target.value)}
                placeholder=""
                value={time} />
            </div>
            <div>
            <Label>Temps de cuisson (cook_time)</Label>
            <Input
                type="text"
                onChange={(e) => setCookTime(e.target.value)}
                placeholder=""
                value={cookTime} />
            </div>
            <div>
            <Label>Temps de préparation (preparation_time)</Label>
            <Input
                type="text"
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder=""
                value={prepTime} />
            </div>
            <div>
            <Label>Préparation</Label>
            <Input
                type="textarea"
                onChange={(e) => setPreparation(e.target.value)}
                placeholder=""
                value={preparation} />
            </div>

            <Button
                onClick={ ()=> {handleAddNewRecipe()}}>Envoyer</Button>
            </Form>
            </div>  
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
      userInfo: state.userInfo, recipe: state.recipe, connexion: state.connexion
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Homepage);