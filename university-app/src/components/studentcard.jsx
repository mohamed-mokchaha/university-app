
import { useState } from "react";
import "../App.css";

function Studentcard({ etudiant, onModifier, onSupprimer }) {
  const [coordonneesVisibles, setCoordonneesVisibles] = useState(false);

  const {
    id, prenom, nom, email, telephone,
    filiere, anneeEtude, groupe, ville, image,
  } = etudiant;

  return (
    <div className="student-card">
      <h2 className="card-title">Fiche Etudiant</h2>

      {image && (
        <img
          src={image}
          alt={`Photo de ${prenom} ${nom}`}
          className="student-img"
        />
      )}

      <p><strong>Prénom :</strong> {prenom}</p>
      <p><strong>Nom :</strong> {nom}</p>

      {coordonneesVisibles && (
        <>
          <p><strong>Email :</strong> {email}</p>
          <p><strong>Téléphone :</strong> {telephone}</p>
        </>
      )}

      <p><strong>Filière :</strong> {filiere}</p>
      <p>
        <strong>Année d'étude :</strong> {anneeEtude}
        {anneeEtude === 1 ? "ère" : "ème"} année
      </p>
      <p><strong>Groupe :</strong> {groupe}</p>
      <p><strong>Ville :</strong> {ville}</p>

      <a href={`mailto:${email}`} className="btn">Contacter</a>

      <button
        type="button"
        className="btn"
        onClick={() => setCoordonneesVisibles((v) => !v)}
      >
        {coordonneesVisibles ? "Masquer" : "Afficher"} les coordonnées
      </button>

      <button type="button" className="btn" onClick={() => onModifier(etudiant)}>
        Modifier
      </button>

      <button type="button" className="btn" onClick={() => onSupprimer(id)}>
        Supprimer
      </button>
    </div>
  );
}

export default Studentcard;
