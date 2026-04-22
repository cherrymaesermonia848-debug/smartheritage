-- Smart Heritage XAMPP database setup
CREATE DATABASE IF NOT EXISTS `smart_heritage` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `smart_heritage`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `requests` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `request_type` VARCHAR(150) NOT NULL,
  `details` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `locations` (`type`, `name`, `barangay`, `lat`, `lng`, `description`, `history`, `contact`, `email`, `fb`, `website`, `rate`, `cottage`, `image`) VALUES
('resort', 'Paradise Resort', 'Poblacion', 10.3746000, 122.8671000, 'Relaxing beach resort in Pontevedra.', 'Established in 2010.', '09123456789', 'resort@email.com', 'facebook.com/resort', 'https://www.resort.com', '₱500 entrance', '₱1000 cottage', 'https://via.placeholder.com/400'),
('heritage', 'Old Church', 'Town Center', 10.3760000, 122.8650000, 'Historic church in the municipality center.', 'One of the oldest landmarks in the area.', NULL, NULL, NULL, NULL, NULL, NULL, 'https://via.placeholder.com/400'),
('tourist', 'River View Park', 'Rizal', 10.3705000, 122.8720000, 'Scenic riverside destination.', 'Developed as a local tourism area.', NULL, NULL, NULL, NULL, NULL, NULL, 'https://via.placeholder.com/400')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `admin` (`username`, `password`) VALUES ('admin', 'admin123')
ON DUPLICATE KEY UPDATE `username` = VALUES(`username`);