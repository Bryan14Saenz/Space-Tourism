// Constantes
const listItems = document.querySelectorAll(".header__nav__list__item"); // List Items Decoration
const fragment = document.createDocumentFragment(); // Document Fragment
const btnExplore = document.getElementById("explore"); // Button Explore
const destination = document.getElementById("destination"); // Destination
const crew = document.getElementById("crew"); // Crew
const technology = document.getElementById("technology"); // Technology

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
window.addEventListener("DOMContentLoaded", () => {
  bordeIndicador(); // Llamada a la función de List Items
  bodyBackground(); // Llamada a la función de Background

  btnExplore.addEventListener("click", () => {
    location.href = "/html/destination.html";
  }); // Llamada a la función de Button Explore
}); // Inicializacion de la funciones por defecto

window.addEventListener("resize", () => {
  bodyBackground();
}); // Llamada a la función con el evento Resize

window.addEventListener("load", () => {
  if (location.pathname === "/html/destination.html") {
    getData().then((data) => {
      const container = document.createElement("div");

      container.classList.add("destination");
      container.innerHTML = `
        <h2><span>01</span> PICK YOUR DESTINATION</h2>
        <div class="destination__img">
          <img src="../assets/destination/image-moon.png" alt="moon" />
        </div>
        <div class="destination__explation">
          <ul class="explation__list">
            <li class="list__item activeD">
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

        container.classList.add("destination");
        container.innerHTML = `
          <h2><span>01</span> PICK YOUR DESTINATION</h2>
          <div class="destination__img">
            <img src="../assets/destination/image-${data.destinations[
              idx
            ].name.toLowerCase()}.png" alt="${data.destinations[idx].name}" />
          </div>
          <div class="destination__explation">
            <ul class="explation__list">
              <li class="list__item ${idx === 0 ? "activeD" : ""}">
                <button id="btnMoon">${data.destinations[0].name}</button></li>
              <li class="list__item ${idx === 1 ? "activeD" : ""}">
                <button id="btnMars">${data.destinations[1].name}</button></li>
              <li class="list__item ${idx === 2 ? "activeD" : ""}">
                <button id="btnEuropa">${
                  data.destinations[2].name
                }</button></li>
              <li class="list__item ${idx === 3 ? "activeD" : ""}">
                <button id="btnTitan">${data.destinations[3].name}</button></li>
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
          </div>`;

        destination.appendChild(container);
      }
    }); // Cambio de destinos al hacer click en los botones
  } else if (location.pathname === "/html/crew.html") {
    getData().then((data) => {
      const container = document.createElement("div");

      container.classList.add("crew");
      container.innerHTML = `
        <h2><span>02</span> MEET YOUR CREW</h2>
        <div class="crew__text">
          <p>${data.crew[0].role}</p>
          <h3>${data.crew[0].name}</h3></h3>
          <div class="crew__bio">
            <p>${data.crew[0].bio}</p>
          </div>
        </div>
        <div class="crew__nav">
          <ul class="explation__list">
            <li class="list__item activeC">
              <button id="btnDouglas">.</button>
            </li>
            <li class="list__item">
              <button id="btnMark">.</button>
            </li>
            <li class="list__item">
              <button id="btnVictor">.</button>
            </li>
            <li class="list__item">
              <button id="btnAnousheh">.</button>
            </li>
          </ul>
        </div>
        <div class="crew__img">
          <img src="../assets/crew/image-douglas hurley.png" alt="commander" />
        </div>
        `;

      fragment.appendChild(container);
      crew.appendChild(fragment);
    });

    crew.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        const data = await getData();
        let idx;

        switch (e.target.id) {
          case "btnDouglas":
            idx = 0;
            break;
          case "btnMark":
            idx = 1;
            break;
          case "btnVictor":
            idx = 2;
            break;
          case "btnAnousheh":
            idx = 3;
            break;
          default:
            return;
        }

        crew.innerHTML = "";

        const container = document.createElement("div");

        container.classList.add("crew");
        container.innerHTML = `
          <h2><span>02</span> MEET YOUR CREW</h2>
          <div class="crew__text">
            <p>${data.crew[idx].role}</p>
            <h3>${data.crew[idx].name}</h3></h3>
            <div class="crew__bio">
              <p>${data.crew[idx].bio}</p>
            </div>
          </div>
          <div class="crew__nav">
            <ul class="explation__list">
              <li class="list__item ${idx === 0 ? "activeC" : ""}">
                <button id="btnDouglas">.</button>
              </li>
              <li class="list__item ${idx === 1 ? "activeC" : ""}">
                <button id="btnMark">.</button>
              </li>
              <li class="list__item ${idx === 2 ? "activeC" : ""}">
                <button id="btnVictor">.</button>
              </li>
              <li class="list__item ${idx === 3 ? "activeC" : ""}">
                <button id="btnAnousheh">.</button>
              </li>
            </ul>
          </div>
          <div class="crew__img">
            <img src="../assets/crew/image-${data.crew[
              idx
            ].name.toLowerCase()}.png" alt="${data.crew[idx].name}" />
          </div>`;

        crew.appendChild(container);
      }
    }); // Cambio de crew al hacer click en los botones
  } else if (location.pathname === "/html/technology.html") {
    getData().then((data) => {
      const container = document.createElement("div");

      container.classList.add("tech");
      container.innerHTML = `
        <h2><span>03</span> SPACE LAUNCH 101</h2>
        <div class="tech__img">
          <img src="../assets/technology/image-launch vehicle-landscape.jpg" alt="launch vehicle" />
        </div>
        <div class="tech__container">
          <ul class="tech__list">
            <li class="list__item activeT">
              <button id="btnLaunch">1</button>
            </li>
            <li class="list__item">
              <button id="btnSpaceport">2</button>
            </li>
            <li class="list__item">
              <button id="btnCrew">3</button>
            </li>
          </ul>
          <div class="tech__text">
            <h2>THE TERMINOLOGY...</h2>
            <div class="text__content">
              <h2>${data.technology[0].name}</h2>
              <p>
                ${data.technology[0].description}
              </p>
            </div>
          </div>
        </div>
        `;

      fragment.appendChild(container);
      technology.appendChild(fragment);
    });

    technology.addEventListener("click", async (e) => {
      if (e.target.tagName === "BUTTON") {
        const data = await getData();
        let idx;

        switch (e.target.id) {
          case "btnLaunch":
            idx = 0;
            break;
          case "btnSpaceport":
            idx = 1;
            break;
          case "btnCrew":
            idx = 2;
            break;
          default:
            return;
        }

        technology.innerHTML = "";

        const container = document.createElement("div");

        container.classList.add("tech");
        container.innerHTML = `
          <h2><span>03</span> SPACE LAUNCH 101</h2>
          <div class="tech__img">
            <img src="../assets/technology/image-${data.technology[
              idx
            ].name.toLowerCase()}-landscape.jpg" alt="${
          data.technology[idx].name
        }" />
          </div>
          <div class="tech__container">
            <ul class="tech__list">
              <li class="list__item ${idx === 0 ? "activeT" : ""}">
                <button id="btnLaunch">1</button>
              </li>
              <li class="list__item ${idx === 1 ? "activeT" : ""}">
                <button id="btnSpaceport">2</button>
              </li>
              <li class="list__item ${idx === 2 ? "activeT" : ""}">
                <button id="btnCrew">3</button>
              </li>
            </ul>
            <div class="tech__text">
              <h2>THE TERMINOLOGY...</h2>
              <div class="text__content">
                <h2>${data.technology[idx].name}</h2>
                <p>
                  ${data.technology[idx].description}
                </p>
              </div>
            </div>
          </div>
          `;

        technology.appendChild(container);
      }
    });
  }
}); // Inicializacion de los destinos
