import React from "react";
import { useAuth } from "../utils/Authcontexte";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate();
//   / fonction qui verifie si on respect tout ce qui est demander pi apres login
  async function Login() {
    setErreur("");

    if (!email && !password) {
      setErreur("Email et Mot de Passe est obligatoire");
      return;
    } else if (!email) {
      setErreur("Email est obligatoire");
      return;
    } else if (!password) {
      setErreur("Mot de Passe est obligatoire");
      return;
    }

    try {
      const response = await fetch(
        "https://tvshowdbapi.herokuapp.com/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.token) {
        login(data.token);
        navigate("/");
      } else {
        setErreur("Email or Mot de passe erronee.");
      }
    } catch (err) {
      setErreur("Erreur du serveur. Please try again later.");
      console.error("Login error:", err);
    }
  }


 return (

  <div className="container" role="main">
    <div className="mt-6 has-background-light has-text-centered p-4">
      <h1 className="title">Login</h1>
      {/* /* message d'erreur si respect pas les conditions */ }
      {erreur && (
        <article className="message is-danger" role="alert" id="login-error">
          <div className="message-header">
            <p>{erreur}</p>
            <button className="delete" aria-label="Supprimer l'erreur" onClick={() => setErreur("")}></button>
          </div>
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
            aria-describedby="login-error" 
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>

      {/* input password */}
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="password"
            placeholder="Password" 
            aria-required="true"
            aria-describedby="login-error" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>

      {/* Boutons */}
      <div>
        <button className="button is-danger mr-4" onClick={() => navigate("/")}>
          Annuler
        </button>
        <button className="button is-info" onClick={Login}>
          Login
        </button>
      </div>
    </div>
  </div>
)
};

export default Login;
