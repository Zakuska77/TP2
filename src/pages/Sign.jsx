import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Afficher information lorsque lutidsateur fait une erreur 
const Sign = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erreur, setErreur] = useState({});



       async function Sign(){
        if(password == confirmPassword) {
        const response = await fetch('https://tvshowdbapi.herokuapp.com/auth/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
            navigate("/")
          } else{
            console.log("erreur");
          }
          console.log(data);} else {
            console.log("erreur mauvais mot de passe");
          }
    }

    // / fonction qui verifie si on respect tout ce qui est demander pi apres sign up 
const Verification = async () => {
  
  let errors = {};

  if (!email) {
    errors.email = "Email est obligatoire";
  } else if (email.length < 5) {
    errors.email = "Email doit avoir au moins 5 caracteres";
  } else if (!email.includes("@")) {
    errors.email = "L'email doit contenir un @";
  }

  if (!password) {
    errors.password = "Mot de passe est obligatoir";
  } else if (password.length < 8) {
    errors.password = "Le mot de passe doit contenir au moins 8 caractères";
  } else if (!/[!@#$%&*]/.test(password)) {
    errors.password =
      "Le mot de passe doit contenir un caractere special (!@#$%&*)";
  }

  if (password !== confirmPassword) {
    errors.confirm = "Les mots de passe ne correspondent pas";
  }
 
  setErreur(errors);

  if (Object.keys(errors).length === 0) {
    await Sign();
  }
};

   

return (
  <div className="container mt-6 has-background-light has-text-centered p-4" role="main">
    <h1 className="title">Sign up</h1>

    {Object.keys(erreur).length > 0 && (
      <article className="message is-danger" role="alert" id="error-message">
        <div className="message-header">
          <p>Corrigez les points suivants :</p>
          <button
            className="delete"
            aria-label="Fermer l'alerte"
            onClick={() => setErreur({})}
          ></button>
        </div>
        <ul className="has-text-black-bis mt-4">
          {Object.values(erreur).map((msg, index) => (
            <li key={index} id={`err-${index}`}>{msg}</li>
          ))}
        </ul>
      </article>
    )}

    {/* input email */}
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <input 
          className="input" 
          type="email" 
          placeholder="Email" 
          aria-required="true"
          aria-describedby="error-message" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </p>
    </div>

    {/* input mot de passe */}
    <div className="field">
      <p className="control has-icons-left">
        <input 
          className="input" 
          type="password" 
          placeholder="Password" 
          aria-required="true"
          aria-describedby="error-message"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </p>
    </div>

    {/* input confirmer mot de passe */}
    <div className="field">
      <p className="control has-icons-left">
        <input 
          className="input" 
          type="password" 
          placeholder="Confirm the Password" 
          aria-required="true"
          aria-describedby= "error-message" 
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-lock"></i>
        </span>
      </p>
    </div>

    <div>
      <button className="button is-danger mr-4" onClick={() => navigate("/")}>
        Annuler
      </button>
      <button className="button is-info" onClick={Verification}>
        Sign up
      </button>
    </div>
  </div>
)
}

export default Sign
