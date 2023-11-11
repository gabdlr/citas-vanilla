const Rxjs = window.rxjs;
const {
  BehaviorSubject,
  tap,
  scan,
  take,
  switchMap,
  of,
  fromEvent,
  map,
  filter,
} = Rxjs;

export const globalListaPacienteEl: HTMLDivElement | null =
  document.querySelector("#listaPacientes");
export const globalNuevoPacienteForm = <HTMLFormElement>(
  document.querySelector("#nuevoPacienteForm")
);
export const globalListadoPacientesTitulo: HTMLHeadingElement | null =
  document.querySelector("#listadoPacientesTitulo");
export const globalListadoPacientesSubtitulo: HTMLHeadingElement | null =
  document.querySelector("#listadoPacientesSubtitulo");
export const globalBotonEnviarFormularioPaciente: HTMLButtonElement | null =
  document.querySelector("#botonEnviarFormularioPaciente");
export const globalContenedorFormularioPaciente: HTMLDivElement =
  document.querySelector("#contenedorFormularioPaciente");

export interface PacienteFormControls extends HTMLFormControlsCollection {
  idPaciente: HTMLInputElement;
  nombrePaciente: HTMLInputElement;
  propietarioPaciente: HTMLInputElement;
  emailPaciente: HTMLInputElement;
  fechaAltaPaciente: HTMLInputElement;
  sintomasPaciente: HTMLInputElement;
}

export interface PacienteTemp {
  id: number | string;
  nombre: string;
  propietario: string;
  email: string;
  fechaAlta: string;
  sintomas: string;
}
