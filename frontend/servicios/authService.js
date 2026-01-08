export function registrarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

export function login(email, password) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) return false;
  return usuario.email === email && usuario.password === password;
}

export function getUsuario() {
  return JSON.parse(localStorage.getItem("usuario"));
}
