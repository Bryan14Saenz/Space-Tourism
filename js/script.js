// Constantes
const listItems = document.querySelectorAll(".header__nav__list__item"); // List Items Decoration
const fragment = document.createDocumentFragment(); // Document Fragment
const destination = document.getElementById("destination"); // Destination
const bntExplore = document.getElementById("explore"); // Bnt Explore

// Funciones
const bordeIndicador = () => {
  if (location.pathname === "/index.html") {
    listItems[0].classList.add("active");
  } else if (location.pathname === "/html/destination.html") {
    listItems[1].classList.add("active");
  } else if (location.pathname === "/html/crew.html") {
    listItems[2].classList.add("active");
  } else if (location.pathname === "/html/technology.html") {
    listItems[3].classList.add("active");
  }

  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      listItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
};

const getData = async () => {
  const response = await fetch("../json/data.json");
  const data = await response.json();
  return data;
};

const bodyBackground = () => {
  const rutas = {
    "/index.html": "home",
    "/html/destination.html": "destination",
    "/html/crew.html": "crew",
    "/html/technology.html": "technology",
  };

  const width = window.innerWidth;
  const ruta = rutas[location.pathname];
  let size = "desktop";

  if (width < 375) {
    size = "mobile";
  } else if (width < 768) {
    size = "tablet";
  }

  if (ruta) {
    document.body.style.backgroundImage = `url(../assets/${ruta}/background-${ruta}-${size}.jpg)`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  }
};

// Eventos
window.addEventListener("resize", () => {
  bodyBackground();
}); // Inicializacion de la función de Background cuando se redimenciona la ventana

window.addEventListener("DOMContentLoaded", () => {
  getData().then((data) => {
    const container = document.createElement("div");

    container.classList.add("container");
    container.innerHTML = `
        <h2><span>01</span> PICK YOUR DESTINATION</h2>
        <div class="container__img">
          <img src="../assets/destination/image-moon.png" alt="moon" />
        </div>
        <div class="container__explation">
          <ul class="explation__list">
            <li class="list__item">
              <button id="btnMoon">${data.destinations[0].name}</button>
            </li>
            <li class="list__item">
              <button id="btnMars">${data.destinations[1].name}</button>
            </li>
            <li class="list__item">
              <button id="btnEuropa">${data.destinations[2].name}</button>
            </li>
            <li class="list__item">
              <button id="btnTitan">${data.destinations[3].name}</button>
            </li>
          </ul>
          <div class="explation__text">
            <h2>${data.destinations[0].name}</h2>
            <p>
              ${data.destinations[0].description}
            </p>
          </div>
          <hr>
          <div class="explation__statistics">
            <div class="statistics__distance">
              <p>AVG. DISTANCE</p>
              <h3>${data.destinations[0].distance}</h3></h3>
            </div>
            <div class="statistics__travel">
              <p>EST. TRAVEL TIME</p>
              <h3>${data.destinations[0].travel}</h3>
            </div>
          </div>
        </div>`;

    fragment.appendChild(container);
    destination.appendChild(fragment);
  });
}); // Inicializacion de Destination

destination.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON") {
    const data = await getData();
    let idx;

    switch (e.target.id) {
      case "btnMoon":
        idx = 0;
        break;
      case "btnMars":
        idx = 1;
        break;
      case "btnEuropa":
        idx = 2;
        break;
      case "btnTitan":
        idx = 3;
        break;
      default:
        return;
    }

    destination.innerHTML = "";

    const container = document.createElement("div");

    container.classList.add("container");
    container.innerHTML = `
      <h2><span>01</span> PICK YOUR DESTINATION</h2>
      <div class="container__img">
        <img src="../assets/destination/image-${data.destinations[
          idx
        ].name.toLowerCase()}.png" alt="${data.destinations[idx].name}" />
      </div>
      <div class="container__explation">
        <ul class="explation__list">
          <li class="list__item"><button id="btnMoon">${
            data.destinations[0].name
          }</button></li>
          <li class="list__item"><button id="btnMars">${
            data.destinations[1].name
          }</button></li>
          <li class="list__item"><button id="btnEuropa">${
            data.destinations[2].name
          }</button></li>
          <li class="list__item"><button id="btnTitan">${
            data.destinations[3].name
          }</button></li>
        </ul>
        <div class="explation__text">
          <h2>${data.destinations[idx].name}</h2>
          <p>${data.destinations[idx].description}</p>
        </div>
        <hr>
        <div class="explation__statistics">
          <div class="statistics__distance">
            <p>AVG. DISTANCE</p>
            <h3>${data.destinations[idx].distance}</h3>
          </div>
          <div class="statistics__travel">
            <p>EST. TRAVEL TIME</p>
            <h3>${data.destinations[idx].travel}</h3>
          </div>
        </div>
      </div>
    `;

    destination.appendChild(container);
  }
}); // Cambio de destinos al hacer click en los botones

// Inicializacion
bordeIndicador(); // Llamada a la función de List Items
bodyBackground(); // Llamada a la función de Background
