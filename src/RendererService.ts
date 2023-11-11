import {
  globalBotonEnviarFormularioPaciente,
  globalListaPacienteEl,
  globalListadoPacientesSubtitulo,
  globalListadoPacientesTitulo,
} from "./GlobalProvider";
import { UIElementFactory } from "./UIElementFactory";

export class RendererService {
  uIElementFactory = new UIElementFactory(this);

  renderizarPacientes(pacientes: Paciente[]) {
    while (globalListaPacienteEl?.firstChild) {
      if (globalListaPacienteEl) {
        globalListaPacienteEl.removeChild(globalListaPacienteEl.lastChild!);
      }
    }
    pacientes.forEach((paciente) => this.#agregarPacienteAlDOM(paciente));
  }

  resolverTituloListadoPacientes(entradas: number) {
    if (entradas > 0) {
      this.actualizarTituloListadoPacientes(
        "Listado pacientes",
        "Administra tus "
      );
    } else {
      this.actualizarTituloListadoPacientes(
        "No hay pacientes",
        "Comienza agregando "
      );
    }
  }

  actualizarTituloListadoPacientes(titulo: string, subtitulo: string) {
    if (globalListadoPacientesTitulo) {
      globalListadoPacientesTitulo.innerText = titulo;
    }
    if (globalListadoPacientesSubtitulo) {
      globalListadoPacientesSubtitulo.innerText = subtitulo;
    }
    const spanElSubstitulo =
      this.uIElementFactory.generarSpanSubtituloListadoPaciente("pacientes");
    globalListadoPacientesSubtitulo?.append(spanElSubstitulo);
  }

  actualizarTextoBotonSubmitFormularioPaciente(texto: string) {
    if (globalBotonEnviarFormularioPaciente) {
      globalBotonEnviarFormularioPaciente.value = texto;
    }
  }

  #agregarPacienteAlDOM(paciente: Paciente) {
    const cardPaciente = this.uIElementFactory.generarCardPaciente(paciente);
    globalListaPacienteEl?.append(cardPaciente);
  }
}
