<?php
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name . '.class.php'; });
	session_start();
	$filename = "../private/games/".$_POST["id"]."/state";
	$f = fopen($filename, "c+b");
	#flock($f, LOCK_EX);
	$game = unserialize(file_get_contents($filename));
	$game->addPlayer($_SESSION["user"]);
	file_put_contents($filename, serialize($game));
	#flock($f, LOCK_UN);
?>