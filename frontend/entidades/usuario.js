export class Usuario {
  constructor(a, b, c = null, d = null) {
    // Si solo se pasaron 2 argumentos: a = email, b = password
    if (c === null && d === null) {
      this.nombre = null;
      this.email = a;
      this.password = b;
      this.foto = null;
    } else {
      // Se pasaron 4 argumentos: a = nombre, b = email, c = password, d = foto
      this.nombre = a;
      this.email = b;
      this.password = c;
      this.foto = d;
    }
  }
}
