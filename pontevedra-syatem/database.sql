CREATE DATABASE pontevedra_db;
USE pontevedra_db;

CREATE TABLE places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    lat DOUBLE,
    lng DOUBLE,
    description TEXT,
    history TEXT,
    image TEXT,
    contact VARCHAR(50),
    email VARCHAR(100),
    fb TEXT,
    website TEXT,
    rate VARCHAR(50),
    cottage VARCHAR(50)
);

INSERT INTO places (name, type, lat, lng, description, history, image)
VALUES
("Barangay I", "barangay", 10.3365, 122.915, "Town center", "Oldest barangay", "barangay_image/barangayI.jpg"),
("Paradise Resort", "resort", 10.34, 122.91, "Relaxing resort", "Established 2010", "https://via.placeholder.com/400");