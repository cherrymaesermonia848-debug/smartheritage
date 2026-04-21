function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

let map;
let marker;

// DATA
const places = {
    barangay: [
        {
  id: 1,
  type: "barangay",
  name: "Barangay I",
  lat: 10.3365,
  lng:122.915,
  description: "Town center of the municipality.",
  history: "Oldest barangay...",
  image: "barangay_image/barangayI.jpg"
},

{   id: 2,
    name: "Barangay II",
   type: "barangay",
    lat:10.3358,
  lng:122.918,
    description: "Urban barangay near town center.",
    history: "Oldest barangay...",
    image: "barangay_image/barangayII.jpg"
  },

{   id: 3,
    name: "Buenavista Rizal",
   type: "barangay",
    lat:10.330,
  lng:122.888,
    description: "Peaceful barangay with strong fishing and farming traditions.",
      history: "Oldest barangay...",
     image: "barangay_image/buenavista.png",
 },

 { 
    id: 4,
    name: "Burgos",
   type: "barangay",
    lat:10.347,
  lng:122.940,
    description: "Peaceful barangay with strong fishing and farming traditions.",
      history: "Oldest barangay...",
     image: "barangay_image/Burgos.png",
 },

{
    id: 5,
    name: "Cambarus",
   type: "barangay",
    lat:10.345,
  lng:122.972,
    description: "Community known for farming and peaceful surroundings",
      history: "Oldest barangay...",
     image: "barangay_image/cambarus.jpg",

 },



    ],


    resort: [
        {
  id:6 ,
  type: "resort",
  name: "Paradise Resort",
  lat: 11.15,
  lng: 123.75,
  description: "Relaxing beach resort",
  history: "Established 2010",
  contact: "09123456789",
  email: "resort@email.com",
  fb: "facebook.com/resort",
  website: "www.resort.com",
  rate: "₱500 entrance",
  cottage: "₱1000 cottage",
  image: "https://via.placeholder.com/400"
},
{
 id:6 ,
  type: "resort",
  name: "Paradise Resort",
  lat: 11.15,
  lng: 123.75,
  description: "Relaxing beach resort",
  history: "Established 2010",
  contact: "09123456789",
  email: "resort@email.com",
  fb: "facebook.com/resort",
  website: "www.resort.com",
  rate: "₱500 entrance",
  cottage: "₱1000 cottage",
  image: "https://via.placeholder.com/400"
}



    ],


    heritage: [
        {
  id: 7,
  type: "heritage",
  name: "Old Church",
  lat: 11.13,
  lng: 123.74,
  description: "Center of Pontevedra",
  history: "Oldest barangay...",
  image: "https://via.placeholder.com/400"
}
    ],
    tourist: [
        {
  id:8 ,
  type: "tourist",
  name: "River View",
  lat: 11.2,
  lng: 123.8,
  description: "Center of Pontevedra",
  history: "Oldest barangay...",
  image: "https://via.placeholder.com/400"
}
    ],
   cafe: [
      {
  id: 9,
  type: "cafe",
  name: "tagu",
  lat: 11.4,
  lng: 123.96,
  description: "Center of Pontevedra",
  history: "Oldest barangay...",
  image: "https://via.placeholder.com/400"
}
    ]

};

// 🔥 POPUP FUNCTION (NEW)
function createPopup(place){
    return `
        <div style="text-align:center;">
            <h4>${place.name}</h4>

            <button onclick="viewDetails(${place.id})"
                style="padding:5px 10px; margin:5px; background:green; color:white; border:none; border-radius:5px;">
                DETAILS
            </button>

            <button onclick="navigateTo(${place.lat}, ${place.lng})"
                style="padding:5px 10px; margin:5px; background:blue; color:white; border:none; border-radius:5px;">
                NAVIGATE
            </button>
        </div>
    `;
}

// INIT MAP
function initMap() {
    map = L.map('map').setView([10.3667, 122.8833], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

// TYPE → SEARCH UPDATE
function updateSearch() {
    const type = document.getElementById("typeSelect").value;
    const search = document.getElementById("searchSelect");

    search.innerHTML = "<option>Select location</option>";

    if (!type) return;

    places[type].forEach(place => {
        const option = document.createElement("option");
        option.value = place.name;
        option.textContent = place.name;
        search.appendChild(option);
    });
}

// MARKER ON SELECT
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("searchSelect").addEventListener("change", function () {
        const type = document.getElementById("typeSelect").value;
        const name = this.value;

        if (!type || !name) return;

        const selected = places[type].find(p => p.name === name);

        if (!selected) return;

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([selected.lat, selected.lng])
            .addTo(map)
            .bindPopup(createPopup(selected)) // ✅ UPDATED
            .openPopup();

        map.setView([selected.lat, selected.lng], 15);
    });

    initMap();
});

// DESTINATION
function loadAllDestinations() {
    const destination = document.getElementById("destinationSelect");

    if (!destination) return;

    destination.innerHTML = "<option>Select destination</option>";

    Object.keys(places).forEach(category => {
        places[category].forEach(place => {
            const option = document.createElement("option");
            option.value = place.name;
            option.textContent = place.name;
            destination.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadAllDestinations();
});


/* ===========================
   🔥 NEW SEARCH SYSTEM
   =========================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const suggestionBox = document.getElementById("suggestions");

    if (!searchInput || !suggestionBox) return;

    function getAllPlaces() {
        let all = [];
        Object.keys(places).forEach(cat => {
            all = all.concat(places[cat]);
        });
        return all;
    }

    function showLocation(place) {
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([place.lat, place.lng])
            .addTo(map)
            .bindPopup(createPopup(place)) // ✅ UPDATED
            .openPopup();

        map.setView([place.lat, place.lng], 15);
    }

    function showMapLocation(lat, lon, name) {
        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
                <div style="text-align:center;">
                    <h4>${name}</h4>
                    <button onclick="navigateTo(${lat}, ${lon})"
                        style="padding:5px 10px; margin:5px; background:blue; color:white; border:none; border-radius:5px;">
                        NAVIGATE
                    </button>
                </div>
            `) // ✅ UPDATED
            .openPopup();

        map.setView([lat, lon], 15);
    }

    searchInput.addEventListener("input", function () {
        let query = this.value.toLowerCase();
        suggestionBox.innerHTML = "";

        if (query.length < 2) return;

        let results = getAllPlaces().filter(place =>
            place.name.toLowerCase().includes(query)
        );

        results.forEach(place => {
            let li = document.createElement("li");
            li.textContent = place.name;

            li.onclick = () => {
                searchInput.value = place.name;
                suggestionBox.innerHTML = "";
                showLocation(place);
            };

            suggestionBox.appendChild(li);
        });

        if (results.length === 0) {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    data.slice(0, 5).forEach(loc => {
                        let li = document.createElement("li");
                        li.textContent = loc.display_name;

                        li.onclick = () => {
                            searchInput.value = loc.display_name;
                            suggestionBox.innerHTML = "";
                            showMapLocation(loc.lat, loc.lon, loc.display_name);
                        };

                        suggestionBox.appendChild(li);
                    });
                });
        }
    });
});


// VIEW DETAILS
function viewDetails(id){

     console.log("CLICKED ID:", id);


    let selectedPlace = null;

    Object.keys(places).forEach(cat => {
        const found = places[cat].find(p => p.id === id);
        if(found) selectedPlace = found;
    });

    console.log("FOUND:", selectedPlace);

    if(!selectedPlace) return;

    // BASIC INFO
    document.getElementById("detailTitle").innerText = selectedPlace.name;
    document.getElementById("detailDescription").innerText = selectedPlace.description || "";
document.getElementById("historyContent").classList.remove("show");
document.getElementById("arrow").textContent = "⬇";
    document.getElementById("detailImage").src = selectedPlace.image || "";

    // EXTRA DETAILS (RESORT / CAFE ONLY)
    const extra = document.getElementById("extraDetails");

    if(selectedPlace.type === "resort" || selectedPlace.type === "cafe"){

        extra.style.display = "block";

        document.getElementById("detailContact").innerText = selectedPlace.contact || "";
        document.getElementById("detailEmail").innerText = selectedPlace.email || "";
        document.getElementById("detailFB").innerText = selectedPlace.fb || "";
        document.getElementById("detailWebsite").innerText = selectedPlace.website || "";
        document.getElementById("detailRate").innerText = selectedPlace.rate || "";
        document.getElementById("detailCottage").innerText = selectedPlace.cottage || "";

    } else {
        extra.style.display = "none";
    }

    // SWITCH SECTION
    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));

    document.getElementById("details").classList.add("active");
}


function navigateTo(lat, lng){
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
}


// SIDEBAR FUNCTION
function openSection(event, sectionName) {

    event.preventDefault();

    const links = document.querySelectorAll(".menu a");
    links.forEach(link => link.classList.remove("active"));
    event.currentTarget.classList.add("active");

    const sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));

    document.getElementById(sectionName).classList.add("active");

    setTimeout(() => {
        if (map) {
            map.invalidateSize();
        }
    }, 200);
}
// HISTORY DETAILS
function toggleHistory() {
    const content = document.getElementById("historyContent");
    const arrow = document.getElementById("arrow");

    content.classList.toggle("show");

    arrow.textContent = content.classList.contains("show") ? "⬆" : "⬇";
}