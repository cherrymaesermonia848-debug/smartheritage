<?php
mysqli_report(MYSQLI_REPORT_OFF);

$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_USER = getenv('DB_USER') ?: 'cordystackx';
$DB_PASSWORD = getenv('DB_PASSWORD') ?: 'uvp65200';
$DB_NAME = getenv('DB_NAME') ?: 'smart_heritage';

$conn = @new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

$conn->set_charset('utf8mb4');

if (!$conn->query("CREATE DATABASE IF NOT EXISTS `{$DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")) {
    die('Database creation failed: ' . $conn->error);
}

if (!$conn->select_db($DB_NAME)) {
    die('Database selection failed: ' . $conn->error);
}

function db_exec_or_die(mysqli $conn, string $sql): void
{
    if (!$conn->query($sql)) {
        die('Database setup error: ' . $conn->error);
    }
}

db_exec_or_die($conn, "
    CREATE TABLE IF NOT EXISTS `locations` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `type` VARCHAR(100) NOT NULL,
        `name` VARCHAR(150) NOT NULL,
        `barangay` VARCHAR(150) DEFAULT NULL,
        `lat` DECIMAL(10,7) NOT NULL,
        `lng` DECIMAL(10,7) NOT NULL,
        `description` TEXT DEFAULT NULL,
        `history` TEXT DEFAULT NULL,
        `contact` VARCHAR(100) DEFAULT NULL,
        `email` VARCHAR(150) DEFAULT NULL,
        `fb` VARCHAR(255) DEFAULT NULL,
        `website` VARCHAR(255) DEFAULT NULL,
        `rate` VARCHAR(100) DEFAULT NULL,
        `cottage` VARCHAR(100) DEFAULT NULL,
        `image` VARCHAR(255) DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

db_exec_or_die($conn, "
    CREATE TABLE IF NOT EXISTS `requests` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(150) NOT NULL,
        `request_type` VARCHAR(150) NOT NULL,
        `details` TEXT DEFAULT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

db_exec_or_die($conn, "
    CREATE TABLE IF NOT EXISTS `admin` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `username` VARCHAR(100) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uniq_admin_username` (`username`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
");

$adminCheck = $conn->query("SELECT `id` FROM `admin` WHERE `username` = 'admin' LIMIT 1");
if ($adminCheck && $adminCheck->num_rows === 0) {
    $defaultPasswordHash = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO `admin` (`username`, `password`) VALUES (?, ?)');
    $username = 'admin';
    $stmt->bind_param('ss', $username, $defaultPasswordHash);
    $stmt->execute();
    $stmt->close();
}

$locationCountResult = $conn->query('SELECT COUNT(*) AS total FROM `locations`');
$locationCount = $locationCountResult ? (int) ($locationCountResult->fetch_assoc()['total'] ?? 0) : 0;

if ($locationCount === 0) {
    $seedSql = "
        INSERT INTO `locations`
            (`type`, `name`, `barangay`, `lat`, `lng`, `description`, `history`, `contact`, `email`, `fb`, `website`, `rate`, `cottage`, `image`)
        VALUES
            ('resort', 'Paradise Resort', 'Poblacion', 10.3746000, 122.8671000, 'Relaxing beach resort in Pontevedra.', 'Established in 2010.', '09123456789', 'resort@email.com', 'facebook.com/resort', 'https://www.resort.com', '₱500 entrance', '₱1000 cottage', 'https://via.placeholder.com/400'),
            ('heritage', 'Old Church', 'Town Center', 10.3760000, 122.8650000, 'Historic church in the municipality center.', 'One of the oldest landmarks in the area.', NULL, NULL, NULL, NULL, NULL, NULL, 'https://via.placeholder.com/400'),
            ('tourist', 'River View Park', 'Rizal', 10.3705000, 122.8720000, 'Scenic riverside destination.', 'Developed as a local tourism area.', NULL, NULL, NULL, NULL, NULL, NULL, 'https://via.placeholder.com/400')
    ";
    db_exec_or_die($conn, $seedSql);
}
?>