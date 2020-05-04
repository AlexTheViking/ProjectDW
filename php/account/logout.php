<?php
	session_start();
	unset($_SESSION['user']);
	echo json_encode(array('status' => 0, 'message' => 'Log out.'));
?>