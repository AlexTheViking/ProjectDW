<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
function new_game($user)
{
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->exec('INSERT INTO games () VALUES ()');
	$id = $conn->query('SELECT LAST_INSERT_ID()')->fetchColumn();
	$conn->prepare('UPDATE accounts SET game_id = ? WHERE login = ?')->execute([$id, $user]);
	$conn->exec('CREATE TABLE chat_' . $id . ' (id INT PRIMARY KEY AUTO_INCREMENT, 
		time TIMESTAMP DEFAULT NOW(),
		author VARCHAR(40) NOT NULL,
		message TINYTEXT NOT NULL)');
	$conn->exec('INSERT INTO chat_' . $id . ' (author, message) VALUES ("System", "' . $user . ' создает игру.")');
	return $id;
}

try
{
	session_start();
	if (!isset($_SESSION['user']))
		throw new Exception('User not logged in.');
	if (isset($_SESSION['id']))
		throw new Exception($_SESSION['user'] . ' is already playing (game ' . $_SESSION['id'] . '.');
	$_SESSION["id"] = new_game($_SESSION["user"]);
	$_SESSION["gamestate"] = 0;
	$_SESSION["chatstate"] = 0;
	echo json_encode(array('status' => 0, 'message' => "Game successfully created."));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>