// Datos estáticos simulando backend
// Datos dinámicos: intentar cargar desde la carpeta de servicios (con fallback estático)
const rawFoto = (localStorage.getItem("foto") || "").trim().replace(/^["']|["']$/g, "");
const fotoPath = rawFoto ? "../../../backend/fotos/" + encodeURIComponent(rawFoto) : "../../../backend/fotos/default.jpg";
let usuario = {
  nombre: localStorage.getItem("nombre") || "Usuario",
  foto: fotoPath
};

let tareas = [
  { id: 1, nombre: "Comprar pan", estado: "Pendiente", horario: "08:00", alarma: true },
  { id: 3, nombre: "Hacer ejercicio", estado: "Completada", horario: "19:00", alarma: true }
];


// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nombreUsuario").textContent = usuario.nombre;
  document.getElementById("fotoUsuario").src = usuario.foto;

  renderTareas();

  document.getElementById("btnNuevaTarea").addEventListener("click", nuevaTarea);
  document.getElementById("btnGuardarTarea").addEventListener("click", guardarTarea);
  document.getElementById("btnBuscar").addEventListener("click", buscarTarea);
});

// Renderizar tabla
function renderTareas(lista = tareas) {
  const tbody = document.querySelector("#tablaTareas tbody");
  tbody.innerHTML = "";
  lista.forEach((t, i) => {
    // Asignar color según estado
    let estadoClass = "";
    switch (t.estado) {
      case "Pendiente":
        estadoClass = "text-danger fw-bold"; // rojo
        break;
      case "En progreso":
        estadoClass = "text-warning fw-bold"; // amarillo/naranja
        break;
      case "Completada":
        estadoClass = "text-success fw-bold"; // verde
        break;
    }

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.nombre}</td>
      <td class="${estadoClass}">${t.estado}</td>
      <td>${t.horario || "-"}</td>
      <td>${t.alarma ? "⏰ Sí" : "No"}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarTarea(${t.id})">
          <i class='bx bx-edit'></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="eliminarTarea(${t.id})">
          <i class='bx bx-trash'></i>
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Nueva tarea
function nuevaTarea() {
  document.getElementById("modalTitulo").textContent = "Nueva Tarea";
  document.getElementById("formTarea").reset();
  document.getElementById("tareaId").value = "";
  new bootstrap.Modal(document.getElementById("modalTarea")).show();
}

// Guardar tarea
function guardarTarea() {
  const id = document.getElementById("tareaId").value;
  const nombre = document.getElementById("tareaNombre").value;
  const estado = document.getElementById("tareaEstado").value;
  const horario = document.getElementById("tareaHorario").value;
  const alarma = document.getElementById("tareaAlarma").checked;

  if (id) {
    const tarea = tareas.find(t => t.id == id);
    tarea.nombre = nombre;
    tarea.estado = estado;
    tarea.hora = hora;
    tarea.alarma = alarma;
  } else {
    const nueva = {
      id: tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
      nombre,
      estado,
      horario,
      alarma
    };
    tareas.push(nueva);
  }

  renderTareas();
  bootstrap.Modal.getInstance(document.getElementById("modalTarea")).hide();
}

// Editar tarea
function editarTarea(id) {
  const tarea = tareas.find(t => t.id == id);
  document.getElementById("modalTitulo").textContent = "Editar Tarea";
  document.getElementById("tareaNombre").value = tarea.nombre;
  document.getElementById("tareaEstado").value = tarea.estado;
  document.getElementById("tareaHorario").value = tarea.horario;
  document.getElementById("tareaAlarma").checked = tarea.alarma;
  document.getElementById("tareaId").value = tarea.id;
  new bootstrap.Modal(document.getElementById("modalTarea")).show();
}

// Eliminar tarea
function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderTareas();
}

// Buscar tarea
function buscarTarea() {
  const texto = document.getElementById("searchInput").value.toLowerCase();
  const filtradas = tareas.filter(t => t.nombre.toLowerCase().includes(texto));
  renderTareas(filtradas);
}