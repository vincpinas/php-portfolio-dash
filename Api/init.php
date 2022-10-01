<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// Classes
require __DIR__ . '/database.php';

function msg($status, $message, $type, $extra = [])
{
    return array_merge([
        'status' => $status,
        'message' => $message,
        'type' => $type
    ], $extra);
}

$db_connection = new Database();
$conn = $db_connection->__dbConnection();

$returnData = [];

try {
    $query = "SHOW TABLES FROM `port.dash` WHERE `Tables_in_port.dash` LIKE '%projects%' OR `Tables_in_port.dash` LIKE '%users%'";

    $sth = $conn->prepare($query);
    $sth->execute();

    if($sth->rowCount() > 0) {
      $returnData = msg(200, "Successfully got '". $sth->rowCount() ."' table(s)", 'Success');
    } else {
      $returnData = msg(404, "Unable to find table(s), importing fresh tables..", 'Error');

      $sql = file_get_contents('port_dash.sql');
      $sth = $conn->prepare($sql);
      $sth->execute();
    }
} catch (PDOException $e) {
    $returnData = msg(500, $e->getMessage(), 'Error');
}

echo json_encode($returnData);
