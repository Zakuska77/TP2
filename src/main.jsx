import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/Navbar.jsx";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Router from "./Router.jsx";
import { AuthProvider } from "./utils/Authcontexte.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    
      <Router />
    </AuthProvider>
  </StrictMode>,
);
