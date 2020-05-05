<?php
$servername = "localhost";
$username = "root";
$password = "";
//тут можно писать других пользователей, но их надо сначала создать



// так создается подключение
$link = mysqli_connect($servername, $username, $password);
// это надо делать каждый раз когда хочешь что-то сделать с бд
// в $link теперь записано что-то типа куда обращаться

//создание базы данных
$result=mysqli_query($link, "CREATE DATABASE myDB");

echo $result;

//if () {
//    echo "Database created successfully";
//} else {
//    echo "Error creating database: " . mysqli_error($link);
//}


//так подключение закрывается, это тоже надо делать каждый раз
mysqli_close($link);
?>