<?php
include_once '../modelo/modelo_usuarios.php';
include_once '../dao/conexion.php';
include_once '../dao/dao_usuarios.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!isset($_POST["accion"])){
        $data = json_decode(file_get_contents('php://input'), true);
        $accion = isset($data['accion']) ? $data['accion'] : '';
    }
    if($data["accion"] == "login"){
        
        try {
        
        if (!isset($data["correo"]) || !isset($data["contrasena"])) {
            throw new Exception("Es obligatorio rellenar todos los datos");
        }
        
        $usuario = new Usuarios($data["correo"],$data["contrasena"]);
            if ($usuario->correo == "" || $usuario->contrasena == "") {
                throw new Exception("Es obligatorio rellenar todos los datos");
            }
            # Verificando integridad de texto #

            if (!preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $usuario->correo)) {
                throw new Exception("El CORREO no coincide con el formato solicitado");
            }
            
            if (preg_match("/^ [a-zA-Z0-9@]{4,20} $/", $usuario->contrasena)){
                throw new Exception("La CONTRASENA no coincide con el formato solicitado");
            }

            $usuarioBD = obtenerUsuario($conexion,$usuario->correo);

            if(!isset($usuarioBD) || $usuarioBD != false){
                if($usuarioBD['correo']==$usuario->correo && $usuarioBD['contrasena']==$usuario->contrasena){

                    $_SESSION['correo']=$usuarioBD['correo'];
                    $_SESSION['idUsuario']=$usuarioBD['id'];

                # le devolvemos los datos en json

                http_response_code(200);
                echo json_encode([
                    'status' => http_response_code(200),
                    'success' => true,
                    'data' => [
                        "idUsuario" => $usuarioBD["id"],
                        "nombre" => $usuarioBD["nombre"],
                        "foto" => $usuarioBD["foto"],
                        ]
                ]);

                }else{
                    throw new Exception('Usuario o clave incorrectos');
                    }
            }else{
                throw new Exception('Usuario o clave incorrectos');
            }
            $userDB = null;

            
        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }
    }else if($_POST["accion"] == "registrar"){
        try {
            $usuarioJson = $_POST["usuario"];
            $usuarioArray = json_decode($usuarioJson, true);
            $registro = new Registro($usuarioArray["nombre"],$usuarioArray["email"], $usuarioArray["password"] ,"");

            if (!isset($registro->correo) || !isset($registro->contrasena) || !isset($registro->nombre)) {
                throw new Exception("Es obligatorio rellenar todos los datos");
            }

            if(!isset($_FILES["foto"])){
                throw new Exception("Es obligatorio subir una foto");
            }


            if($_FILES && isset($_FILES['foto'])){
                $foto = $_FILES['foto'];
                $nombreArchivo = $registro->nombre . '_' . time() . '_' . basename($foto['name']);
                $rutaDestino = '../fotos/' . $nombreArchivo;

                if(!file_exists("../fotos/")){
                    if (!is_dir("../fotos/")) {
                        mkdir("../fotos/", 0777, true);
                    }
                }

                if (move_uploaded_file($foto['tmp_name'], $rutaDestino)) {
                    $registro->foto = $nombreArchivo;
                } else {
                    throw new Exception("Error al subir la foto");
                }

            }else{
                throw new Exception("Es obligatorio subir una foto");
            }

            if(!registrarUsuario($conexion,$registro->nombre, $registro->correo, $registro->contrasena, $registro->foto)){
                throw new Exception("No se puedo registrar al usuario");
            }

            echo json_encode(["success" => true, "sms" => "Usuario registrado correctamente"]);

        } catch (Exception $e) {
            http_response_code(400);
            echo json_encode([
                'status' => http_response_code(400),
                'success' => false,
                'sms' => $e->getMessage()
            ]);
        }

    }else{
        echo json_encode(["success" => false, "error" => "Accion no válida"]);
    }
}


if($_SERVER['REQUEST_METHOD'] == 'GET'){
    echo json_encode(["sms" => "Método GET implementado correctamente"]);
}

if($_SERVER['REQUEST_METHOD'] == 'PUT'){
    echo json_encode(["sms" => "Método PUT implementado correctamente"]);
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    echo json_encode(["sms" => "Método DELETE implementado correctamente"]);
}


?>