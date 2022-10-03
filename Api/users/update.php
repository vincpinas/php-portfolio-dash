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

error_reporting(E_ALL & ~E_NOTICE);

$db_connection = new Database();
$conn = $db_connection->__dbConnection();

$returnData = [];

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $returnData = msg(404, 'This endpoint requires a post request method.', 'Error');
} else {

  $data = [
    'name' => trim($_POST['name']),
    'email' => trim($_POST['email']),
    'phone' => trim($_POST['phone']),
    'address' => trim($_POST['address']),
    'start_career' => trim($_POST['start_career']),
    'completed_projects' => trim($_POST['completed_projects']),
    'satisfied_customers' => trim($_POST['satisfied_customers']),
  ];

  try {
    function isValid($input)
    {
      return (!(empty($input) && $input == ''));
    }

    $updatePrefix = "UPDATE `users` SET ";
    $updateSuffix = "WHERE ID=" . 1;
    $conditions = '';

    foreach ($data as $key => $value) {
      if (isValid($value)) {
        if ($conditions != '') $conditions .= ', ';
        $conditions .= " $key= '" . $value . "'";
      }
    }

    if ($conditions != '') $update_query = $updatePrefix . $conditions . $updateSuffix;

    $update_stmt = $conn->prepare($update_query);
    $update_stmt->execute();

    $returnData = msg(201, 'Record successfully updated', 'Success');
  } catch (PDOException $e) {
    $returnData = msg(500, $e->getMessage(), 'Error');
  }
}

echo json_encode($returnData);
