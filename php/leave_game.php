<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
function leave_game($user, $id)
{
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->prepare('UPDATE games SET num_players = num_players - 1 WHERE id = ?')->execute([$id]);
	$conn->prepare('UPDATE games SET status = IF(num_players > 1, "ready", "open") WHERE id = ? AND status = "closed" OR status = "ready"')->execute([$id]);
	$conn->prepare('UPDATE accounts SET id_game = NULL WHERE login = ?')->execute([$user]);
	$conn->exec('INSERT INTO chat_' . $id . ' (author, message) VALUES ("System", "' . $user . ' покидает игру.")');
	$stmt = $conn->prepare('SELECT num_players FROM games WHERE id = ?');
	$stmt->execute([$id]);
	if ($stmt->fetchColumn() == 0)
	{
		$conn->prepare('DELETE FROM games WHERE id = ?')->execute([$id]);
		$conn->exec('DROP TABLE chat_' . $id);
	}
}

try
{
	session_start();
	if (!isset($_SESSION['user']))
		throw new Exception('User not logged in.');
	if (!isset($_SESSION['id']))
		throw new Exception($_SESSION['user'] . ' is not playing any game.');
	leave_game($_SESSION['user'], $_SESSION['id']);
	unset($_SESSION["id"], $_SESSION["gamestate"], $_SESSION["chatstate"]);
	echo json_encode(array('status' => 0, 'message' => "OK."));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>