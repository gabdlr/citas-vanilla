import { BehaviorSubject, map, of, switchMap, take, tap } from "rxjs";
import { FormularioService } from "./FormularioService";
import { PacienteTemp } from "./GlobalProvider";

export class PacienteService {
  static instance: PacienteService;
  #pacienteState = new BehaviorSubject<Paciente[]>([]);
  pacienteState$ = this.#pacienteState.asObservable();
  constructor() {
    if (PacienteService.instance) {
      return PacienteService.instance;
    } else {
      PacienteService.instance = this;
    }
  }

  agregarPacienteAlState(paciente: Paciente) {
    return this.#pacienteState.pipe(
      take(1),
      switchMap((pacientes) => {
        this.#pacienteState.next([...pacientes, paciente].sort());
        return of(undefined);
      })
    );
  }

  actualizarPacienteEnElState(paciente: Paciente) {
    return this.#pacienteState.pipe(
      take(1),
      map((pacientes) =>
        pacientes.filter(
          (pacienteEnState) => pacienteEnState.id !== paciente.id
        )
      ),
      switchMap((pacientes) => {
        this.#pacienteState.next(
          [...pacientes, paciente].sort((a, b) => Number(a.id!) - Number(b.id!))
        );
        return of(undefined);
      })
    );
  }

  editarPaciente(paciente: Paciente) {
    FormularioService.rellenarFormularioPaciente(paciente);
    return of(undefined);
  }

  eliminarPaciente(pacienteAEliminar: Paciente) {
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
            if (
              Number(pacienteEnFormulario.id) === Number(pacienteAEliminar.id)
            ) {
              FormularioService.reiniciarFormulario();
            }
          })
        );
      })
    );
  }
}
