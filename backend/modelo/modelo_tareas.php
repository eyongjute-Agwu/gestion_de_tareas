<?php

class Tareas {
    public $nombre;
    public $estado;
    public $fecha;
    public $hora;
    public $estadoAlarma;

    public function __construct($nombre, $estado, $fecha, $hora, $estadoAlarma) {
        $this->nombre = $nombre;
        $this->estado = $estado;
        $this->fecha = $fecha;
        $this->hora = $hora;
        $this->estadoAlarma = $estadoAlarma;
    }
}

class Tareas2 {
    public $idTarea;
    public $nombre;
    public $estado;
    public $fecha;
    public $hora;
    public $estadoAlarma;

    public function __construct($idTarea, $nombre, $estado, $fecha, $hora, $estadoAlarma) {
        $this->idTarea = $idTarea;  
        $this->nombre = $nombre;
        $this->estado = $estado;
        $this->fecha = $fecha;
        $this->hora = $hora;
        $this->estadoAlarma = $estadoAlarma;
    }
}
?>