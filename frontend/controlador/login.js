import { login } from "../servicios/authService.js";

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  
  const preloader = document.getElementById('preloader');

  preloader.style.display = 'flex';

  //verificar que no estén vacíos
  if (!email.value || !password.value) {
    alert("Por favor, complete todos los campos.");
    preloader.style.display = 'none';
    return;
  }

  login(email.value, password.value);
  preloader.style.display = 'none';
});
