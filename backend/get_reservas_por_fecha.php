<?php
require_once('config.php');
$conexion = obtenerConexion();

$sql = "SELECT r.*, a.value AS assessment_value
        FROM reservation r
        LEFT JOIN assessment a ON r.id_assessment = a.id_assessment
        ORDER BY r.reservation_date ASC;";

$resultado = mysqli_query($conexion, $sql);

$datos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

responder($datos, true, "Reservas recuperadas correctamente", $conexion);

mysqli_close($conexion);
