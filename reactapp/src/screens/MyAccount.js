import '../stylesheets/App.css'
import Header from '../component/Header'
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';

const MyAccount = (props) => {

    const [myRecipe, setMyRecipe] = useState([])
    const [myInfos, setMyInfos] = useState([]);

        const saveRecipeAccount = async () => {
        setMyInfos(props.userInfo)
        const data = await fetch(`/get-recipe/`);
        console.log("variable d'état - myInfos: ",myInfos)
        const userRecipe = await data.json()
        setMyRecipe(userRecipe);
    };
    useEffect(() => {

    saveRecipeAccount();
    }, [saveRecipeAccount])

    let recipeList = (
        <p>Vous n'avez pas enregistré aucune recette pour le moment</p>
    );

    if(myRecipe.length){
        recipeList = myRecipe.map((recipe, i) => {
            return (
                <div key={i} className="home-recipe">        
              <h1>{recipe.name}</h1> 
              <h3>{recipe.categorie}</h3>
              <div>
              <img className='img-recipe' src={recipe.picture}/>
              </div>
              <div className="text-recipe">
              <p>{`Temps total : ${recipe.time}, préparation: ${recipe.preparation_time}, cuisson: ${recipe.cook_time}`}</p>
              <p>{`${recipe.accessibility}, ${recipe.cost}`}</p></div>
              <div className='text-recipe-prep'>
              <h4>Ingrédients :</h4>
              <p >{recipe.ingredients}</p>
              <h4>Préparation :</h4>
              <p>{recipe.preparation}</p>
              </div>
          </div>
            )
        })
    }

    return (
        <div>
            <Header/>

         <h1 className='title-process'>MON COMPTE</h1> 
         
        <div>
      <Card className="card-style">
            <CardBody>
                <CardTitle tag="h5">Mes informations</CardTitle>
            </CardBody>
            <CardBody>
                <CardText>Nom : {myInfos.lastname}</CardText>
                <CardText>Prénom : {myInfos.firstname} </CardText>
                <CardText>Email : {myInfos.email} </CardText>
     
            </CardBody>
      </Card>  
      {recipeList}
         </div>
         <div>
            <h3>Ajouter une recette</h3>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Catégorie"
                value=""/>
            </div>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Nom du plat"
                value=""/>
            </div>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Ingrédients"
                value=""/>
            </div>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Temps de réalisation"
                value=""/>
            </div>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Temps de cuisson"
                value=""/>
            </div>
            <div>
            <input
                type="text"
                onChange=""
                placeholder="Temps de préparation"
                value=""/>
            </div>
            <div>
                <p>Accessibilité :</p>
                <label>Couteux :
            <input
                name="Accessibility"
                type="checkbox"
                onChange=""
                placeholder="Temps de réalisation"
                value=""/>
                </label>
                <label>Bon marché :
            <input
                name="Accessibility"
                type="checkbox"
                onChange=""
                placeholder="Temps de réalisation"
                value=""/>
                </label>
                <label>Très bon marché :
            <input
                name="Accessibility"
                type="checkbox"
                onChange=""
                value=""/>
                </label>
            </div>
            
            
        </div>
        </div>

    )
}
    function mapDispatchToProps(dispatch) {
    return {
      onSubmitConnexionStatus: function (connexion) {
        dispatch({ type: "addConnexion", connexion: connexion });
      }
    }
};

function mapStateToProps(state){
    return {userInfo: state.userInfo}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAccount);