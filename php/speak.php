<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
try
{
	session_start();
	if (!isset($_SESSION['user']))
		throw new Exception('User not logged in.');
	if (!isset($_SESSION['id']))
		throw new Exception($_SESSION['user'] . ' is not playing any game.');
	if (!isset($_POST['message']))
		throw new Exception("No message sent.");
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->prepare('INSERT INTO chat_' . $_SESSION['id'] . ' (author, message) VALUES (?, ?)');
	$stmt->exec([$_SESSION['user'], $_POST['message']]);
	echo json_encode(array('status' => 0, 'message' => "OK."));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>