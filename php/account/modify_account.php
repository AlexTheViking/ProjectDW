<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
try
{
	session_start();
	if (!isset($_SESSION['user'], $_POST['oldpw'], $_POST['newpw']) || $_POST['oldpw'] === '' || $_POST['newpw'] === '')
		throw new Exception('Invalid password.');
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare('SELECT password FROM accounts where login = ?');
	$stmt->execute([$_SESSION['user']]);
	if ($stmt->fetchColumn() !== hash('whirlpool', $_POST['oldpw']))
		throw new Exception('Incorrect password.');
	$stmt = $conn->prepare('UPDATE accounts SET password = ? WHERE name = ?');
	$stmt->execute([hash('whirlpool', $_POST['newpw']), $_SESSION['user']]);
	echo json_encode(array('status' => 0, 'message' => "Password successfully changed."));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
$conn = null;
?>