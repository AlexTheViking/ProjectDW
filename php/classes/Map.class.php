<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });
	class CityMap
	{
		private $_districts;

		private function init_districts($filename)
		{
			$this->_districts = array();
			$f = fopen($filename, "r");
			if ($f)
			{
				while (($line = fgets($f)) !== false)
				{
					$line = explode("\t", $line);
					$this->_districts[(int)$line[0]] = new District($line);
				}
				fclose($f);
			}
			else
				echo "Server error: can't open ".$filename;
		}

		private function default_starting_position()
		{
			
		}

		public function getDistricts() { return $this->_districts; }

		public function __construct()
		{
			$this->init_districts(GameConstants::DISTRICT_FILE);
			//echo print_r($this->_districts);
		}
	}
	$a = new CityMap();
?>