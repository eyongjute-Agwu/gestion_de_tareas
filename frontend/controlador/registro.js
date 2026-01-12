import { Usuario } from "../entidades/usuario.js";
import { registrarUsuario } from "../servicios/authService.js";

document.getElementById("registroForm").addEventListener("submit", e => {
  e.preventDefault();

  const usuario = new Usuario(nombreInput.value, emailInput.value, passwordInput.value, fotoInput.files[0]);

  const preloader = document.getElementById('preloader');

  preloader.style.display = 'flex';
  if(registrarUsuario(usuario)){
    window.location.href = "login.html";
  } else{
    alert("Error al registrar usuario");
    preloader.style.display = 'none';
  }
});

fotoInput.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = () => fotoPreview.src = reader.result;
  reader.readAsDataURL(fotoInput.files[0]);
});
