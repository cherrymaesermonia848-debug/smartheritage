// =========================
// ICONS
// =========================
const icons = {
  resort: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [30,30]
  }),
  heritage: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [30,30]
  }),
  tourist: L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/535/535137.png',
    iconSize: [30,30]
  })
};

const table = document.getElementById("table");
let map;
let markers = L.markerClusterGroup();

// =========================
// SAVE TO DATABASE
// =========================
function saveToDatabase(name, barangay, lat, lng, type){
  fetch("add.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `name=${name}&barangay=${barangay}&lat=${lat}&lng=${lng}&type=${type}`
  });
}

// =========================
// ADD ROW
// =========================
function addRow(name, barangay, lat, lng, type){
  let row = table.insertRow();

  row.innerHTML = `
    <td>${name}</td>
    <td>${barangay}</td>
    <td>${lat}</td>
    <td>${lng}</td>
    <td>${type}</td>
    <td>
      <button onclick="deleteRow(this)">Delete</button>
    </td>
  `;
}

// =========================
// DELETE (FRONTEND ONLY)
// =========================
function deleteRow(btn){
  btn.parentElement.parentElement.remove();
  updateCount();
}

// =========================
// COUNT
// =========================
function updateCount(){
  document.getElementById("totalSpots").innerText = table.rows.length - 1;
}

// =========================
// LOAD FROM DATABASE
// =========================
function loadMarkers(){

  fetch("get_locations.php")
    .then(res => res.json())
    .then(data => {

      // RESET TABLE
      table.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Barangay</th>
          <th>Lat</th>
          <th>Lng</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      `;

      if(markers){
        markers.clearLayers();
      }

      data.forEach(p => {

        addRow(p.name, p.barangay, p.lat, p.lng, p.type);

        if(map){
          let marker = L.marker([p.lat, p.lng], {
            icon: icons[p.type] || icons.tourist
          })
          .bindPopup(`<b>${p.name}</b><br>${p.barangay}<br>${p.type}`);

          markers.addLayer(marker);
        }

      });

      if(map){
        map.addLayer(markers);
      }

      updateCount();
    });
}

// =========================
// MAP
// =========================
function initMap(){
  map = L.map('mapContainer').setView([10.3746, 122.8671], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  loadMarkers();

  map.on('click', function(e){
    let lat = e.latlng.lat.toFixed(6);
    let lng = e.latlng.lng.toFixed(6);

    let name = prompt("Place name:");
    let barangay = prompt("Barangay:");
    let type = prompt("Type (resort / heritage / tourist):");

    if(name && barangay){
      saveToDatabase(name, barangay, lat, lng, type);
      loadMarkers(); // 🔥 auto refresh
    }
  });
}

// =========================
// SIDEBAR
// =========================
function showSection(id){
  let sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = "none");

  document.getElementById(id).style.display = "block";

  if(id === "map"){
    setTimeout(()=>{
      if(!map){
        initMap();
      } else {
        map.invalidateSize();
      }
    }, 300);
  }

  if(id === "tourist"){
    loadMarkers();
  }
}

// =========================
// LOAD PAGE
// =========================
window.onload = function(){
  loadMarkers();
};