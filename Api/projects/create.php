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

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  $returnData = msg(404, 'This endpoint requires a post request method.', 'Error');
} else {
  if (isset(
    $_POST['title'],
    $_POST['introduction'],
    $_POST['status'],
    $_POST['description'],
    $_POST['learned'],
    $_POST['links'],
    $_POST['skills'],
    $_POST['categories'],
  )) {
    $title = trim($_POST['title']);
    $introduction = trim($_POST['introduction']);
    $status = trim($_POST['status']);
    $img_src = trim($_POST['img_src']);
    $description = trim($_POST['description']);
    $learned = trim($_POST['learned']);
    $team = trim($_POST['team']);
    $links = trim($_POST['links']);
    $skills = trim($_POST['skills']);
    $categories = trim($_POST['categories']);
    $created_at = date("Y/m/d h:i:s");
    $updated_at = date("Y/m/d h:i:s");

    try {
      $insert_query = "INSERT INTO `projects` (`title`,`introduction`,`status`,`img_src`,`description`,`learned`,`team`,`links`,`skills`,`categories`,`created_at`,`updated_at`) 
      VALUES (:title,:introduction,:status,:img_src,:description,:learned,:team,:links,:skills,:categories,:created_at,:updated_at)";

      $insert_stmt = $conn->prepare($insert_query);

      $insert_stmt->bindValue(':title', $title, PDO::PARAM_STR);
      $insert_stmt->bindValue(':introduction', $introduction, PDO::PARAM_STR);
      $insert_stmt->bindValue(':status', $status, PDO::PARAM_STR);
      $insert_stmt->bindValue(':img_src', $img_src, PDO::PARAM_STR);
      $insert_stmt->bindValue(':description', $description, PDO::PARAM_STR);
      $insert_stmt->bindValue(':learned', $learned, PDO::PARAM_STR);
      $insert_stmt->bindValue(':team', $team, PDO::PARAM_STR);
      $insert_stmt->bindValue(':links', $links, PDO::PARAM_STR);
      $insert_stmt->bindValue(':skills', $skills, PDO::PARAM_STR);
      $insert_stmt->bindValue(':categories', $categories, PDO::PARAM_STR);
      $insert_stmt->bindValue(':created_at', $created_at, PDO::PARAM_STR);
      $insert_stmt->bindValue(':updated_at', $updated_at, PDO::PARAM_STR);

      $insert_stmt->execute();

      $returnData = msg(201, 'Successfully created record', 'Success');
    } catch (PDOException $e) {
      $returnData = msg(500, $e->getMessage(), 'Error');
    }
  } else {
    $returnData = msg(404, 'There are one or multiple variables missing.', 'Error');
  }
}

echo json_encode($returnData);
