<?php
	require_once("status.php");
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name.'.class.php'; });
	session_start();
	if (isset($_SESSION["id"]))
	{
		$filename = "../private/games/".$_SESSION["id"]."/state";
		$f = fopen($filename, "c+b");
		flock($f, LOCK_EX);
		$game = unserialize(file_get_contents($filename));
		if ($game->start($_SESSION["user"]))
		{
			file_put_contents($filename, serialize($game));
			return_status();
		}
		else
			return_status(1, "Can't start the game.");
		flock($f, LOCK_UN);
	}
	else
		return_status(1, "Can't identify the game.");
?>