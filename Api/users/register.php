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
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);
    $start_career = trim($_POST['start_career']);
    $completed_projects = trim($_POST['completed_projects']);
    $satisfied_customers = trim($_POST['satisfied_customers']);


    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(422, "Invalid Email Address!: " . $email, 'Warning');
    } else if (strlen($password) < 8) {
        $returnData = msg(423, 'Your password must be at least 8 characters long!', 'Warning');
    } else {
        try {
            $check_count = "SELECT * FROM `users`";
            $check_count_stmt = $conn->prepare($check_count);
            $check_count_stmt->execute();

            if ($check_count_stmt->rowCount()) {
                $returnData = msg(425, 'Looks like there already is an existing account, please try logging in instead.', 'Error');
            } else {
                $insert_query = "INSERT INTO `users`
                (`name`, `email`, `password`, `phone`, `address`, `start_career`, `completed_projects`, `satisfied_customers`) 
                VALUES (:name, :email, :password, :phone, :address, :start_career, :completed_projects, :satisfied_customers)";

                $insert_stmt = $conn->prepare($insert_query);

                $insert_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email, PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT), PDO::PARAM_STR);
                $insert_stmt->bindValue(':phone', $phone, PDO::PARAM_STR);
                $insert_stmt->bindValue(':address', $address, PDO::PARAM_STR);
                $insert_stmt->bindValue(':start_career', $start_career, PDO::PARAM_STR);
                $insert_stmt->bindValue(':completed_projects', $completed_projects, PDO::PARAM_INT);
                $insert_stmt->bindValue(':satisfied_customers', $satisfied_customers, PDO::PARAM_INT);

                $insert_stmt->execute();

                $returnData = msg(201, 'You have successfully registered.', 'Success');
            }
        } catch (PDOException $e) {
            $returnData = msg(500, $e->getMessage(), 'Error');
        }
    }
}

echo json_encode($returnData);
