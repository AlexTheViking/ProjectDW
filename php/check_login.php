<?php
	session_start();
	if(!isset($_SESSION["user"])){echo 'false';exit();};
	echo $_SESSION["user"];
?>