

import "./App.css";
import { useState } from "react";
import image from "./assets/IMG_9123.JPG";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Studentcard from "./components/studentcard";
import StudentForm from "./components/studentform";

function App() {
  const [etudiants, setEtudiants] = useState([
    {
      id: 1,
      prenom: "mohamed",
      nom: "mokchaha",
      email: "mokchahamohamed@gmail.com",
      telephone: "+216 55896847",
      filiere: "GLSI",
      anneeEtude: 2,
      groupe: "GLSI B 2",
      ville: "Bizerte",
      image: image,
    },
  ]);

  // null = mode ajout, sinon = étudiant en cours de modification
  const [etudiantAModifier, setEtudiantAModifier] = useState(null);

  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, id: Date.now() };
    setEtudiants((anciensEtudiants) => [...anciensEtudiants, etudiantAvecId]);
  }

  function supprimerEtudiant(id) {
    setEtudiants((anciens) => anciens.filter((e) => e.id !== id));
    // si on supprime l'étudiant en cours de modification, on quitte le mode modification
    if (etudiantAModifier && etudiantAModifier.id === id) {
      setEtudiantAModifier(null);
    }
  }

  function modifierEtudiant(etudiant) {
    setEtudiantAModifier(etudiant);
  }

  function enregistrerModification(etudiantModifie) {
    setEtudiants((anciensEtudiants) =>
      anciensEtudiants.map((etudiant) =>
        etudiant.id === etudiantAModifier.id
          ? { ...etudiantModifie, id: etudiant.id } // on conserve l'id
          : etudiant
      )
    );
    setEtudiantAModifier(null);
  }

  return (
    <div className="app">
      <Header />
      <Navbar />

      <h1 id="st">Student list</h1>

      {etudiants.map((etudiant) => (
        <Studentcard
          key={etudiant.id}
          etudiant={etudiant}
          onModifier={modifierEtudiant}
          onSupprimer={supprimerEtudiant}
        />
      ))}

      <StudentForm
        key={etudiantAModifier ? etudiantAModifier.id : "nouveau"}
        onAjouterEtudiant={ajouterEtudiant}
        etudiantAModifier={etudiantAModifier}
        onModifierEtudiant={enregistrerModification}
      />

      <Footer />
    </div>
  );
}

export default App;


