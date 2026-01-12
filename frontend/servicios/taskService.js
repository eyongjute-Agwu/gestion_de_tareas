export function getTareas() {
  // Ajusta la ruta si es necesario (desde frontend/servicios hacia backend/controlador/solicitudes.php)
  const url = '../../backend/controlador/solicitudes.php';
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
    // Enviar action para que el backend identifique la operación
    xhr.send('action=getTareas');
  });
}

export function guardarTareas(tareas) {
  const url = '../../backend/controlador/solicitudes.php';
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
    const payload = 'action=guardarTareas&data=' + encodeURIComponent(JSON.stringify(tareas));
    xhr.send(payload);
  });
}
