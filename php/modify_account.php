<?php
	session_start();
	$filename = "../private/passwd";
	if ($_SESSION["user"] === NULL || $_POST["oldpw"] === NULL && $_POST["oldpw"] === "" || $_POST["newpw"] === NULL && $_POST["newpw"] === ""
	|| $_POST["submit"] !== "OK" || !($arr = unserialize(file_get_contents($filename))) || !array_key_exists($_SESSION["user"], $arr) ||
	$arr[$_SESSION["user"]] !== hash("whirlpool", $_POST["oldpw"]))
	{
		echo "ERROR\n";
		exit;
	}
	$arr[$_SESSION["user"]] = hash("whirlpool", $_POST["newpw"]);
	echo (file_put_contents($filename, serialize($arr)) ? "OK\n" : "ERROR\n");
?>