<?php
	define("ACCOUNT_OCCUPIED", "Account already exists.\n");
	if ($_POST["login"] === NULL && $_POST["login"] === "" && $_POST["passwd"] === NULL && $_POST["passwd"] === "" && $_POST["submit"] !== "OK")
	{
		echo "ERROR\n";
		exit;
	}
	$dir = "../private";
	$filename = $dir."/passwd";
	if (!file_exists($dir))
		mkdir($dir);
	if (file_exists($filename) && ($arr = file_get_contents($filename)))
	{
		$arr = unserialize($arr);
		if (array_key_exists($_POST["login"], $arr))
			{
				echo ACCOUNT_OCCUPIED;
				exit;
			}
	}
	else
		$arr = array();
	$arr[$_POST["login"]] = hash("whirlpool", $_POST["passwd"]);
	echo (file_put_contents($filename, serialize($arr)) ? "OK\n" : "ERROR\n");
?>