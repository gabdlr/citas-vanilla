class RendererService {
  uIElementFactory = new UIElementFactory(this);

  renderizarPacientes(pacientes) {
    while (globalListaPacienteEl.firstChild) {
      globalListaPacienteEl.removeChild(globalListaPacienteEl.lastChild);
    }
    pacientes.forEach((paciente) => this.#agregarPacienteAlDOM(paciente));
  }

  resolverTituloListadoPacientes(entradas) {
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

  actualizarTituloListadoPacientes(titulo, subtitulo) {
    globalListadoPacientesTitulo.innerText = titulo;
    globalListadoPacientesSubtitulo.innerText = subtitulo;
    const spanElSubstitulo =
      this.uIElementFactory.generarSpanSubtituloListadoPaciente("pacientes");
    globalListadoPacientesSubtitulo.append(spanElSubstitulo);
  }

  actualizarTextoBotonSubmitFormularioPaciente(texto) {
    globalBotonEnviarFormularioPaciente.value = texto;
  }

  #agregarPacienteAlDOM(paciente) {
    const cardPaciente = this.uIElementFactory.generarCardPaciente(paciente);
    globalListaPacienteEl.append(cardPaciente);
  }
}
