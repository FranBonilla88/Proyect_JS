<?php
require_once('config.php');
$conexion = obtenerConexion();

$id_user = $_POST['id_user'];

$sql = "DELETE FROM user WHERE id_user = $id_user;";
mysqli_query($conexion, $sql); // ejecutar directamente

mysqli_close($conexion);

//RESPUESTA JSON PARA EL FRONTEND
echo json_encode([
  "error" => false,
  "mensaje" => "Usuario eliminado correctamente"
]);
