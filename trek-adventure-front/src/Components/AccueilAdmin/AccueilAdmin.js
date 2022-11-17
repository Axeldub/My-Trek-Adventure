import React, { useEffect, useState } from "react";
import "./AccueilAdmin.css";

function AccueilAdmin() {
    const [nextTrek,setNextTrek] = useState();
    const token = localStorage.getItem("token");
    async function nextParcours() {
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      // fetch pour récupérer la derniere reservation
      let response = await fetch(
        "http://127.0.0.1:8080/reservations/nextReservation",
        options
      );
      let donnes = await response.json();
      if (!donnes || donnes == undefined) {
        console.log("erreur");
      } else {
        console.log("NEXT TREK ",donnes)
        setNextTrek(donnes)
      }
    }

    useEffect(() => {
      nextParcours();
    }, []);

  return (
    <div>
      <div className="imgAccueilAdmin">
        <div className="Welcome">
          <p className="W1">Bienvenue Admin</p>
        </div>
        <div className="Next">
          <p className="Next1">Prochaine sortie : </p>
        </div>
        {nextTrek != undefined ? (
        <div className="texteP">
          <p>Le : {nextTrek[0].reservation.dateReservation}</p>
          <p>Site de parcours : {nextTrek[0].parcours.nomParcours}</p>
          <p>Guide : {nextTrek[0].reservation.idGuide}</p>
          <p>Clients inscrits : {nextTrek[0].reservation.clients.length}</p>
          <p>Clients maximum : {nextTrek[0].reservation.maxClients}</p>
        </div>
        ) : <></>}
      </div>
    </div>
  );
}

export default AccueilAdmin;
