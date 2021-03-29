import '../stylesheets/App.css'
import Header from '../component/Header'
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Collapse} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import saveRecipe from '../reducer/recipeReducer';

const MyAccount = (props) => {

    const [recipeSaved, setRecipeSaved] = useState([])
    const [myInfos, setMyInfos] = useState([]);
    const [isOpenInformation, setIsOpenInformation] = useState(false);
    const [isOpenRecipe, setIsOpenRecipe] = useState(false);


    const toggleInformation = () => setIsOpenInformation(!isOpenInformation);
    const toggleRecipe = () => setIsOpenRecipe(!isOpenRecipe);

    //Enregistrement de la recette dans le compte de l'utilisateur
    const saveRecipeAccount = async () => {
            
        setMyInfos(props.userInfo)

            if(props.userInfo){
            const data = await fetch(`/get-recipes/${props.userInfo.id}`);
        
            const userRecipe = await data.json()   
            setRecipeSaved(userRecipe);
            }
};
    //visualisation de l'enregistrement de la recette au chargement de la page
    useEffect( () => {
        
        saveRecipeAccount();
    }, [])

    
    let recipeList = (
        <p>Vous n'avez pas enregistré aucune recette pour le moment</p>
    );

    if(recipeSaved.length){
        recipeList = recipeSaved.map((recipe, i) => {
            return (
                <div key={i}  className="recipe-saved">   
                 <Button color="info" onClick={toggleRecipe} style={{ marginBottom: '1rem' }}>Mes recettes</Button>
    
                <Collapse
                isOpen={isOpenRecipe}>
                <Card>
                    <CardBody>
                        <CardTitle tag='h4'>{recipe.name}</CardTitle>
                            <CardText>{`préparation: ${recipe.preparation_time}, cuisson: ${recipe.cook_time}`}</CardText>
                            <CardText>{`${recipe.accessibility}, ${recipe.cost}`}</CardText>
                            <CardSubtitle tag='h5'>Ingrédients :</CardSubtitle>
                            <CardText style={{borderBottom:"2px solid #8b4513", paddingBottom:"20px"}}>{recipe.ingredients}</CardText>
                    <CardSubtitle tag='h5'>Préparation :</CardSubtitle>
                            <CardText>{recipe.preparation}</CardText>
                       
                    </CardBody>
                </Card>
                </Collapse> 
          </div>
            )
        })
    }


    if(props.connexion === 'true'){
    return (
        <div>
            <Header/>
            <h1 className='title-process'>MON COMPTE</h1> 

        <div className='main'>
            

         <div className="recipe-card">
    <Button color="info" onClick={toggleInformation} style={{ marginBottom: '1rem' }}>Mes informations</Button>
    
      <Collapse
        isOpen={isOpenInformation}>
        <Card>
          <CardBody>
                <CardText>Nom : {myInfos.lastname}</CardText>
                <CardText>Prénom : {myInfos.firstname} </CardText>
                <CardText>Email : {myInfos.email} </CardText>
          </CardBody>
        </Card>
      </Collapse>
      </div>
         <div className="recipe">
         {recipeList}
         </div>
        </div>
        
        </div>
    )
}

 else {
    
    return(
        <Redirect to="logpage"/>
    )
}}
    function mapDispatchToProps(dispatch) {
    return {
      onSubmitConnexionStatus: function (connexion) {
        dispatch({ type: "addConnexion", connexion: connexion });
      }
    }
};

function mapStateToProps(state){
    return {userInfo: state.userInfo, connexion: state.connexion}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAccount);