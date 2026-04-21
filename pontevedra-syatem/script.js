let map;
let marker;
let places = [];

// INIT MAP
function initMap() {
    map = L.map('map').setView([10.3365, 122.915], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

// LOAD DATA FROM DATABASE
function loadPlaces() {
    fetch("http://localhost/pontevedra-system/getPlaces.php")
        .then(res => res.json())
        .then(data => {
            places = data;
            loadDropdowns();
        });
}

// LOAD DROPDOWNS
function loadDropdowns() {
    const destination = document.getElementById("destinationSelect");
    const search = document.getElementById("searchSelect");

    destination.innerHTML = "<option>Select destination</option>";
    search.innerHTML = "<option>Select location</option>";

    places.forEach(place => {
        let opt1 = document.createElement("option");
        opt1.value = place.name;
        opt1.textContent = place.name;
        destination.appendChild(opt1);

        let opt2 = document.createElement("option");
        opt2.value = place.name;
        opt2.textContent = place.name;
        search.appendChild(opt2);
    });
}

// SHOW MARKER
function showPlace(name) {
    const place = places.find(p => p.name === name);
    if (!place) return;

    if (marker) map.removeLayer(marker);

    marker = L.marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`<b>${place.name}</b><br>${place.description}`)
        .openPopup();

    map.setView([place.lat, place.lng], 15);
}

// EVENT
document.addEventListener("DOMContentLoaded", () => {
    initMap();
    loadPlaces();

    document.getElementById("searchSelect").addEventListener("change", function () {
        showPlace(this.value);
    });
});