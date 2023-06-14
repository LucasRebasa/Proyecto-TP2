const Turno = require("../Turno.js");
const Factory = require("../Factory.js");

module.exports = class GestorTurnos {
  constructor(repositoryTurnos, repositoryMedico, repositoryPaciente) {
    this.factory = new Factory();
    this.repositoryTurnos = repositoryTurnos;
    this.repositoryMedico = repositoryMedico;
    this.repositoryPaciente = repositoryPaciente;
  }

  async agregarTurno(turno) {
    if (
      !turno.fecha ||
      !turno.hora ||
      !turno.especialidad ||
      !turno.medico ||
      !turno.paciente ||
      !turno.sede ||
      (typeof turno.medico === "string" && turno.medico.length < 24) ||
      (typeof turno.paciente === "string" && turno.paciente.length < 24)
    ) {
      console.log("Datos ingresados incorrectos");
      return false;
    }
    let fecha = new Date(turno.fecha);
    console.log(fecha);
    if (fecha.getTime() < Date.now()) {
      console.log("Fecha ingresada incorrecta");
      return false;
    }
    let existen =
      (await this.repositoryMedico.existsById(turno.medico)) &&
      (await this.repositoryPaciente.existsById(turno.paciente));
    if (!existen) {
      console.log("El medico o el paciente no existen");
      return false;
    }
    this.repositoryTurnos.agregarTurno(turno);
    return true;
  }

  async cancelarTurno(id) {
    let turnoActual = await this.repositoryTurnos.findById(id);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    let eliminados;
    console.log(turnoActual);
    if (!turnoActual) {
      return false;
    }
    console.log(new Date(turnoActual.fecha).getTime() - fechaActual.getTime());
    if (
      new Date(turnoActual.fecha).getTime() - fechaActual.getTime() >=
      172800000
    ) {
      eliminados = await this.repositoryTurnos.deleteById(id);
    }
    return eliminados?.deletedCount > 0;
  }

  async modificarTurno(id, fechaNueva, horaNueva) {
    let turno = await this.repositoryTurnos.findById(id);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    if (!turno || !fechaNueva || !horaNueva) {
      console.log("No existe el turno");
      return false;
    }
    let actualizado;
    if (
      new Date(turno.fecha).getTime() - fechaActual.getTime() >= 172800000 &&
      new Date(fechaNueva).getTime() - fechaActual.getTime() >= 172800000
    ) {
      console.log("actualizado");
      turno.fecha = fechaNueva;
      turno.hora = horaNueva;
      actualizado = await this.repositoryTurnos.update(id, turno);
    }
    return actualizado.modifiedCount > 0;
  }

  buscarTurnoPorPaciente(paciente) {
    return this.repositoryTurnos.findByPaciente(paciente);
  }

  buscarTurnoPorMedico(medico) {
    return this.repositoryTurnos.findByMedico(medico);
  }

  buscarTurnoPorId(id) {
    return this.repositoryTurnos.findById(id);
  }
};
