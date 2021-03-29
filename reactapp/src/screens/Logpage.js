import React, {useState, useEffect} from 'react';
import '../stylesheets/App.css'
import Header from '../component/Header'
import {Redirect, Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

  function Logpage(props){
    //SIGN-IN
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [listErrorsSignin, setErrorsSignin] = useState([]);

    //SIGN-UP
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [confirmSignUpPassword, setConfirmSignUpPassword] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const [listErrorsSignup, setErrorsSignup] = useState([]);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const [messagePassword, setMessagePassword] = useState('');



    //Connection back pour sign-in
    const handleSignInSubmit = async () => {

        const dataSignIn = await fetch("/sign-in",
          {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `signInEmail=${signInEmail}&signInPassword=${signInPassword}`
          })
          const body = await dataSignIn.json()
    
          if (body.result === "true"){
             JSON.stringify({lastname: body.lastname, firstname: body.firstname, token: body.token, email: signInEmail }); 
              
              const result = props.saveUserInfo({lastname: body.lastname, firstname: body.firstname, token: body.token, email: signInEmail, id: body.id});
              const connexion = props.onSubmitConnexionStatus('true')
              setUserExists(true)
          } 
          else if (body.result === "erreur champs vides"){
            setErrorsSignin(body.error)
            props.onSubmitConnexionStatus("signin"); 
          }
          else if (body.result === "erreur email ou mdp"){
            setErrorsSignin(body.error)
            props.onSubmitConnexionStatus("signin");
          }
          else if (body.result === "erreur utilisateur inexistant"){
            setErrorsSignin(body.error)
            let timeOut = setTimeout(function () {
            props.onSubmitConnexionStatus("false"); 
            },3000);
            return () => { clearTimeout(timeOut) };
                    
      }
  }


  var tabErrorsSignin = listErrorsSignin.map((errorSignIn,i) => {
    return(
          <p key={i}>{errorSignIn}</p>)
  })

   //Traitement au clic sur bouton Sign-Up
   var handleSignUpSubmit = async () => {

    const dataSignUp = await fetch("/sign-up",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `lastname=${lastName}&firstname=${firstName}&signUpEmail=${signUpEmail}&signUpPassword=${signUpPassword}`
      });
        const body = await dataSignUp.json();
    if (body.result === true) {
        setUserExists(true);
        props.onSubmitConnexionStatus("true");
        props.saveUserInfo(body)        
    } else {
      setErrorsSignup(body.error)
      props.onSubmitConnexionStatus("false");
    } 
}

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (<p key={i}>{error}</p>)
  })

//Regex email - useEffect pour que l'input email puisse être modifier si celui-ci ne correspond pas au schéma
  useEffect(() => {
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if(signUpEmail !== ''){
          if (emailRegex.test(signUpEmail)) {
      setValidEmail(true);
      setMessage("");
    } else {
      setValidEmail(false);
      setMessage("Merci d'entrer un email valide");
    }
    }
  
  }, [signUpEmail])
  
  //REGEX PASSWORD - useEffect pour que l'input mot de passe puisse être modifier si celui-ci ne correspond pas au schéma
  useEffect(() => {
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  if(signUpPassword !== ''){
  if (passwordRegex.test(signUpPassword)) {
    setValidPassword(true);
    setMessagePassword("");
  } else {
    setValidPassword(false);
    setMessagePassword("9 caractères minimum, contenant au moins 1 majuscule, 1 caractère spéciale et 1 chiffre");
  }
  }
  
  }, [signUpPassword])

  //CONFIRMATION PASSWORD
    useEffect(()=> {
        if(signUpPassword !== '' && confirmSignUpPassword !==''){
        setIsValid(false);
        if(signUpPassword === confirmSignUpPassword){
        setIsValid(true);
        } 
      }
        }, [confirmSignUpPassword])

        if(userExists === true){
          return (<Redirect to='/myaccount'/>)
        }
    
 
  
    return (
      <div>
          <Header/>

        <div className="logpage">
          <div className="sign-up">

            <h3>Vous n'avez pas de compte</h3>
            <Form>
                <div>

                  <Label>Nom*</Label>
                    <Input 
                        type="text" 
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder=""
                        value={lastName}/>                
                </div>
                <div>
                  <Label>Prénom*</Label>
                    <Input 
                    type="text" 
                    onChange={(e)=>setfirstName(e.target.value)}
                    placeholder=""
                    value={firstName}/>
                </div>
                <div>
                  <Label>Email*</Label>
                    <Input 
                    type="text" 
                    onChange={(e)=>setSignUpEmail(e.target.value)}
                    placeholder=""
                    value={signUpEmail}/>
                </div>
                <p className="text-err">{message}</p>
                <div>
                  <Label>Mot de passe*</Label>
                    <Input 
                    type="password" 
                    onChange={(e)=>setSignUpPassword(e.target.value)}
                    placeholder=""
                    value={signUpPassword}/>
                </div>
                  <p className="text-err">{messagePassword}</p>
              
                <div>
                  <Label>Confirmer mot de passe*</Label>
                    <Input 
                    type="password" 
                    onChange={(e)=>setConfirmSignUpPassword(e.target.value)}
                    placeholder=""
                    value={confirmSignUpPassword}/>
                </div>
                {isValid === true ? null : <p className="text-err">Les mots de passe ne correspondent pas</p>}
            </Form>
            <p className="text-err">{tabErrorsSignup}</p>
            <Button 
                onClick={()=>{ handleSignUpSubmit(); console.log('je suis dadns le bouton sign-up')}}
                >Créer mon compte</Button>
          </div>
          
            {/*----------SIGNIN----------*/}
          <div className="sign-in">
            <h3>Vous avez déjà un compte</h3>
            <Form>
      <FormGroup>
        <Label for="exampleEmail">Email*</Label>
        <Input 
          type="email" 
          name="email" 
          id="exampleEmail" 
          placeholder=""
          onChange={(e) => setSignInEmail(e.target.value)}
          value={signInEmail} />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Mot de passe*</Label>
        <Input 
          type="password" 
          name="password" 
          id="examplePassword" 
          placeholder=""
          onChange={(e)=>setSignInPassword(e.target.value)}
          value={signInPassword} />
      </FormGroup>
      </Form>

            <p className="text-err">{tabErrorsSignin}</p>  
              
            <Button 
                onClick={()=> handleSignInSubmit()}
                >Se connecter</Button>


        </div>
        </div>
        </div>
    )
}

function mapDisptachToProps(dispatch){ 
  return {
    onSubmitConnexionStatus: function(connexion) { 
      dispatch( {type: 'addConnexion', connexion: connexion} )
    },
    saveUserInfo: function (userInfo) {
      dispatch({ type: 'saveUserInfo', userInfo: userInfo })
    }
  }
}

export default connect(
  null,
  mapDisptachToProps
)(Logpage);