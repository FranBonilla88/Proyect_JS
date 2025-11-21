<?php
require_once('config.php');

try {
 
    $conexion = obtenerConexion();
    if(isset($_GET['activityName'])){
        $name = $_GET['activityName'];
        $sql = "SELECT a.*, u.name AS trainer, u.id_user FROM activity a, user u WHERE u.id_user = a.id_trainer AND a.name LIKE '%$name%';";
    }elseif(isset($_GET['trainer'])){
        $trainer = $_GET['trainer'];
        $sql = "SELECT a.*, u.name AS trainer, u.id_user FROM activity a, user u WHERE u.id_user = a.id_trainer AND u.id_user = $trainer;";
    }elseif(isset($_GET['orderByDate'])){
        $sql = "SELECT a.*, u.name AS trainer, u.id_user FROM activity a, user u WHERE u.id_user = a.id_trainer ORDER BY a.activity_day DESC;";
    }else{
        $sql = "SELECT a.*, u.name AS trainer, u.id_user FROM activity a, user u WHERE u.id_user = a.id_trainer;";
    }
    error_log($sql);
    $resultado = $conexion->query($sql);
    // Recolectamos las filas en un array asociativo para serializar a JSON
    $datos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $datos[] = $fila; // cada $fila es un array asociativo (columna => valor)
    }

    // responder() enviará un JSON con estructura { ok, datos, mensaje }
    // y cerrará la conexión si se le pasa.
    responder($datos, true, "Datos recuperados correctamente", $conexion);

} catch (mysqli_sql_exception $e) {
    // Errores específicos de mysqli (p. ej. problemas con la consulta o la conexión)
    // Enviamos un JSON de error. Usamos $conexion ?? null para evitar usar
    // una variable no definida si la conexión falló al crearse.
    responder(null, false, "Error en la base de datos: " . $e->getMessage(), $conexion ?? null);
} catch (Exception $e) {
    // Captura cualquier otra excepción / error inesperado
    responder(null, false, "Error general: " . $e->getMessage(), $conexion ?? null);
}
mysqli_close($conexion); //<-- cerrar la conexión
?>