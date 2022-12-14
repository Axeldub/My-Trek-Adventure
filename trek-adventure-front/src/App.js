import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import Connexion from "./Components/Connexion/connexion";
import Home from "./Components/Home/home";
import Présentation from "./Components/Presentation/presentation";
import Contact from "./Components/Contact/contact";
import Parcours from "./Components/ParcoursAdmin/CreateParcours/CreateParcours";
// import Footer from './components/footer';

import AccueilAdmin from "./Components/AccueilAdmin/AccueilAdmin";
import AccueilGuide from "./Components/AccueilGuide/AccueilGuide";
import AccueilClient from "./Components/AccueilClient/AccueilClient";
import ModifyParcours from "./Components/ParcoursAdmin/ModifyParcours/ModifyParcours";
import ResasAdmin from "./Components/AffichageResasAdmin/AffichageResasAdmin";
import ProfilGuide from "./Components/AccueilGuide/ProfilGuide";

import Déconnexion from "./Components/Deconnexion/deconnexion";
import NavBar from "./Components/NavBar";

import CreateGuide from "./Components/Guide/CreateGuide";
import ModifSuppGuide from "./Components/Guide/ModifSuppGuide";
import ReservationsDetails from "./Components/AccueilGuide/DetailsResa";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home></Home>}></Route>
        <Route path="/connexion" element={<Connexion></Connexion>}></Route>
        <Route
          path="/présentation"
          exact
          element={<Présentation></Présentation>}
        ></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/parcours" exact element={<Parcours></Parcours>}></Route>

        <Route
          path="/parcours/details/:id"
          exact
          element={<ModifyParcours />}
        ></Route>
        <Route
          path="/deconnexion"
          element={<Déconnexion></Déconnexion>}
        ></Route>
        <Route
          path="/AccueilAdmin"
          element={<AccueilAdmin></AccueilAdmin>}
        ></Route>

        <Route
          path="/AccueilGuide"
          element={<AccueilGuide></AccueilGuide>}
        ></Route>
        <Route
          path="/profil"
          element={<ProfilGuide></ProfilGuide>}
        ></Route>
        <Route
          path="/reservations/:idParcours/:idResa"
          exact
          element={<ReservationsDetails />}
        ></Route>
        <Route
          path="/AccueilClient"
          element={<AccueilClient></AccueilClient>}
        ></Route>
           <Route
          path="/CreateGuide"
          element={<CreateGuide></CreateGuide>}
        ></Route>
         <Route
          path="/ModifSuppGuide"
          element={<ModifSuppGuide></ModifSuppGuide>}
        ></Route>
         <Route
          path="/AffichageResasAdmin"
          element={<ResasAdmin></ResasAdmin>}
        ></Route>
      </Routes>
      {/* <div><Footer></Footer></div> */}
    </BrowserRouter>
  );
}

export default App;
