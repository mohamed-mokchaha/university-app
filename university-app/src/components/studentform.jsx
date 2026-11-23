import { useState, useRef } from "react";
import "./studentform.css";

function StudentForm({ onAjouterEtudiant, etudiantAModifier, onModifierEtudiant }) {
  const [nom, setNom] = useState(etudiantAModifier?.nom || "");
  const [prenom, setPrenom] = useState(etudiantAModifier?.prenom || "");
  const [email, setEmail] = useState(etudiantAModifier?.email || "");
  const [telephone, setTelephone] = useState(etudiantAModifier?.telephone || "");
  const [filiere, setFiliere] = useState(etudiantAModifier?.filiere || "");
  const [anneeEtude, setAnneeEtude] = useState(etudiantAModifier?.anneeEtude || "");
  const [groupe, setGroupe] = useState(etudiantAModifier?.groupe || "");
  const [ville, setVille] = useState(etudiantAModifier?.ville || "");
  const [image, setImage] = useState(etudiantAModifier?.image || null);
  const [erreurs, setErreurs] = useState({});

  const imageInputRef = useRef(null);

  function validerFormulaire() {
    const nouvellesErreurs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nom.trim()) nouvellesErreurs.nom = "Le nom est obligatoire";
    if (!prenom.trim()) nouvellesErreurs.prenom = "Le prénom est obligatoire";

    if (!email.trim()) {
      nouvellesErreurs.email = "L'email est obligatoire";
    } else if (!emailRegex.test(email)) {
      nouvellesErreurs.email = "Format d'email invalide";
    }

    if (!telephone.trim()) {
      nouvellesErreurs.telephone = "Le téléphone est obligatoire";
    }

    if (!filiere) nouvellesErreurs.filiere = "Choisissez une filière";

    const annee = Number(anneeEtude);
    if (!anneeEtude) {
      nouvellesErreurs.anneeEtude = "L'année d'étude est obligatoire";
    } else if (annee < 1 || annee > 5) {
      nouvellesErreurs.anneeEtude = "L'année doit être entre 1 et 5";
    }

    if (!groupe.trim()) nouvellesErreurs.groupe = "Le groupe est obligatoire";
    if (!ville.trim()) nouvellesErreurs.ville = "La ville est obligatoire";

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0; // true = aucune erreur
  }

  function handleReset() {
    setNom("");
    setPrenom("");
    setEmail("");
    setTelephone("");
    setFiliere("");
    setAnneeEtude("");
    setGroupe("");
    setVille("");
    setImage(null);
    setErreurs({});
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validerFormulaire()) {
      return; // erreurs : on arrête
    }

    const nouvelEtudiant = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      filiere,
      anneeEtude: Number(anneeEtude),
      groupe: groupe.trim(),
      ville: ville.trim(),
      image,
    };

    if (etudiantAModifier) {
      onModifierEtudiant({ ...etudiantAModifier, ...nouvelEtudiant });
    } else {
      onAjouterEtudiant(nouvelEtudiant);
      handleReset();
    }
  }

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="student-form"
        noValidate
      >
        <h2>{etudiantAModifier ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>

        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        {erreurs.nom && <p className="error-msg">{erreurs.nom}</p>}

        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        {erreurs.prenom && <p className="error-msg">{erreurs.prenom}</p>}

        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {erreurs.email && <p className="error-msg">{erreurs.email}</p>}

        <label htmlFor="telephone">Téléphone :</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        {erreurs.telephone && <p className="error-msg">{erreurs.telephone}</p>}

        <label htmlFor="filiere">Filière :</label>
        <select
          id="filiere"
          name="filiere"
          value={filiere}
          onChange={(e) => setFiliere(e.target.value)}
        >
          <option value="">Choisir une filière</option>
          <option value="GLSI">GLSI</option>
          <option value="DSI">DSI</option>
          <option value="RSI">RSI</option>
        </select>
        {erreurs.filiere && <p className="error-msg">{erreurs.filiere}</p>}

        <label htmlFor="annee">Année d'étude :</label>
        <input
          type="number"
          id="annee"
          name="annee"
          min="1"
          max="5"
          value={anneeEtude}
          onChange={(e) => setAnneeEtude(e.target.value)}
        />
        {erreurs.anneeEtude && <p className="error-msg">{erreurs.anneeEtude}</p>}

        <label htmlFor="groupe">Groupe :</label>
        <input
          type="text"
          id="groupe"
          name="groupe"
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}
        />
        {erreurs.groupe && <p className="error-msg">{erreurs.groupe}</p>}

        <label htmlFor="ville">Ville :</label>
        <input
          type="text"
          id="ville"
          name="ville"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />
        {erreurs.ville && <p className="error-msg">{erreurs.ville}</p>}

        <label htmlFor="image">Image :</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          ref={imageInputRef}
          onChange={(e) => {
            const fichier = e.target.files[0];
            if (fichier) {
              setImage(URL.createObjectURL(fichier));
            }
          }}
        />

        <div className="form-buttons">
          <button type="submit" id="btnajouter" className="btn-submit">
            {etudiantAModifier ? "Modifier" : "Ajouter"}
          </button>
          <button type="reset" id="btnreset">
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;






