class PacienteService {
  static instance;
  #pacienteState = new BehaviorSubject([]);
  pacienteState$ = this.#pacienteState.asObservable();
  constructor() {
    if (PacienteService.instance) {
      return PacienteService.instance;
    } else {
      PacienteService.instance = this;
    }
  }

  agregarPacienteAlState(paciente) {
    return this.#pacienteState.pipe(
      take(1),
      switchMap((pacientes) => {
        this.#pacienteState.next([...pacientes, paciente].sort());
        return of(undefined);
      })
    );
  }

  actualizarPacienteEnElState(paciente) {
    return this.#pacienteState.pipe(
      take(1),
      map((pacientes) =>
        pacientes.filter(
          (pacienteEnState) => pacienteEnState.id !== paciente.id
        )
      ),
      switchMap((pacientes) => {
        this.#pacienteState.next(
          [...pacientes, paciente].sort((a, b) => a.id - b.id)
        );
        return of(undefined);
      })
    );
  }

  editarPaciente(paciente) {
    FormularioService.rellenarFormularioPaciente(paciente);
    return of(undefined);
  }

  eliminarPaciente(pacienteAEliminar) {
    return this.#pacienteState.pipe(
      take(1),
      switchMap((pacientes) => {
        const pacientesFiltrado = pacientes.filter(
          (paciente) => paciente.id !== pacienteAEliminar.id
        );
        this.#pacienteState.next(pacientesFiltrado);
        return of(undefined).pipe(
          tap(() => {
            const pacienteEnFormulario =
              FormularioService.obtenerValoresFormularioPaciente();
            if (Number(pacienteEnFormulario.id) === pacienteAEliminar.id) {
              FormularioService.reiniciarFormulario();
            }
          })
        );
      })
    );
  }
}
