<?php
	spl_autoload_register(function ($class_name) { include $class_name.'.class.php'; });
	class Game
	{
		private $_id;
		private $_status;
		private $_counter;
		private $_numPlayers;
		private $_players;
		private $_turn;
		private $_mainDeck;
		private $_discardDeck;
		private $_map;
		private $_table;
		private $_chat;

		public function getId() { return $this->_id; }
		public function getStatus() { return $this->_status; }
		public function getCounter() { return $this->_counter; }
		public function getChatCounter() { return $this->_chat->getCounter(); }
		public function getChat($last) { return $this->_chat->getChat($last); }
		public function getPlayers() { return $this->_players; }
		public function getNumPlayers() { return $this->_numPlayers; }
		public function getTurn() { return $this->_turn; }
		public function getMap() { return $this->_map; }
		public function getTable() { return $this->_table; }
		
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
			$dir = "../private/games/".$this->_id;
			mkdir($dir, 0777, true);
			$this->_players = array(new Player($user));
			$this->_numPlayers = 1;
			$this->_status = "open";
			$this->_counter = 0;
			$this->_chat = new Chat($this->_id, $user);
			$filename = $dir."/state";
			$f = fopen($filename, "c+b");
			flock($f, LOCK_EX);
			file_put_contents($filename, serialize($game));
			flock($f, LOCK_UN);
		}

		public function addPlayer($user)
		{
			if ($this->_state === "open")
			{
				$this->_players[] = new Player($user);
				if (++$this->_numPlayers === GameConstants::MAX_PLAYERS)
					$this->_status = "full";
				$this->_chat->speak("System", $user." входит в игру.");
				++$this->_counter;
				return true;
			}
			return false;
		}

		public function delPlayer($user)
		{
			if (in_array($user, $this->_players))
			{
				$this->_players = array_values(array_diff($this->_players, array($user)));
				if ($this->_status === "full")
					$this->_status = "open";
				--$this->_numPlayers;
				$this->_chat->speak("System", $user." покидает игру.");
				++$this->_counter;
			}
		}

		public function getState($user)
		{
			if (in_array($user, $this->_players))
				return json_encode(new GameState($this, $user));
			else
				return false;
		}

		public function start($user)
		{
			if (!$this->_players[0] !== $user || $this->_numPlayers < GameConstants::MIN_PLAYERS)
				return false;
			$this->_status = "ongoing";
		}
	}
?>