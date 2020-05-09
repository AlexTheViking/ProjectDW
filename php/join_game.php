<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
function join_game($user, $id)
{
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->prepare('UPDATE games SET num_players = IF(status = "open" OR status = "ready", num_players + 1, num_players) WHERE id = ?')->execute([$id]);
	$conn->prepare('UPDATE games SET status = IF(num_players < 4, "ready", "closed") WHERE id = ?')->execute([$id]);
	$conn->prepare('UPDATE accounts SET id_game = IF(SELECT COUNT(login) FROM accounts WHERE game_id = :id < SELECT num_players FROM games WHERE id = :id, :id, id_game) WHERE id = :id')->execute(['id' => $id]);
	$conn->exec('INSERT INTO chat_' . $id . ' (author, message) VALUES ("System", "' . $user . ' присоединяется к игре.")');
	$stmt = $conn->prepare('SELECT game_id FROM accounts WHERE login = ?');
	$stmt->execute([$user]);
	return $stmt->fetchColumn() == $id;
}

try
{
	session_start();
	if (!isset($_SESSION['user']))
		throw new Exception('User not logged in.');
	if (isset($_SESSION['id']))
		throw new Exception($_SESSION['user'] . ' is already playing (game ' . $_SESSION['id'] . '.');
	if (!isset($_POST['id']))
		throw new Exception('Game not selected.');
	if (!join_game($_SESSION['user'], $_POST['id']))
		throw new Exception('Game unavailable.');
	$_SESSION["id"] = $_POST['id'];
	$_SESSION["gamestate"] = 0;
	$_SESSION["chatstate"] = 0;
	echo json_encode(array('status' => 0, 'message' => "Successfully joined the game."));
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>