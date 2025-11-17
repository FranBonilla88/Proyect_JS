<?php
require_once('config.php');

try {
    $conexion = obtenerConexion();

    $sql = "SELECT u.*, m.plan AS membershipPlan
            FROM user u, membership m
            WHERE u.id_membership = m.id_membership
            ORDER BY u.id_user ASC;";

    $resultado = mysqli_query($conexion, $sql);

    $datos = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }

    responder($datos, true, "Usuarios recuperados correctamente", $conexion);
} catch (Exception $e) {
    responder(null, false, "Error: " . $e->getMessage(), $conexion ?? null);
}


mysqli_close($conexion);
