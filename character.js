var id = localStorage.getItem("character");
var container = document.querySelector(".character");

function fetchData() {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((res) => res.json())
    .then((res) => character(res));
}

function character(data) {
  var card = document.querySelector(".character");
  var img = document.createElement("img");
  img.setAttribute("src", data.image);
  var name = document.createElement("h2");
  name.textContent = data.name;
  var gender = document.createElement("p");
  var species = document.createElement("p");
  var charStatus = document.createElement("p");
  var origin = document.createElement("p");
  var location = document.createElement("p");
  gender.textContent = "Gender: " + data.gender;
  species.textContent = "Species: " + data.species;
  charStatus.textContent = "Status: " + data.status;
  origin.textContent = "Origin: " + data.origin.name;
  location.textContent = "Location: " + data.location.name;
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(gender);
  card.appendChild(species);
  card.appendChild(charStatus);
  card.appendChild(origin);
  card.appendChild(location);
  container.appendChild(card);
}

window.addEventListener("load", fetchData);
