<?php
require_once('config.php');
$conexion = obtenerConexion();

// SQL
$sql = "SELECT u.*, m.plan AS membershipPlan 
        FROM user u, membership m
        WHERE u.id_membership = m.id_membership
        ORDER BY id_user ASC;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, true, "Datos recuperados", $conexion);
?>