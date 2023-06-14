const Turno = require("./Turno.js");

module.exports = class Factory {
  crearTurno(fecha, especialidad, medico, paciente, sede) {
    let nuevoTurno = null;
    if (medico.estaDisponible(fecha)) {
      nuevoTurno = new Turno(
        fecha,
        especialidad,
        medico,
        paciente,
        sede
      );
    }
    return nuevoTurno;
  }

};
