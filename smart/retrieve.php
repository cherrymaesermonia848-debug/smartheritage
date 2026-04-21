
<?php

include("db.php");

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER["REQUEST_METHOD"] ?? "";
if ($method !== "GET" && $method !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

$table = "locations";
$sql = "SELECT id, type, name, lat, lng, description, history, contact, email, fb, website, rate, cottage, image FROM $table";

$result = mysqli_query($conn, $sql);
if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$rows = [];
while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
}

echo json_encode($rows);


?>