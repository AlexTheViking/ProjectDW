<?php
	session_start();
	if ($_SESSION["user"] === NULL)
	{
		echo "ERROR\n";
		exit;
	}
	if ($_POST["msg"] !== NULL && $_POST["msg"] !== "")
	{
		date_default_timezone_set("Europe/Moscow");
		$filename = "../private/chat";
		if ($f = fopen($filename, "c+"))
		{
			flock($f, LOCK_SH);
			$arr = unserialize(file_get_contents($filename));
			$entry["login"] = $_SESSION["user"];
			$entry["time"] = time();
			$entry["msg"] = $_POST["msg"];
			$arr[] = $entry;
			flock($f, LOCK_EX);
			file_put_contents($filename, serialize($arr));
			flock($f, LOCK_UN);
			fclose($f);
		}
	}
?>