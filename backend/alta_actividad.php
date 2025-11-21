<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$activity = json_decode($_POST['activity']);


$sql = "INSERT INTO activity VALUES(null, '$activity->name' , '$activity->description', '$activity->activity_day', $activity->duration ,  $activity->available , $activity->id_trainer); ";

mysqli_query($conexion, $sql);
if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta la actividad", $conexion);
}
mysqli_close($conexion); //<-- cerrar la conexión
?>