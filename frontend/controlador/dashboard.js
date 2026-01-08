// Datos estáticos simulando backend
let usuario = {
  nombre: "Juan Pérez",
  foto: "https://via.placeholder.com/40"
};

let tareas = [
  { id: 1, nombre: "Comprar pan", estado: "Pendiente" },
  { id: 2, nombre: "Estudiar JavaScript", estado: "En progreso" },
  { id: 3, nombre: "Hacer ejercicio", estado: "Completada" }
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
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.nombre}</td>
      <td>${t.estado}</td>
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

  if (id) {
    // Editar
    const tarea = tareas.find(t => t.id == id);
    tarea.nombre = nombre;
    tarea.estado = estado;
  } else {
    // Crear nueva
    const nueva = {
      id: tareas.length ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
      nombre,
      estado
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