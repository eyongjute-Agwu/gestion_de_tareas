<?php
//Funciones de la base de datos
function listarTareas($conexion, $idUsuario){
    $sql = "SELECT * FROM tarreas WHERE usuario_id = :usuario_id";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':usuario_id', $idUsuario);
    $stmt->execute();
    $tareas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $tareas;
}

function crearTarea($conexion, $tarea, $usuario_id){
    $sql = "INSERT INTO tarreas (nombre_tarea, estado, fecha, estado_alarma, fecha_creacion, usuario_id) VALUES (:nombre, :estado, :fecha, :estadoAlarma, NOW(), :usuario_id)";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre', $tarea->nombre);
    $stmt->bindParam(':estado', $tarea->estado);
    $stmt->bindParam(':fecha', $tarea->fecha);
    $stmt->bindParam(':estadoAlarma', $tarea->estadoAlarma);
    $stmt->bindParam(':usuario_id', $usuario_id);
    return $stmt->execute();
}

function actualizarTarea($conexion, $tarea, $usuario_id){
    $sql = "UPDATE tarreas SET nombre_tarea = :nombre, estado = :estado, fecha = :fecha, estado_alarma = :estadoAlarma, fecha_actualizacion = NOW() WHERE id = :idTarea AND usuario_id = :usuario_id";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':nombre', $tarea->nombre);
    $stmt->bindParam(':estado', $tarea->estado);
    $stmt->bindParam(':fecha', $tarea->fecha);
    $stmt->bindParam(':estadoAlarma', $tarea->estadoAlarma);
    $stmt->bindParam(':idTarea', $tarea->idTarea);
    $stmt->bindParam(':usuario_id', $usuario_id);
    return $stmt->execute();
}

function eliminarTarea($conexion, $idTarea, $usuario_id){
    $sql = "DELETE FROM tarreas WHERE id = :idTarea AND usuario_id = :usuario_id";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':idTarea', $idTarea);
    $stmt->bindParam(':usuario_id', $usuario_id);
    return $stmt->execute();
}
?>