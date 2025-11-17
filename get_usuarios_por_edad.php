<?php
require_once('config.php');
$conexion = obtenerConexion();

$minimum_age = $_GET['minimum_age'];
$maximum_age = $_GET['maximum_age'];

$sql = "SELECT u.*, m.plan 
        FROM user u, membership m
        WHERE u.id_membership = m.id_membership
        AND u.age BETWEEN $minimum_age AND $maximum_age
        ORDER BY u.age ASC;";
        
$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $datos[] = $fila; // Insertar la fila en el array
}

responder($datos, true, "Datos recuperados", $conexion);
?>