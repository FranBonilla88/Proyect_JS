<?php
require_once('config.php');
$conexion = obtenerConexion();

$id_reservation = $_POST['id_reservation'];

$sql = "DELETE FROM reservation WHERE id_reservation = $id_reservation;";
mysqli_query($conexion, $sql); // ejecutar directamente

mysqli_close($conexion);

//RESPUESTA JSON PARA EL FRONTEND
echo json_encode([
    "error" => false,
    "mensaje" => "Reserva eliminada correctamente"
]);
