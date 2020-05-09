<?php
include ('constants.php');

function read_tsv($filename)
{
	$arr = array();
	$f = fopen($filename, 'r');
	while ($line = fgets($f))
		$arr[] = explode("\t", trim($line));
	fclose($f);
	return $arr;
}

function load_districts($pdo)
{
	$filename = $_SERVER['DOCUMENT_ROOT'] ? $_SERVER['DOCUMENT_ROOT'] . '/resources/districts.tsv' : '../resources/districts.tsv';
	$pdo->exec('DROP TABLE IF EXISTS districts'); //for updates
	$sql = 'CREATE TABLE districts 
		(id TINYINT PRIMARY KEY AUTO_INCREMENT, 
		name VARCHAR(40) NOT NULL, 
		description TINYTEXT NOT NULL, 
		cost TINYINT NOT NULL, 
		neighbors TINYTEXT NOT NULL, 
		action TINYTEXT NOT NULL)';
	$pdo->exec($sql);
	$arr = read_tsv($filename);
	if (count($arr) !== NUM_DISTRICTS)
		throw new Exception('Invalid number of districts.');
	foreach ($arr as $item)
	{
		$sql = 'INSERT INTO districts (name, description, cost, neighbors, action) VALUES 
		("' . $item[0] . '", "' . $item[1] . '", ' . $item[2] . ', "' . $item[3] . '", "")';
		$pdo->exec($sql);
	}
	echo 'Districts loaded' . PHP_EOL;
}

try
{
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->exec('CREATE DATABASE IF NOT EXISTS ' . DB_NAME);
	$conn->exec('USE ' . DB_NAME);
	echo 'Database OK' . PHP_EOL;
	#$conn->exec('DROP TABLE IF EXISTS games'); //for updates
	$conn->exec('CREATE TABLE IF NOT EXISTS games 
		(id INT PRIMARY KEY AUTO_INCREMENT, 
		status ENUM("open", "ready", "closed", "ongoing", "finished") DEFAULT "open",
		num_players TINYINT DEFAULT 1 CHECK(num_players <= 4),
		state INT DEFAULT 0)');
	echo "Games table OK" . PHP_EOL;
	$conn->exec('CREATE TABLE IF NOT EXISTS accounts 
		(login VARCHAR(40) PRIMARY KEY, 
		password CHAR(128),
		name VARCHAR(40) NOT NULL DEFAULT (login),
		game_id INT,
		FOREIGN KEY(game_id) REFERENCES games(id))');
	#$conn->exec('INSERT INTO accounts (login) VALUES ("System") ON DUPLICATE KEY UPDATE login=login');		
	echo "Accounts OK" . PHP_EOL;
	load_districts($conn);
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
$conn = null;
?>