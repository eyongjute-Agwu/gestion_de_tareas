<?php
$conexion = null;
try{
    $conexion = new PDO("mysql:host=localhost;dbname=gestion_tarreas", "root", "");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(Exception $e){
    die("Error de conexion: " . $e->getMessage());
}

?>