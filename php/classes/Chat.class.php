<?php
	spl_autoload_register(function ($class_name) { include $class_name . '.class.php'; });
	class Chat
	{
		private $_filename;
		private $_counter;

		public function getCounter() { return $this->_counter; }

		public function __construct($id, $user)
		{
			$this->_filename = realpath("../../private/games/".$id."/chat");
			$this->_counter = 0;
			$this->speak("System", $user." создает игру.");
		}

		public function speak($user, $message)
		{
			date_default_timezone_set("Europe/Moscow");
			if ($f = fopen($this->_filename, "c+b"))
			{
				flock($f, LOCK_EX);
				if (!($arr = unserialize(file_get_contents($this->_filename))))
					$arr = array();
				$arr[] = array("num" => $this->_counter++, "time" => time(), "user" => $user, "message" => $message);
				file_put_contents($this->_filename, serialize($arr));
				flock($f, LOCK_UN);
				fclose($f);
			}
		}

		public function getChat($last = -1)
		{
			if ($f = fopen($this->_filename, "rb"))
			{
				flock($f, LOCK_SH);
				if (!($arr = array_slice(unserialize(file_get_contents($this->_filename)), $last + 1, NULL, true)))
					return array();
				flock($f, LOCK_UN);
				fclose($f);
				return $arr;
			}
		}
	}

	//$e = new Chat("007261600-1587663307-Alex", "Batman");
	//print_r($e->getChat());
	//print_r($e->getChat(3));
?>