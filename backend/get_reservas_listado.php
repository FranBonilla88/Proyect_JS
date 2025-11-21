<?php
// require_once('config.php');

// try {
//     $conexion = obtenerConexion();

//     $sql = "SELECT 
//             r.id_reservation, 
//             r.name, 
//             r.id_user, 
//             r.id_activity, 
//             r.reservation_date, 
//             r.is_active, 
//             r.id_assessment,
//             a.value AS assessment_value
//         FROM reservation r
//         JOIN assessment a ON r.id_assessment = a.id_assessment
//         ORDER BY r.id_reservation ASC;";


//     $resultado = mysqli_query($conexion, $sql);

//     $datos = [];
//     while ($fila = mysqli_fetch_assoc($resultado)) {
//         $datos[] = $fila;
//     }

//     responder($datos, true, "Reservas recuperadas correctamente", $conexion);
// } catch (Exception $e) {
//     responder(null, false, "Error: " . $e->getMessage(), $conexion ?? null);
// }

// mysqli_close($conexion);
