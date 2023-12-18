"use strict";

let map;
let myLocationMarker;
let autocomplete;

function initMap() {
  // Crear un objeto de opciones del mapa
  const mapOptions = {
    zoom: 18,
    fullscreenControl: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeId: "satellite"
  };

  // Crear el mapa y establecerlo en el div con el id "gmp-map"
  map = new google.maps.Map(document.getElementById("gmp-map"), mapOptions);

  // Define la URL de la imagen del icono personalizado
  const customIconUrl = './assets/qubonegro.svg'; // Reemplaza con la URL de tu imagen

  // Crear un marcador para tu ubicación inicial con el icono personalizado
  myLocationMarker = new google.maps.Marker({
    map: map,
    title: "Mi ubicación",
    icon: customIconUrl
  });
//! CUIDADO!!
  myLocationMarker.addListener("click", function(){
    const infoBox = document.querySelector(".info-box");
    const content = `
        <p>Contenido del párrafo</p>
        <button id="cerrar-info-box">Mi botón</button>
    `;
    // Insertar el contenido en el elemento info-box
    infoBox.innerHTML = content;

    // Agregar un evento click al botón de cierre
    const cerrarBoton = document.getElementById("cerrar-info-box");
    cerrarBoton.addEventListener("click", function() {
        infoBox.innerHTML = ""; // Elimina el contenido del info-box
    });

  });


  //! CUIDADO
  const nuevaUbicacionLatLng = { lat: 40.054374, lng: 0.062349 };
  const nuevaUbicacionIconUrl = './assets/qubo-rojo.svg';

  const nuevaUbicacionMarker = new google.maps.Marker({
    position: nuevaUbicacionLatLng,
    map: map,
    title: "Incidence",
    icon: nuevaUbicacionIconUrl
  });

  nuevaUbicacionMarker.addListener("click", function() {
    const infoBox = document.querySelector('.info-box');
    infoBox.style.display = 'flex'
  });
  // Agregar un evento click al botón de cierre en el cuadro de información
  const cerrarBoton = document.getElementById("cerrar-info-box");
  cerrarBoton.addEventListener("click", function() {
  // Selecciona el cuadro de información
  const infoBox = document.querySelector(".info-box");
  
  // Oculta el cuadro de información
  infoBox.style.display = "none";
});
  
  //!
  //?
  const nuevoMarkerLatLng = { lat: 40.056898, lng: 0.097402 };
  const nuevoMarkerIconUrl = './assets/qubonegro.svg';

  const nuevoMarker = new google.maps.Marker({
    position: nuevoMarkerLatLng,
    map: map,
    title: "Ubicación Random",
    icon: nuevoMarkerIconUrl
  });
  
  nuevoMarker.addListener("click", function() {
    const infoBox = document.querySelector('.info-box');
    infoBox.style.display = 'flex';
    infoBox.innerHTML = ''
  });
  


  // Define las coordenadas de la ubicación personalizada y la URL de su icono personalizado
  const customLocationLatLng = { lat: 40.06054023234016, lng: 0.1031147223559949 };
  const customLocationIconUrl = './assets/quboblanco.svg'; // Reemplaza con la URL de tu imagen

  // Crear un marcador para la ubicación personalizada
  const customLocationMarker = new google.maps.Marker({
    position: customLocationLatLng,
    map: map,
    title: "Oficina Qubo Factory",
    icon: customLocationIconUrl
  });



  // Agregar un evento click al marcador de la ubicación personalizada
  customLocationMarker.addListener("click", function() {
    // Define la URL de la página web que deseas abrir
    const webpageUrl = 'https://www.spatial.io/s/Qubo-Factory-Meeting-Room-650d7b39fa3720c215733286?share=6752416412510878923'; // Reemplaza con la URL de tu página web

    // Abre la página web en una nueva ventana o pestaña
    window.open(webpageUrl, '_blank');
  });

  // Inicializar el autocompletado de búsqueda
  const input = document.getElementById('pac-input');
  autocomplete = new google.maps.places.Autocomplete(input);

  // Evento cuando se selecciona una sugerencia del autocompletado
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No se pudo encontrar el lugar: " + input.value);
      return;
    }

    // Centrar el mapa en el lugar seleccionado y ajustar el zoom
    map.setCenter(place.geometry.location);
    map.setZoom(18);
  });

  // Evento para manejar la búsqueda cuando se presiona "Enter" en el campo de entrada
  input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que se realice la acción por defecto (como enviar el formulario)

      // Realiza la búsqueda cuando se presiona "Enter"
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No se pudo encontrar el lugar: " + input.value);
        return;
      }

      // Centrar el mapa en el lugar seleccionado y ajustar el zoom
      map.setCenter(place.geometry.location);
      map.setZoom(18);
    }
  });

  // Botón para volver a tu ubicación inicial
  const locateButton = document.getElementById("locate-button");
  locateButton.addEventListener("click", goToMyLocation);

  // Obtener la ubicación actual del usuario
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function (position) {
      const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Actualizar la posición del marcador a la ubicación del usuario
      myLocationMarker.setPosition(userLatLng);
      map.setCenter(userLatLng);
    });
  }
}

// Función para volver a tu ubicación inicial
function goToMyLocation() {
  map.setCenter(myLocationMarker.getPosition());
  map.setZoom(18);
}

// LISTENERS

document.addEventListener('DOMContentLoaded', function () {
  console.log('Función ejecutada');

  const firstNavItem = document.getElementById('first-nav-item');

  firstNavItem.addEventListener('click', function () {
    // Crear la sub-barra
    const subNavBar = document.createElement('nav');
    subNavBar.classList.add('sub-nav-bar');
    subNavBar.innerHTML = `
    <ul>
        <li>
            <a href="#">
                <img class='bar-buttons' src="./assets/home--front 1.svg" alt="">
                <p>Houses</p>
            </a>
        </li>
        <li>
            <a href="#">
                <img class='bar-buttons' src="./assets/office 1.svg" alt="">
                <p>Houses</p>
            </a>
        </li>
        <li>
            <a href="#">
                <img class='bar-buttons' src="./assets/cargo--crane 1.svg" alt="">
                <p>Houses</p>
            </a>
        </li>
  </ul>
    <button id="cerrar-info-box">
      <img src="./assets/close-circle-svgrepo-com.svg" alt=""> 
    </button>
    `


    // Agregar la sub-barra al cuerpo del documento
    firstNavItem.parentElement.appendChild(subNavBar);

    subNavBar.style.display = 'block';
  });
});
