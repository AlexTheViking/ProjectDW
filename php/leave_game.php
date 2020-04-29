<?php
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name.'.class.php'; });
	session_start();
	$dir = "../private/games/".$_POST["id"];
	$filename = $dir."/state";
	$f = fopen($filename, "c+b");
	flock($f, LOCK_EX);
	$game = unserialize(file_get_contents($filename));
	$game->delPlayer($_SESSION["user"]);
	if ($game->getNumPlayers() === 0)
	{
		foreach (array_diff(scandir($dir), array('.','..')) as $file)
			unlink($file);
		rmdir($dir);
	}
	else
		file_put_contents($filename, serialize($game));
	flock($f, LOCK_UN);
	unset($_SESSION["id"]);
	unset($_SESSION["gamestate"]);
	unset($_SESSION["chatstate"]);
?>