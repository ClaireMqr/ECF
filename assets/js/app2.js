let valider = document.querySelector("#valider");
let filmTrouve = document.querySelector("#filmTrouve");
let result = document.querySelector("#result");
let type = document.querySelector("#type");
let pagination = document.querySelector("#pagination");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");
let last = document.querySelector('#last');
let first = document.querySelector('#first')
var nbrPage = 0;
var pageActu = 0;

// Au clique sur le bouton valider

valider.addEventListener("click", () => {
  let date = document.querySelector("#date").value;
  let titre = document.querySelector("#titre").value;
  titre = titre.replaceAll(/[ ]/gi, "+");
  filmTrouve.innerHTML = "";
  pagination.innerHTML = "";
  pageActu = 1

  // URL de base pour trouver par le titre

  var url = `https://www.omdbapi.com/?s=${titre}&apikey=9750f373`;

  // Vérification de la présence d'une date et d'un type

  if (type.selectedIndex > 0) {
    url = url + `&type=${type.value}`;
  }
  if (date >= 1) {
    url = url + `&y=${date}`;
  }

  // Lancement de la requête de l'API

  var client = new XMLHttpRequest();
  client.onreadystatechange = function () {
    if (client.readyState === 4 && client.status === 200) {
      let film = JSON.parse(client.responseText);

      // Calcul du nombre de pages de résultats (10 résultats par page)

      nbrPage = Math.ceil(film.totalResults / 10);
      console.log(film);
      for (i = 1; i < nbrPage + 1; i++) {
        pagination.innerHTML += `<li class="pages page-item"><a class="page-link" href="#">${i}</a></li>`;
      }
      let pages = document.querySelectorAll(".pages");

      pages.forEach((page) => {
        page.addEventListener("click", function () {
          newUrl = url + `&page=${page.textContent}`;
          pageActu = parseInt(page.textContent);
          pagination.innerHTML = "";
          console.log(pageActu)
         
          // Remise à zéro de l'affichage des résultats

          filmTrouve.innerHTML = "";

          // Récupération des résultats de la page sélectionnée

          console.log(newUrl);
          client.open("GET", `${newUrl}`);
          client.send();
        });
      });

      // Définition de la page sur laquelle l'utilisateur se trouve

      if (pageActu == 0) {
        pages[pageActu].classList.add('active')
      }

      if (pageActu > 0) {
        pages[pageActu-1].classList.add('active')
      }      
      
      // Affichage de la pagination en fonction de la page actuelle

      pages.forEach((page) => {
        if (
          (parseInt(page.textContent) > (pageActu + 5))  && ((parseInt(page.textContent)) < nbrPage) || ((parseInt(page.textContent) < (pageActu - 5)) && parseInt(page.textContent) >1))
          {
          page.style.display = "none";
          }
      else {
        page.style.display = "block"
          }
        })

      // Affichage de la page 1 par défaut

      result.innerHTML = `Il y a ${film.totalResults} résultat(s)`;
      for (i = 0; i < film.Search.length; i++) {
        if (film.Search[i].Poster == "N/A") {
          film.Search[i].Poster = "./assets/img/noimage.png";
        }
        filmTrouve.innerHTML += `<div class="card col-xl-2 col-4 p-0 m-3">
            <img class="card-img-top img-fluid" src = "${film.Search[i].Poster}">
            <div class="card-body">
            <ul class="list-group list-group-flush">
            <li class="list-group-item text-center">${film.Search[i].Title}</li>
            <li class="list-group-item text-center">${film.Search[i].Year}</li>
            </ul>
            </div></div>`;
      }
    }
  };
  client.open("GET", `${url}`);
  client.send();
});
