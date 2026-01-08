export function getTareas() {
  return JSON.parse(localStorage.getItem("tareas")) || [];
}

export function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
