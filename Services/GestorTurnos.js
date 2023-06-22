const Turno = require("../Entities/Turno.js");

module.exports = class GestorTurnos {
  constructor(repositoryTurnos, repositoryMedico, repositoryPaciente) {
    this.repositoryTurnos = repositoryTurnos;
    this.repositoryMedico = repositoryMedico;
    this.repositoryPaciente = repositoryPaciente;
  }
 
  async agregarTurno(turno) {
    //Valida que el turno tenga todos los campos necesarios
    console.log(turno)
    if (
      !turno.fecha ||
      !turno.hora ||
      !turno.especialidad ||
      !turno.medico ||
      !turno.paciente ||
      (typeof turno.medico === "string" && turno.medico.length < 24) ||
      (typeof turno.paciente === "string" && turno.paciente.length < 24)
    ) {
      return {error:"Los datos ingresados fueron incorrectos"};
    }
    //Valida que la fecha ingresada no sea anterior a la actual
    let fecha = new Date(turno.fecha);
    if (fecha.getTime() < Date.now()) {
      return {error: "La fecha ingresada es invalida"};
    }
    //Valida que el medico y el paciente existan
    let existen =
      (await this.repositoryMedico.existsById(turno.medico)) &&
      (await this.repositoryPaciente.existsById(turno.paciente));
    if (!existen) {
      return {error: "El paciente o el medico no existen"};
    }
    let disponible = await this.repositoryTurnos.findTurnoByMedicoFechaYHora(turno.medico,turno.fecha,turno.hora); 
    if(disponible){
      return {error:"El medico no está disponible en ese horario"}
    }
    //Cumplidas todas las condiciones, agrega el turno
    this.repositoryTurnos.agregarTurno(turno);
    return true;
  }

  async cancelarTurno(id) {
    //Valida que el turno exista
    let turnoActual = await this.repositoryTurnos.findById(id);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    
    if (!turnoActual) {
      return {error: "El turno no existe"};
    }
    console.log(new Date(turnoActual.fecha).getTime() - fechaActual.getTime());
    //Valida que el turno no pueda ser cancelado menos de 2 dias antes
    if (
      new Date(turnoActual.fecha).getTime() - fechaActual.getTime() >=
      172800000
    ) {
      console.log("Turno cancelado")
      let eliminados = await this.repositoryTurnos.deleteById(id);
      return eliminados.deletedCount > 0;
    }else{
      return {error: "Se debe cancelar el turno con 2 dias de anticipacion"};
    }
  }

  async modificarTurno(id, fechaNueva, horaNueva) {
    //Valida que el turno exista
    let turno = await this.repositoryTurnos.findById(id);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    //Valida que se hayan ingresado todos los campos necesarios
    if (!turno || !fechaNueva || !horaNueva) {
      return {error: "Los datos ingresados son incorrectos"};
    }
    //Valida que el medico tenga disponibilidad en el nuevo horario
    let noDisponible = await this.repositoryTurnos.findTurnoByMedicoFechaYHora(turno.medico,fechaNueva,horaNueva);
    if(noDisponible){
      console.log(noDisponible)
      return {error:"El medico no esta disponible en el nuevo horario"}
    }
    //Valida que el turno sea modificado al menos dos dias antes
    if (
      new Date(turno.fecha).getTime() - fechaActual.getTime() >= 172800000 &&
      new Date(fechaNueva).getTime() - fechaActual.getTime() >= 172800000
    ) {
      turno.fecha = fechaNueva;
      turno.hora = horaNueva;
      let actualizado = await this.repositoryTurnos.update(id, turno);
      return actualizado.modifiedCount > 0;
    }else{
      return {error: "Se debe cancelar el turno con 2 dias de anticipacion"};
    }
  }

  async buscarTurnosPorPaciente(idPaciente) {
    if(typeof idPaciente === "string" && idPaciente.length < 24){
      return {error:"No existe un paciente con ese id"};
    }
    let turnosPaciente = await this.repositoryTurnos.findByIdPaciente(idPaciente);

    if(turnosPaciente.length === 0){
      return {error:"No hay turnos para ese paciente"}
    }
    return turnosPaciente;
  }

  async buscarTurnosPorMedico(idMedico) {
    if(typeof idMedico === "string" && idMedico.length < 24){
      return {error:"No existe el medico"};
    }
    let turnosMedico = await this.repositoryTurnos.findByIdMedico(idMedico);
    if(turnosMedico.length === 0){
      return {error:"No existen turnos para el medico ingresado"}
    }
    return turnosMedico;
  }

  buscarTurnoPorId(id) {
    if(typeof id === "string" && id.length < 24){
      return false;
    }
    return this.repositoryTurnos.findById(id);
  }

  async verTurnos(){
    let turnos = await this.repositoryTurnos.findAll();
    if(turnos.length === 0){
      return {error:"No existen turnos"}
    }
    return turnos;
  }

  async verDisponibilidadHoraria(idMedico,fecha){
    let medico = await this.repositoryMedico.findById(idMedico);
    if(!medico){
      return {error:"El medico no existe"}
    }
    let disponibilidad = await this.repositoryTurnos.buscarAgenda(idMedico,fecha)
    return disponibilidad;
  }

 };
