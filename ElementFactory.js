class ElementFactory {
  static crearElemento(nombreElemento) {
    return document.createElement(nombreElemento);
  }

  static crearBoton(texto, clases) {
    const boton = this.crearElemento("button");
    boton.innerText = texto;
    this.agregarClasesAElemento(boton, clases);
    return boton;
  }

  static crearParrafo(texto, clases) {
    const parrafo = this.crearElemento("p");
    parrafo.innerText = texto;
    this.agregarClasesAElemento(parrafo, clases);
    return parrafo;
  }

  static crearSpan(texto, clases) {
    const span = this.crearElemento("span");
    span.innerText = texto;
    this.agregarClasesAElemento(span, clases);
    return span;
  }

  static agregarClasesAElemento(elemento, clases) {
    if (!clases) {
      return;
    }
    elemento.classList.add(...clases);
  }
}
