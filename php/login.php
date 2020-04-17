<?php
	function auth($login, $passwd)
	{
		$filename = "../private/passwd";
		if (!file_exists($filename) || !($arr = unserialize(file_get_contents($filename))))
			return false;
		return (array_key_exists($login, $arr) && $arr[$login] === hash("whirlpool", $passwd));
	}

	session_start();
	if ($_POST["login"] === NULL || $_POST["login"] === "" || $_POST["passwd"] === NULL || $_POST["passwd"] === "" || !auth($_POST["login"], $_POST["passwd"]))
	{
		$_SESSION["user"] = NULL;
		echo "ERROR\n";
	}
	else
	{
		$_SESSION["user"] = $_POST["login"];
		echo "OK\n";
	}
?>