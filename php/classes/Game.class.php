<?php
	class Game implements Serializable
	{
		private $_id;
		private $_status;
		private $_maxPLayers;
		private $_numPlayers;
		private $_players;
		private $_mainDeck;
		private $_discardDeck;
		private $_map;

		public function getPlayers() { return $this->$_players; }
		public function getMaxPlayers() { return $this->$_maxPlayers; }
		public function getPlayersList()
		{
			$arr = array();
			foreach ($this->$_players as $player)
				$arr[] = $player->getName();
			return $arr;
		}

		public function __construct()
		{
		}
	}
?>