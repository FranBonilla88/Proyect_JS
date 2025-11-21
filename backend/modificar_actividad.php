<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$activity = json_decode($_POST['activity']);

$sql = "UPDATE activity
SET name = '" . $activity->name . "', 
description = '" .  $activity->description . "', 
activity_day = '". $activity->activity_day . "', 
duration = $activity->duration,
available = $activity->available,
id_trainer = $activity->id_trainer
WHERE id_activity = $activity->id_activity ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado la actividad", $conexion);
}
?>