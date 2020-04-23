<?php
	abstract class Card
	{
		protected $_type;
		protected $_front;
		protected $_back;
		protected $_name;
		protected $_text;

		public function getType() { return $this->_type; }
		public function getFront() { return $this->_front; }
		public function getBack() { return $this->_back; }
		public function getName() { return $this->_name; }
		public function getText() { return $this->_text; }

		public function __construct(array $args)
		{
			$this->_name = $args["name"];
			$this->_text = $args["text"];
			$this->_front = $args["front"];
		}
	}
?>