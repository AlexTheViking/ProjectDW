<?php
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name . '.class.php'; });
	session_start();
	$game = new Game($_SESSION["user"], $_POST["maxPlayers"]);
	$dir = "../private/games/".$game->getId();
	mkdir($dir, 0777, true);
	$filename = $dir."/state";
	$f = fopen($filename, "c+b");
	#flock($f, LOCK_EX);
	file_put_contents($filename, serialize($game));
	#flock($f, LOCK_UN);
	echo array("status" => 0, "id" => $game->getId());
?>