<?php
	require_once("status.php");
	if (!isset($_POST["login"], $_POST["passwd"]) || $_POST["login"] === "" || $_POST["passwd"] === "")
	{
		return_status(1, "Invalid login / password.");
		exit;
	}
	$dir = "../private";
	$filename = $dir."/passwd";
	if (!file_exists($dir))
		mkdir($dir);
	if ($f = fopen($filename, "c+b"))
	{
		flock($f, LOCK_SH);
		$arr = unserialize(file_get_contents($filename));
		if (array_key_exists($_POST["login"], $arr))
			return_status(1, "Account \"".$_POST["login"]."\" already exists.");
		else
		{
			$arr[$_POST["login"]] = hash("whirlpool", $_POST["passwd"]);
			flock($f, LOCK_EX);
			file_put_contents($filename, serialize($arr));
			return_status(0, "Account \"".$_POST["login"]."\" successfully created.");
		}
		flock($f, LOCK_UN);
		fclose($f);
	}
	else
		return_status(1, "Server error: can't read data.");;
?>