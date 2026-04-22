<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pontevedra Municipality</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</head>
<body>
<div class="sidebar">
    <div class="logo">Pontevedra Municipality</div>
    <div class="menu">
        <a href="#" onclick="openSection(event,'dashboard')" class="active">Dashboard</a>
        <a href="#" onclick="openSection(event,'home')">Home</a>
        <a href="#" onclick="openSection(event,'announcements')">Announcements</a>
        <a href="#" onclick="openSection(event,'services')">Services</a>
        <a href="#" onclick="openSection(event,'reports')">Reports</a>
        <a href="#" onclick="openSection(event,'request')">Request</a>
        <a href="#" onclick="openSection(event,'documents')">Documents</a>
        <a href="#" onclick="openSection(event,'events')">Events</a>
        <a href="#" onclick="openSection(event,'gallery')">Gallery</a>
        <a href="#" onclick="openSection(event,'contacts')">Contacts</a>
        <a href="#" onclick="openSection(event,'settings')">Settings</a>
        <a href="#" onclick="openSection(event,'login')">Admin Login</a>
    </div>
</div>

<div class="main">
    <div class="header">
        <div class="menu-btn" onclick="toggleMenu()">☰ MENU</div>
    </div>

    <div id="contentArea">
        <div id="dashboard" class="section active">
            <div class="title">
                <p>Welcome to</p>
                <h1>Pontevedra Municipality</h1>
            </div>

            <div class="card">
                <div class="form-group">
                    <label>Destination</label>
                    <select id="destinationSelect">
                        <option>Select destination</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Type</label>
                    <div class="row">
                        <select id="typeSelect" onchange="updateSearch()">
                            <option value="">Select Type</option>
                            <option value="barangay">Barangay</option>
                            <option value="resort">Resort</option>
                            <option value="heritage">Heritage</option>
                            <option value="tourist">Tourist Spot</option>
                            <option value="cafe">Cafe</option>
                        </select>

                        <select id="searchSelect">
                            <option>Select location</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="search-box">
                <input type="text" id="searchInput" placeholder="Search place...">
                <ul id="suggestions"></ul>
            </div>

            <div id="map" style="height: 400px; margin-top: 20px;"></div>
        </div>

        <div id="home" class="section">
            <h2>🏠 Home</h2>
            <div class="card-grid">
                <div class="card-box">
                    <h3>🌍 Explore Places</h3>
                    <p>Discover tourist spots, resorts, and heritage sites.</p>
                </div>
                <div class="card-box">
                    <h3>📢 Latest News</h3>
                    <p>Stay updated with announcements and events.</p>
                </div>
                <div class="card-box">
                    <h3>🗺 Map Access</h3>
                    <p>Use the interactive map to navigate locations.</p>
                </div>
            </div>
        </div>

        <div id="announcements" class="section">
            <h2>📢 Announcements</h2>
            <div class="list-item">
                <h4>📌 Barangay Meeting</h4>
                <p>April 25 at Municipal Hall</p>
            </div>
            <div class="list-item">
                <h4>🎉 Fiesta Celebration</h4>
                <p>April 30, 2026</p>
            </div>
        </div>

        <div id="services" class="section">
            <h2>⚙️ Services</h2>
            <div class="card-grid">
                <div class="card-box">📄 Permit Application</div>
                <div class="card-box">🧾 Business Registration</div>
                <div class="card-box">🏥 Health Services</div>
                <div class="card-box">🚓 Emergency Assistance</div>
            </div>
        </div>

        <div id="reports" class="section">
            <h2>📊 Reports</h2>
            <table class="table">
                <tr>
                    <th>Report</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>Tourism Report</td>
                    <td>April 2026</td>
                    <td>✔ Completed</td>
                </tr>
                <tr>
                    <td>Barangay Report</td>
                    <td>March 2026</td>
                    <td>⏳ Pending</td>
                </tr>
            </table>
        </div>

        <div id="request" class="section">
            <h2>📩 Request</h2>
            <div class="card">
                <form action="request.php" method="POST">
                    <input type="text" id="name" name="name" placeholder="Your Name" required>
                    <input type="text" id="requestType" name="request" placeholder="Request Type" required>
                    <textarea id="requestDetails" name="details" placeholder="Details"></textarea>
                    <button type="submit">Submit Request</button>
                </form>
            </div>
        </div>

        <div id="documents" class="section">
            <h2>📂 Documents</h2>
            <div class="list-item">📄 Barangay Clearance</div>
            <div class="list-item">📄 Business Permit</div>
            <div class="list-item">📄 Residency Certificate</div>
        </div>

        <div id="events" class="section">
            <h2>📅 Events</h2>
            <div class="list-item">
                <h4>🎉 Fiesta</h4>
                <p>April 30, 2026</p>
            </div>
            <div class="list-item">
                <h4>🏃 Fun Run</h4>
                <p>May 10, 2026</p>
            </div>
        </div>

        <div id="gallery" class="section">
            <h2>🖼 Gallery</h2>
            <div class="gallery-grid">
                <img src="https://via.placeholder.com/150" alt="Gallery image 1">
                <img src="https://via.placeholder.com/150" alt="Gallery image 2">
                <img src="https://via.placeholder.com/150" alt="Gallery image 3">
            </div>
        </div>

        <div id="contacts" class="section">
            <h2>☎️ Contacts</h2>
            <p>📍 Pontevedra Municipality</p>
            <p>📞 0912-345-6789</p>
            <p>📧 pontevedra@email.com</p>
        </div>

        <div id="settings" class="section">
            <h2>⚙️ Settings</h2>
            <div class="card">
                <label>Default Database</label>
                <input type="text" value="smart_heritage" readonly>
                <label>XAMPP MySQL Host</label>
                <input type="text" value="localhost" readonly>
                <label>XAMPP MySQL User</label>
                <input type="text" value="root" readonly>
            </div>
        </div>

        <div id="login" class="section">
            <h2>🔐 Admin Login</h2>
            <div class="card">
                <form action="admin_dash/login.php" method="POST">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
               
            </div>
        </div>
    </div>

    <div id="details" class="section">
        <h2>📍 Details</h2>
        <div class="card details-card">
            <h3 id="detailTitle"></h3>
            <img id="detailImage" class="details-img" alt="Location image">
            <div class="details-grid">
                <div class="details-item">
                    <strong>📝 Description:</strong><br>
                    <span id="detailDescription"></span>
                </div>

                <div class="details-item">
                    <div class="clickable" onclick="toggleHistory()">
                        📜 History <span id="arrow">⬇</span>
                    </div>
                    <div id="historyContent" class="hidden">
                        <span id="detailHistory"></span>
                    </div>
                </div>

                <div id="extraDetails" style="display:none; grid-column: span 2;">
                    <div class="details-item"><strong>📞 Contact:</strong><br><span id="detailContact"></span></div>
                    <div class="details-item"><strong>📧 Email:</strong><br><span id="detailEmail"></span></div>
                    <div class="details-item"><strong>👍 Facebook:</strong><br><span id="detailFB"></span></div>
                    <div class="details-item"><strong>🌐 Website:</strong><br><span id="detailWebsite"></span></div>
                    <div class="details-item"><strong>💰 Rate:</strong><br><span id="detailRate"></span></div>
                    <div class="details-item"><strong>🏠 Cottage:</strong><br><span id="detailCottage"></span></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="script.js"></script>
</body>
</html>