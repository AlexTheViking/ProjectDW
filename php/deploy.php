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
		(id TINYINT NOT NULL AUTO_INCREMENT, 
		name VARCHAR(40) NOT NULL, 
		description TINYTEXT NOT NULL, 
		cost TINYINT NOT NULL, 
		neighbors TINYTEXT NOT NULL, 
		action TINYTEXT NOT NULL, 
		PRIMARY KEY (id))';
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
	$conn = new PDO('mysql:host=' . SERVER_NAME . ';dbname=' . DB_NAME . ';charset=utf8mb4', USER_NAME, PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->exec('CREATE DATABASE IF NOT EXISTS ' . DB_NAME);
	echo 'Database OK' . PHP_EOL;
	$conn->exec('CREATE TABLE IF NOT EXISTS accounts (login VARCHAR(40) UNIQUE NOT NULL, password CHAR(128) NOT NULL, PRIMARY KEY (login))');
	echo "Accounts OK" . PHP_EOL;
	load_districts($conn);
}
catch(Exception $e)
{
	echo json_encode(array('status' => 1, 'message' => $e->getMessage()));
}
$conn = null;
?>