import "./Create.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Parcours() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [parcours, setParcours] = useState(false);
  const nomParcoursRef = useRef();
  const dureeParcoursRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const imgIllustrationRef = useRef();
  const niveauDifficulteRef = useRef();
  const headers = {
    "Content-Type": "application/json",
    // authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };
  const [image, setImage] = useState([]);

  const UploadImages = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  async function LoadParcours() {
    let options = {
      method: "GET",
      headers: headers,
    };
    let response = await fetch("http://127.0.0.1:8080/parcours/", options);
    let donnes = await response.json();
    if (!donnes) {
      console.log("erreur");
      return;
    } else {
      setData(donnes.reverse());
      console.log("data présente: ", donnes);
    }
  }
  const DetailsParcours = async (id) => {
    navigate(`/parcours/details/${id}`);
  };
  const AddParcours = async (event) => {
    event.preventDefault();
    const nomParcours = nomParcoursRef.current.value;
    const dureeParcours = dureeParcoursRef.current.value;
    const description = descriptionRef.current.value;
    const prix = prixRef.current.value;
    const niveauDifficulte = niveauDifficulteRef.current.value;
    // const imgIllustration = imgIllustrationRef.current.value;
    let data = {
      nomParcours: nomParcours,
      dureeParcours: dureeParcours,
      description: description,
      prix: prix,
      /*imgIllustration: imgIllustration,*/
      niveauDifficulte: niveauDifficulte,
    };
    const body = JSON.stringify(data);
    let options = {
      method: "POST",
      body: body,
      headers: headers,
    };
    let reponse = await fetch(
      "http://127.0.0.1:8080/parcours/createParcours",
      options
    );
    let donnes = await reponse.json();
    if (donnes) {
      console.log("parcours publié :", donnes);
      alert("Parcours créé")
      setParcours(!parcours);
      const parcourId = donnes._id;
      ///////////////////////////////////////////////////////////
      if (image.data) {
        const msgId = parcourId;

        const url2 = "http://127.0.0.1:8080/parcours/createImageParcours";

        const formData = new FormData();
        formData.append("file", image.data);
        const response = await fetch(url2, {
          method: "POST",
          headers: {
            Authorization: "bearer " + msgId,
            // "Content-Type": "multipart/form-data boundary=something",
          },
          body: formData,
        });
        let result = await response.json();
        const res = JSON.stringify(result);

        if (res !== '{"message":"Echec"}') {
          console.log("image enregistrée");
          console.log(result.message);
          setImage([]);
        } else {
          console.log("parcour avec image par default créé");
        }
      }
      ////////////////////////////////////////////////////
    } else {
      console.log("parcours non publié");
    }
  };
  useEffect(() => {
    LoadParcours();
  }, [parcours, image]);
  return (
    <header>


      <div id="Parcour">
        <div className="scrollbar" id="style-3">
          <ul>
            {data.map((item) => (
              <li key={item._id}>
                <div className="box">
                  <div className="box-inner">
                    <div className="box-front">
                      <h3>{item.nomParcours}</h3>
                      <img
                        className="img-1"
                        src={`http://127.0.0.1:8080/parcours/${item.imgIllustration}`}
                      ></img>
                    </div>
                    <div className="box-back">
                      <article>
                        <div>
                          <p className="Para">
                            Durée du parcours : {item.dureeParcours}
                          </p>
                        </div>
                        <div>
                          <p className="Para">{item.description}</p>
                        </div>
                        <div>
                          <p className="Para">Prix : {item.prix} €</p>
                        </div>
                        <div>
                          <p className="Para">
                            Niveau de difficulté : {item.niveauDifficulte}
                          </p>
                        </div>

                        <button
                          className="btn"
                          onClick={() => DetailsParcours(item._id)}
                        >
                          Détail du parcours
                        </button>
                      </article>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="Creation-Parcours">
          <p className="Para">Gestion des parcours</p>
        </div>

        <div className="princip">
          <div className="container1">
            <div className="Gestion">
              <p className="Para">Creation des Parcours</p>
            </div>
            <div className="Nom">
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                ref={nomParcoursRef}
              />
            </div>

            <div className="Durée">
              <input
                type="text"
                id="durée"
                placeholder="Durée Parcours"
                ref={dureeParcoursRef}
              />
            </div>

            <div className="Description">
              <textarea
                type="text"
                id="descriptionm"
                placeholder="Description"
                ref={descriptionRef}
              />
            </div>

            <div className="Prix">
              <input type="text" id="prix" placeholder="Prix" ref={prixRef} />
            </div>

            <p className="Nouv-Img">Entrez Nouvelle Image</p>

            <div className="input-img">
              {/* <label className="" htmlFor="img">
                Entrez Nouvelle Image
              </label> */}
              <input
                type="file"
                name="image"
                onChange={UploadImages}
                className="form-control"
                id="uploadBtn"
              />
            </div>

            <div className="Difficulté">
              <input
                type="text"
                id="difficulté"
                placeholder="Niveau difficulté 1 à 3"
                ref={niveauDifficulteRef}
              />
            </div>
            <div className="btn-01">
              <button onClick={AddParcours}>Valider</button>
            </div>
          </div>
        </div>
       <img className="imgFond11"></img>
      </div>
    </header>
  );
}

export default Parcours;
