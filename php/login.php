<?php
	require_once("status.php");
	
	function auth($login, $passwd)
	{
		$filename = "../private/passwd";
		if (!file_exists($filename) || !($arr = unserialize(file_get_contents($filename))))
			return false;
		return (array_key_exists($login, $arr) && $arr[$login] === hash("whirlpool", $passwd));
	}

	session_start();
	if (isset($_POST["login"], $_POST["passwd"]) && !auth($_POST["login"], $_POST["passwd"]))
	{
		$_SESSION["user"] = $_POST["login"];
		return_status();
	}
	else
	{
		$_SESSION["user"] = NULL;
		return_status(1, "Incorrect login / password.");
	}
?>