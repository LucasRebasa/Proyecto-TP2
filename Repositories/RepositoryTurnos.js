const Factory = require("../Factory.js");
const Turno = require("../Turno.js");

module.exports = class RepositoryTurnos {
  constructor() {
    this.turnos = [];
  }

  agregarTurno(turno) {
    this.turnos.push(turno);
  }

  findById(id) {
    return this.turnos.find((e) => e.id === id);
  }

  findByPaciente(paciente) {
    return this.turnos.find((e) => e.paciente.id === paciente.id);
  }

  findByMedico(medico) {
    return this.turnos.find((e) => e.medico.id === medico.id);
  }

  update(turno, fechaNueva) {
    turno.fecha = fechaNueva;
    this.turnos = this.turnos.map((e) => (e.id === turno.id ? turno : e));
  }

  deleteById(id){
    this.turnos = this.turnos.filter(e => e.id !== id);
  }
  
};
