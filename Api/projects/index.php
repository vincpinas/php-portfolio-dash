<?php 
    if (strpos($_SERVER['HTTP_HOST'], "ma-cloud.nl")) {
        include('db.live.php');
    } else {
        include('db.local.php');
    }
    include('helpers.php');
?>

<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");