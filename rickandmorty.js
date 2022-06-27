var container = document.querySelector(".container");
var paginationDiv = document.querySelector(".pagination");
var leftArrow = document.createElement("button");
leftArrow.textContent = "<";
leftArrow.className = "arrow";
var rightArrow = document.createElement("button");
rightArrow.textContent = ">";
rightArrow.className = "arrow";
const headerRedirect = document.querySelectorAll(".headerRedirect")

let buttons = [];

paginationDiv.appendChild(leftArrow);
for (let i = 1; i < 6; i++) {
  buttons[i - 1] = document.createElement("button");
  paginationDiv.appendChild(buttons[i - 1]);
  buttons[i - 1].textContent = i;
  buttons[i - 1].addEventListener("click", function () {
    currentPage = parseInt(buttons[i - 1].textContent);
    pagination();
    fetchData();
    console.log(currentPage);
  });
}
paginationDiv.appendChild(rightArrow);

let currentPage = 1;
let flag;

function pagination() {
  flag = currentPage;
  if (flag < 4) {
    for (let i = 1; i < 6; i++) {
      buttons[i - 1].textContent = i;
    }
  }
  if (flag > 3 && flag <= 40) {
    for (let i = 0; i < 5; i++) {
      buttons[i].textContent = flag - 2;
      flag++;
    }
  }
}

function fetchData() {
  fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
    .then((response) => response.json())
    .then((response) => makeChar(response));
}

function makeChar(data) {
  var cardsDelete = document.querySelectorAll(".card");
  [...cardsDelete].forEach((card) => card.remove());
  data.results.forEach((element) => {
    var card = document.createElement("div");
    card.className = "card";
    var img = document.createElement("img");
    img.setAttribute("src", element.image);
    var name = document.createElement("h2");
    name.innerText = element.name;
    var button = document.createElement("button");
    button.innerText = "LIKE";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(button);
    container.appendChild(card);

    button.addEventListener("click", function () {
      localStorage.setItem("character", element.id);
      //   window.open("./character.html", "_self");
      window.location.href = "./character.html";
    });
  });
}

function right() {
  if (currentPage < 40) return (currentPage += 1);
}

function left() {
  if (currentPage > 1) return (currentPage -= 1);
}

window.addEventListener("load", fetchData);

leftArrow.addEventListener("click", function () {
  left();
  pagination();
  fetchData();
});

rightArrow.addEventListener("click", function () {
  right();
  pagination();
  fetchData();
});

///redirect back to first page
headerRedirect.forEach((e) => e.addEventListener("click", function () {
  currentPage = 1
  pagination()
  fetchData()
}))