<?php
	require_once("status.php");
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name.'.class.php'; });
	session_start();
	if (isset($_SESSION["id"]))
	{
		$arr = array("chatstate" => "uptodate", "gamestate" => "uptodate");
		$filename = "../private/games/".$_SESSION["id"]."/state";
		$f = fopen($filename, "c+b");
		flock($f, LOCK_SH);
		$game = unserialize(file_get_contents($filename));
		if ($game->getChatCounter() > $_SESSION["chatstate"])
		{
			$arr["chatstate"] = "updating";
			$arr["chat"] = $game->getChat($_SESSION["chatstate"]);
			$_SESSION["chatstate"] = $game->getChatCounter();
		}
		if ($game->getCounter() > $_SESSION["gamestate"])
		{
			$arr["gamestate"] = "updating";
			//$arr["game"] = $game->getState($_SESSION["user"]);
			$_SESSION["gamestate"] = $game->getCounter();
		}
		flock($f, LOCK_UN);
		echo json_encode($arr);
	}
	else
		return_status(1, "Game state not received.")
?>