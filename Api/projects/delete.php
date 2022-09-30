<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// Classes
require __DIR__ . '/../database.php';

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

if ($_SERVER["REQUEST_METHOD"] != "DELETE") {
  $returnData = msg(404, 'This endpoint requires a delete request method.', 'Error');
} else {
  if (isset($_GET['id'])) {
    try {
      $delete_query = "DELETE FROM `projects` WHERE id= '". $_GET['id'] ."'";
      $delete_stmt = $conn->prepare($delete_query);
      $delete_stmt->execute();

      $returnData = msg(201, 'Record successfully removed', 'Success');
    } catch (PDOException $e) {
      $returnData = msg(500, $e->getMessage(), 'Error');
    }
  } else {
    $returnData = msg(400, 'Please provide a record id when making a request', 'Error');
  }
}

echo json_encode($returnData);
