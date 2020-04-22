<?php
	class Game
	{
		private $_id;
		private $_status;
		private $_maxPlayers;
		private $_numPlayers;
		private $_players = array();
		private $_mainDeck;
		private $_discardDeck;
		private $_map;

		public function getId() { return $this->$_id; }
		public function getStatus() { return $this->$_status; }
		public function getPlayers() { return $this->$_players; }
		public function getMaxPlayers() { return $this->$_maxPlayers; }
		public function getNumPlayers() { return $this->$_numPlayers; }
		public function getPlayersList()
		{
			$arr = array();
			foreach ($this->$_players as $player)
				$arr[] = $player->getName();
			return $arr;
		}

		public function __construct($user, $maxPlayers)
		{
			date_default_timezone_set("Europe/Moscow");
			$this->$_id = microtime()."-".$user;
			$this->$_maxPlayers = $maxPlayers;
			$this->$_players[] = new Player($user);
			$this->$_numPlayers = 1;
			$this->$_status = "open";
		}

		public function addPlayer($user)
		{
			if ($this->getNumPlayers() < $this->getMaxPlayers())
			{
				$this->$_players[] = $user;
				if (++$this->$_numPlayers === $this->$_maxPlayers)
					$this->$_status = "ready";
			}
		}

		public function delPlayer($user)
		{
			if (in_array($user, $this->$_players))
			{
				$this->$_players = array_diff($this->$_players, array($user));
				$this->$_status = "open";
				--$this->$_numPlayers;
			}
		}
	}
?>