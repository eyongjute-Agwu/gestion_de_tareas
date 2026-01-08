import { login } from "../servicios/authService.js";

document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  if (login(email.value, password.value)) {
    window.location.href = "dashboard.html";
  } else {
    alert("Credenciales incorrectas");
  }
});
