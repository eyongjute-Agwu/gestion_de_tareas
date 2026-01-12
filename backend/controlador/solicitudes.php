<?php

// Aquí va la lógica para manejar las solicitudes

// Obtener la ruta solicitada
$route = isset($_GET['ruta']) ? $_GET['ruta'] : '';

// Dividir la ruta en partes
$routeParts = explode('/', trim($route, '/'));

// Suponiendo que la primera parte es el controlador
$controller = isset($routeParts[0]) ? $routeParts[0] : null;

// Cargar el controlador correspondiente
switch ($controller) {
    case 'usuario':
        require_once 'controlador_usuarios.php';
        break;
    case 'tareas':
        require_once 'controlador_tareas.php';
        break;
    // Agregar más casos según sea necesario

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint no encontrado']);
        exit;
}
?>