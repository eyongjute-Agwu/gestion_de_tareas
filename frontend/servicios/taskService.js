export function getTareas() {
  // Ajusta la ruta si es necesario (desde frontend/servicios hacia backend/controlador/solicitudes.php)
  const url = '../../../backend/controlador/solicitudes.php?ruta=tareas&usuario_id=' + localStorage.getItem("idUsuario");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    // Enviar action para que el backend identifique la operación
    xhr.send();
  });
}

export function guardarTareas(tareas) {
  const url = '../../../backend/controlador/solicitudes.php?ruta=tareas';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    const payload = 'accion=guardarTareas&data=' + encodeURIComponent(JSON.stringify(tareas));
    xhr.send(payload);
  });
}

export function crearTarea(tarea) {
  const url = '../../../backend/controlador/solicitudes.php?ruta=tareas';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    const payload = 'accion=crearTarea&data=' + encodeURIComponent(JSON.stringify(tarea));
    xhr.send(payload);
  });
}

export function actualizarTarea(tarea) {
  const url = '../../../backend/controlador/solicitudes.php?ruta=tareas&usuario_id=' + localStorage.getItem("idUsuario");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    const payload = 'accion=actualizarTarea&data=' + encodeURIComponent(JSON.stringify(tarea));
    xhr.send(payload);
  });
}

export function eliminarTarea(id) {
  const url = '../../../backend/controlador/solicitudes.php?ruta=tareas&usuario_id=' + localStorage.getItem("idUsuario");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        } catch (err) {
          reject(new Error('Respuesta no es JSON válido: ' + err.message));
        }
      } else {
        reject(new Error('Error HTTP: ' + xhr.status));
      }
    };

    xhr.onerror = () => reject(new Error('Error de red'));
    const payload = 'accion=eliminarTarea&data=' + encodeURIComponent(JSON.stringify({ idTarea: id }));
    xhr.send(payload);
  });
}