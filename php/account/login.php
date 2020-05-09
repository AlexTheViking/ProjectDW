<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
try
{
	session_start();
	if (!isset($_POST['login'], $_POST['passwd']) || $_POST['login'] === 'System')
		throw new Exception("Invalid login / password.");
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $conn->prepare('SELECT password FROM accounts where login = ?');
	$stmt->execute([$_POST['login']]);
	if (!($passwd = $stmt->fetchColumn()))
		throw new Exception("Account {$_POST['login']} not registered.");
	else if ($passwd !== hash('whirlpool', $_POST['passwd']))
		throw new Exception('Incorrect password.');
	$_SESSION['user'] = $_POST['login'];
	echo json_encode(array('status' => 0, 'message' => 'Logged in as "' . $_POST['login'] . '".'));
}
catch(Exception $e)
{
	unset($_SESSION['user']);
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
$conn = null;
?>