<?php
function obtenerUsuario($con, $correo) {
      $sql = "SELECT * FROM usuarios WHERE correo = ? ";
      $stmt = $con->prepare($sql);
      $stmt->execute([$correo]); 
  
      $result = $stmt->fetch();
      if ($result) {
        return $result;
      } else {
        throw new Exception("Usuario incorrecto"); 
      }
  }

function registrarUsuario($con, $nombre, $correo, $contrasena, $foto) {
      $sql = "INSERT INTO usuarios (nombre, correo, contrasena, foto) VALUES (?, ?, ?, ?)";
      $stmt = $con->prepare($sql);
      $stmt->execute([$nombre, $correo, $contrasena, $foto]);

      if ($stmt->rowCount() > 0) {
        return true;
      } else {
        return false;
      }
  }

?>