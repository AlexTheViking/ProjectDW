<?php
	function return_status($status = 0,$message = "OK")
	{
		echo json_encode(array("status" => $status, "message" => $message));
	}
?>