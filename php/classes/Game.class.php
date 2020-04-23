<?php
	class Game
	{
		private $_id;
		private $_status;
		private $_numPlayers;
		private $_players;
		private $_mainDeck;
		private $_discardDeck;
		private $_map;

		public function getId() { return $this->_id; }
		public function getStatus() { return $this->_status; }
		public function getPlayers() { return $this->_players; }
		public function getNumPlayers() { return $this->_numPlayers; }
		public function getPlayersList()
		{
			$arr = array();
			foreach ($this->_players as $player)
				$arr[] = $player->getName();
			return $arr;
		}

		public function __construct($user)
		{
			date_default_timezone_set("Europe/Moscow");
			$this->_id = str_replace('.', '', str_replace(' ', '-', microtime()."-".$user));
			$this->_players = array(new Player($user));
			$this->_numPlayers = 1;
			$this->_status = "open";
		}

		public function addPlayer($user)
		{
			if ($this->getNumPlayers() < GameConstants::MAX_PLAYERS)
			{
				$this->_players[] = $user;
				if (++$this->_numPlayers === GameConstants::MAX_PLAYERS)
					$this->_status = "full";
				return true;
			}
			return false;
		}

		public function delPlayer($user)
		{
			if (in_array($user, $this->_players))
			{
				$this->_players = array_diff($this->_players, array($user));
				$this->_status = "open";
				--$this->_numPlayers;
			}
		}
	}
?>