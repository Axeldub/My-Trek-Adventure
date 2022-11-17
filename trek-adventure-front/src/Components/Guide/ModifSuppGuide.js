import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ModifSuppGuide.css";

function ModifSuppGuide() {
  const [image, setImage] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [description, setDescription] = useState("");
  const [annees_exp, setAnnees] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [IdGuide, setIdGuide] = useState("");


  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleAnneesChange = (event) => {
    setAnnees(event.target.value);
  };
  const handleIdentifiantChange = (event) => {
    setIdentifiant(event.target.value);
  };

  const UploadImages = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  async function ListGuide() {
    let optionList = document.getElementById('user_select').options;
    let token = localStorage.getItem("token");
    let options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    };
    let reponse = await fetch("http://localhost:8080/users/listguide", options);
    let donnees = await reponse.json();
    let user_options = [{ "text": "--Veuillez sélectionner--", "value": "" }];
    let i = 0;
    for (i = 0; i < donnees.length; i++) {
      user_options.push({ "text": donnees[i].nom + " " + donnees[i].prenom, "value": donnees[i].id });
    }
    user_options.forEach(option =>
      optionList.add(
        new Option(option.text, option.value, option.selected)
      )
    );
  };

  async function LoadDetailsGuide() {
    let idlist = document.getElementById("user_select");
    let value = idlist.options[idlist.selectedIndex].value;
    setIdGuide(value);
    let data = {
      userId: value
    };
    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
    let reponse = await fetch("http://localhost:8080/users/loaddetailsguide", options);
    let donnees = await reponse.json();
        setNom(donnees.nom);
        setPrenom(donnees.prenom);
        setIdentifiant(donnees.identifiant);
        setDescription(donnees.description);
        setImage(donnees.photo_profil);
        setAnnees(donnees.annees_exp);
        console.log("donnees : ", donnees);
        let inputNom = document.getElementById("nom");
        let inputPrenom = document.getElementById("prenom");
        let inputIdentifiant = document.getElementById("email");
        let inputDescription = document.getElementById("description");
        let inputAnnees = document.getElementById("annees_exp");
        if (donnees.profil.nom){inputNom.value=donnees.profil.nom}else{inputNom.value=""};
        if (donnees.profil.prenom){inputPrenom.value=donnees.profil.prenom}else{inputPrenom.value=""};
        if (donnees.profil.identifiant){inputIdentifiant.value=donnees.profil.identifiant}else{inputIdentifiant.value=""};
        if (donnees.profil.description){inputDescription.value=donnees.profil.description}else{inputDescription.value=""};
        if (donnees.profil.annees_exp){inputAnnees.value=donnees.profil.annees_exp}else{inputAnnees.value=""};
    }

    async function UpdateSubmit() {
    let token = localStorage.getItem("token");
    let data = {
      nom: nom,
      prenom: prenom,
      identifiant:identifiant,
      description:description,
      annees_exp:annees_exp,
    };
    let options = {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
      body: JSON.stringify(data),
    };
    let reponse = await fetch(
      "http://127.0.0.1:8080/users/modifyGuideadmin/" + IdGuide,
      options
    );
    await reponse.json();
    alert("Guide mis à jour");
  }


    async function DeleteSubmit() {
      let token = localStorage.getItem("token");
      let options = {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
      };
      let reponse = await fetch(
        "http://127.0.0.1:8080/users/deleteGuideadmin/" + IdGuide,
        options
      );
      await reponse.json();
      alert("Guide supprimé");
    }



  useEffect(() => {
    ListGuide();
  }, []);

  return (
    <div>
      <div className="imgModifGuide">
        <div class="Creation-Guide2">
          <p>Modification ou suppression d'un profil Guide</p>
        </div>
        <div class="princip3">
          <div class="container3">
            <div class="Gestion2">
              
              <p>Gestion du profil</p>
              
            </div>
            <div className="PageModifGuide">
              <div class="Nom2">
                <input
                  label="Nom"
                  type="text"
                  id="nom"
                  placeholder="Nom"
                  onChange={handleNomChange}
                />
              </div>

              <div class="Prénom2">
                <input
                  label="Prénom"
                  type="text"
                  id="prenom"
                  placeholder="Prénom"
                  onChange={handlePrenomChange}
                />
              </div>

              <div class="Description2">
                <textarea
                  label="Description"
                  type="text"
                  id="description"
                  placeholder="Description"
                  onChange={handleDescriptionChange}
                />
              </div>

              <div class="AnnéesXP2">
                <input
                  label="Années d'expérience"
                  type="text"
                  id="annees_exp"
                  placeholder="Années d'expérience"
                  onChange={handleAnneesChange}
                />
              </div>

              <div class="email2">
                <input
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="email"
                  onChange={handleIdentifiantChange}
                />
              </div>
              <p className="Nouv-Img2" >
                Entrez une nouvelle photo de profil
              </p>

              <div className="input-img2">
                <input
                  type="file"
                  name="image"
                  onChange={UploadImages}
                  className="form-control"
                  id="uploadBtn"
                />
              </div>
              <div className="btn-03">
                <button onClick={UpdateSubmit}>Mettre à jour</button>
                <button onClick={DeleteSubmit}>Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModifSuppGuide;