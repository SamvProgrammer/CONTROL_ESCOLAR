<?php 
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR); 
$dbHost     = 'localhost';
		$dbUsername = 'root';
		$dbPassword = '';
		$dbName     = 'bdcontrol';
connecttodb($servername,$dbname,$dbusername,$dbpassword); 
function connecttodb($dbHost,$dbUsername,$dbPassword,$dbName) 
{ 
$db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName); 
if(!$link) 
{ 
die('No puedo Conectarme al Administrador MySQL'.mysqli_error()); 
} 
mysqli_select_db($dbname,$link) 
or die ('No puedo seleccionar la base de datos'.mysqli_error()); 
} 
?>