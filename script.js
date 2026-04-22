function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

let map;
let marker;

let places = {};

function normalizePlaces(data) {
    if (!data) return {};

    if (Array.isArray(data)) {
        const grouped = {};
        data.forEach(place => {
            if (!place || !place.type) return;
            if (!grouped[place.type]) grouped[place.type] = [];
            grouped[place.type].push(place);
        });
        return grouped;
    }

    if (data.places && typeof data.places === "object") {
        return data.places;
    }

    if (typeof data === "object") {
        return data;
    }

    return {};
}

function loadPlaces() {
    return fetch("./retrieve.php", { cache: "no-store" })
        .then(res => res.json())
        .then(data => {
            places = normalizePlaces(data);
        })
        .catch(err => {
            console.error("Failed to load places:", err);
            places = {};
        });
}

const placesReady = loadPlaces();

// 🔥 POPUP FUNCTION (NEW)
function createPopup(place){
    return `
        <div style="text-align:center;">
            <h4>${place.name}</h4>

            <button data-action="details" data-id="${place.id}"
                style="padding:5px 10px; margin:5px; background:green; color:white; border:none; border-radius:5px;">
                DETAILS
            </button>

            <button data-action="navigate" data-link="${place.share_link || ""}"
                style="padding:5px 10px; margin:5px; background:blue; color:white; border:none; border-radius:5px;">
                NAVIGATE
            </button>
        </div>
    `;
}

// INIT MAP
function initMap() {
    map = L.map('map').setView([10.3667, 122.8833], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution:'© OpenStreetMap'
    }).addTo(map);



    map.on("popupopen", function (e) {
        const popupEl = e.popup.getElement();
        if (!popupEl) return;

        const detailsBtn = popupEl.querySelector("[data-action='details']");
        if (detailsBtn) {
            detailsBtn.addEventListener("click", function () {
                const id = Number(this.dataset.id);
                viewDetails(id);
            });
        }

        const navBtn = popupEl.querySelector("[data-action='navigate']");
        if (navBtn) {
            navBtn.addEventListener("click", function () {
                    const link = this.dataset.link || "";
                    navigateTo(link);
            });
        }
    });

}

// TYPE → SEARCH UPDATE
function updateSearch() {
    const type = document.getElementById("typeSelect").value;
    const search = document.getElementById("searchSelect");

    search.innerHTML = "<option>Select location</option>";

    if (!type || !places[type]) return;

    places[type].forEach(place => {
        const option = document.createElement("option");
        option.value = place.name;
        option.textContent = place.name;
        search.appendChild(option);
    });
}

// MARKER ON SELECT
document.addEventListener("DOMContentLoaded", function () {
    placesReady.then(() => {
        document.getElementById("searchSelect").addEventListener("change", function () {
            const type = document.getElementById("typeSelect").value;
            const name = this.value;

            if (!type || !name || !places[type]) return;

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
});

// DESTINATION
function loadAllDestinations() {
    const destination = document.getElementById("destinationSelect");

    if (!destination) return;

    destination.innerHTML = "<option>Select destination</option>";

    Object.keys(places).forEach(category => {
        if (!Array.isArray(places[category])) return;
        places[category].forEach(place => {
            const option = document.createElement("option");
            option.value = place.name;
            option.textContent = place.name;
            destination.appendChild(option);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    placesReady.then(() => {
        loadAllDestinations();
    });
});


/* ===========================
   🔥 NEW SEARCH SYSTEM
   =========================== */

document.addEventListener("DOMContentLoaded", function () {
    placesReady.then(() => {
        const searchInput = document.getElementById("searchInput");
        const suggestionBox = document.getElementById("suggestions");

        if (!searchInput || !suggestionBox) return;

        function getAllPlaces() {
            let all = [];
            Object.keys(places).forEach(cat => {
                if (Array.isArray(places[cat])) {
                    all = all.concat(places[cat]);
                }
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
                            <button onclick="navigateTo('')"
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
});


// VIEW DETAILS
function viewDetails(id){

     console.log("CLICKED ID:", id);


    let selectedPlace = null;

    Object.keys(places).forEach(cat => {
        const found = places[cat].find(p => Number(p.id) === Number(id));
        if(found) selectedPlace = found;
    });

    console.log("FOUND:", selectedPlace);

    if(!selectedPlace) return;

    // BASIC INFO
    document.getElementById("detailTitle").innerText = selectedPlace.name;
    document.getElementById("detailDescription").innerText = selectedPlace.description || "";
    document.getElementById("detailHistory").innerText = selectedPlace.history || "";
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


// 🔥 GOOGLE MAPS NAVIGATION
function navigateTo(shareLink) {
    const url = (shareLink || "").trim();
    if (!url) {
        alert("No share link available for this location.");
        return;
    }
    window.open(url, "_blank");
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