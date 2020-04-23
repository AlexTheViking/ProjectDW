<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });

	class Hand
	{
		private $_cards = array();
		private $_handLimit;
		private $_type = "playcard";

		public function getLimit() { return $this->_handLimit; }
		public function decLimit() { --$this->_handLimit; }

		public function take(Card $card)
		{
			if ($card->getType !== $this->_type)
				throw new Exception("Wrong card type.");
			$this->_cards[] = $card;
		}

		public function fill(Deck $deck)
		{
			while (!$deck->isEmpty && count($this->_cards) < $this->_handLimit)
				$this->take($deck->draw());
		}

		public function __construct()
		{
			$_handLimit = GameConstants::INITIAL_HAND_LIMIT;
		}
	}
?>