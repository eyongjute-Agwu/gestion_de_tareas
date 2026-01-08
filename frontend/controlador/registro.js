import { Usuario } from "../entidades/usuario.js";
import { registrarUsuario } from "../servicios/authService.js";

document.getElementById("registroForm").addEventListener("submit", e => {
  e.preventDefault();

  const nombre = nombreInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const foto = fotoPreview.src;

  const usuario = new Usuario(nombre, email, password, foto);
  registrarUsuario(usuario);

  window.location.href = "login.html";
});

fotoInput.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = () => fotoPreview.src = reader.result;
  reader.readAsDataURL(fotoInput.files[0]);
});
