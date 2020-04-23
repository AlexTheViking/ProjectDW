<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });

	class PlayCard extends Card
	{
		private $_instructions;
		
		public function getInstructions() { return $this->_instructions; }

		public function __construct(array $args)
		{
			parent::__construct($args);
			$this->_type = "playcard";
		}
	}
?>