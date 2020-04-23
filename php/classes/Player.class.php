<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });

	class Player
	{
		private $_name;

		public function getName() { return $this->_name; }

		public function __construct($user)
		{
			$this->_name = $user;
		}
	}
?>