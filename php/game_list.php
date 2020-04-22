<?php
	spl_autoload_register(function ($class_name) { include 'classes/'.$class_name . '.class.php'; });
	session_start();
	$dir = "../private/games";
	if (!file_exists($dir))
		mkdir($dir, 0777, true);
	$arr = array();
	foreach (array_diff(scandir($dir), array('..', '.')) as $val)
	{
		if (!is_dir($dir.'/'.$val))
			continue;
		$game = unserialize(file_get_contents($dir.'/'.$val.'/state'));
		if ($game->getStatus() === "open")
			$arr[] = array("id" => $game->getId(), "maxPlayers" => $_game->getMaxPlayers(), "players" => $game->getPlayerList());
	}
	echo json_encode($arr);
?>