<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$name = $_POST['name'];

$sql = "SELECT r.*, a.value AS assessment_value
        FROM reservation r, assessment a
        WHERE r.id_assessment = a.id_assessment
        AND r.name LIKE '%$name%';";

$resultado = mysqli_query($conexion, $sql);

$datos = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if (count($datos) > 0) {
    responder($datos, true, "Reservas recuperadas correctamente", $conexion);
} else {
    responder(null, false, "No existe ninguna reserva con ese nombre", $conexion);
}

mysqli_close($conexion);
