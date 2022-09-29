<?php
    ini_set('display_errors',1);
    // connection variables
    $host = "localhost";
    $username = "root";
    $password = "";
    $db = "port.dash";

    // mysqli connection
    $con = new mysqli($host, $username, $password, $db);
    $con->set_charset('utf8mb4');

    // custom error reporting
    if ($con->connect_error) {
        print "<style>* {padding: 0; margin: 0;} body {height:100vh; font-family:sans-serif; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align: center;}</style>";
        print "<p style='font-size:2em;'>Failed to connect to MySQL: " . mysqli_connect_error() . "</p>";
        exit;
    }
?>