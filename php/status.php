<?php
	function return_status(int $status = 0, string $message = "OK")
	{
		echo json_encode(array("status" => $status, "message" => $message));
	}
?>