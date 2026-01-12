<?php
    class Usuarios {
        #Login
        public $correo;
        public $contrasena;

        public function __construct($correo, $contrasena) {
            $this->correo = $correo;
            $this->contrasena = $contrasena;
        }
    }
    
    class Registro {
        #Login
        public $nombre;
        public $correo;
        public $contrasena;
        public $foto;

        public function __construct($nombre, $correo, $contrasena, $foto) {
            $this->nombre = $nombre;    
            $this->correo = $correo;
            $this->contrasena = $contrasena;
            $this->foto = $foto;
        }
    }

    
?>