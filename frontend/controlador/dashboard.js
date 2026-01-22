// Datos estáticos simulando backend
// Datos dinámicos: intentar cargar desde la carpeta de servicios (con fallback estático)
const rawFoto = (localStorage.getItem("foto") || "").trim().replace(/^["']|["']$/g, "");
const fotoPath = rawFoto ? "../../../backend/fotos/" + encodeURIComponent(rawFoto) : "../../../backend/fotos/default.jpg";
let usuario = {
  nombre: localStorage.getItem("nombre") || "Usuario",
  foto: fotoPath
};

let tareas = [];

import { getTareas, crearTarea, actualizarTarea, eliminarTarea } from "../servicios/taskService.js";


// Inicialización
document.addEventListener("DOMContentLoaded", async () => {
  //si no existe la sesion redirigir al login
  if (!localStorage.getItem("nombre")) {
    window.location.href = "login.html";
  }
  const btnCerrarSesion = document.getElementById("btnCerrarSesion");
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("nombre");
    localStorage.removeItem("foto");
    window.location.href = "login.html";
  });
  

  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("fotoUsuario").src = usuario.foto;

  tareas = await getTareas().catch(err => {
    console.error("Error al cargar tareas desde el backend:", err);
    return [];
  });

  renderTareas(tareas);

  document.getElementById("btnNuevaTarea").addEventListener("click", nuevaTarea);
  document.getElementById("btnGuardarTarea").addEventListener("click", guardarTarea);
  document.getElementById("btnBuscar").addEventListener("click", buscarTarea);
  let btnEditar = document.querySelectorAll(".btnEditar");

  btnEditar.forEach(element => {
    element.addEventListener("click", function (e) {
      if (e.target && e.target.closest("button")) {
        const id = e.target.closest("button").getAttribute("value");
        editarTarea(id);
      }
    });
  });

  let btnEliminar = document.querySelectorAll(".btnEliminar");
  btnEliminar.forEach(element => {
    element.addEventListener("click", function (e) {
      if(confirm("¿Está seguro de que desea eliminar esta tarea?")){
        if (e.target && e.target.closest("button")) {
          const id = e.target.closest("button").getAttribute("value");
          eliminar(parseInt(id));
        }
      }
    });
  });

});

async function cargarTareas() {
  tareas = await getTareas().catch(err => {
    console.error("Error al cargar tareas desde el backend:", err);
    return [];
  });
  renderTareas(tareas);
}

// Renderizar tabla
function renderTareas(lista = tareas) {
  const tbody = document.querySelector("#tablaTareas tbody");
  tbody.innerHTML = "";
  //si no hay tareas, decir que no hay tareas
  if (lista.tareas.length === 0) {
    const filaVacia = document.createElement("tr");
    filaVacia.innerHTML = `<td colspan="7" class="text-center">No hay tareas disponibles</td>`;
    tbody.appendChild(filaVacia);
    return;
  }else{

    lista.tareas.forEach((t, i) => {
      // Asignar color según estado
      let estadoClass = "";
      switch (t.estado) {
        case "pendiente":
          estadoClass = "text-danger fw-bold"; // rojo
          t.estado = "Pendiente";
          break;
        case "en_progreso":
          estadoClass = "text-warning fw-bold"; // amarillo/naranja
          t.estado = "En progreso";
          break;
        case "completada":
          estadoClass = "text-success fw-bold"; // verde
          t.estado = "Completada";
          break;
      }
  
      const fila = document.createElement("tr");
      // 1. Convertimos el string a un objeto Date (reemplazando el espacio por 'T' para formato ISO)
      const dateObj = t.fecha ? new Date(t.fecha.replace(' ', 'T')) : null;

      // 2. Recuperamos solamente la fecha
      // Usamos toLocaleDateString() en el objeto creado
      let fecha = dateObj ? dateObj.toLocaleDateString() : "";

      // 3. Recuperamos solamente la hora
      let hora = dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";


      fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${t.nombre_tarea}</td>
        <td class="${estadoClass}">${t.estado}</td>
        <td>${fecha || "-"}</td>
        <td>${hora || "-"}</td>
        <td>${t.estado_alarma ? "⏰ Sí" : "No"}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2 btnEditar" value=${t.id}">
            <i class='bx bx-edit'></i>
          </button>
          <button class="btn btn-sm btn-danger btnEliminar" value=${t.id}>
            <i class='bx bx-trash'></i>
          </button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }
}

// Nueva tarea
function nuevaTarea() {
  document.getElementById("modalTitulo").textContent = "Nueva Tarea";
  document.getElementById("formTarea").reset();
  document.getElementById("tareaId").value = "";
  new bootstrap.Modal(document.getElementById("modalTarea")).show();
}

// Guardar tarea
async function guardarTarea() {
  const id = document.getElementById("tareaId").value;
  const nombre = document.getElementById("tareaNombre").value;
  const estado = document.getElementById("tareaEstado").value;
  const fecha = document.getElementById("tareaFecha").value;
  const horario = document.getElementById("tareaHorario").value;
  const alarma = document.getElementById("tareaAlarma").checked;

  if (id) {
    const tarea = {};
    tarea.idTarea = id;
    tarea.nombre = nombre;
    tarea.estado = estado;
    tarea.fecha = fecha;
    tarea.horario = horario;
    tarea.alarma = alarma;
    actualizarTarea(tarea);
  } else {
    const nueva = {
      id: tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
      nombre,
      estado,
      fecha,
      horario,
      alarma
    };
    crearTarea(nueva);
  }
  setTimeout(() => {
    window.location.reload();
  }, 100);
  bootstrap.Modal.getInstance(document.getElementById("modalTarea")).hide();
}

// Editar tarea
async function editarTarea(id) {
  
  tareas = await getTareas().catch(err => {
    console.error("Error al cargar tareas desde el backend:", err);
    return [];
  });

  const tarea = tareas.tareas.find(t => parseInt(t.id) == parseInt(id));
  // 1. Extraemos la fecha cortando el string antes del espacio
  let fecha = tarea.fecha ? tarea.fecha.split(' ')[0] : ""; 

  // 2. Extraemos la hora
  // Opción A: Usando manipulación de strings (mantiene el formato exacto del texto)
  let hora = tarea.fecha ? tarea.fecha.split(' ')[1].substring(0, 5) : "";
  
  document.getElementById("modalTitulo").textContent = "Editar Tarea";
  document.getElementById("tareaNombre").value = tarea.nombre_tarea;
  document.getElementById("tareaEstado").value = tarea.estado;
  document.getElementById("tareaFecha").value = fecha;
  document.getElementById("tareaHorario").value = hora;
  document.getElementById("tareaAlarma").checked = tarea.estado_alarma;
  document.getElementById("tareaId").value = tarea.id;
  new bootstrap.Modal(document.getElementById("modalTarea")).show();
  
}

// Eliminar tarea
async function eliminar(id) {
  tareas = await getTareas().catch(err => {
    console.error("Error al cargar tareas desde el backend:", err);
    return [];
  });

  tareas = tareas.tareas.filter(t => parseInt(t.id) !== parseInt(id));
  eliminarTarea(id);
  setTimeout(() => {
    window.location.reload();
  }, 100);
}

// Buscar tarea
function buscarTarea() {
  const texto = document.getElementById("searchInput").value.toLowerCase();
  const filtradas = tareas.filter(t => t.nombre.toLowerCase().includes(texto));
  renderTareas(filtradas);
}