<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

function msg($status, $message, $type, $extra = [])
{
    return array_merge([
        'status' => $status,
        'message' => $message,
        'type' => $type
    ], $extra);
}

$returnData = [];

if (isset($_POST['email'])) {
    $to = "30472@ma-web.nl";
    $subject = "Email from portfolio: " . $_POST['firstname'] . ", Question: " . $_POST['q_type'];
    $message = $_POST['message'] . "\r\n\r\n" . "Sender: " . $_POST['name'] . $_POST['lastname'] . "\r\n" . "Email: " . $_POST['email'] . "\r\n" . "Phone: " . $_POST['phone'];
    $headers = "From: 30472@ma-web.nl";

    if (mail($to, $subject, $message, $headers)) {
        $mail_view = [
            'receiver' => $to,
            'subject' => $subject,
            'message' => $message,
            'headers' => $headers,
        ];
        $returnData = msg(200, 'E-mail successfully sent!', 'Succes', ['email' => $mail_view]);
    } else {
        $returnData = msg(500, 'Unable to send email', 'Error');
    }
}

echo json_encode($returnData);
