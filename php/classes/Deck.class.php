<?php
	class Deck
	{
		private $_cards = array();
		private $_type;

		private function shuffleDeck() { shuffle($this->_cards); }

		public function getType() { return $this->_type; }
		public function isEmpty() { return count($this->_cards) == 0; }
		
		public function draw()
		{
			return array_pop($this->_cards);
		}
		public function drawCards(int $n)
		{
			$ans = array();
			for ($i = 0; $i < $n && $this->_cards; ++$i)
				$ans[] = array_pop($this->_cards);
			return $ans;
		}

		public function put(Card $card)
		{
			if ($card->getType() !== $this->_type)
				throw new Exception("Wrong card type.");
			$this->$_cards[] = $card;
		}
		public function putCards(array $cards)
		{
			foreach ($cards as $card)
				$this->put($card);
		}
	}
?>