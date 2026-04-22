<?php
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Access Denied');
}

$name = trim($_POST['name'] ?? '');
$requestType = trim($_POST['request'] ?? $_POST['request_type'] ?? '');
$details = trim($_POST['details'] ?? $_POST['requestDetails'] ?? '');

if ($name === '' || $requestType === '') {
    http_response_code(422);
    exit('Name and request type are required.');
}

$stmt = $conn->prepare('INSERT INTO `requests` (`name`, `request_type`, `details`) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $name, $requestType, $details);

if ($stmt->execute()) {
    echo '<script>alert("Submitted Successfully"); window.location.href = "dash.php";</script>';
    exit;
}

http_response_code(500);
echo 'Error: ' . $stmt->error;
$stmt->close();
?>