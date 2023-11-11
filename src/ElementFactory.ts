export class ElementFactory {
  static crearElemento(nombreElemento: string) {
    return document.createElement(nombreElemento);
  }

  static crearBoton(texto: string, clases: string[]) {
    const boton = this.crearElemento("button");
    boton.innerText = texto;
    this.agregarClasesAElemento(boton, clases);
    return boton;
  }

  static crearParrafo(texto: string, clases: string[] = []) {
    const parrafo = this.crearElemento("p");
    parrafo.innerText = texto;
    this.agregarClasesAElemento(parrafo, clases);
    return parrafo;
  }

  static crearSpan(texto: string, clases: string[]) {
    const span = this.crearElemento("span");
    span.innerText = texto;
    this.agregarClasesAElemento(span, clases);
    return span;
  }

  static agregarClasesAElemento(elemento: HTMLElement, clases: string[]) {
    if (!clases) {
      return;
    }
    elemento.classList.add(...clases);
  }
}
