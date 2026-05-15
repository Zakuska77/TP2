import React, { useEffect } from "react";

import { useAuth } from "../utils/Authcontexte";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    if (!token) {
      navigate("/");
    }
  }


  return (
    <nav class="navbar is-transparent p-1 bag has-background-info-light">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <p class="navbar-item">TP2</p>
          <a class="navbar-item" href="/">
            {" "}
            Home{" "}
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped" role = "navigation ">
              {!token && (
                <>
                  <p class="control">
                    <a class="bd-tw-button button" href="/signUp">
                      <span> Sign up </span>
                    </a>
                  </p>
                  <p class="control">
                    <a class="bd-tw-button button" href="/login">
                      <span> Login </span>
                    </a>
                  </p>
                  <p class="control">
                    <a class="bd-tw-button button">
                      <span> About </span>
                    </a>
                  </p>
                </>
              )}
              {token && (
                <>
                  <p class="control">
                    <a class="bd-tw-button button" href="/historique">
                      <span> History </span>
                    </a>
                  </p>
                  <p class="control">
                    <a class="bd-tw-button button">
                      <span> Profile </span>
                    </a>
                  </p>
                  <p class="control">
                    <a
                      class="bd-tw-button button"
                      onClick={() => {
                        handleLogout();
                        console.log("entrain de se deconnecter");
                      }}
                    >
                      <span> Logout </span>
                    </a>
                  </p>
                  <p class="control">
                    <a class="button is-primary">
                      <span>About</span>
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
