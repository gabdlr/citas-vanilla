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
const globalListaPacienteEl = document.querySelector("#listaPacientes");
const globalNuevoPacienteForm = document.querySelector("#nuevoPacienteForm");
const globalListadoPacientesTitulo = document.querySelector(
  "#listadoPacientesTitulo"
);
const globalListadoPacientesSubtitulo = document.querySelector(
  "#listadoPacientesSubtitulo"
);
const globalBotonEnviarFormularioPaciente = document.querySelector(
  "#botonEnviarFormularioPaciente"
);
const globalContenedorFormularioPaciente = document.querySelector(
  "#contenedorFormularioPaciente"
);
