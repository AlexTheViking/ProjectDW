<?php
	require_once("status.php");
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name . '.class.php'; });
	session_start();
	$game = new Game($_SESSION["user"]);
	$_SESSION["id"] = $game->getId();
	$_SESSION["gamestate"] = $game->getCounter();
	$_SESSION["chatstate"] = $game->getChatCounter();
	$dir = "../private/games/".$game->getId();
	mkdir($dir, 0777, true);
	$filename = $dir."/state";
	$f = fopen($filename, "c+b");
	flock($f, LOCK_EX);
	file_put_contents($filename, serialize($game));
	flock($f, LOCK_UN);
	return_status();
?>