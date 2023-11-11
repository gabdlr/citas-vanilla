import { ElementFactory } from "./ElementFactory";
import {
  PacienteFormControls,
  PacienteTemp,
  globalContenedorFormularioPaciente,
  globalNuevoPacienteForm,
} from "./GlobalProvider";

export class FormularioService {
  static tieneErrores = false;

  static obtenerValoresFormularioPaciente() {
    const valoresFormulario: PacienteTemp = {
      id: "",
      nombre: "",
      propietario: "",
      email: "",
      fechaAlta: "",
      sintomas: "",
    };

    const controlesFormulario = <PacienteFormControls>(
      globalNuevoPacienteForm?.elements
    );
    if (controlesFormulario.idPaciente.value !== "") {
      valoresFormulario.id = Number(controlesFormulario.idPaciente.value);
    }
    valoresFormulario.nombre = controlesFormulario.nombrePaciente.value;
    valoresFormulario.propietario =
      controlesFormulario.propietarioPaciente.value;
    valoresFormulario.email = controlesFormulario.emailPaciente.value;
    valoresFormulario.fechaAlta = controlesFormulario.fechaAltaPaciente.value;
    valoresFormulario.sintomas = controlesFormulario.sintomasPaciente.value;
    return valoresFormulario;
  }

  static rellenarFormularioPaciente(paciente: Paciente) {
    const controlesFormulario = <PacienteFormControls>(
      globalNuevoPacienteForm.elements
    );
    controlesFormulario.idPaciente.value = paciente.pacienteId;
    for (const key in paciente) {
      if (Object.hasOwn(paciente, key)) {
        controlesFormulario[`${key}Paciente`].value = paciente[key];
      }
    }
  }

  static reiniciarFormulario() {
    globalNuevoPacienteForm.reset();
    (<PacienteFormControls>globalNuevoPacienteForm.elements).idPaciente.value =
      "";
    FormularioService.limpiarMensajeError();
  }

  static formularioEsValido() {
    const controlesFormulario = <PacienteFormControls>(
      globalNuevoPacienteForm.elements
    );
    const elementosAValidar = [
      controlesFormulario.nombrePaciente.value,
      controlesFormulario.propietarioPaciente.value,
      controlesFormulario.emailPaciente.value,
      controlesFormulario.fechaAltaPaciente.value,
      controlesFormulario.sintomasPaciente.value,
    ];
    return !elementosAValidar.some((valor) => valor === "");
  }

  static mostrarMensajeError() {
    if (!FormularioService.tieneErrores) {
      const divClasses = [
        "bg-red-800",
        "text-white",
        "text-center",
        "p-3",
        "uppercase",
        "font-bold",
        "mb-3",
        "rounded",
      ];
      const divEl = ElementFactory.crearElemento("div");
      divEl.classList.add(...divClasses);
      const pEl = ElementFactory.crearParrafo(
        "todos los campos son obligatorios"
      );
      divEl.append(pEl);
      globalContenedorFormularioPaciente?.prepend(divEl);
      FormularioService.tieneErrores = true;
    }
  }

  static limpiarMensajeError() {
    if (FormularioService.tieneErrores) {
      globalContenedorFormularioPaciente.removeChild(
        globalContenedorFormularioPaciente.firstChild
      );
    }
    FormularioService.tieneErrores = false;
  }
}
