<?php
	require_once("status.php");
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name.'.class.php'; });
	session_start();
	if (isset($_SESSION["user"]) && isset($_SESSION["id"]) && isset($_POST["message"]))
	{
		$filename = "../private/games/".$_SESSION["id"]."/state";
		$f = fopen($filename, "c+b");
		flock($f, LOCK_SH);
		$game = unserialize(file_get_contents($filename));
		$game->getChat()->speak($_SESSION["user"], $_POST["message"]);
		flock($f, LOCK_UN);
		return_status();
	}
	else
		return_status(1, "Can't identify the game.");
?>