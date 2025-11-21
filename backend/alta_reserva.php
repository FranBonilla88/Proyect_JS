<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos (se espera un objeto completo enviado como 'reservation')
$reservation = json_decode($_POST['reservation']);

$sql = "INSERT INTO reservation VALUES(
    null,
    '$reservation->name',
    $reservation->id_user,
    $reservation->id_activity,
    '$reservation->reservation_date',
    $reservation->is_active,
    $reservation->id_assessment
);";

// Ejecutar consulta
mysqli_query($conexion, $sql);

// Comprobar errores
if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);
    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror", $conexion);
} else {
    responder(null, true, "Se ha dado de alta la reserva", $conexion);
}

mysqli_close($conexion);
