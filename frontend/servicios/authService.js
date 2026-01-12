export function registrarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../../../backend/controlador/solicitudes.php?ruta=usuario", true);

    // Enviamos FormData (no establecer Content-Type, el navegador lo maneja)
    const formData = new FormData();
    formData.append("accion", "registrar");
    formData.append("usuario", JSON.stringify(usuario));
    if (usuario.foto) {
      // clave 'foto' debe coincidir con lo que espera el backend (input type="file" name="foto")
      formData.append("foto", usuario.foto);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          // si el backend devuelve el usuario, lo guardamos; si no, guardamos lo enviado si hay éxito
          if (res.usuario) {
            localStorage.setItem("usuario", JSON.stringify(res.usuario));
          } else if (res.success) {
            localStorage.setItem("usuario", JSON.stringify(usuario));
          }
          resolve(res);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error("HTTP " + xhr.status));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Error de red"));
    };

    xhr.send(formData);
  });
}

export async function login(email, password) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../../../backend/controlador/solicitudes.php?ruta=usuario", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;

    const text = xhr.responseText;
    let res = null;
    try {
      if (text) res = JSON.parse(text);
    } catch (err) {
      console.error(err);
      alert("Credenciales incorrectas1");
      return;
    }

    if (xhr.status >= 200 && xhr.status < 300) {
      if (res && res.success === false) {
        alert("Credenciales incorrectas2");
        return;
      }

      try {
        if (res && res.data.nombre) {
          localStorage.setItem("nombre", JSON.stringify(res.data.nombre));
          if (res.data.foto) localStorage.setItem("foto", JSON.stringify(res.data.foto));
          window.location.href = "dashboard.html";
        } else {
          alert("Credenciales incorrectas3");
        }
      } catch (err) {
        console.error(err);
        alert("Credenciales incorrectas4");
      }
    } else {
      alert("Credenciales incorrectas5");
    }
  };

  xhr.onerror = function () {
    alert("Error de red");
  };

  xhr.send(JSON.stringify({ accion: "login", correo: email, contrasena: password }));
}

