<?php
include($_SERVER['DOCUMENT_ROOT'] . '/php/constants.php');
function game_list()
{
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	$arr = $conn->query('SELECT id, num_players FROM games WHERE status = "open" OR status = "ready"')->fetchAll();
	return $arr;
}

try
{
	session_start();
	echo json_encode(game_list());	
}
catch(Exception $e)
{	
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
?>