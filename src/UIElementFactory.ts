import { fromEvent, switchMap, take } from "rxjs";
import { ElementFactory } from "./ElementFactory";
import { RendererService } from "./RendererService";
import { PacienteService } from "./PacienteService";
import { Paciente } from "./Paciente";

export class UIElementFactory {
  #_rendererService?: RendererService;
  constructor(rendererService: RendererService) {
    this.rendererService = rendererService;
  }

  set rendererService(rendererService: RendererService) {
    this.#_rendererService = rendererService;
  }

  generarCardPaciente(paciente: Paciente) {
    const cardClasses = [
      "m-3",
      "bg-white",
      "shadow-md",
      "px-5",
      "py-10",
      "rounded-xl",
    ];
    const cardPaciente = ElementFactory.crearElemento("div");
    cardPaciente.classList.add(...cardClasses);
    //TODO: minimizar esto
    cardPaciente.append(
      this.#generarCampoCardPaciente("Nombre: ", paciente.nombre)
    );
    cardPaciente.append(
      this.#generarCampoCardPaciente("Propietario: ", paciente.propietario)
    );
    cardPaciente.append(
      this.#generarCampoCardPaciente("Email: ", paciente.email)
    );
    cardPaciente.append(
      this.#generarCampoCardPaciente("Fecha alta: ", paciente.fechaAlta)
    );
    cardPaciente.append(
      this.#generarCampoCardPaciente("Sintomas: ", paciente.sintomas)
    );
    const botoneraCardPaciente = this.#generarBotoneraCardPaciente(paciente);
    cardPaciente.append(botoneraCardPaciente);
    return cardPaciente;
  }

  #generarCampoCardPaciente(textoDescriptor: string, textoDescripcion: string) {
    const spanClasses = ["font-normal", "normal-case"];
    const parrafoCampoCardPaciente =
      this.#generarParrafoCampoCardPaciente(textoDescriptor);
    const spanCampoCardPaciente = ElementFactory.crearSpan(
      textoDescripcion,
      spanClasses
    );
    parrafoCampoCardPaciente.append(spanCampoCardPaciente);
    return parrafoCampoCardPaciente;
  }

  #generarParrafoCampoCardPaciente(texto: string) {
    const parrafoClasses = ["font-bold", "mb-3", "text-gray-700", "uppercase"];
    const parrafoEl = ElementFactory.crearParrafo(texto, parrafoClasses);
    parrafoEl.setAttribute("data-testId", "pacientCardField");
    return parrafoEl;
  }

  generarSpanSubtituloListadoPaciente(texto: string) {
    const spanClasses = ["text-indigo-600", "font-bold"];
    const spanEl = ElementFactory.crearSpan(texto, spanClasses);
    spanEl.classList.add(...spanClasses);
    return spanEl;
  }

  #generarBotoneraCardPaciente(paciente: Paciente) {
    const botoneraClasses = ["flex", "justify-between"];
    const botonera = ElementFactory.crearElemento("div");
    botonera.classList.add(...botoneraClasses);
    const botonEditar = this.#generarBotonEditarPaciente(paciente);
    botonEditar.setAttribute("data-testId", "pacientCardEditButton");
    botonera.append(botonEditar);

    const botonEliminar = this.#generarBotonEliminarPaciente(paciente);
    botonEliminar.setAttribute("data-testId", "pacientCardDeleteButton");
    botonera.append(botonEliminar);
    return botonera;
  }

  #generarBotonEditarPaciente(paciente: Paciente) {
    const botonEditarClasses = [
      "py-2",
      "px-10",
      "bg-indigo-600",
      "hover:bg-indigo-700",
      "text-white",
      "font-bold",
      "uppercase",
      "rounded-lg",
    ];
    const botonEditarPaciente = ElementFactory.crearBoton(
      "Editar",
      botonEditarClasses
    );
    fromEvent(botonEditarPaciente, "click")
      .pipe(
        take(1),
        switchMap(() => {
          this.#_rendererService?.actualizarTextoBotonSubmitFormularioPaciente(
            "Editar Paciente"
          );
          return PacienteService.instance.editarPaciente(paciente);
        })
      )
      .subscribe();
    return botonEditarPaciente;
  }

  #generarBotonEliminarPaciente(paciente: Paciente) {
    const botonEliminarClasses = [
      "py-2",
      "px-10",
      "bg-red-600",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "uppercase",
      "rounded-lg",
    ];
    const botonEliminarPaciente = ElementFactory.crearBoton(
      "Eliminar",
      botonEliminarClasses
    );
    fromEvent(botonEliminarPaciente, "click")
      .pipe(
        take(1),
        switchMap(() => PacienteService.instance.eliminarPaciente(paciente))
      )
      .subscribe();
    return botonEliminarPaciente;
  }
}
