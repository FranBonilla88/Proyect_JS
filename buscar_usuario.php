<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$name = $_POST['name'];

$sql = "SELECT u.*, m.plan AS membershipPlan
        FROM user u, membership m
        WHERE u.id_membership = m.id_membership
        AND u.name LIKE '%$name%';";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila;
}

if (count($datos) > 0) {
    responder($datos, false, "Datos recuperados", $conexion);
} else {
    responder(null, true, "No existe el usuario", $conexion);
}

mysqli_close($conexion);
