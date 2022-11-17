import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreaGuide.css";

function CreateGuide () {

    const [img, setImg] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [xp, setXp] = useState('');
    const [guide, setGuide] = useState('');
    const navigate = useNavigate();

    const handleNomChange = event => {
        setNom(event.target.value)
    }
    const handlePrenomChange = event => {
        setPrenom(event.target.value);
    }
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    }
    const handleEmailChange = event => {
        setEmail(event.target.value);
    }
    const handleXpChange = event => {
        setXp(event.target.value);
    }

    const UploadImages = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
  
      setImg(img);
    };

    

const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const specialCharacters = "!'^+%&/()=?_#$½§{[]}|;:>÷`<.*-@é";
const passwordLength = 8;

// const [goodPassword, setGoodPassword] = useState("");

  function createPassword() {
  let password = "";
  const characterList = `${numbers}${upperCaseLetters}${lowerCaseLetters}${specialCharacters}`;
  const characterListLength = characterList.length;

  for (let i = 0; i < passwordLength; i++) {
    const characterIndex = Math.round(Math.random() * characterListLength);
    password = password + characterList.charAt(characterIndex);
    console.log(password)
  }
  
  
  return (password)
}

    async function NewGuide() {
             let goodPassword = createPassword();
             console.log("2", goodPassword);
            let token = localStorage.getItem("token");
            let data = {
                role: "guide",
                nom: nom,
                prenom: prenom,
                description: description,
                annees_exp: xp,
                identifiant: email,
                password: goodPassword,
              };
            let options = {
              method: "POST",
             
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              }),
              body: JSON.stringify(data),
            };
            let reponse = await fetch("http://127.0.0.1:8080/users/createguide", options);
            let donnees = await reponse.json();
            alert("Félicitation, le guide a été ajouté!");
            let data2 = {
              mail: email,
              password: goodPassword
            };
            let options2 = {
              method: "POST",
             
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              }),
              body: JSON.stringify(data2),
            };
            let reponse2 = await fetch("http://127.0.0.1:8080/users/mailguide", options2);
            let donnees2 = await reponse2.json();
        //     if (donnees) {
        //         console.log("guide créé :", donnees);
        //         setGuide(!guide);
        // }
        
        // async function LoadGuide() {
        //     let options = {
        //       method: "GET",
        //       headers: headers,
        //     };
        //     let response = await fetch("http://127.0.0.1:8080/users/guide", options);
        //     let donnes = await response.json();
        //     if (!donnes) {
        //       console.log("erreur");
        //       return;
        //     } else {
        //       setGuide(donnees.reverse());
        //       console.log("data présente: ", donnees);
        //     }
        //   }

        //   navigate(`/users/guide/`);

        //   useEffect(() => {
        //     LoadGuide();
        //   }, [guide]);
    }
return (
    // Pour afficher les guides à disposition
<div id="createguide">
<div className="imgCreaGuide"> 
    <div className="Creation-Parcours">
    <p>Création des Guides</p>
  </div>

  <div className="princip1">
    <div className="container2">
      <div className="Gestion1">
        <p>Gestion du profil</p>
      </div>
      <div className="PageCreaGuide">
      <div className="Nom1">
        <input
          type="text"
          id="nom"
          placeholder="Nom"
          onChange={handleNomChange}
         
        />
      </div>

      <div className="Prénom1">
           <input
                type="text"
                id="prenom"
                placeholder="Prénom"
                onChange={handlePrenomChange}
              />
            </div>

      <div className="Description2">
        <textarea
          type="text"
          id="descriptionm"
          placeholder="Description"
          
        />
      </div>

      <div className="AnnéesXP1">
      <input
          type="text"
          id="annees_exp"
          placeholder="Années d'expérience"
          onChange={handleXpChange}
        />
      </div>    
      
      <div className="email1">
      <input
          type="email"
          id="identifiant"
          placeholder="email"
          onChange={handleEmailChange}
        />
         <p className="Nouv-Img1" >
          Entrez une nouvelle photo de profil
        </p>

        <div className="input-img1">
{/* //             <label className="" htmlFor="img">
//               Entrez Nouvelle Photo de Profil
//             </label> */}
             <input
               type="file"
            name="image"
               onChange={UploadImages}
              className="form-control"
              id="uploadBtn"
           />
         </div> 
         </div>
      <div className="btn-02">
      <button onClick={NewGuide}>Valider</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
);
}

 
{/* //     <div class="princip">
//     <div class="container1">
//       <div class="Gestion">
       
//       </div>
//       <div class="Nom">
//               <input */}
{/* //                 type="text"
//                 id="nom"
//                 placeholder="Nom"
//                 onChange={handleNomChange}
//               />
//             </div> */}
//      //
//       {/* <div class="Prénom">
//         <input
//           type="text"
//           id="prenom"
//           placeholder="Prénom"
//           onChange={handlePrenomChange}
//         />
//       </div> */}

{/* // <div class="Description">
//               <textarea */}
{/* //                 type="text"
//                 id="descriptionm"
//                 placeholder="Description"
//                 onChange={handleDescriptionChange}
//               />
//             </div> */}
//    {/* 
//       <div class="Années d'expérience">
//         <input
//           type="text"
//           id="annees_exp"
//           placeholder="Années d'expérience"
//           onChange={handleXpChange}
//         />
//       </div>

//       <div class="email">
//         <input
//           type="email"
//           id="identifiant"
//           placeholder="email"
//           onChange={handleEmailChange}
//         />
//       </div> */}

{/* //       <div className="input-img">
//             <label className="" htmlFor="img">
//               Entrez Nouvelle Photo de Profil
//             </label>
//             <input */}
{/* //               type="file"
//               name="image"
//               onChange={UploadImages}
//               className="form-control"
//               id="uploadBtn"
//             />
//           </div> */}
{/* //           <button onClick={NewGuide}>Valider</button>
//       </div> */}
{/* //       </div> */}
{/* // )
// } */}
//     {/* <div>
//     <ul>
//       {data.map((item) => (
//         <li key={item._id}>
//           <article>
//             <h3>{item.nom}</h3>
//             <div>
//               <p>Prénom : {item.prenom}</p>
//             </div>
//             <div>
//               <p>{item.description}</p>
//             </div>
//             <div>
//               <p>Années d'expérience : {item.annees_exp}</p>
//             </div>
//             <div>
//               <p>identifiant : {item.identifiant}</p>
//             </div>
//           </article>
//         </li>
//       ))}
//     </ul>
//   </div> */}
  
   


export default CreateGuide;