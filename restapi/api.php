<?php
header("Content-Type: application/json");

/*added below headers only for local testing purpose */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: PUT, POST, GET, DELETE, PATCH, OPTIONS");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        addUser($_GET);
        break;
    case 'POST':
        addUser($input);
        break;
    default:
        echo json_encode(['message' => 'Invalid request method']);
        break;
}

function addUser($input)
{
    $response = [];
    $response['email'] = $input['email'];
    $response['user_name'] = str_split($input['last_name'], 3)[0] . str_split($input['first_name'], 1)[0] . substr($input['email'], strrpos($input['email'], '@'));
    echo json_encode(['success' => '1', 'message' => 'User created successfully', 'data' => $response]);
}
