import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Parcours.css";
import "./parcoursDetails.css";


export default function ModifyParcours() {
  const navigate = useNavigate();
  const nomEtapeRef = useRef();
  const numeroEtapeRef = useRef();
  const latRef = useRef();
  const longRef = useRef();
  const descriptionRef = useRef();
  const headers = {
    "Content-Type": "application/json",
    // authorization: `Bearer ${JSON.parse(localStorage.getdetails("token"))}`,
  };
  let { id } = useParams();
  const [details, setDetails] = useState({});
  const [etape, setEtape] = useState(false)

  async function getParcoursDetails(id) {
    let options = {
      method: "GET",
      headers: headers,
    };
    let response = await fetch(`http://127.0.0.1:8080/parcours/${id}`, options);
    let donnes = await response.json();
    if (!donnes) {
      console.log("erreur");
      return;
    } else {
      console.log("détails du parcours: ", donnes);
      setDetails(donnes);
    }
  }
  const DeleteParcours = async (id) => {
    let options = {
      method: "DELETE",
      headers: headers,
    };
    let response = await fetch(
      `http://127.0.0.1:8080/parcours/deleteParcours/${id}`,
      options
    );
    let donnes = await response.json();
    if (donnes) {
      console.log("Parcours supprimé ", donnes);
      navigate("/parcours");
    } else {
      console.log("erreur");
    }
  };
  const AddStep = async (event) => {
    event.preventDefault();
    const nomEtape = nomEtapeRef.current.value;
    const numeroEtape = numeroEtapeRef.current.value;
    const lat = latRef.current.value;
    const long = longRef.current.value;
    const description = descriptionRef.current.value;
    let data = {
      nomEtape: nomEtape,
      numeroEtape: numeroEtape,
      lat: lat,
      long: long,
      descriptionEtape: description,
    };
    const body = JSON.stringify(data);
    let options = {
      method: "PATCH",
      body: body,
      headers: headers,
    };
    let reponse = await fetch(
      `http://127.0.0.1:8080/parcours/addStep/${id}`,
      options
    );
    let donnes = await reponse.json();
    if (donnes) {
      console.log("étape publiée :", donnes);
      alert("Etape créée")
      setEtape(!etape);
    } else {
      console.log("étape non publiée");
    }
  };

  useEffect(() => {
    getParcoursDetails(id);
  }, []);

  return (
    <div>
    <header>
      <div className="DetailsParcours">
        <p>Détails du parcours</p>
      </div>
    </header>
      <div>
        <div className="cardElo">
          <div className="imgParcoursDetails">
            <div className="test">
            <fieldset className="field">
              <h2 className="text_details">
                Détail
                <br />
                du Trek
              </h2>
              <article key={details._id}>
                <h3 className="title">{details.nomParcours}</h3>
                <div>
                  <p className="paragraphe">Durée du parcours : {details.dureeParcours}</p>
                </div>
                <div>
                  <p className="paragraphe">{details.description}</p>
                </div>
                <div>
                  <p className="paragraphe">Prix : {details.prix} €</p>
                </div>
                <div>
                  <p className="paragraphe">Niveau de difficulté : {details.niveauDifficulte}</p>
                </div>
                <div>
                  <p className="paragraphe"> Nombre d'étapes : {[details.etape].length - 1}</p>
                </div>
                <div>
                  <p className="paragraphe"> Nombre de réservations : {[details.reservation].length - 1}</p>
                </div>
                <button className="btn-sup" onClick={() => DeleteParcours(details._id)}>Supprimer</button>
              </article>
            </fieldset>
            </div>
          </div>
        </div>
        <div className="containeur">
          <div className="Liste">
            <p>Liste des réservations</p>
          </div>
          <div className="champInput">
            <div className="FV">
              <div className="Nom1">
                <input type="text" id="Nom" placeholder="Nom" ref={nomEtapeRef} />
              </div>

              <div className="NumeroEtape">
                <input type="text" id="NumeroEtape" placeholder="Numéro étape" ref={numeroEtapeRef} />
              </div>

              <div className="Localisation">
                <input type="text" id="lat" placeholder="Latitude" ref={latRef} />
                <input type="text" id="long" placeholder="Longitude" ref={longRef} />
              </div>
              <div className="Description1">
                <textarea type="text" id="descriptionm" placeholder="Description" ref={descriptionRef} />
              </div>
              <div className="Image1">
                <input type="text" id="Image" placeholder="Image d’illustration" />
              </div>
              <button className="btnAdd" onClick={AddStep}>
                <span >Ajouter étape</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
