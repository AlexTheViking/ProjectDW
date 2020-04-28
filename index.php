<?php
	$content='';

	$content.=file_get_contents('html/header.html');
	$content.=file_get_contents('html/map.html');
	$content.=file_get_contents('html/main_part1.html');
	$content.=file_get_contents('html/main_part2.html');
	$content.=file_get_contents('html/chat_dlgs.html');
	$content.=file_get_contents('html/scripts.html');

	echo $content;
?>


