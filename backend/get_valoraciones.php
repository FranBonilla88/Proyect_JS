<?php
require_once('config.php');

try {
    $conexion = obtenerConexion();

    $sql = "SELECT * FROM assessment;";
    $resultado = mysqli_query($conexion, $sql);

    $datos = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $datos[] = $fila;
    }

    responder($datos, true, "Valoraciones recuperadas correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
mysqli_close($conexion); //<-- cerrar la conexión
