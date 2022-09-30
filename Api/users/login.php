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
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(422, "Invalid Email Address!: ".$email, 'Error');
    } elseif (strlen($password) < 8) {
        $returnData = msg(422, 'Your password must be at least 8 characters long!', 'Warning');
    }
    // If no errors caused by the user occur
    else {
        try {
            $fetch_user_by_email = "SELECT * FROM `users` WHERE `email`=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $query_stmt->execute();

            if ($query_stmt->rowCount()) {
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if ($check_password) {
                    unset($row['password']);
                    $returnData = [
                        'status' => 200,
                        'message' => 'User record successfully fetched.',
                        'type' => 'Success',
                        'user' => $row,
                    ];
                } else {
                    $returnData = msg(422, "Invalid Password!: ".$password, 'Warning');
                }
            } else {
                $returnData = msg(422, "Could not find record with email: ".$email, 'Error');
            }
        } catch (PDOException $e) {
            $returnData = msg(500, $e->getMessage(), 'Error');
        }
    }
};

echo json_encode($returnData);
