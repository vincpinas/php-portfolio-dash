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
  if (isset($_GET['id'])) {
    $data = [
      'title' => trim($_POST['title']),
      'introduction' => trim($_POST['introduction']),
      'status' => trim($_POST['status']),
      'img_src' => trim($_POST['img_src']),
      'description' => trim($_POST['description']),
      'learned' => trim($_POST['learned']),
      'team' => trim($_POST['team']),
      'links' => trim($_POST['links']),
      'skills' => trim($_POST['skills']),
      'categories' => trim($_POST['categories']),
      'updated_at' => date("Y/m/d h:i:s"),
    ];

    try {
      function isValid($input)
      {
        return (!(empty($input) && $input == ''));
      }

      $updatePrefix = "UPDATE `projects` SET ";
      $updateSuffix = "WHERE ID=" . $_GET['id'];
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
  } else {
    $returnData = msg(400, 'Please provide a record id when making a request', 'Error');
  }
}

echo json_encode($returnData);
