<?php
	require_once("status.php");
	session_start();
	$filename = "../private/passwd";
	if (!isset($_SESSION["user"], $_POST["oldpw"], $_POST["newpw"]) || $_POST["oldpw"] === "" || $_POST["newpw"] === "")
		return_status(1, "Invalid password.");
	elseif ($f = fopen($filename, "c+b"))
	{
		flock($f, LOCK_SH);
		$arr = unserialize(file_get_contents($filename));
		if (!array_key_exists($_SESSION["user"], $arr) || $arr[$_SESSION["user"]] !== hash("whirlpool", $_POST["oldpw"]))
			return_status(1, "Incorrect login / password.");
		else
		{
			$arr[$_SESSION["user"]] = hash("whirlpool", $_POST["newpw"]);
			flock($f, LOCK_EX);
			file_put_contents($filename, serialize($arr));
			return_status(0, "Password successfully changed.");
		}
		flock($f, LOCK_UN);
		fclose($f);
	}
	else
		return_status(1, "Server error: can't read data.");
?>