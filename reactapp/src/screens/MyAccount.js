import '../stylesheets/App.css'
import Header from '../component/Header'
import {connect} from 'react-redux';
import {useState, useEffect} from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Collapse, Label, Input, Form, FormGroup, FormText} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import saveRecipe from '../reducer/recipeReducer';

const MyAccount = (props) => {

    const [recipeSaved, setRecipeSaved] = useState([])
    const [myInfos, setMyInfos] = useState([]);
    const [isOpenInformation, setIsOpenInformation] = useState(false);
    const [isOpenRecipe, setIsOpenRecipe] = useState(false);

    //Ajout recette
    const [category, setCategory] = useState()
    const [nameRecipe, setNameRecipe] = useState()
    const [ingredients, setIngredients] = useState()
    const [time, setTime] = useState()
    const [cookTime, setCookTime]= useState()
    const [prepTime, setPrepTime] = useState()
    const [preparation, setPreparation] = useState()
    const [file, setFile] = useState()


    const toggleInformation = () => setIsOpenInformation(!isOpenInformation);
    const toggleRecipe = () => setIsOpenRecipe(!isOpenRecipe);

    const saveRecipeAccount = async () => {
            
        setMyInfos(props.userInfo)

            if(props.userInfo){
            const data = await fetch(`/get-recipes/${props.userInfo.id}`);
        
        const userRecipe = await data.json()
    
        setRecipeSaved(userRecipe);
        console.log('data:', data)
        console.log('userRecipe :', userRecipe)
            }
};

    useEffect( () => {
        
        saveRecipeAccount();
    }, [])

    console.log("variable d'état - myInfos: ",myInfos)
    console.log('recipeSaved: ', recipeSaved)

    const handleAddNewRecipe  = async () => {
        const dataAddRecipe = await fetch("/add-new-recipe", {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `categorie=${category}&name=${nameRecipe}&ingredients=${ingredients}&preparation_time=${prepTime}&time=${time}&cook_time=${cookTime}&preparation=${preparation}&$picture${file}`
        });
        const bodyNewRecipe = await dataAddRecipe.json();
        console.log('bodyNewRecipe:', bodyNewRecipe);
        
      }
      console.log('file', file)
      console.log('nameRecipe', nameRecipe)
      console.log('ingredients', ingredients)

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
        <div className='sign-up'>
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
            {/* {<div>
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
            </div>} */}
            <div>
            <Label>Préparation</Label>
            <Input
                type="textarea"
                onChange={(e) => setPreparation(e.target.value)}
                placeholder=""
                value={preparation} />
            </div>
            <FormGroup>
                <Label for="exampleFile">Ajouter une photo</Label>
                <Input 
                    type="file" 
                    name="file"
                    onChange={(e) => setFile(e.target.value)}
                    value={file}  />
                <FormText color="muted">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
                </FormText>
      </FormGroup>
            <Button
                onClick={ ()=> {handleAddNewRecipe(); console.log('je suis dans le bouton submit')}}>Submit</Button>
            </Form>
            
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