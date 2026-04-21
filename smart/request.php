
<?php

include("./db.php");

if($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name = $_POST["name"];
    $request = $_POST["request"];
    $details = $_POST["details"];

    $sql = "INSERT INTO request(name, request, details) VALUES('$name', '$request', '$details')";

    if(mysqli_query($conn, $sql)) {
        echo '<script>alert("Submitted Successfully"); window.history.back();</script>';
        exit;
    } else {
        echo "Error: " . mysqli_error($conn);
        exit;
    }


} else {

    echo "Access Denied";

}


?>