<?php
require_once('config.php'); // Incluye obtenerConexion() y responder()

try {
    // Obtener conexión a la BBDD (usa la configuración centralizada)
    $conexion = obtenerConexion();

    // Consulta simple — en este caso no hay parámetros externos
    $sql = "SELECT * FROM membership;";
    $resultado = $conexion->query($sql);

    // Recolectamos las filas en un array asociativo para serializar a JSON
    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
    }
    responder($datos, true, "Datos recuperados correctamente", $conexion);
} catch (mysqli_sql_exception $e) {
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
mysqli_close($conexion); //<-- cerrar la conexión
