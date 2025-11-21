<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$id_activity = $_POST['id_activity'];

// SQL
$sql = "DELETE FROM activity WHERE id_activity = $id_activity;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);

