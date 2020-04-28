<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });
	class District
	{
		private $_num;
		private $_name;
		private $_cost;
		private $_text;
		private $_neighbors;
		private $_owner;
		private $_pieces;
		private $_trouble;
		private $_disaster;
		private $_usable;
		private $_usage;

		private function isEmpty()
		{
			foreach (GameConstants::PIECES as $piece)
				if ($this->_pieces[$piece] !== 0)
					return false;
			return true;
		}

		public function getNum() { return $this->_num; }
		public function getName() { return $this->_name; }
		public function getCost() { return $this->_cost; }
		public function getText() { return $this->_text; }
		public function getNeighbors() { return $this->_neighbors; }
		public function getOwner() { return $this->_owner; }
		public function getPieces() { return $this->_pieces; }
		public function isTrouble() {return $this->_trouble; }
		public function isUsable() {return $this->_usable; }
		public function getDisaster() { return $this->_disaster; }

		public function __construct($line)
		{
			$this->_num = (int)$line[0];
			$this->_name = $line[1];
			$this->_cost = (int)$line[2];
			$this->_neighbors = explode(',', $line[3]);
			$this->_text = $line[4];
			$this->_owner = NULL;
			$this->_pieces = array();
			foreach (GameConstants::PIECES as $piece)
				$this->_pieces[$piece] = 0;
			$this->_trouble = false;
			$this->_disaster = array();
			$this->_usable = true;
			//$this->_usage = $line[5];
		}

		public function add($item, $num = 1, $no_trouble = false)
		{
			if ($item.in_array(GameConstants::PIECES))
			{
				if (((!$this->isEmpty() || $num > 1) && !$no_trouble) || $item === "demon")
					$this->_trouble = true;
				$this->_pieces[$item] += $num;
			}
		}

		public function remove($item)
		{
			if ($item.in_array(GameConstants::PIECES) && $this->_pieces[$item] > 0)
			{
				--$this->_pieces[$item];
				$this->_trouble = false;
			}
		}
	}
?>