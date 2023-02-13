var films = [
  { name: "Deadpool", years: 2016, authors: "Tim Miller" },
  { name: "Spiderman", years: 2002, authors: "Sam Raimi" },
  { name: "Scream", years: 1996, authors: "Wes Craven" },
  { name: "It: chapter 1", years: 2019, authors: "Andy Muschietti" },
];
var tableau = document.querySelector("#tableau");
let ajout = document.querySelector("#ajout");
ajout.style.display = "none";
let ajouter = document.querySelector("#ajouter");
let valider = document.querySelector("#valider");
let titre = document.querySelector("#titre");
let date = document.querySelector("#date");
let real = document.querySelector("#real");
let tri = document.querySelector("#tri");
var controle = 0;
var erreur = "";
var aujd = new Date();
var annee = aujd.getFullYear()+1;


// Fonction d'affichage du tableau JS en HTML
function remplir() {
  tableau.innerHTML = "";

  for (i = 0; i < films.length; i++) {
    tableau.innerHTML += `<tr> 
        <td class="fw-light align-middle text-light">${films[i].name}</td> 
        <td class="fw-light align-middle text-light">${films[i].years}</td> 
        <td class="fw-light align-middle text-light">${films[i].authors}</td> 
        <td><button type="button" data-id="${i}" class="supprimer spr btn btn-danger">Supprimer</button>
        <a><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" data-id="${i}" class="croix bi bi-x-square bg-light" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg></a>
        </td></tr>`;
  }
}

remplir();

// Au clique, le bouton valider laisse sa place au formulaire
ajouter.addEventListener("click", () => {
  ajouter.style.display = "none";
  ajout.style.display = "block";
});

// Fonction de vérification du film entré par l'utilisateur
function verif() {
  if (titre.value.length >= 2) {
    controle++;
  } else {
    erreur += ` Le titre doit comporter au moins 2 caractères.`;
  }
  if (date.value < annee && date.value > 1900) {
    controle++;
  } else {
    erreur += ` La date doit se trouver entre 1900 et aujourd'hui.`;
  }
  if (real.value.length >= 5) {
    controle++;
  } else {
    erreur += " Le nom du réalisateur doit comporter au moins 5 caractères.";
  }
}

// Evenement d'ajout du film utilisateur au tableau s'il est correct
valider.addEventListener("click", () => {
  verif();
  if (controle == 3) {
    Swal.fire({
      icon: "success",
      title: "Film ajouté avec succès.",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    let title = titre.value.charAt(0).toUpperCase() + titre.value.substr(1);
    let realisateur = real.value.charAt(0).toUpperCase() + real.value.substr(1);

    plus = films.push({
      name: `${title}`,
      years: `${date.value}`,
      authors: `${realisateur}`,
    });

    remplir();

    ajout.style.display = "none";
    ajouter.style.display = "inline-flex";
    controle = 0;
  } else {
    Swal.fire({
      icon: "error",
      title: "Erreur dans le formulaire",
      text: `${erreur}`,
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    erreur = "";
    controle = 0;
  }
});

// Filtre d'ordre d'affichage du tableau
tri.addEventListener("change", () => {
  if (tri.value == "nom") {
    function ordreAlpha(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    }
    films = films.sort(ordreAlpha);
    remplir();
  }
  console.log(tri.value);
  if (tri.value == "age") {
    films = films.sort((a, b) => b.years - a.years);
    remplir();
  }
});

// Suppression d'une ligne sélectionnée du tableau après confirmation

document.addEventListener("click", function(e) {
  if ((e.target.matches(".supprimer")) || (e.target.matches(".croix"))) {
    indice = parseInt(e.target.dataset.id);
        Swal.fire({
      title: 'Êtes-vous sur ?',
      text: "Vous ne pourrez plus revenir en arrière",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
    if (result.isConfirmed) {
    films.splice(indice, 1);
remplir();
        Swal.fire(
          'Supprimé',
          'Le film a bien été supprimé',
          'success'
        )
      }
    })
  }
});

// let supprimer = document.querySelectorAll(".supprimer");
//   supprimer.forEach((suppr) => {
//     suppr.addEventListener("click", function () {
//       indice = parseInt(suppr.dataset.id);
//       films.splice(indice, 1);
//       remplir()
//       console.log(suppr.dataset.id);
//     console.log(films);
//   });
// });