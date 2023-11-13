export class Paciente {
  id?: string;
  nombre;
  propietario;
  email;
  fechaAlta;
  sintomas;
  constructor(
    id = "",
    nombre = "",
    propietario = "",
    email = "",
    fechaAlta = "",
    sintomas = ""
  ) {
    this.nombre = nombre;
    this.propietario = propietario;
    this.email = email;
    this.fechaAlta = fechaAlta;
    this.sintomas = sintomas;
  }
}
