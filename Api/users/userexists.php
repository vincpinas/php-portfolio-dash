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

try {
  $query = "SELECT * FROM `users`";
  $query_stmt = $conn->prepare($query);
  $query_stmt->execute();

  if ($query_stmt->rowCount()) {
    $returnData = [
      'status' => 200,
      'message' => 'User record successfully fetched.',
      'type' => 'Success',
      'exists' => true,
    ];
  } else {
    $returnData = msg(422, "Could find any records", 'Error', ['exists' => false]);
  }
} catch (PDOException $e) {
  $returnData = msg(500, $e->getMessage(), 'Error');
};

echo json_encode($returnData);
