<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
try
{
	session_start();
	if (!isset($_SESSION['user']))
		throw new Exception('User not logged in.');
	if (!isset($_SESSION['id']))
		throw new Exception($_SESSION['user'] . ' is not playing any game.');
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$stmt = $conn->prepare('SELECT * FROM chat_' . $_SESSION['id'] . ' WHERE id > ?');
	$stmt->exec([$_SESSION['chatstate']]);
	$arr = $stmt->fetchAll();
	if ($arr)
		$_SESSION['chatstate'] = $arr.end()['id'];
	echo json_encode($arr);
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>