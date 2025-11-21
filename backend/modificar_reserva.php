<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$reservation = json_decode($_POST['reservation']);

$sql = "UPDATE reservation
SET name = '" . $reservation->name . "',
id_user = " . $reservation->id_user . ",
id_activity = " . $reservation->id_activity . ",
reservation_date = '" . $reservation->reservation_date . "',
is_active = " . $reservation->is_active . ",
id_assessment = " . $reservation->id_assessment . "
WHERE id_reservation = " . $reservation->id_reservation;

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado la reserva", $conexion);
}
