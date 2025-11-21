<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$user = json_decode($_POST['user']);
//jason se uso cuando se espera un objeto completo

$sql = "INSERT INTO user VALUES(null, '$user->name' , '$user->email', '$user->registration_date', $user->age ,  $user->vip , ' $user->observation', $user->id_membership); ";
//los int no llevan comillas(booleanos,id,age...)
mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha dado de alta el usuario", $conexion);
}
mysqli_close($conexion); //<-- cerrar la conexión
?>