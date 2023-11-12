import { filter, fromEvent, switchMap } from "rxjs";
import { PacienteService } from "./PacienteService";
import { RendererService } from "./RendererService";
import { globalNuevoPacienteForm } from "./GlobalProvider";
import { FormularioService } from "./FormularioService";

export class Main {
  pacienteService = new PacienteService();
  rendererService = new RendererService();
  constructor() {
    fromEvent(globalNuevoPacienteForm, "submit", (e) => e.preventDefault())
      .pipe(
        filter(() => {
          const esValido = FormularioService.formularioEsValido();
          if (!esValido) {
            FormularioService.mostrarMensajeError();
          }
          return esValido;
        }),
        switchMap(() => {
          const paciente = FormularioService.obtenerValoresFormularioPaciente();
          if (paciente.id === "") {
            paciente.id = IdGenerator.generateId().toString();
            return this.pacienteService.agregarPacienteAlState(paciente);
          }
          return this.pacienteService.actualizarPacienteEnElState(paciente);
        })
      )
      .subscribe({
        next: () => FormularioService.reiniciarFormulario(),
      });

    this.pacienteService.pacienteState$.subscribe({
      next: (pacientes: Paciente[]) => {
        this.rendererService.actualizarTextoBotonSubmitFormularioPaciente(
          "Agregar Paciente"
        );
        this.rendererService.resolverTituloListadoPacientes(pacientes.length);
        this.rendererService.renderizarPacientes(pacientes);
      },
    });
  }
}
