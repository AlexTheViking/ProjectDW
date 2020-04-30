<?php
	spl_autoload_register(function ($class_name) { include $class_name.'.class.php'; });
	class Opponent
	{

	}
	
	class GameState
	{
		private $status;
		private $numPlayers;
		private $opponents;
		private $player;
		private $turn;
		private $map;
		private $table;
		private $discardTop;

		public function __construct($game, $user)
		{
			$this->status = $game->getStatus();
			$this->numPlayers = $game->getNumPlayers();
			$this->opponents = array();
			foreach ($game->getPlayers() as $player)
				if ($player->getName() === $user)
					$this->player = $player;
				else
					$this->opponents[] = new Opponent($player);
			$this->turn = $game->getTurn();
			$this->map = $game->getMap();
			$this->table = $game->getTable();
		}
	}
?>