<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
try
{
	if (!isset($_POST['login'], $_POST['passwd']) || $_POST['login'] === '' || $_POST['passwd'] === '')
		throw new Exception('Invalid login / password.');
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare('SELECT login FROM accounts where login = ?');
	$stmt->execute([$_POST['login']]);
	if ($stmt->fetch())
		throw new Exception('Account "' . $_POST['login'] . '" already exists.');
	$stmt = $conn->prepare('INSERT INTO accounts (login, password) VALUES (?, ?)');
	$stmt->execute([$_POST['login'], hash('whirlpool', $_POST['passwd'])]);
	echo json_encode(array('status' => 0, 'message' => 'Account "' . $_POST['login'] . '" successfully created.'));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
$conn = null;
?>