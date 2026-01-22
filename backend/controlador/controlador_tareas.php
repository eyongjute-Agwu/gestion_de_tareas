<?php
require_once '../modelo/modelo_tareas.php';
require_once '../dao/conexion.php';
require_once '../dao/dao_tareas.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Aquí va la lógica para manejar las tareas
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST["accion"] == "crearTarea") {
        try {
            $data = json_decode($_POST['data'], true);
            $nombre = $data["nombre"];
            $estado = $data["estado"];
            $fecha = $data["fecha"];
            $hora = $data["horario"];
            $estadoAlarma = $data["alarma"];

            $tarea = new Tareas($nombre, $estado, $fecha, $hora, $estadoAlarma);
            $tarea->fecha = $fecha." ".$hora;

            if (!isset($tarea->nombre) || !isset($tarea->estado) || !isset($tarea->fecha) || !isset($tarea->hora) || !isset($tarea->estadoAlarma)) {
                throw new Exception("Es obligatorio rellenar todos los datos de la tarea");
            }

            if(crearTarea($conexion, $tarea, $_SESSION['idUsuario'])) {
                echo json_encode(["success" => true, "sms" => "Tarea creada correctamente"]);
            }else{
                throw new Exception("No se puedo crear la tarea");
            }


        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }
    }else if($_POST["accion"] == "actualizarTarea"){
        // Lógica para actualizar tarea
        try {
            $data = json_decode($_POST['data'], true);
            $idTarea = $data["idTarea"];
            $nombre = $data["nombre"];
            $estado = $data["estado"];
            $fecha = $data["fecha"];
            $hora = $data["horario"];
            $estadoAlarma = $data["alarma"];

            $tarea = new Tareas2($idTarea, $nombre, $estado, $fecha, $hora, $estadoAlarma);
            $tarea->fecha = $fecha." ".$hora;

            if (!isset($tarea->idTarea) || !isset($tarea->nombre) || !isset($tarea->estado) || !isset($tarea->fecha) || !isset($tarea->hora) || !isset($tarea->estadoAlarma)) {
                throw new Exception("Es obligatorio rellenar todos los datos de la tarea");
            }

            if(actualizarTarea($conexion, $tarea, $_SESSION['idUsuario'])) {
                echo json_encode(["success" => true, "sms" => "Tarea actualizada correctamente"]);
            }else{
                throw new Exception("No se puedo actualizar la tarea");
            }
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }

    }else if($_POST["accion"] == "eliminarTarea"){
        // Lógica para eliminar tarea
        try {
            $data = json_decode($_POST['data'], true);
            $idTarea = $data["idTarea"];

            if (!isset($idTarea)) {
                throw new Exception("Es obligatorio el id de la tarea");
            }

            if(eliminarTarea($conexion, $idTarea, $_SESSION['idUsuario'])) {
                echo json_encode(["success" => true, "sms" => "Tarea eliminada correctamente"]); 
            }   
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }

    }
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {

    if(listarTareas($conexion,$_GET['usuario_id'])) {
        echo json_encode(["success" => true, "tareas" => listarTareas($conexion,$_GET['usuario_id'])]);
    } else {
        echo json_encode(["success" => true, "tareas" => []]);
    }
}
?>