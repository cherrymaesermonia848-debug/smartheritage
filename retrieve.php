<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=UTF-8');

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if (!in_array($method, ['GET', 'POST'], true)) {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$sql = 'SELECT id, type, name, barangay, lat, lng, description, history, contact, email, fb, website, rate, cottage, image FROM `locations` ORDER BY name ASC';
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
    exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
    $row['id'] = (int) $row['id'];
    $row['lat'] = (float) $row['lat'];
    $row['lng'] = (float) $row['lng'];
    $rows[] = $row;
}

echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>